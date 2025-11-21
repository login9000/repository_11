<?php

namespace App\Http\Controllers\Api_v2;

use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerAddCounterparty extends Common {

	public function handler(Request $request) {

		parent::check_allowed_method('POST');

		$data = ($request->input('Данные') ?? '');

		if ($data === '' || !is_array($data)) {
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Данные" пустое либо было некорректно заполнено')));
		}
		
		if(!array_key_exists('ГоловнойКонтрагентИД', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ГоловнойКонтрагентИД" отсуствует')));
		}
		$main_counterparty_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['ГоловнойКонтрагентИД'], 0, 36)));
		if(empty($main_counterparty_id)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ГоловнойКонтрагентИД" пустое либо было некорректно заполнено')));
		}
		
		if(!array_key_exists('КонтрагентИД', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "КонтрагентИД" отсуствует')));
		}
		$counterparty_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['КонтрагентИД'], 0, 36)));
		if(empty($counterparty_id)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "КонтрагентИД" пустое либо было некорректно заполнено')));
		}
		
		if(!array_key_exists('Назввание', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Назввание" отсуствует')));
		}
		$fullname = mb_substr(htmlspecialchars($data['Назввание'], ENT_QUOTES, $this->encoding), 0, 255);
		if(empty($fullname)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Назввание" пустое либо было некорректно заполнено')));
		}		
		
		if(!array_key_exists('ИНН', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ИНН" отсуствует')));
		}
		$inn = mb_substr(htmlspecialchars($data['ИНН'], ENT_QUOTES, $this->encoding), 0, 12);
		if(empty($inn)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ИНН" пустое либо было некорректно заполнено')));
		}		
		
		if(!array_key_exists('АдресРегистрации', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "АдресРегистрации" отсуствует')));
		}
		$legal_address = mb_substr(htmlspecialchars($data['АдресРегистрации'], ENT_QUOTES, $this->encoding), 0, 500);
		if(empty($legal_address)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "АдресРегистрации" пустое либо было некорректно заполнено')));
		}		
		
		if(!array_key_exists('Статус', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Статус" отсуствует')));
		}
		$is_confirmed = trim(preg_replace('/[^0-9]/', '', mb_substr($data['Статус'] == 1 ? '1' : '', 0, 1)));
		
		$kpp = '';
		if(!empty($data['КПП'])){
			$kpp = mb_substr(htmlspecialchars($data['КПП'], ENT_QUOTES, $this->encoding), 0, 9);
		}
		
		$ogrn = '';
		if(!empty($data['ОГРН'])){
			$ogrn = mb_substr(htmlspecialchars($data['ОГРН'], ENT_QUOTES, $this->encoding), 0, 13);
		}
		
		$actual_address = '';
		if(!empty($data['АдресФактический'])){
			$actual_address = mb_substr(htmlspecialchars($data['АдресФактический'], ENT_QUOTES, $this->encoding), 0, 500);
		}
		
		$corr_account = '';
		if(!empty($data['КоррСчет'])){
			$corr_account = mb_substr(htmlspecialchars($data['КоррСчет'], ENT_QUOTES, $this->encoding), 0, 20);
		}
		
		$bank_bik = '';
		if(!empty($data['БанкБик'])){
			$bank_bik = mb_substr(htmlspecialchars($data['БанкБик'], ENT_QUOTES, $this->encoding), 0, 9);
		}
		
		$bank_name = '';
		if(!empty($data['БанкИмя'])){
			$bank_name = mb_substr(htmlspecialchars($data['БанкИмя'], ENT_QUOTES, $this->encoding), 0, 100);
		}
		
		$checking_account = '';
		if(!empty($data['БанкНомерСчета'])){
			$checking_account = mb_substr(htmlspecialchars($data['БанкНомерСчета'], ENT_QUOTES, $this->encoding), 0, 20);
		}
		
		$id_delivery_addresses = '';
		if(!empty($data['АдресДоставкиИД'])){
			$id_delivery_addresses = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['АдресДоставкиИД'], 0, 36)));
		}
		
		$bonus_percentage = 0;
		if(array_key_exists('ПроцентБонуса', $data)){
			$bonus_percentage = trim(preg_replace('/[^0-9]/', '', mb_substr($data['ПроцентБонуса'], 0, 3)));
			if(!is_numeric($bonus_percentage)){
				$bonus_percentage = 0;
			}
		}
		
		$mysqli = @new \mysqli(env('DB_HOST'), env('DB_USERNAME'), env('DB_PASSWORD'), env('DB_DATABASE'));		
		if($mysqli->connect_error) {
			$err = $mysqli->connect_error;
			parent::log_er_mysql($err);
			return json_encode(array('Ошибка'=>preg_replace('/\r?\n/', ' ', $err)));
		}
		
		if(!$mysqli->query('CREATE TABLE `counterparties_'.$main_counterparty_id.'` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, `counterparty_id` char(36) NOT NULL DEFAULT \'\', `application_id` char(36) NOT NULL DEFAULT \'\', `fullname` blob DEFAULT NULL, `inn` tinyblob DEFAULT NULL, `kpp` tinyblob DEFAULT NULL, `ogrn` tinyblob DEFAULT NULL, `legal_address` blob DEFAULT NULL, `actual_address` blob DEFAULT NULL, `corr_account` tinyblob DEFAULT NULL, `bank_bik` tinyblob DEFAULT NULL, `bank_name` tinyblob DEFAULT NULL, `checking_account` tinyblob DEFAULT NULL, `bonus_percentage` tinyint(3) UNSIGNED DEFAULT 0, `id_delivery_addresses` char(36) DEFAULT \'\', `is_confirmed` char(1) DEFAULT \'\', `ids_row_update` text NOT NULL DEFAULT \'\') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4')){
			$err = $mysqli->error;
			if(strpos($err, 'already exists') === false){
				parent::log_er_mysql($err);
				return json_encode(array('Ошибка'=>preg_replace('/\r?\n/', ' ', $err)));
			}
		}
		
		try{

			DB::beginTransaction();

				# блокируем всю таблицу в рамках транзакции
				DB::select('SELECT COUNT(`id`) FROM `counterparties_'.$main_counterparty_id.'` FOR UPDATE');
				
				if(DB::table('counterparties_'.$main_counterparty_id)->count('id') == 0){
					DB::insert('INSERT INTO `counterparties_'.$main_counterparty_id.'` (`ids_row_update`) values (\'\')');
				}
				
				$result = DB::select('SELECT `id` FROM `counterparties_'.$main_counterparty_id.'` WHERE `counterparty_id` = :counterparty_id LIMIT 1', ['counterparty_id' => $counterparty_id]);
				
				if(sizeof($result) > 0){
					return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Данный КонтрагентИД ('.$counterparty_id.') уже существует, воспользуйтейсь методом для обновления')));
				}
				
				$result = DB::select('SELECT `id`, CONVERT(AES_DECRYPT(`inn`, :aes_key) USING utf8mb4) AS `inn` FROM `counterparties_'.$main_counterparty_id.'`', ['aes_key' => $this->aes_key[0]]);
				
				foreach ($result as $row) {
					if($row->inn == $inn){
						DB::delete('DELETE FROM `counterparties_'.$main_counterparty_id.'` WHERE `id` = :id LIMIT 1', ['id' => $row->id]);
						break;
					}
				}
				
				DB::insert('INSERT INTO `counterparties_'.$main_counterparty_id.'` (`counterparty_id`, `application_id`, `fullname`, `inn`, `kpp`, `ogrn`, `legal_address`, `actual_address`, `corr_account`, `bank_bik`, `bank_name`, `checking_account`, `bonus_percentage`, `id_delivery_addresses`, `is_confirmed`) values (:counterparty_id, :application_id, AES_ENCRYPT(:fullname, :aes_key), AES_ENCRYPT(:inn, :aes_key2), AES_ENCRYPT(:kpp, :aes_key3), AES_ENCRYPT(:ogrn, :aes_key4), AES_ENCRYPT(:legal_address, :aes_key5), AES_ENCRYPT(:actual_address, :aes_key6), AES_ENCRYPT(:corr_account, :aes_key7), AES_ENCRYPT(:bank_bik, :aes_key8), AES_ENCRYPT(:bank_name, :aes_key9), AES_ENCRYPT(:checking_account, :aes_key10), :bonus_percentage, :id_delivery_addresses, :is_confirmed)', ['counterparty_id' => $counterparty_id, 'application_id' => '-', 'fullname' => $fullname, 'aes_key' => $this->aes_key[0], 'inn' => $inn, 'aes_key2' => $this->aes_key[0], 'kpp' => $kpp, 'aes_key3' => $this->aes_key[0], 'ogrn' => $ogrn, 'aes_key4' => $this->aes_key[0], 'legal_address' => $legal_address, 'aes_key5' => $this->aes_key[0], 'actual_address' => $actual_address, 'aes_key6' => $this->aes_key[0], 'corr_account' => $corr_account, 'aes_key7' => $this->aes_key[0], 'bank_bik' => $bank_bik, 'aes_key8' => $this->aes_key[0], 'bank_name' => $bank_name, 'aes_key9' => $this->aes_key[0], 'checking_account' => $checking_account, 'aes_key10' => $this->aes_key[0], 'bonus_percentage' => $bonus_percentage, 'id_delivery_addresses' => $id_delivery_addresses, 'is_confirmed' => $is_confirmed]);
			
			DB::commit();
		
		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			return json_encode(array('Ошибка'=>preg_replace('/\r?\n/', ' ', $err)));
			
		}
	
		return parent::escape_unicode_decode(json_encode(['Сообщение' => 'Контрагент создан']));
		
	}

}
