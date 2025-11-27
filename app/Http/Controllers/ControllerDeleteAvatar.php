<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerDeleteAvatar extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('DELETE');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
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
		
		$dir = $this->document_root.'/user_files/'.$user_myid.'/photo/';
		
		if(is_dir($dir)){
			$files = scandir($dir);
			$len = sizeof($files);
			for($i = 0; $i < $len; $i++){
				if(file_exists($dir . $files[$i])){
					@unlink($dir . $files[$i]);
				}
			}
		}
		
		try{
			
			DB::update('UPDATE `users` SET `photo` = :photo WHERE `user_myid` = :user_myid LIMIT 1', ['photo' => '', 'user_myid' => $user_myid]);
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=> $err]);
		}
		
		parent::prepare_response(['response' => 'ok']);
		
	}
	
}
