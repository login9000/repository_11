<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerGetSubstandard extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$shipping_warehouse_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['shipping_warehouse_id'] ?? '', 0, 36)));
		$products = trim(mb_substr(htmlspecialchars($_GET['products'] ?? '', ENT_QUOTES, $this->encoding), 0, 128));
		$profile = trim(mb_substr(htmlspecialchars($_GET['profile'] ?? '', ENT_QUOTES, $this->encoding), 0, 128));
		$thickness = trim(mb_substr(htmlspecialchars($_GET['thickness'] ?? '', ENT_QUOTES, $this->encoding), 0, 128));
		$coating = trim(mb_substr(htmlspecialchars($_GET['coating'] ?? '', ENT_QUOTES, $this->encoding), 0, 128));
		$color = trim(mb_substr(htmlspecialchars($_GET['color'] ?? '', ENT_QUOTES, $this->encoding), 0, 128));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($shipping_warehouse_id == ''){
			parent::prepare_response(['error'=>'SHIPPING_WAREHOUSE_NOT_SELECTED']);
		}
		$main_counterparty_id = '';
		
		try{

			$result = DB::select('SELECT `expires_token`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			
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
		
		list($substandard, $err) = parent::prepare_result_substandard_catalog($main_counterparty_id, $shipping_warehouse_id, $products, $profile, $thickness, $coating, $color);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		unset($substandard['actual_date']);
		
		parent::prepare_response(['response' => $substandard], true);
		
	}
	
}
