<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerGetMutualSettlements extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		
		$counterparty_id = preg_replace('/[^a-f0-9]/', '', substr($_GET['counterparty_id'] ?? '', 0, 36));
		$period_dates = preg_replace('/[^0-9\-:T ]/', '', $_GET['period_dates'] ?? '');
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if(!preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} [0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/', $period_dates)){
			parent::prepare_response(['error'=>'FAIL_PERIOD_DATES']);
		}
		$ex = explode(' ', $period_dates);
		$period_date1 = $ex[0];
		$period_date2 = $ex[1];
		if(date('U', strtotime($period_date1)) > date('U', strtotime($period_date2))){
			parent::prepare_response(['error'=>'DATE_RANGE_IS_INVALID_FIRST_DATE_MUST_NOT_BE_GREATER_THAN_SECOND']);
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
		
		$mutual_settlements_data = parent::get_mutual_settlements($counterparty_id, $period_date1, $period_date2, $token);
				
		if(array_key_exists('error', $mutual_settlements_data)){
			parent::prepare_response(['error'=>$mutual_settlements_data['error']]);
		}
		
		parent::prepare_response(['response' => $mutual_settlements_data], true);
		
	}
	
}
