<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerDownloadMutualSettlements extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$counterparty_id = trim(preg_replace('/[^a-f0-9\-]/', '', substr($_GET['counterparty_id'] ?? '', 0, 36)));
		$period_dates = trim(preg_replace('/[^0-9\-:T ]/', '', $_GET['period_dates'] ?? ''));
		$file_format = trim(preg_replace('/[^a-z]/', '', $_GET['file_format'] ?? ''));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if(!preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} [0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/', $period_dates)){
			parent::prepare_response(['error'=>'FAIL_PERIOD_DATES']);
		}
		$ex = explode(' ', $period_dates);
		$period_date1 = $ex[0];
		$period_date2 = $ex[1];
		if(date('U', strtotime($period_date1)) > date('U', strtotime($period_date2))){
			parent::prepare_response(['error'=>'DATE_RANGE_IS_INVALID_FIRST_DATE_MUST_NOT_BE_GREATER_THAN_SECOND']);
		}
		
		if($file_format == ''){
			parent::prepare_response(['error'=>'FILE_FORMAT_NOT_SELECTED']);
		}
		
		if(!in_array($file_format, ['pdf', 'xls'])){
			parent::prepare_response(['error'=>'FAIL_FILE_FORMAT']);
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
		
		if($counterparty_id != ''){
			parent::check_counterparty_id($main_counterparty_id, $counterparty_id);
		}
		
		list($result, $err) = parent::post_request_to_api_1c('download_mutual_settlements', ['counterparty_id' => $counterparty_id, 'period_date1' => $period_date1, 'period_date2' => $period_date2, 'file_format' => $file_format, 'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}
		
		if(!array_key_exists('Данные', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Данные']);
		}
		
		if(!array_key_exists('ФорматФайла', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Данные']);
		}
		
		if(!is_dir($this->document_root.'/user_files/'.$user_myid)){
			mkdir($this->document_root.'/user_files/'.$user_myid, 0774);
		}

		if(!is_dir($this->document_root.'/user_files/'.$user_myid.'/mutual_settlements')){
			mkdir($this->document_root.'/user_files/'.$user_myid.'/mutual_settlements', 0774);
		} 
		
		$link = '/user_files/'.$user_myid.'/mutual_settlements/mutual_settlements_'.str_replace(':', '.', $period_date1).'__'.str_replace(':', '.', $period_date2).'.'.$result['ФорматФайла'];
		
		$f = fopen($this->document_root . $link, 'w+');
		fwrite($f, base64_decode($result['Данные']));
		fclose($f);
		unset($result);
		
		// if(file_exists($this->document_root . $link)){
		// 	chmod($this->document_root . $link, 0664);
		// }
		
		$link .= '?'.time();
		
		parent::prepare_response(['response' => ['link' => $link]]);
		
	}
	
}
