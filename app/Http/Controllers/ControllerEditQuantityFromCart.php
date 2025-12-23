<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerEditQuantityFromCart extends Common{
	
	public function __invoke(Request $request){
		
		parent::check_allowed_method('PUT');
		
		$id = ($request->input('id') ?? '');
		$quantity = ($request->input('quantity') ?? '');
		
		$id = trim(preg_replace('/[^0-9]/', '', mb_substr($id, 0, 11)));
		$quantity = trim(preg_replace('/[^0-9\.]/', '', mb_substr($quantity, 0, 25)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}

		if($id == ''){
			parent::prepare_response(['error'=>'ID_IS_EMPTY_OR_INCORRECT']);
		}
		$id = (int) $id;
		
		if($quantity == ''){
			parent::prepare_response(['error'=>'QUANTITY_IS_EMPTY_OR_INCORRECT']);
		}
		if(!is_numeric($quantity)){
			parent::prepare_response(['error'=>'QUANTITY_MUST_BE_A_NUMBER']);
		}
		/* if(strpos($quantity, '.') !== false){
			parent::prepare_response(['error'=>'QUANTITY_MUST_CONTAIN_AN_INTEGER']);
		} */
		if($quantity < 1){
			parent::prepare_response(['error'=>'QUANTITY_MUST_BE_GREATER_THAN_ZERO']);
		}
		if($quantity > 10000000000){
			parent::prepare_response(['error'=>'QUANTITY_SHOULD_NOT_BE_MORE_THAN_1_BILLION']);
		}
		$quantity = (int) $quantity;
		$main_counterparty_id = '';
		
		try{

			$result = DB::select('SELECT `expires_token`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				$main_counterparty_id = $row->main_counterparty_id;
				
			}	
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		$id_nomenclature = '';
		$id_nomenclature_type = '';
		$target = '';
		$shipping_warehouse_id = '';
		$products = '';
		$profile = '';
		$thickness = '';
		$coating = '';
		$color = '';
		
		try{

			$result = DB::select('SELECT `id_nomenclature`, `id_nomenclature_type`, `target`, `other` FROM `cart_'.$user_myid.'` WHERE `id` = :id LIMIT 1', ['id' => $id]);
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'THIS_ITEM_WAS_NOT_FOUND_IN_THE_CART']);
			}
			
			foreach ($result as $row) {
				
				$target = $row->target;
				$id_nomenclature = $row->id_nomenclature;
				$id_nomenclature_type = $row->id_nomenclature_type;
				
				$j = json_decode($row->other, true);
				$shipping_warehouse_id = $j['shipping_warehouse_id'];
				$products = $j['products'];
				$profile = $j['profile'];
				$thickness = $j['thickness'];
				$coating = $j['coating'];
				$color = $j['color'];
				
			}	
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}else{
				parent::prepare_response(['error'=>'THIS_ITEM_WAS_NOT_FOUND_IN_THE_CART']);
			}
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

		switch($target){
			case 'substandard':
				$balances_data = $this->get_substandard_balances();
				break;
			case 'product_remains':	
			case 'finished_products':
				$balances_data = $this->get_product_balances();
				break;
		}
		
		if(array_key_exists('error', $balances_data)){
			parent::prepare_response(['error'=>$balances_data['error']]);
		}

		$arr_balances_id_length = [];
		$is_get_data = false;
		foreach ($balances_data['data'] as $c) {
			$id_ = '';
			foreach ($c as $key => $val) {
				if($key == 'Данные' && $is_get_data){
					$is_get_data = false;
					foreach ($val as $c2) {
						$arr_balances_id_length[$id_.'-'.$c2['НоменклатураИД']] = ($c2['Характеристика'] ?? '');
					}
					break;
				}
				if($key == 'СкладИД'){
					$id_ = $val;
					$is_get_data = true;
					continue;
				}
			}
		}
		
		if($shipping_warehouse_id == ''){
			parent::prepare_response(['error'=>'SHIPPING_WAREHOUSE_ID_IS_EMPTY_OR_INCORRECT']);
		}
		
		switch($target){
			case 'product_remains':
				list($data_, $err) = parent::prepare_result_product_remains($main_counterparty_id, $shipping_warehouse_id, $products, $profile, $thickness, $coating, $color);
				break;
			case 'substandard':
				list($data_, $err) = parent::prepare_result_substandard_catalog($main_counterparty_id, $shipping_warehouse_id, $products, $profile, $thickness, $coating, $color);
				break;
			case 'finished_products':
				list($data_, $err) = parent::prepare_result_finished_products($main_counterparty_id, $shipping_warehouse_id, $products, $profile, $thickness, $coating, $color);
				break;
		}
		
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		foreach($data_['data'] as $c){
			if($c['НоменклатураИД'] == $id_nomenclature && $c['ВидНоменклатурыИД'] == $id_nomenclature_type){
				if($c['Количество'] < $quantity){
					parent::prepare_response(['error' => 'QUANTITY_IS_TOO_BIG', 'comment' => $c['Количество']]);
				}
				break;
			}
		}

		$data_ = [];

		try{
			
			switch($target){
				case 'product_remains':
					$result = DB::select('SELECT SQL_CACHE `data` FROM `product_remains` WHERE `id` = 1 LIMIT 1');
					break;
				case 'substandard':
					$result = DB::select('SELECT SQL_CACHE `data` FROM `substandard_catalog` WHERE `id` = 1 LIMIT 1');
					break;
				case 'finished_products':
					$result = DB::select('SELECT SQL_CACHE `data` FROM `finished_products` WHERE `id` = 1 LIMIT 1');
					break;
			}
			
			foreach($result as $row){
				$data_ = json_decode($row->data, true);
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		$is_find = false;
		$sum = 0;
		$total = 0;

		foreach($data_ as $c){
			
			if(($c['СкладИД'] == $shipping_warehouse_id) && ($products != '' ? ($c['ОсновнойРазделНаименование'] == $products || $c['РазделНаименование'] == $products) : true)){
				if(array_key_exists('Данные', $c)){
					foreach($c['Данные'] as $c2){

						if(($c2['НоменклатураИД'] == $id_nomenclature && $c2['ВидНоменклатурыИД'] == $id_nomenclature_type) && ($profile != '' ? (array_key_exists('Профиль', $c2['Свойства']) && $c2['Свойства']['Профиль'] == $profile) : true) && 
						($thickness != '' ? (array_key_exists('Толщина', $c2['Свойства']) && $c2['Свойства']['Толщина'] == $thickness) : true) && 
						($coating != '' ? (array_key_exists('Покрытие', $c2['Свойства']) && $c2['Свойства']['Покрытие'] == $coating) : true) && 
						($color != '' ? (array_key_exists('Цвет', $c2['Свойства']) && $c2['Свойства']['Цвет'] == $color) : true)){
							
							$is_find = true;
							
							$price = 0;
							if(array_key_exists($id_nomenclature, $arr_prices_product_catalog_id_price)){
								$price = $arr_prices_product_catalog_id_price[$id_nomenclature];
							}
							
							$length = '';
							if(array_key_exists($shipping_warehouse_id.'-'.$id_nomenclature, $arr_balances_id_length)){
								$length = $arr_balances_id_length[$shipping_warehouse_id.'-'.$id_nomenclature];
							}
								
							if($c2['ЗаполнятьХарактеристику']){
								if($length == ''){
									$total = $quantity * 0 * $c2['КоэффициентПересчетаКоличества'] / 1000;
								}else{
									$total = $quantity * $length * $c2['КоэффициентПересчетаКоличества'] / 1000;
								}
							}else if($c2['ПродаетсяКомплектами']){
								$total = $quantity * $c2['КоличествоШтукВКомплекте'];
							}else{
								$total = $quantity;
							}
							$total = round($total, 2);
							
							if($price > 0){
								$sum = round($total * $price, 2);
							}
							
							break;
							
						}
					
					}
				}
			}
			
		}
		
		if(!$is_find){
			parent::prepare_response(['error'=>'NO_OLD_DATA_FOUND_FOR_THIS_POSITION']);
		}
						
		try{
			DB::update('UPDATE `cart_'.$user_myid.'` SET `sum` = :sum, `total` = :total, `quantity` = :quantity  WHERE `id` = :id LIMIT 1', ['sum' => $sum, 'total' => $total, 'quantity' =>  $quantity, 'id' => $id]);
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}else{
				parent::prepare_response(['error'=>'THIS_ITEM_WAS_NOT_FOUND_IN_THE_CART']);
			}
		}
		
		parent::prepare_response(['response' => ['sum' => $sum, 'total' => $total, 'quantity' =>  $quantity, 'id' => $id]]);
		
	}
	
}
