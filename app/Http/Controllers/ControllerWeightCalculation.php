<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerWeightCalculation extends Common{
	
	public function __invoke(Request $request){
		
		parent::check_allowed_method('POST');
		
		$data_ = ($request->input('data') ?? '');
			
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if(!is_array($data_)){
			parent::prepare_response(['error'=>'FIELD_DATA_MUST_BE_AN_ARRAY']);
		}
		
		$token = '';
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				$token = $row->token;
				
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
					'КоличествоШтукВКомплекте' => $c2['КоличествоШтукВКомплекте'],
					'КоэффициентПересчетаКоличества' => $c2['КоэффициентПересчетаКоличества'],
					'ЗаполнятьХарактеристику' => $c2['ЗаполнятьХарактеристику'],
					'ПродаетсяКомплектами' => $c2['ПродаетсяКомплектами']
				];
			}
		}
		
		$data2 = [];
		
		foreach($data_ as $c){
			
			$id = '';
			$count = 0;
			$length = '-';
			
			if(array_key_exists('id', $c)){
				$id = preg_replace('/[^a-f0-9\-]/', '', mb_substr($c['id'], 0, 36));
				if($id == ''){
					parent::prepare_response(['error'=>'ID_IS_EMPTY_OR_NOT_FILLED_IN_CORRECTLY']);
				}
			}
			
			if(array_key_exists('count', $c) ){
				if(!is_numeric($c['count'])){
					parent::prepare_response(['error'=>'FIELD_COUNT_MUST_BE_A_NUMBER']);
				}
				if(strpos($c['count'], '.') !== false){
					parent::prepare_response(['error'=>'THE_COUNT_FIELD_MUST_CONTAIN_AN_INTEGER']);
				}
				if($c['count'] < 1){
					parent::prepare_response(['error'=>'FIELD_COUNT_MUST_BE_GREATER_THAN_ZERO']);
				}
				$count = (int) $c['count'];
			}
			
			if(array_key_exists('length', $c)){
				if($c['length'] !== '' && $c['length'] !== null){
					if(!is_numeric($c['length'])){
						parent::prepare_response(['error'=>'FIELD_LENGTH_MUST_BE_A_NUMBER']);
					}
					if(strpos($c['length'], '.') !== false){
						parent::prepare_response(['error'=>'THE_LENGTH_FIELD_MUST_CONTAIN_AN_INTEGER']);
					}
					if($c['length'] < 1){
						parent::prepare_response(['error'=>'FIELD_LENGTH_MUST_BE_GREATER_THAN_ZERO']);
					}
				}
				$length = (string) $c['length'];
			}
			
			if($id === '' ){
				parent::prepare_response(['error'=>'MISSING_ID_FIELD']);
			}
			
			if($length === '-' ){
				parent::prepare_response(['error'=>'MISSING_LENGTH_FIELD']);
			}

			if( $count == 0){
				parent::prepare_response(['error'=>'MISSING_COUNT_FIELD']);
			}

			$number_of_pieces_per_set = 0;
			$quantity_conversion_factor = 0;
			$fill_out_the_characteristics = false;
			$sold_in_sets = false;
				
			if(array_key_exists($id, $arr_product_catalog_id_data)){
				$number_of_pieces_per_set = $arr_product_catalog_id_data[$id]['КоличествоШтукВКомплекте'];
				$quantity_conversion_factor = $arr_product_catalog_id_data[$id]['КоэффициентПересчетаКоличества'];
				$fill_out_the_characteristics = $arr_product_catalog_id_data[$id]['ЗаполнятьХарактеристику'];
				$sold_in_sets = $arr_product_catalog_id_data[$id]['ПродаетсяКомплектами'];
			}
				
			if($fill_out_the_characteristics){
				if($length == ''){
					$total = $count * 1 * $quantity_conversion_factor / 1000;
				}else{
					$total = $count * $length * $quantity_conversion_factor / 1000;
				}
			}else if($sold_in_sets){
				$total = $count * $number_of_pieces_per_set;
			}else{
				$total = $count;
			}
				
			$data2[] = ['НоменклатураИД' => $id, 'Количество' => round($total, 2)];
			
		}

		list($result, $err) = parent::post_request_to_api_1c('weight_calculation', ['data' => $data2, 'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}

		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}

		if(!array_key_exists('Вес', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Вес']);
		}

		parent::prepare_response(['response' => $result['Вес']]);
		
	}
	
}
