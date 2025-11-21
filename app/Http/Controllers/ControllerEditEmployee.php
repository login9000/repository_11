<?php

namespace App\Http\Controllers;

use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerEditEmployee extends Common {

	public function __invoke(Request $request) {

		parent::check_allowed_method('PUT');
		
		$err = parent::validate_fields('other', $request);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}		
		
		list($data, $err) = parent::handler_data_crypt($request);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}

		$user_myid_employee = ($data['user_myid_employee'] ?? '');
		$fio = ($data['fio'] ?? '');
		$phone = ($data['phone'] ?? '');
		$pass1 = ($data['pass1'] ?? '');
		$pass2 = ($data['pass2'] ?? '');
		$email = ($data['email'] ?? '');
		$delegation_user_myid = ($data['delegation_user_myid'] ?? '');
		$is_banned = ($data['is_banned'] ?? '');
		$client_rsa_pubkey = $data['client_rsa_pubkey'];

		// $user_myid_employee = ($request->input('user_myid_employee') ?? '');
		// $fio = ($request->input('fio') ?? '');
		// $phone = ($request->input('phone') ?? '');
		// $pass1 = ($request->input('pass1') ?? '');
		// $pass2 = ($request->input('pass2') ?? '');
		// $email = ($request->input('email') ?? '');
		// $delegation_user_myid = ($request->input('delegation_user_myid') ?? '');
		// $is_banned = ($request->input('is_banned') ?? '');

		$user_myid_employee = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($user_myid_employee, 0, 36)));
		$fio = trim(mb_substr(htmlspecialchars($fio, ENT_QUOTES, $this->encoding), 0, 255));
		$phone = mb_substr(preg_replace('/[^0-9\+]/', '', $phone), 0, 12);
		$phone = trim(mb_substr(preg_replace('/^\+7/', '', $phone), 0, 10));
		$pass1 = trim(mb_substr(htmlspecialchars($pass1, ENT_QUOTES, $this->encoding), 0, 10));
		$pass2 = trim(mb_substr(htmlspecialchars($pass2, ENT_QUOTES, $this->encoding), 0, 10));
		$email = trim(mb_substr(htmlspecialchars($email, ENT_QUOTES, $this->encoding), 0, 100));
		$delegation_user_myid = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($delegation_user_myid, 0, 36)));
		$is_banned = trim(preg_replace('/[^0-9]/', '', mb_substr($is_banned, 0, 1)));

		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if ($err) {
			parent::prepare_response(['error' => $err]);
		}

		if ($user_myid_employee == '') {
			parent::prepare_response(['error' => 'USER_MYID_EMPLOYEE_IS_EMPTY_OR_INCORRECT']);
		}

		if ($fio == '') {
			parent::prepare_response(['error' => 'FIO_IS_EMPTY_OR_INCORRECT']);
		}
		$fio = preg_replace('/  +/', ' ', $fio);

		preg_match('/^([^ ]+) ([^ ]+) ([^ ]+)$/', $fio, $matches);
		if ($matches) {
			$surname = mb_strtoupper(mb_substr($matches[1], 0, 1)) . mb_strtolower(mb_substr($matches[1], 1));
			$name = mb_strtoupper(mb_substr($matches[2], 0, 1)) . mb_strtolower(mb_substr($matches[2], 1));
			$surname2 = mb_strtoupper(mb_substr($matches[3], 0, 1)) . mb_strtolower(mb_substr($matches[3], 1));
			$fio = $surname . ' ' . $name . ' ' . $surname2;
		} else {
			parent::prepare_response(['error' => 'LAST_NAME_FIRST_NAME_AND_PATRONYMIC_FIELDS_MUST_BE_FILLED_IN']);
		}

		if ($phone == '') {
			parent::prepare_response(['error' => 'PHONE_IS_EMPTY_OR_INCORRECT']);
		}

		if (!preg_match('/^[0-9]{10}$/', $phone)) {
			parent::prepare_response(['error' => 'FAIL_PHONE']);
		}

		if ($is_banned != '') {
			$is_banned = '1';
		}

		$hashed_pass = '';

		if ($pass1 !== '' || $pass2 !== '') {

			if ($pass1 !== $pass2) {
				parent::prepare_response(['error' => 'PASS1_NOT_EQUAL_PASS2']);
			}

			if (mb_ereg_match('^.{1,7}$', $pass1)) {
				parent::prepare_response(['error' => 'PASSWORD_MUST_HAVE_AT_LEAST_8_CHARACTERS']);
			}

			if (mb_ereg_replace('[^A-ZА-ЯЁ]', '', $pass1) === '') {
				parent::prepare_response(['error' => 'MISSING_UPPER_CASE_CHARACTERS_FOR_PASSWORD']);
			}

			if (mb_ereg_replace('[^a-zа-яё]', '', $pass1) === '') {
				parent::prepare_response(['error' => 'MISSING_LOWER_CASE_CHARACTERS_FOR_PASSWORD']);
			}

			if (mb_ereg_replace('[^0-9]', '', $pass1) === '') {
				parent::prepare_response(['error' => 'MISSING_NUMBER_CHARACTERS_FOR_PASSWORD']);
			}

			$hashed_pass = Hash::make($pass1);

		}

		if ($email == '') {
			parent::prepare_response(['error' => 'EMAIL_IS_EMPTY_OR_INCORRECT']);
		}

		if (!preg_match('/^.+@.+\..+$/i', $email)) {
			parent::prepare_response(['error' => 'FAIL_EMAIL']);
		}

		if ($user_myid_employee == $delegation_user_myid || $user_myid == $delegation_user_myid) {
			parent::prepare_response(['error' => 'INCORRECT_DELEGATION_USER_MYID']);
		}

		$is_i_reg = false;
		$is_employee_reg = false;
		$is_employee_delegate_reg = false;
		$delegation_fio = '';
		$token = '';
		$new_phone = '';
		$phone_hash = '';

		try {

			if ($delegation_user_myid != '') {
				$result = DB::select('SELECT `user_myid`, `status`, CONVERT(AES_DECRYPT(`fio`, :aes_key) USING utf8mb4) AS `fio`, CONVERT(AES_DECRYPT(`phone`, :aes_key2) USING utf8mb4) AS `phone`, CONVERT(AES_DECRYPT(`token`, :aes_key3) USING utf8mb4) AS `token`, `expires_token` FROM `users` WHERE `user_myid` = :user_myid OR `user_myid` = :delegation_user_myid OR `user_myid` = :user_myid_employee', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'aes_key3' => $this->aes_key[0], 'user_myid' => $user_myid, 'delegation_user_myid' => $delegation_user_myid, 'user_myid_employee' => $user_myid_employee]);
			} else {
				$result = DB::select('SELECT `user_myid`, `status`, CONVERT(AES_DECRYPT(`fio`, :aes_key) USING utf8mb4) AS `fio`, CONVERT(AES_DECRYPT(`phone`, :aes_key2) USING utf8mb4) AS `phone`, CONVERT(AES_DECRYPT(`token`, :aes_key3) USING utf8mb4) AS `token`, `expires_token` FROM `users` WHERE `user_myid` = :user_myid OR `user_myid` = :user_myid_employee', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'aes_key3' => $this->aes_key[0], 'user_myid' => $user_myid, 'user_myid_employee' => $user_myid_employee]);
			}

			foreach ($result as $row) {

				if ($row->user_myid == $user_myid) {
					$is_i_reg = true;
					$token = $row->token;
				}

				if ($row->user_myid == $user_myid_employee) {
					$is_employee_reg = true;
					if ($row->phone != $phone) {
						$new_phone = $phone;
					}
					$phone_hash = md5($phone.'phone_hash');
				}

				if ($row->user_myid == $delegation_user_myid) {
					$is_employee_delegate_reg = true;
					$delegation_fio = $row->fio;
				}

				if ($row->user_myid == $user_myid && $this->time - $row->expires_token >= 0) {
					parent::prepare_response(['error' => 'EXPIRES_TOKEN']);
				}

				if ($row->user_myid == $user_myid && $row->status == 'Сотрудник') {
					parent::prepare_response(['error' => 'YOU_CAN\'T_DO_THIS_REQUEST']);
				}

			}

			if ($new_phone != '') {
				$result = DB::select('SELECT `id` FROM `users` WHERE `phone_hash` = :phone_hash LIMIT 1', ['phone_hash' => $phone_hash]);
				if (sizeof($result) > 0) {
					parent::prepare_response(['error' => 'THE_PHONE_NUMBER_ALREADY_EXISTS_IN_THE_DATABASE']);
				}
			}

		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error' => $err]);
		}

		if (!$is_i_reg) {
			parent::prepare_response(['error' => 'NO_EXISTS_ACCOUNT']);
		}

		if (!$is_employee_reg) {
			parent::prepare_response(['error' => 'NO_EXISTS_EMPLOYEE_ACCOUNT']);
		}

		if ($delegation_user_myid != '' && !$is_employee_delegate_reg) {
			parent::prepare_response(['error' => 'NO_EXISTS_EMPLOYEE_DELEGATE_ACCOUNT']);
		}

		list($result, $err) = parent::post_request_to_api_1c('edit_employee', ['user_myid_employee' => $user_myid_employee, 'new_phone' => $phone, 'email' => $email, 'new_pass' => $pass1, 'surname' => $surname, 'name' => $name, 'surname2' => $surname2, 'is_banned' => ($is_banned == '1'), 'token' => $token]);
		if ($err) {
			parent::prepare_response(['error' => $err], true);
		}

		if (array_key_exists('Ошибка', $result)) {
			parent::prepare_response(['error' => $result['Ошибка']], true);
		}

		try {

			if ($delegation_user_myid != '') {
				$result = DB::select('SELECT `id` FROM `employees_' . $user_myid . '` WHERE `user_myid` = :delegation_user_myid LIMIT 1', ['delegation_user_myid' => $delegation_user_myid]);
				if (sizeof($result) == 0) {
					parent::prepare_response(['error' => 'THIS_USER_WAS_NOT_FOUND_AMONG_POSSIBLE_USERS']);
				}
			}
			
			DB::update('UPDATE `employees_' . $user_myid . '` SET `delegation_user_myid` = :delegation_user_myid, `is_banned` = :is_banned WHERE `user_myid` = :user_myid_employee LIMIT 1', ['delegation_user_myid' => $delegation_user_myid, 'is_banned' => $is_banned, 'user_myid_employee' => $user_myid_employee]);	
			
			DB::beginTransaction();
					
				# блокируем всю таблицу в рамках транзакции
				DB::select('SELECT COUNT(`id`) FROM `users` FOR UPDATE');
				
				if ($new_phone != '') {
					$result = DB::select('SELECT `id` FROM `users` WHERE `phone_hash` = :phone_hash LIMIT 1', ['phone_hash' => $phone_hash]);
					if (sizeof($result) > 0) {
						parent::prepare_response(['error' => 'THE_PHONE_NUMBER_ALREADY_EXISTS_IN_THE_DATABASE']);
					}
				}

				if ($hashed_pass != '') {
					DB::update('UPDATE `users` SET `phone_hash` = :phone_hash, `phone` = AES_ENCRYPT(:phone, :aes_key3), `email` = AES_ENCRYPT(:email, :aes_key4), `fio` = AES_ENCRYPT(:fio, :aes_key5), `hashed_pass` = :hashed_pass WHERE `user_myid` = :user_myid_employee LIMIT 1', ['phone_hash' => $phone_hash, 'phone' => $phone, 'aes_key3' => $this->aes_key[0], 'email' => $email, 'aes_key4' => $this->aes_key[0], 'fio' => $fio, 'aes_key5' => $this->aes_key[0], 'hashed_pass' => $hashed_pass, 'user_myid_employee' => $user_myid_employee]);
				} else {
					DB::update('UPDATE `users` SET `phone_hash` = :phone_hash, `phone` = AES_ENCRYPT(:phone, :aes_key3), `email` = AES_ENCRYPT(:email, :aes_key4), `fio` = AES_ENCRYPT(:fio, :aes_key5) WHERE `user_myid` = :user_myid_employee LIMIT 1', ['phone_hash' => $phone_hash, 'phone' => $phone, 'aes_key3' => $this->aes_key[0], 'email' => $email, 'aes_key4' => $this->aes_key[0], 'fio' => $fio, 'aes_key5' => $this->aes_key[0], 'user_myid_employee' => $user_myid_employee]);
				}
				
				DB::update('UPDATE `users` SET `is_banned` = :is_banned WHERE `user_myid` = :user_myid_employee LIMIT 1', ['is_banned' => $is_banned, 'user_myid_employee' => $user_myid_employee]);
				
			DB::commit();

		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error' => $err]);
			
		}

		if ($delegation_fio != '') {
			preg_match('/([^ ]+) ([^ ]+) ([^ ]+)/', $delegation_fio, $matches);
			if ($matches) {
				$delegation_fio = mb_strtoupper(mb_substr($matches[3], 0, 1)) . mb_strtolower(mb_substr($matches[3], 1, 255)) . ' ' . mb_strtoupper(mb_substr($matches[1], 0, 1)) . '.' . mb_strtoupper(mb_substr($matches[2], 0, 1)) . '.';
			} else {
				$delegation_fio = '';
			}
		}
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['user_myid_employee' => $user_myid_employee, 'fio' => $fio, 'email' => $email, 'phone' => '+7' + $phone, 'is_banned' => $is_banned, 'delegation_user_myid' => $delegation_user_myid, 'delegation_fio' => $delegation_fio], $client_rsa_pubkey);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true);
		//parent::prepare_response(['response' => ['user_myid_employee' => $user_myid_employee, 'fio' => $fio, 'email' => $email, 'phone' => '+7' + $phone, 'is_banned' => $is_banned, 'delegation_user_myid' => $delegation_user_myid, 'delegation_fio' => $delegation_fio]], true);

	}

}
