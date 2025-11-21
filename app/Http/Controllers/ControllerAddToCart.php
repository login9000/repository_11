<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerAddToCart extends Common{
	
	public function __invoke(Request $request){
		
		parent::check_allowed_method('POST');
		
		$target = ($request->input('target') ?? '');
		$id_nomenclature = ($request->input('id_nomenclature') ?? '');
		$id_nomenclature_type = ($request->input('id_nomenclature_type') ?? '');
		$quantity = ($request->input('quantity') ?? '');
		$shipping_warehouse_id = ($request->input('shipping_warehouse_id') ?? '');
		$products = ($request->input('products') ?? '');
		$profile = ($request->input('profile') ?? '');
		$thickness = ($request->input('thickness') ?? '');
		$coating = ($request->input('coating') ?? '');
		$color = ($request->input('color') ?? '');
		$length = ($request->input('length') ?? '');
		
		$id_nomenclature = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($id_nomenclature, 0, 36)));
		$id_nomenclature_type = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($id_nomenclature_type, 0, 36)));
		$quantity = trim(preg_replace('/[^0-9\.]/', '', mb_substr($quantity, 0, 25)));
		$shipping_warehouse_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($shipping_warehouse_id , 0, 36)));
		$products = trim(mb_substr(htmlspecialchars($products , ENT_QUOTES, $this->encoding), 0, 128));
		$profile = trim(mb_substr(htmlspecialchars($profile , ENT_QUOTES, $this->encoding), 0, 128));
		$thickness = trim(mb_substr(htmlspecialchars($thickness , ENT_QUOTES, $this->encoding), 0, 128));
		$coating = trim(mb_substr(htmlspecialchars($coating , ENT_QUOTES, $this->encoding), 0, 128));
		$color = trim(mb_substr(htmlspecialchars($color , ENT_QUOTES, $this->encoding), 0, 128));
		$length = (string) trim(preg_replace('/[^0-9]/', '', mb_substr($length, 0, 8)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}

		if($shipping_warehouse_id == ''){
			parent::prepare_response(['error'=>'SHIPPING_WAREHOUSE_ID_IS_EMPTY_OR_INCORRECT']);
		}
		
		if(!in_array($target, ['product_remains', 'substandard', 'finished_products'])){
			parent::prepare_response(['error'=>'TARGET_IS_INCORRECT']);
		}
		
		if($id_nomenclature == ''){
			parent::prepare_response(['error'=>'ID_NOMENCLATURE_IS_EMPTY_OR_INCORRECT']);
		}
		
		if($id_nomenclature_type == ''){
			parent::prepare_response(['error'=>'ID_NOMENCLATURE_TYPE_IS_EMPTY_OR_INCORRECT']);
		}
		
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
		$quantity = (float) $quantity;
		
		try{

			$result = DB::select('SELECT `expires_token` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				
			}	
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		$prices_product_catalog_data = parent::get_prices_of_the_main_counterparty();
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
			case 'product_remains':
				list($data_, $err) = parent::prepare_result_product_remains($shipping_warehouse_id, $products, $profile, $thickness, $coating, $color);
				break;
			case 'substandard':
				list($data_, $err) = parent::prepare_result_substandard_catalog($shipping_warehouse_id, $products, $profile, $thickness, $coating, $color);
				break;
			case 'finished_products':
				list($data_, $err) = parent::prepare_result_finished_products($shipping_warehouse_id, $products, $profile, $thickness, $coating, $color);
				break;
		}
		
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		$data = [];
		
		foreach($data_['data'] as $c){
			if($c['НоменклатураИД'] == $id_nomenclature && $c['ВидНоменклатурыИД'] == $id_nomenclature_type && $c['Характеристика'] == $length){
				if($c['Количество'] < $quantity){
					parent::prepare_response(['error' => 'QUANTITY_IS_TOO_BIG', 'comment' => $c['Количество']]);
				}
				$data['id_nomenclature'] = $c['НоменклатураИД'];
				$data['id_nomenclature_type'] = $c['ВидНоменклатурыИД'];
				$data['nomenclature_name'] = $c['НоменклатураНаименование'];
				$data['unit'] = $c['ЕдиницаИзмеренияНаименования'];
				$data['price'] = implode('|', $c['Цена']);
				$data['sum'] = 0;
				$data['total'] = 0;
				$data['quantity'] = $quantity;
				$data['length'] = $c['Характеристика'];
				$length = $c['Характеристика'];
				break;
			}
		}
		
		if(sizeof($data) == 0){
			parent::prepare_response(['error' => 'POSITION_NOT_FOUND']);
		}
		
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
			
			foreach($result as $c){
				$data_ = json_decode($c->data, true);
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
		
		$data['sum'] = $sum;
		$data['total'] = $total;
		
		try{

			Schema::create('cart_'.$user_myid, function ($table) {
				$table->engine = 'InnoDB';
				$table->increments('id');
				$table->enum('target', ['product_remains', 'substandard', 'finished_products'])->default('product_remains');
				$table->char('id_nomenclature', 36)->default('');
				$table->char('id_nomenclature_type', 36)->default('');
				$table->text('nomenclature_name')->nullable();
				$table->char('unit', 16)->default('');
				$table->char('price', 255)->default('0');
				$table->char('sum', 32)->default('0');
				$table->char('total', 32)->default('0');
				$table->char('quantity', 32)->default('0');
				$table->char('length', 32)->default('0');
				$table->string('other', 512)->default('');
			});
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view already exists') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}
		}
		
		$other = parent::escape_unicode_decode(json_encode(['shipping_warehouse_id' => $shipping_warehouse_id, 'products' => $products, 'profile' => $profile, 'thickness' => $thickness, 'coating' => $coating, 'color' => $color]));
		$number_of_positions = 0;
		$total_sum = 0;
		
		try{
	
			foreach([$data] as $c){
							
				$result = DB::select('SELECT `other` FROM `cart_'.$user_myid.'` WHERE `target` = :target AND `id_nomenclature` = :id_nomenclature AND `id_nomenclature_type` = :id_nomenclature_type AND `length` = :length LIMIT 1', ['target' => $target, 'id_nomenclature' => $c['id_nomenclature'], 'id_nomenclature_type' => $c['id_nomenclature_type'], 'length' => $length]);
				
				foreach($result as $row){
					
					$j = json_decode($row->other, true);
					if($j !== null){
						if($shipping_warehouse_id == $j['shipping_warehouse_id']){
							parent::prepare_response(['error' => 'THIS_PRODUCT_HAS_ALREADY_BEEN_ADDED_TO_THE_CART_PREVIOUSLY', 'comment' => $c['nomenclature_name']]);
						}
					}
					
				}
				
				DB::insert('INSERT INTO `cart_'.$user_myid.'` (`target`, `id_nomenclature`, `id_nomenclature_type`, `nomenclature_name`, `unit`, `price`, `sum`, `total`, `quantity`, `length`, `other`) values (:target, :id_nomenclature, :id_nomenclature_type, :nomenclature_name, :unit, :price, :sum, :total, :quantity, :length, :other)', ['target' => $target, 'id_nomenclature' => $c['id_nomenclature'], 'id_nomenclature_type' => $c['id_nomenclature_type'], 'nomenclature_name' => $c['nomenclature_name'], 'unit' => $c['unit'], 'price' => $c['price'], 'sum' => $c['sum'], 'total' => $c['total'], 'quantity' => $c['quantity'], 'length' => $c['length'], 'other' => $other]);
				
				break;
				
			}
			
			$result = DB::select('SELECT `sum`, `other` FROM `cart_'.$user_myid.'` WHERE `target` = :target', ['target' => $target]);
			
			foreach ($result as $row) {
				
				$j = json_decode($row->other, true);
				if($j !== null){
					if($shipping_warehouse_id == $j['shipping_warehouse_id']){
						$number_of_positions++;
						$total_sum += (float) $row->sum;
					}
				}
				
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['target' => $target, 'number_of_positions' => $number_of_positions, 'total_sum' => $total_sum]], true);
		
	}
	
}
