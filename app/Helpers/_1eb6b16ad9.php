<?php

namespace App\Helpers\_1eb6b16ad9;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class _1eb6b16ad9 extends Common {
	
	protected $result_ = [['error'=>'unknown'], false];
	
	public function __construct(){
		
		parent::__construct();
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		
		$token = '';
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
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
				
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			$this->result_ = [['error'=>$err], false];
			return;
		}		
		
		$nearest_available_dates_data = parent::get_nearest_available_dates($token);
		$transport_data = parent::get_transport($token);
		$shipping_calendar_data = parent::get_shipping_calendar($token);
		$shipping_intervals_data = parent::get_shipping_intervals($token);
		
		$this->result_ = [['response' => ['nearest_available_dates' => $nearest_available_dates_data, 'transport' => $transport_data, 'shipping_calendar' => $shipping_calendar_data, 'shipping_intervals' => $shipping_intervals_data]], true];
		
	}

}