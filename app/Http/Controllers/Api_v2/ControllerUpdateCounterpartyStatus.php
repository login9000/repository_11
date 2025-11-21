<?php

namespace App\Http\Controllers\Api_v2;

use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerUpdateCounterpartyStatus extends Common{
	
	public function handler(Request $request){
		
		parent::check_allowed_method('PUT');
		
		$main_counterparty_id = ($request->input('ГоловнойКонтрагентИД') ?? '');
		$application_id = ($request->input('ЗаявкаИД') ?? '');
		$counterparty_id = ($request->input('КонтрагентИД') ?? '');
		
		$main_counterparty_id = trim(substr(preg_replace('/[^a-f0-9\-]/', '', $main_counterparty_id), 0, 36));
		$application_id = trim(substr(preg_replace('/[^a-f0-9\-]/', '', $application_id), 0, 36));
		$counterparty_id = trim(substr(preg_replace('/[^a-f0-9\-]/', '', $counterparty_id), 0, 36));
		
		if($main_counterparty_id === ''){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ГоловнойКонтрагентИД" пустое либо было некорректно заполнено')));
		}
		
		if($application_id === ''){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ЗаявкаИД" пустое либо было некорректно заполнено')));
		}

		if($counterparty_id === ''){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "КонтрагентИД" пустое либо было некорректно заполнено')));
		}
		
		try{
			
			if(!Schema::hasTable('counterparties_'.$main_counterparty_id)){
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Неудалось найти таблицу с данными для "ГоловнойКонтрагентИД" равного "'.$main_counterparty_id.'"')));
			}

			DB::beginTransaction();
				
				DB::select('SELECT `id` FROM `counterparties_'.$main_counterparty_id.'` WHERE `id` = 1 LIMIT 1 FOR UPDATE');
				
				$result = DB::select('SELECT `id` FROM `counterparties_'.$main_counterparty_id.'` WHERE `application_id` = :application_id LIMIT 1 FOR UPDATE', ['application_id' => $application_id]);
				if(sizeof($result) == 0){
					return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'ЗаявкаИД не найдена')));
				}
				
				$result = DB::select('SELECT `ids_row_update` FROM `counterparties_'.$main_counterparty_id.'` WHERE `id` = 1 LIMIT 1');
				$ids_row_update = '';
				
				foreach ($result as $row) {
					$ids_row_update = preg_replace('/,?'.$application_id.'/', '', $row->ids_row_update);
				}
				
				$ids_row_update = preg_replace('/^,/', '', $ids_row_update);
				$ids_row_update .= ','.$application_id;
				$ids_row_update = preg_replace('/^,/', '', $ids_row_update);
				
				DB::update('UPDATE `counterparties_'.$main_counterparty_id.'` SET `ids_row_update` = :ids_row_update WHERE `id` = 1 LIMIT 1', ['ids_row_update' => $ids_row_update]);
				DB::update('UPDATE `counterparties_'.$main_counterparty_id.'` SET `counterparty_id` = :counterparty_id, `application_id` = \'-\', `is_confirmed` = \'1\' WHERE `application_id` = :application_id LIMIT 1', ['counterparty_id' => $counterparty_id, 'application_id' => $application_id]);
			
			DB::commit();
			
		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			return json_encode(array('Ошибка'=>preg_replace('/\r?\n/', ' ', $err)));
			
		}
		
		return parent::escape_unicode_decode(json_encode(array('Сообщение'=>'Статус обновлен')));
		
	}
		
}
