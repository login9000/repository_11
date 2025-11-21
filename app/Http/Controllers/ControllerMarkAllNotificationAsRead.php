<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerMarkAllNotificationAsRead extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('PUT');
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
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
			
			DB::beginTransaction();
				# блокируем всю таблицу в рамках транзакции
				DB::select('SELECT COUNT(`id`) FROM `notifications_'.$user_myid.'` FOR UPDATE');
				DB::update('UPDATE `notifications_'.$user_myid.'` SET `number_unread_notifications` = 0 WHERE `id` = 1 LIMIT 1');
				DB::update('UPDATE `notifications_'.$user_myid.'` SET `is_unread` = \'\' WHERE `is_unread` = \'1\'');
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
