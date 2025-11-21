<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerGetAllOrders extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$err = parent::validate_get_params('other');
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		$client_rsa_pubkey = htmlspecialchars($_GET['client_rsa_pubkey'], ENT_QUOTES, $this->encoding);
		
		$page = trim(preg_replace('/[^0-9]/', '', substr($_GET['page'] ?? '', 0, 10)));
		$order_dates = trim(preg_replace('/[^0-9\-:T ]/', '', $_GET['order_dates'] ?? ''));
		$statuses = trim(preg_replace('/[^a-z0-9_,]/', '', $_GET['statuses'] ?? ''));
		$responsible_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['responsible_id'] ?? '', 0, 36)));
		$counterparty_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['counterparty_id'] ?? '', 0, 36)));
		$payment = trim(preg_replace('/[^a-z_]/', '', $_GET['payment'] ?? ''));
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
		
		if($order_dates != ''){
			if(!preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} [0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/', $order_dates)){
				parent::prepare_response(['error'=>'FAIL_ORDER_DATES']);
			}
			$ex = explode(' ', $order_dates);
			$order_date1 = $ex[0];
			$order_date2 = preg_replace('/[0-9]{2}:[0-9]{2}:[0-9]{2}$/', date('H:i:s'), $ex[1]);
			if(date('U', strtotime($order_date1)) > date('U', strtotime($order_date2))){
				parent::prepare_response(['error'=>'DATE_RANGE_IS_INVALID_FIRST_DATE_MUST_NOT_BE_GREATER_THAN_SECOND']);
			}
		}else{
			$order_date1 = '';
			$order_date2 = '';
		}
		
		if($statuses != ''){
			if(strpos($statuses, 'except_completed') !== false){
				$statuses = 'in_processing,needs_confirmation,in_work,ready_for_shipment,shipped,in_shipment';
			}
			$ex = explode(',', $statuses);
			$si = sizeof($ex);
			if($si > 30){
				parent::prepare_response(['error'=>'FAIL_STATUSES']);
			}
			for($i = 0; $i < $si; $i++){
				if(!in_array($ex[$i], ['in_processing', 'needs_confirmation', 'in_work', 'ready_for_shipment', 'shipped', 'in_shipment', 'canceled', 'draft'])){
					parent::prepare_response(['error'=>'FAIL_STATUSES']);
				}
			}
		}
		
		if($payment != '' && !in_array($payment, ['prepayment', 'cash_on_delivery'])){
			parent::prepare_response(['error'=>'FAIL_PAYMENT']);
		}
		
		if(!in_array($sort, ['order_date_new_first', 'order_date_old_first', 'shipping_date_is_earlier', 'shipping_date_later'])){
			parent::prepare_response(['error'=>'FAIL_SORT']);
		}
		
		$manager_fio = '';
		$main_counterparty_id = '';
		
		try{

			$result = DB::select('SELECT `expires_token`, CONVERT(AES_DECRYPT(`manager_fio`, :aes_key) USING utf8mb4) AS `manager_fio`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				
				preg_match('/([^ ]+) ([^ ]+) ([^ ]+)/', $row->manager_fio, $matches);
				if($matches){
					$manager_fio = mb_strtoupper(mb_substr($matches[2], 0, 1)) . '. ' . mb_strtoupper(mb_substr($matches[1], 0, 1)) . mb_strtolower(mb_substr($matches[1], 1, 255));
				}else{
					$manager_fio = '';
				}
				$main_counterparty_id = $row->main_counterparty_id;
				
			}

		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		$orders_data = parent::get_orders($main_counterparty_id, $page, 12, $order_date1, $order_date2, $statuses, $responsible_id, $counterparty_id, $payment, $shipping_warehouse_id, $responsible_sokrof_id, $sort);
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
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2($orders_data2, $client_rsa_pubkey);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true);
		// parent::prepare_response(['response' => $orders_data2], true);
		
	}
	
}
