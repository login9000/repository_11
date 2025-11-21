<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerUpdateEmail extends Common{
	
	public function __invoke(Request $request){
		
		parent::check_allowed_method('PUT');
		
		$err = parent::validate_fields('other', $request);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}		
		
		list($data, $err) = parent::handler_data_crypt($request);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}

		$act = ($data['act'] ?? '');
		$email = ($data['email'] ?? '');
		$code = ($data['code'] ?? '');
		$client_rsa_pubkey = $data['client_rsa_pubkey'];

		// $act = ($request->input('act') ?? '');
		// $email = ($request->input('email') ?? '');
		// $code = ($request->input('code') ?? '');
		
		$act = trim(preg_replace('/[^0-9]/', '', $act));
		$code = trim(preg_replace('/[^0-9]/', '', mb_substr($code, 0, 4)));
		$email = trim(mb_substr(htmlspecialchars($email, ENT_QUOTES, $this->encoding), 0, 100));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}

		if(!in_array($act, [1, 2])){
			parent::prepare_response(['error'=>'FAIL_ACT']);
		}
		
		$token = '';
		$fio = '';
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`fio`, :aes_key) USING utf8mb4) AS `fio`, CONVERT(AES_DECRYPT(`token`, :aes_key2) USING utf8mb4) AS `token`, `expires_token`, `timestamp_update_email` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				
				$token = $row->token;
				$fio = $row->fio;
				
				if($act == 1 && $this->time - $row->timestamp_update_email < 120){
					parent::prepare_response(['error'=>'UPDATE_EMAIL_IS_EARLY', 'seconds_left' => (120 - ($this->time - $row->timestamp_update_email))]);
				}
				
			}			
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		switch($act){
			
			case 1:
				
				if($email == ''){
					parent::prepare_response(['error'=>'EMAIL_IS_EMPTY_OR_INCORRECT']);
				}
				
				if(!preg_match('/^.+@.+\..+$/i', $email)){
					parent::prepare_response(['error'=>'FAIL_EMAIL']);
				}
				
				$verify_code = (string) mt_rand(1000, 9900);

				$host = $this->config_project['host_name'] != '' ? $this->config_project['host_name'] : $_SERVER['SERVER_ADDR'];
				$subject = 'Смена email в личном кабинете Sokrof';
				$message = 'Здравствуйте '.$fio.'.<br>Вот ваш код для подтверждения нового email - <b>'.$verify_code.'</b><br>Код будет активен только 24 часа.<br><br><div align="center" style="color:#736749;font-size:9pt;">Вы получили это письмо, потому что зарегистрировались на портале sokrof.com.<br>Пожалуйста, не отвечайте на это сообщение, оно было сгенерировано автоматически.<br>Сообщения, отправленные на этот адрес, не будут обработаны.<br><img src="http://'.$host.'/img/sokrof_logo.png"></div>';
				$email_from = 'no-reply@sokrof.com';
				$service_from = 'Sokrof';
				if(preg_replace('/^.+@(.+\..+)$/', '$1', $email) == 'rambler.ru'){
					$service_from = $email_from;
				}
				
				if(!parent::email_sender_service($email, $email_from, $service_from, $subject, $message)){
					parent::prepare_response(['error'=>'FAIL_POST_EMAIL']);
				}
								
				try{
					DB::update('UPDATE `users` SET `email` = AES_ENCRYPT(:email, :aes_key3), `verify_code_email` = :verify_code_email, `timestamp_update_email` = :timestamp_update_email, `timestamp_live_verify_code_email` = :timestamp_live_verify_code_email WHERE `user_myid` = :user_myid LIMIT 1', ['email' => $email, 'aes_key3' => $this->aes_key[0], 'verify_code_email' => $verify_code, 'timestamp_update_email' => $this->time, 'timestamp_live_verify_code_email' => $this->time, 'user_myid' => $user_myid]);
				} catch (QueryException $e) {
					$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
					parent::log_er_mysql($err);
					parent::prepare_response(['error'=>$err]);
				}
				
				break;
				
			case 2:
				
				$email = '';
				
				if($code == ''){
					parent::prepare_response(['error'=>'CODE_IS_EMPTY_OR_INCORRECT']);
				}
				
				if(!preg_match('/^[0-9]{4}$/', $code)){
					parent::prepare_response(['error'=>'FAIL_CODE']);
				}
				
				try{
					
					$result = DB::select('SELECT CONVERT(AES_DECRYPT(`email`, :aes_key) USING utf8mb4) AS `email`, `verify_code_email`, `timestamp_live_verify_code_email` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
					
					if(sizeof($result) == 0){
						parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
					}
			
					foreach ($result as $row) {
						
						$email = $row->email;
						if($row->verify_code_email != $code){
							parent::prepare_response(['error'=>'THE_CODE_IS_NOT_CORRECT']);
						}
						if($this->time - $row->timestamp_live_verify_code_email > 86400){
							parent::prepare_response(['error'=>'THE_VERIFICATION_CODE_HAS_EXPIRED']);
						}
						DB::update('UPDATE `users` SET `verify_code_email` = \'\' WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
						
					}
					
				} catch (QueryException $e) {
					$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
					parent::log_er_mysql($err);
					parent::prepare_response(['error'=>$err]);
				}
				
				list($result, $err) = parent::post_request_to_api_1c('update_email', ['email' => $email, 'token' => $token]);
				if($err){
					parent::prepare_response(['error'=>$err], true);
				}
				
				if(array_key_exists('Ошибка', $result)){
					parent::prepare_response(['error'=>$result['Ошибка']], true);
				}
				
				break;
				
		}
		
		switch($act){
			
			case 1:
				list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['seconds_left' => 120], $client_rsa_pubkey);
				if($err){
					parent::prepare_response(['error'=>$err]);
				}
				parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]]);
				//parent::prepare_response(['response' => ['seconds_left' => 120]]);
				break;
				
			case 2:
				list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['email' => $email], $client_rsa_pubkey);
				if($err){
					parent::prepare_response(['error'=>$err]);
				}
				parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]]);
				//parent::prepare_response(['response' => ['email' => $email]]);
				break;
				
		}
		
	}
	
}
