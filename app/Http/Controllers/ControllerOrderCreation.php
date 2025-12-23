<?php

namespace App\Http\Controllers;

use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerOrderCreation extends Common {

	public function __invoke(Request $request) {

		parent::check_allowed_method('POST');
		
		$err = parent::validate_fields('other', $request);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}		
		
		list($data, $err) = parent::handler_data_crypt($request);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		$counterparty_id = ($data['counterparty_id'] ?? '');
		$is_cash_payment = ($data['is_cash_payment'] ?? '');
		$shipping_date = ($data['shipping_date'] ?? '');
		$shipping_warehouse_id = ($data['shipping_warehouse_id'] ?? '');
		$is_shipping = ($data['is_shipping'] ?? '');
		$delivery_address = ($data['delivery_address'] ?? '');
		$delivery_address_id = ($data['delivery_address_id'] ?? '');
		$goods = ($data['goods'] ?? '');
		$goods_non_standard_addition = ($data['goods_non_standard_addition'] ?? '');
		$files_non_standard_addition = ($data['files_non_standard_addition'] ?? '');
		$is_draft = ($data['is_draft'] ?? '');
		$comment = ($data['comment'] ?? '');
		$is_after_editing = ($data['is_after_editing'] ?? '');
		$draft_id = ($data['draft_id'] ?? '');
		$based_on_cart = ($data['based_on_cart'] ?? '');
		$client_rsa_pubkey = $data['client_rsa_pubkey'];
		
		// $counterparty_id = ($request->input('counterparty_id') ?? '');
		// $is_cash_payment = ($request->input('is_cash_payment') ?? '');
		// $shipping_date = ($request->input('shipping_date') ?? '');
		// $shipping_warehouse_id = ($request->input('shipping_warehouse_id') ?? '');
		// $is_shipping = ($request->input('is_shipping') ?? '');
		// $delivery_address = ($request->input('delivery_address') ?? '');
		// $delivery_address_id = ($request->input('delivery_address_id') ?? '');
		// $goods = ($request->input('goods') ?? '');
		// $goods_non_standard_addition = ($request->input('goods_non_standard_addition') ?? '');
		// $files_non_standard_addition = ($request->input('files_non_standard_addition') ?? '');
		// $is_draft = ($request->input('is_draft') ?? '');
		// $comment = ($request->input('comment') ?? '');
		// $is_after_editing = ($request->input('is_after_editing') ?? '');
		// $draft_id = ($request->input('draft_id') ?? '');
		// $based_on_cart = ($request->input('based_on_cart') ?? '');

		$counterparty_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($counterparty_id, 0, 36)));
		$is_cash_payment = trim(preg_replace('/[^0-9]/', '', mb_substr($is_cash_payment, 0, 1)));
		$shipping_date = trim(preg_replace('/[^0-9\-:T]/', '', mb_substr($shipping_date, 0, 19)));
		$shipping_warehouse_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($shipping_warehouse_id, 0, 36)));
		$is_shipping = trim(preg_replace('/[^0-9]/', '', mb_substr($is_shipping, 0, 1)));
		$delivery_address = trim(mb_substr(htmlspecialchars($delivery_address, ENT_QUOTES, $this->encoding), 0, 500));
		$delivery_address_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($delivery_address_id, 0, 36)));
		$is_draft = trim(preg_replace('/[^0-9]/', '', mb_substr($is_draft, 0, 1)));
		$comment = trim(mb_substr(htmlspecialchars($comment, ENT_QUOTES, $this->encoding), 0, 1000));
		$is_after_editing = trim(preg_replace('/[^0-9]/', '', mb_substr($is_after_editing, 0, 1)));
		$draft_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($draft_id, 0, 36)));

		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if ($err) {
			parent::prepare_response(['error' => $err]);
		}

		if ($counterparty_id == '') {
			parent::prepare_response(['error' => 'COUNTERPARTY_NOT_SPECIFIED']);
		}

		if ($is_cash_payment != '') {
			$is_cash_payment = '1';
		}

		if ($is_shipping != '') {
			$is_shipping = '1';
		}

		if ($is_draft != '') {
			$is_draft = '1';
		}

		if ($is_after_editing != '') {
			$is_after_editing = '1';
			$is_draft = '';
		}

		if ($is_after_editing == '1' && $draft_id == '') {
			parent::prepare_response(['error' => 'DRAFT_ID_IS_EMPTY_OR_INCORRECT']);
		}

		if ($shipping_date != '' && date('U', strtotime($shipping_date)) == 0) {
			parent::prepare_response(['error' => 'SHIPPING_DATE_IS_INCORRECT']);
		}

		if ($shipping_warehouse_id == '') {
			parent::prepare_response(['error' => 'SHIPPING_WAREHOUSE_NOT_SPECIFIED']);
		}

		if ($is_shipping == '1' && $delivery_address == '') {
			parent::prepare_response(['error' => 'DELIVERY_ADDRESS_NOT_SPECIFIED']);
		}

		if ($is_shipping == '1' && $delivery_address_id == '') {
			parent::prepare_response(['error' => 'DELIVERY_ADDRESS_ID_IS_EMPTY_OR_INCORRECT']);
		}

		if ($based_on_cart != '' && !in_array($based_on_cart, ['product_remains', 'substandard', 'finished_products'])) {
			parent::prepare_response(['error' => 'INCORRECT_FIELD_VALUE_BASED_ON_CART']);
		}
		
		if (!is_array($goods)) {
			parent::prepare_response(['error' => 'FIELD_GOODS_MUST_BE_AN_ARRAY']);
		}

		$si = sizeof($goods);
		if ($si > 1000) {
			parent::prepare_response(['error' => 'LIMIT_MAX_COUNT_GOODS', 'comment' => 1000]);
		}

		$available_specifications_data = parent::get_available_specifications();
		if (array_key_exists('error', $available_specifications_data)) {
			parent::prepare_response(['error' => $available_specifications_data['error']]);
		}

		$available_specifications_id_limits = [];
		foreach ($available_specifications_data['data'] as $c) {
			if (!array_key_exists($c['ВидНоменклатурыИД'], $available_specifications_id_limits)) {
				$available_specifications_id_limits[$c['ВидНоменклатурыИД']] = [['От' => $c['От'], 'До' => $c['До'], 'Шаг' => $c['Шаг']]];
			} else {
				$available_specifications_id_limits[$c['ВидНоменклатурыИД']][] = ['От' => $c['От'], 'До' => $c['До'], 'Шаг' => $c['Шаг']];
			}
		}

		$product_catalog_data = parent::get_product_catalog();

		if (array_key_exists('error', $product_catalog_data)) {
			parent::prepare_response(['error' => $product_catalog_data['error']]);
		}

		$arr_product_catalog_id_name = [];
		foreach ($product_catalog_data['data'] as $c) {
			foreach ($c['Данные'] as $c2) {
				$arr_product_catalog_id_name[$c2['НоменклатураИД']] = $c2['Наименование'];
			}
		}

		$arr = [];

		foreach ($goods as $c) {

			$arr2 = [];

			if (array_key_exists('id_nomenclature', $c)) {
				$arr2['НоменклатураИД'] = preg_replace('/[^a-f0-9\-]/', '', mb_substr($c['id_nomenclature'], 0, 36));
				if ($arr2['НоменклатураИД'] == '') {
					parent::prepare_response(['error' => 'ID_NOMENCLATURE_IS_EMPTY_OR_NOT_FILLED_IN_CORRECTLY']);
				}
			}

			if (array_key_exists('length', $c)) {
				if ($c['length'] !== '' && $c['length'] !== null) {
					if (!is_numeric($c['length'])) {
						parent::prepare_response(['error' => 'FIELD_LENGTH_MUST_BE_A_NUMBER']);
					}
					if (strpos($c['length'], '.') !== false) {
						parent::prepare_response(['error' => 'THE_LENGTH_FIELD_MUST_CONTAIN_AN_INTEGER']);
					}
					if ($c['length'] < 1) {
						parent::prepare_response(['error' => 'FIELD_LENGTH_MUST_BE_GREATER_THAN_ZERO']);
					}
				}
				$arr2['Характеристика'] = (string) $c['length'];
			}

			if (array_key_exists('id_nomenclature_type', $c)) {
				$arr2['ВидНоменклатурыИД'] = preg_replace('/[^a-f0-9\-]/', '', mb_substr($c['id_nomenclature_type'], 0, 36));
				/* if($arr2['ВидНоменклатурыИД'] == ''){
																																						parent::prepare_response(['error'=>'ID_NOMENCLATURE_TYPE_IS_EMPTY_OR_NOT_FILLED_IN_CORRECTLY']);
																																					} */
				$is_find = false;
				if ($c['id_nomenclature_type'] != '') {
					if (array_key_exists($c['id_nomenclature_type'], $available_specifications_id_limits)) {
						$is_find = true;
						if ($c['length'] == '') {
							parent::prepare_response(['error' => 'FIELD_LENGTH_MUST_CONTAIN_THE_VALUE']);
						}
						$arr3 = [];
						foreach ($available_specifications_id_limits[$c['id_nomenclature_type']] as $c2) {
							if ($c2['От'] == $c2['До'] || $c2['Шаг'] == 0) {
								if (!in_array($c2['От'], $arr3)) {
									$arr3[] = $c2['От'];
								}
							} else {
								for ($i = $c2['От']; $i <= $c2['До']; $i += $c2['Шаг']) {
									if (!in_array($i, $arr3)) {
										$arr3[] = $i;
									}
								}
							}
						}
						if (!in_array((int) $c['length'], $arr3)) {
							$nomenclature_name = '???';
							if (array_key_exists('НоменклатураИД', $arr2) && array_key_exists($arr2['НоменклатураИД'], $arr_product_catalog_id_name)) {
								$nomenclature_name = $arr_product_catalog_id_name[$arr2['НоменклатураИД']];
							}
							parent::prepare_response(['error' => 'FIELD_LENGTH_HAS_AN_INCORRECT_VALUE', 'comment' => ['nomenclature_name' => $nomenclature_name, 'possible_values' => $arr3]], true);
						}
					}
				}
				if (!$is_find) {
					$arr2['Характеристика'] = '';
				}
			}

			if (array_key_exists('quantity', $c)) {
				if (!is_numeric($c['quantity'])) {
					parent::prepare_response(['error' => 'FIELD_QUANTITY_MUST_BE_A_NUMBER']);
				}
				if (strpos($c['quantity'], '.') !== false) {
					parent::prepare_response(['error' => 'THE_QUANTITY_FIELD_MUST_CONTAIN_AN_INTEGER']);
				}
				if ($c['quantity'] < 1) {
					parent::prepare_response(['error' => 'FIELD_QUANTITY_MUST_BE_GREATER_THAN_ZERO']);
				}
				if ($c['quantity'] > 10000000000) {
					parent::prepare_response(['error' => 'FIELD_QUANTITY_SHOULD_NOT_BE_MORE_THAN_1_BILLION']);
				}
				$arr2['Количество'] = (int) $c['quantity'];
			}

			if (array_key_exists('bonus_percentage', $c)) {
				if (!is_numeric($c['bonus_percentage'])) {
					parent::prepare_response(['error' => 'FIELD_BONUS_PERCENTAGE_MUST_BE_A_NUMBER']);
				}
				if ($c['bonus_percentage'] > 100) {
					parent::prepare_response(['error' => 'FIELD_BONUS_PERCENTAGE_CANNOT_BE_MORE_THAN_100']);
				}
				if ($c['bonus_percentage'] < 0) {
					parent::prepare_response(['error' => 'FIELD_BONUS_PERCENTAGE_CANNOT_BE_LESS_THAN_ZERO']);
				}
				$arr2['ПроцентБонуса'] = (float) $c['bonus_percentage'];
			}

			if (!array_key_exists('ВидНоменклатурыИД', $arr2)) {
				parent::prepare_response(['error' => 'MISSING_ID_NOMENCLATURE_TYPE_FIELD']);
			}

			if (!array_key_exists('НоменклатураИД', $arr2)) {
				parent::prepare_response(['error' => 'MISSING_ID_NOMENCLATURE_FIELD']);
			}

			if (!array_key_exists('Характеристика', $arr2)) {
				parent::prepare_response(['error' => 'MISSING_LENGTH_FIELD']);
			}

			if (!array_key_exists('Количество', $arr2)) {
				parent::prepare_response(['error' => 'MISSING_QUANTITY_FIELD']);
			}

			if (!array_key_exists('ПроцентБонуса', $arr2)) {
				parent::prepare_response(['error' => 'MISSING_BONUS_PERCENTAGE_FIELD']);
			}

			$arr[] = $arr2;

		}

		$goods = $arr;
		$arr = [];

		if (!is_array($goods_non_standard_addition)) {
			parent::prepare_response(['error' => 'FIELD_GOODS_NON_STANDARD_ADDITION_MUST_BE_AN_ARRAY']);
		}

		$si = sizeof($goods_non_standard_addition);
		if ($si > 100) {
			parent::prepare_response(['error' => 'LIMIT_MAX_COUNT_GOODS_NON_STANDARD_ADDITION', 'comment' => 100]);
		}

		foreach ($goods_non_standard_addition as $c) {

			$arr2 = [];

			if (array_key_exists('description', $c)) {
				$arr2['Описание'] = mb_substr(htmlspecialchars($c['description'], ENT_QUOTES, $this->encoding), 0, 1000);
				if ($arr2['Описание'] == '') {
					parent::prepare_response(['error' => 'FIELD_DESCRIPTION_MUST_BE_FILLED_IN']);
				}
			}

			if (array_key_exists('quantity', $c)) {
				if (!is_numeric($c['quantity'])) {
					parent::prepare_response(['error' => 'FIELD_QUANTITY_MUST_BE_A_NUMBER']);
				}
				if (strpos($c['quantity'], '.') !== false) {
					parent::prepare_response(['error' => 'THE_QUANTITY_FIELD_MUST_CONTAIN_AN_INTEGER']);
				}
				if ($c['quantity'] < 1) {
					parent::prepare_response(['error' => 'FIELD_QUANTITY_MUST_BE_GREATER_THAN_ZERO']);
				}
				if ($c['quantity'] > 10000000000) {
					parent::prepare_response(['error' => 'FIELD_QUANTITY_SHOULD_NOT_BE_MORE_THAN_1_BILLION']);
				}
				$arr2['Количество'] = (int) $c['quantity'];
			}

			if (!array_key_exists('Описание', $arr2)) {
				parent::prepare_response(['error' => 'MISSING_DESCRIPTION_FIELD']);
			}

			if (!array_key_exists('Количество', $arr2)) {
				parent::prepare_response(['error' => 'MISSING_QUANTITY_FIELD']);
			}

			$arr[] = $arr2;

		}

		$goods_non_standard_addition = $arr;
		$arr = [];

		if (!is_array($files_non_standard_addition)) {
			parent::prepare_response(['error' => 'FIELD_FILES_NON_STANDARD_ADDITION_MUST_BE_AN_ARRAY']);
		}

		$si = sizeof($files_non_standard_addition);
		if ($si > 5) {
			parent::prepare_response(['error' => 'LIMIT_MAX_COUNT_FILES_NON_STANDARD_ADDITION', 'comment' => 5]);
		}

		if (sizeof($goods_non_standard_addition) > 0) {
			foreach ($files_non_standard_addition as $c) {

				$arr2 = [];

				if (array_key_exists('link', $c)) {
					$arr2['СсылкаНаФайл'] = mb_substr(htmlspecialchars($c['link'], ENT_QUOTES, $this->encoding), 0, 255);
					if ($arr2['СсылкаНаФайл'] == '') {
						parent::prepare_response(['error' => 'LINK_IS_NOT_FILLED_IN']);
					}
					$arr2['ИмяФайла'] = preg_replace('/.+\/(([^\/]+)\.(' . implode('|', $this->config_project['allow_file_for_non_standard_addition']) . '))/', '$1', $arr2['СсылкаНаФайл']);
				}

				if (!array_key_exists('СсылкаНаФайл', $arr2)) {
					parent::prepare_response(['error' => 'MISSING_LINK_FIELD']);
				}

				$arr[] = $arr2;

			}
		}

		$files_non_standard_addition = $arr;

		if (sizeof($goods) == 0 && sizeof($goods_non_standard_addition) == 0) {
			parent::prepare_response(['error' => 'THE_QUANTITY_OF_GOODS_IN_THE_ORDER_MUST_BE_GREATER_THAN_ZERO']);
		}

		$token = '';
		$main_counterparty_id = '';

		try {

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);

			if (sizeof($result) == 0) {
				parent::prepare_response(['error' => 'NO_EXISTS_ACCOUNT']);
			}

			foreach ($result as $row) {

				if ($this->time - $row->expires_token >= 0) {
					parent::prepare_response(['error' => 'EXPIRES_TOKEN']);
				}
				$token = $row->token;
				$main_counterparty_id = $row->main_counterparty_id;

			}

		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error' => $err]);
		}

		$prices_product_catalog_data = parent::get_prices_of_the_main_counterparty($main_counterparty_id);

		if (array_key_exists('error', $prices_product_catalog_data)) {
			parent::prepare_response(['error' => $prices_product_catalog_data['error']]);
		}

		$arr_prices_product_catalog_id_price = [];
		foreach ($prices_product_catalog_data['data'] as $c) {
			foreach ($c['Данные'] as $c2) {
				$arr_prices_product_catalog_id_price[$c2['НоменклатураИД']] = $c2['Цена'];
			}
		}

		$product_catalog_data = parent::get_product_catalog();

		if (array_key_exists('error', $product_catalog_data)) {
			parent::prepare_response(['error' => $product_catalog_data['error']]);
		}

		$arr_product_catalog_id_data = [];
		foreach ($product_catalog_data['data'] as $c) {
			foreach ($c['Данные'] as $c2) {
				$arr_product_catalog_id_data[$c2['НоменклатураИД']] = [
					'КоличествоШтукВКомплекте' => $c2['КоличествоШтукВКомплекте'],
					'КоэффициентПересчетаКоличества' => $c2['КоэффициентПересчетаКоличества'],
					'ЗаполнятьХарактеристику' => $c2['ЗаполнятьХарактеристику'],
					'ПродаетсяКомплектами' => $c2['ПродаетсяКомплектами'],
					'НоменклатураНаименование' => $c2['Наименование'],
					'НедоступноДляВыбора' => $c2['НедоступноДляВыбора']
				];
			}
		}

		foreach ($goods as $c) {
			if (array_key_exists($c['НоменклатураИД'], $arr_product_catalog_id_data)) {
				if ($arr_product_catalog_id_data[$c['НоменклатураИД']]['НедоступноДляВыбора']) {
					// вот этот говнокод пришлось написать потому что наш супер фронтендер - ленивая задница
					parent::prepare_response(['error' => 'Этот товар недоступен для заказа (' . $arr_product_catalog_id_data[$c['НоменклатураИД']]['НоменклатураНаименование'] . ')']);
					//
				}
			}
		}

		parent::check_counterparty_id($main_counterparty_id, $counterparty_id);
		parent::check_shipping_warehouse_id($shipping_warehouse_id);

		if ($is_shipping == '') {
			$delivery_address = '';
			$delivery_address_id = '';
		}
		if ($shipping_date == '') {
			$shipping_date = '0001-01-01T00:00:00';
		}
		$timestamp_shipments = date('U', strtotime($shipping_date));
		if ($timestamp_shipments < 0) {
			$timestamp_shipments = 0;
		}

		$based_on_cart_ = str_replace(['product_remains', 'substandard', 'finished_products'], ['Остатки складских позиций', 'Распродажа некондиции', 'Распродажа готовой продукции'], $based_on_cart);

		$mysqli = @new \mysqli(env('DB_HOST'), env('DB_USERNAME'), env('DB_PASSWORD'), env('DB_DATABASE'));		
		if($mysqli->connect_error) {
			$err = $mysqli->connect_error;
			parent::log_er_mysql($err);
			parent::prepare_response(['error' => $err], true);
		}
		
		if(!$mysqli->query('CREATE TABLE `orders_'.$main_counterparty_id.'` (`id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, `date` char(22) NOT NULL DEFAULT \'\', `timestamp_order` int(10) UNSIGNED NOT NULL DEFAULT 0, `order_id` char(36) NOT NULL DEFAULT \'-\', `order_number` char(11) NOT NULL DEFAULT \'\', `status` enum(\'needs_confirmation\',\'ready_for_shipment\',\'in_work\',\'in_processing\',\'shipped\',\'in_shipment\',\'canceled\',\'draft\') NOT NULL DEFAULT \'draft\', `counterparty_id` char(36) NOT NULL DEFAULT \'\', `sum` char(32) NOT NULL DEFAULT \'0\', `is_cash_payment` char(1) NOT NULL DEFAULT \'\', `shipping_date` char(22) NOT NULL DEFAULT \'\', `timestamp_shipments` int(10) UNSIGNED NOT NULL DEFAULT 0, `shipping_warehouse_id` char(36) NOT NULL DEFAULT \'\', `is_shipping` char(1) NOT NULL DEFAULT \'\', `weight` char(32) NOT NULL DEFAULT \'0\', `delivery_address_id` char(36) NOT NULL DEFAULT \'\', `responsible_sokrof` blob DEFAULT NULL, `client_id` char(36) NOT NULL DEFAULT \'\', `goods` text DEFAULT \'\', `goods_non_standard_addition` blob DEFAULT NULL, `files_non_standard_addition` blob DEFAULT NULL, `ids_row_update` text DEFAULT \'\', `popular_statuses` text DEFAULT \'\', `comment` blob DEFAULT NULL, `orderlkid` char(36) NOT NULL DEFAULT \'\' ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;')){
			$err = $mysqli->error;
			if(strpos($err, 'already exists') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error' => $err], true);
			}
		}else{
			if(!$mysqli->query('ALTER TABLE `orders_' . $main_counterparty_id . '` ADD KEY `order_id_index` (`order_id`) USING BTREE')){
				$err = $mysqli->error;
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);		
			}				
		}

		try {

			DB::beginTransaction();
				# блокируем всю таблицу в рамках транзакции
				DB::select('SELECT COUNT(`id`) FROM `orders_' . $main_counterparty_id . '` FOR UPDATE');
				if (DB::table('orders_' . $main_counterparty_id)->count('id') == 0) {
					DB::insert('INSERT INTO `orders_' . $main_counterparty_id . '` (`popular_statuses`) values (\'{"ready_for_shipment":0, "with_shipments":0, "needs_confirmation":0, "draft":0}\')');
				}
			DB::commit();

		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error' => $err]);
			
		}
			
		$orderlkid = parent::create_guid();
		
		$data_ = ['id' => $orderlkid, 'counterparty_id' => $counterparty_id, 'is_cash_payment' => ($is_cash_payment == '1'), 'shipping_date' => $shipping_date, 'shipping_warehouse_id' => $shipping_warehouse_id, 'is_shipping' => ($is_shipping == '1'), 'delivery_address' => $delivery_address, 'delivery_address_id' => $delivery_address_id, 'goods' => $goods, 'goods_non_standard_addition' => $goods_non_standard_addition, 'files_non_standard_addition' => $files_non_standard_addition, 'comment' => $comment, 'based_on_cart' => $based_on_cart_, 'token' => $token];

		if ($is_draft == '') {

			list($result, $err) = parent::post_request_to_api_1c('order_creation', $data_);
			if ($err) {
				
				# пришлось написать этот дебильный кастыль, неспрашивайте зачем
				if($err == 'FAIL_SOCKET_CONNECT' || $err == 'CONNECTION_TIMEOUT'){
					try {

						$result = DB::select('SELECT `id` FROM `orderslkid` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);

						if (sizeof($result) == 0) {
							DB::insert('INSERT INTO `orderslkid` (`user_myid`, `orderlkid`, `hash_goods`) values (:user_myid, :orderlkid, :hash_goods)', ['user_myid' => $user_myid, 'orderlkid' => $orderlkid, 'hash_goods' => md5(json_encode($goods))]);
						}else{
							DB::insert('UPDATE `orderslkid` SET `orderlkid` = :orderlkid, `hash_goods` = :hash_goods WHERE `user_myid` = :user_myid LIMIT 1', ['orderlkid' => $orderlkid, 'hash_goods' => md5(json_encode($goods)), 'user_myid' => $user_myid]);
						}
			
					} catch (QueryException $e) {
						$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
						parent::log_er_mysql($err);
						parent::prepare_response(['error' => $err]);
					}
				}
				
				parent::prepare_response(['error' => $err], true);
			}

			if (array_key_exists('Ошибка', $result)) {
				parent::prepare_response(['error' => $result['Ошибка']], true);
			}

			if (!array_key_exists('Номер', $result)) {
				parent::prepare_response(['error' => 'NO_EXISTS_KEY_Номер']);
			}

			if (!array_key_exists('Дата', $result)) {
				parent::prepare_response(['error' => 'NO_EXISTS_KEY_Дата']);
			}

			if (!array_key_exists('ЗаказПокупателяИД', $result)) {
				parent::prepare_response(['error' => 'NO_EXISTS_KEY_ЗаказПокупателяИД']);
			}

			if (!array_key_exists('СуммаДокумента', $result)) {
				parent::prepare_response(['error' => 'NO_EXISTS_KEY_СуммаДокумента']);
			}

			if (!array_key_exists('ДатаОтгрузки', $result)) {
				parent::prepare_response(['error' => 'NO_EXISTS_KEY_ДатаОтгрузки']);
			}

			if (!array_key_exists('Вес', $result)) {
				parent::prepare_response(['error' => 'NO_EXISTS_KEY_Вес']);
			}

			try {
				DB::delete('DELETE FROM `orderslkid` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			} catch (QueryException $e) {
				$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
				parent::log_er_mysql($err);
				parent::prepare_response(['error' => $err]);
			}
		
		}

		if ($shipping_date == '0001-01-01T00:00:00') {
			$shipping_date_ = '';
		} else {
			$shipping_date_ = $shipping_date;
		}

		if ($is_draft == '1' && empty($draft_id)) {

			$date = preg_replace('/(\+|\-)[0-9]{2}:[0-9]{2}$/', '', date('c', $this->time));
			$timestamp_order = $this->time;
			if (empty($order_id))
				$order_id = parent::create_guid();
			$order_number = (string) mt_rand(10000, 99900) . mt_rand(100000, 999000);
			$status = 'draft';
			$sum = 0;
			$weight = '0';
			$orderlkid = '';
			
			try {

				$result = DB::select('SELECT `orderlkid`, `hash_goods` FROM `orderslkid` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
				
				if (sizeof($result) == 0) {
					$orderlkid = '';
				}else{
					foreach ($result as $row) {
						if($row->hash_goods == md5(json_encode($goods))){
							$orderlkid = $row->orderlkid;
						}
					}
					if($orderlkid != ''){
						DB::delete('DELETE FROM `orderslkid` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
					}
				}

			} catch (QueryException $e) {
				$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
				parent::log_er_mysql($err);
				parent::prepare_response(['error' => $err]);
			}
		
			foreach ($goods as $c) {

				$price = -1;
				$is_fill_out_the_characteristics = false;
				$number_of_pieces_per_set = 0;
				$quantity_conversion_factor = 0;
				$is_sold_in_sets = false;
				$percentage_discounts_surcharges = 0;

				if (array_key_exists($c['НоменклатураИД'], $arr_prices_product_catalog_id_price)) {
					$price = $arr_prices_product_catalog_id_price[$c['НоменклатураИД']];
				}

				if (array_key_exists($c['НоменклатураИД'], $arr_product_catalog_id_data)) {
					$number_of_pieces_per_set = $arr_product_catalog_id_data[$c['НоменклатураИД']]['КоличествоШтукВКомплекте'];
					$quantity_conversion_factor = $arr_product_catalog_id_data[$c['НоменклатураИД']]['КоэффициентПересчетаКоличества'];
					$is_fill_out_the_characteristics = $arr_product_catalog_id_data[$c['НоменклатураИД']]['ЗаполнятьХарактеристику'];
					$is_sold_in_sets = $arr_product_catalog_id_data[$c['НоменклатураИД']]['ПродаетсяКомплектами'];
				}

				if ($is_fill_out_the_characteristics) {
					if ($c['Характеристика'] == '') {
						$total = $c['Количество'] * 1 * $quantity_conversion_factor / 1000;
					} else {
						$total = $c['Количество'] * $c['Характеристика'] * $quantity_conversion_factor / 1000;
					}
				} else if ($is_sold_in_sets) {
					$total = $c['Количество'] * $number_of_pieces_per_set;
				} else {
					$total = $c['Количество'];
				}
				$total = round($total, 2);

				if ($price > -1) {
					$sum += round($total * $price * (1 - (($c['ПроцентБонуса'] + $percentage_discounts_surcharges) / 100)), 2);
				}

			}

		}

		if ($is_draft == '1' && !empty($draft_id)) {
			
			if (Schema::hasTable('orders_' . $main_counterparty_id)) {

				try{
					
					$result = DB::select('SELECT `date`, `timestamp_order`, `order_number`, `orderlkid` FROM `orders_'.$main_counterparty_id.'` WHERE `order_id` = :order_id LIMIT 1', ['order_id' => $draft_id]);
					
				} catch (QueryException $e) {
					$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
					parent::log_er_mysql($err);
					parent::prepare_response(['error' => $err]);
				}
			
				foreach ($result as $row) {

					$existsing_order = $row;

					$date = $row->date;
					$timestamp_order = $row->timestamp_order;
					$order_id = $draft_id;
					$orderlkid = $row->orderlkid;
					$order_number = $row->order_number;
					$status = 'draft';
					$sum = 0;
					$weight = '0';

					foreach ($goods as $c) {

						$price = -1;
						$is_fill_out_the_characteristics = false;
						$number_of_pieces_per_set = 0;
						$quantity_conversion_factor = 0;
						$is_sold_in_sets = false;
						$percentage_discounts_surcharges = 0;

						if (array_key_exists($c['НоменклатураИД'], $arr_prices_product_catalog_id_price)) {
							$price = $arr_prices_product_catalog_id_price[$c['НоменклатураИД']];
						}

						if (array_key_exists($c['НоменклатураИД'], $arr_product_catalog_id_data)) {
							$number_of_pieces_per_set = $arr_product_catalog_id_data[$c['НоменклатураИД']]['КоличествоШтукВКомплекте'];
							$quantity_conversion_factor = $arr_product_catalog_id_data[$c['НоменклатураИД']]['КоэффициентПересчетаКоличества'];
							$is_fill_out_the_characteristics = $arr_product_catalog_id_data[$c['НоменклатураИД']]['ЗаполнятьХарактеристику'];
							$is_sold_in_sets = $arr_product_catalog_id_data[$c['НоменклатураИД']]['ПродаетсяКомплектами'];
						}

						if ($is_fill_out_the_characteristics) {
							if ($c['Характеристика'] == '') {
								$total = $c['Количество'] * 1 * $quantity_conversion_factor / 1000;
							} else {
								$total = $c['Количество'] * $c['Характеристика'] * $quantity_conversion_factor / 1000;
							}
						} else if ($is_sold_in_sets) {
							$total = $c['Количество'] * $number_of_pieces_per_set;
						} else {
							$total = $c['Количество'];
						}
						$total = round($total, 2);

						if ($price > -1) {
							$sum += round($total * $price * (1 - (($c['ПроцентБонуса'] + $percentage_discounts_surcharges) / 100)), 2);
						}

					}
					
				}

			}

		}

		if ($is_draft == '') {

			$date = mb_substr(htmlspecialchars($result['Дата'], ENT_QUOTES, $this->encoding), 0, 22);
			$timestamp_order = date('U', strtotime($date));
			if ($timestamp_order < 0) {
				$timestamp_order = 0;
			}
			$order_id = mb_substr(htmlspecialchars($result['ЗаказПокупателяИД'], ENT_QUOTES, $this->encoding), 0, 36);
			$order_number = (string) mb_substr(htmlspecialchars($result['Номер'], ENT_QUOTES, $this->encoding), 0, 11);
			$status = 'in_processing';
			$sum = mb_substr(htmlspecialchars($result['СуммаДокумента'], ENT_QUOTES, $this->encoding), 0, 20);
			$weight = (string) mb_substr(htmlspecialchars($result['Вес'], ENT_QUOTES, $this->encoding), 0, 32);
			$orderlkid = '';
			
		}

		if (!Schema::hasTable('orders_' . $main_counterparty_id)) {
		
			$mysqli = @new \mysqli(env('DB_HOST'), env('DB_USERNAME'), env('DB_PASSWORD'), env('DB_DATABASE'));		
			if($mysqli->connect_error) {
				$err = $mysqli->connect_error;
				parent::log_er_mysql($err);
				parent::prepare_response(['error' => $err]);
			}

			if(!$mysqli->query('CREATE TABLE `orders_'.$main_counterparty_id.'` (`id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, `date` char(22) NOT NULL DEFAULT \'\', `timestamp_order` int(10) UNSIGNED NOT NULL DEFAULT 0, `order_id` char(36) NOT NULL DEFAULT \'-\', `order_number` char(11) NOT NULL DEFAULT \'\', `status` enum(\'needs_confirmation\',\'ready_for_shipment\',\'in_work\',\'in_processing\',\'shipped\',\'in_shipment\',\'canceled\',\'draft\') NOT NULL DEFAULT \'draft\', `counterparty_id` char(36) NOT NULL DEFAULT \'\', `sum` char(32) NOT NULL DEFAULT \'0\', `is_cash_payment` char(1) NOT NULL DEFAULT \'\', `shipping_date` char(22) NOT NULL DEFAULT \'\', `timestamp_shipments` int(10) UNSIGNED NOT NULL DEFAULT 0, `shipping_warehouse_id` char(36) NOT NULL DEFAULT \'\', `is_shipping` char(1) NOT NULL DEFAULT \'\', `weight` char(32) NOT NULL DEFAULT \'0\', `delivery_address_id` char(36) NOT NULL DEFAULT \'\', `responsible_sokrof` blob DEFAULT NULL, `client_id` char(36) NOT NULL DEFAULT \'\', `goods` text DEFAULT \'\', `goods_non_standard_addition` blob DEFAULT NULL, `files_non_standard_addition` blob DEFAULT NULL, `ids_row_update` text DEFAULT \'\', `popular_statuses` text DEFAULT \'\', `comment` blob DEFAULT NULL, `orderlkid` char(36) NOT NULL DEFAULT \'\' ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;')){
				$err = $mysqli->error;
				if(strpos($err, 'already exists') === false){
					parent::log_er_mysql($err);
					parent::prepare_response(['error' => $err]);
				}
			}else{
				if(!$mysqli->query('ALTER TABLE `orders_' . $main_counterparty_id . '` ADD KEY `order_id_index` (`order_id`) USING BTREE')){
					$err = $mysqli->error;
					parent::log_er_mysql($err);
					parent::prepare_response(['error'=>$err]);		
				}				
			}
			
			try {

				DB::beginTransaction();
					# блокируем всю таблицу в рамках транзакции
					DB::select('SELECT COUNT(`id`) FROM `orders_' . $main_counterparty_id . '` FOR UPDATE');
					if (DB::table('orders_' . $main_counterparty_id)->count('id') == 0) {
						DB::insert('INSERT INTO `orders_' . $main_counterparty_id . '` (`popular_statuses`) values (\'{"ready_for_shipment":0, "with_shipments":0, "needs_confirmation":0, "draft":0}\')');
					}
				DB::commit();

			} catch (QueryException $e) {
				
				DB::rollBack();
				$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
				parent::log_er_mysql($err);
				parent::prepare_response(['error' => $err]);		
				
			}

		}

		if ($is_draft == '1' && !empty($draft_id) && !empty($existsing_order)) {

			try {

				$result = DB::select('SELECT `status` FROM `orders_'.$main_counterparty_id.'` WHERE `order_id` = :order_id LIMIT 1', ['order_id' => $order_id]);
				
				foreach ($result as $row) {
					
					DB::insert('UPDATE `orders_'.$main_counterparty_id.'` SET `counterparty_id` = :counterparty_id, `sum` = :sum, `is_cash_payment` = :is_cash_payment, `shipping_date` = :shipping_date, `timestamp_shipments` = :timestamp_shipments, `shipping_warehouse_id` = :shipping_warehouse_id, `is_shipping` = :is_shipping, `weight` = :weight, `delivery_address_id` = :delivery_address_id, `client_id` = :client_id, `goods` = :goods, `goods_non_standard_addition` = AES_ENCRYPT(:goods_non_standard_addition, :aes_key2), `files_non_standard_addition` = AES_ENCRYPT(:files_non_standard_addition, :aes_key3), `comment` = AES_ENCRYPT(:comment, :aes_key4) WHERE `order_id` = :order_id LIMIT 1', ['counterparty_id' => $counterparty_id, 'sum' => $sum, 'is_cash_payment' => $is_cash_payment, 'shipping_date' => $shipping_date, 'timestamp_shipments' => $timestamp_shipments, 'shipping_warehouse_id' => $shipping_warehouse_id, 'is_shipping' => $is_shipping, 'weight' => $weight, 'delivery_address_id' => $delivery_address_id, 'client_id' => $user_myid, 'goods' => parent::escape_unicode_decode(json_encode($goods)), 'goods_non_standard_addition' => parent::escape_unicode_decode(json_encode($goods_non_standard_addition)), 'aes_key2' => $this->aes_key[0], 'files_non_standard_addition' => parent::escape_unicode_decode(json_encode($files_non_standard_addition)), 'aes_key3' => $this->aes_key[0], 'comment' => $comment, 'aes_key4' => $this->aes_key[0], 'order_id' => $order_id]);

				}

			} catch (QueryException $e) {
				$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
				parent::log_er_mysql($err);
				parent::prepare_response(['error' => $err]);
			}

		} else {

			try {

				DB::insert('INSERT INTO `orders_' . $main_counterparty_id . '` (`date`, `timestamp_order`, `order_id`, `order_number`, `status`, `counterparty_id`, `sum`, `is_cash_payment`, `shipping_date`, `timestamp_shipments`, `shipping_warehouse_id`, `is_shipping`, `weight`, `delivery_address_id`, `client_id`, `goods`, `goods_non_standard_addition`, `files_non_standard_addition`, `comment`, `orderlkid`) values (:date, :timestamp_order, :order_id, :order_number, :status, :counterparty_id, :sum, :is_cash_payment, :shipping_date, :timestamp_shipments, :shipping_warehouse_id, :is_shipping, :weight, :delivery_address_id, :client_id, :goods, AES_ENCRYPT(:goods_non_standard_addition, :aes_key), AES_ENCRYPT(:files_non_standard_addition, :aes_key2), AES_ENCRYPT(:comment, :aes_key3), :orderlkid)', ['date' => $date, 'timestamp_order' => $timestamp_order, 'order_id' => $order_id, 'order_number' => $order_number, 'status' => $status, 'counterparty_id' => $counterparty_id, 'sum' => $sum, 'is_cash_payment' => $is_cash_payment, 'shipping_date' => $shipping_date_, 'timestamp_shipments' => $timestamp_shipments, 'shipping_warehouse_id' => $shipping_warehouse_id, 'is_shipping' => $is_shipping, 'weight' => $weight, 'delivery_address_id' => $delivery_address_id, 'client_id' => $user_myid, 'goods' => parent::escape_unicode_decode(json_encode($goods)), 'goods_non_standard_addition' => parent::escape_unicode_decode(json_encode($goods_non_standard_addition)), 'aes_key' => $this->aes_key[0], 'files_non_standard_addition' => parent::escape_unicode_decode(json_encode($files_non_standard_addition)), 'aes_key2' => $this->aes_key[0], 'comment' => $comment, 'aes_key3' => $this->aes_key[0], 'orderlkid' => $orderlkid]);

			} catch (QueryException $e) {
				$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
				parent::log_er_mysql($err);
				parent::prepare_response(['error' => $err]);
			}
			
		}

		try {

			if ($is_draft == '1') {

				DB::beginTransaction();
				# блокируем всю таблицу в рамках транзакции
				DB::select('SELECT COUNT(`id`) FROM `orders_' . $main_counterparty_id . '` FOR UPDATE');
				$popular_statuses = parent::get_data_from_popular_statuses($main_counterparty_id);
				DB::update('UPDATE `orders_' . $main_counterparty_id . '` SET `popular_statuses` = :popular_statuses WHERE `id` = 1 LIMIT 1', ['popular_statuses' => $popular_statuses]);
				DB::commit();

			}

			if ($is_after_editing == '1') {

				DB::beginTransaction();
						
					# блокируем всю таблицу в рамках транзакции
					DB::select('SELECT COUNT(`id`) FROM `orders_' . $main_counterparty_id . '` FOR UPDATE');
				
					DB::delete('DELETE FROM `orders_' . $main_counterparty_id . '` WHERE `status` = \'draft\' AND `order_id` = :draft_id LIMIT 1', ['draft_id' => $draft_id]);

					$popular_statuses = parent::get_data_from_popular_statuses($main_counterparty_id);

					DB::update('UPDATE `orders_' . $main_counterparty_id . '` SET `popular_statuses` = :popular_statuses WHERE `id` = 1 LIMIT 1', ['popular_statuses' => $popular_statuses]);

				DB::commit();

				if (Schema::hasTable('commercial_offers_' . $user_myid)) {
					DB::delete('DELETE FROM `commercial_offers_' . $user_myid . '` WHERE `draft_id` = :draft_id LIMIT 1', ['draft_id' => $draft_id]);
				}

			}

		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error' => $err]);
			
		}

		if ($based_on_cart != '') {

			try {

				foreach ($goods as $c) {
					$id_nomenclature = $c['НоменклатураИД'];
					$id_nomenclature_type = $c['ВидНоменклатурыИД'];
					DB::delete('DELETE FROM `cart_' . $user_myid . '` WHERE `id_nomenclature` = :id_nomenclature AND `id_nomenclature_type` = :id_nomenclature_type AND `target` = :target', ['id_nomenclature' => $id_nomenclature, 'id_nomenclature_type' => $id_nomenclature_type, 'target' => $based_on_cart]);
				}

			} catch (QueryException $e) {
				$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
				if (strpos($err, 'Base table or view not found') === false) {
					parent::log_er_mysql($err);
					parent::prepare_response(['error' => $err]);
				}
			}

		}

		parent::prepare_response(['response' => 'ok', 'is_draft' => $is_draft]);

	}

}
