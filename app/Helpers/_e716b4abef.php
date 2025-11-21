<?php

namespace App\Helpers\_e716b4abef;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class _e716b4abef extends Common {
	
	protected $result_ = [['error'=>'unknown'], false];
	
	public function __construct(){
		
		parent::__construct();
		
		$err = parent::validate_get_params('other');
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		$client_rsa_pubkey = htmlspecialchars($_GET['client_rsa_pubkey'], ENT_QUOTES, $this->encoding);
		
		$planned_dates = trim(preg_replace('/[^0-9\-:T ]/', '', $_GET['planned_dates'] ?? ''));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		
		if($planned_dates != ''){
			if(!preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} [0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/', $planned_dates)){
				$this->result_ = [['error'=>'FAIL_PLANNED_DATES'], false];
				return;
			}
			$ex = explode(' ', $planned_dates);
			$planned_date1 = $ex[0];
			$planned_date2 = $ex[1];
			if(date('U', strtotime($planned_date1)) > date('U', strtotime($planned_date2))){
				return json_encode(array('error'=>'DATE_RANGE_IS_INVALID_FIRST_DATE_MUST_NOT_BE_GREATER_THAN_SECOND'));
			}
			### плюс 1 месяц в перед 
			$tmsmp = date('U', strtotime($planned_date2)) + 2678400;
			$planned_date2 = gmdate('Y-m-d\TH:i:s', $tmsmp);
			###
		}else{
			$planned_date1 = '';
			$planned_date2 = '';
		}
		
		$token = '';
		$manager_fio = '';
		$main_counterparty_id = '';
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`phone`, :aes_key) USING utf8mb4) AS `phone`, CONVERT(AES_DECRYPT(`email`, :aes_key2) USING utf8mb4) AS `email`, `status`, CONVERT(AES_DECRYPT(`token`, :aes_key3) USING utf8mb4) AS `token`, `expires_token`, CONVERT(AES_DECRYPT(`fio`, :aes_key4) USING utf8mb4) AS `fio`, CONVERT(AES_DECRYPT(`manager_fio`, :aes_key5) USING utf8mb4) AS `manager_fio`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'aes_key3' => $this->aes_key[0], 'aes_key4' => $this->aes_key[0], 'aes_key5' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
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
				
				preg_match('/([^ ]+) ([^ ]+) ([^ ]+)/', $row->manager_fio, $matches);
				if($matches){
					$manager_fio = mb_strtoupper(mb_substr($matches[2], 0, 1)) . '. ' . mb_strtoupper(mb_substr($matches[1], 0, 1)) . mb_strtolower(mb_substr($matches[1], 1, 255));
				}else{
					$manager_fio = '';
				}
				
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			$this->result_ = [['error'=>$err], false];
			return;
		}		
		
		$shipments_data = parent::get_shipments($main_counterparty_id, 1, 12, $planned_date1, $planned_date2);
		
		if(array_key_exists('error', $shipments_data)){
			$this->result_ = [['error'=>$shipments_data['error']], false];
			return;
		}
		
		$shipment_warehouses_data = parent::get_shipment_warehouses();

		if(array_key_exists('error', $shipment_warehouses_data)){
			$this->result_ = [['error'=>$shipment_warehouses_data['error']], false];
			return;
		}
		
		$arr_shipment_warehouses_id_name = [];
		foreach ($shipment_warehouses_data['data'] as $c) {
			$arr_shipment_warehouses_id_name[$c['СкладИД']] = $c['Наименование'];
		}
		
		$counterparties_data = parent::get_counterparties($main_counterparty_id);
		
		if(array_key_exists('error', $counterparties_data)){
			$this->result_ = [['error'=>$counterparties_data['error']], false];
			return;
		}
		
		$arr_counterparties_id_name = [];
		foreach ($counterparties_data['data'] as $c) {
			if($c['counterparty_id'] != ''){
				$arr_counterparties_id_name[$c['counterparty_id']] = $c['fullname'];
			}else if($c['application_id'] != '' && $c['application_id'] != '-'){
				$arr_counterparties_id_name[$c['application_id']] = $c['fullname'];
			}
		}
		
		$delivery_addresses_data = parent::get_delivery_addresses($token);
		
		if(array_key_exists('error', $delivery_addresses_data)){
			$this->result_ = [['error'=>$delivery_addresses_data['error']], false];
			return;
		}

		$employees_data = parent::get_employees2($main_counterparty_id);
		
		if(array_key_exists('error', $employees_data)){
			$this->result_ = [['error'=>$employees_data['error']], false];
			return;
		}
		
		$shipments_data2 = [];
		$arr = [];
		foreach ($shipments_data['data'] as $c) {
			
			$arr2 = [];
			
			foreach ($c as $key => $val) {
				
				if($key == 'responsible_sokrof'){
					$val = $manager_fio;
				}
				
				$arr2[$key] = $val;
				
				if($key == 'delivery_address_id'){
					$arr2['delivery_address_name'] = '';
					
					if($val != ''){
						$arr2['delivery_type'] = ['value' => 'delivery', 'label' => 'Доставка'];
					}else{
						$arr2['delivery_type'] = ['value' => 'pickup', 'label' => 'Самовывоз'];
					}
					
				}
				
				if($key == 'counterparty_id'){
					
					$arr2['counterparty_name'] = '';
					if(array_key_exists($val, $arr_counterparties_id_name)){
						$arr2['counterparty_name'] = $arr_counterparties_id_name[$val];
					}
					
				}
				
				if($key == 'shipping_warehouse_id'){
					
					$arr2['shipping_warehouse_name'] = '';
					if(array_key_exists($val, $arr_shipment_warehouses_id_name)){
						$arr2['shipping_warehouse_name'] = $arr_shipment_warehouses_id_name[$val];
					}
					
				}
				
			}
			
			$arr[] = $arr2;
			
		}
		
		$shipments_data2['data'] = $arr;
		$shipments_data2['pagination_max_page'] = ($shipments_data['pagination_max_page'] < 1 ? 1 : $shipments_data['pagination_max_page']);
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['shipments' => $shipments_data2, 'employees' => $employees_data, 'counterparties' => $counterparties_data, 'shipment_warehouses' => $shipment_warehouses_data], $client_rsa_pubkey);
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		
		$this->result_ = [['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true];
		// $this->result_ = [['response' => ['shipments' => $shipments_data2, 'employees' => $employees_data, 'counterparties' => $counterparties_data, 'shipment_warehouses' => $shipment_warehouses_data]], true];
		
	}

}