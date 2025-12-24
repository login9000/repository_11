<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerOrderCreation2 extends Common{
	
	public function __invoke(Request $request){

		parent::check_allowed_method('POST');
		
		$draft_id = ($request->input('draft_id') ?? '');
		$draft_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($draft_id, 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($draft_id == ''){
			parent::prepare_response(['error'=>'DRAFT_ID_IS_EMPTY_OR_INCORRECT']);
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

		$result = [];
		$counterparty_id = '';
		$is_cash_payment = '';
		$shipping_date = '';
		$shipping_warehouse_id = '';
		$is_shipping = '';
		$delivery_address = '';
		$delivery_address_id = '';
		$goods = [];
		$goods_non_standard_addition = [];
		$files_non_standard_addition = [];
		$comment = '';
		$orderlkid = '';
		
		try{
			
			if(!Schema::hasTable('orders_'.$main_counterparty_id)){
				parent::prepare_response(['error'=>'NOT_FOUND_DRAFT']);
			}
			
			$result = DB::select('SELECT `counterparty_id`, `is_cash_payment`, `shipping_date`, `shipping_warehouse_id`, `is_shipping`,  `delivery_address_id`, `goods`, CONVERT(AES_DECRYPT(`goods_non_standard_addition`, :aes_key) USING utf8mb4) AS `goods_non_standard_addition`, CONVERT(AES_DECRYPT(`files_non_standard_addition`, :aes_key2) USING utf8mb4) AS `files_non_standard_addition`, CONVERT(AES_DECRYPT(`comment`, :aes_key3) USING utf8mb4) AS `comment`, `orderlkid` FROM `orders_'.$main_counterparty_id.'` WHERE `order_id` = :draft_id AND `status` = \'draft\' LIMIT 1', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'aes_key3' => $this->aes_key[0], 'draft_id' => $draft_id]);
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}else{
				parent::prepare_response(['error'=>'NOT_FOUND_DRAFT']);
			}
		}
		if(sizeof($result) == 0){
			parent::prepare_response(['error'=>'NOT_FOUND_DRAFT']);
		}

		$delivery_data = parent::get_delivery_addresses($token);
				
		if(array_key_exists('error', $delivery_data)){
			parent::prepare_response(['error'=>$delivery_data['error']]);
		}
		
		$arr_delivery_id_address = [];
		foreach ($delivery_data['data'] as $c) {
			$arr_delivery_id_address[$c['АдресДоставкиИД']] = $c['АдресДоставки'];
		}
		
		foreach ($result as $row) {
			
			$counterparty_id = $row->counterparty_id;
			$is_cash_payment = $row->is_cash_payment;
			$shipping_date = $row->shipping_date;
			$shipping_warehouse_id = $row->shipping_warehouse_id;
			$is_shipping = $row->is_shipping;
			$delivery_address_id = $row->delivery_address_id;
			
			if($delivery_address_id != ''){
				if(array_key_exists($delivery_address_id, $arr_delivery_id_address)){
					$delivery_address = $arr_delivery_id_address[$delivery_address_id];
				}
			}
					
			$goods = json_decode($row->goods, true);
			$goods_non_standard_addition = json_decode($row->goods_non_standard_addition, true);
			if($goods_non_standard_addition === null){
				$goods_non_standard_addition = [];
			}
			$files_non_standard_addition = json_decode($row->files_non_standard_addition, true);
			if($files_non_standard_addition === null){
				$files_non_standard_addition = [];
			}
			$comment = $row->comment;
			$orderlkid = $row->orderlkid;
			
		}
				
		$arr = [];
		
		foreach($goods as $c){
			
			$arr2 = [];

			if(array_key_exists('НоменклатураИД', $c)){
				$arr2['НоменклатураИД'] = preg_replace('/[^a-f0-9\-]/', '', mb_substr($c['НоменклатураИД'], 0, 36));
				if($arr2['НоменклатураИД'] == ''){
					parent::prepare_response(['error'=>'ID_NOMENCLATURE_IS_EMPTY_OR_NOT_FILLED_IN_CORRECTLY']);
				}
			}
			
			if(array_key_exists('ВидНоменклатурыИД', $c)){
				$arr2['ВидНоменклатурыИД'] = preg_replace('/[^a-f0-9\-]/', '', mb_substr($c['ВидНоменклатурыИД'], 0, 36));
				if($arr2['ВидНоменклатурыИД'] == ''){
					parent::prepare_response(['error'=>'ID_NOMENCLATURE_TYPE_IS_EMPTY_OR_NOT_FILLED_IN_CORRECTLY']);
				}
			}
			
			if(array_key_exists('Характеристика', $c)){
				if($c['Характеристика'] !== ''){
					if(!is_numeric($c['Характеристика'])){
						parent::prepare_response(['error'=>'FIELD_LENGTH_MUST_BE_A_NUMBER']);
					}
					if(strpos($c['Характеристика'], '.') !== false){
						parent::prepare_response(['error'=>'THE_LENGTH_FIELD_MUST_CONTAIN_AN_INTEGER']);
					}
					if($c['Характеристика'] < 1){
						parent::prepare_response(['error'=>'FIELD_LENGTH_MUST_BE_GREATER_THAN_ZERO']);
					}
				}
				$arr2['Характеристика'] = (string) $c['Характеристика'];
			}
			
			if(array_key_exists('Количество', $c)){
				if(!is_numeric($c['Количество'])){
					parent::prepare_response(['error'=>'FIELD_QUANTITY_MUST_BE_A_NUMBER']);
				}
				if(strpos($c['Количество'], '.') !== false){
					parent::prepare_response(['error'=>'THE_QUANTITY_FIELD_MUST_CONTAIN_AN_INTEGER']);
				}
				if($c['Количество'] < 1){
					parent::prepare_response(['error'=>'FIELD_QUANTITY_MUST_BE_GREATER_THAN_ZERO']);
				}
				if($c['Количество'] > 10000000000){
					parent::prepare_response(['error'=>'FIELD_QUANTITY_SHOULD_NOT_BE_MORE_THAN_1_BILLION']);
				}
				$arr2['Количество'] = (int) $c['Количество'];
			}
			
			if(array_key_exists('ПроцентБонуса', $c) ){
				if(!is_numeric($c['ПроцентБонуса'])){
					parent::prepare_response(['error'=>'FIELD_BONUS_PERCENTAGE_MUST_BE_A_NUMBER']);
				}
				if($c['ПроцентБонуса'] > 100){
					parent::prepare_response(['error'=>'FIELD_BONUS_PERCENTAGE_CANNOT_BE_MORE_THAN_100']);
				}
				if($c['ПроцентБонуса'] < 0){
					parent::prepare_response(['error'=>'FIELD_BONUS_PERCENTAGE_CANNOT_BE_LESS_THAN_ZERO']);
				}
				$arr2['ПроцентБонуса'] = (float) $c['ПроцентБонуса'];
			}
			
			if(!array_key_exists('НоменклатураИД', $arr2)){
				parent::prepare_response(['error'=>'MISSING_ID_NOMENCLATURE_FIELD']);
			}
			
			if(!array_key_exists('ВидНоменклатурыИД', $arr2)){
				parent::prepare_response(['error'=>'MISSING_ID_NOMENCLATURE_TYPE_FIELD']);
			}
			
			if(!array_key_exists('Характеристика', $arr2)){
				parent::prepare_response(['error'=>'MISSING_LENGTH_FIELD']);
			}
			
			if( !array_key_exists('Количество', $arr2) ){
				parent::prepare_response(['error'=>'MISSING_QUANTITY_FIELD']);
			}
			
			if(!array_key_exists('ПроцентБонуса', $arr2)){
				parent::prepare_response(['error'=>'MISSING_BONUS_PERCENTAGE_FIELD']);
			}		
			
			$arr[] = $arr2;
			
		}
		
		$goods = $arr;
		$arr = [];
		
		foreach($goods_non_standard_addition as $c){
			
			$arr2 = [];
			
			if(array_key_exists('Описание', $c)){
				$arr2['Описание'] = mb_substr(htmlspecialchars($c['Описание'], ENT_QUOTES, $this->encoding), 0, 1000);
				if($arr2['Описание'] == ''){
					parent::prepare_response(['error'=>'FIELD_DESCRIPTION_MUST_BE_FILLED_IN']);
				}
			}
			
			if(array_key_exists('Количество', $c) ){
				if(!is_numeric($c['Количество'])){
					parent::prepare_response(['error'=>'FIELD_QUANTITY_MUST_BE_A_NUMBER']);
				}
				if(strpos($c['Количество'], '.') !== false){
					parent::prepare_response(['error'=>'THE_QUANTITY_FIELD_MUST_CONTAIN_AN_INTEGER']);
				}
				if($c['Количество'] < 1){
					parent::prepare_response(['error'=>'FIELD_QUANTITY_MUST_BE_GREATER_THAN_ZERO']);
				}
				if($c['Количество'] > 10000000000){
					parent::prepare_response(['error'=>'FIELD_QUANTITY_SHOULD_NOT_BE_MORE_THAN_1_BILLION']);
				}
				$arr2['Количество'] = (int) $c['Количество'];
			}

			if(!array_key_exists('Описание', $arr2)){
				parent::prepare_response(['error'=>'MISSING_DESCRIPTION_FIELD']);
			}
			
			if(!array_key_exists('Количество', $arr2)){
				parent::prepare_response(['error'=>'MISSING_QUANTITY_FIELD']);
			}
			
			$arr[] = $arr2;
			
		}
		
		$goods_non_standard_addition =  $arr;
		$arr = [];
		
		if(sizeof($goods_non_standard_addition) > 0){
			foreach($files_non_standard_addition as $c){
				
				$arr2 = [];
				
				if(array_key_exists('СсылкаНаФайл', $c)){
					$arr2['СсылкаНаФайл'] = mb_substr(htmlspecialchars($c['СсылкаНаФайл'], ENT_QUOTES, $this->encoding), 0, 128);
					if($arr2['СсылкаНаФайл'] == ''){
						parent::prepare_response(['error'=>'LINK_IS_NOT_FILLED_IN']);
					}
					$arr2['ИмяФайла'] = preg_replace('/.+\/(([^\/]+)\.('.implode('|', $this->config_project['allow_file_for_non_standard_addition']).'))/', '$1', $arr2['СсылкаНаФайл']);
				}
				
				if(!array_key_exists('СсылкаНаФайл', $arr2)){
					parent::prepare_response(['error'=>'MISSING_LINK_FIELD']);
				}
				
				$arr[] = $arr2;
				
			}
		}
		
		$files_non_standard_addition = $arr;

		parent::check_counterparty_id($main_counterparty_id, $counterparty_id);
		parent::check_shipping_warehouse_id($shipping_warehouse_id);
		
		if($orderlkid == ''){
			$orderlkid = parent::create_guid();
		}
		
		list($result, $err) = parent::post_request_to_api_1c('order_creation', ['id' => $orderlkid, 'counterparty_id' => $counterparty_id, 'is_cash_payment' => ($is_cash_payment == '1'), 'shipping_date' => $shipping_date, 'shipping_warehouse_id' => $shipping_warehouse_id, 'is_shipping' => ($is_shipping == '1'), 'delivery_address' => $delivery_address, 'delivery_address_id' => $delivery_address_id, 'goods' => $goods, 'goods_non_standard_addition' => $goods_non_standard_addition, 'files_non_standard_addition' => $files_non_standard_addition, 'comment' => $comment, 'based_on_cart' => '', 'token' => $token]);
		if($err){
			
				# пришлось написать этот дебильный кастыль, неспрашивайте зачем
				if($err == 'FAIL_SOCKET_CONNECT' || $err == 'CONNECTION_TIMEOUT'){
					try {
						DB::insert('UPDATE `orders_'.$main_counterparty_id.'` SET `orderlkid` = :orderlkid WHERE `order_id` = :draft_id AND `status` = \'draft\' LIMIT 1', ['orderlkid' => $orderlkid, 'draft_id' => $draft_id]);
					} catch (QueryException $e) {
						$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
						parent::log_er_mysql($err);
						parent::prepare_response(['error' => $err]);
					}
				}
				
			parent::prepare_response(['error'=>$err], true);
		}
		
		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}
		
		if(!array_key_exists('Номер', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Номер']);
		}
		
		if(!array_key_exists('Дата', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Дата']);
		}
		
		if(!array_key_exists('ЗаказПокупателяИД', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_ЗаказПокупателяИД']);
		}
		
		if(!array_key_exists('СуммаДокумента', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_СуммаДокумента']);
		}
		
		if(!array_key_exists('ДатаОтгрузки', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_ДатаОтгрузки']);
		}
		
		if(!array_key_exists('Вес', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Вес']);
		}

		try {
			DB::delete('DELETE FROM `orderslkid` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error' => $err]);
		}

		/* if($is_shipping == ''){
			$shipping_date = '';
		} */
		$date = mb_substr(htmlspecialchars($result['Дата'], ENT_QUOTES, $this->encoding), 0, 22);
		$timestamp_order = date('U', strtotime($date));
		if($timestamp_order < 0){$timestamp_order = 0;}
		$order_id = mb_substr(htmlspecialchars($result['ЗаказПокупателяИД'], ENT_QUOTES, $this->encoding), 0, 36);
		$order_number = (string) mb_substr(htmlspecialchars($result['Номер'], ENT_QUOTES, $this->encoding), 0, 11);
		$status = 'in_processing';
		$sum = mb_substr(htmlspecialchars($result['СуммаДокумента'], ENT_QUOTES, $this->encoding), 0, 20);
		$weight = (string) mb_substr(htmlspecialchars($result['Вес'], ENT_QUOTES, $this->encoding), 0, 32);
		$timestamp_shipments = ($shipping_date != '' ? date('U', strtotime($shipping_date)) : 0);
		if($timestamp_shipments < 0){$timestamp_shipments = 0;}
		$goods = parent::escape_unicode_decode(json_encode($goods));
		$goods_non_standard_addition = parent::escape_unicode_decode(json_encode($goods_non_standard_addition));
		$files_non_standard_addition = parent::escape_unicode_decode(json_encode($files_non_standard_addition));
		
		try{
			
			DB::insert('INSERT INTO `orders_'.$main_counterparty_id.'` (`date`, `timestamp_order`, `order_id`, `order_number`, `status`, `counterparty_id`, `sum`, `is_cash_payment`, `shipping_date`, `timestamp_shipments`, `shipping_warehouse_id`, `is_shipping`, `weight`, `delivery_address_id`, `client_id`, `goods`, `goods_non_standard_addition`, `files_non_standard_addition`, `comment`) values (:date, :timestamp_order, :order_id, :order_number, :status, :counterparty_id, :sum, :is_cash_payment, :shipping_date, :timestamp_shipments, :shipping_warehouse_id, :is_shipping, :weight, :delivery_address_id,  :client_id, :goods, AES_ENCRYPT(:goods_non_standard_addition, :aes_key), AES_ENCRYPT(:files_non_standard_addition, :aes_key2), AES_ENCRYPT(:comment, :aes_key3))', ['date' => $date, 'timestamp_order' => $timestamp_order, 'order_id' => $order_id, 'order_number' => $order_number, 'status' => $status, 'counterparty_id' => $counterparty_id, 'sum' => $sum, 'is_cash_payment' => $is_cash_payment, 'shipping_date' => $shipping_date, 'timestamp_shipments' => $timestamp_shipments, 'shipping_warehouse_id' => $shipping_warehouse_id, 'is_shipping' => $is_shipping, 'weight' => $weight, 'delivery_address_id' => $delivery_address_id, 'client_id' => $user_myid, 'goods' => $goods, 'goods_non_standard_addition' => $goods_non_standard_addition, 'aes_key' => $this->aes_key[0], 'files_non_standard_addition' => $files_non_standard_addition, 'aes_key2' => $this->aes_key[0], 'comment' => $comment, 'aes_key3' => $this->aes_key[0]]);
			
			DB::beginTransaction();
				
				# блокируем всю таблицу в рамках транзакции
				DB::select('SELECT COUNT(`id`) FROM `orders_'.$main_counterparty_id.'` FOR UPDATE');
				
				DB::delete('DELETE FROM `orders_'.$main_counterparty_id.'` WHERE `status` = \'draft\' AND `order_id` = :draft_id LIMIT 1', ['draft_id' => $draft_id]);
				
				$popular_statuses = parent::get_data_from_popular_statuses($main_counterparty_id);
				
				DB::update('UPDATE `orders_'.$main_counterparty_id.'` SET `popular_statuses` = :popular_statuses WHERE `id` = 1 LIMIT 1', ['popular_statuses' => $popular_statuses]);
			
			DB::commit();
			
			if(Schema::hasTable('commercial_offers_'.$user_myid)){
				DB::delete('DELETE FROM `commercial_offers_'.$user_myid.'` WHERE `draft_id` = :draft_id LIMIT 1', ['draft_id' => $draft_id]);
			}
		
		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}else{
				parent::prepare_response(['error'=>'NOT_FOUND_DRAFT']);
			}
			
		}
		
		if(sizeof($result) == 0){
			parent::prepare_response(['error'=>'NOT_FOUND_DRAFT']);
		}
		
		parent::prepare_response(['response' => 'ok']);
		
	}
	
}
