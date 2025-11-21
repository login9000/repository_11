<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerAddNewEmployee extends Common{
	
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

		$fio = ($data['fio'] ?? '');
		$email = ($data['email'] ?? '');
		$phone = ($data['phone'] ?? '');
		$pass1 = ($data['pass1'] ?? '');
		$pass2 = ($data['pass2'] ?? '');
		$client_rsa_pubkey = $data['client_rsa_pubkey'];

		// $fio = ($request->input('fio') ?? '');
		// $email = ($request->input('email') ?? '');
		// $phone = ($request->input('phone') ?? '');
		// $pass1 = ($request->input('pass1') ?? '');
		// $pass2 = ($request->input('pass2') ?? '');
		
		$fio = trim(mb_substr(htmlspecialchars($fio, ENT_QUOTES, $this->encoding), 0, 255));
		$email = trim(mb_substr(htmlspecialchars($email, ENT_QUOTES, $this->encoding), 0, 100));
		$phone = mb_substr(preg_replace('/[^0-9\+]/', '', $phone), 0, 12);
		$phone = trim(mb_substr(preg_replace('/^\+7/', '', $phone), 0, 10));
		$pass1 = trim(mb_substr(htmlspecialchars($pass1, ENT_QUOTES, $this->encoding), 0, 10));
		$pass2 = trim(mb_substr(htmlspecialchars($pass2, ENT_QUOTES, $this->encoding), 0, 10));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($fio == ''){
			parent::prepare_response(['error'=>'FIO_IS_EMPTY_OR_INCORRECT']);
		}
		$fio = preg_replace('/  +/', ' ', $fio);
		
		preg_match('/^([^ ]+) ([^ ]+) ([^ ]+)$/', $fio, $matches);
		if($matches){
			$surname = mb_strtoupper(mb_substr($matches[1], 0, 1)) . mb_strtolower(mb_substr($matches[1], 1));
			$name = mb_strtoupper(mb_substr($matches[2], 0, 1)) . mb_strtolower(mb_substr($matches[2], 1));
			$surname2 = mb_strtoupper(mb_substr($matches[3], 0, 1)) . mb_strtolower(mb_substr($matches[3], 1));
			$fio = $surname.' '.$name.' '.$surname2;
		}else{
			parent::prepare_response(['error'=>'FIO_IS_INCORRECT']);
		}
		
		if($email == ''){
			parent::prepare_response(['error'=>'EMAIL_IS_EMPTY_OR_INCORRECT']);
		}
		
		if(!preg_match('/^.+@.+\..+$/i', $email)){
			parent::prepare_response(['error'=>'FAIL_EMAIL']);
		}
			
		if($phone == ''){
			parent::prepare_response(['error'=>'PHONE_IS_EMPTY_OR_INCORRECT']);
		}
		
		if(!preg_match('/^[0-9]{10}$/', $phone)){
			parent::prepare_response(['error'=>'FAIL_PHONE']);
		}
		
		if($pass1 === ''){
			parent::prepare_response(['error'=>'PASS_IS_EMPTY_OR_INCORRECT']);
		}
		
		if($pass1 !== $pass2){
			parent::prepare_response(['error'=>'PASS1_NOT_EQUAL_PASS2']);
		}
		
		if(mb_ereg_match('^.{1,7}$', $pass1)){
			parent::prepare_response(['error'=>'PASSWORD_MUST_HAVE_AT_LEAST_8_CHARACTERS']);
		}
		
		if(mb_ereg_replace('[^A-ZА-ЯЁ]', '', $pass1) === ''){
			parent::prepare_response(['error'=>'MISSING_UPPER_CASE_CHARACTERS_FOR_PASSWORD']);
		}
		
		if(mb_ereg_replace('[^a-zа-яё]', '', $pass1) === ''){
			parent::prepare_response(['error'=>'MISSING_LOWER_CASE_CHARACTERS_FOR_PASSWORD']);
		}
		
		if(mb_ereg_replace('[^0-9]', '', $pass1) === ''){
			parent::prepare_response(['error'=>'MISSING_NUMBER_CHARACTERS_FOR_PASSWORD']);
		}
		
		$token = '';
		$phone_hash = md5($phone.'phone_hash');
		
		try{

			$result = DB::select('SELECT `status`, CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				$token = $row->token;
				
				if($row->status == 'Сотрудник'){
					parent::prepare_response(['error'=>'YOU_CAN\'T_DO_THIS_REQUEST']);
				}
				
			}
			
			$result = DB::select('SELECT `id` FROM `users` WHERE `phone_hash` = :phone_hash LIMIT 1', ['phone_hash' => $phone_hash]);
			if(sizeof($result) > 0){
				parent::prepare_response(['error'=>'THE_PHONE_NUMBER_ALREADY_EXISTS_IN_THE_DATABASE']);
			}	
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		try{
			if(DB::table('employees_'.$user_myid)->count('id') > 29){
				parent::prepare_response(['error'=>'LIMIT_EMPLOYEES', 'comment' => 30]);
			}
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}
		}
		
		$date = parent::convert_format_date($this->date);
		$status = 'Сотрудник';
		$hashed_pass = Hash::make($pass1);
		
		list($result, $err) = parent::post_request_to_api_1c('add_new_employee', ['phone' => $phone, 'pass' => $pass1, 'surname' => $surname, 'name' => $name, 'surname2' => $surname2, 'email' => $email, 'status' => $status, 'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}
		
		if(!array_key_exists('ПользовательИД', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_ПользовательИД']);
		}
		
		$user_myid_employee = $result['ПользовательИД'];

		list($result, $err) = parent::post_request_to_api_1c('user_info', ['user_myid' => $user_myid_employee, 'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}
		if(!array_key_exists('ГоловнойКонтрагентИД', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_ГоловнойКонтрагентИД']);
		}
		$main_counterparty_id = substr($result['ГоловнойКонтрагентИД'], 0, 36);
		
		try{
			
			Schema::create('employees_'.$user_myid, function ($table) {
				$table->engine = 'InnoDB';
				$table->increments('id');
				$table->char('user_myid', 36)->index('user_myid_index')->default('');
				$table->char('delegation_user_myid', 36)->default('');
				$table->char('is_banned', 1)->default('');
			});
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view already exists') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}
		}
		
		try{
			
			DB::beginTransaction();

				# блокируем всю таблицу в рамках транзакции
				DB::select('SELECT COUNT(`id`) FROM `users` FOR UPDATE');
				
				$result = DB::select('SELECT `id` FROM `users` WHERE `phone_hash` = :phone_hash LIMIT 1', ['phone_hash' => $phone_hash]);
				if(sizeof($result) > 0){
					parent::prepare_response(['error'=>'THE_PHONE_NUMBER_ALREADY_EXISTS_IN_THE_DATABASE']);
				}
				DB::insert('INSERT INTO `users` (`date`, `phone_hash`, `phone`, `user_myid`, `email`, `status`, `fio`, `hashed_pass`, `client_user_myid`, `main_counterparty_id`) values (:date, :phone_hash, AES_ENCRYPT(:phone, :aes_key2), :user_myid, AES_ENCRYPT(:email, :aes_key3), :status, AES_ENCRYPT(:fio, :aes_key4), :hashed_pass, :client_user_myid, :main_counterparty_id)', ['date' => $date, 'phone_hash' => $phone_hash, 'phone' => $phone, 'aes_key2' => $this->aes_key[0], 'user_myid' => $user_myid_employee, 'email' => $email, 'aes_key3' => $this->aes_key[0], 'status' => $status, 'fio' => $fio, 'aes_key4' => $this->aes_key[0],  'hashed_pass' => $hashed_pass, 'client_user_myid' => $user_myid, 'main_counterparty_id' => $main_counterparty_id]);
				
			DB::commit();
			
			DB::insert('INSERT INTO `employees_'.$user_myid.'` (`user_myid`) VALUES (:user_myid)', ['user_myid' => $user_myid_employee]);
			
		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
			
		}
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['user_myid' => $user_myid_employee, 'fio' => $fio, 'phone' => '+7'.$phone, 'email' => $email], $client_rsa_pubkey);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true);
		//parent::prepare_response(['response' => ['user_myid' => $user_myid_employee, 'fio' => $fio, 'phone' => '+7'.$phone, 'email' => $email]], true);
		
	}
	
}
