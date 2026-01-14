<?php

namespace App\Http\Controllers\Api_v2;

use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerUpdateProductCatalog extends Common{
	
	public function handler(Request $request){
		
		parent::check_allowed_method('PUT');
		
		$data = ($request->input('Данные') ?? ''); 
		
		if ($data === '') {
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Данные" пустое')));
		}
		
		$data = json_encode($data, JSON_UNESCAPED_UNICODE);
		
		if(!$data){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Содержимое поля "Данные" не похоже на корректную json структуру')));
		}
		
		$product_catalog = parent::transformation_product_catalog(json_decode($data, true));
		
		$f = fopen($this->document_root.'/../public/product_catalog.json','a+');
		ftruncate($f, 0);
		stream_set_write_buffer($f, 0); 
		fwrite($f, json_encode($product_catalog, JSON_UNESCAPED_UNICODE));
		fflush($f);
		fclose($f);

		try{
			DB::update('UPDATE `product_catalog` SET `data` = :data WHERE `id` = 1 LIMIT 1', ['data' => $data]);
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			return json_encode(array('Ошибка'=>preg_replace('/\r?\n/', ' ', $err)));
		}
		
		return parent::escape_unicode_decode(json_encode(array('Сообщение'=>'Загрузка завершилась успешно')));
		
	}
	
}
