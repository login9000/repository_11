<?php

namespace App\Helpers\_baa7a52965;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class _baa7a52965 extends Common {
	
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
		
		$news_data = parent::get_new_news();
		$popular_statuses_data = parent::get_popular_statuses($main_counterparty_id);
		$update_orders_data = parent::get_update_orders($main_counterparty_id);
		$update_shipments_data = parent::get_update_shipments($main_counterparty_id);
		$update_counterparties_data = parent::get_update_counterparties($main_counterparty_id);
		$new_notifications = parent::get_new_notifications();
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
		if(array_key_exists('data', $new_notifications)){
			foreach ($new_notifications['data'] as $c) {
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
		
		$arr_certain_orders_id_data = [];
		if(array_key_exists('data', $certain_orders_data)){
			foreach ($certain_orders_data['data'] as $c) {
				$arr_certain_orders_id_data[$c['order_id']] = [
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
		$number_unread = 0;
		if(array_key_exists('data', $new_notifications)){
			$number_unread = $new_notifications['number_unread'];
			foreach ($new_notifications['data'] as $c) {
				
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
						
						if(array_key_exists($val, $arr_certain_orders_id_data)){
								$arr2['date_create_order'] = $arr_certain_orders_id_data[$val]['date_create_order'];
								$arr2['order_number'] = $arr_certain_orders_id_data[$val]['order_number'];
								$arr2['sum'] = $arr_certain_orders_id_data[$val]['sum'];
								$arr2['shipping_date'] = $arr_certain_orders_id_data[$val]['shipping_date'];
								$arr2['delivery_city'] = $arr_certain_orders_id_data[$val]['delivery_city'];
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
		$notifications_data2['number_unread'] = $number_unread;
		
		$product_catalog_time_modify = @filemtime($this->document_root.'/../public/product_catalog.json');
		$is_password_changed_from_1c = false;
		
		$result = DB::select('SELECT `password_changed_from_1c` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
		
		foreach ($result as $row) {
			if ($row->password_changed_from_1c) {
				$is_password_changed_from_1c = true;
			}
		}	
		
		$this->result_ = [['response' => ['news' => $news_data, 'popular_statuses' => $popular_statuses_data, 'update_orders' => $update_orders_data, 'update_shipments' => $update_shipments_data, 'notifications' => $notifications_data2, 'update_counterparties' => $update_counterparties_data, 'product_catalog_time_modify' => $product_catalog_time_modify, 'is_password_changed_from_1c'  => $is_password_changed_from_1c]], true];
		
	}

}