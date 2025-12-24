<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerCommercialOffersEditOrCreation extends Common{
	
	public function __invoke(Request $request){

		parent::check_allowed_method('POST');
		
		$err = parent::validate_fields('other', $request);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}		
		
		list($data, $err) = parent::handler_data_crypt($request);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}

		$act = ($data['act'] ?? '');
		$draft_id = ($data['draft_id'] ?? '');
		$commercial_offer_id = ($data['commercial_offer_id'] ?? '');
		$recipient_of_the_commercial_offer = ($data['recipient_of_the_commercial_offer'] ?? '');
		$markup_type = ($data['markup_type'] ?? '');
		$markup_percentage = ($data['markup_percentage'] ?? '');
		$goods = ($data['goods'] ?? '');
		$comment = ($data['comment'] ?? '');
		$commercial_offer_amount = ($data['commercial_offer_amount'] ?? '');
		$is_print = ($data['is_print'] ?? '');

		// $act = ($request->input('act') ?? '');
		// $draft_id = ($request->input('draft_id') ?? '');
		// $commercial_offer_id = ($request->input('commercial_offer_id') ?? '');
		// $recipient_of_the_commercial_offer = ($request->input('recipient_of_the_commercial_offer') ?? '');
		// $markup_type = ($request->input('markup_type') ?? '');
		// $markup_percentage = ($request->input('markup_percentage') ?? '');
		// $goods = ($request->input('goods') ?? '');
		// $comment = ($request->input('comment') ?? '');
		// $commercial_offer_amount = ($request->input('commercial_offer_amount') ?? '');
		// $is_print = ($request->input('is_print') ?? '');
		
		$draft_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($draft_id, 0, 36)));
		$commercial_offer_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($commercial_offer_id, 0, 36)));
		$recipient_of_the_commercial_offer = trim(mb_substr(htmlspecialchars($recipient_of_the_commercial_offer, ENT_QUOTES, $this->encoding), 0, 128));
		$markup_percentage = trim(preg_replace('/[^0-9\.]/', '', mb_substr($markup_percentage, 0, 5)));
		$comment = trim(mb_substr(htmlspecialchars($comment, ENT_QUOTES, $this->encoding), 0, 1000));
		$commercial_offer_amount = trim(preg_replace('/[^0-9\.]/', '', mb_substr($commercial_offer_amount, 0, 35)));
		$is_print = trim(preg_replace('/[^0-9]/', '', mb_substr($is_print, 0, 1)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if(!in_array($act, ['edit', 'creation'])){
			parent::prepare_response(['error'=>'FAIL_ACT']);
		}
		
		if($act == 'edit' && $commercial_offer_id == ''){
			parent::prepare_response(['error'=>'COMMERCIAL_OFFER_ID_IS_EMPTY_OR_INCORRECT']);
		}
		
		if($draft_id == ''){
			parent::prepare_response(['error'=>'DRAFT_ID_IS_EMPTY_OR_INCORRECT']);
		}

		if($recipient_of_the_commercial_offer == ''){
			parent::prepare_response(['error'=>'RECIPIENT_OF_THE_COMMERCIAL_OFFER_IS_NOT_FILLED_IN']);
		}

		if($commercial_offer_amount === '' || !is_numeric($commercial_offer_amount) || $commercial_offer_amount < 0){
			parent::prepare_response(['error'=>'COMMERCIAL_OFFER_AMOUNT_IS_EMPTY_OR_INCORRECT']);
		}
		
		if($markup_type == ''){
			$markup_type = 'manual';
		}
		
		if(!in_array($markup_type, ['manual', 'total_percentage_of_price'])){
			parent::prepare_response(['error'=>'FAIL_MARKUP_TYPE']);
		}
		
		if(($markup_type == 'total_percentage_of_price') && (!is_numeric($markup_percentage) || $markup_percentage === '' || $markup_percentage < 0)){
			parent::prepare_response(['error'=>'MARKUP_PERCENTAGE_IS_EMPTY_OR_INCORRECT']);
		}
		if($markup_type != 'total_percentage_of_price'){
			$markup_percentage = 0;
		}
		
		if(!is_array($goods)){
			parent::prepare_response(['error'=>'FIELD_GOODS_MUST_BE_AN_ARRAY']);
		}
		
		$si = sizeof($goods);
		if($si == 0){
			parent::prepare_response(['error'=>'COUNT_ARRAY_GOODS_IS_ZERO']);
		}
		
		$arr = [];
		
		foreach($goods as $c){
			
			$arr2 = [];

			if(array_key_exists('id_nomenclature', $c)){
				$arr2['id_nomenclature'] = preg_replace('/[^a-f0-9\-]/', '', mb_substr($c['id_nomenclature'], 0, 36));
				if($arr2['id_nomenclature'] == ''){
					parent::prepare_response(['error'=>'ID_NOMENCLATURE_IS_EMPTY_OR_NOT_FILLED_IN_CORRECTLY']);
				}
			}
			
			if(array_key_exists('name_nomenclature', $c)){
				$arr2['name_nomenclature'] = mb_substr(htmlspecialchars($c['name_nomenclature'], ENT_QUOTES, $this->encoding), 0, 255);
				if($arr2['name_nomenclature'] == ''){
					parent::prepare_response(['error'=>'NAME_NOMENCLATURE_IS_EMPTY_OR_NOT_FILLED_IN_CORRECTLY']);
				}
			}
			
			if(array_key_exists('length', $c)){
				if($c['length'] != ''){
					if(!is_numeric($c['length'])){
						parent::prepare_response(['error'=>'FIELD_LENGTH_MUST_BE_A_NUMBER']);
					}
					if($c['length'] <= 0){
						parent::prepare_response(['error'=>'FIELD_LENGTH_MUST_BE_GREATER_THAN_ZERO']);
					}
				}
				$arr2['length'] = (string) $c['length'];
			}
			
			if(array_key_exists('unit', $c)){
				$arr2['unit'] = mb_substr(htmlspecialchars($c['unit'], ENT_QUOTES, $this->encoding), 0, 8);
				if($arr2['unit'] == ''){
					parent::prepare_response(['error'=>'UNIT_IS_EMPTY_OR_NOT_FILLED_IN_CORRECTLY']);
				}
			}
			
			if(array_key_exists('quantity', $c)){
				if(!is_numeric($c['quantity'])){
					parent::prepare_response(['error'=>'FIELD_QUANTITY_MUST_BE_A_NUMBER']);
				}
				if(strpos($c['quantity'], '.') !== false){
					parent::prepare_response(['error'=>'THE_QUANTITY_FIELD_MUST_CONTAIN_AN_INTEGER']);
				}
				if($c['quantity'] < 1){
					parent::prepare_response(['error'=>'FIELD_QUANTITY_MUST_BE_GREATER_THAN_ZERO']);
				}
				$arr2['quantity'] = $c['quantity'];
			}
			
			if(array_key_exists('total', $c)){
				if($c['total'] != '-'){
					if(!is_numeric($c['total'])){
						parent::prepare_response(['error'=>'FIELD_TOTAL_MUST_BE_A_NUMBER']);
					}
					if($c['total'] < 0){
						parent::prepare_response(['error'=>'FIELD_TOTAL_MUST_BE_GREATER_THAN_ZERO']);
					}
				}
				$arr2['total'] = $c['total'];
			}
			
			if(array_key_exists('total_amount', $c)){
				if(!is_numeric($c['total_amount'])){
					parent::prepare_response(['error'=>'FIELD_TOTAL_AMOUNT_MUST_BE_A_NUMBER']);
				}
				if($c['total_amount'] < 0){
					parent::prepare_response(['error'=>'FIELD_TOTAL_AMOUNT_MUST_BE_GREATER_THAN_ZERO']);
				}
				$arr2['total_amount'] = $c['total_amount'];
			}
			
			if(array_key_exists('sum', $c)){
				if(!is_numeric($c['sum'])){
					parent::prepare_response(['error'=>'FIELD_SUM_MUST_BE_A_NUMBER']);
				}
				if($c['sum'] < 0){
					parent::prepare_response(['error'=>'FIELD_SUM_MUST_BE_GREATER_THAN_ZERO']);
				}
				$arr2['sum'] = $c['sum'];
			}
			
			if(array_key_exists('bonus', $c)){
				if(!is_numeric($c['bonus'])){
					parent::prepare_response(['error'=>'FIELD_BONUS_MUST_BE_A_NUMBER']);
				}
				if($c['bonus'] < 0){
					parent::prepare_response(['error'=>'FIELD_BONUS_MUST_BE_GREATER_THAN_ZERO']);
				}
				$arr2['bonus'] = $c['bonus'];
			}

			if(array_key_exists('discount', $c)){
				if(!is_numeric($c['discount'])){
					parent::prepare_response(['error'=>'FIELD_DISCOUNT_MUST_BE_A_NUMBER']);
				}
				if($c['discount'] < 0){
					parent::prepare_response(['error'=>'FIELD_DISCOUNT_MUST_BE_GREATER_THAN_ZERO']);
				}
				$arr2['discount'] = $c['discount'];
			}

			if(array_key_exists('price', $c)){
				if($c['price'] != '-'){
					if(!is_numeric($c['price'])){
						parent::prepare_response(['error'=>'FIELD_PRICE_MUST_BE_A_NUMBER']);
					}
					if($c['price'] < 0){
						parent::prepare_response(['error'=>'FIELD_PRICE_MUST_BE_GREATER_THAN_ZERO']);
					}
				}
				$arr2['price'] = $c['price'];
			}
			
			if(array_key_exists('its_own_price', $c)){
				if(!is_numeric($c['its_own_price'])){
					parent::prepare_response(['error'=>'FIELD_ITS_OWN_PRICE_MUST_BE_A_NUMBER']);
				}
				if($c['its_own_price'] < 0){
					parent::prepare_response(['error'=>'FIELD_ITS_OWN_PRICE_MUST_NOT_BE_LESS_THAN_ZERO']);
				}
				if($c['its_own_price'] > 10000000000){
					parent::prepare_response(['error'=>'FIELD_ITS_OWN_PRICE_SHOULD_NOT_BE_MORE_THAN_1_BILLION']);
				}
				$arr2['its_own_price'] = round((float) $c['its_own_price'], 2);
			}
			
			if(!array_key_exists('id_nomenclature', $arr2)){
				parent::prepare_response(['error'=>'MISSING_ID_NOMENCLATURE_FIELD']);
			}
			
			if(!array_key_exists('price', $arr2)){
				parent::prepare_response(['error'=>'MISSING_VIEW_PRICE_FIELD']);
			}
			
			if(!array_key_exists('bonus', $arr2)){
				parent::prepare_response(['error'=>'MISSING_VIEW_BONUS_FIELD']);
			}
			
			if(!array_key_exists('discount', $arr2)){
				parent::prepare_response(['error'=>'MISSING_VIEW_DISCOUNT_FIELD']);
			}
			
			if(!array_key_exists('total_amount', $arr2)){
				parent::prepare_response(['error'=>'MISSING_VIEW_TOTAL_AMOUNT_FIELD']);
			}
			
			if(!array_key_exists('sum', $arr2)){
				parent::prepare_response(['error'=>'MISSING_VIEW_SUM_FIELD']);
			}
			
			if(!array_key_exists('total', $arr2)){
				parent::prepare_response(['error'=>'MISSING_VIEW_TOTAL_FIELD']);
			}
			
			if(!array_key_exists('quantity', $arr2)){
				parent::prepare_response(['error'=>'MISSING_VIEW_QUANTITY_FIELD']);
			}
			
			if(!array_key_exists('unit', $arr2)){
				parent::prepare_response(['error'=>'MISSING_VIEW_UNIT_FIELD']);
			}
			
			if(!array_key_exists('length', $arr2)){
				parent::prepare_response(['error'=>'MISSING_VIEW_LENGTH_FIELD']);
			}
			
			if(!array_key_exists('name_nomenclature', $arr2)){
				parent::prepare_response(['error'=>'MISSING_VIEW_NAME_NOMENCLATURE_FIELD']);
			}
			
			if(!array_key_exists('its_own_price', $arr2)){
				parent::prepare_response(['error'=>'MISSING_ITS_OWN_PRICE_FIELD']);
			}
			
			$arr[] = $arr2;
			
		}
		
		$goods = $arr;
		
		if($is_print != ''){
			$is_print = '1';
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

		$result = [];
		$order_number = '';
		$arr3 = [];
		
		try{
			
			if(!Schema::hasTable('orders_'.$main_counterparty_id)){
				parent::prepare_response(['error'=>'NO_DRAFT_FOUND']);
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
		
		if($is_print == '1'){
			
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
		
		}
		
		if($act == 'edit'){
			
			try{
				$result = DB::select('SELECT `id` FROM `commercial_offers_'.$user_myid.'` WHERE `commercial_offer_id` = :commercial_offer_id LIMIT 1', ['commercial_offer_id' => $commercial_offer_id]);
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
		
		}
		
		if($act == 'creation'){
			
			$mysqli = @new \mysqli(env('DB_HOST'), env('DB_USERNAME'), env('DB_PASSWORD'), env('DB_DATABASE'));		
			if($mysqli->connect_error) {
				$err = $mysqli->connect_error;
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}
			
			if(!$mysqli->query('CREATE TABLE `commercial_offers_'.$user_myid.'` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, `date` char(22) NOT NULL DEFAULT \'\', `draft_id` char(36) NOT NULL DEFAULT \'\', `commercial_offer_id` char(36) NOT NULL DEFAULT \'\', `recipient_of_the_commercial_offer` tinyblob DEFAULT NULL, `markup_type` enum(\'manual\',\'total_percentage_of_price\') NOT NULL DEFAULT \'manual\', `markup_percentage` char(5) NOT NULL DEFAULT \'\', `goods` text NOT NULL, `commercial_offer_amount` char(35) NOT NULL DEFAULT \'\', `comment` blob DEFAULT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;')){
				$err = $mysqli->error;
				if(strpos($err, 'already exists') === false){
					parent::log_er_mysql($err);
					parent::prepare_response(['error'=>$err]);
				}
			}else{
				if(!$mysqli->query('ALTER TABLE `commercial_offers_'.$user_myid.'` ADD KEY `commercial_offer_id_index` (`commercial_offer_id`) USING BTREE')){
					$err = $mysqli->error;
					parent::log_er_mysql($err);
					parent::prepare_response(['error'=>$err]);		
				}
			}
			
			$commercial_offer_id = parent::create_guid();
		
		}
		
		$date = preg_replace('/(\+|\-)[0-9]{2}:[0-9]{2}$/', '', date('c', $this->time));
		$goods_ = parent::escape_unicode_decode(json_encode($goods));
		$markup_percentage = (string) round((float) $markup_percentage, 1);
		
		try{
			
			if($act == 'edit'){
				DB::update('UPDATE `commercial_offers_'.$user_myid.'` SET `recipient_of_the_commercial_offer` = AES_ENCRYPT(:recipient_of_the_commercial_offer, :aes_key), `markup_type` = :markup_type, `markup_percentage` = :markup_percentage, `goods` = :goods, `commercial_offer_amount` = :commercial_offer_amount, `comment` = AES_ENCRYPT(:comment, :aes_key2) WHERE `commercial_offer_id` = :commercial_offer_id LIMIT 1', ['recipient_of_the_commercial_offer' => $recipient_of_the_commercial_offer, 'aes_key' => $this->aes_key[0], 'markup_type' => $markup_type, 'markup_percentage' => $markup_percentage, 'goods' => $goods_, 'commercial_offer_amount' => $commercial_offer_amount, 'comment' => $comment, 'aes_key2' => $this->aes_key[0], 'commercial_offer_id' => $commercial_offer_id]);
			}
			
			if($act == 'creation'){
				DB::insert('INSERT INTO `commercial_offers_'.$user_myid.'` (`date`, `draft_id`, `commercial_offer_id`, `recipient_of_the_commercial_offer`, `markup_type`, `markup_percentage`, `goods`, `commercial_offer_amount`, `comment`) values (:date, :draft_id, :commercial_offer_id, AES_ENCRYPT(:recipient_of_the_commercial_offer, :aes_key), :markup_type, :markup_percentage, :goods, :commercial_offer_amount, AES_ENCRYPT(:comment, :aes_key2))', ['date' => $date, 'draft_id' => $draft_id, 'commercial_offer_id' => $commercial_offer_id, 'recipient_of_the_commercial_offer' => $recipient_of_the_commercial_offer, 'aes_key' => $this->aes_key[0], 'markup_type' => $markup_type, 'markup_percentage' => $markup_percentage, 'goods' => $goods_, 'commercial_offer_amount' => $commercial_offer_amount, 'comment' => $comment, 'aes_key2' => $this->aes_key[0]]);
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}else{
				parent::prepare_response(['error'=>'NO_FOUND_COMMERCIAL_OFFER']);
			}
		}
		
		$link = '';
		
		if($is_print == '1'){
			
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
		
			$link = '/user_files/'.$user_myid.'/commercial_offers/commercial_offer_'.$order_number.'.pdf';
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
			
		}
		
		// if(file_exists($this->document_root . $link)){
		// 	chmod($this->document_root . $link, 0664);
		// }
		
		parent::prepare_response(['response' => ['is_print' => $is_print, 'link' => $link]]);
		
	}
	
}
