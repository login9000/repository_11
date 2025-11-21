<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerDeletePhotoForNonStandardAddition extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('DELETE');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$photo = trim(mb_substr(htmlspecialchars($_GET['photo'] ?? '', ENT_QUOTES, $this->encoding), 0, 128));
		
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
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		$allow_photo_expansions_ = implode('|', $this->config_project['allow_photo_expansions']);
		preg_match('/(\/user_files\/([a-z0-9\-]{36})\/photos_for_non_standard_addition\/[0-9]{2}\-[0-9]{2}\-[0-9]{2}__[0-9]{2}\.[0-9]{2}\.[0-9]{4}__[0-9]{10}\.('.$allow_photo_expansions_.'))/', $photo, $matches);
		
		if(!$matches){
			parent::prepare_response(['error'=>'FAIL_PHOTO']);
		}
				
		if(file_exists($this->document_root . $matches[1])){
			@unlink($this->document_root . $matches[1]);
		}
		
		parent::prepare_response(['response' => 'ok']);
		
	}
	
}
