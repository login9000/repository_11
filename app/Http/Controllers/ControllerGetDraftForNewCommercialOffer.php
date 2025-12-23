<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerGetDraftForNewCommercialOffer extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');

		$draft_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['draft_id'] ?? '', 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($draft_id == ''){
			parent::prepare_response(['error'=>'DRAFT_ID_IS_EMPTY_OR_INCORRECT']);
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
		
		$result = [];
		
		try{
			
			if(!Schema::hasTable('orders_'.$main_counterparty_id)){
				// вот этот говнокод пришлось написать потому что наш фронтендер - ленивая задница	
				parent::prepare_response(['error'=>'Не удалось найти таблицу с данными заказов ('.$main_counterparty_id.')']);
				//
			}
			
			$result = DB::select('SELECT `goods` FROM `orders_'.$main_counterparty_id.'` WHERE `order_id` = :draft_id AND `status` = \'draft\' LIMIT 1', ['draft_id' => $draft_id]);
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}
		}
		
		if(sizeof($result) == 0){
			parent::prepare_response(['error'=>'NO_DRAFT_FOUND']);
		}
		
		$prices_product_catalog_data = parent::get_prices_of_the_main_counterparty($main_counterparty_id);

		if(array_key_exists('error', $prices_product_catalog_data)){
			parent::prepare_response(['error'=>$prices_product_catalog_data['error']]);
		}
		
		$arr_prices_product_catalog_id_price = [];
		foreach ($prices_product_catalog_data['data'] as $c) {
			foreach($c['Данные'] as $c2){
				$arr_prices_product_catalog_id_price[$c2['НоменклатураИД']] = $c2['Цена'];
			}
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
				];
			}
		}
			
		$document_amount = 0;
		$goods = [];
		$arr3 = [];
			
		foreach ($result as $row) {
			
			$arr = [];
			$goods = json_decode($row->goods, true);
			
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
				$arr2['Цена'] = -1;
				$arr2['Сумма'] = 0;
				$arr2['СуммаСНаценкой'] = 0;
				$arr2['ПроцентСкидкиНаценки'] = 0;
				$arr2['НоменклатураНаименование'] = '';
				$arr2['ЕдиницаИзмеренияНаименования'] = '';
				$arr2['КоличествоШтукВКомплекте'] = 0;
				$arr2['КоэффициентПересчетаКоличества'] = 0;
				$arr2['ЗаполнятьХарактеристику'] = false;
				$arr2['ПродаетсяКомплектами'] = false;
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
					$arr2['СуммаСНаценкой'] = $arr2['Сумма'];
				}
				
				$document_amount += $arr2['СуммаСНаценкой'];
				$arr[] = $arr2;	
				$arr3[] = ['НоменклатураИД' => $id_nomenclature, 'Количество' => $c['Количество']];
				
			}
			
			$goods = $arr;
			
		}
		
		list($result, $err) = parent::post_request_to_api_1c('weight_calculation', ['data' => $arr3, 'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}

		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}

		if(!array_key_exists('Вес', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Вес']);
		}
		
		$weight = $result['Вес'];
		
		$draft_details = [
			'СуммаДокумента' => round($document_amount, 2),
			'Запасы' => $goods,
			'Вес' => round($weight, 2)
		];
		
		parent::prepare_response(['response' => ['draft_details' => ['data' => $draft_details]]], true);
		
	}
	
}
