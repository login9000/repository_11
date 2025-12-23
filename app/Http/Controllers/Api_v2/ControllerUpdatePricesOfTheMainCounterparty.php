<?php

namespace App\Http\Controllers\Api_v2;

use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerUpdatePricesOfTheMainCounterparty extends Common{
	
	public function handler(Request $request){
		
		parent::check_allowed_method('PUT');
		
		$data = ($request->input('Данные') ?? ''); 
		
		if($data === ''){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Данные" пустое')));
		}
		
		$main_counterparty_id = $data[0]['КонтрагентИД'];
		$data = json_encode($data, JSON_UNESCAPED_UNICODE);
		
		if(!$data){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Содержимое поля "Данные" не похоже на корректную json структуру')));
		}

		$mysqli = @new \mysqli(env('DB_HOST'), env('DB_USERNAME'), env('DB_PASSWORD'), env('DB_DATABASE'));		
		if($mysqli->connect_error) {
			$err = $mysqli->connect_error;
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
			
		if(!$mysqli->query('CREATE TABLE `prices_main_counterparty_'.$main_counterparty_id.'` (`id` tinyint NOT NULL DEFAULT 0, `data` longtext NOT NULL DEFAULT \'\') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4')){
			$err = $mysqli->error;
			if(strpos($err, 'already exists') === false){
			//###
			return '1...';
			//###
				try{
					DB::update('UPDATE `prices_main_counterparty_'.$main_counterparty_id.'` SET `data` = :data WHERE `id` = 1 LIMIT 1', ['data' => $data]);
				} catch (QueryException $e) {
					$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
					parent::log_er_mysql($err);
					return json_encode(array('Ошибка'=>preg_replace('/\r?\n/', ' ', $err)));
				}			
				
			}else{
			//###
			return '2...';
			//###
				try{
					DB::insert('INSERT INTO `prices_main_counterparty_'.$main_counterparty_id.'` (`id`, `data`) values (:id, :data)', ['id' => 1, 'data' => $data]);
				} catch (QueryException $e) {
					$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
					parent::log_er_mysql($err);
					return json_encode(array('Ошибка'=>preg_replace('/\r?\n/', ' ', $err)));
				}
				
			}
		}else{
			//###
			return '3...';
			//###
		}
		
		return parent::escape_unicode_decode(json_encode(array('Сообщение'=>'Загрузка завершилась успешно')));
		
	}
	
}
