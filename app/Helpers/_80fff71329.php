<?php

namespace App\Helpers\_80fff71329;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class _80fff71329 extends Common {
	
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
		$manager_fio = '';
		$main_counterparty_id = '';
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token`, CONVERT(AES_DECRYPT(`manager_fio`, :aes_key2) USING utf8mb4) AS `manager_fio`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
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
		
		$news_data = parent::get_news(1, 3);
		$orders_data = parent::get_orders($main_counterparty_id, 1, 5);

		$shipments_data = parent::get_shipments($main_counterparty_id, 1, 5);
		
		$shipment_warehouses_data = parent::get_shipment_warehouses();

		$arr_shipment_warehouses_id_name = [];
		if(array_key_exists('data', $shipment_warehouses_data)){
			foreach ($shipment_warehouses_data['data'] as $c) {
				$arr_shipment_warehouses_id_name[$c['СкладИД']] = $c['Наименование'];
			}
		}
		
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
		
		$delivery_addresses_data = parent::get_delivery_addresses($token);
		
		$arr_delivery_addresses_id_addres = [];
		if(array_key_exists('data', $delivery_addresses_data)){
			foreach ($delivery_addresses_data['data'] as $c) {
				$arr_delivery_addresses_id_addres[$c['АдресДоставкиИД']] = $c['АдресДоставки'];
			}
		}
		
		$orders_data2 = [];
		$arr = [];
		if(array_key_exists('data', $orders_data)){
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
			
			$orders_data2['data'] = $arr;
			$orders_data2['pagination_max_page'] = ($orders_data['pagination_max_page'] < 1 ? 1 : $orders_data['pagination_max_page']);
		}
	
		$shipments_data2 = [];
		$arr = [];
		if(array_key_exists('data', $shipments_data)){
			foreach ($shipments_data['data'] as $c) {
				
				$arr2 = [];
				
				foreach ($c as $key => $val) {
				
					if($key == 'responsible_sokrof'){
						$val = $manager_fio;
					}
				
					$arr2[$key] = $val;
					
					if($key == 'delivery_address_id'){
						
						$arr2['delivery_address_name'] = '';
						if(array_key_exists($val, $arr_delivery_addresses_id_addres)){
							$arr2['delivery_address_name'] = $arr_delivery_addresses_id_addres[$val];
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
		}
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['news' => $news_data, 'orders' => $orders_data2, 'shipments' => $shipments_data2], $client_rsa_pubkey);
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		
		$this->result_ = [['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true];
		//$this->result_ = [['response' => ['news' => $news_data, 'orders' => $orders_data2, 'shipments' => $shipments_data2]], true];
		
	}

}