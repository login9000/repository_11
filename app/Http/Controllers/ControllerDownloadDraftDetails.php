<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerDownloadDraftDetails extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$draft_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['draft_id'] ?? '', 0, 36)));
		
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

		$draft_number = '';
		$result = [];
		
		try{
			
			if(!Schema::hasTable('orders_'.$main_counterparty_id)){
				// вот этот говнокод пришлось написать потому что наш фронтендер - ленивая задница	
				parent::prepare_response(['error'=>'Не удалось найти таблицу с данными заказов ('.$main_counterparty_id.')']);
				//
			}
			
			$result = DB::select('SELECT `counterparty_id`, `order_number`, `shipping_warehouse_id`, `shipping_date`, `is_cash_payment`, `is_shipping`, `goods`, CONVERT(AES_DECRYPT(`goods_non_standard_addition`, :aes_key) USING utf8mb4) AS `goods_non_standard_addition`, CONVERT(AES_DECRYPT(`files_non_standard_addition`, :aes_key2) USING utf8mb4) AS `files_non_standard_addition`, `client_id`, CONVERT(AES_DECRYPT(`comment`, :aes_key3) USING utf8mb4) AS `comment` FROM `orders_'.$main_counterparty_id.'` WHERE `order_id` = :draft_id AND `status` = \'draft\' LIMIT 1', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'aes_key3' => $this->aes_key[0], 'draft_id' => $draft_id]);
			
			foreach ($result as $row) {
				$draft_number = $row->order_number;		
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}
		}
		
		if(sizeof($result) == 0){
			parent::prepare_response(['error'=>'NO_DRAFT_FOUND']);
		}
		
		$link = '/user_files/'.$user_myid.'/draft_details/draft_details_'.$draft_number.'_'.($this->time).'.pdf';
		
		list($draft_details, $commercial_offers, $err) = parent::prepare_result_draft_details($main_counterparty_id, $user_myid, $draft_id, $token, $result);
		
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		if(!is_dir($this->document_root.'/user_files/'.$user_myid)){
			mkdir($this->document_root.'/user_files/'.$user_myid, 0774);
		}
		
		if(!is_dir($this->document_root.'/user_files/'.$user_myid.'/draft_details')){
			mkdir($this->document_root.'/user_files/'.$user_myid.'/draft_details', 0774);
		}
		
		$counterparty_name = $draft_details['КонтрагентНаименование'];
		$calculation_type = ($draft_details['НаличнаяОплата'] == '1' ? 'Наличный расчет' : 'Безналичный расчет');
		$ready_date = $draft_details['ДатаГотовности'];
		$shipment_warehouse_name = $draft_details['СкладОтгрузкиНаименование'];
		$shipping_date = $draft_details['ДатаДоставки'];
		$weight = $draft_details['Вес'];
		$order_cost = $draft_details['СуммаДокумента'];
		$draft_details2 = $draft_details['Запасы'];

		$goods = [];
		$is_show_bonus_percentage = true;
		$is_show_percentage_discounts_surcharges = true;
		$i = 0;
		
		foreach($draft_details2 as $c){
			$i++;
			$goods[] = [(string) $i, $c['НоменклатураНаименование'], (string) $c['Характеристика'], (string) $c['ЕдиницаИзмеренияНаименования'], (string) $c['Количество'], (string) $c['Итого'], (string) $c['Наличие'], '-', (string) $c['Цена'], (string) $c['Сумма'], (string) $c['ПроцентБонуса'], (string) $c['ПроцентСкидкиНаценки']];
			if($c['ПроцентБонуса'] == 0 || $calculation_type != 'Наличный расчет'){
				$is_show_bonus_percentage = false;
			}
			if($c['ПроцентСкидкиНаценки'] == 0){
				$is_show_percentage_discounts_surcharges = false;
			}
		}
		
		array_unshift($goods , ['#', 'Номенклатура', 'Длина, мм', 'Ед. изм.', 'Кол-во', 'Итого', 'Наличие', 'Резерв', 'Цена, ₽', 'Сумма, ₽', 'Бонус, %', 'Скидка, %']);
		
		$arr = [];
		
		if(!$is_show_bonus_percentage){
			
			foreach($goods as $c){
				unset($c[10]);
				$arr[] = $c;
			}
			$goods = $arr;
			
		}

		$arr = [];
		
		if(!$is_show_percentage_discounts_surcharges){
			
			foreach($goods as $c){
				unset($c[11]);
				$arr[] = $c;
			}
			$goods = $arr;
			
		}
			
		list($result, $err) = parent::pdf_creator_service('draft_details', ['counterparty_name' => str_replace(['&quot;', '&lt;', '&gt;'], ['"', '<', '>'], $counterparty_name), 'calculation_type' => $calculation_type, 'ready_date' => $ready_date, 'shipment_warehouse_name' => str_replace(['&quot;', '&lt;', '&gt;'], ['"', '<', '>'], $shipment_warehouse_name), 'shipping_date' => $shipping_date, 'weight' => $weight, 'order_cost' => $order_cost, 'goods' => $goods], $link);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		// if(file_exists($this->document_root . $link)){
		// 	chmod($this->document_root . $link, 0664);
		// }
		
		parent::prepare_response(['response' => ['link' => $link]]);
		
	}
	
}
