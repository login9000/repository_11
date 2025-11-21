<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerDownloadCommercialOffer extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$commercial_offer_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['commercial_offer_id'] ?? '', 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($commercial_offer_id == ''){
			parent::prepare_response(['error'=>'COMMERCIAL_OFFER_ID_IS_EMPTY_OR_INCORRECT']);
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
		
		$recipient_of_the_commercial_offer = '';
		$commercial_offer_amount = '';
		$goods = [];
		$draft_id = '';
		$comment = '';
		
		try{
			$result = DB::select('SELECT `draft_id`, CONVERT(AES_DECRYPT(`recipient_of_the_commercial_offer`, :aes_key) USING utf8mb4) AS `recipient_of_the_commercial_offer`, `commercial_offer_amount`, `goods`, CONVERT(AES_DECRYPT(`comment`, :aes_key2) USING utf8mb4) AS `comment` FROM `commercial_offers_'.$user_myid.'` WHERE `commercial_offer_id` = :commercial_offer_id LIMIT 1', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'commercial_offer_id' => $commercial_offer_id]);
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}else{
				parent::prepare_response(['error'=>'NO_FOUND_COMMERCIAL_OFFER']);
			}
		}
		if(sizeof($result) == 0){
			parent::prepare_response(['error'=>'NO_FOUND_COMMERCIAL_OFFER']);
		}
		
		foreach ($result as $row) {
			$recipient_of_the_commercial_offer = $row->recipient_of_the_commercial_offer;
			$commercial_offer_amount = $row->commercial_offer_amount;
			$goods = json_decode($row->goods, true);
			$draft_id = $row->draft_id;
			$comment = $row->comment;
		}

		$order_number = '';
		$arr3 = [];
		
		try{
			
			if(!Schema::hasTable('orders_'.$main_counterparty_id)){
				// вот этот говнокод пришлось написать потому что наш фронтендер - ленивая задница	
				parent::prepare_response(['error'=>'Не удалось найти таблицу с данными заказов ('.$main_counterparty_id.')']);
				//
			}
			
			$result = DB::select('SELECT `goods`, `order_number` FROM `orders_'.$main_counterparty_id.'` WHERE `order_id` = :draft_id AND `status` = \'draft\' LIMIT 1', ['draft_id' => $draft_id]);
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}else{
				parent::prepare_response(['error'=>'NO_DRAFT_FOUND']);
			}
		}
		
		if(sizeof($result) == 0){
			parent::prepare_response(['error'=>'NO_DRAFT_FOUND']);
		}
			
		$product_catalog_data = parent::get_product_catalog();

		if(array_key_exists('error', $product_catalog_data)){
			parent::prepare_response(['error'=>$product_catalog_data['error']]);
		}
	
		$arr_product_catalog_id_data = [];
		foreach ($product_catalog_data['data'] as $c) {
			foreach ($c['Данные'] as $c2) {
				$arr_product_catalog_id_data[$c2['НоменклатураИД']] = [
					'КоличествоШтукВКомплекте' => $c2['КоличествоШтукВКомплекте'],
					'КоэффициентПересчетаКоличества' => $c2['КоэффициентПересчетаКоличества'],
					'ЗаполнятьХарактеристику' => $c2['ЗаполнятьХарактеристику'],
					'ПродаетсяКомплектами' => $c2['ПродаетсяКомплектами']
				];
			}
		}
			
		foreach ($result as $row) {
			$order_number = $row->order_number;
			$goods_ = json_decode($row->goods, true);
			foreach ($goods_ as $c) {
					
					$number_of_pieces_per_set = 0;
					$quantity_conversion_factor = 0;
					$fill_out_the_characteristics = false;
					$sold_in_sets = false;
						
					if(array_key_exists($c['НоменклатураИД'], $arr_product_catalog_id_data)){
						$number_of_pieces_per_set = $arr_product_catalog_id_data[$c['НоменклатураИД']]['КоличествоШтукВКомплекте'];
						$quantity_conversion_factor = $arr_product_catalog_id_data[$c['НоменклатураИД']]['КоэффициентПересчетаКоличества'];
						$fill_out_the_characteristics = $arr_product_catalog_id_data[$c['НоменклатураИД']]['ЗаполнятьХарактеристику'];
						$sold_in_sets = $arr_product_catalog_id_data[$c['НоменклатураИД']]['ПродаетсяКомплектами'];
					}
					
					if($fill_out_the_characteristics){
						if($c['Характеристика'] == ''){
							$total = (int) $c['Количество'] * 1 * $quantity_conversion_factor / 1000;
						}else{
							$total = (int) $c['Количество'] * $c['Характеристика'] * $quantity_conversion_factor / 1000;
						}
					}else if($sold_in_sets){
						$total = (int) $c['Количество'] * $number_of_pieces_per_set;
					}else{
						$total = (int) $c['Количество'];
					}
					
				$arr3[] = ['НоменклатураИД' => $c['НоменклатураИД'], 'Количество' => round($total, 2)];
			}
		}
		
		list($result2, $err) = parent::post_request_to_api_1c('weight_calculation', ['data' => $arr3, 'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}

		if(array_key_exists('Ошибка', $result2)){
			parent::prepare_response(['error'=>$result2['Ошибка']], true);
		}

		if(!array_key_exists('Вес', $result2)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Вес']);
		}
			
		$weight = $result2['Вес'];
			
		if(!is_dir($this->document_root.'/user_files/'.$user_myid)){
			mkdir($this->document_root.'/user_files/'.$user_myid, 0774);
		}

		if(!is_dir($this->document_root.'/user_files/'.$user_myid.'/commercial_offers')){
			mkdir($this->document_root.'/user_files/'.$user_myid.'/commercial_offers', 0774);
		}

		$link = '/user_files/'.$user_myid.'/commercial_offers/commercial_offer_'.$order_number.'_'.time().'.pdf';
		$goods2 = [];
		$i = 1;
		
		foreach($goods as $c){
			$goods2[] = [(string) $i, $c['name_nomenclature'], (string) $c['length'], (string) $c['unit'], (string) $c['quantity'], (string) $c['total'], (string) $c['its_own_price'], (string) $c['total_amount']];
			$i++;
		}
		
		array_unshift($goods2 , ['#', 'Номенклатура', 'Длина, мм', 'Ед. изм.', 'Кол-во', 'Итого', 'Цена получателя КП', 'Общая сумма, ₽']);
		
		list($result, $err) = parent::pdf_creator_service('commercial_offers', ['recipient_of_the_commercial_offer' => str_replace(['&quot;', '&lt;', '&gt;'], ['"', '<', '>'], $recipient_of_the_commercial_offer), 'weight' => round($weight, 2), 'commercial_offer_amount' => $commercial_offer_amount, 'comment' => $comment, 'goods' => $goods2], $link);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		// if(file_exists($this->document_root . $link)){
		// 	chmod($this->document_root . $link, 0664);
		// }
		
		parent::prepare_response(['response' => ['link' => $link]]);
		
	}
	
}
