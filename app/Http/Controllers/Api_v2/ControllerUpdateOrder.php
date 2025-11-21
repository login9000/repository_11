<?php

namespace App\Http\Controllers\Api_v2;

use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Schema;

class ControllerUpdateOrder extends Common {
	
	public function handler(Request $request) {
		
		parent::check_allowed_method('PUT');

		$data = ($request->input('Данные') ?? '');
		
		if ($data === '' || !is_array($data)) {
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Данные" пустое либо было некорректно заполнено')));
		}
		
		if(!array_key_exists('ПользовательИД', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ПользовательИД" отсуствует')));
		}
		$user_myid = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['ПользовательИД'], 0, 36)));
		if(empty($user_myid)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ПользовательИД" пустое либо было некорректно заполнено')));
		}
		
		if(!array_key_exists('ЗаказПокупателяИД', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ЗаказПокупателяИД" отсуствует')));
		}
		$order_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['ЗаказПокупателяИД'], 0, 36)));
		if(empty($order_id)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ЗаказПокупателяИД" пустое либо было некорректно заполнено')));
		}

		if(!empty($data['ДатаСоздания']) && date('U', strtotime($data['ДатаСоздания'])) > 0){
			$date = $data['ДатаСоздания'];
			$timestamp_order = strtotime($data['ДатаСоздания']);
		}

		if(array_key_exists('НаличнаяОплата', $data)){
			$is_cash_payment = $data['НаличнаяОплата'] == 1 ? '1' : '';
		}
					
		if(!empty($data['ДатаОтгрузки']) && date('U', strtotime($data['ДатаОтгрузки'])) > 0) {
			$shipping_date = $data['ДатаОтгрузки'];
			$timestamp_shipments = strtotime($data['ДатаОтгрузки']);
		}

		if (!empty($data['СкладОтгрузкиИД'])) {
			$shipping_warehouse_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['СкладОтгрузкиИД'] ?? '', 0, 36)));
		}
		
		if(!empty($data['НовыйГоловнойКонтрАгентИД'])){
			$new_lead_contractor_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['НовыйГоловнойКонтрАгентИД'] ?? '', 0, 36)));
		}
		
		if (!empty($data['Статус'])) {
			if(!array_key_exists($data['Статус'], config('project.orders_statuses'))){
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Статус" должно содержать один из следующих статусов: '.implode(', ', array_keys(config('project.orders_statuses'))))));
			}
			$status = config('project.orders_statuses')[$data['Статус']];
		}
		
		if (!empty($data['Комментарий'])) {
			$comment = $data['Комментарий'];
		}
		
		if (!empty($data['НомерЗаказа'])) {
			$order_number = $data['НомерЗаказа'];
		}

		if (!empty($data['КонтрагентИД'])) {
			$counterparty_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['КонтрагентИД'] ?? '', 0, 36)));
		}

		if (array_key_exists('Доставка', $data)) {
			$is_shipping = $data['Доставка'] == 1 ? '1' : '';
			if ($data['Доставка'] == 1 && !empty($data['АдресДоставкиИД'])) {
				$delivery_address_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['АдресДоставкиИД'] ?? '', 0, 36)));
			}
		}

		if (!empty($data['Вес']) && is_numeric($data['Вес'])) {
			$weight = trim(preg_replace('/[^0-9\.]/', '', $data['Вес']));
		}
		
		if (!empty($data['Сумма']) && is_numeric($data['Сумма'])) {
			$sum = trim(preg_replace('/[^0-9\.]/', '', $data['Сумма']));
		}

		// if(!array_key_exists('Товары', $data) && !array_key_exists('НестандартнаяДоборка', $data)){
			// return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Отсуствуют поля "Товары" и "НестандартнаяДоборка", должно присутствовать хотя одно из этих полей')));
		// }
		// if(empty($data['Товары']) && empty($data['НестандартнаяДоборка'])){
			// return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поля "Товары" и "НестандартнаяДоборка" пусты либо были некорректно заполнены, необходимо чтобы было заполнено хотя бы одно из этих полей')));
		// }
		// if(((!empty($data['Товары'])) && (!is_array($data['Товары']) || (sizeof($data['Товары']) == 0 ))) && ((!empty($data['НестандартнаяДоборка'])) && (!is_array($data['НестандартнаяДоборка']) || (sizeof($data['НестандартнаяДоборка']) == 0 )))){
			// return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поля "Товары" и "НестандартнаяДоборка" пусты либо были некорректно заполнены, необходимо чтобы было заполнено хотя бы одно из этих полей')));
		// }
		// if((!empty($data['Товары']) && sizeof($data['Товары']) == 0 && empty($data['НестандартнаяДоборка'])) || (!empty($data['НестандартнаяДоборка']) && sizeof($data['НестандартнаяДоборка']) == 0 && empty($data['Товары']))){
			// return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поля "Товары" или "НестандартнаяДоборка" пусты либо были некорректно заполнены, необходимо чтобы было заполнено хотя бы одно из этих полей')));
		// }
		if(!empty($data['Товары']) && sizeof($data['Товары']) > 0){
			list($result_, $err) = parent::check_goods($data['Товары']);
			if($err){
				return parent::escape_unicode_decode(json_encode(['Ошибка' => $err]));
			}
			$goods = json_encode($result_, JSON_UNESCAPED_UNICODE);
		}
		if(!empty($data['НестандартнаяДоборка']) && sizeof($data['НестандартнаяДоборка']) > 0){
			list($result_, $err) = parent::check_non_standard_goods($data['НестандартнаяДоборка']);
			if($err){
				return parent::escape_unicode_decode(json_encode(['Ошибка' => $err]));
			}
			$goods_non_standard_addition = json_encode($result_, JSON_UNESCAPED_UNICODE);
		}
			
		if (!empty($data['НовыйПользовательИД']) ) {
			$client_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['НовыйПользовательИД'] ?? '', 0, 36)));
		}
				
		if(array_key_exists('НестандартнаяДоборкаПрикрепленныеФайлы', $data) && !is_array($data['НестандартнаяДоборкаПрикрепленныеФайлы'])){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "НестандартнаяДоборкаПрикрепленныеФайлы" пустое либо было некорректно заполнено')));
		}

		if(array_key_exists('НестандартнаяДоборкаПрикрепленныеФайлы', $data) && sizeof($data['НестандартнаяДоборкаПрикрепленныеФайлы']) > 0){
				
				$final_files_array = [];
				$allowed_file_extensions = config('project.allow_file_for_non_standard_addition');

				foreach ($data['НестандартнаяДоборкаПрикрепленныеФайлы'] as $item) {

						if (!empty($item['ДанныеФайла']) && !empty($item['РасширениеФайла'])) {

								if (in_array($item['РасширениеФайла'], $allowed_file_extensions)) {

										$file_name = date('H-i-s__d.m.Y__') . mt_rand(10000, 99900) . mt_rand(10000, 99900) . '.' . $item['РасширениеФайла'];

										$final_files_array[] = [
												'СсылкаНаФайл' => parent::upload_file_from_base64($client_id, $file_name, $item['ДанныеФайла']),
												'ИмяФайла' => $file_name,
										];
								} else {
										return parent::escape_unicode_decode(json_encode(['Ошибка' => 'Файл непододящего формата']));
								}
						}
				}
				
				if (!empty($files_non_standard_addition)) {
						$json_decoded_files = json_decode($files_non_standard_addition, true);

						foreach ($json_decoded_files as $file) {
								if (is_file($this->document_root . $file['СсылкаНаФайл'])) {
										@unlink($this->document_root . $file['СсылкаНаФайл']);
								}
						}
				}
				
				$files_non_standard_addition = json_encode($final_files_array, JSON_UNESCAPED_UNICODE);		
		}
					
		try{
			
			$result = DB::select('SELECT `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
		
			if(sizeof($result) == 0){
				return parent::escape_unicode_decode(json_encode(['Ошибка' => 'Произошла ошибка при создании заказа — ПользовательИД отсутствует']));
			}
			
			foreach ($result as $row) {
				$main_counterparty_id = $row->main_counterparty_id;
				if(empty($main_counterparty_id)){
					return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Произошла ошибка при создании заказа — Головной контрагент отсутствует')));
				}
			}
		
		} catch (QueryException $e) {
			
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>$err)));
			
		}
			
		if(!Schema::hasTable('orders_'.$main_counterparty_id)){
			return parent::escape_unicode_decode(json_encode(['Ошибка' => 'Данные с заказами с таким ПользовательИД не найдены']));
		}

		if(!empty($new_lead_contractor_id)){
			
			$mysqli = @new \mysqli(env('DB_HOST'), env('DB_USERNAME'), env('DB_PASSWORD'), env('DB_DATABASE'));		
			if($mysqli->connect_error) {
				$err = $mysqli->connect_error;
				parent::log_er_mysql($err);
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>$err)));
			}
			
			if(!$mysqli->query('CREATE TABLE `orders_'.$new_lead_contractor_id.'` (`id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, `date` char(22) NOT NULL DEFAULT \'\', `timestamp_order` int(10) UNSIGNED NOT NULL DEFAULT 0, `order_id` char(36) NOT NULL DEFAULT \'-\', `order_number` char(11) NOT NULL DEFAULT \'\', `status` enum(\'needs_confirmation\',\'ready_for_shipment\',\'in_work\',\'in_processing\',\'shipped\',\'in_shipment\',\'canceled\',\'draft\') NOT NULL DEFAULT \'draft\', `counterparty_id` char(36) NOT NULL DEFAULT \'\', `sum` char(32) NOT NULL DEFAULT \'0\', `is_cash_payment` char(1) NOT NULL DEFAULT \'\', `shipping_date` char(22) NOT NULL DEFAULT \'\', `timestamp_shipments` int(10) UNSIGNED NOT NULL DEFAULT 0, `shipping_warehouse_id` char(36) NOT NULL DEFAULT \'\', `is_shipping` char(1) NOT NULL DEFAULT \'\', `weight` char(32) NOT NULL DEFAULT \'0\', `delivery_address_id` char(36) NOT NULL DEFAULT \'\', `responsible_sokrof` blob DEFAULT NULL, `client_id` char(36) NOT NULL DEFAULT \'\', `goods` text DEFAULT \'\', `goods_non_standard_addition` blob DEFAULT NULL, `files_non_standard_addition` blob DEFAULT NULL, `ids_row_update` text DEFAULT \'\', `popular_statuses` text DEFAULT \'\', `comment` blob DEFAULT NULL, `orderlkid` char(36) NOT NULL DEFAULT \'\' ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;')){
				$err = $mysqli->error;
				if(strpos($err, 'already exists') === false){
					parent::log_er_mysql($err);
					return parent::escape_unicode_decode(json_encode(array('Ошибка'=>$err)));
				}
			}else{
				if(!$mysqli->query('ALTER TABLE `orders_' . $new_lead_contractor_id . '` ADD KEY `order_id_index` (`order_id`) USING BTREE')){
					$err = $mysqli->error;
					parent::log_er_mysql($err);
					return parent::escape_unicode_decode(json_encode(array('Ошибка'=>$err)));
				}
			}
		
			try {

				DB::beginTransaction();
					# блокируем всю таблицу в рамках транзакции
					DB::select('SELECT COUNT(`id`) FROM `orders_' . $new_lead_contractor_id . '` FOR UPDATE');
					if (DB::table('orders_' . $new_lead_contractor_id)->count('id') == 0) {
						DB::insert('INSERT INTO `orders_' . $new_lead_contractor_id . '` (`popular_statuses`) values (\'{"ready_for_shipment":0, "with_shipments":0, "needs_confirmation":0, "draft":0}\')');
					}
				DB::commit();

			} catch (QueryException $e) {
				
				DB::rollBack();
				$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
				parent::log_er_mysql($err);
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>$err)));
				
			}
			
		}
		
		try{
				
			DB::beginTransaction();
				
				$result = DB::select('SELECT *, CONVERT(AES_DECRYPT(`responsible_sokrof`, :aes_key) USING utf8mb4) AS `responsible_sokrof2`, CONVERT(AES_DECRYPT(`goods_non_standard_addition`, :aes_key2) USING utf8mb4) AS `goods_non_standard_addition2`, CONVERT(AES_DECRYPT(`files_non_standard_addition`, :aes_key3) USING utf8mb4) AS `files_non_standard_addition2`, CONVERT(AES_DECRYPT(`comment`, :aes_key4) USING utf8mb4) AS `comment2` FROM `orders_'.$main_counterparty_id.'` WHERE `order_id` = :order_id LIMIT 1 FOR UPDATE', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'aes_key3' => $this->aes_key[0], 'aes_key4' => $this->aes_key[0], 'order_id' => $order_id]);
				
				if(sizeof($result) == 0){
					return parent::escape_unicode_decode(json_encode(['Ошибка' => 'Такой заказ не найден']));
				}
				
				foreach ($result as $row) {
					
					if(empty($date) && empty($timestamp_order)){
						$date = $row->date;
						$timestamp_order = $row->timestamp_order;
					}
					$order_id = $row->order_id;
					if(empty($order_number)){
						$order_number = $row->order_number;
					}
					if(empty($status)){
						$status = $row->status;
					}
					if(empty($counterparty_id)){
						$counterparty_id = $row->counterparty_id;
					}
					if(empty($sum)){
						$sum = $row->sum;
					}
					if(!array_key_exists('НаличнаяОплата', $data)){
						$is_cash_payment = $row->is_cash_payment;
					}
					if(empty($shipping_date) && empty($timestamp_shipments)){
						$shipping_date = $row->shipping_date;
						$timestamp_shipments = $row->timestamp_shipments;
					}
					if(empty($shipping_warehouse_id)){
						$shipping_warehouse_id = $row->shipping_warehouse_id;
					}
					if(!array_key_exists('Доставка', $data)){
						$is_shipping = $row->is_shipping;
					}
					if(empty($weight)){
						$weight = $row->weight;
					} 
					if(empty($delivery_address_id)){
						$delivery_address_id = $row->delivery_address_id;
					}
					$responsible_sokrof = $row->responsible_sokrof2;
					if(empty($client_id)){
						$client_id = $row->client_id;
					}
					if(empty($goods)){
						$goods = $row->goods;
					}
					if(empty($goods_non_standard_addition)){
						$goods_non_standard_addition = $row->goods_non_standard_addition2;
					}
					if(empty($files_non_standard_addition)){
						$files_non_standard_addition = $row->files_non_standard_addition2;
					}
					$ids_row_update = $row->ids_row_update;
					if(empty($comment)){
						$comment = $row->comment2;
					}
					
					if(!empty($new_lead_contractor_id)){
						
						DB::delete('DELETE FROM `orders_'.$main_counterparty_id.'` WHERE `order_id` = :order_id LIMIT 1', ['order_id' => $order_id]);
						
					}else{
						
						DB::insert('UPDATE `orders_'.$main_counterparty_id.'` SET `date` = :date, `timestamp_order` = :timestamp_order, `order_number` = :order_number, `status` = :status, `counterparty_id` = :counterparty_id, `sum` = :sum, `is_cash_payment` = :is_cash_payment, `shipping_date` = :shipping_date, `timestamp_shipments` = :timestamp_shipments, `shipping_warehouse_id` = :shipping_warehouse_id, `is_shipping` = :is_shipping, `weight` = :weight, `delivery_address_id` = :delivery_address_id, `responsible_sokrof` = AES_ENCRYPT(:responsible_sokrof, :aes_key), `client_id` = :client_id, `goods` = :goods, `goods_non_standard_addition` = AES_ENCRYPT(:goods_non_standard_addition, :aes_key2), `files_non_standard_addition` = AES_ENCRYPT(:files_non_standard_addition, :aes_key3), `ids_row_update` = :ids_row_update, `comment` = AES_ENCRYPT(:comment, :aes_key4) WHERE `order_id` = :order_id LIMIT 1', ['date' => $date, 'timestamp_order' => $timestamp_order, 'order_number' => $order_number, 'status' => $status, 'counterparty_id' => $counterparty_id, 'sum' => $sum, 'is_cash_payment' => $is_cash_payment, 'shipping_date' => $shipping_date, 'timestamp_shipments' => $timestamp_shipments, 'shipping_warehouse_id' => $shipping_warehouse_id, 'is_shipping' => $is_shipping, 'weight' => $weight, 'delivery_address_id' => $delivery_address_id, 'responsible_sokrof' => $responsible_sokrof, 'aes_key' => $this->aes_key[0], 'client_id' => $client_id, 'goods' => $goods, 'goods_non_standard_addition' => $goods_non_standard_addition, 'aes_key2' => $this->aes_key[0], 'files_non_standard_addition' => $files_non_standard_addition, 'aes_key3' => $this->aes_key[0], 'ids_row_update' => $ids_row_update, 'comment' => $comment, 'aes_key4' => $this->aes_key[0], 'order_id' => $order_id]);
						
						$popular_statuses = parent::get_data_from_popular_statuses($main_counterparty_id);
						
						DB::update('UPDATE `orders_'.$main_counterparty_id.'` SET `popular_statuses` = :popular_statuses WHERE `id` = 1 LIMIT 1', ['popular_statuses' => $popular_statuses]);
					
					}
					
				}
				
			DB::commit();

			if(!empty($new_lead_contractor_id)){
				
				DB::beginTransaction();
						
					# блокируем всю таблицу в рамках транзакции
					DB::select('SELECT COUNT(`id`) FROM `orders_'.$new_lead_contractor_id.'` FOR UPDATE');
					
					DB::insert('INSERT INTO `orders_' . $new_lead_contractor_id . '` (`date`, `timestamp_order`, `order_id`, `order_number`, `status`, `counterparty_id`, `sum`, `is_cash_payment`, `shipping_date`, `timestamp_shipments`, `shipping_warehouse_id`, `is_shipping`, `weight`, `delivery_address_id`, `responsible_sokrof`, `client_id`, `goods`, `goods_non_standard_addition`, `files_non_standard_addition`, `ids_row_update`, `comment`) values (:date, :timestamp_order, :order_id, :order_number, :status, :counterparty_id, :sum, :is_cash_payment, :shipping_date, :timestamp_shipments, :shipping_warehouse_id, :is_shipping, :weight, :delivery_address_id, AES_ENCRYPT(:responsible_sokrof, :aes_key), :client_id, :goods, AES_ENCRYPT(:goods_non_standard_addition, :aes_key2), AES_ENCRYPT(:files_non_standard_addition, :aes_key3), :ids_row_update, AES_ENCRYPT(:comment, :aes_key4))', ['date' => $date, 'timestamp_order' => $timestamp_order, 'order_id' => $order_id, 'order_number' => $order_number, 'status' => $status, 'counterparty_id' => $counterparty_id, 'sum' => $sum, 'is_cash_payment' => $is_cash_payment, 'shipping_date' => $shipping_date, 'timestamp_shipments' => $timestamp_shipments, 'shipping_warehouse_id' => $shipping_warehouse_id, 'is_shipping' => $is_shipping, 'weight' => $weight, 'delivery_address_id' => $delivery_address_id, 'responsible_sokrof' => $responsible_sokrof, 'aes_key' => $this->aes_key[0], 'client_id' => $client_id, 'goods' => $goods, 'goods_non_standard_addition' => $goods_non_standard_addition, 'aes_key2' => $this->aes_key[0], 'files_non_standard_addition' => $files_non_standard_addition, 'aes_key3' => $this->aes_key[0], 'ids_row_update' => $ids_row_update,  'comment' => $comment, 'aes_key4' => $this->aes_key[0]]);
							
					$popular_statuses = parent::get_data_from_popular_statuses($new_lead_contractor_id);
					
					DB::update('UPDATE `orders_'.$new_lead_contractor_id.'` SET `popular_statuses` = :popular_statuses WHERE `id` = 1 LIMIT 1', ['popular_statuses' => $popular_statuses]);
				
				DB::commit();

			}
			
		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>$err)));
			
		}
		
		return parent::escape_unicode_decode(json_encode(['Сообщение' => 'Заказ успешно обновлен']));
		
	}

}