<?php

namespace App\Http\Controllers\Api_v2;

use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerUpdateCatalogItem extends Common {
	
	public function handler(Request $request) {

		parent::check_allowed_method('PUT');

		$data = ($request->input('Данные') ?? '');

		if ($data === '' || !is_array($data)) {
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Данные" пустое либо было некорректно заполнено')));
		}
		
		if(!array_key_exists('ОсновнойРазделИД', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ОсновнойРазделИД" отсуствует')));
		}
		$main_catalog_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['ОсновнойРазделИД'] ?? '', 0, 36)));
		if(empty($main_catalog_id)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ОсновнойРазделИД" пустое либо было некорректно заполнено')));
		}		
		
		if(!array_key_exists('СкладИД', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "СкладИД" отсуствует')));
		}
		$main_warehouse_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['СкладИД'] ?? '', 0, 36)));
		if(empty($main_warehouse_id)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "СкладИД" пустое либо было некорректно заполнено')));
		}		
		
		if(!array_key_exists('НоменклатураИД', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "НоменклатураИД" отсуствует')));
		}
		$id_nomenclature = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['НоменклатураИД'] ?? '', 0, 36)));
		if(empty($id_nomenclature)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "НоменклатураИД" пустое либо было некорректно заполнено')));
		}		
		
		$result = DB::select('SELECT `data` FROM `product_catalog` WHERE `id` = 1');
		
		if(sizeof($result) == 0){
			return parent::escape_unicode_decode(json_encode(['Ошибка' => 'Каталог пустой']));
		}
		
		foreach ($result as $row) {
			
			if(empty($row->data)){
				return parent::escape_unicode_decode(json_encode(['Ошибка' => 'Каталог пустой']));
			}
			
			$arr = json_decode($row->data, true);
			
			$element_exists = false;
			foreach ($arr as $index => $warehouse) {
					if ($warehouse['ОсновнойРазделИД'] == $main_catalog_id && $warehouse['СкладИД'] == $main_warehouse_id) {
							$warehouse_data = $warehouse['Данные'];
							foreach ($warehouse_data as $element) {
									if ($element['НоменклатураИД'] == $id_nomenclature) {
											$element_exists = true;
											break;
									}
							}
							if($element_exists){
								break;
							}
							if (!$element_exists) {
									unset($data['ОсновнойРазделИД']);
									unset($data['СкладИД']);
									$arr[$index]['Данные'][] = $data;
							}
					}
			}

			if ($element_exists) {
				return parent::escape_unicode_decode(json_encode(['Ошибка' => 'Номенклатура уже есть в каталоге']));
			}
			
			try{
				DB::update('UPDATE `product_catalog` SET `data` = :data WHERE `id` = 1', ['data' => json_encode($arr, JSON_UNESCAPED_UNICODE)]);
			} catch (QueryException $e) {
				$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
				parent::log_er_mysql($err);
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>$err)));
			}
			
			return parent::escape_unicode_decode(json_encode(['Сообщение' => 'Номенклатура добавлена в каталог']));
								
		}
		
	}

}