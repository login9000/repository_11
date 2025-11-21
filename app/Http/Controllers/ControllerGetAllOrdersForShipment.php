<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerGetAllOrdersForShipment extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$err = parent::validate_get_params('other');
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		$client_rsa_pubkey = htmlspecialchars($_GET['client_rsa_pubkey'], ENT_QUOTES, $this->encoding);
		
		$shipping_date = trim(preg_replace('/[^0-9\-:T]/', '', substr($_GET['shipping_date'] ?? '', 0, 19)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($shipping_date == '' || date('U', strtotime($shipping_date)) == 0){
			parent::prepare_response(['error'=>'SHIPPING_DATE_IS_EMPTY_OR_INCORRECT']);
		}

		$token = '';
		$manager_fio = '';
		$main_counterparty_id = '';
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token`, CONVERT(AES_DECRYPT(`manager_fio`, :aes_key2) USING utf8mb4) AS `manager_fio`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
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
			parent::prepare_response(['error'=>$err]);
		}
		
		$orders_for_shipment_data = parent::get_orders_for_shipment($shipping_date, $token);
		
		if(array_key_exists('error', $orders_for_shipment_data)){
			parent::prepare_response(['error'=>$orders_for_shipment_data['error']]);
		}
		
		$counterparties_data = parent::get_counterparties($main_counterparty_id);
		
		if(array_key_exists('error', $counterparties_data)){
			parent::prepare_response(['error'=>$counterparties_data['error']]);
		}
		
		$arr_counterparties_id_name = [];
		foreach ($counterparties_data['data'] as $c) {
			if($c['counterparty_id'] != ''){
				$arr_counterparties_id_name[$c['counterparty_id']] = $c['fullname'];
			}else if($c['application_id'] != '' && $c['application_id'] != '-'){
				$arr_counterparties_id_name[$c['application_id']] = $c['fullname'];
			}
		}
		
		$shipment_warehouses_data = parent::get_shipment_warehouses();

		if(array_key_exists('error', $shipment_warehouses_data)){
			parent::prepare_response(['error'=>$shipment_warehouses_data['error']]);
		}
		
		$arr_shipment_warehouses_id_name = [];
		foreach ($shipment_warehouses_data['data'] as $c) {
			$arr_shipment_warehouses_id_name[$c['СкладИД']] = $c['Наименование'];
		}
			
		$orders_for_shipment_data2 = [];
		$arr = [];
		$user_ids = '';
		$arr_users_data_id_fio = [];
		
		foreach ($orders_for_shipment_data['data'] as $c) {
			foreach ($c as $key => $val) {
				if($key == 'ПользовательИД'){
					if(strpos($user_ids, $val) === false){
						$user_ids .= '"'.$val.'",';
					}
				}
			}
		}
		$user_ids = preg_replace('/,$/', '', $user_ids);
		
		if($user_ids){
			
			try{
				$users_data = DB::select('SELECT `user_myid`, CONVERT(AES_DECRYPT(`fio`, :aes_key) USING utf8mb4) AS `fio` FROM `users` WHERE `user_myid` IN ('.$user_ids.')', ['aes_key' => $this->aes_key[0], ]);
			} catch (QueryException $e) {
				$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}
			
			$arr_users_data_id_fio = [];
			foreach ($users_data as $c) {
				if($c->fio != ''){
					preg_match('/([^ ]+) ([^ ]+) ([^ ]+)/', $c->fio, $matches);
					if($matches){
						$fio = mb_strtoupper(mb_substr($matches[2], 0, 1)) . '. ' . mb_strtoupper(mb_substr($matches[1], 0, 1)) . mb_strtolower(mb_substr($matches[1], 1, 255));
					}else{
						$fio = '';
					}
				}else{
					$fio = '';
				}
				$arr_users_data_id_fio[$c->user_myid] = $fio;
			}
			
		}
		
		foreach ($orders_for_shipment_data['data'] as $c) {
			
			$arr2 = [];
			
			foreach ($c as $key => $val) {
				
				$arr2[$key] = $val;
				
				if($key == 'КонтрагентИД'){
					
					$arr2['КонтрагентИмя'] = '';
					if(array_key_exists($val, $arr_counterparties_id_name)){
						$arr2['КонтрагентИмя'] = $arr_counterparties_id_name[$val];
					}
					
				}
				
				if($key == 'ПользовательИД'){
					
					$arr2['ПользовательФИО'] = '';
					if(array_key_exists($val, $arr_users_data_id_fio)){
						$arr2['ПользовательФИО'] = $arr_users_data_id_fio[$val];
					}
					
				}
				
				if($key == 'Дата' || $key == 'ДатаОтгрузки' || $key == 'ДатаПереноса'){
					$arr2[$key] = str_replace('01 янв 0001', '', parent::convert_format_date2($val));
				}
				
				if($key == 'СкладОтгрузкиИД'){
					
					$arr2['СкладОтгрузкиИмя'] = '';
					if(array_key_exists($val, $arr_shipment_warehouses_id_name)){
						$arr2['СкладОтгрузкиИмя'] = $arr_shipment_warehouses_id_name[$val];
					}
					
				}
				
			}
			
			$arr2['Sokrof'] = $manager_fio;
			
			$arr[] = $arr2;
			
		}
		
		$orders_for_shipment_data2['data'] = $arr;
		$orders_for_shipment_data2['pagination_max_page'] = ($orders_for_shipment_data['pagination_max_page'] < 1 ? 1 : $orders_for_shipment_data['pagination_max_page']);
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['orders_for_shipment' => $orders_for_shipment_data2], $client_rsa_pubkey);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true);
		// parent::prepare_response(['response' => ['orders_for_shipment' => $orders_for_shipment_data2]], true);
		
	}
	
}
