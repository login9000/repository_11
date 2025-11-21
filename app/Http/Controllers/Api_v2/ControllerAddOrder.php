<?php

namespace App\Http\Controllers\Api_v2;

use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerAddOrder extends Common {
	
	public function handler(Request $request) {
		
		parent::check_allowed_method('POST');

		$data = ($request->input('Данные') ?? '');

		if ($data === '' || !is_array($data)) {
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Данные" пустое либо было некорректно заполнено')));
		}
		
		if(!array_key_exists('Статус', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Статус" отсуствует')));
		}
		if(!array_key_exists($data['Статус'], config('project.orders_statuses'))){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Статус" должно содержать один из следующих статусов: '.implode(', ', array_keys(config('project.orders_statuses'))))));
		}
		$status = config('project.orders_statuses')[$data['Статус']];
		
		if(!array_key_exists('ДатаСоздания', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ДатаСоздания" отсуствует')));
		}
		$create_date = $data['ДатаСоздания'];
		$timestamp_order = strtotime($data['ДатаСоздания']);
		if((empty($create_date)) || (!empty($create_date) && date('U', strtotime($create_date)) == 0)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ДатаСоздания" пустое либо было некорректно заполнено')));
		}
		
		if(!array_key_exists('КонтрагентИД', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "КонтрагентИД" отсуствует')));
		}
		$counterparty_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['КонтрагентИД'] ?? '', 0, 36)));
		if(empty($counterparty_id)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "КонтрагентИД" пустое либо было некорректно заполнено')));
		}
		
		if(!array_key_exists('ЗаказПокупателяИД', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ЗаказПокупателяИД" отсуствует')));
		}
		$order_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['ЗаказПокупателяИД'] ?? '', 0, 36)));
		if(empty($order_id)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ЗаказПокупателяИД" пустое либо было некорректно заполнено')));
		}
		
		if(!array_key_exists('НаличнаяОплата', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "НаличнаяОплата" отсуствует')));
		}
		$is_cash_payment = $data['НаличнаяОплата'] == 1 ? '1' : '';
		
		if(!array_key_exists('ДатаОтгрузки', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ДатаОтгрузки" отсуствует')));
		}
		$shipping_date = $data['ДатаОтгрузки'];
		$timestamp_shipments = strtotime($data['ДатаОтгрузки']);		
		if((empty($shipping_date)) || (!empty($shipping_date) && date('U', strtotime($shipping_date)) == 0)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ДатаОтгрузки" пустое либо было некорректно заполнено')));
		}
		
		if(!array_key_exists('СкладОтгрузкиИД', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "СкладОтгрузкиИД" отсуствует')));
		}
		$shipping_warehouse_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['СкладОтгрузкиИД'] ?? '', 0, 36)));
		if(empty($shipping_warehouse_id)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "СкладОтгрузкиИД" пустое либо было некорректно заполнено')));
		}
		
		if(!array_key_exists('Доставка', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Доставка" отсуствует')));
		}
		$delivery_address_id = '';
		if ($data['Доставка'] == 1) {
			if(!array_key_exists('АдресДоставкиИД', $data)){
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "АдресДоставкиИД" отсуствует')));
			}
			$delivery_address_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['АдресДоставкиИД'] ?? '', 0, 36)));
			if(empty($delivery_address_id)){
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "АдресДоставкиИД" пустое либо было некорректно заполнено')));
			}
		}
		$is_shipping = $data['Доставка'] == 1 ? '1' : '';
		
		if(!array_key_exists('НомерЗаказа', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "НомерЗаказа" отсуствует')));
		}
		$order_number = mb_substr(htmlspecialchars($data['НомерЗаказа'], ENT_QUOTES, $this->encoding), 0, 11);
		if(empty($order_number)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "НомерЗаказа" пустое либо было некорректно заполнено')));
		}

		if(!array_key_exists('Сумма', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Сумма" отсуствует')));
		}
		$sum = preg_replace('/[^0-9\.]/', '', $data['Сумма']);
		if(!is_numeric($sum)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Сумма" пустое либо было некорректно заполнено')));
		}		

		if(!array_key_exists('Вес', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Вес" отсуствует')));
		}
		$weight = preg_replace('/[^0-9\.]/', '', $data['Вес']);
		if(!is_numeric($weight)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Вес" пустое либо было некорректно заполнено')));
		}

		$comment = '';
		if (array_key_exists('Комментарий', $data)) {
			$comment = $data['Комментарий'];
		}
		
		if(!array_key_exists('Товары', $data) && !array_key_exists('НестандартнаяДоборка', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Отсуствуют поля "Товары" и "НестандартнаяДоборка", должно присутствовать хотя одно из этих полей')));
		}
		if(empty($data['Товары']) && empty($data['НестандартнаяДоборка'])){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поля "Товары" и "НестандартнаяДоборка" пусты либо были некорректно заполнены, необходимо чтобы было заполнено хотя бы одно из этих полей')));
		}
		if(((!empty($data['Товары'])) && (!is_array($data['Товары']) || (sizeof($data['Товары']) == 0 ))) && ((!empty($data['НестандартнаяДоборка'])) && (!is_array($data['НестандартнаяДоборка']) || (sizeof($data['НестандартнаяДоборка']) == 0 )))){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поля "Товары" и "НестандартнаяДоборка" пусты либо были некорректно заполнены, необходимо чтобы было заполнено хотя бы одно из этих полей')));
		}
		if((!empty($data['Товары']) && sizeof($data['Товары']) == 0 && empty($data['НестандартнаяДоборка'])) || (!empty($data['НестандартнаяДоборка']) && sizeof($data['НестандартнаяДоборка']) == 0 && empty($data['Товары']))){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поля "Товары" или "НестандартнаяДоборка" пусты либо были некорректно заполнены, необходимо чтобы было заполнено хотя бы одно из этих полей')));
		}
		$goods = '[]';
		if(!empty($data['Товары']) && sizeof($data['Товары']) > 0){
			list($result_, $err) = parent::check_goods($data['Товары']);
			if($err){
				return parent::escape_unicode_decode(json_encode(['Ошибка' => $err]));
			}
			$goods = json_encode($result_, JSON_UNESCAPED_UNICODE);
		}
		$goods_non_standard_addition = '[]';
		if(!empty($data['НестандартнаяДоборка']) && sizeof($data['НестандартнаяДоборка']) > 0){
			list($result_, $err) = parent::check_non_standard_goods($data['НестандартнаяДоборка']);
			if($err){
				return parent::escape_unicode_decode(json_encode(['Ошибка' => $err]));
			}
			$goods_non_standard_addition = json_encode($result_, JSON_UNESCAPED_UNICODE);
		}
		
		$files_non_standard_addition = '[]';
		
		if(array_key_exists('НестандартнаяДоборкаПрикрепленныеФайлы', $data) && is_array($data['НестандартнаяДоборкаПрикрепленныеФайлы']) && sizeof($data['НестандартнаяДоборкаПрикрепленныеФайлы']) > 0){

			$final_files_array = [];

			$allowed_file_extensions = config('project.allow_file_for_non_standard_addition');

			foreach ($data['НестандартнаяДоборкаПрикрепленныеФайлы'] as $item) {

					if (!empty($item['ДанныеФайла']) && !empty($item['РасширениеФайла'])) {

							if (in_array($item['РасширениеФайла'], $allowed_file_extensions)) {

									$file_name = date('H-i-s__d.m.Y__') . mt_rand(10000, 99900) . mt_rand(10000, 99900) . '.' . $item['РасширениеФайла'];

									$final_files_array[] = [
											'СсылкаНаФайл' => parent::upload_file_from_base64($client_id, $file_name, $item['ДанныеФайла']),
											'ИмяФайла' => $file_name,
									];
							} else {
									return parent::escape_unicode_decode(json_encode(['Ошибка' => 'Файл непододящего формата']));
							}
					}
			}

			$files_non_standard_addition = json_encode($final_files_array, JSON_UNESCAPED_UNICODE);		
			
		}
		
		
		if(!array_key_exists('ПользовательИД', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ПользовательИД" отсуствует')));
		}
		$client_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['ПользовательИД'] ?? '', 0, 36)));
		if(empty($client_id)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ПользовательИД" пустое либо было некорректно заполнено')));
		}
		
		$responsible_sokrof = '';
		
		$result = DB::select('SELECT `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $client_id]);
		
		if(sizeof($result) == 0){
			return parent::escape_unicode_decode(json_encode(['Ошибка' => 'Произошла ошибка при создании заказа — ПользовательИД отсутствует']));
		}
		
		foreach ($result as $row) {
			$main_counterparty_id = $row->main_counterparty_id;
			if(empty($main_counterparty_id)){
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Произошла ошибка при создании заказа — Головной контрагент отсутствует')));
			}
		}
		
		$mysqli = @new \mysqli(env('DB_HOST'), env('DB_USERNAME'), env('DB_PASSWORD'), env('DB_DATABASE'));		
		if($mysqli->connect_error) {
			$err = $mysqli->connect_error;
			parent::log_er_mysql($err);
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>$err)));
		}
		
		if(!$mysqli->query('CREATE TABLE `orders_'.$main_counterparty_id.'` (`id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, `date` char(22) NOT NULL DEFAULT \'\', `timestamp_order` int(10) UNSIGNED NOT NULL DEFAULT 0, `order_id` char(36) NOT NULL DEFAULT \'-\', `order_number` char(11) NOT NULL DEFAULT \'\', `status` enum(\'needs_confirmation\',\'ready_for_shipment\',\'in_work\',\'in_processing\',\'shipped\',\'in_shipment\',\'canceled\',\'draft\') NOT NULL DEFAULT \'draft\', `counterparty_id` char(36) NOT NULL DEFAULT \'\', `sum` char(32) NOT NULL DEFAULT \'0\', `is_cash_payment` char(1) NOT NULL DEFAULT \'\', `shipping_date` char(22) NOT NULL DEFAULT \'\', `timestamp_shipments` int(10) UNSIGNED NOT NULL DEFAULT 0, `shipping_warehouse_id` char(36) NOT NULL DEFAULT \'\', `is_shipping` char(1) NOT NULL DEFAULT \'\', `weight` char(32) NOT NULL DEFAULT \'0\', `delivery_address_id` char(36) NOT NULL DEFAULT \'\', `responsible_sokrof` blob DEFAULT NULL, `client_id` char(36) NOT NULL DEFAULT \'\', `goods` text DEFAULT \'\', `goods_non_standard_addition` blob DEFAULT NULL, `files_non_standard_addition` blob DEFAULT NULL, `ids_row_update` text DEFAULT \'\', `popular_statuses` text DEFAULT \'\', `comment` blob DEFAULT NULL, `orderlkid` char(36) NOT NULL DEFAULT \'\' ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;')){
			$err = $mysqli->error;
			if(strpos($err, 'already exists') === false){
				parent::log_er_mysql($err);
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>$err)));
			}
		}else{
			if(!$mysqli->query('ALTER TABLE `orders_' . $main_counterparty_id . '` ADD KEY `order_id_index` (`order_id`) USING BTREE')){
				$err = $mysqli->error;
				parent::log_er_mysql($err);
				return parent::escape_unicode_decode(json_encode(array('Ошибка'=>$err)));
			}				
		}
		
		try {

			DB::beginTransaction();
				# блокируем всю таблицу в рамках транзакции
				DB::select('SELECT COUNT(`id`) FROM `orders_' . $main_counterparty_id . '` FOR UPDATE');
				if (DB::table('orders_' . $main_counterparty_id)->count('id') == 0) {
					DB::insert('INSERT INTO `orders_' . $main_counterparty_id . '` (`popular_statuses`) values (\'{"ready_for_shipment":0, "with_shipments":0, "needs_confirmation":0, "draft":0}\')');
				}
			DB::commit();

		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>$err)));
			
		}
		
		$result = DB::select('SELECT `id` FROM `orders_' . $main_counterparty_id . '` WHERE `order_id` = :order_id LIMIT 1', ['order_id' => $order_id]);
		
		if(sizeof($result) > 0){
			return parent::escape_unicode_decode(json_encode(['Ошибка' => 'Такой заказ уже создан ранее']));
		}
		
		try{
			
			DB::beginTransaction();
				
				# блокируем всю таблицу в рамках транзакции
				DB::select('SELECT COUNT(`id`) FROM `orders_'.$main_counterparty_id.'` FOR UPDATE');
				
				DB::insert('INSERT INTO `orders_' . $main_counterparty_id . '` (`date`, `timestamp_order`, `order_id`, `order_number`, `status`, `counterparty_id`, `sum`, `is_cash_payment`, `shipping_date`, `timestamp_shipments`, `shipping_warehouse_id`, `is_shipping`, `weight`, `delivery_address_id`, `responsible_sokrof`, `client_id`, `goods`, `goods_non_standard_addition`, `files_non_standard_addition`,   `comment`) values (:date, :timestamp_order, :order_id, :order_number, :status, :counterparty_id, :sum, :is_cash_payment, :shipping_date, :timestamp_shipments, :shipping_warehouse_id, :is_shipping, :weight, :delivery_address_id, AES_ENCRYPT(:responsible_sokrof, :aes_key), :client_id, :goods, AES_ENCRYPT(:goods_non_standard_addition, :aes_key2), AES_ENCRYPT(:files_non_standard_addition, :aes_key3),  AES_ENCRYPT(:comment, :aes_key4))', ['date' => $create_date, 'timestamp_order' => $timestamp_order, 'order_id' => $order_id, 'order_number' => $order_number, 'status' => $status, 'counterparty_id' => $counterparty_id, 'sum' => $sum, 'is_cash_payment' => $is_cash_payment, 'shipping_date' => $shipping_date, 'timestamp_shipments' => $timestamp_shipments, 'shipping_warehouse_id' => $shipping_warehouse_id, 'is_shipping' => $is_shipping, 'weight' => $weight, 'delivery_address_id' => $delivery_address_id, 'responsible_sokrof' => $responsible_sokrof, 'aes_key' => $this->aes_key[0], 'client_id' => $client_id, 'goods' => $goods, 'goods_non_standard_addition' => $goods_non_standard_addition, 'aes_key2' => $this->aes_key[0], 'files_non_standard_addition' => $files_non_standard_addition, 'aes_key3' => $this->aes_key[0], 'comment' => $comment, 'aes_key4' => $this->aes_key[0]]);
						
				$popular_statuses = parent::get_data_from_popular_statuses($main_counterparty_id);
				
				DB::update('UPDATE `orders_'.$main_counterparty_id.'` SET `popular_statuses` = :popular_statuses WHERE `id` = 1 LIMIT 1', ['popular_statuses' => $popular_statuses]);
			
			DB::commit();
		
		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>$err)));
			
		}
		
		return parent::escape_unicode_decode(json_encode(['Сообщение' => 'Заказ успешно создан']));
		
	}

}