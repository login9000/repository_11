<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerMarkAllNewsAsRead extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('PUT');
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		$user_id = '';
		$number_of_unread_news = 0;
		
		try{

			$result = DB::select('SELECT `id`, `expires_token`, `number_of_unread_news` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				$user_id = (string) $row->id;
				$number_of_unread_news = $row->number_of_unread_news;
				
			}
			
			if($number_of_unread_news > 0){
				DB::update('UPDATE `users` SET `number_of_unread_news` = 0 WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			}
			
			DB::update('UPDATE `news` SET `user_ids_is_read` = CONCAT(`user_ids_is_read`, :user_id) WHERE NOT `user_ids_is_read` LIKE \'%'.$user_id.' %\'', ['user_id' => $user_id.' ']);			
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => 'ok']);
		
	}
	
}
