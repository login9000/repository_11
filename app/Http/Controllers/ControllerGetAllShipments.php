<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerGetAllShipments extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$err = parent::validate_get_params('other');
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		$client_rsa_pubkey = htmlspecialchars($_GET['client_rsa_pubkey'], ENT_QUOTES, $this->encoding);
		
		$page = trim(preg_replace('/[^0-9]/', '', substr($_GET['page'] ?? '', 0, 10)));
		$planned_dates = trim(preg_replace('/[^0-9\-:T ]/', '', $_GET['planned_dates'] ?? ''));
		$statuses = trim(preg_replace('/[^a-z0-9_,]/', '', $_GET['statuses'] ?? ''));
		$shipment_type = trim(preg_replace('/[^a-z0-9]/', '', $_GET['shipment_type'] ?? ''));	
		$responsible_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['responsible_id'] ?? '', 0, 36)));
		$counterparty_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['counterparty_id'] ?? '', 0, 36)));
		$shipping_warehouse_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['shipping_warehouse_id'] ?? '', 0, 36)));
		$responsible_sokrof_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['responsible_sokrof_id'] ?? '', 0, 36)));
		$sort = trim(preg_replace('/[^a-z_]/', '', $_GET['sort'] ?? ''));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if( $page == ''){
			parent::prepare_response(['error'=>'PAGE_IS_EMPTY_OR_INCORRECT']);
		}
		
		$page = (int) $page;
		
		if($planned_dates != ''){
			if(!preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} [0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/', $planned_dates)){
				parent::prepare_response(['error'=>'FAIL_PLANNED_DATES']);
			}
			$ex = explode(' ', $planned_dates);
			$planned_date1 = $ex[0];
			$planned_date2 = $ex[1];
			if(date('U', strtotime($planned_date1)) > date('U', strtotime($planned_date2))){
				parent::prepare_response(['error'=>'DATE_RANGE_IS_INVALID_FIRST_DATE_MUST_NOT_BE_GREATER_THAN_SECOND']);
			}
			### плюс 1 месяц в перед 
			$tmsmp = date('U', strtotime($planned_date2)) + 2678400;
			$planned_date2 = gmdate('Y-m-d\TH:i:s', $tmsmp);
			###
		}else{
			$planned_date1 = '';
			$planned_date2 = '';
		}

		if($statuses != ''){
			$ex = explode(',', $statuses);
			$si = sizeof($ex);
			if($si > 10){
				parent::prepare_response(['error'=>'FAIL_STATUSES']);
			}
			for($i = 0; $i < $si; $i++){
				if(!in_array($ex[$i], ['in_processing', 'processed', 'canceled'])){
					parent::prepare_response(['error'=>'FAIL_STATUSES']);
				}
			}
		}
		
		if($shipment_type != '' && !in_array($shipment_type, ['delivery', 'pickup'])){
			parent::prepare_response(['error'=>'FAIL_SHIPMENT_TYPE']);
		}
		
		if(!in_array($sort, ['shipping_date_is_earlier', 'shipping_date_later'])){
			parent::prepare_response(['error'=>'FAIL_SORT']);
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
		
		$shipments_data = parent::get_shipments($main_counterparty_id, $page, 12, $planned_date1, $planned_date2, $statuses, $shipment_type, $responsible_id, $counterparty_id, $shipping_warehouse_id, $responsible_sokrof_id, $sort);
		
		if(array_key_exists('error', $shipments_data)){
			parent::prepare_response(['error'=>$shipments_data['error']]);
		}

		$delivery_addresses_data = parent::get_delivery_addresses($token);
		
		if(array_key_exists('error', $delivery_addresses_data)){
			parent::prepare_response(['error'=>$delivery_addresses_data['error']]);
		}

		$arr_delivery_addresses_id_addres = [];
		foreach ($delivery_addresses_data['data'] as $c) {
			$arr_delivery_addresses_id_addres[$c['АдресДоставкиИД']] = $c['АдресДоставки'];
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
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2($shipments_data2, $client_rsa_pubkey);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true);
		// parent::prepare_response(['response' => $shipments_data2], true);
		
	}
	
}
