<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerPostMessForManager extends Common{
	
	public function __invoke(Request $request){
		
		parent::check_allowed_method('POST');
		
		$err = parent::validate_fields('other', $request);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}		
		
		list($data, $err) = parent::handler_data_crypt($request);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}

		$subject = ($data['subject'] ?? '');
		$mess = ($data['mess'] ?? '');
		$atach = ($data['atach'] ?? '');

		// $subject = ($request->input('subject') ?? '');
		// $mess = ($request->input('mess') ?? '');
		// $atach = ($request->input('atach') ?? '');
		
		$subject = trim(mb_substr(htmlspecialchars($subject, ENT_QUOTES, $this->encoding), 0, 64));
		$mess = trim(mb_substr(htmlspecialchars($mess, ENT_QUOTES, $this->encoding), 0, 512));
		$atach = trim(htmlspecialchars($atach, ENT_QUOTES, $this->encoding));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
				
		if(preg_replace('/\r?\n| /', '', $mess) == ''){
			parent::prepare_response(['error'=>'MESS_IS_EMPTY_OR_INCORRECT']);
		}
		
		if($subject === ''){
			parent::prepare_response(['error'=>'SUBJECT_IS_EMPTY_OR_INCORRECT']);
		}
		
		$token = '';
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				$token = $row->token;
				
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		if($atach != ''){
			
			preg_match('/(\/user_files\/([a-z0-9\-]{36})\/files_for_manager\/[0-9]{2}\-[0-9]{2}\-[0-9]{2}__[0-9]{2}\.[0-9]{2}\.[0-9]{4}__[0-9]{10}\.('.implode('|', $this->config_project['allow_file_for_manager']).'))/', $atach, $matches);
			
			if(!$matches){
				parent::prepare_response(['error'=>'FAIL_ATACH']);
			}
			
			$atach = $matches[1];
			
			if(!file_exists($this->document_root . $matches[1])){
				parent::prepare_response(['error'=>'NO_EXISTS_ATACH']);
			}
			
		}
		
		list($result, $err) = parent::post_request_to_api_1c('post_mess_for_manager', ['subject' => $subject, 'mess' => $mess, 'atach' => $atach,  'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}
		
		parent::prepare_response(['response'=>'ok']);
		
	}
	
}
