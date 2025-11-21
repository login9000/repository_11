<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerDeleteCounterparty extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('DELETE');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['id'] ?? '', 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			return parent::prepare_response(['error'=>$err]);
		}

		if($id == ''){
			return parent::prepare_response(['error'=>'ID_IS_EMPTY_OR_INCORRECT']);
		}
		
		$token = '';
		$main_counterparty_id = '';
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				return parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					return parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				$token = $row->token;
				$main_counterparty_id = $row->main_counterparty_id;
				
			}	
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			return parent::prepare_response(['error'=>$err]);
		}
		
		try{
			
			if(!Schema::hasTable('counterparties_'.$main_counterparty_id)){
				return ['error'=>'COULD_NOT_FIND_THE_TABLE_WITH_THE_COUNTERPARTY_DATA', 'comment'=>$main_counterparty_id];
			}
			
			$result = DB::select('SELECT `id`, `is_confirmed` FROM `counterparties_'.$main_counterparty_id.'` WHERE `application_id` = :id1 OR `counterparty_id` = :id2 LIMIT 1', ['id1' => $id, 'id2' => $id]);
			
			if(sizeof($result) == 0){
				return parent::prepare_response(['error'=>'NO_EXISTS_ID']);
			}
			
			foreach ($result as $row) {
				
				if($row->id == 2){
					return parent::prepare_response(['error'=>'THIS_IS_THE_MAIN_COUNTERPARTY_AND_CANNOT_BE_DELETED']);
				}
				
				if($row->is_confirmed == '1'){
					return parent::prepare_response(['error'=>'YOU_CANNOT_DELETE_THIS_COUNTERPARTY']);
				}
				
			}
			DB::delete('DELETE FROM `counterparties_'.$main_counterparty_id.'` WHERE `application_id` = :id LIMIT 1', ['id' => $id]);
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				return parent::prepare_response(['error'=>$err]);
			}else{
				return parent::prepare_response(['error'=>'NO_EXISTS_ID']);
			}
		}
		
		list($result, $err) = parent::post_request_to_api_1c('delete_counterparty', ['id' => $id, 'token' => $token]);
		if($err){
			return parent::prepare_response(['error'=>$err], true);
		}
		
		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}
		
		return parent::prepare_response(['response' => 'ok']);
		
	}
	
}
