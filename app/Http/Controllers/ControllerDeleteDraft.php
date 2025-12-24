<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerDeleteDraft extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('DELETE');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$ids = trim(preg_replace('/[^a-f0-9\-,]/', '', $_GET['ids'] ?? ''));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($ids == ''){
			parent::prepare_response(['error'=>'IDS_IS_EMPTY_OR_INCORRECT']);
		}
		
		$ex = explode(',', $ids);
		$si = sizeof($ex);
		$number_ids = 0;
		$ids_ = '';
		if($si > 100){
			parent::prepare_response(['error'=>'TOO_MANY_IDS_SELECTED']);
		}
		for($i = 0; $i < $si; $i++){
			if(!preg_match('/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/', $ex[$i])){
				parent::prepare_response(['error'=>'FAIL_IDS']);
			}
			$ids_ .= '"'.$ex[$i].'",';
			$number_ids++;
		}
		$ids_ = preg_replace('/,$/', '', $ids_);
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
				$main_counterparty_id = $row->main_counterparty_id;
				
			}	
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		try{
			
			if(!Schema::hasTable('orders_'.$main_counterparty_id)){
				parent::prepare_response(['response' => 'ok']);
			}
			
			DB::beginTransaction();
				
				# блокируем всю таблицу в рамках транзакции
				DB::select('SELECT COUNT(`id`) FROM `orders_'.$main_counterparty_id.'` FOR UPDATE');
				
				DB::delete('DELETE FROM `orders_'.$main_counterparty_id.'` WHERE `status` = \'draft\' AND `order_id` IN ('.$ids_.')');
				
				$popular_statuses = parent::get_data_from_popular_statuses($main_counterparty_id);
				
				DB::update('UPDATE `orders_'.$main_counterparty_id.'` SET `popular_statuses` = :popular_statuses WHERE `id` = 1 LIMIT 1', ['popular_statuses' => $popular_statuses]);
			
			DB::commit();
			
			if(Schema::hasTable('commercial_offers_'.$user_myid)){
				DB::delete('DELETE FROM `commercial_offers_'.$user_myid.'` WHERE `draft_id` IN ('.$ids_.')');
			}
			
		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}
			
		}
		
		parent::prepare_response(['response' => 'ok']);
		
	}
	
}
