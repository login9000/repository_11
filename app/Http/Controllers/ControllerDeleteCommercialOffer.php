<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerDeleteCommercialOffer extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('DELETE');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$commercial_offer_id = trim(preg_replace('/[^a-f0-9\-]/', '', substr($_GET['commercial_offer_id'] ?? '', 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($commercial_offer_id == ''){
			parent::prepare_response(['error'=>'COMMERCIAL_OFFER_ID_IS_EMPTY_OR_INCORRECT']);
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
		
		try{
			DB::delete('DELETE FROM `commercial_offers_'.$user_myid.'` WHERE `commercial_offer_id` = :commercial_offer_id LIMIT 1', ['commercial_offer_id' => $commercial_offer_id]);
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}
		}
		
		parent::prepare_response(['response' => 'ok']);
		
	}
	
}
