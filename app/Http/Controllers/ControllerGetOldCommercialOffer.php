<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerGetOldCommercialOffer extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$err = parent::validate_get_params('other');
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		$client_rsa_pubkey = htmlspecialchars($_GET['client_rsa_pubkey'], ENT_QUOTES, $this->encoding);
		
		$commercial_offer_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['commercial_offer_id'] ?? '', 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($commercial_offer_id == ''){
			parent::prepare_response(['error'=>'COMMERCIAL_OFFER_ID_IS_EMPTY_OR_INCORRECT']);
		}
		
		$token = '';
		
		try{

			$result = DB::select('SELECT `expires_token`, CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
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
		
		$result = [];
		
		try{
			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`recipient_of_the_commercial_offer`, :aes_key) USING utf8mb4) AS `recipient_of_the_commercial_offer`, `markup_type`, `markup_percentage`, `goods`, CONVERT(AES_DECRYPT(`comment`, :aes_key2) USING utf8mb4) AS `comment` FROM `commercial_offers_'.$user_myid.'` WHERE `commercial_offer_id` = :commercial_offer_id LIMIT 1', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'commercial_offer_id' => $commercial_offer_id]);
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}else{
				parent::prepare_response(['error'=>'NO_FOUND_COMMERCIAL_OFFER']);
			}
		}
		if(sizeof($result) == 0){
			parent::prepare_response(['error'=>'NO_FOUND_COMMERCIAL_OFFER']);
		}
		
		$recipient_of_the_commercial_offer = '';
		$markup_type = '';
		$markup_percentage = 0;
		$document_amount = 0;
		$goods = [];
		$comment = '';
		$arr3 = [];
		
		foreach ($result as $row) {
			
			$arr = [];
			$recipient_of_the_commercial_offer = $row->recipient_of_the_commercial_offer;
			$markup_type = $row->markup_type;
			$markup_percentage = (float) $row->markup_percentage;
			$goods = json_decode($row->goods, true);
			$comment = $row->comment;
			
			foreach ($goods as $c) {
				
				$arr2 = [
					'НоменклатураИД' => $c['id_nomenclature'],
					'НоменклатураНаименование' => html_entity_decode($c['name_nomenclature']),
					'Характеристика' => $c['length'],
					'Количество' => (int) $c['quantity'],
					'ЕдиницаИзмеренияНаименования' => $c['unit'],
					'Итого' => ($c['total'] != '-' ? ((float) $c['total']) : $c['total']),
					'ОбщаяCумма' => (float) $c['total_amount'],
					'Сумма' => (float) $c['sum'],
					'ПроцентСкидкиНаценки' => (float) $c['discount'],
					'ПроцентБонуса' => (float) $c['bonus'],
					'Цена' => ($c['price'] != '-' ? ((float) $c['price']) : $c['price']),
					'ЦенаПолучателяКП' => $c['its_own_price']
				];
				$document_amount += (float) $c['total_amount'];
				$arr[] = $arr2;
				$arr3[] = ['НоменклатураИД' => $c['id_nomenclature'], 'Количество' => round(($c['total'] != '-' ? ((float) $c['total']) : (int) $c['quantity']), 2)];
				
			}
			
			$goods = $arr;
			
		}
		
		list($result2, $err) = parent::post_request_to_api_1c('weight_calculation', ['data' => $arr3, 'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}

		if(array_key_exists('Ошибка', $result2)){
			parent::prepare_response(['error'=>$result2['Ошибка']], true);
		}

		if(!array_key_exists('Вес', $result2)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Вес']);
		}
			
		$weight = $result2['Вес'];
		
		$commercial_offer_details = [
			'Комментарий' => $comment,
			'ПолучательКП' => $recipient_of_the_commercial_offer,
			'ТипНаценки' => $markup_type,
			'ПроцентНаценки' => $markup_percentage,
			'СуммаДокумента' => round($document_amount, 2),
			'Вес' => $weight,
			'Запасы' => $goods
		];
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['commercial_offer_details' => ['data' => $commercial_offer_details]], $client_rsa_pubkey);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true);
		// parent::prepare_response(['response' => ['commercial_offer_details' => ['data' => $commercial_offer_details]]], true);
		
	}
	
}
