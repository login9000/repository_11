<?php

namespace App\Helpers\_2b1d87eb63;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class _2b1d87eb63 extends Common {
	
	protected $result_ = [['error'=>'unknown'], false];
	
	public function __construct(){
		
		parent::__construct();
		
		$err = parent::validate_get_params('other');
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		$client_rsa_pubkey = htmlspecialchars($_GET['client_rsa_pubkey'], ENT_QUOTES, $this->encoding);
		
		$draft_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['draft_id'] ?? '', 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		
		if($draft_id == ''){
			$this->result_ = [['error'=>'DRAFT_ID_IS_EMPTY_OR_INCORRECT'], false];
			return;
		}
		
		$token = '';
		$main_counterparty_id = '';
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				$this->result_ = [['error'=>'NO_EXISTS_ACCOUNT'], false];
				return;
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					$this->result_ = [['error'=>'EXPIRES_TOKEN'], false];
					return;
				}
				$token = $row->token;
				$main_counterparty_id = $row->main_counterparty_id;
				
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			$this->result_ = [['error'=>$err], false];
			return;
		}		
		
		$result = [];
		
		try{
			
			if(!Schema::hasTable('orders_'.$main_counterparty_id)){
				// вот этот говнокод пришлось написать потому что наш фронтендер - ленивая задница				
				$this->result_ = [['error'=>'Не удалось найти таблицу с данными заказов ('.$main_counterparty_id.')'], false];
				return;
				//
			}
			
			$result = DB::select('SELECT `order_number`, `counterparty_id`, `shipping_warehouse_id`, `shipping_date`, `is_cash_payment`, `delivery_address_id`, `is_shipping`, `goods`, CONVERT(AES_DECRYPT(`goods_non_standard_addition`, :aes_key) USING utf8mb4) AS `goods_non_standard_addition`, CONVERT(AES_DECRYPT(`files_non_standard_addition`, :aes_key2) USING utf8mb4) AS `files_non_standard_addition`, CONVERT(AES_DECRYPT(`comment`, :aes_key3) USING utf8mb4) AS `comment` FROM `orders_'.$main_counterparty_id.'` WHERE `order_id` = :draft_id AND `status` = \'draft\' LIMIT 1', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'aes_key3' => $this->aes_key[0], 'draft_id' => $draft_id]);
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				$this->result_ = [['error'=>$err], false];
				return;
			}
		}
		
		if(sizeof($result) == 0){
			$this->result_ = [['error'=>'NO_DRAFT_FOUND'], false];
			return;
		}
		
		$counterparties_data = parent::get_counterparties($main_counterparty_id);
		
		if(array_key_exists('error', $counterparties_data)){
			$this->result_ = [['error'=>$counterparties_data['error']], false];
			return;
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
			$this->result_ = [['error'=>$shipment_warehouses_data['error']], false];
			return;
		}
		
		$arr = [];
		foreach($shipment_warehouses_data['data'] as $c){
			if(!$c['СкладНекондиции']){
				$arr[] = $c;
			}
		}
		$shipment_warehouses_data['data'] = $arr;
		
		$arr_shipment_warehouses_id_name = [];
		foreach ($shipment_warehouses_data['data'] as $c) {
			$arr_shipment_warehouses_id_name[$c['СкладИД']] = $c['Наименование'];
		}
		
		$product_catalog_data = parent::get_product_catalog();
		
		if(array_key_exists('error', $product_catalog_data)){
			$this->result_ = [['error'=>$product_catalog_data['error']], false];
			return;
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
		
		$prices_product_catalog_data = parent::get_prices_of_the_main_counterparty();
		
		if(array_key_exists('error', $prices_product_catalog_data)){
			$this->result_ = [['error'=>$prices_product_catalog_data['error']], false];
			return;
		}
		
		$arr_prices_product_catalog_id_price = [];
		foreach ($prices_product_catalog_data['data'] as $c) {
			foreach($c['Данные'] as $c2){
				$arr_prices_product_catalog_id_price[$c2['НоменклатураИД']] = $c2['Цена'];
			}
		}		
		
		$leftover_metal_for_products = parent::get_leftover_metal_for_products();
		
		if(array_key_exists('error', $leftover_metal_for_products)){
			$this->result_ = [['error'=>$leftover_metal_for_products['error']], false];
			return;
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
			$this->result_ = [['error'=>$product_balances['error']], false];
			return;
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
		
		$delivery_addresses_data = parent::get_delivery_addresses($token);
		
		if(array_key_exists('error', $delivery_addresses_data)){
			$this->result_ = [['error'=>$delivery_addresses_data['error']], false];
			return;
		}

		$arr_delivery_addresses_id_addres = [];
		foreach ($delivery_addresses_data['data'] as $c) {
			$arr_delivery_addresses_id_addres[$c['АдресДоставкиИД']] = $c['АдресДоставки'];
		}
		
		$available_specifications_data = parent::get_available_specifications();

		$draft_number = '';
		$counterparty_id = '';
		$counterparty_name = '';
		$shipping_warehouse_id = '';
		$shipping_date = '';
		$shipping_warehouse_name = '';
		$is_cash_payment = false;
		$document_amount = 0;
		$goods = [];
		$goods_non_standard_addition = [];
		$files_non_standard_addition = [];
		$comment = '';
		$delivery_address_id = '';
		$delivery_address_name = '';
		$is_shipping = false;
		
		foreach ($result as $row) {

			if($row->delivery_address_id != ''){
				if(array_key_exists($row->delivery_address_id, $arr_delivery_addresses_id_addres)){
					$delivery_address_name = $arr_delivery_addresses_id_addres[$row->delivery_address_id];
				}
			}
			
			$is_shipping = ($row->is_shipping == '1');
			$delivery_address_id = $row->delivery_address_id;
			$comment = $row->comment;
			$draft_number = $row->order_number;
			$counterparty_id = $row->counterparty_id;
			$counterparty_name = '';
			if(array_key_exists($counterparty_id, $arr_counterparties_id_name)){
				$counterparty_name = $arr_counterparties_id_name[$counterparty_id];
			}
			
			$shipping_date = $row->shipping_date;
			$shipping_warehouse_id = $row->shipping_warehouse_id;
			$shipping_warehouse_name = '';
			if(array_key_exists($shipping_warehouse_id, $arr_shipment_warehouses_id_name)){
				$shipping_warehouse_name = $arr_shipment_warehouses_id_name[$shipping_warehouse_id];
			}
			
			$is_cash_payment = ($row->is_cash_payment == '1');
			$arr = [];
			$goods = json_decode($row->goods, true);
			$goods_non_standard_addition = json_decode($row->goods_non_standard_addition, true);
			if($goods_non_standard_addition === null){
				$goods_non_standard_addition = [];
			}
			$files_non_standard_addition = json_decode($row->files_non_standard_addition, true);
			if($files_non_standard_addition === null){
				$files_non_standard_addition = [];
			}
			foreach ($goods as $c) {
				
				$id_nomenclature = $c['НоменклатураИД'];
				$id_nomenclature_type = '';
				
				if(array_key_exists('ВидНоменклатурыИД', $c)){
					$id_nomenclature_type = $c['ВидНоменклатурыИД'];
				}
				
				$arr2 = [
					'НоменклатураИД' => $id_nomenclature,
					'ВидНоменклатурыИД' => $id_nomenclature_type,
					'Характеристика' => $c['Характеристика'],
					'Количество' => $c['Количество'],
					'ПроцентБонуса' => $c['ПроцентБонуса']
				];
				$arr2['КоличествоЛистов'] = -1;
				$arr2['Резерв'] = -1;
				$arr2['Цена'] = -1;
				$arr2['Сумма'] = 0;
				$arr2['ПроцентСкидкиНаценки'] = 0;
				$arr2['НоменклатураНаименование'] = '';
				$arr2['ЕдиницаИзмеренияНаименования'] = '';
				$arr2['Толщина'] = '';
				$arr2['ЦветИД'] = '';
				$arr2['ОстаткиПоМеталлу'] = false;
				$arr2['ОстаткиВШтуках'] = false;
				$arr2['КоличествоШтукВКомплекте'] = 0;
				$arr2['КоэффициентПересчетаКоличества'] = 0;
				$arr2['ЗаполнятьХарактеристику'] = false;
				$arr2['ПродаетсяКомплектами'] = false;
				$arr2['Наличие'] = '-';
				$arr2['Итого'] = -1;
				
				if(array_key_exists($id_nomenclature, $arr_prices_product_catalog_id_price)){
					$arr2['Цена'] = $arr_prices_product_catalog_id_price[$id_nomenclature];
				}

				if(array_key_exists($id_nomenclature, $arr_product_catalog_id_data)){
					$arr2['НоменклатураНаименование'] = $arr_product_catalog_id_data[$id_nomenclature]['Наименование'];
					$arr2['ЕдиницаИзмеренияНаименования'] = $arr_product_catalog_id_data[$id_nomenclature]['ЕдиницаИзмеренияНаименования'];
					$arr2['КоличествоШтукВКомплекте'] = $arr_product_catalog_id_data[$id_nomenclature]['КоличествоШтукВКомплекте'];
					$arr2['КоэффициентПересчетаКоличества'] = $arr_product_catalog_id_data[$id_nomenclature]['КоэффициентПересчетаКоличества'];
					$arr2['ЗаполнятьХарактеристику'] = $arr_product_catalog_id_data[$id_nomenclature]['ЗаполнятьХарактеристику'];
					$arr2['ПродаетсяКомплектами'] = $arr_product_catalog_id_data[$id_nomenclature]['ПродаетсяКомплектами'];
					$arr2['Толщина'] = $arr_product_catalog_id_data[$id_nomenclature]['Толщина'];
					$arr2['ЦветИД'] = $arr_product_catalog_id_data[$id_nomenclature]['ЦветИД'];
					$arr2['ОстаткиПоМеталлу'] = $arr_product_catalog_id_data[$id_nomenclature]['ОстаткиПоМеталлу'];
					$arr2['ОстаткиВШтуках'] = $arr_product_catalog_id_data[$id_nomenclature]['ОстаткиВШтуках'];
				}
				
				if($arr2['ОстаткиПоМеталлу'] && $arr2['ОстаткиВШтуках']){
					$arr2['Наличие'] = 'ошибка';
				}
				if(!$arr2['ОстаткиПоМеталлу'] && !$arr2['ОстаткиВШтуках']){
					$arr2['Наличие'] = 'ошибка 2';
				}
				
				if($arr2['Наличие'] == '-'){
					
					if($arr2['ОстаткиПоМеталлу']){
						if(array_key_exists($arr2['Толщина'].'-'.$arr2['ЦветИД'], $arr_leftover_metal_for_products_id_quantity)){
							$arr2['Наличие'] = $arr_leftover_metal_for_products_id_quantity[$arr2['Толщина'].'-'.$arr2['ЦветИД']];
						}
					}
					
					if($arr2['ОстаткиВШтуках']){
						if(array_key_exists($shipping_warehouse_id.'-'.$id_nomenclature, $arr_product_balances_id_quantity)){
							$arr2['Наличие'] = $arr_product_balances_id_quantity[$shipping_warehouse_id.'-'.$id_nomenclature].' шт.';
						}
					}
					
				}
				
				if($arr2['ЗаполнятьХарактеристику']){
					if($c['Характеристика'] == ''){
						$total = $c['Количество'] * 1 * $arr2['КоэффициентПересчетаКоличества'] / 1000;
					}else{
						$total = $c['Количество'] * $c['Характеристика'] * $arr2['КоэффициентПересчетаКоличества'] / 1000;
					}
				}else if($arr2['ПродаетсяКомплектами']){
					$total = $c['Количество'] * $arr2['КоличествоШтукВКомплекте'];
				}else{
					$total = $c['Количество'];
				}
				$arr2['Итого'] = round($total, 2);
				
				if($arr2['Итого'] > -1 && $arr2['Цена'] > -1){
					$arr2['Сумма'] = round($arr2['Итого'] * $arr2['Цена'] * (1 - (($c['ПроцентБонуса'] + $arr2['ПроцентСкидкиНаценки']) / 100)), 2);
				}
				
				$document_amount += $arr2['Сумма'];
				$arr[] = $arr2;	
				
			}
			
			$goods = $arr;
			$arr = [];
			
			foreach($goods_non_standard_addition as $c){
				$arr[] = [
					'Описание' => $c['Описание'],
					'Количество' => $c['Количество']
				];	
			}
			
			$goods_non_standard_addition = $arr;
			$arr = [];
			
			foreach($files_non_standard_addition as $c){
				$arr[] = [
					'СсылкаНаФайл' => $c['СсылкаНаФайл'],
					'ИмяФайла' => $c['ИмяФайла']
				];	
			}
			
			$files_non_standard_addition = $arr;
			$arr = [];
			
		}
		
		if($shipping_date == '0001-01-01T00:00:00'){
			$shipping_date = date('c', $this->time);
		}
		
		$draft_details = [
			'Доставка' => $is_shipping,
			'АдресДоставкиИД' => $delivery_address_id,
			'АдресДоставкиНаименование' => $delivery_address_name,
			'Комментарии' => $comment,
			'НомерЧерновика' => $draft_number,
			'КонтрагентИД' => $counterparty_id,
			'КонтрагентНаименование' => $counterparty_name,
			'СкладОтгрузкиИД' => $shipping_warehouse_id,
			'СкладОтгрузкиНаименование' => $shipping_warehouse_name,
			'ДатаОтгрузки' => $shipping_date,
			'НаличнаяОплата' => $is_cash_payment,
			'СуммаДокумента' => round($document_amount, 2),
			'Запасы' => $goods,
			'НестандартнаяДоборка' => $goods_non_standard_addition,
			'НестандартнаяДоборкаПрикрепленныеФайлы' => $files_non_standard_addition
		];
		
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
		
		$si = sizeof($draft_details['Запасы']);
		
		for($i = 0; $i < $si; $i++){
			
			$id_nomenclature = $draft_details['Запасы'][$i]['НоменклатураИД'];
			$length = $draft_details['Запасы'][$i]['Характеристика'];
			$quantity = $draft_details['Запасы'][$i]['Количество'];
			
			$price = $draft_details['Запасы'][$i]['Цена'];
			$sum = $draft_details['Запасы'][$i]['Сумма'];
			$total = $draft_details['Запасы'][$i]['Итого'];
			
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
		
				$draft_details['Запасы'][$i]['Цена'] = $price;
				$draft_details['Запасы'][$i]['Сумма'] = $sum;
				$draft_details['Запасы'][$i]['Итого'] = $total;
		
			}
			
		}
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['delivery_addresses' => $delivery_addresses_data, 'counterparties' => $counterparties_data, 'shipment_warehouses' => $shipment_warehouses_data, 'product_catalog' => $product_catalog_data, 'prices_product_catalog' => $prices_product_catalog_data, 'available_specifications' => $available_specifications_data, 'draft_details' => $draft_details], $client_rsa_pubkey);
		if($err){
		 $this->result_ = [['error'=>$err], false];
		 return;
		}
		
		$this->result_ = [['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true];
		
		/* list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['delivery_addresses' => $delivery_addresses_data, 'counterparties' => $counterparties_data, 'shipment_warehouses' => $shipment_warehouses_data, 'prices_product_catalog' => $prices_product_catalog_data, 'draft_details' => $draft_details], $client_rsa_pubkey);
		if($err){
		 $this->result_ = [['error'=>$err], false];
		 return;
		}
		
		$this->result_ = [['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt, 'other_data' => ['product_catalog' => $product_catalog_data, 'available_specifications' => $available_specifications_data]]], true]; */
		
	}

}