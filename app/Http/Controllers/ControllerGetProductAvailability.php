<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Schema;

class ControllerGetProductAvailability extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');

		$shipping_warehouse_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['shipping_warehouse_id'] ?? '', 0, 36)));
		$id_nomenclature = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['id_nomenclature'] ?? '', 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
		 parent::prepare_response(['error'=>$err]);
		}
		
		if($shipping_warehouse_id == ''){
			parent::prepare_response(['error'=>'SHIPPING_WAREHOUSE_NOT_SPECIFIED']);
		}
		
		if($id_nomenclature == ''){
			parent::prepare_response(['error'=>'ID_NOMENCLATURE_IS_EMPTY_OR_INCORRECT']);
		}
		
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
		
		$product_catalog_data = parent::get_product_catalog();

		if(array_key_exists('error', $product_catalog_data)){
			parent::prepare_response(['error'=>$product_catalog_data['error']]);
		}
		
		$arr_product_catalog_id_data = [];
		foreach ($product_catalog_data['data'] as $c) {
			foreach ($c['Данные'] as $c2) {
				$arr_product_catalog_id_data[$c2['НоменклатураИД']] = [
					'Толщина' => str_replace(',', '.', $c2['Толщина']),
					'ЦветИД' => $c2['ЦветИД'],
					'ОстаткиПоМеталлу' => $c2['ОстаткиПоМеталлу'],
					'ОстаткиВШтуках' => $c2['ОстаткиВШтуках'],
					'ЗаполнятьХарактеристику' => $c2['ЗаполнятьХарактеристику'],
					'КоэффициентПересчетаКоличества' => $c2['КоэффициентПересчетаКоличества'],
					'ПродаетсяКомплектами' => $c2['ПродаетсяКомплектами'],
					'КоличествоШтукВКомплекте' => $c2['КоличествоШтукВКомплекте']
				];
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
		
		$total = 0;
		$sum = 0;
		$price = -1;
		$percentage_discount_markup = 0;
		$availability = '-';
		$metal_residues = '';
		$remaining_pieces = '';
		$is_fill_in_the_characteristics = false;
		$quantity_conversion_factor = 0;
		$sold_in_sets = false;
		$number_of_pieces_in_a_set = 0;

		if(array_key_exists($id_nomenclature, $arr_prices_product_catalog_id_price)){
			$price = $arr_prices_product_catalog_id_price[$id_nomenclature];
		}
				
		if(array_key_exists($id_nomenclature, $arr_product_catalog_id_data)){
			$thickness = $arr_product_catalog_id_data[$id_nomenclature]['Толщина'];
			$color_id  = $arr_product_catalog_id_data[$id_nomenclature]['ЦветИД'];
			$metal_residues = $arr_product_catalog_id_data[$id_nomenclature]['ОстаткиПоМеталлу']; 
			$remaining_pieces  = $arr_product_catalog_id_data[$id_nomenclature]['ОстаткиВШтуках'];
			$is_fill_in_the_characteristics = $arr_product_catalog_id_data[$id_nomenclature]['ЗаполнятьХарактеристику'];
			$quantity_conversion_factor = $arr_product_catalog_id_data[$id_nomenclature]['КоэффициентПересчетаКоличества'];
			$sold_in_sets = $arr_product_catalog_id_data[$id_nomenclature]['ПродаетсяКомплектами'];
			$number_of_pieces_in_a_set = $arr_product_catalog_id_data[$id_nomenclature]['КоличествоШтукВКомплекте'];
		}else{
			$availability = 'N/A';
			$total = 'N/A';
			$sum = 'N/A';
		}
		
		if($metal_residues && $remaining_pieces){
			$availability = 'ошибка';
		}
		if(!$metal_residues && !$remaining_pieces){
			$availability = 'ошибка 2';
		}
		
		if($availability == '-'){
			
			if($metal_residues){
				if(array_key_exists($thickness.'-'.$color_id, $arr_leftover_metal_for_products_id_quantity)){
					$availability = $arr_leftover_metal_for_products_id_quantity[$thickness.'-'.$color_id];
				}
			}
			
			if($remaining_pieces){
				if(array_key_exists($shipping_warehouse_id.'-'.$id_nomenclature, $arr_product_balances_id_quantity)){
					$availability = $arr_product_balances_id_quantity[$shipping_warehouse_id.'-'.$id_nomenclature].' шт.';
				}
			}
			
		}
		
		parent::prepare_response(['response' => ['id_nomenclature' => $id_nomenclature, 'availability' => $availability]], true);
		
	}
	
}
