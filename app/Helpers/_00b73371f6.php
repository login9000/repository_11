<?php

namespace App\Helpers\_00b73371f6;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class _00b73371f6 extends Common {
	
	protected $result_ = [['error'=>'unknown'], false];
	
	public function __construct(){
		
		parent::__construct();
		
		$err = parent::validate_get_params('other');
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		$client_rsa_pubkey = htmlspecialchars($_GET['client_rsa_pubkey'], ENT_QUOTES, $this->encoding);
		
		$order_dates = trim(preg_replace('/[^0-9\-:T ]/', '', $_GET['order_dates'] ?? ''));
		$status = trim(preg_replace('/[^a-z_]/', '', $_GET['status'] ?? ''));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		
		if($order_dates != ''){
			if(!preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} [0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/', $order_dates)){
				$this->result_ = [['error'=>'FAIL_ORDER_DATES'], false];
				return;
			}
			$ex = explode(' ', $order_dates);
			$order_date1 = $ex[0];
			$order_date2 = preg_replace('/[0-9]{2}:[0-9]{2}:[0-9]{2}$/', date('H:i:s'), $ex[1]);
			if(date('U', strtotime($order_date1)) > date('U', strtotime($order_date2))){
				$this->result_ = [['error'=>'DATE_RANGE_IS_INVALID_FIRST_DATE_MUST_NOT_BE_GREATER_THAN_SECOND'], false];
				return;
			}
		}else{
			$order_date1 = '';
			$order_date2 = '';
		}

		if(!in_array($status, ['everything_except_drafts', 'draft'])){
			$this->result_ = [['error'=>'FAIL_STATUS'], false];
			return;
		}
				
		$manager_fio = '';
		$main_counterparty_id = '';
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `phone`, CONVERT(AES_DECRYPT(`email`, :aes_key2) USING utf8mb4) AS `email`, `status`, CONVERT(AES_DECRYPT(`fio`, :aes_key3) USING utf8mb4) AS `fio`, `expires_token`, CONVERT(AES_DECRYPT(`manager_fio`, :aes_key4) USING utf8mb4) AS `manager_fio`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'aes_key3' => $this->aes_key[0], 'aes_key4' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
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
		
		$orders_data = parent::get_orders($main_counterparty_id, 1, 12, $order_date1, $order_date2, $status);
		$popular_statuses_data = parent::get_popular_statuses($main_counterparty_id);
		$employees_data = parent::get_employees2($main_counterparty_id);
		$counterparties_data = parent::get_counterparties($main_counterparty_id);
		
		$arr_counterparties_id_name = [];
		if(array_key_exists('data', $counterparties_data)){
			foreach ($counterparties_data['data'] as $c) {
				if($c['counterparty_id'] != ''){
					$arr_counterparties_id_name[$c['counterparty_id']] = $c['fullname'];
				}else if($c['application_id'] != '' && $c['application_id'] != '-'){
					$arr_counterparties_id_name[$c['application_id']] = $c['fullname'];
				}
			}
		}
		
		$shipment_warehouses_data = parent::get_shipment_warehouses();

		$arr_shipment_warehouses_id_name = [];
		if(array_key_exists('data', $shipment_warehouses_data)){
			foreach ($shipment_warehouses_data['data'] as $c) {
				$arr_shipment_warehouses_id_name[$c['СкладИД']] = $c['Наименование'];
			}
		}
		
		$orders_data2 = [];
		$arr = [];
		$pagination_max_page = 0;
		if(array_key_exists('data', $orders_data)){
			
			$pagination_max_page = ($orders_data['pagination_max_page'] < 1 ? 1 : $orders_data['pagination_max_page']);
			
			foreach ($orders_data['data'] as $c) {
				
				$arr2 = [];
				
				foreach ($c as $key => $val) {
					
					if($key == 'responsible_sokrof'){
						$val = $manager_fio;
					}
					
					$arr2[$key] = $val;
					
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
		}
		
		$orders_data2['data'] = $arr;
		$orders_data2['pagination_max_page'] = $pagination_max_page;
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['orders' => $orders_data2, 'popular_statuses' => $popular_statuses_data, 'employees' => $employees_data, 'counterparties' => $counterparties_data, 'shipment_warehouses' => $shipment_warehouses_data], $client_rsa_pubkey);
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		
		$this->result_ = [['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true];
		//$this->result_ = [['response' => ['orders' => $orders_data2, 'popular_statuses' => $popular_statuses_data, 'employees' => $employees_data, 'counterparties' => $counterparties_data, 'shipment_warehouses' => $shipment_warehouses_data]], true];
		
	}

}