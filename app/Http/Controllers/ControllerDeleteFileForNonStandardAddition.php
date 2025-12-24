<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerDeleteFileForNonStandardAddition extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('DELETE');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$file = trim(mb_substr(htmlspecialchars($_GET['file'] ?? '', ENT_QUOTES, $this->encoding), 0, 128));
		$draft_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['draft_id'] ?? '', 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		$main_counterparty_id = '';
		
		try{

			$result = DB::select('SELECT `expires_token`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				$main_counterparty_id = $row->main_counterparty_id;
				
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		if($draft_id != ''){
			
			try{
			
				if(!Schema::hasTable('orders_'.$main_counterparty_id)){
					parent::prepare_response(['response' => 'ok']);
				}
			
				$result = DB::select('SELECT CONVERT(AES_DECRYPT(`files_non_standard_addition`, :aes_key) USING utf8mb4) AS `files_non_standard_addition` FROM `orders_'.$main_counterparty_id.'` WHERE `order_id` = :draft_id AND `status` = \'draft\' LIMIT 1', ['aes_key' => $this->aes_key[0], 'draft_id' => $draft_id]);
				
				if(sizeof($result) == 0){
					parent::prepare_response(['error'=>'NO_DRAFT_FOUND']);
				}
				
				$arr = [];
				
				foreach ($result as $row) {
					$files_non_standard_addition_ = json_decode($row->files_non_standard_addition, true);
					if($files_non_standard_addition_ === null){
						$files_non_standard_addition_ = [];
					}
					foreach($files_non_standard_addition_ as $c){
						if($c['СсылкаНаФайл'] != $file){
							$arr[] = $c;
						}
					}
				}
				
				$files_non_standard_addition = parent::escape_unicode_decode(json_encode($arr));
				
				DB::update('UPDATE `orders_'.$main_counterparty_id.'` SET `files_non_standard_addition` = AES_ENCRYPT(:files_non_standard_addition, :aes_key) WHERE `order_id` = :draft_id AND `status` = \'draft\' LIMIT 1', ['files_non_standard_addition' => $files_non_standard_addition, 'aes_key' => $this->aes_key[0],  'draft_id' => $draft_id]);

			} catch (QueryException $e) {
				$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
				if(strpos($err, 'Base table or view not found') === false){
					parent::log_er_mysql($err);
					parent::prepare_response(['error'=>$err]);
				}else{
					parent::prepare_response(['error'=>'NO_DRAFT_FOUND']);
				}
			}		
		
		}
		
		preg_match('/(\/user_files\/([a-z0-9\-]{36})\/files_for_non_standard_addition\/[0-9]{2}\-[0-9]{2}\-[0-9]{2}__[0-9]{2}\.[0-9]{2}\.[0-9]{4}__[0-9]{10}\.('.implode('|', $this->config_project['allow_file_for_non_standard_addition']).'))/', $file, $matches);
		
		if(!$matches){
			parent::prepare_response(['error'=>'FAIL_FILE']);
		}
				
		if(file_exists($this->document_root . $matches[1])){
			@unlink($this->document_root . $matches[1]);
		}
		
		parent::prepare_response(['response' => 'ok']);
		
	}
	
}
