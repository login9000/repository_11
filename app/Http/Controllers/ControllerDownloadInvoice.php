<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerDownloadInvoice extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$number_invoice = trim(mb_substr(htmlspecialchars($_GET['number_invoice'] ?? '', ENT_QUOTES, $this->encoding), 0, 32));
		$invoice_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['invoice_id'] ?? '', 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}

		if($number_invoice == ''){
			parent::prepare_response(['error'=>'NUMBER_INVOICE_IS_EMPTY_OR_INCORRECT']);
		}

		if($invoice_id == ''){
			parent::prepare_response(['error'=>'INVOICE_ID_IS_EMPTY_OR_INCORRECT']);
		}

		$token = '';
		$file_size = 0;
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				$token = $row->token;
				
			}

		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		list($result, $err) = parent::post_request_to_api_1c('download_invoice', ['invoice_id' => $invoice_id, 'token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}
		
		if(!is_dir($this->document_root.'/user_files/'.$user_myid)){
			mkdir($this->document_root.'/user_files/'.$user_myid, 0774);
		}
		
		if(!is_dir($this->document_root.'/user_files/'.$user_myid.'/invoices')){
			mkdir($this->document_root.'/user_files/'.$user_myid.'/invoices', 0774);
		}
		
		$link = '/user_files/'.$user_myid.'/invoices/invoice_'.$number_invoice.'.pdf';
		$file_path = $this->document_root . $link;
		
		$f = fopen($file_path, 'w+');
		fwrite($f, base64_decode($result['Данные']));
		fclose($f);
		unset($result);

		if(file_exists($file_path)){
			$file_size = filesize($file_path);
			// chmod($file_path, 0664);
		}
		
		parent::prepare_response(['response' => ['file_size' => $file_size, 'link' => $link]]);
		
	}
	
}
