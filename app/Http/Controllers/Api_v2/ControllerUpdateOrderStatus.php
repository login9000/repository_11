<?php

namespace App\Http\Controllers\Api_v2;

use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerUpdateOrderStatus extends Common{
	
	public function handler(Request $request){
		
		parent::check_allowed_method('PUT');
		
		$user_myid = ($request->input('ПользовательИД') ?? '');
		$order_id = ($request->input('ЗаказПокупателяИД') ?? '');
		$status = ($request->input('Статус') ?? '');
		
		$user_myid = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($user_myid, 0, 36)));
		$order_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($order_id, 0, 36)));
		$status = trim(htmlspecialchars($status, ENT_QUOTES, $this->encoding));
		
		if($user_myid === ''){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ПользовательИД" пустое либо было некорректно заполнено')));
		}
		
		if($order_id === ''){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ЗаказПокупателяИД" пустое либо было некорректно заполнено')));
		}
		
		if(!in_array($status, ['НаОбработке', 'ТребуетПодтверждения', 'ВРаботе', 'ГотовКОтгрузке', 'Отгружен', 'ВОтгрузке', 'Отменен'])){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Статус" не корректно, возможные значения: "НаОбработке", "ТребуетПодтверждения", "ВРаботе", "ГотовКОтгрузке", "Отгружен", "ВОтгрузке", "Отменен"')));
		}
		
		$status = str_replace(['НаОбработке', 'ТребуетПодтверждения', 'ВРаботе', 'ГотовКОтгрузке', 'Отгружен', 'ВОтгрузке', 'Отменен'], ['in_processing', 'needs_confirmation', 'in_work', 'ready_for_shipment', 'shipped', 'in_shipment', 'canceled'], $status);
		
		try{

			$result = DB::select('SELECT `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			if(sizeof($result) == 0){
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Аккаунт пользователя не найден')));
			}
			foreach ($result as $row) {
				$main_counterparty_id = $row->main_counterparty_id;
			}
			
			if(!Schema::hasTable('orders_'.$main_counterparty_id)){
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Неудалось найти таблицу с данными заказов для "ГоловнойКонтрагентИД" равного "'.$main_counterparty_id.'"')));
			}
			
			DB::beginTransaction();
				
				# блокируем всю таблицу в рамках транзакции
				DB::select('SELECT COUNT(`id`) FROM `orders_'.$main_counterparty_id.'` FOR UPDATE');
				
				$result = DB::select('SELECT `ids_row_update` FROM `orders_'.$main_counterparty_id.'` WHERE `client_id` = :client_id AND `order_id` = :order_id LIMIT 1', ['client_id' => $user_myid, 'order_id' => $order_id]);
				
				if(sizeof($result) == 0){
					return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Заказ не найден')));
				}
				
				$ids_row_update = '';
				
				foreach ($result as $row) {
					$ids_row_update = preg_replace('/,?'.$order_id.'/', '', $row->ids_row_update);
				}
				
				$ids_row_update = preg_replace('/^,/', '', $ids_row_update);
				$ids_row_update .= ','.$order_id;
				$ids_row_update = preg_replace('/^,/', '', $ids_row_update);
				
				DB::update('UPDATE `orders_'.$main_counterparty_id.'` SET `status` = :status WHERE `client_id` = :client_id AND `order_id` = :order_id LIMIT 1', ['status' => $status, 'client_id' => $user_myid, 'order_id' => $order_id]);
				
				$popular_statuses = parent::get_data_from_popular_statuses($main_counterparty_id);
				
				DB::update('UPDATE `orders_'.$main_counterparty_id.'` SET `ids_row_update` = :ids_row_update, `popular_statuses` = :popular_statuses WHERE `id` = 1 LIMIT 1', ['ids_row_update' => $ids_row_update, 'popular_statuses' => $popular_statuses]);
			
			DB::commit();
			
		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') !== false){
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Заказ не найден')));
			}
			parent::log_er_mysql($err);
			return json_encode(array('Ошибка'=>preg_replace('/\r?\n/', ' ', $err)));
		
		}
		
		return parent::escape_unicode_decode(json_encode(array('Сообщение'=>'Статус обновлен')));
		
	}
		
}
