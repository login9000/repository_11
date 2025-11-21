<?php

namespace App\Http\Controllers\Api_v2;

use App\Helpers\Common;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Schema;

class ControllerUpdateUserData extends Common {
	
	public function handler(Request $request) {
	
		parent::check_allowed_method('PUT');

		$data = ($request->input('Данные') ?? '');

		if ($data === '' || !is_array($data)) {
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Данные" пустое либо было некорректно заполнено')));
		}
		
		if(!array_key_exists('ПользовательИД', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ПользовательИД" отсуствует')));
		}
		$user_myid = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['ПользовательИД'] ?? '', 0, 36)));
		if(empty($user_myid)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ПользовательИД" пустое либо было некорректно заполнено')));
		}		
		
		if(!empty($data['Фамилия']) && !empty($data['Имя']) && !empty($data['Отчество'])) {
			$fio = substr($data['Фамилия'] . ' ' . $data['Имя'] . ' ' . $data['Отчество'], 0, 255);
			$fio = preg_replace('/  +/', ' ', $fio);
			preg_match('/^([^ ]+) ([^ ]+) ([^ ]+)$/', $fio, $matches);
			if($matches){
				$surname = mb_strtoupper(mb_substr($matches[1], 0, 1)) . mb_strtolower(mb_substr($matches[1], 1));
				$name = mb_strtoupper(mb_substr($matches[2], 0, 1)) . mb_strtolower(mb_substr($matches[2], 1));
				$surname2 = mb_strtoupper(mb_substr($matches[3], 0, 1)) . mb_strtolower(mb_substr($matches[3], 1));
				$fio = $surname.' '.$name.' '.$surname2;
			}else{
				$fio = null;
			}
		}
		
		if(!empty($data['Email']) && preg_match('/^.+@.+\..+$/i', $data['Email'] )) {
			$email = $data['Email'];
		}
		
		if(!empty($data['Роль'])){
			if(!in_array($data['Роль'], config('project.user_statuses'))){
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Роль" пустое либо было некорректно заполнено, может иметь значения: ' . implode(',', config('project.user_statuses')))));
			}
			$status = $data['Роль'];
		}

		if (!empty($data['Телефон'])) {
			$phone = $data['Телефон'];
			$phone = mb_substr(preg_replace('/[^0-9\+]/', '', $phone), 0, 12);
			$phone = trim(mb_substr(preg_replace('/^\+7/', '', $phone), 0, 10));
			$phone_hash = md5($phone.'phone_hash');
		}
						
		if (!empty($data['Менеджер'])) {
			if (!empty($data['Менеджер']['ФИО'])) {
				$manager_fio = $data['Менеджер']['ФИО'];
				$manager_fio = preg_replace('/  +/', ' ', $manager_fio);
				preg_match('/^([^ ]+) ([^ ]+) ([^ ]+)$/', $manager_fio, $matches);
				if($matches){
					$surname = mb_strtoupper(mb_substr($matches[1], 0, 1)) . mb_strtolower(mb_substr($matches[1], 1));
					$name = mb_strtoupper(mb_substr($matches[2], 0, 1)) . mb_strtolower(mb_substr($matches[2], 1));
					$surname2 = mb_strtoupper(mb_substr($matches[3], 0, 1)) . mb_strtolower(mb_substr($matches[3], 1));
					$manager_fio = $surname.' '.$name.' '.$surname2;
				}else{
					$manager_fio = null;
				}
			}
			if (!empty($data['Менеджер']['МенеджерИД'])) {
				$manager_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['Менеджер']['МенеджерИД'] ?? '', 0, 36)));
			}
			if (!empty($data['Менеджер']['Email']) && preg_match('/^.+@.+\..+$/i', $data['Менеджер']['Email'] )) {
				$manager_email = $data['Менеджер']['Email'];
			}
		}
		
		if (!empty($data['ГоловнойКонтрагентИД'])) {
			$main_counterparty_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['ГоловнойКонтрагентИД'] ?? '', 0, 36)));
		}
		
		if (!empty($data['НовыйПароль'])) {

			if (mb_strlen($data['НовыйПароль']) < 8) {
				return parent::escape_unicode_decode(json_encode(['Ошибка' => 'Пароль должен содержать 8 символов']));
			}

			if (mb_ereg_replace('[^A-ZА-ЯЁ]', '', $data['НовыйПароль']) === '') {
				return parent::escape_unicode_decode(json_encode(['Ошибка' => 'В пароле должен быть символ в верхнем регистре']));
			}

			if (mb_ereg_replace('[^a-zа-яё]', '', $data['НовыйПароль']) === '') {
				parent::prepare_response(['error' => 'В пароле должен быть символ в нижнем регистре']);
			}

			if (mb_ereg_replace('[^0-9]', '', $data['НовыйПароль']) === '') {
				parent::prepare_response(['error' => 'Пароль должен содержать цифры']);
			}

			$hashed_pass = Hash::make($data['НовыйПароль']);
			$password_changed_from_1c = 1;
			
		}

		if (array_key_exists('Заблокирован', $data)) {
			$is_banned = $data['Заблокирован'] == null ? '' : '1';
		}
		
		if (!empty($data['СотрудникиДобавитьИлиОбновить']) && is_array($data['СотрудникиДобавитьИлиОбновить']) && sizeof($data['СотрудникиДобавитьИлиОбновить']) > 0) {
			$employees_add_or_update = $data['СотрудникиДобавитьИлиОбновить'];
		}
		
		if (!empty($data['СотрудникиУдалить']) && is_array($data['СотрудникиУдалить']) && sizeof($data['СотрудникиУдалить']) > 0) {
			$employees_delete = $data['СотрудникиУдалить'];
		}
						
		try{
			
			DB::beginTransaction();
				
				$str_for_update = 'FOR UPDATE';
				
				if(!empty($phone_hash)){
					# блокируем всю таблицу в рамках транзакции
					DB::select('SELECT COUNT(`id`) FROM `users` FOR UPDATE');
					
					$result = DB::select('SELECT `id` FROM `users` WHERE `phone_hash` = :phone_hash LIMIT 1', ['phone_hash' => $phone_hash]);
					if(sizeof($result) > 0){
						return parent::escape_unicode_decode(json_encode(['Ошибка' => 'Такой "Телефон" уже существует в базе данных ('.$phone.')']));
					}
					$str_for_update = '';
				}
				
				$result = DB::select('SELECT CONVERT(AES_DECRYPT(`fio`, :aes_key) USING utf8mb4) AS `fio`, CONVERT(AES_DECRYPT(`email`, :aes_key2) USING utf8mb4) AS `email`, `status`, CONVERT(AES_DECRYPT(`phone`, :aes_key3) USING utf8mb4) AS `phone`, `phone_hash`, `password_changed_from_1c`, CONVERT(AES_DECRYPT(`manager_fio`, :aes_key4) USING utf8mb4) AS `manager_fio`, `manager_id`, CONVERT(AES_DECRYPT(`manager_email`, :aes_key5) USING utf8mb4) AS `manager_email`, `main_counterparty_id`, `hashed_pass`, `is_banned` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1 '.$str_for_update, ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'aes_key3' => $this->aes_key[0], 'aes_key4' => $this->aes_key[0], 'aes_key5' => $this->aes_key[0], 'user_myid' => $user_myid]);
				
				if(sizeof($result) == 0){
					return parent::escape_unicode_decode(json_encode(['Ошибка' => 'Пользователь с таким "ПользовательИД" отсутствует']));
				}
				
				foreach ($result as $row) {
					
					if(empty($fio)){
						$fio = $row->fio;
					}
					if(empty($email)){
						$email = $row->email;
					}
					if(empty($status)){
						$status = $row->status;
					}
					if(empty($phone)){
						$phone = $row->phone;
						$phone_hash = $row->phone_hash;
					}
					if(empty($password_changed_from_1c)){
						$password_changed_from_1c = $row->password_changed_from_1c;
					}
					if(empty($manager_fio)){
						$manager_fio = $row->manager_fio;
					}
					if(empty($manager_id)){
						$manager_id = $row->manager_id;
					}
					if(empty($manager_email)){
						$manager_email = $row->manager_email;
					}
					if(empty($main_counterparty_id)){
						$main_counterparty_id = $row->main_counterparty_id;
					}
					if(empty($hashed_pass)){
						$hashed_pass = $row->hashed_pass;
					}
					if(!array_key_exists('Заблокирован', $data)){
						$is_banned = $row->is_banned;
					}
					
				}
				
				DB::update('UPDATE `users` SET `fio` = AES_ENCRYPT(:fio, :aes_key), `email` = AES_ENCRYPT(:email, :aes_key2), `status` = :status, `phone` = AES_ENCRYPT(:phone, :aes_key3), `phone_hash` = :phone_hash, `password_changed_from_1c` = :password_changed_from_1c, `manager_fio` = AES_ENCRYPT(:manager_fio, :aes_key4), `manager_id` = :manager_id, `manager_email` = AES_ENCRYPT(:manager_email, :aes_key5), `main_counterparty_id` = :main_counterparty_id, `hashed_pass` = :hashed_pass, `is_banned` = :is_banned WHERE `user_myid` = :user_myid LIMIT 1', ['fio' => $fio, 'aes_key' => $this->aes_key[0], 'email' => $email, 'aes_key2' => $this->aes_key[0], 'status' => $status, 'phone' => $phone, 'aes_key3' => $this->aes_key[0], 'phone_hash' => $phone_hash, 'password_changed_from_1c' => $password_changed_from_1c, 'manager_fio' => $manager_fio, 'aes_key4' => $this->aes_key[0], 'manager_id' => $manager_id, 'manager_email' => $manager_email, 'aes_key5' => $this->aes_key[0], 'main_counterparty_id' => $main_counterparty_id, 'hashed_pass' => $hashed_pass, 'is_banned' => $is_banned, 'user_myid' => $user_myid]);
			
			DB::commit();

		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			return json_encode(array('Ошибка'=>preg_replace('/\r?\n/', ' ', $err)));
			
		}
		
		if(!empty($employees_add_or_update) && Schema::hasTable('employees_'.$user_myid)){
		
			foreach ($employees_add_or_update as $employee_id => $params) {
				
				$delegation_user_myid = '';
				if (array_key_exists('ДелегироватьУведомление', $params)) {
					if ($params['ДелегироватьУведомление'] == NULL) {
						$params['ДелегироватьУведомление'] = '';
					}
					$delegation_user_myid = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($params['ДелегироватьУведомление'] ?? '', 0, 36)));
				}
				
				$is_banned = '';
				if (array_key_exists('Заблокирован', $params)) {
					$is_banned = $params['Заблокирован'] == NULL ? '' : '1';
				}
				
				try{
					
					DB::beginTransaction();
						
						$result = DB::select('SELECT `id` FROM `employees_'.$user_myid.'` WHERE `user_myid` = :user_myid LIMIT 1 FOR UPDATE', ['user_myid' => $employee_id]);

						if(sizeof($result) > 0){
							
							DB::update('UPDATE `employees_'.$user_myid.'` SET `delegation_user_myid` = :delegation_user_myid, `is_banned` = :is_banned WHERE `user_myid` = :user_myid LIMIT 1', ['delegation_user_myid' => $delegation_user_myid, 'is_banned' => $is_banned, 'user_myid' => $employee_id]);
							
						}else{

							DB::insert('INSERT INTO `employees_'.$user_myid.'` (`user_myid`, `delegation_user_myid`, `is_banned`) values (:user_myid, :delegation_user_myid, :is_banned)', ['user_myid' => $employee_id, 'delegation_user_myid' => $delegation_user_myid, 'is_banned' => $is_banned]);
							
						}
					
					DB::commit();
					
					if (array_key_exists('Заблокирован', $params)) {
						
						DB::beginTransaction();
							
							$result = DB::select('SELECT `is_banned` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1 FOR UPDATE', ['user_myid' => $employee_id]);
							
							if (sizeof($result) > 0) {								
								DB::update('UPDATE `users` SET `is_banned` = :is_banned WHERE `user_myid` = :user_myid LIMIT 1', ['is_banned' => $is_banned, 'user_myid' => $employee_id]);
							}
						
						DB::commit();
					
					}
					
				} catch (QueryException $e) {
					
					DB::rollBack();
					$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
					parent::log_er_mysql($err);
					return json_encode(array('Ошибка'=>preg_replace('/\r?\n/', ' ', $err)));
					
				}
				
			}
		
		}
		
		if(!empty($employees_delete)){
			
			foreach ($employees_delete as $employee_id) {
				
				DB::delete('DELETE FROM `employees_'.$user_myid.'` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $employee_id]);
				DB::update('UPDATE `users` SET `client_user_myid` = :client_user_myid  WHERE `user_myid` = :user_myid LIMIT 1', ['client_user_myid' => '', 'user_myid' => $employee_id]);
				
			}
								
		}
		
		return parent::escape_unicode_decode(json_encode(['Сообщение' => 'Успешное сохранение']));
		
	}

}

