<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerEditTransport extends Common{
	
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

		$id = ($data['id'] ?? '');
		$brand = ($data['brand'] ?? '');
		$license_plate = ($data['license_plate'] ?? '');
		$vehicle_type = ($data['vehicle_type'] ?? '');
		$client_rsa_pubkey = $data['client_rsa_pubkey'];

		// $id = ($request->input('id') ?? '');
		// $brand = ($request->input('brand') ?? '');
		// $license_plate = ($request->input('license_plate') ?? '');
		// $vehicle_type = ($request->input('vehicle_type') ?? '');
		
		$id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($id, 0, 36)));
		$brand = trim(mb_substr(htmlspecialchars($brand, ENT_QUOTES, $this->encoding), 0, 100));
		$license_plate = trim(mb_substr(htmlspecialchars($license_plate, ENT_QUOTES, $this->encoding), 0, 15));
		$vehicle_type = trim(mb_substr(htmlspecialchars($vehicle_type, ENT_QUOTES, $this->encoding), 0, 10));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}

		if($id == ''){
			parent::prepare_response(['error'=>'ID_IS_EMPTY_OR_INCORRECT']);
		}
		
		if($brand == ''){
			parent::prepare_response(['error'=>'BRAND_IS_EMPTY_OR_INCORRECT']);
		}
		
		if($license_plate == ''){
			parent::prepare_response(['error'=>'LICENSE_PLATE_IS_EMPTY_OR_INCORRECT']);
		}
		
		if(!in_array($vehicle_type, ['Открытый', 'Закрытый', 'Другой'])){
			parent::prepare_response(['error'=>'FAIL_VEHICLE_TYPE']);
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
		
		list($result, $err) = parent::post_request_to_api_1c('edit_transport', ['id' => $id, 'brand' => $brand, 'license_plate' => $license_plate, 'vehicle_type' => $vehicle_type, 'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['id' => $id, 'brand' => $brand, 'license_plate' => $license_plate, 'vehicle_type' => $vehicle_type], $client_rsa_pubkey);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true);
		//parent::prepare_response(['response' => ['id' => $id, 'brand' => $brand, 'license_plate' => $license_plate, 'vehicle_type' => $vehicle_type]], true);
		
	}
	
}
