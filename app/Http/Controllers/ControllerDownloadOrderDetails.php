<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerDownloadOrderDetails extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
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

		$orders_status = '';
		$order_number = '';
		
		try{
			
			if(!Schema::hasTable('orders_'.$main_counterparty_id)){
				// вот этот говнокод пришлось написать потому что наш фронтендер - ленивая задница	
				parent::prepare_response(['error'=>'Не удалось найти таблицу с данными заказов ('.$main_counterparty_id.')']);
				//
			}
			
			$result = DB::select('SELECT `status`, `order_number` FROM `orders_'.$main_counterparty_id.'` WHERE `order_id` = :order_id', ['order_id' => $order_id]);

			foreach ($result as $row) {
				$orders_status = $row->status;		
				$order_number = $row->order_number;		
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

		if($orders_status == ''){
			parent::prepare_response(['error'=>'NO_ORDERS_FOUND']);
		}
		
		$link = '/user_files/'.$user_myid.'/order_details/order_details_'.$order_number.'_'.($this->time).'.pdf';
		
		if($orders_status == 'draft'){

			list($result, $err) = parent::post_request_to_api_1c('get_order_details', ['order_id' => $order_id, 'token' => $token]);
			if($err){
				parent::prepare_response(['error'=>$err], true);
			}
			
			if(array_key_exists('Ошибка', $result)){
				parent::prepare_response(['error'=>$result['Ошибка']], true);
			}
				
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
		
			$product_catalog_data = parent::get_product_catalog();

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
						'ОстаткиВШтуках' => $c2['ОстаткиВШтуках']
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
			
			$product_balances = parent::get_product_balances($token);
			
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
										
			$order_details = $result;
			$order_details2 = [];
			
			foreach ($order_details as $key => $val) {
				
				if($key != 'Запасы'){
					
					$order_details2[$key] = $val;
					
					if($key == 'КонтрагентИД'){
						$order_details2['КонтрагентНаименование'] = '';
						if(array_key_exists($val, $arr_counterparties_id_name)){
							$order_details2['КонтрагентНаименование'] = $arr_counterparties_id_name[$val];
						}				
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
					foreach ($val as $c) {
						
						$id_nomenclature = $c['НоменклатураИД'];
						
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
								
						$arr[] = $c;
						
					}
					
					$order_details2['Запасы'] = $arr;
					
				}
				
			}
					
			$number = '';
			$orders_status = str_replace(['in_processing', 'needs_confirmation', 'in_work', 'ready_for_shipment', 'in_shipment', 'shipped', 'canceled', 'except_completed', 'draft'], ['На обработке', 'Требует подтверждения', 'В работе', 'Готов к отгрузке', 'В отгрузке', 'Отгружен', 'Отменен', 'Кроме завершенных', 'Черновики'], $orders_status);
			$counterparty_name = '';
			$calculation_type = '';
			$payment_state = 'неоплачен';
			$shipment_warehouse_name = '';
			$shipping_date = '';
			$delivery_address = '';
			$weight = 0;
			$order_cost = 0;
			
			foreach ($order_details2 as $key => $val) {

				if($key != 'Запасы'){
					
					if($key == 'Номер'){
						$number = $val;
					}
					
					if($key == 'КонтрагентНаименование'){
						$counterparty_name = $val;
					}
					
					if($key == 'НаличнаяОплата'){
						$calculation_type = ($val ? 'Наличный расчет' : 'Безналичный расчет');
					}
					
					if($key == 'СтатусОплаты'){
						$payment_state = $val;
					}
					
					if($key == 'СкладОтгрузкиНаименование'){
						$shipment_warehouse_name = $val;
					}
					
					if($key == 'ДатаОтгрузки'){
						$shipping_date = str_replace('01 янв 0001', '', parent::convert_format_date2($val));
					}
					
					if($key == 'АдресДоставки'){
						$delivery_address = $val;
					}
					
					if($key == 'Вес'){
						$weight = $val;
					}
					
					if($key == 'СуммаДокумента'){
						$order_cost = $val;
					}
					
				}
				
			}
			
			if(!is_dir($this->document_root.'/user_files/'.$user_myid)){
				mkdir($this->document_root.'/user_files/'.$user_myid, 0774);
			}

			if(!is_dir($this->document_root.'/user_files/'.$user_myid.'/order_details')){
				mkdir($this->document_root.'/user_files/'.$user_myid.'/order_details', 0774);
			}
			
			$goods = [];
			$is_show_bonus_percentage = true;
			$is_show_percentage_discounts_surcharges = true;
			
			foreach($order_details2 as $key => $val){
				if($key == 'Запасы'){
					$si = sizeof($val);
					for($i = 0; $i < $si; $i++) {
						$goods[] = [(string) $i + 1, $val[$i]['НоменклатураНаименование'], (string) $val[$i]['Характеристика'], (string) $val[$i]['ЕдиницаИзмеренияНаименования'], (string) $val[$i]['Количество'], (string) $val[$i]['Итого'], (string) $val[$i]['Наличие'], (string) $val[$i]['Резерв'], (string) $val[$i]['Цена'], (string) $val[$i]['Сумма'], (string) $val[$i]['ПроцентБонуса'], (string) $val[$i]['ПроцентСкидкиНаценки']];
						if($val[$i]['ПроцентБонуса'] == 0 || $calculation_type != 'Наличный расчет'){
							$is_show_bonus_percentage = false;
						}
						if($val[$i]['ПроцентСкидкиНаценки'] == 0){
							$is_show_percentage_discounts_surcharges = false;
						}
					}
				}
			}
			
			array_unshift($goods , ['#', 'Номенклатура', 'Длина, мм', 'Ед. изм.', 'Кол-во', 'Итого', 'Наличие', 'Резерв', 'Цена, ₽', 'Сумма, ₽', 'Бонус, %', 'Скидка, %']);
			
			$arr = [];
			
			if(!$is_show_bonus_percentage){
				
				foreach($goods as $c){
					unset($c[10]);
					$arr[] = $c;
				}
				$goods = $arr;
				
			}

			$arr = [];
			
			if(!$is_show_percentage_discounts_surcharges){
				
				foreach($goods as $c){
					unset($c[11]);
					$arr[] = $c;
				}
				$goods = $arr;
				
			}
			
			list($result, $err) = parent::pdf_creator_service('order_details', ['number' => $number, 'orders_status' => $orders_status, 'counterparty_name' => str_replace(['&quot;', '&lt;', '&gt;'], ['"', '<', '>'], $counterparty_name), 'calculation_type' => $calculation_type, 'payment_state' => $payment_state, 'shipment_warehouse_name' => str_replace(['&quot;', '&lt;', '&gt;'], ['"', '<', '>'], $shipment_warehouse_name), 'shipping_date' => $shipping_date, 'delivery_address' => str_replace(['&quot;', '&lt;', '&gt;'], ['"', '<', '>'], $delivery_address), 'weight' => $weight, 'order_cost' => $order_cost, 'goods' => $goods], $link);
			if($err){
				parent::prepare_response(['error'=>$err]);
			}
			
		}else{

			list($result, $err) = parent::post_request_to_api_1c('download_order_details', ['order_id' => $order_id, 'token' => $token]);
			if($err){
				parent::prepare_response(['error'=>$err], true);
			}

			if(array_key_exists('Ошибка', $result)){
				parent::prepare_response(['error'=>$result['Ошибка']], true);
			}

			if(!array_key_exists('Данные', $result)){
				parent::prepare_response(['error'=>'NO_EXISTS_KEY_Данные']);
			}
			
			if(!is_dir($this->document_root.'/user_files/'.$user_myid)){
				mkdir($this->document_root.'/user_files/'.$user_myid, 0774);
			}

			if(!is_dir($this->document_root.'/user_files/'.$user_myid.'/order_details')){
				mkdir($this->document_root.'/user_files/'.$user_myid.'/order_details', 0774);
			} 
			
			$f = fopen($this->document_root . $link, 'w+');
			fwrite($f, base64_decode($result['Данные']));
			fclose($f);
			unset($result);

		}
		
		// if(file_exists($this->document_root . $link)){
		// 	chmod($this->document_root . $link, 0664);
		// }
		
		parent::prepare_response(['response' => ['link' => $link]]);
		
	}
	
}
