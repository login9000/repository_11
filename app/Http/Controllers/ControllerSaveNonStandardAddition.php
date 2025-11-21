<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerSaveNonStandardAddition extends Common{
	
	public function __invoke(Request $request){
		
		parent::check_allowed_method('PUT');
		
		$err = parent::validate_fields('other', $request);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}		
		
		list($data, $err) = parent::handler_data_crypt($request);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}

		$draft_id = ($data['draft_id'] ?? '');
		$goods_non_standard_addition = ($data['goods_non_standard_addition'] ?? '');
		$files_non_standard_addition = ($data['files_non_standard_addition'] ?? '');

		// $draft_id = ($request->input('draft_id') ?? '');
		// $goods_non_standard_addition = ($request->input('goods_non_standard_addition') ?? '');
		// $files_non_standard_addition = ($request->input('files_non_standard_addition') ?? '');
		
		$draft_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($draft_id, 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($draft_id == ''){
			parent::prepare_response(['error'=>'DRAFT_ID_IS_EMPTY_OR_INCORRECT']);
		}
		
		if(!is_array($goods_non_standard_addition)){
			parent::prepare_response(['error'=>'FIELD_GOODS_NON_STANDARD_ADDITION_MUST_BE_AN_ARRAY']);
		}
		
		$si = sizeof($goods_non_standard_addition);
		if($si > 100){
			parent::prepare_response(['error'=>'LIMIT_MAX_COUNT_GOODS_NON_STANDARD_ADDITION', 'comment' => 100]);
		}
		
		$arr = [];
		
		foreach($goods_non_standard_addition as $c){
			
			$arr2 = [];
			
			if(array_key_exists('description', $c)){
				$arr2['Описание'] = mb_substr(htmlspecialchars($c['description'], ENT_QUOTES, $this->encoding), 0, 1000);
				if($arr2['Описание'] == ''){
					parent::prepare_response(['error'=>'FIELD_DESCRIPTION_MUST_BE_FILLED_IN']);
				}
			}
			
			if(array_key_exists('quantity', $c) ){
				if(!is_numeric($c['quantity'])){
					parent::prepare_response(['error'=>'FIELD_QUANTITY_MUST_BE_A_NUMBER']);
				}
				if(strpos($c['quantity'], '.') !== false){
					parent::prepare_response(['error'=>'THE_QUANTITY_FIELD_MUST_CONTAIN_AN_INTEGER']);
				}
				if($c['quantity'] < 1){
					parent::prepare_response(['error'=>'FIELD_QUANTITY_MUST_BE_GREATER_THAN_ZERO']);
				}
				if($c['quantity'] > 10000000000){
					parent::prepare_response(['error'=>'FIELD_QUANTITY_SHOULD_NOT_BE_MORE_THAN_1_BILLION']);
				}
				$arr2['Количество'] = (int) $c['quantity'];
			}

			if(!array_key_exists('Описание', $arr2)){
				parent::prepare_response(['error'=>'MISSING_DESCRIPTION_FIELD']);
			}
			
			if(!array_key_exists('Количество', $arr2)){
				parent::prepare_response(['error'=>'MISSING_QUANTITY_FIELD']);
			}
			
			$arr[] = $arr2;
			
		}
		
		$goods_non_standard_addition = $arr;
		$arr = [];
		
		if(!is_array($files_non_standard_addition)){
			parent::prepare_response(['error'=>'FIELD_FILES_NON_STANDARD_ADDITION_MUST_BE_AN_ARRAY']);
		}
		
		$si = sizeof($files_non_standard_addition);
		if($si > 5){
			parent::prepare_response(['error'=>'LIMIT_MAX_COUNT_FILES_NON_STANDARD_ADDITION', 'comment' => 5]);
		}
		
		if(sizeof($goods_non_standard_addition) > 0){
			foreach($files_non_standard_addition as $c){
				
				$arr2 = [];
				
				if(array_key_exists('link', $c)){
					$arr2['СсылкаНаФайл'] = mb_substr(htmlspecialchars($c['link'], ENT_QUOTES, $this->encoding), 0, 255);
					if($arr2['СсылкаНаФайл'] == ''){
						parent::prepare_response(['error'=>'LINK_IS_NOT_FILLED_IN']);
					}
					$arr2['ИмяФайла'] = preg_replace('/.+\/(([^\/]+)\.('.implode('|', $this->config_project['allow_file_for_non_standard_addition']).'))/', '$1', $arr2['СсылкаНаФайл']);
				}
				
				if(!array_key_exists('СсылкаНаФайл', $arr2)){
					parent::prepare_response(['error'=>'MISSING_LINK_FIELD']);
				}
				
				$arr[] = $arr2;
				
			}
		}
		
		$files_non_standard_addition = $arr;
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
		
		$goods_non_standard_addition = parent::escape_unicode_decode(json_encode($goods_non_standard_addition));
		$files_non_standard_addition = parent::escape_unicode_decode(json_encode($files_non_standard_addition));
			
		try{
			
			if(!Schema::hasTable('orders_'.$main_counterparty_id)){
				// вот этот говнокод пришлось написать потому что наш фронтендер - ленивая задница	
				parent::prepare_response(['error'=>'Не удалось найти таблицу с данными заказов ('.$main_counterparty_id.')']);
				//
			}
			
			$result = DB::select('SELECT `id` FROM `orders_'.$main_counterparty_id.'` WHERE `order_id` = :draft_id AND `status` = \'draft\' LIMIT 1', ['draft_id' => $draft_id]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NOT_FOUND_DRAFT']);
			}
			
			DB::update('UPDATE `orders_'.$main_counterparty_id.'` SET `goods_non_standard_addition` = AES_ENCRYPT(:goods_non_standard_addition, :aes_key), `files_non_standard_addition` = AES_ENCRYPT(:files_non_standard_addition, :aes_key2) WHERE `order_id` = :draft_id AND `status` = \'draft\' LIMIT 1', ['goods_non_standard_addition' => $goods_non_standard_addition, 'aes_key' => $this->aes_key[0], 'files_non_standard_addition' => $files_non_standard_addition, 'aes_key2' => $this->aes_key[0], 'draft_id' => $draft_id]);
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}else{
				parent::prepare_response(['error'=>'NOT_FOUND_DRAFT']);
			}
		}

		parent::prepare_response(['response' => 'ok']);
		
	}
	
}
