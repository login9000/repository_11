<?php

namespace App\Http\Controllers;

use App\Helpers\Common;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerGetShippingDetails extends Common {

	public function __invoke() {

		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$err = parent::validate_get_params('other');
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		$client_rsa_pubkey = htmlspecialchars($_GET['client_rsa_pubkey'], ENT_QUOTES, $this->encoding);
		
		$shipment_id = trim(preg_replace('/[^a-f0-9\-]/', '', $_GET['shipment_id'] ?? ''));

		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if ($err) {
			parent::prepare_response(['error' => $err]);
		}

		if ($shipment_id == '') {
			parent::prepare_response(['error' => 'SHIPMENT_ID_IS_EMPTY_OR_INCORRECT']);
		}

		$token = '';
		$fio1 = '';
		$manager_fio1 = '';
		$fio2 = '';
		$manager_fio2 = '';
		$main_counterparty_id = '';
		$comment = '';

		try {

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);

			if (sizeof($result) == 0) {
				parent::prepare_response(['error' => 'NO_EXISTS_ACCOUNT']);
			}

			foreach ($result as $row) {

				if ($this->time - $row->expires_token >= 0) {
					parent::prepare_response(['error' => 'EXPIRES_TOKEN']);
				}
				$token = $row->token;
				$main_counterparty_id = $row->main_counterparty_id;

			}

		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error' => $err]);
		}

		$shipment_warehouses_data = parent::get_shipment_warehouses();

		if (array_key_exists('error', $shipment_warehouses_data)) {
			parent::prepare_response(['error' => $shipment_warehouses_data['error']]);
		}

		$shipment_warehouses_id_name = [];
		foreach ($shipment_warehouses_data['data'] as $c) {
			$shipment_warehouses_id_name[$c['СкладИД']] = $c['Наименование'];
		}

		list($result, $err) = parent::post_request_to_api_1c('get_shipment_details', ['shipment_id' => $shipment_id, 'token' => $token]);
		if ($err) {
			parent::prepare_response(['error' => $err], true);
		}

		$shipment_details = [];

		if (!empty($result['Доставка'])) {

			if (!empty($result['Заказы'][0]['АдресДоставкиСтрока'])) {
				$shipment_details['АдресДоставкиСтрока'] = $result['Заказы'][0]['АдресДоставкиСтрока'];
			}
		}


		if (array_key_exists('Ошибка', $result)) {
			parent::prepare_response(['error' => $result['Ошибка']], true);
		}

		if (!array_key_exists('Заказы', $result)) {
			parent::prepare_response(['error' => 'NO_EXISTS_KEY_Заказы']);
		}

		if (!Schema::hasTable('shipments_' . $main_counterparty_id)) {
			// вот этот говнокод пришлось написать потому что наш фронтендер - ленивая задница	
			parent::prepare_response(['error' => 'Не удалось найти таблицу с данными отгрузок (' . $main_counterparty_id . ')']);
			//
		}

		$result2 = DB::select('SELECT `client_id`, CONVERT(AES_DECRYPT(`comment`, :aes_key) USING utf8mb4) AS `comment` FROM `shipments_' . $main_counterparty_id . '` WHERE `shipment_id` = :shipment_id LIMIT 1', ['aes_key' => $this->aes_key[0], 'shipment_id' => $shipment_id]);
		foreach ($result2 as $row) {
			list($fio1, $manager_fio1, $fio2, $manager_fio2) = parent::get_fio_and_manager_fio($row->client_id);
			$comment = $row->comment;
		}


		foreach ($result as $key => $val) {

			if ($key != 'Заказы') {

				$shipment_details[$key] = $val;
				if ($key == 'Дата' || $key == 'ДатаОтгрузки') {
					$shipment_details[$key] = str_replace('01 янв 0001', '', parent::convert_format_date2($val));
				}

				if ($key == 'СтатусИД') {
					$shipment_details[$key] = str_replace(['НаОбработке', 'ТребуетПодтверждения', 'ВРаботе', 'ГотовКОтгрузке', 'ВОтгрузке'], ['На обработке', 'Требует подтверждения', 'В работе', 'Готов к отгрузке', 'В отгрузке'], $val);
				}

			}

			if ($key == 'Заказы') {

				$shipment_details[$key] = [];
				$arr = [];

				foreach ($val as $c) {

					$c['ДатаОтгрузкиПлан'] = str_replace('01 янв 0001', '', parent::convert_format_date2($c['ДатаОтгрузкиПлан']));
					$c['ДатаОтгрузкиНовая'] = str_replace('01 янв 0001', '', parent::convert_format_date2($c['ДатаОтгрузкиНовая']));
					$c['ДатаЗаказаПокупателя'] = str_replace('01 янв 0001', '', parent::convert_format_date2($c['ДатаЗаказаПокупателя']));

					$c['СкладОтгрузкиНаименование'] = '';
					$c['Sokrof'] = $manager_fio2;
					$c['Клиент'] = $fio2;

					if (array_key_exists($c['СкладОтгрузкиИД'], $shipment_warehouses_id_name)) {
						$c['СкладОтгрузкиНаименование'] = $shipment_warehouses_id_name[$c['СкладОтгрузкиИД']];
					}
					$arr[] = $c;

				}

				$shipment_details[$key] = $arr;
				$shipment_details['ОтветственныйОтКлиента'] = $fio1;
				$shipment_details['ОтветственныйSokrof'] = $manager_fio1;
				$shipment_details['Комментарий'] = $comment;

			}

		}
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['shipment_details' => $shipment_details], $client_rsa_pubkey);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true);
		// parent::prepare_response(['response' => ['shipment_details' => $shipment_details]], true);

	}

}
