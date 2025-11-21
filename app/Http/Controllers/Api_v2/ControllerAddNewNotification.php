<?php

namespace App\Http\Controllers\Api_v2;

use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerAddNewNotification extends Common{
	
	public function handler(Request $request){
		
		parent::check_allowed_method('POST');
		
		$user_myid = ($request->input('ПользовательИД') ?? '');
		$counterparty_id = ($request->input('КонтрагентИД') ?? '');
		$document_id = ($request->input('ДокументИД') ?? '');
		$category = ($request->input('Категория') ?? '');
		$subject = ($request->input('Тема') ?? '');
		$message = ($request->input('ТекстСообщения') ?? '');
		
		$user_myid = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($user_myid, 0, 36)));
		$counterparty_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($counterparty_id, 0, 36)));
		$document_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($document_id, 0, 36)));
		$category = trim(mb_substr(htmlspecialchars($category, ENT_NOQUOTES, $this->encoding), 0, 25));
		$subject = trim(mb_substr(htmlspecialchars($subject, ENT_NOQUOTES, $this->encoding), 0, 255));
		$message = trim(mb_substr(htmlspecialchars($message, ENT_NOQUOTES, $this->encoding), 0, 512));
		
		if($user_myid === ''){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ПользовательИД" пустое либо было некорректно заполнено')));
		}
		
		if($counterparty_id === ''){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "КонтрагентИД" пустое либо было некорректно заполнено')));
		}
		
		if($category != 'Служебные' && $document_id === ''){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ДокументИД" пустое либо было некорректно заполнено')));
		}
		
		if(!in_array($category, ['ЗаказПокупателя', 'ЗаявкаНаОтгрузку', 'Служебные'])){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Категория" не корректно, возможные значения: "ЗаказПокупателя", "ЗаявкаНаОтгрузку", "Служебные"')));
		}
		
		$category = str_replace(['ЗаказПокупателя', 'ЗаявкаНаОтгрузку', 'Служебные'], ['buyers_order', 'shipment_request', 'official'], $category);
		
		if($subject === ''){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Тема" пустое либо было некорректно заполнено')));
		}
				
		if($category == 'official' && $message === ''){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ТекстСообщения" пустое либо было некорректно заполнено')));
		}
		if($category != 'official'){
			$message = '';
		}
		
		$date = parent::convert_format_date($this->date);
		$client_user_myid = '';
		
		try{

			$result = DB::select('SELECT `client_user_myid` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			if(sizeof($result) == 0){
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Аккаунт пользователя не найден')));
			}
			
			foreach ($result as $row) {
				$client_user_myid = $row->client_user_myid;
			}

		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			return json_encode(array('Ошибка'=>preg_replace('/\r?\n/', ' ', $err)));
		}
		
		list($result, $err) = parent::send_notification($user_myid, ['date' => $date, 'counterparty_id' => $counterparty_id, 'document_id' => $document_id, 'category' => $category, 'subject' => $subject, 'aes_key' => $this->aes_key[0], 'message' => $message, 'aes_key2' => $this->aes_key[0]]);
		
		if($err){
			return json_encode(array('Ошибка'=>$err));
		}
		
		if($client_user_myid != '' && $client_user_myid != $user_myid){
			
			$delegation_user_myid = '';
			
			try{
				
				$result = DB::select('SELECT `delegation_user_myid` FROM `employees_'.$client_user_myid.'` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
				
				foreach ($result as $row) {
					$delegation_user_myid = $row->delegation_user_myid;
				}
				
				if($delegation_user_myid != ''){
					
					$result = DB::select('SELECT `id` FROM `users` WHERE `user_myid` = :delegation_user_myid LIMIT 1', ['delegation_user_myid' => $delegation_user_myid]);
					
					if(sizeof($result) > 0){
						list($result, $err) = parent::send_notification($delegation_user_myid, ['date' => $date, 'counterparty_id' => $counterparty_id, 'document_id' => $document_id, 'category' => $category, 'subject' => $subject, 'aes_key' => $this->aes_key[0], 'message' => $message, 'aes_key2' => $this->aes_key[0]]);
						
						if($err){
							return json_encode(array('Ошибка'=>$err));
						}
					}
					
				}
				
			} catch (QueryException $e) {
				$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
				if(strpos($e->getMessage(), 'Base table or view not found') === false){
					parent::log_er_mysql($err);
					return json_encode(array('Ошибка'=>preg_replace('/\r?\n/', ' ', $err)));
				}
			}
			
		}
		
		return parent::escape_unicode_decode(json_encode(array('Сообщение'=>'Уведомление создано')));
		
	}
		
}
