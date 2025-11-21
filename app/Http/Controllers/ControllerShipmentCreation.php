<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerShipmentCreation extends Common{
	
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

		$is_delivery = ($data['is_delivery'] ?? '');
		$delivery_shipping_date = ($data['delivery_shipping_date'] ?? '');
		$interval_id = ($data['interval_id'] ?? '');
		$vehicle_id = ($data['vehicle_id'] ?? '');
		$comment = ($data['comment'] ?? '');
		$orders = ($data['orders'] ?? '');
		$delivery_address_id = ($data['delivery_address_id'] ?? '');
		
		// $is_delivery = ($request->input('is_delivery') ?? '');
		// $delivery_shipping_date = ($request->input('delivery_shipping_date') ?? '');
		// $interval_id = ($request->input('interval_id') ?? '');
		// $vehicle_id = ($request->input('vehicle_id') ?? '');
		// $comment = ($request->input('comments') ?? '');
		// $orders = ($request->input('orders') ?? '');
		// $delivery_address_id = ($request->input('delivery_address_id') ?? '');
		
		$is_delivery = trim(preg_replace('/[^0-9]/', '', mb_substr($is_delivery, 0, 1)));
		$delivery_shipping_date = trim(preg_replace('/[^0-9\-:T]/', '', mb_substr($delivery_shipping_date, 0, 19)));	
		$interval_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($interval_id, 0, 36)));
		$vehicle_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($vehicle_id, 0, 36)));
		$comment = trim(mb_substr(htmlspecialchars($comment, ENT_QUOTES, $this->encoding), 0, 1000));
		$delivery_address_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($delivery_address_id, 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}

		if(date('U', strtotime($delivery_shipping_date)) == 0){
			parent::prepare_response(['error'=>'FAIL_DELIVERY_SHIPPING_DATE']);
		}
		
		if($is_delivery != ''){
			$is_delivery = '1';
		}

		if($is_delivery == '' && $interval_id == ''){
			parent::prepare_response(['error'=>'NO_ESTIMATED_SHIPPING_TIME_SPECIFIED']);
		}
		
		if($is_delivery == '' && $vehicle_id == ''){
			parent::prepare_response(['error'=>'TRANSPORT_NOT_SPECIFIED']);
		}
		if($is_delivery == '1'){
			$vehicle_id = '';
		}
		if($is_delivery == '1' && $delivery_address_id == ''){
			parent::prepare_response(['error'=>'DELIVERY_ADDRESS_NOT_SPECIFIED']);
		}
		
		if(!is_array($orders)){
			parent::prepare_response(['error'=>'FIELD_ORDERS_MUST_BE_AN_ARRAY']);
		}
		
		$si = sizeof($orders);
		if($si > 1000){
			parent::prepare_response(['error'=>'LIMIT_MAX_COUNT_ORDERS', 'comment' => 1000]);
		}
		if($si == 0){
			parent::prepare_response(['error'=>'COUNT_ARRAY_ORDERS_IS_ZERO']);
		}
		
		$orders2 = [];
		$orders_ids = [];
		
		foreach($orders as $c){
			
			$arr = [];
			
			if(array_key_exists('order_id', $c)){
				$id = preg_replace('/[^a-f0-9\-]/', '', mb_substr($c['order_id'], 0, 36));
				$arr['ЗаказПокупателяИД'] = $id;
				$orders_ids[] = $id;
				if($arr['ЗаказПокупателяИД'] == ''){
					parent::prepare_response(['error'=>'ORDER_ID_IS_EMPTY_OR_NOT_FILLED_IN_CORRECTLY']);
				}
			}
			
			$arr['АдресДоставкиИД'] = ($is_delivery == '1' ? $delivery_address_id : '');
			
			if(!array_key_exists('ЗаказПокупателяИД', $arr) ){
				parent::prepare_response(['error'=>'MISSING_ORDER_ID_FIELD']);
			}
			
			$orders2[] = $arr;
			
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
		
		$order_ids_ = [];
		$arr = [];
		
		try{
			
			$orders_ids_2 = '';
			
			foreach ($orders_ids as $order_id){
				$orders_ids_2 .= '"'.$order_id.'",';
			}
			$orders_ids_2 = preg_replace('/,$/', '', $orders_ids_2);
			
			if(!Schema::hasTable('orders_'.$main_counterparty_id)){
				// вот этот говнокод пришлось написать потому что наш фронтендер - ленивая задница	
				parent::prepare_response(['error'=>'Не удалось найти таблицу с данными заказов ('.$main_counterparty_id.')']);
				//
			}
			
			$result = DB::select('SELECT `status`, `order_id` FROM `orders_'.$main_counterparty_id.'` WHERE `order_id` IN ('.$orders_ids_2.')');
			
			foreach ($result as $row){
				if($row->status != 'in_shipment'){
					$order_ids_[] = $row->order_id;
				}
				$arr[] = $row->order_id;
			}
			
			foreach ($orders_ids as $order_id){
				if(!in_array($order_id, $arr)){
					parent::prepare_response(['error'=>'NO_ORDERS_FOUND', 'comment'=>$order_id]);
				}
			}
						
			if(sizeof($order_ids_) == 0){
				parent::prepare_response(['error'=>'THESE_SHIPMENTS_HAVE_ALREADY_BEEN_CREATED_PREVIOUSLY']);
			}
			
			$arr = [];
			
			foreach ($orders2 as $c){
				if(in_array($c['ЗаказПокупателяИД'], $order_ids_)){
					$arr[] = $c;
				}
			}
			$orders2 = $arr;
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			} else{
				parent::prepare_response(['error'=>'NO_ORDERS_FOUND']);
			}
		}
		
		list($result, $err) = parent::post_request_to_api_1c('shipment_creation', ['delivery_shipping_date' => $delivery_shipping_date, 'is_delivery' => ($is_delivery == '1'), 'interval_id' => $interval_id, 'vehicle_id' => $vehicle_id, 'comment' => $comment, 'user_myid' => $user_myid, 'orders' => $orders2, 'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}

		if(!array_key_exists('ЗаявкаНаОтгрузкуИД', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_ЗаявкаНаОтгрузкуИД']);
		}
		
		$shipment_id = $result['ЗаявкаНаОтгрузкуИД'];
		
		list($result, $err) = parent::post_request_to_api_1c('get_shipment_details', ['shipment_id' => $shipment_id, 'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}
		
		if(!array_key_exists('ЗаявкаНаОтгрузкуИД', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_ЗаявкаНаОтгрузкуИД']);
		}
		
		if(!array_key_exists('ДатаОтгрузки', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_ДатаОтгрузки']);
		}

		if(!array_key_exists('Номер', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Номер']);
		}
		
		if(!array_key_exists('Заказы', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Заказы']);
		}
		
		$shipping_date = substr($result['ДатаОтгрузки'], 0, 19);
		$timestamp_shipments = date('U', strtotime(substr($result['ДатаОтгрузки'], 0, 19)));
		if($timestamp_shipments < 0){$timestamp_shipments = 0;}
		$shipment_id = preg_replace('/[^a-f0-9\-]/', '', mb_substr($result['ЗаявкаНаОтгрузкуИД'], 0, 36));
		$shipment_number = substr($result['Номер'], 0, 15);
		
		$orders2 = [];
		
		foreach($result['Заказы'] as $c){
			
			$arr = [];
			
			if(array_key_exists('АдресДоставкиИД', $c)){
				$arr['АдресДоставкиИД'] = preg_replace('/[^a-f0-9\-]/', '', mb_substr($c['АдресДоставкиИД'], 0, 36));
			}
			
			if(array_key_exists('СкладОтгрузкиИД', $c)){
				$arr['СкладОтгрузкиИД'] = preg_replace('/[^a-f0-9\-]/', '', mb_substr($c['СкладОтгрузкиИД'], 0, 36));
				if($arr['СкладОтгрузкиИД'] == ''){
					parent::prepare_response(['error'=>'СкладОтгрузкиИД_IS_EMPTY_OR_NOT_FILLED_IN_CORRECTLY']);
				}
			}
			
			if(array_key_exists('КонтрагентИД', $c)){
				$arr['КонтрагентИД'] = preg_replace('/[^a-f0-9\-]/', '', mb_substr($c['КонтрагентИД'], 0, 36));
				if($arr['КонтрагентИД'] == ''){
					parent::prepare_response(['error'=>'КонтрагентИД_IS_EMPTY_OR_NOT_FILLED_IN_CORRECTLY']);
				}
			}
			
			if(array_key_exists('СуммаДокумента', $c)){
				$arr['СуммаДокумента'] = $c['СуммаДокумента'];
				if($arr['СуммаДокумента'] == ''){
					parent::prepare_response(['error'=>'СуммаДокумента_IS_EMPTY_OR_NOT_FILLED_IN_CORRECTLY']);
				}
			}
			
			if(array_key_exists('Вес', $c)){
				$arr['Вес'] = $c['Вес'];
			}
			
			if(array_key_exists('ПользовательИД', $c)){
				$arr['ПользовательИД'] = preg_replace('/[^a-f0-9\-]/', '', mb_substr($c['ПользовательИД'], 0, 36));
				if($arr['ПользовательИД'] == ''){
					parent::prepare_response(['error'=>'ПользовательИД_IS_EMPTY_OR_NOT_FILLED_IN_CORRECTLY']);
				}
			}
			
			if(!array_key_exists('АдресДоставкиИД', $arr) ){
				parent::prepare_response(['error'=>'MISSING_ID_NOMENCLATURE_FIELD']);
			}
			
			if( !array_key_exists('СкладОтгрузкиИД', $arr) ){
				parent::prepare_response(['error'=>'MISSING_АдресДоставкиИД_FIELD']);
			}
			
			if( !array_key_exists('КонтрагентИД', $arr) ){
				parent::prepare_response(['error'=>'MISSING_КонтрагентИД_FIELD']);
			}
			
			if( !array_key_exists('СуммаДокумента', $arr) ){
				parent::prepare_response(['error'=>'MISSING_СуммаДокумента_FIELD']);
			}
			
			if( !array_key_exists('Вес', $arr) ){
				parent::prepare_response(['error'=>'MISSING_Вес_FIELD']);
			}
			
			if(!array_key_exists('ПользовательИД', $arr)){
				parent::prepare_response(['error'=>'MISSING_ПользовательИД_FIELD']);
			}
			
			$orders2[] = $arr;
			
		}
		
		if(!Schema::hasTable('shipments_'.$main_counterparty_id)){
			
			$mysqli = @new \mysqli(env('DB_HOST'), env('DB_USERNAME'), env('DB_PASSWORD'), env('DB_DATABASE'));		
			if($mysqli->connect_error) {
				$err = $mysqli->connect_error;
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}
		
			if(!$mysqli->query('CREATE TABLE `shipments_'.$main_counterparty_id.'` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, `shipping_date` char(22) NOT NULL DEFAULT \'\', `timestamp_shipments` int UNSIGNED NOT NULL DEFAULT 0, `shipment_id` char(36) NOT NULL DEFAULT \'\', `shipment_number` char(11) NOT NULL DEFAULT \'\', `status` enum(\'in_processing\',\'processed\',\'canceled\') NOT NULL DEFAULT \'in_processing\', `delivery_address_id` char(36) NOT NULL DEFAULT \'\', `shipping_warehouse_id` char(36) NOT NULL DEFAULT \'\', `counterparty_id` char(36) NOT NULL DEFAULT \'\', `sum` char(32) NOT NULL DEFAULT \'0\', `weight` char(32) NOT NULL DEFAULT \'0\', `responsible_sokrof` blob DEFAULT NULL, `client_id` char(36) NOT NULL DEFAULT \'\', `ids_row_update` text DEFAULT NULL, `comment` blob DEFAULT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;')){
				$err = $mysqli->error;
				if(strpos($err, 'already exists') === false){
					parent::log_er_mysql($err);
					parent::prepare_response(['error'=>$err]);
				}
			}else{
				if(!$mysqli->query('ALTER TABLE `shipments_'.$main_counterparty_id.'` ADD KEY `shipment_id_index` (`shipment_id`) USING BTREE')){
					$err = $mysqli->error;
					parent::log_er_mysql($err);
					parent::prepare_response(['error'=>$err]);		
				}
			}
		
			try{

				DB::beginTransaction();
					# блокируем всю таблицу в рамках транзакции
					DB::select('SELECT COUNT(`id`) FROM `shipments_'.$main_counterparty_id.'` FOR UPDATE');
					if(DB::table('shipments_'.$main_counterparty_id)->count('id') == 0){
						DB::insert('INSERT INTO `shipments_'.$main_counterparty_id.'` (`ids_row_update`) values (\'\')');
					}
				DB::commit();
				
			} catch (QueryException $e) {
				
				DB::rollBack();
				$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
				
			}
			
		}
		
		try{
			
			$arr = [];
			$arr2 = [];
			
			foreach($orders2 as $c){

				$shipping_warehouse_id = mb_substr(htmlspecialchars($c['СкладОтгрузкиИД'], ENT_QUOTES, $this->encoding), 0, 36);
				$counterparty_id = mb_substr(htmlspecialchars($c['КонтрагентИД'], ENT_QUOTES, $this->encoding), 0, 36);
				$sum = mb_substr(htmlspecialchars($c['СуммаДокумента'], ENT_QUOTES, $this->encoding), 0, 20);
				$weight = mb_substr(htmlspecialchars($c['Вес'], ENT_QUOTES, $this->encoding), 0, 32);
				
				if(!array_key_exists($shipment_number, $arr2)){
					$arr2[$shipment_number] = [];
				}
				
				$is_insert = true;
				$si = sizeof($arr2[$shipment_number]);
				for($i = 0; $i < $si; $i++){
					if($arr2[$shipment_number][$i]['shipping_warehouse_id'] == $shipping_warehouse_id && $arr2[$shipment_number][$i]['counterparty_id'] == $counterparty_id){
						$arr2[$shipment_number][$i]['sum'] += $sum;
						$arr2[$shipment_number][$i]['weight'] += $weight;
						$is_insert = false;
						break;
					}
				}
				if($is_insert){
					$arr2[$shipment_number][] = ['sum' => $sum, 'weight' => $weight, 'shipping_warehouse_id' => $shipping_warehouse_id, 'counterparty_id' => $counterparty_id];
				}
				
			}
			
			foreach($orders2 as $c){
				
				$delivery_address_id = mb_substr(htmlspecialchars($c['АдресДоставкиИД'], ENT_QUOTES, $this->encoding), 0, 36);
				$shipping_warehouse_id = mb_substr(htmlspecialchars($c['СкладОтгрузкиИД'], ENT_QUOTES, $this->encoding), 0, 36);
				$counterparty_id = mb_substr(htmlspecialchars($c['КонтрагентИД'], ENT_QUOTES, $this->encoding), 0, 36);
					
				if(!array_key_exists($shipment_number, $arr)){
					$arr[$shipment_number] = [];
				}
				
				$is_insert = true;
				foreach($arr[$shipment_number] as $c2){
					if($c2['shipping_warehouse_id'] == $shipping_warehouse_id && $c2['counterparty_id'] == $counterparty_id){
						$is_insert = false;
						break;
					}
				}
				
				if($is_insert){
					
					$sum = 0;
					$weight = 0;
					
					foreach($arr2[$shipment_number] as $c2){
						if($c2['shipping_warehouse_id'] == $shipping_warehouse_id && $c2['counterparty_id'] == $counterparty_id){
							$sum = $c2['sum'];
							$weight = $c2['weight'];
							break;
						}
					}
					
					$arr[$shipment_number][] = ['shipping_warehouse_id' => $shipping_warehouse_id, 'counterparty_id' => $counterparty_id];
			
					DB::insert('INSERT INTO `shipments_'.$main_counterparty_id.'` (`shipping_date`, `timestamp_shipments`, `shipment_id`, `shipment_number`, `delivery_address_id`, `shipping_warehouse_id`, `counterparty_id`, `sum`, `weight`, `client_id`, `comment`) values (:shipping_date, :timestamp_shipments, :shipment_id, :shipment_number, :delivery_address_id, :shipping_warehouse_id, :counterparty_id, :sum, :weight,  :client_id, AES_ENCRYPT(:comment, :aes_key))', ['shipping_date' => $shipping_date, 'timestamp_shipments' => $timestamp_shipments, 'shipment_id' => $shipment_id, 'shipment_number' => $shipment_number, 'delivery_address_id' => $delivery_address_id, 'shipping_warehouse_id' => $shipping_warehouse_id, 'counterparty_id' => $counterparty_id, 'sum' => $sum, 'weight' => $weight, 'client_id' => $user_myid, 'comment' => $comment, 'aes_key' => $this->aes_key[0]]);
				
				}
				
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}

		try{
			
			DB::beginTransaction();
				
				# блокируем всю таблицу в рамках транзакции
				DB::select('SELECT COUNT(`id`) FROM `orders_'.$main_counterparty_id.'` FOR UPDATE');
				
				$result = DB::select('SELECT `ids_row_update` FROM `orders_'.$main_counterparty_id.'` WHERE `id` = 1 LIMIT 1');
				$ids_row_update = '';
				
				foreach ($result as $row) {
					
					$ids_row_update = $row->ids_row_update;
					$orders_ids_ = '';
					$orders_ids_2 = '';
					
					foreach ($orders_ids as $order_id){
						$ids_row_update = preg_replace('/,?'.$order_id.'/', '', $ids_row_update);
						$orders_ids_ .= $order_id.',';
						$orders_ids_2 .= '"'.$order_id.'",';
					}
					$orders_ids_ = preg_replace('/,$/', '', $orders_ids_);
					$orders_ids_2 = preg_replace('/,$/', '', $orders_ids_2);

				}
				
				$ids_row_update = preg_replace('/^,/', '', $ids_row_update);
				$ids_row_update .= ','.$orders_ids_;
				$ids_row_update = preg_replace('/^,/', '', $ids_row_update);
				
				DB::update('UPDATE `orders_'.$main_counterparty_id.'` SET `status` = \'in_shipment\' WHERE `order_id` IN ('.$orders_ids_2.')');
				
				$popular_statuses = parent::get_data_from_popular_statuses($main_counterparty_id);
				
				DB::update('UPDATE `orders_'.$main_counterparty_id.'` SET `ids_row_update` = :ids_row_update, `popular_statuses` = :popular_statuses WHERE `id` = 1 LIMIT 1', ['ids_row_update' => $ids_row_update, 'popular_statuses' => $popular_statuses]);
			
			DB::commit();
			
		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			} else{
				parent::prepare_response(['error'=>'NO_ORDERS_FOUND']);
			}
			
		}
		
		parent::prepare_response(['response' => 'ok']);
		
	}
	
}
