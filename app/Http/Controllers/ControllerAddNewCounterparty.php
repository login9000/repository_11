<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerAddNewCounterparty extends Common{
	
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

		$fullname = ($data['fullname'] ?? '');
		$inn = ($data['inn'] ?? '');
		$kpp = ($data['kpp'] ?? '');
		$ogrn = ($data['ogrn'] ?? '');
		$legal_address = ($data['legal_address'] ?? '');
		$actual_address = ($data['actual_address'] ?? '');
		$corr_account = ($data['corr_account'] ?? '');
		$bank_bik = ($data['bank_bik'] ?? '');
		$bank_name = ($data['bank_name'] ?? '');
		$checking_account = ($data['checking_account'] ?? '');
		$id_delivery_addresses = ($data['id_delivery_addresses'] ?? '');
		$client_rsa_pubkey = $data['client_rsa_pubkey'];

		// $fullname = ($request->input('fullname') ?? '');
		// $inn = ($request->input('inn') ?? '');
		// $kpp = ($request->input('kpp') ?? '');
		// $ogrn = ($request->input('ogrn') ?? '');
		// $legal_address = ($request->input('legal_address') ?? '');
		// $actual_address = ($request->input('actual_address') ?? '');
		// $corr_account = ($request->input('corr_account') ?? '');
		// $bank_bik = ($request->input('bank_bik') ?? '');
		// $bank_name = ($request->input('bank_name') ?? '');
		// $checking_account = ($request->input('checking_account') ?? '');
		// $id_delivery_addresses = ($request->input('id_delivery_addresses') ?? '');
		
		$fullname = trim(mb_substr(htmlspecialchars($fullname, ENT_QUOTES, $this->encoding), 0, 255));
		$inn = trim(mb_substr(htmlspecialchars($inn, ENT_QUOTES, $this->encoding), 0, 12));
		$kpp = trim(mb_substr(htmlspecialchars($kpp, ENT_QUOTES, $this->encoding), 0, 9));
		$ogrn = trim(mb_substr(htmlspecialchars($ogrn, ENT_QUOTES, $this->encoding), 0, 13));
		$legal_address = trim(mb_substr(htmlspecialchars($legal_address, ENT_QUOTES, $this->encoding), 0, 500));
		$actual_address = trim(mb_substr(htmlspecialchars($actual_address, ENT_QUOTES, $this->encoding), 0, 500));
		$corr_account = trim(mb_substr(htmlspecialchars($corr_account, ENT_QUOTES, $this->encoding), 0, 20));
		$bank_bik = trim(mb_substr(htmlspecialchars($bank_bik, ENT_QUOTES, $this->encoding), 0, 9));
		$bank_name = trim(mb_substr(htmlspecialchars($bank_name, ENT_QUOTES, $this->encoding), 0, 100));
		$checking_account = trim(mb_substr(htmlspecialchars($checking_account, ENT_QUOTES, $this->encoding), 0, 20));
		$id_delivery_addresses = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($id_delivery_addresses, 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($fullname == ''){
			parent::prepare_response(['error'=>'FULLNAME_IS_EMPTY_OR_INCORRECT']);
		}
		
		if($inn == ''){
			parent::prepare_response(['error'=>'INN_IS_EMPTY_OR_INCORRECT']);
		}
		
		if($legal_address == ''){
			parent::prepare_response(['error'=>'LEGAL_ADDRESS_IS_EMPTY_OR_INCORRECT']);
		}
		
		$token = '';
		$main_counterparty_id = '';
				
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				$token = $row->token;
				$main_counterparty_id = $row->main_counterparty_id;
				
			}	
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		try{
			
			if(!Schema::hasTable('counterparties_'.$main_counterparty_id)){
				parent::prepare_response(['error'=>'COULD_NOT_FIND_THE_TABLE_WITH_THE_COUNTERPARTY_DATA', 'comment' => $main_counterparty_id]);
			}
			
			if(DB::table('counterparties_'.$main_counterparty_id)->count('id') > 99){
				parent::prepare_response(['error'=>'COUNTERPARTIES_LIMIT', 'comment' => 100]);
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}
		}
		
		list($result, $err) = parent::post_request_to_api_1c('add_new_counterparty', ['fullname' => $fullname, 'inn' => $inn, 'kpp' => $kpp, 'ogrn' => $ogrn, 'legal_address' => $legal_address, 'actual_address' => $actual_address, 'corr_account' => $corr_account, 'bank_bik' => $bank_bik,  'bank_name' => $bank_name, 'checking_account' => $checking_account, 'id_delivery_addresses' => $id_delivery_addresses, 'addresses_match' => ($legal_address == $actual_address), 'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}
		
		if(!array_key_exists('ЗаявкаИД', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_ЗаявкаИД']);
		}
		
		$application_id = $result['ЗаявкаИД'];
		
		try{
			
			if(!Schema::hasTable('counterparties_'.$main_counterparty_id)){
				parent::prepare_response(['error'=>'COULD_NOT_FIND_THE_TABLE_WITH_THE_COUNTERPARTY_DATA', 'comment'=>$main_counterparty_id]);
			}
			
			DB::insert('INSERT INTO `counterparties_'.$main_counterparty_id.'` (`application_id`, `fullname`, `inn`, `kpp`, `ogrn`, `legal_address`, `actual_address`, `corr_account`, `bank_bik`, `bank_name`, `checking_account`, `id_delivery_addresses`) values (:application_id, AES_ENCRYPT(:fullname, :aes_key), AES_ENCRYPT(:inn, :aes_key2), AES_ENCRYPT(:kpp, :aes_key3), AES_ENCRYPT(:ogrn, :aes_key4), AES_ENCRYPT(:legal_address, :aes_key5), AES_ENCRYPT(:actual_address, :aes_key6), AES_ENCRYPT(:corr_account, :aes_key7), AES_ENCRYPT(:bank_bik, :aes_key8), AES_ENCRYPT(:bank_name, :aes_key9), AES_ENCRYPT(:checking_account, :aes_key10), :id_delivery_addresses)', ['application_id' => $application_id, 'fullname' => $fullname, 'aes_key' => $this->aes_key[0], 'inn' => $inn, 'aes_key2' => $this->aes_key[0], 'kpp' => $kpp, 'aes_key3' => $this->aes_key[0], 'ogrn' => $ogrn, 'aes_key4' => $this->aes_key[0], 'legal_address' => $legal_address, 'aes_key5' => $this->aes_key[0], 'actual_address' => $actual_address, 'aes_key6' => $this->aes_key[0], 'corr_account' => $corr_account, 'aes_key7' => $this->aes_key[0], 'bank_bik' => $bank_bik, 'aes_key8' => $this->aes_key[0], 'bank_name' => $bank_name, 'aes_key9' => $this->aes_key[0], 'checking_account' => $checking_account, 'aes_key10' => $this->aes_key[0], 'id_delivery_addresses' => $id_delivery_addresses]);
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['application_id' => $application_id, 'fullname' => $fullname, 'inn' => $inn, 'kpp' => $kpp], $client_rsa_pubkey);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true);
		//parent::prepare_response(['response' => ['application_id' => $application_id, 'fullname' => $fullname, 'inn' => $inn, 'kpp' => $kpp]], true);
		
	}
	
}
