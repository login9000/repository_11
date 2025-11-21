<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerAddNewDeliveryAddresses extends Common{
	
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

		$region = ($data['region'] ?? '');
		$area = ($data['area'] ?? '');
		$city = ($data['city'] ?? '');
		$index = ($data['index'] ?? '');
		$street = ($data['street'] ?? '');
		$house = ($data['house'] ?? '');
		$frame = ($data['frame'] ?? '');
		$letters = ($data['letters'] ?? '');
		$stock = ($data['stock'] ?? '');
		$apartment = ($data['apartment'] ?? '');
		$is_default = ($data['is_default'] ?? '');
		$fio = ($data['fio'] ?? '');
		$phone = ($data['phone'] ?? '');
		$client_rsa_pubkey = $data['client_rsa_pubkey'];

		// $region = ($request->input('region') ?? '');
		// $area = ($request->input('area') ?? '');
		// $city = ($request->input('city') ?? '');
		// $index = ($request->input('index') ?? '');
		// $street = ($request->input('street') ?? '');
		// $house = ($request->input('house') ?? '');
		// $frame = ($request->input('frame') ?? '');
		// $letters = ($request->input('letters') ?? '');
		// $stock = ($request->input('stock') ?? '');
		// $apartment = ($request->input('apartment') ?? '');
		// $is_default = ($request->input('is_default') ?? '');
		// $fio = ($request->input('fio') ?? '');
		// $phone = ($request->input('phone') ?? '');
		
		$region = trim(mb_substr(htmlspecialchars($region, ENT_QUOTES, $this->encoding), 0, 50));
		$area = trim(mb_substr(htmlspecialchars($area, ENT_QUOTES, $this->encoding), 0, 50));
		$city = trim(mb_substr(htmlspecialchars($city, ENT_QUOTES, $this->encoding), 0, 50));
		$index = trim(preg_replace('/[^0-9]/', '', mb_substr($index, 0, 6)));
		$street = trim(mb_substr(htmlspecialchars($street, ENT_QUOTES, $this->encoding), 0, 100));
		$house = trim(preg_replace('/[^a-zA-Zа-яА-Я0-9 ]/', '', mb_substr($house, 0, 10)));
		$frame = trim(preg_replace('/[^a-zA-Zа-яА-Я0-9 ]/', '', mb_substr($frame, 0, 10)));
		$letters = trim(preg_replace('/[^a-zA-Zа-яА-Я0-9 ]/', '', mb_substr($letters, 0, 10)));
		$stock = trim(preg_replace('/[^a-zA-Zа-яА-Я0-9 ]/', '', mb_substr($stock, 0, 10)));
		$apartment = trim(preg_replace('/[^a-zA-Zа-яА-Я0-9 ]/', '', mb_substr($apartment, 0, 10)));
		$is_default = trim(preg_replace('/[^0-9]/', '', mb_substr($is_default, 0, 1)));
		$fio = trim(mb_substr(htmlspecialchars($fio, ENT_QUOTES, $this->encoding), 0, 255));
		$phone = mb_substr(preg_replace('/[^0-9\+]/', '', $phone), 0, 12);
		$phone = trim(mb_substr(preg_replace('/^\+7/', '', $phone), 0, 10));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}

		if($city == ''){
			parent::prepare_response(['error'=>'CITY_IS_EMPTY_OR_INCORRECT']);
		}

		if($index == ''){
			parent::prepare_response(['error'=>'INDEX_IS_EMPTY_OR_INCORRECT']);
		}

		if($street == ''){
			parent::prepare_response(['error'=>'STREET_IS_EMPTY_OR_INCORRECT']);
		}
		
		if($region == ''){
			parent::prepare_response(['error'=>'REGION_IS_EMPTY_OR_INCORRECT']);
		}
		
		if($fio !== ''){
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
		}
		
		if($phone != '' && !preg_match('/^[0-9]{10}$/', $phone)){
			parent::prepare_response(['error'=>'FAIL_PHONE']);
		}
		
		if($is_default != ''){
			$is_default = '1';
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

		$address_str = $index.', '.$city.', '.$region.', '.($area !== '' ? $area.', ' : '') . $street.', '.($house !== '' ? 'д.'.$house.', ' : '') . ($frame !== '' ? 'корп.'.$frame.', ' : '') . ($letters !== '' ? 'лит.'.$letters.', ' : '') . ($stock !== '' ? 'склад '.$stock.', ' : '') . ($apartment !== '' ? 'кв.'.$apartment.', ' : '') . ($fio !== '' ? '('.$surname.' '.mb_strtoupper(mb_substr($name, 0, 1)).'.'.mb_strtoupper(mb_substr($surname2, 0, 1)).'.)' : '');
		$address_str = preg_replace('/, $/', '', $address_str);
		
		list($result, $err) = parent::post_request_to_api_1c('add_new_delivery_addresses', ['address_str' => $address_str, 'region' => $region, 'area' => $area, 'city' => $city, 'index' => $index, 'street' => $street, 'house' => $house, 'frame' => $frame, 'letters' => $letters, 'stock' => $stock, 'apartment' => $apartment, 'fio' => $fio, 'phone' => $phone, 'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}
		
		if(!array_key_exists('АдресДоставкиИД', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_АдресДоставкиИД']);
		}
		
		$delivery_addresses_id = $result['АдресДоставкиИД'];
		if($phone !== ''){$phone = '+7'.$phone;}
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['delivery_addresses_id' => $delivery_addresses_id, 'full_delivery_addresses' => $address_str, 'region' => $region, 'area' => $area, 'city' => $city, 'index' => $index, 'street' => $street, 'house' => $house, 'frame' => $frame, 'letters' => $letters, 'stock' => $stock, 'apartment' => $apartment, 'is_default' => $is_default, 'fio' => $fio, 'phone' => $phone], $client_rsa_pubkey);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true);
		//parent::prepare_response(['response' => ['delivery_addresses_id' => $delivery_addresses_id, 'full_delivery_addresses' => $address_str, 'region' => $region, 'area' => $area, 'city' => $city, 'index' => $index, 'street' => $street, 'house' => $house, 'frame' => $frame, 'letters' => $letters, 'stock' => $stock, 'apartment' => $apartment, 'is_default' => $is_default, 'fio' => $fio, 'phone' => $phone]], true);
		
	}
	
}
