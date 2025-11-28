<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerDownloadPriceList extends Common{
	
	public function __invoke(){
		
		set_time_limit(60); // блять
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		$token = '';
		
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
		
		$link = '/user_files/'.$user_myid.'/price_list/price_list_'.($this->time).'.pdf';
		$file_path = $this->document_root . $link;
		
		if(file_exists($file_path)){
			if($this->time - filemtime($file_path) < 3600){
				parent::prepare_response(['response' => ['file_size' => filesize($file_path), 'link' => $link]]);
			}
		}
		
		list($result, $err) = parent::post_request_to_api_1c('download_price_list', ['token' => $token]);
		if($err){
			parent::prepare_response(['error'=>$err], true);
		}
		
		if(array_key_exists('Ошибка', $result)){
			parent::prepare_response(['error'=>$result['Ошибка']], true);
		}
		
		if(!array_key_exists('Данные', $result)){
			parent::prepare_response(['error'=>'NO_EXISTS_KEY_Данные']);
		}

		if(!is_dir($this->document_root.'/user_files/'.$user_myid)){
			mkdir($this->document_root.'/user_files/'.$user_myid, 0774);
		}
		
		if(!is_dir($this->document_root.'/user_files/'.$user_myid.'/price_list')){
			mkdir($this->document_root.'/user_files/'.$user_myid.'/price_list', 0774);
		}
		
		$f = fopen($file_path, 'w+');
		fwrite($f, base64_decode($result['Данные']));
		fclose($f);
		unset($result);

		if(file_exists($file_path)){
			$file_size = filesize($file_path);
			//chmod($file_path, 0664);
		}
		
		parent::prepare_response(['response' => ['file_size' => $file_size, 'link' => $link]]);
		
	}
	
}
