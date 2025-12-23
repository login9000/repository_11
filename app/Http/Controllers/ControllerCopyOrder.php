<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerCopyOrder extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$err = parent::validate_get_params('other');
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		$client_rsa_pubkey = htmlspecialchars($_GET['client_rsa_pubkey'], ENT_QUOTES, $this->encoding);
		
		$order_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['order_id'] ?? '', 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($order_id == ''){
			parent::prepare_response(['error'=>'ORDER_ID_IS_EMPTY_OR_INCORRECT']);
		}
		
		$token = '';
		$main_counterparty_id = '';
		$comment = '';
		$orders_id_nomenclature_type = [];
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				$token = $row->token;
				$main_counterparty_id = $row->main_counterparty_id;
				
			}

		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		$goods_non_standard_addition = [];
		$files_non_standard_addition = [];
		
		try{
			
			if(!Schema::hasTable('orders_'.$main_counterparty_id)){
				// вот этот говнокод пришлось написать потому что наш фронтендер - ленивая задница			
				parent::prepare_response(['error'=>'Не удалось найти таблицу с данными заказов ('.$main_counterparty_id.')']);
				//
			}
			
			$result2 = DB::select('SELECT `delivery_address_id`, `goods`, CONVERT(AES_DECRYPT(`goods_non_standard_addition`, :aes_key) USING utf8mb4) AS `goods_non_standard_addition`, CONVERT(AES_DECRYPT(`files_non_standard_addition`, :aes_key2) USING utf8mb4) AS `files_non_standard_addition`, CONVERT(AES_DECRYPT(`comment`, :aes_key3) USING utf8mb4) AS `comment` FROM `orders_'.$main_counterparty_id.'` WHERE `order_id` = :order_id LIMIT 1', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'aes_key3' => $this->aes_key[0], 'order_id' => $order_id]);
			
			if(sizeof($result2) == 0){
				parent::prepare_response(['error'=>'NO_ORDERS_FOUND']);
			}
			
			foreach ($result2 as $row) {
				
				$goods = json_decode($row->goods, true);
				
				foreach ($goods as $c) {
					$id_nomenclature_type = '';
					if(array_key_exists('ВидНоменклатурыИД', $c)){
						$id_nomenclature_type = $c['ВидНоменклатурыИД'];
					}
					$orders_id_nomenclature_type[$c['НоменклатураИД'].'-'.$c['Характеристика']] = $id_nomenclature_type;
				}
				
				$goods_non_standard_addition = json_decode($row->goods_non_standard_addition, true);
				if($goods_non_standard_addition === null){
					$goods_non_standard_addition = [];
				}
				$files_non_standard_addition = json_decode($row->files_non_standard_addition, true);
				if($files_non_standard_addition === null){
					$files_non_standard_addition = [];
				}
				$comment = $row->comment;
				
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}else{
				parent::prepare_response(['error'=>'NO_ORDERS_FOUND']);
			}
		}
		
		list($result, $err) = parent::post_request_to_api_1c('get_order_details', ['order_id' => $order_id, 'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}
		
		$order_details = $result;
		$order_details2 = [];
		
		$counterparties_data = parent::get_counterparties($main_counterparty_id);
		
		if(array_key_exists('error', $counterparties_data)){
			parent::prepare_response(['error'=>$counterparties_data['error']]);
		}
		
		$arr_counterparties_id_name = [];
		foreach ($counterparties_data['data'] as $c) {
			if($c['counterparty_id'] != ''){
				$arr_counterparties_id_name[$c['counterparty_id']] = $c['fullname'];
			}else if($c['application_id'] != '' && $c['application_id'] != '-'){
				$arr_counterparties_id_name[$c['application_id']] = $c['fullname'];
			}
		}
			
		$shipment_warehouses_data = parent::get_shipment_warehouses();

		if(array_key_exists('error', $shipment_warehouses_data)){
			parent::prepare_response(['error'=>$shipment_warehouses_data['error']]);
		}
		
		$arr_shipment_warehouses_id_name = [];
		foreach ($shipment_warehouses_data['data'] as $c) {
			$arr_shipment_warehouses_id_name[$c['СкладИД']] = $c['Наименование'];
		}
			
		$product_catalog_data = parent::get_product_catalog(true);

		if(array_key_exists('error', $product_catalog_data)){
			parent::prepare_response(['error'=>$product_catalog_data['error']]);
		}

		$arr_product_catalog_id_data = [];
		foreach ($product_catalog_data['data'] as $c) {
			foreach ($c['Данные'] as $c2) {
				$arr_product_catalog_id_data[$c2['НоменклатураИД']] = [
					'Наименование' => $c2['Наименование'],
					'ЕдиницаИзмеренияНаименования' => $c2['ЕдиницаИзмеренияНаименования'],
					'КоличествоШтукВКомплекте' => $c2['КоличествоШтукВКомплекте'],
					'КоэффициентПересчетаКоличества' => $c2['КоэффициентПересчетаКоличества'],
					'ЗаполнятьХарактеристику' => $c2['ЗаполнятьХарактеристику'],
					'ПродаетсяКомплектами' => $c2['ПродаетсяКомплектами'],
					'Толщина' => str_replace(',', '.', $c2['Толщина']),
					'ЦветИД' => $c2['ЦветИД'],
					'ОстаткиПоМеталлу' => $c2['ОстаткиПоМеталлу'],
					'ОстаткиВШтуках' => $c2['ОстаткиВШтуках'],
					'НедоступноДляВыбора' => $c2['НедоступноДляВыбора']
				];
			}
		}
			
	  $leftover_metal_for_products = parent::get_leftover_metal_for_products();
		
		if(array_key_exists('error', $leftover_metal_for_products)){
			parent::prepare_response(['error'=>$leftover_metal_for_products['error']]);
		}

		$arr_leftover_metal_for_products_id_quantity = [];
		foreach ($leftover_metal_for_products['data'] as $key2 => $val2) {
			if($key2 == 'Данные'){
				foreach ($val2 as $c) {
					$arr_leftover_metal_for_products_id_quantity[str_replace(',', '.', $c['Толщина']).'-'.$c['ЦветИД']] = $c['Количество'];
				}
			}
		}
			
		$product_balances = parent::get_product_balances();
		
		if(array_key_exists('error', $product_balances)){
			parent::prepare_response(['error'=>$product_balances['error']]);
		}

		$arr_product_balances_id_quantity = [];
		$is_get_data = false;
		foreach ($product_balances['data'] as $c) {
			$id = '';
			foreach ($c as $key => $val) {
				if($key == 'Данные' && $is_get_data){
					$is_get_data = false;
					foreach ($val as $c2) {
						$arr_product_balances_id_quantity[$id.'-'.$c2['НоменклатураИД']] = $c2['Количество'];
					}
					break;
				}
				if($key == 'СкладИД'){
					$id = $val;
					$is_get_data = true;
					continue;
				}
			}
		}
		
		$arr2 = [];
		
		foreach ($order_details as $key => $val) {
			
			if($key != 'Запасы'){
				
				$order_details2[$key] = $val;
				
				if($key == 'АдресДоставки'){
					$order_details2['АдресДоставкиИД'] = '';
					foreach ($result2 as $c) {
						$order_details2['АдресДоставкиИД'] = $c->delivery_address_id;
					}
				}
				
				if($key == 'КонтрагентИД'){
					$order_details2['КонтрагентНаименование'] = '';
					if(array_key_exists($val, $arr_counterparties_id_name)){
						$order_details2['КонтрагентНаименование'] = $arr_counterparties_id_name[$val];
					}
				}
				
				if($key == 'Дата' || $key == 'ДатаОтгрузки'){
					$order_details2[$key] = str_replace('0001-01-01T00:00:00', '', $val);
				}
				
				if($key == 'СкладОтгрузкиИД'){
					$order_details2['СкладОтгрузкиНаименование'] = '';
					if(array_key_exists($val, $arr_shipment_warehouses_id_name)){
						$order_details2['СкладОтгрузкиНаименование'] = $arr_shipment_warehouses_id_name[$val];
					}
				}
				
			}
			
			if($key == 'Запасы'){
				
				$arr = [];
				
				if(sizeof($val) > 0){
					
					foreach ($val as $c) {
						
						$id_nomenclature = $c['НоменклатураИД'];
						
						$c['ВидНоменклатурыИД'] = '';
						$c['НоменклатураНаименование'] = '';
						$c['ЕдиницаИзмеренияНаименования'] = '';
						$c['КоличествоШтукВКомплекте'] = 0;
						$c['КоэффициентПересчетаКоличества'] = 0;
						$c['ЗаполнятьХарактеристику'] = false;
						$c['ПродаетсяКомплектами'] = false;
						$c['Толщина'] = '';
						$c['ЦветИД'] = '';
						$c['ОстаткиПоМеталлу'] = false;
						$c['ОстаткиВШтуках'] = false;
						$c['Наличие'] = '';
						$c['Итого'] = 0;
						
						if(array_key_exists($id_nomenclature, $arr_product_catalog_id_data)){
							
							$c['НоменклатураНаименование'] = $arr_product_catalog_id_data[$id_nomenclature]['Наименование'];
							$c['ЕдиницаИзмеренияНаименования'] = $arr_product_catalog_id_data[$id_nomenclature]['ЕдиницаИзмеренияНаименования'];
							$c['КоличествоШтукВКомплекте'] = $arr_product_catalog_id_data[$id_nomenclature]['КоличествоШтукВКомплекте'];
							$c['КоэффициентПересчетаКоличества'] = $arr_product_catalog_id_data[$id_nomenclature]['КоэффициентПересчетаКоличества'];
							$c['ЗаполнятьХарактеристику'] = $arr_product_catalog_id_data[$id_nomenclature]['ЗаполнятьХарактеристику'];
							$c['ПродаетсяКомплектами'] = $arr_product_catalog_id_data[$id_nomenclature]['ПродаетсяКомплектами'];
							$c['Толщина'] = $arr_product_catalog_id_data[$id_nomenclature]['Толщина'];
							$c['ЦветИД'] = $arr_product_catalog_id_data[$id_nomenclature]['ЦветИД'];
							$c['ОстаткиПоМеталлу'] = $arr_product_catalog_id_data[$id_nomenclature]['ОстаткиПоМеталлу'];
							$c['ОстаткиВШтуках'] = $arr_product_catalog_id_data[$id_nomenclature]['ОстаткиВШтуках'];
							
							if($arr_product_catalog_id_data[$id_nomenclature]['НедоступноДляВыбора']){
								continue;
							}
							
							$total = 0;
							if($c['ЗаполнятьХарактеристику']){
								if($c['Характеристика'] == ''){
									$total = $c['Количество'] * 1 * $c['КоэффициентПересчетаКоличества'] / 1000;
								}else{
									$total = $c['Количество'] * $c['Характеристика'] * $c['КоэффициентПересчетаКоличества'] / 1000;
								}
							}else if($c['ПродаетсяКомплектами']){
								$total = $c['Количество'] * $c['КоличествоШтукВКомплекте'];
							}else{
								$total = $c['Количество'];
							}
							$c['Итого'] = round($total, 2);
																
							if($c['ОстаткиПоМеталлу']){
								if(array_key_exists($c['Толщина'].'-'.$c['ЦветИД'], $arr_leftover_metal_for_products_id_quantity)){
									$c['Наличие'] = $arr_leftover_metal_for_products_id_quantity[$c['Толщина'].'-'.$c['ЦветИД']];
								}
							}
							
							if($c['ОстаткиВШтуках']){
								if(array_key_exists($order_details2['СкладОтгрузкиИД'].'-'.$id_nomenclature, $arr_product_balances_id_quantity)){
									$c['Наличие'] = $arr_product_balances_id_quantity[$order_details2['СкладОтгрузкиИД'].'-'.$id_nomenclature].' шт.';
								}
							}
							
							if($c['ОстаткиПоМеталлу'] && $c['ОстаткиВШтуках']){
								$c['Наличие'] = 'ошибка';
							}
							
							if(!$c['ОстаткиПоМеталлу'] && !$c['ОстаткиВШтуках']){
								$c['Наличие'] = 'ошибка 2';
							}
							
						}

						if(array_key_exists($id_nomenclature.'-'.$c['Характеристика'], $orders_id_nomenclature_type)){
							$c['ВидНоменклатурыИД'] = $orders_id_nomenclature_type[$id_nomenclature.'-'.$c['Характеристика']];
						}
						
						$arr[] = $c;
						
					}
					
				}
				
				$order_details2['Запасы'] = $arr;
				$order_details2['Комментарий'] = $comment;
				
			}
			
		}

		$arr2 = [];
		foreach($goods_non_standard_addition as $c){
			$arr2[] = [
				'Описание' => $c['Описание'],
				'Количество' => $c['Количество']
			];	
		}
		
		$goods_non_standard_addition = $arr2;
		$arr2 = [];
		
		foreach($files_non_standard_addition as $c){
			$arr2[] = [
				'СсылкаНаФайл' => $c['СсылкаНаФайл'],
				'ИмяФайла' => $c['ИмяФайла']
			];	
		}
		
		$files_non_standard_addition = $arr2;
		$arr2 = [];
		
		$order_details2['НестандартнаяДоборка'] = $goods_non_standard_addition;
		$order_details2['НестандартнаяДоборкаПрикрепленныеФайлы'] = $files_non_standard_addition;
		
		$prices_product_catalog_data = parent::get_prices_of_the_main_counterparty($main_counterparty_id);

		if(array_key_exists('error', $prices_product_catalog_data)){
			parent::prepare_response(['error'=>$prices_product_catalog_data['error']], true);
		}
		
		$bonus_percentage = 0;
		$counterparty_id = '';

		foreach($prices_product_catalog_data['data'] as $c){
			$counterparty_id = $c['КонтрагентИД'];
		}
		
		foreach($counterparties_data['data'] as $c){
			if($c['counterparty_id'] == $counterparty_id){
				$bonus_percentage = $c['bonus_percentage'];
				break;
			}
		}
		
		$si = sizeof($order_details2['Запасы']);
		
		for($i = 0; $i < $si; $i++){
			
			$id_nomenclature = $order_details2['Запасы'][$i]['НоменклатураИД'];
			$length = $order_details2['Запасы'][$i]['Характеристика'];
			$quantity = $order_details2['Запасы'][$i]['Количество'];
			
			$price = $order_details2['Запасы'][$i]['Цена'];
			$sum = $order_details2['Запасы'][$i]['Сумма'];
			$total = $order_details2['Запасы'][$i]['Итого'];
			
			$is_find = false;
			
			foreach($prices_product_catalog_data['data'] as $c){
				foreach($c['Данные'] as $c2){
					if($c2['НоменклатураИД'] == $id_nomenclature){
						$price = $c2['Цена'];
						$is_find = true;
						break;
					}
				}
			}
			
			if($is_find){
				
				$is_fill_out_the_characteristics = false;
				$quantity_conversion_factor = 0;
				$is_sold_in_sets = false;
				$number_of_pieces_per_set = 0;
				
				if(array_key_exists($id_nomenclature, $arr_product_catalog_id_data)){
					$number_of_pieces_per_set = $arr_product_catalog_id_data[$id_nomenclature]['КоличествоШтукВКомплекте'];
					$quantity_conversion_factor = $arr_product_catalog_id_data[$id_nomenclature]['КоэффициентПересчетаКоличества'];
					$is_fill_out_the_characteristics = $arr_product_catalog_id_data[$id_nomenclature]['ЗаполнятьХарактеристику'];
					$is_sold_in_sets = $arr_product_catalog_id_data[$id_nomenclature]['ПродаетсяКомплектами'];
				}
			
				if($is_fill_out_the_characteristics){
					if($length == ''){
						$total = $quantity * 1 * $quantity_conversion_factor / 1000;
					}else{
						$total = $quantity * $length * $quantity_conversion_factor / 1000;
					}
				}else if($is_sold_in_sets){
					$total = $quantity * $number_of_pieces_per_set;
				}else{
					$total = $quantity;
				}
				$total = round($total, 2);

				$sum = round($total * $price * (1 - (($bonus_percentage + 0) / 100)), 2);
		
				$order_details2['Запасы'][$i]['Цена'] = $price;
				$order_details2['Запасы'][$i]['Сумма'] = $sum;
				$order_details2['Запасы'][$i]['Итого'] = $total;
		
			}
			
		}
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2($order_details2, $client_rsa_pubkey);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true);
		// parent::prepare_response(['response' => $order_details2], true);
		
	}
	
}
