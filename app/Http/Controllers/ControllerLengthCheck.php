<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerLengthCheck extends Common{
	
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
		
		$available_specifications_data = parent::get_available_specifications();
		if(array_key_exists('error', $available_specifications_data)){
			parent::prepare_response(['error'=>$available_specifications_data['error']]);
		}
		
		$available_specifications_id_limits = [];
		foreach($available_specifications_data['data'] as $c){
			if(!array_key_exists($c['ВидНоменклатурыИД'], $available_specifications_id_limits)){
				$available_specifications_id_limits[$c['ВидНоменклатурыИД']] = [['От' => $c['От'], 'До' => $c['До'], 'Шаг' => $c['Шаг']]];
			}else{
				$available_specifications_id_limits[$c['ВидНоменклатурыИД']][] = ['От' => $c['От'], 'До' => $c['До'], 'Шаг' => $c['Шаг']];
			}
		}

		$product_catalog_data = parent::get_product_catalog();
		
		if(array_key_exists('error', $product_catalog_data)){
			parent::prepare_response(['error'=>$product_catalog_data['error']]);
		}

		$arr_product_catalog_id_name = [];
		foreach ($product_catalog_data['data'] as $c) {
			foreach ($c['Данные'] as $c2) {
				$arr_product_catalog_id_name[$c2['НоменклатураИД']] = $c2['Наименование'];
			}
		}
		
		foreach($data_ as $c){
			
			$arr = [];
			
			if(array_key_exists('id_nomenclature', $c)){
				$arr['НоменклатураИД'] = preg_replace('/[^a-f0-9\-]/', '', mb_substr($c['id_nomenclature'], 0, 36));
				if($arr['НоменклатураИД'] == ''){
					parent::prepare_response(['error'=>'ID_NOMENCLATURE_IS_EMPTY_OR_NOT_FILLED_IN_CORRECTLY']);
				}
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
				$arr['Характеристика'] = (string) $c['length'];
			}
			
			if(array_key_exists('id_nomenclature_type', $c)){
				$arr['ВидНоменклатурыИД'] = preg_replace('/[^a-f0-9\-]/', '', mb_substr($c['id_nomenclature_type'], 0, 36));
				if($arr['ВидНоменклатурыИД'] == ''){
					parent::prepare_response(['error'=>'ID_NOMENCLATURE_TYPE_IS_EMPTY_OR_NOT_FILLED_IN_CORRECTLY']);
				}
				$is_find = false;
				if(array_key_exists($c['id_nomenclature_type'], $available_specifications_id_limits)){
					$is_find = true;
					if($c['length'] == ''){
						parent::prepare_response(['error'=>'FIELD_LENGTH_MUST_CONTAIN_THE_VALUE']);
					}
					$arr2 = [];
					foreach($available_specifications_id_limits[$c['id_nomenclature_type']] as $c2){
						if($c2['От'] == $c2['До'] || $c2['Шаг'] == 0){
							if(!in_array($c2['От'], $arr2)){
								$arr2[] = $c2['От'];
							}
						}else{
							for($i = $c2['От']; $i <= $c2['До']; $i += $c2['Шаг']){
								if(!in_array($i, $arr2)){
									$arr2[] = $i;
								}
							}	
						}
					}
					if(!in_array((int) $c['length'], $arr2)){
						$nomenclature_name = '???';
						if(array_key_exists('НоменклатураИД', $arr) && array_key_exists($arr['НоменклатураИД'], $arr_product_catalog_id_name)){
							$nomenclature_name = $arr_product_catalog_id_name[$arr['НоменклатураИД']];
						}
						parent::prepare_response(['error'=>'FIELD_LENGTH_HAS_AN_INCORRECT_VALUE', 'comment' => ['nomenclature_name' => $nomenclature_name, 'possible_values' => $arr2]], true);
					}
				}
				if(!$is_find){
					$arr['Характеристика'] = '';
				}
			}
			
			if(!array_key_exists('ВидНоменклатурыИД', $arr)){
				parent::prepare_response(['error'=>'MISSING_ID_NOMENCLATURE_TYPE_FIELD']);
			}
			
			if(!array_key_exists('НоменклатураИД', $arr)){
				parent::prepare_response(['error'=>'MISSING_ID_NOMENCLATURE_FIELD']);
			}
			
			if(!array_key_exists('Характеристика', $arr)){
				parent::prepare_response(['error'=>'MISSING_LENGTH_FIELD']);
			}
			
		}
		
		parent::prepare_response(['response'=>'ok']);
		
	}
	
}
