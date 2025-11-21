<?php

namespace App\Http\Controllers\Api_v2;

use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Schema;

class ControllerUpdateCounterpartyData extends Common {

	public function handler(Request $request) {

		parent::check_allowed_method('PUT');

		$data = ($request->input('Данные') ?? '');

		if ($data === '' || !is_array($data)) {
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "Данные" пустое либо было некорректно заполнено')));
		}

		if(!array_key_exists('ГоловнойКонтрагентИД', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ГоловнойКонтрагентИД" отсуствует')));
		}
		$main_counterparty_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['ГоловнойКонтрагентИД'] ?? '', 0, 36)));
		if(empty($main_counterparty_id)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ГоловнойКонтрагентИД" пустое либо было некорректно заполнено')));
		}

		if(!array_key_exists('КонтрагентИД', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "КонтрагентИД" отсуствует')));
		}
		$counterparty_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['КонтрагентИД'] ?? '', 0, 36)));
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
		if (empty($inn)) {
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "ИНН" пустое либо было некорректно заполнено')));
		}

		if(!array_key_exists('АдресРегистрации', $data)){
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "АдресРегистрации" отсуствует')));
		}
		$legal_address = mb_substr(htmlspecialchars($data['АдресРегистрации'], ENT_QUOTES, $this->encoding), 0, 500);
		if (empty($legal_address)) {
			return parent::escape_unicode_decode(json_encode(array('Ошибка'=>'Поле "АдресРегистрации" пустое либо было некорректно заполнено')));
		}		

		if (!empty($data['КПП'])) {
			$kpp = mb_substr(htmlspecialchars($data['КПП'], ENT_QUOTES, $this->encoding), 0, 9);
		}

		if (!empty($data['ОГРН'])) {
			$ogrn = mb_substr(htmlspecialchars($data['ОГРН'], ENT_QUOTES, $this->encoding), 0, 13);
		}

		if (!empty($data['АдресФактический'])) {
			$actual_address = mb_substr(htmlspecialchars($data['АдресФактический'], ENT_QUOTES, $this->encoding), 0, 500);
		}

		if (!empty($data['КоррСчет'])) {
			$corr_account = mb_substr(htmlspecialchars($data['КоррСчет'], ENT_QUOTES, $this->encoding), 0, 20);
		}

		if (!empty($data['БанкБик'])) {
			$bank_bik = mb_substr(htmlspecialchars($data['БанкБик'], ENT_QUOTES, $this->encoding), 0, 9);
		}

		if (!empty($data['БанкИмя'])) {
			$bank_name = mb_substr(htmlspecialchars($data['БанкИмя'], ENT_QUOTES, $this->encoding), 0, 100); 
		}

		if (!empty($data['БанкНомерСчета'])) {
			$checking_account = mb_substr(htmlspecialchars($data['БанкНомерСчета'], ENT_QUOTES, $this->encoding), 0, 20);
		}

		if (array_key_exists('АдресДоставкиИД', $data)) {
			$id_delivery_addresses = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($data['АдресДоставкиИД'] ?? '', 0, 36)));
		}

		if (array_key_exists('Статус', $data)){
			$is_confirmed = $data['Статус'] == 1 ? '1' : '';
		}
								
		if (array_key_exists('ПроцентБонуса', $data) && is_numeric($data['ПроцентБонуса'])) {
			$bonus_percentage = mb_substr(htmlspecialchars($data['ПроцентБонуса'], ENT_QUOTES, $this->encoding), 0, 3);
		}

		if(!Schema::hasTable('counterparties_'.$main_counterparty_id)){
			return parent::escape_unicode_decode(json_encode(['Ошибка' => 'Данные с таким "ГоловнойКонтрагентИД" не найдены']));
		}

		try{

			DB::beginTransaction();

				$result = DB::select('SELECT CONVERT(AES_DECRYPT(`fullname`, :aes_key) USING utf8mb4) AS `fullname`, CONVERT(AES_DECRYPT(`inn`, :aes_key2) USING utf8mb4) AS `inn`, CONVERT(AES_DECRYPT(`kpp`, :aes_key3) USING utf8mb4) AS `kpp`, CONVERT(AES_DECRYPT(`ogrn`, :aes_key4) USING utf8mb4) AS `ogrn`, CONVERT(AES_DECRYPT(`legal_address`, :aes_key5) USING utf8mb4) AS `legal_address`, CONVERT(AES_DECRYPT(`actual_address`, :aes_key6) USING utf8mb4) AS `actual_address`, CONVERT(AES_DECRYPT(`corr_account`, :aes_key7) USING utf8mb4) AS `corr_account`, CONVERT(AES_DECRYPT(`bank_bik`, :aes_key8) USING utf8mb4) AS `bank_bik`, CONVERT(AES_DECRYPT(`bank_name`, :aes_key9) USING utf8mb4) AS `bank_name`, CONVERT(AES_DECRYPT(`checking_account`, :aes_key10) USING utf8mb4) AS `checking_account`, `bonus_percentage`, `id_delivery_addresses`, `is_confirmed` FROM `counterparties_'.$main_counterparty_id.'` WHERE `counterparty_id` = :counterparty_id LIMIT 1 FOR UPDATE', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'aes_key3' => $this->aes_key[0], 'aes_key4' => $this->aes_key[0], 'aes_key5' => $this->aes_key[0], 'aes_key6' => $this->aes_key[0], 'aes_key7' => $this->aes_key[0], 'aes_key8' => $this->aes_key[0], 'aes_key9' => $this->aes_key[0], 'aes_key10' => $this->aes_key[0], 'counterparty_id' => $counterparty_id]);
				
				if(sizeof($result) == 0){
					return parent::escape_unicode_decode(json_encode(['Ошибка' => 'Данные с таким "КонтрагентИД" не найдены']));
				}
				
				foreach ($result as $row) {
					
					if(empty($kpp)){
						$kpp = $row->kpp;
					}
					if(empty($ogrn)){
						$ogrn = $row->ogrn;
					}
					if(empty($actual_address)){
						$actual_address = $row->actual_address;
					}
					if(empty($corr_account)){
						$corr_account = $row->corr_account;
					}
					if(empty($bank_bik)){
						$bank_bik = $row->bank_bik;
					}
					if(empty($bank_name)){
						$bank_name = $row->bank_name;
					}
					if(empty($checking_account)){
						$checking_account = $row->checking_account;
					}
					if(empty($bonus_percentage)){
						$bonus_percentage = $row->bonus_percentage;
					}
					if(empty($id_delivery_addresses)){
						$id_delivery_addresses = $row->id_delivery_addresses;
					}
					if(!array_key_exists('Статус', $data)){
						$is_confirmed = $row->is_confirmed;
					}
					
					DB::update('UPDATE `counterparties_'.$main_counterparty_id.'` SET `fullname` = AES_ENCRYPT(:fullname, :aes_key), `inn` = AES_ENCRYPT(:inn, :aes_key2), `kpp` = AES_ENCRYPT(:kpp, :aes_key3), `ogrn` = AES_ENCRYPT(:ogrn, :aes_key4), `legal_address` = AES_ENCRYPT(:legal_address, :aes_key5), `actual_address` = AES_ENCRYPT(:actual_address, :aes_key6), `corr_account` = AES_ENCRYPT(:corr_account, :aes_key7), `bank_bik` = AES_ENCRYPT(:bank_bik, :aes_key8), `bank_name` = AES_ENCRYPT(:bank_name, :aes_key9), `checking_account` = AES_ENCRYPT(:checking_account, :aes_key10), `bonus_percentage` = :bonus_percentage, `id_delivery_addresses` = :id_delivery_addresses, `is_confirmed` = :is_confirmed WHERE `counterparty_id` = :counterparty_id LIMIT 1', ['fullname' => $fullname, 'aes_key' => $this->aes_key[0], 'inn' => $inn, 'aes_key2' => $this->aes_key[0], 'kpp' => $kpp, 'aes_key3' => $this->aes_key[0], 'ogrn' => $ogrn, 'aes_key4' => $this->aes_key[0], 'legal_address' => $legal_address, 'aes_key5' => $this->aes_key[0], 'actual_address' => $actual_address, 'aes_key6' => $this->aes_key[0], 'corr_account' => $corr_account, 'aes_key7' => $this->aes_key[0], 'bank_bik' => $bank_bik, 'aes_key8' => $this->aes_key[0], 'bank_name' => $bank_name, 'aes_key9' => $this->aes_key[0], 'checking_account' => $checking_account, 'aes_key10' => $this->aes_key[0], 'bonus_percentage' => $bonus_percentage, 'id_delivery_addresses' => $id_delivery_addresses, 'is_confirmed' => $is_confirmed, 'counterparty_id' => $counterparty_id]);
					
				}
			
			DB::commit();
			
		} catch (QueryException $e) {
			
			DB::rollBack();
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			return json_encode(array('Ошибка'=>preg_replace('/\r?\n/', ' ', $err)));
			
		}

		return parent::escape_unicode_decode(json_encode(['Сообщение' => 'Данные контрагента обновлены']));
		
	}

}
