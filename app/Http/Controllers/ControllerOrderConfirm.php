<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerOrderConfirm extends Common{
	
	public function __invoke(Request $request){
		
		parent::check_allowed_method('PUT');
		
		$order_id = ($request->input('order_id') ?? '');
		$order_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($order_id, 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}

		if($order_id == ''){
			parent::prepare_response(['error'=>'ORDER_ID_IS_EMPTY_OR_INCORRECT']);
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
		
		try{
			
			if(!Schema::hasTable('orders_'.$main_counterparty_id)){
				// вот этот говнокод пришлось написать потому что наш фронтендер - ленивая задница	
				parent::prepare_response(['error'=>'Не удалось найти таблицу с данными заказов ('.$main_counterparty_id.')']);
				//
			}
			
			$result = DB::select('SELECT `status` FROM `orders_'.$main_counterparty_id.'` WHERE `order_id` = :order_id LIMIT 1', ['order_id' => $order_id]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_ORDERS_FOUND']);
			}
			
			foreach ($result as $row) {
				if($row->status != 'needs_confirmation'){
					parent::prepare_response(['error'=>'STATUS_MUST_HAVE_"NEEDS_CONFIRMATION"_VALUE']);
				}
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}else{
				parent::prepare_response(['error'=>'NO_ORDERS_FOUND']);
			}
		}
		
		list($result, $err) = parent::post_request_to_api_1c('order_confirm', ['order_id' => $order_id, 'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}
		
		try{
			
			DB::beginTransaction();

				# блокируем всю таблицу в рамках транзакции
				DB::select('SELECT COUNT(`id`) FROM `orders_'.$main_counterparty_id.'` FOR UPDATE');
				
				$result = DB::select('SELECT `ids_row_update` FROM `orders_'.$main_counterparty_id.'` WHERE `id` = 1 LIMIT 1');
				$ids_row_update = '';
				
				foreach ($result as $row) {
					$ids_row_update = preg_replace('/,?'.$order_id.'/', '', $row->ids_row_update);
				}
				
				$ids_row_update = preg_replace('/^,/', '', $ids_row_update);
				$ids_row_update .= ','.$order_id;
				$ids_row_update = preg_replace('/^,/', '', $ids_row_update);
				
				DB::update('UPDATE `orders_'.$main_counterparty_id.'` SET `status` = \'in_work\' WHERE `order_id` = :order_id LIMIT 1', ['order_id' => $order_id]);
				
				$popular_statuses = parent::get_data_from_popular_statuses($main_counterparty_id);
				
				DB::update('UPDATE `orders_'.$main_counterparty_id.'` SET `ids_row_update` = :ids_row_update, `popular_statuses` = :popular_statuses WHERE `id` = 1 LIMIT 1', ['ids_row_update' => $ids_row_update, 'popular_statuses' => $popular_statuses]);
			
			DB::commit();
			
		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}else{
				parent::prepare_response(['error'=>'NO_ORDERS_FOUND']);
			}
			
		}
		
		parent::prepare_response(['response' => 'ok']);
		
	}
	
}
