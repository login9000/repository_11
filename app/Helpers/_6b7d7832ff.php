<?php

namespace App\Helpers\_6b7d7832ff;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class _6b7d7832ff extends Common {
	
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
		
		$main_counterparty_id = '';
		
		try{

			$result = DB::select('SELECT `expires_token`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				$this->result_ = [['error'=>'NO_EXISTS_ACCOUNT'], false];
				return;
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					$this->result_ = [['error'=>'EXPIRES_TOKEN'], false];
					return;
				}
				$main_counterparty_id = $row->main_counterparty_id;
				
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			$this->result_ = [['error'=>$err], false];
			return;
		}		
		
		$counterparties_data = parent::get_counterparties($main_counterparty_id);
		$shipment_warehouses_data = parent::get_shipment_warehouses();
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['counterparties' => $counterparties_data, 'shipment_warehouses' => $shipment_warehouses_data], $client_rsa_pubkey);
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		
		$this->result_ = [['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true];
		//$this->result_ = [['response' => ['counterparties' => $counterparties_data, 'shipment_warehouses' => $shipment_warehouses_data]], true];
		
	}

}