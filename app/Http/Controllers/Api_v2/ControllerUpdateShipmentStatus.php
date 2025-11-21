<?php

namespace App\Http\Controllers\Api_v2;

use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerUpdateShipmentStatus extends Common{
	
	public function handler(Request $request){
		
		parent::check_allowed_method('PUT');
		
		$user_myid = ($request->input('ПользовательИД') ?? '');
		$shipment_id = ($request->input('ЗаявкаНаОтгрузкуИД') ?? '');
		$status = ($request->input('Статус') ?? '');
		$orders_ids = ($request->input('ЗаказыПокупателяИД') ?? '');
		
		$user_myid = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($user_myid, 0, 36)));
		$shipment_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($shipment_id, 0, 36)));
		$status = trim(htmlspecialchars($status, ENT_QUOTES, $this->encoding));
		
		if($user_myid === ''){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ПользовательИД" пустое либо было некорректно заполнено')));
		}
		
		if($shipment_id === ''){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ЗаявкаНаОтгрузкуИД" пустое либо было некорректно заполнено')));
		}
		
		if(!in_array($status, ['Обработана', 'Отменена'])){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Статус" не корректно, возможные значения: "Обработана", "Отменена"')));
		}
		
		$status = str_replace(['Обработана', 'Отменена'], ['processed', 'canceled'], $status);
		
		$orders_ids2 = [];
		if($status == 'processed'){
				
			if(!is_array($orders_ids)){
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ЗаказыПокупателяИД" не является массивом')));
			}
			
			foreach($orders_ids as $order_id){
				$orders_ids2[] = preg_replace('/[^a-f0-9\-]/', '', mb_substr($order_id, 0, 36));
			}
			
			if(sizeof($orders_ids2) == 0){
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ЗаказыПокупателяИД" содержит пустой массив либо заполнено некорректными данными')));
			}
			
		}
		
		try{

			$result = DB::select('SELECT `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			if(sizeof($result) == 0){
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Аккаунт пользователя не найден')));
			}
			foreach ($result as $row) {
				$main_counterparty_id = $row->main_counterparty_id;
			}
			
			if(!Schema::hasTable('shipments_'.$main_counterparty_id)){
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Не удалось найти таблицу с данными отгрузок')));
			}
			
			$result = DB::select('SELECT `id` FROM `shipments_'.$main_counterparty_id.'` WHERE `client_id` = :client_id AND `shipment_id` = :shipment_id LIMIT 1', ['client_id' => $user_myid, 'shipment_id' => $shipment_id]);
			if(sizeof($result) == 0){
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Отгрузка не найдена')));
			}
			
			DB::beginTransaction();
				
				DB::select('SELECT `id` FROM `shipments_'.$main_counterparty_id.'` WHERE `client_id` = :client_id AND `shipment_id` = :shipment_id FOR UPDATE', ['client_id' => $user_myid, 'shipment_id' => $shipment_id]);
				
				$result = DB::select('SELECT `ids_row_update` FROM `shipments_'.$main_counterparty_id.'` WHERE `id` = 1 LIMIT 1 FOR UPDATE');
				$ids_row_update = '';
				
				foreach ($result as $row) {
					$ids_row_update = preg_replace('/,?'.$shipment_id.'/', '', $row->ids_row_update);
				}
				
				$ids_row_update = preg_replace('/^,/', '', $ids_row_update);
				$ids_row_update .= ','.$shipment_id;
				$ids_row_update = preg_replace('/^,/', '', $ids_row_update);
				
				DB::update('UPDATE `shipments_'.$main_counterparty_id.'` SET `ids_row_update` = :ids_row_update WHERE `id` = 1 LIMIT 1', ['ids_row_update' => $ids_row_update]);
				DB::update('UPDATE `shipments_'.$main_counterparty_id.'` SET `status` = :status WHERE `client_id` = :client_id AND `shipment_id` = :shipment_id', ['status' => $status, 'client_id' => $user_myid, 'shipment_id' => $shipment_id]);
			
			DB::commit();
			
			if($status == 'processed'){
			
				if(Schema::hasTable('orders_'.$main_counterparty_id)){
					
					DB::beginTransaction();
						
						# блокируем всю таблицу в рамках транзакции
						DB::select('SELECT COUNT(`id`) FROM `orders_'.$main_counterparty_id.'` FOR UPDATE');
						
						$result = DB::select('SELECT `ids_row_update` FROM `orders_'.$main_counterparty_id.'` WHERE `id` = 1 LIMIT 1');
						$ids_row_update = '';

						foreach ($result as $row) {
							
							$ids_row_update = $row->ids_row_update;
							$orders_ids_ = '';
							$orders_ids_2 = '';
							
							foreach($orders_ids2 as $order_id){
								$ids_row_update = preg_replace('/,?'.$order_id.'/', '', $ids_row_update);
								$orders_ids_ .= $order_id.',';
								$orders_ids_2 .= '"'.preg_replace('/[^a-f0-9\-]/', '', mb_substr($order_id, 0, 36)).'",';
							}
							$orders_ids_ = preg_replace('/,$/', '', $orders_ids_);
							$orders_ids_2 = preg_replace('/,$/', '', $orders_ids_2);
							
						}
						
						$ids_row_update = preg_replace('/^,/', '', $ids_row_update);
						$ids_row_update .= ','.$orders_ids_;
						$ids_row_update = preg_replace('/^,/', '', $ids_row_update);
					
						DB::update('UPDATE `orders_'.$main_counterparty_id.'` SET `status` = \'shipped\' WHERE `client_id` = :client_id AND `order_id` IN ('.$orders_ids_2.')', ['client_id' => $user_myid]);
						
						$popular_statuses = parent::get_data_from_popular_statuses($main_counterparty_id);
						
						DB::update('UPDATE `orders_'.$main_counterparty_id.'` SET `ids_row_update` = :ids_row_update, `popular_statuses` = :popular_statuses WHERE `id` = 1 LIMIT 1', ['ids_row_update' => $ids_row_update, 'popular_statuses' => $popular_statuses]);
						
					DB::commit();
				
				}
			
			}
			
		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') !== false){
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Отгрузка не найдена')));
			}
			parent::log_er_mysql($err);
			return json_encode(array('Ошибка'=>preg_replace('/\r?\n/', ' ', $err)));
			
		}
		
		return parent::escape_unicode_decode(json_encode(array('Сообщение'=>'Статус обновлен')));
		
	}
		
}
