<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerRecoveryPass extends Common{
	
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

		$phone = ($data['phone'] ?? '');
		$fio = ($data['fio'] ?? '');
				
		// $phone = ($request->input('phone') ?? '');
		// $fio = ($request->input('fio') ?? '');
		
		$phone = mb_substr(preg_replace('/[^0-9\+]/', '', $phone), 0, 12);
		$phone = trim(mb_substr(preg_replace('/^\+7/', '', $phone), 0, 10));
		$fio = trim(mb_substr(htmlspecialchars($fio, ENT_QUOTES, $this->encoding), 0, 255));
		
		if($phone == ''){
			parent::prepare_response(['error'=>'PHONE_IS_EMPTY_OR_INCORRECT']);
		}
		
		if(!preg_match('/^[0-9]{10}$/', $phone)){
			parent::prepare_response(['error'=>'FAIL_PHONE']);
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
		$phone_hash = md5($phone.'phone_hash');
		
		try{
			
			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`fio`, :aes_key) USING utf8mb4) AS `fio` FROM `users` WHERE `phone_hash` = :phone_hash LIMIT 1', ['aes_key' => $this->aes_key[0], 'phone_hash' => $phone_hash]);
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				if($row->fio != $fio){
					parent::prepare_response(['error'=>'FIO_DOES_NOT_MATCH_PHONE_NUMBER']);
				}
			}
			
			list($result, $err) = parent::post_request_to_api_1c('recovery_pass', ['login' => $phone, 'surname' => $surname, 'name' => $name, 'surname2' => $surname2]);
			if($err){
				parent::prepare_response(['error'=>$err], true);
			}
			
			if(array_key_exists('Ошибка', $result)){
				parent::prepare_response(['error'=>$result['Ошибка']], true);
			}
			
			DB::update('UPDATE `users` SET `hashed_pass` = \'\', `token` = AES_ENCRYPT(:token, :aes_key), `expires_token` = 0 WHERE `phone_hash` = :phone_hash LIMIT 1', ['token' => '', 'aes_key' => $this->aes_key[0], 'phone_hash' => $phone_hash]);
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => 'ok']);
		
	}
	
}
