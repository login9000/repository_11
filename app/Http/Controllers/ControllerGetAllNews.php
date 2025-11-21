<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerGetAllNews extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');		
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$page = trim(preg_replace('/[^0-9]/', '', substr($_GET['page'] ?? '', 0, 10)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($page == ''){
			parent::prepare_response(['error'=>'PAGE_IS_EMPTY_OR_INCORRECT']);
		}
		
		$page = (int) $page;
		
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
		
		$news_data = parent::get_news($page, 12);
				
		if(array_key_exists('error', $news_data)){
			parent::prepare_response(['error'=>$news_data['error']]);
		}
		
		parent::prepare_response(['response' => $news_data], true);
		
	}
	
}
