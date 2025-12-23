<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerDownloadFinishedProducts extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$shipping_warehouse_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['shipping_warehouse_id'] ?? '', 0, 36)));
		$products = trim(mb_substr(htmlspecialchars($_GET['products'] ?? '', ENT_QUOTES, $this->encoding), 0, 128));
		$profile = trim(mb_substr(htmlspecialchars($_GET['profile'] ?? '', ENT_QUOTES, $this->encoding), 0, 128));
		$thickness = trim(mb_substr(htmlspecialchars($_GET['thickness'] ?? '', ENT_QUOTES, $this->encoding), 0, 128));
		$coating = trim(mb_substr(htmlspecialchars($_GET['coating'] ?? '', ENT_QUOTES, $this->encoding), 0, 128));
		$color = trim(mb_substr(htmlspecialchars($_GET['color'] ?? '', ENT_QUOTES, $this->encoding), 0, 128));
		$file_format = trim(preg_replace('/[^a-z]/', '', $_GET['file_format'] ?? ''));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($shipping_warehouse_id == ''){
			parent::prepare_response(['error'=>'SHIPPING_WAREHOUSE_NOT_SELECTED']);
		}

		if(!in_array($file_format, ['pdf', 'xlsx'])){
			parent::prepare_response(['error'=>'FILE_FORMAT_IS_EMPTY_OR_INCORRECT']);
		}
		
		$link = '';
		$file_size = 0;
		$main_counterparty_id = '';
		
		try{

			$result = DB::select('SELECT `expires_token`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				$main_counterparty_id = $row->main_counterparty_id;
				
			}

		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		list($result, $err) = parent::prepare_result_finished_products($main_counterparty_id, $shipping_warehouse_id, $products, $profile, $thickness, $coating, $color);		
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		$finished_products_data = [];
		$actual_date = $result['actual_date'];
		
		foreach($result['data'] as $c){
			
			$total = (string) $c['Итого'];
			
			$prices = '';
			foreach($c['Цена'] as $c2){
				$prices .= $c2.' ';
			}
			$prices = preg_replace('/ $/', '', $prices);
		
			$finished_products_data[] = [$c['НоменклатураНаименование'], $c['Характеристика'], $c['ЕдиницаИзмеренияНаименования'], (string) $c['Количество'], ($total == -1 ? '-' : $total), $prices, (string) $c['Сумма']];
			
		}
		
		array_unshift($finished_products_data , ['Номенклатура', 'Длина, мм', 'Ед.Изм.', 'Кол-во', 'Итого', 'Цена', 'Сумма, ₽']);
		
		if(!is_dir($this->document_root.'/user_files/'.$user_myid)){
			mkdir($this->document_root.'/user_files/'.$user_myid, 0774);
		}

		if(!is_dir($this->document_root.'/user_files/'.$user_myid.'/finished_products')){
			mkdir($this->document_root.'/user_files/'.$user_myid.'/finished_products', 0774);
		} 

		$shipment_warehouses_data = parent::get_shipment_warehouses();

		if(array_key_exists('error', $shipment_warehouses_data)){
			parent::prepare_response(['error'=>$shipment_warehouses_data['error']]);
		}
		
		$arr_shipment_warehouses_id_name = [];
		foreach ($shipment_warehouses_data['data'] as $c) {
			$arr_shipment_warehouses_id_name[$c['СкладИД']] = $c['Наименование'];
		}
		
		$shipping_warehouse_name = '';
		if(array_key_exists($shipping_warehouse_id, $arr_shipment_warehouses_id_name)){
			$shipping_warehouse_name = $arr_shipment_warehouses_id_name[$shipping_warehouse_id];
		}
		
		$data = ['shipping_warehouse_name' => str_replace(['&quot;', '&lt;', '&gt;'], ['"', '<', '>'], $shipping_warehouse_name), 'products' => $products, 'profile' => $profile, 'thickness' => $thickness, 'coating' => $coating, 'color' => $color, 'actual_date' => parent::convert_format_date3($actual_date), 'finished_products' => $finished_products_data];
		
		if($file_format == 'pdf'){
			
			$link = '/user_files/'.$user_myid.'/finished_products/finished_products_'.str_replace(':', '.', $actual_date).'_'.($this->time).'.pdf';
			
			list($result, $err) = parent::pdf_creator_service('finished_products', $data, $link);
			if($err){
				parent::prepare_response(['error'=>$err]);
			}

		}
		
		if($file_format == 'xlsx'){
			
			$link = '/user_files/'.$user_myid.'/finished_products/finished_products_'.str_replace(':', '.', $actual_date).'_'.($this->time).'.xlsx';
			
			list($result, $err) = parent::xlsx_creator_service('finished_products', $data, $link);
			if($err){
				parent::prepare_response(['error'=>$err]);
			}
		
		}
				
		if(file_exists($this->document_root . $link)){
			$file_size = filesize($this->document_root . $link);
		 // 		chmod($this->document_root . $link, 0664);
		}
		
		parent::prepare_response(['response' => ['file_size' => $file_size, 'link' => $link]]);
		
	}
	
}
