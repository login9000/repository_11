<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerGetDraftDetails extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$err = parent::validate_get_params('other');
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		$client_rsa_pubkey = htmlspecialchars($_GET['client_rsa_pubkey'], ENT_QUOTES, $this->encoding);
		
		$draft_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['draft_id'] ?? '', 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($draft_id == ''){
			parent::prepare_response(['error'=>'DRAFT_ID_IS_EMPTY_OR_INCORRECT']);
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

		$result = [];
		
		try{
			
			if(!Schema::hasTable('orders_'.$main_counterparty_id)){
				parent::prepare_response(['error'=>'NO_DRAFT_FOUND']);
			}
			
			$result = DB::select('SELECT `counterparty_id`, `shipping_warehouse_id`, `shipping_date`, `is_cash_payment`, `is_shipping`, `goods`, CONVERT(AES_DECRYPT(`goods_non_standard_addition`, :aes_key) USING utf8mb4) AS `goods_non_standard_addition`, CONVERT(AES_DECRYPT(`files_non_standard_addition`, :aes_key2) USING utf8mb4) AS `files_non_standard_addition`, `client_id`, CONVERT(AES_DECRYPT(`comment`, :aes_key3) USING utf8mb4) AS `comment` FROM `orders_'.$main_counterparty_id.'` WHERE `order_id` = :draft_id AND `status` = \'draft\' LIMIT 1', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'aes_key3' => $this->aes_key[0], 'draft_id' => $draft_id]);
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}
		}
		
		if(sizeof($result) == 0){
			parent::prepare_response(['error'=>'NO_DRAFT_FOUND']);
		}
		
		list($draft_details, $commercial_offers, $err) = parent::prepare_result_draft_details($main_counterparty_id, $user_myid, $draft_id, $token, $result);
		
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['draft_details' => ['data' => $draft_details], 'commercial_offers' => ['data' => $commercial_offers]], $client_rsa_pubkey);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true);
		// parent::prepare_response(['response' => ['draft_details' => ['data' => $draft_details], 'commercial_offers' => ['data' => $commercial_offers]]], true);
		
	}
	
}
