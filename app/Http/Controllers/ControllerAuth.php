<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerAuth extends Common{
	
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

		$phone = ($data['phone'] ?? '');
		$pass = ($data['pass'] ?? '');
		$client_rsa_pubkey = $data['client_rsa_pubkey'];

		// $phone = ($request->input('phone') ?? '');
		// $pass = ($request->input('pass') ?? '');
		
		$phone = mb_substr(preg_replace('/[^0-9\+]/', '', $phone), 0, 12);
		$phone = trim(mb_substr(preg_replace('/^\+7/', '', $phone), 0, 10));
		$pass = trim(mb_substr(htmlspecialchars($pass, ENT_QUOTES, $this->encoding), 0, 10));
		
		if($phone == ''){
			parent::prepare_response(['error'=>'PHONE_IS_EMPTY_OR_INCORRECT']);
		}
		
		if(!preg_match('/^[0-9]{10}$/', $phone)){
			parent::prepare_response(['error'=>'FAIL_PHONE']);
		}
		
		if(!mb_ereg_match('^.{8,10}$', $pass)){
			parent::prepare_response(['error'=>'PASSWORD_MUST_HAVE_AT_LEAST_8_CHARACTERS']);
		}
		
		if(mb_ereg_replace('[^A-ZА-ЯЁ]', '', $pass) === ''){
			parent::prepare_response(['error'=>'MISSING_UPPER_CASE_CHARACTERS_FOR_PASSWORD']);
		}
		
		if(mb_ereg_replace('[^a-zа-яё]', '', $pass) === ''){
			parent::prepare_response(['error'=>'MISSING_LOWER_CASE_CHARACTERS_FOR_PASSWORD']);
		}
		
		if(mb_ereg_replace('[^0-9]', '', $pass) === ''){
			parent::prepare_response(['error'=>'MISSING_NUMBER_CHARACTERS_FOR_PASSWORD']);
		}
		
		$phone_hash = md5($phone.'phone_hash');
		
		try{

			$result = DB::select('SELECT SQL_CACHE `timestamp_set_ban` FROM `ban_list` WHERE `ip_hash` = :ip_hash LIMIT 1', ['ip_hash' => md5($this->ip.'ip_hash')]);
			
			foreach ($result as $row) {
				if($row->timestamp_set_ban > 0 && $this->time - $row->timestamp_set_ban <= $this->config_project['time_ban_if_fail_auth']){
					parent::prepare_response(['error'=>'BANNED', 'seconds_left' => ($this->config_project['time_ban_if_fail_auth'] - ($this->time - $row->timestamp_set_ban))]);
				}
			}
			
			$result_ = DB::select('SELECT `user_myid`, `hashed_pass`, `is_banned` FROM `users` WHERE `phone_hash` = :phone_hash LIMIT 1', ['phone_hash' => $phone_hash]);
		
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		$user_myid = '';
		$hashed_pass = '';
		$is_banned = '';
		
		if(sizeof($result_) > 0){
			
			foreach ($result_ as $row) {
				
				$user_myid = $row->user_myid;
				$hashed_pass = $row->hashed_pass;
				$is_banned = $row->is_banned;
				
			}
			
			if($is_banned) {
				parent::prepare_response(['error'=>'BANNED_ONLY']);
			}
		
			try{
				
				if($hashed_pass != '' && !Hash::check($pass, $hashed_pass)) {
					parent::control_fail_auth_and_set_ban();
					parent::prepare_response(['error'=>'WRONG_PASSWORD']);
				}
				
			} catch (QueryException $e) {
				$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}
			
		}
		
		list($result, $err) = parent::post_request_to_api_1c('auth', ['login' => $phone, 'pass' => $pass]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		if(sizeof($result_) > 0){
			if(array_key_exists('Ошибка', $result) && $result['Ошибка'] == 'Проверьте правильность ввода логина и пароля'){
				if($hashed_pass == ''){
					try{
						parent::control_fail_auth_and_set_ban();
						parent::prepare_response(['error'=>'WRONG_PASSWORD']);
					} catch (QueryException $e) {
						$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
						parent::log_er_mysql($err);
						parent::prepare_response(['error'=>$err]);
					}
				}
			}
		}

		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']]);
		}
		if(!array_key_exists('Токен', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Токен']);
		}
		if(!array_key_exists('ПользовательИД', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_ПользовательИД']);
		}
		if(!array_key_exists('ДатаОкончанияТокена', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_ДатаОкончанияТокена']);
		}
		
		$date = parent::convert_format_date($this->date);
		$token = substr($result['Токен'], 0, 36);
		$token_hash = md5($token . 'token_hash');
		$user_myid = substr($result['ПользовательИД'], 0, 36);
		$expires_token = date('U', strtotime($result['ДатаОкончанияТокена']));
		$hashed_pass = Hash::make($pass);
		
		list($result, $err) = parent::post_request_to_api_1c('user_info', ['user_myid' => $user_myid, 'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
				
		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}
		if(!array_key_exists('Фамилия', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Фамилия']);
		}
		if(!array_key_exists('Имя', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Имя']);
		}
		if(!array_key_exists('Отчество', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Отчество']);
		}
		if(!array_key_exists('Email', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Email']);
		}
		if(!array_key_exists('Роль', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Роль']);
		}
		if(!array_key_exists('Менеджер', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Менеджер']);
		}
		if(!array_key_exists('ФИО', $result['Менеджер'])){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Менеджер_ФИО']);
		}
		if(!array_key_exists('Email', $result['Менеджер'])){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Менеджер_Email']);
		}
		if(!array_key_exists('МенеджерИД', $result['Менеджер'])){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Менеджер_МенеджерИД']);
		}
		if(!array_key_exists('ГоловнойКонтрагентИД', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_ГоловнойКонтрагентИД']);
		}
		
		$fio = substr($result['Фамилия'] . ' ' . $result['Имя'] . ' ' . $result['Отчество'], 0, 255);
		$email = substr($result['Email'], 0, 255);
		$status = $result['Роль'];
		if(!in_array($status, ['Администратор', 'ОсновнойПрофиль', 'Сотрудник'])){
			parent::prepare_response(['error'=>'INCORRECT_STATUS']);
		}
		$manager_fio = substr($result['Менеджер']['ФИО'], 0, 255);
		$manager_email = substr($result['Менеджер']['Email'], 0, 255);
		$manager_id = substr($result['Менеджер']['МенеджерИД'], 0, 36);
		$main_counterparty_id = substr($result['ГоловнойКонтрагентИД'], 0, 36);
		
		if($main_counterparty_id == ''){
			parent::prepare_response(['error'=>'Головной контрагент не назначен для вас, авторизация невозможна']);
		}
		
		if($status == 'Сотрудник' && sizeof($result_) == 0){
			parent::prepare_response(['error'=>'IT_LOOKS_LIKE_THIS_EMPLOYEE_IS_NOT_IN_THE_DATABASE']);
		}
		
		try{
			
			DB::beginTransaction();
				
			# блокируем всю таблицу в рамках транзакции
			DB::select('SELECT COUNT(`id`) FROM `users` FOR UPDATE');
			
			$result = DB::select('SELECT `id` FROM `users` WHERE `phone_hash` = :phone_hash LIMIT 1', ['phone_hash' => $phone_hash]);
			
			if(sizeof($result) == 0){
				
				DB::insert('INSERT INTO `users` (`date`, `ip`, `phone_hash`, `phone`, `user_myid`, `email`, `status`, `fio`, `hashed_pass`, `token_hash`, `token`, `expires_token`, `manager_fio`, `manager_email`, `manager_id`, `main_counterparty_id`) values (:date, AES_ENCRYPT(:ip, :aes_key1), :phone_hash, AES_ENCRYPT(:phone, :aes_key2), :user_myid, AES_ENCRYPT(:email, :aes_key3), :status, AES_ENCRYPT(:fio, :aes_key4), :hashed_pass, :token_hash, AES_ENCRYPT(:token, :aes_key5), :expires_token, AES_ENCRYPT(:manager_fio, :aes_key6), AES_ENCRYPT(:manager_email, :aes_key7), :manager_id, :main_counterparty_id)', ['date' => $date, 'ip' => '', 'aes_key1' => $this->aes_key[0], 'phone_hash' => $phone_hash, 'phone' => $phone, 'aes_key2' => $this->aes_key[0], 'user_myid' => $user_myid, 'email' => $email, 'aes_key3' => $this->aes_key[0], 'status' => $status, 'fio' => $fio, 'aes_key4' => $this->aes_key[0], 'hashed_pass' => $hashed_pass, 'token_hash' => $token_hash, 'token' => $token, 'aes_key5' => $this->aes_key[0], 'expires_token' => $expires_token, 'manager_fio' => $manager_fio, 'aes_key6' => $this->aes_key[0], 'manager_email' => $manager_email, 'aes_key7' => $this->aes_key[0], 'manager_id' => $manager_id, 'main_counterparty_id' => $main_counterparty_id]);
				
			}else{
				
				DB::update('UPDATE `users` SET `ip` = AES_ENCRYPT(:ip, :aes_key1), `email` = AES_ENCRYPT(:email, :aes_key3), `status` = :status, `fio` = AES_ENCRYPT(:fio, :aes_key4), `hashed_pass` = :hashed_pass, `count_fail_auth` = 0, `timestamp_set_ban` = 0, `token_hash` = :token_hash, `token` = AES_ENCRYPT(:token, :aes_key5), `expires_token` = :expires_token, `manager_fio` = AES_ENCRYPT(:manager_fio, :aes_key6), `manager_email` = AES_ENCRYPT(:manager_email, :aes_key7), `manager_id` = :manager_id, `main_counterparty_id` = :main_counterparty_id, `password_changed_from_1c` = :password_changed_from_1c WHERE `phone_hash` = :phone_hash LIMIT 1', ['ip' => '', 'aes_key1' => $this->aes_key[0], 'email' => $email, 'aes_key3' => $this->aes_key[0], 'status' => $status, 'fio' => $fio, 'aes_key4' => $this->aes_key[0], 'hashed_pass' => $hashed_pass, 'token_hash' => $token_hash, 'token' => $token, 'aes_key5' => $this->aes_key[0], 'expires_token' => $expires_token, 'manager_fio' => $manager_fio, 'aes_key6' => $this->aes_key[0], 'manager_email' => $manager_email, 'aes_key7' => $this->aes_key[0], 'manager_id' => $manager_id, 'main_counterparty_id' => $main_counterparty_id, 'phone_hash' => $phone_hash, 'password_changed_from_1c' => 0]);
				
			}
			
			DB::commit();
			
		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
			
		}
		
		if(sizeof($result) == 0){

			list($result, $err) = parent::update_data_for_head_counterparty($main_counterparty_id, $token);
			if($err){
				parent::prepare_response(['error'=>$err]);
			}
		
		}
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['user_myid' => $user_myid, 'uid' => md5($user_myid . $this->config_project['auth_salt'])], $client_rsa_pubkey);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]]);
		//parent::prepare_response(['response' => ['user_myid' => $user_myid, 'uid' => md5($user_myid . $this->config_project['auth_salt'])]]);
		
	}
	
}
