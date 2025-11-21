<?php

namespace App\Helpers\_9a420f87c5;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class _9a420f87c5 extends Common {
	
	protected $result_ = [['error'=>'unknown'], false];
	
	public function __construct(){
		
		parent::__construct();
		
		$err = parent::validate_get_params('other');
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		$client_rsa_pubkey = htmlspecialchars($_GET['client_rsa_pubkey'], ENT_QUOTES, $this->encoding);
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		
		$token = '';
		$main_counterparty_id = '';
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
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
				$main_counterparty_id = $row->main_counterparty_id;
				
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			$this->result_ = [['error'=>$err], false];
			return;
		}		
		
		$delivery_addresses_data = parent::get_delivery_addresses($token);
		
		if(array_key_exists('error', $delivery_addresses_data)){
			$this->result_ = [['error'=>$delivery_addresses_data['error']], false];
			return;
		}
		
		$arr_delivery_addresses_id_addres = [];
		foreach ($delivery_addresses_data['data'] as $c) {
			$arr_delivery_addresses_id_addres[$c['АдресДоставкиИД']] = $c['АдресДоставки'];
		}
		
		$counterparties_data = parent::get_counterparties($main_counterparty_id);
		
		if(array_key_exists('error', $counterparties_data)){
			$this->result_ = [['error'=>$counterparties_data['error']], false];
			return;
		}
		
		$counterparties_data2 = [];
		$arr = [];
		
		foreach($counterparties_data['data'] as $c){
			
			$arr2 = [];
			foreach($c as $key => $val){
				$arr2[$key] = $val;
			}
			$arr2['delivery_addresses_name'] = '';
			if(array_key_exists($c['id_delivery_addresses'], $arr_delivery_addresses_id_addres)){
				$arr2['delivery_addresses_name'] = $arr_delivery_addresses_id_addres[$c['id_delivery_addresses']];
			}
			$arr[] = $arr2;
			break;
			
		}
		
		foreach($counterparties_data['data'] as $idx => $c){
			
			if($idx > 0){
				
				$arr2 = [];
				$is_confirmed = false;
				foreach($c as $key => $val){
					$arr2[$key] = $val;
					if($key == 'is_confirmed' && $val == '1'){
						$is_confirmed = true;
					}
				}
				if(!$is_confirmed ){
					$arr2 = [];
					continue;
				}
				
				$arr2['delivery_addresses_name'] = '';
				if(array_key_exists($c['id_delivery_addresses'], $arr_delivery_addresses_id_addres)){
					$arr2['delivery_addresses_name'] = $arr_delivery_addresses_id_addres[$c['id_delivery_addresses']];
				}
				$arr[] = $arr2;
			
			}
			
		}
		
		foreach($counterparties_data['data'] as $idx => $c){
			
			if($idx > 0){
				
				$arr2 = [];
				$is_confirmed = true;
				foreach($c as $key => $val){
					$arr2[$key] = $val;
					if($key == 'is_confirmed' && $val == ''){
						$is_confirmed = false;
					}
				}
				if($is_confirmed ){
					$arr2 = [];
					continue;
				}
				
				$arr2['delivery_addresses_name'] = '';
				if(array_key_exists($c['id_delivery_addresses'], $arr_delivery_addresses_id_addres)){
					$arr2['delivery_addresses_name'] = $arr_delivery_addresses_id_addres[$c['id_delivery_addresses']];
				}
				$arr[] = $arr2;
			
			}
			
		}

		$counterparties_data2['data'] = $arr;
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['delivery_addresses' => $delivery_addresses_data, 'counterparties' => $counterparties_data2], $client_rsa_pubkey);
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		
		$this->result_ = [['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true];
		// $this->result_ = [['response' => ['delivery_addresses' => $delivery_addresses_data, 'counterparties' => $counterparties_data2]], true];
		
	}

}