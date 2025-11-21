<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerGetNews extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');

		$id = trim(preg_replace('/[^0-9]/', '', substr($_GET['id'] ?? '', 0, 10)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($id == ''){
			parent::prepare_response(['error'=>'ID_IS_EMPTY_OR_INCORRECT']);
		}
		
		$id = (int) $id;
		$news = [];
		$user_id = '';
		
		try{

			$result = DB::select('SELECT `id`, `expires_token` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				$user_id = (string) $row->id;
				
			}
			
			$result = DB::select('SELECT * FROM `news` WHERE `id` = :id LIMIT 1', ['id' => $id]);
			$user_ids_is_read = '';
			
			foreach ($result as $row) {
				$news = ['id' => $row->id, 'date' => $row->date, 'header' => $row->header, 'text' => $row->text];
				$user_ids_is_read = $row->user_ids_is_read;
			}
			
			if(strpos($user_ids_is_read, $user_id.' ') === false){
			
				DB::update('UPDATE `users` SET `number_of_unread_news` = (`number_of_unread_news` - 1) WHERE (SELECT `id` FROM `users` WHERE `user_myid` = :user_myid1 AND `number_of_unread_news` > 0 LIMIT 1) AND (`user_myid` = :user_myid2) LIMIT 1', ['user_myid1' => $user_myid, 'user_myid2' => $user_myid]);
				DB::update('UPDATE `news` SET `user_ids_is_read` = CONCAT(`user_ids_is_read`, :user_id) WHERE `id` = :id LIMIT 1', ['user_id' => $user_id.' ', 'id' => $id]);

			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => $news], true);
		
	}
	
}
