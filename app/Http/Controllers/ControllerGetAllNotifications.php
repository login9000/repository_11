<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerGetAllNotifications extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$err = parent::validate_get_params('other');
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		$client_rsa_pubkey = htmlspecialchars($_GET['client_rsa_pubkey'], ENT_QUOTES, $this->encoding);
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		$token = '';
		$main_counterparty_id = '';
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				$token = $row->token;
				$main_counterparty_id = $row->main_counterparty_id;
				
			}

		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		$notifications_data = parent::get_all_notifications();
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
		
		$orders_ids_ = '';
		if(array_key_exists('data', $notifications_data)){
			foreach ($notifications_data['data'] as $c) {
				foreach ($c as $key => $val) {
					if($key == 'document_id'){
						$orders_ids_ .= '"'.$val.'",';
						break;
					}
				}
			}
		}
		$orders_ids_ = preg_replace('/,$/', '', $orders_ids_);
		
		$certain_orders_data = parent::get_certain_orders($main_counterparty_id, $orders_ids_, $token);
		
		$arr_certain_orders_data_id_data = [];
		if(array_key_exists('data', $certain_orders_data)){
			foreach ($certain_orders_data['data'] as $c) {
				$arr_certain_orders_data_id_data[$c['order_id']] = [
					'date_create_order' => $c['date_create_order'],
					'order_number' => $c['order_number'],
					'sum' => (float) $c['sum'],
					'shipping_date' => $c['shipping_date'],
					'delivery_city' => $c['delivery_city']
				];
			}
		}
		
		$notifications_data2 = [];
		$arr = [];
		$pagination_max_page = 1;
		if(array_key_exists('data', $notifications_data)){
			
			$pagination_max_page = ($notifications_data['pagination_max_page'] < 1 ? 1 : $notifications_data['pagination_max_page']);
			
			foreach ($notifications_data['data'] as $c) {
				
				$arr2 = [];

				foreach ($c as $key => $val) {
					
					$arr2[$key] = $val;
					
					if($key == 'document_id'){
						
						$arr2['order_id'] = $val;
						$arr2['date_create_order'] = '';
						$arr2['order_number'] = '';
						$arr2['sum'] = 0;
						$arr2['shipping_date'] = '';
						$arr2['delivery_city'] = '';
						unset($arr2[$key]);
						
						if(array_key_exists($val, $arr_certain_orders_data_id_data)){
							$arr2['date_create_order'] = $arr_certain_orders_data_id_data[$val]['date_create_order'];
							$arr2['order_number'] = $arr_certain_orders_data_id_data[$val]['order_number'];
							$arr2['sum'] = $arr_certain_orders_data_id_data[$val]['sum'];
							$arr2['shipping_date'] = $arr_certain_orders_data_id_data[$val]['shipping_date'];
							$arr2['delivery_city'] = $arr_certain_orders_data_id_data[$val]['delivery_city'];
						}
						
					}
					
					if($key == 'counterparty_id'){
						
						$arr2['counterparty_name'] = '';
						if(array_key_exists($val, $arr_counterparties_id_name)){
							$arr2['counterparty_name'] = $arr_counterparties_id_name[$val];
						}
						
					}
					
				}
				
				$arr[] = $arr2;
				
			}
		}

		$notifications_data2['data'] = $arr;
		$notifications_data2['pagination_max_page'] = $pagination_max_page;
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2($notifications_data2, $client_rsa_pubkey);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true);
		// parent::prepare_response(['response' => $notifications_data2], true);
		
	}
	
}
