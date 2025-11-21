<?php

namespace App\Http\Controllers\Api_v2;

use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Schema;

class ControllerDeleteShipment extends Common {
	
	public function handler(Request $request) {
		
		parent::check_allowed_method('DELETE');

		$main_counterparty_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['main_counterparty_id'] ?? '', 0, 36)));
		$shipment_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['shipment_id'] ?? '', 0, 36)));
		
		if ($main_counterparty_id === '') {
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Параметр "main_counterparty_id" пуст либо был некорректно заполнен')));
		}
		
		if ($shipment_id === '') {
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Параметр "shipment_id" пуст либо был некорректно заполнен')));
		}

		if(!Schema::hasTable('shipments_'.$main_counterparty_id)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Такой "main_counterparty_id" отсуствует')));
		}

		try{
			
			DB::beginTransaction();
					
				$result = DB::select('SELECT `id` FROM `shipments_'.$main_counterparty_id.'` WHERE `shipment_id` = :shipment_id LIMIT 1 FOR UPDATE', ['shipment_id' => $shipment_id]);
				
				if(sizeof($result) == 0){
					return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Отгрузка с таким "shipment_id" не найдена')));
				}
				DB::delete('DELETE FROM `shipments_'.$main_counterparty_id.'` WHERE `shipment_id` = :shipment_id LIMIT 1', ['shipment_id' => $shipment_id]);
			
			DB::commit();
			
		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			return json_encode(array('Ошибка'=>preg_replace('/\r?\n/', ' ', $err)));
			
		}
		
		return parent::escape_unicode_decode(json_encode(['Сообщение' => 'Отгрузка удалена']));
		
	}
}