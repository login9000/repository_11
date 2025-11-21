<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerLogout extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('PUT');
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		try{
			DB::update('UPDATE `users` SET `token` = AES_ENCRYPT(:token, :aes_key), `expires_token` = 0 WHERE `user_myid` = :user_myid LIMIT 1', ['token' => '', 'aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => 'ok']);
		
	}
	
}
