<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerMarkNotificationAsRead extends Common{
	
	public function __invoke(Request $request){
		
		parent::check_allowed_method('PUT');
		
		$id = ($request->input('id') ?? '');
		$id = trim(preg_replace('/[^0-9]/', '', mb_substr($id, 0, 10)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($id == ''){
			parent::prepare_response(['error'=>'ID_IS_EMPTY_OR_INCORRECT']);
		}
		if($id == '1'){
			parent::prepare_response(['error'=>'ID_IS_INCORRECT']);
		}
		
		$id = (int) $id;
		
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
			
			DB::beginTransaction();
				
				DB::select('SELECT `id` FROM `notifications_'.$user_myid.'` WHERE `id` = :id LIMIT 1 FOR UPDATE', ['id' => $id]);
			
				$result = DB::select('SELECT `number_unread_notifications` FROM `notifications_'.$user_myid.'` WHERE `id` = 1 LIMIT 1 FOR UPDATE');
				foreach ($result as $row) {
					if($row->number_unread_notifications > 0){
						DB::update('UPDATE `notifications_'.$user_myid.'` SET `number_unread_notifications` = (`number_unread_notifications` - 1) WHERE `id` = 1 LIMIT 1');
					}
				}			
				
				DB::update('UPDATE `notifications_'.$user_myid.'` SET `is_unread` = \'\' WHERE `id` = :id LIMIT 1', ['id' => $id]);
			
			DB::commit();

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
