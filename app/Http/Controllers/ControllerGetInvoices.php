<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerGetInvoices extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$err = parent::validate_get_params('other');
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		$client_rsa_pubkey = htmlspecialchars($_GET['client_rsa_pubkey'], ENT_QUOTES, $this->encoding);
		
		$invoices_dates = trim(preg_replace('/[^0-9\-:T ]/', '', $_GET['invoices_dates'] ?? ''));
		$shipment_type = trim(preg_replace('/[^a-z]/', '', substr($_GET['shipment_type'] ?? '', 0, 10)));
		$counterparty_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['counterparty_id'] ?? '', 0, 36)));
		$shipping_warehouse_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['shipping_warehouse_id'] ?? '', 0, 36)));
		$sort = trim(preg_replace('/[^a-z_]/', '', $_GET['sort'] ?? ''));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
				
		if(!preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} [0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/', $invoices_dates)){
			parent::prepare_response(['error'=>'FAIL_INVOICES_DATES']);
		}
		$ex = explode(' ', $invoices_dates);
		$invoices_date1 = $ex[0];
		$invoices_date2 = $ex[1];
		if(date('U', strtotime($invoices_date1)) > date('U', strtotime($invoices_date2))){
			parent::prepare_response(['error'=>'DATE_RANGE_IS_INVALID_FIRST_DATE_MUST_NOT_BE_GREATER_THAN_SECOND']);
		}
		### плюс 1 месяц в перед 
		$tmsmp = date('U', strtotime($invoices_date2)) + 2678400;
		$invoices_date2 = gmdate('Y-m-d\TH:i:s', $tmsmp);
		###
			
		if($shipment_type != '' && !in_array($shipment_type, ['pickup', 'delivery'])){
			parent::prepare_response(['error'=>'FAIL_SHIPMENT_TYPE']);
		}
		
		if($shipping_warehouse_id != ''){
			parent::check_shipping_warehouse_id($shipping_warehouse_id);
		}
		
		if(!in_array($sort, ['invoices_date_new_first', 'invoices_date_old_first'])){
			parent::prepare_response(['error'=>'FAIL_SORT']);
		}
		
		$token = '';
		$pagination_max_page = 1;
		$client_fio = '';
		$manager_fio = '';
		$main_counterparty_id = '';
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token`, CONVERT(AES_DECRYPT(`fio`, :aes_key2) USING utf8mb4) AS `fio`, CONVERT(AES_DECRYPT(`manager_fio`, :aes_key3) USING utf8mb4) AS `manager_fio`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'aes_key3' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				$token = $row->token;
				$main_counterparty_id = $row->main_counterparty_id;
				
				preg_match('/([^ ]+) ([^ ]+) ([^ ]+)/', $row->fio, $matches);
				if($matches){
					$client_fio = mb_strtoupper(mb_substr($matches[2], 0, 1)) . '. ' . mb_strtoupper(mb_substr($matches[1], 0, 1)) . mb_strtolower(mb_substr($matches[1], 1, 255));
				}else{
					$client_fio = '';
				}
				
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
		
		if($counterparty_id != ''){
			parent::check_counterparty_id($main_counterparty_id, $counterparty_id);
		}
		
		list($result, $err) = parent::prepare_result_invoices($main_counterparty_id, $invoices_date1, $invoices_date2, $shipment_type, $counterparty_id, $shipping_warehouse_id, $sort, $client_fio, $token);
		
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		$pagination_max_page = ($result['pagination_max_page'] < 1 ? 1 : $result['pagination_max_page']);
		$invoices_data = [];
		
		foreach($result['data'] as $c){
			unset($c['timestamp_invoices']);
			$c['Sokrof'] = $manager_fio;
			$invoices_data[] = $c;
		}
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['data' => $invoices_data, 'pagination_max_page' => $pagination_max_page], $client_rsa_pubkey);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true);
		// parent::prepare_response(['response' => ['data' => $invoices_data, 'pagination_max_page' => $pagination_max_page]], true);
		
	}
	
}
