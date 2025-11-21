<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerGetCart extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');

		$target = $_GET['target'] ?? '';
		$shipping_warehouse_id = trim(preg_replace('/[^a-f0-9\-]/', '', substr($_GET['shipping_warehouse_id'] ?? '', 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if(!in_array($target, ['product_remains', 'substandard', 'finished_products'])){
			parent::prepare_response(['error'=>'TARGET_IS_INCORRECT']);
		}
	
		if($shipping_warehouse_id == ''){
			parent::prepare_response(['error'=>'SHIPPING_WAREHOUSE_ID_IS_EMPTY_OR_INCORRECT']);
		}
		
		try{

			$result = DB::select('SELECT `expires_token` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				
			}

		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		list($shipping_warehouse_name, $cart_contents, $err) = parent::prepare_cart_contents($user_myid, $target, $shipping_warehouse_id);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		parent::prepare_response(['response' => ['target' => $target, 'shipping_warehouse_name' => $shipping_warehouse_name, 'data' => $cart_contents['data']]], true);
		
	}
	
}
