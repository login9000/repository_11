<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerUploadFileForNonStandardAddition extends Common{
	
	public function __invoke(Request $request){
		
		parent::check_allowed_method('POST');
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}

		try{

			$result = DB::select('SELECT `expires_token` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		if(!$request->hasFile('upload_file_for_non_standard_addition')) {
			parent::prepare_response(['error'=>'INCORRECT_UPLOADING']);
		}
		
		$size = filesize($_FILES['upload_file_for_non_standard_addition']['tmp_name']) / 1000;
		$expansion = preg_replace('/.*?\.([^\.]+)$/', '$1', basename($_FILES['upload_file_for_non_standard_addition']['name']));		
		
		if(!in_array($expansion, $this->config_project['allow_file_for_non_standard_addition'])){
			parent::prepare_response(['error'=>'INCORRECT_EXPANSION']);
		}
		
		if($size > $this->config_project['max_file_size_for_non_standard_addition']){
			parent::prepare_response(['error'=>'LIMIT_FILE_SIZE']);
		}
		
		if($size == 0){
			parent::prepare_response(['error'=>'NULL_FILE_SIZE']);
		}
		
		$expansion = strtolower($expansion);
		$file_name = date('H-i-s__d.m.Y__') . mt_rand(10000, 99900) . mt_rand(10000, 99900);
		
		if(!is_dir($this->document_root.'/user_files/'.$user_myid)){
			mkdir($this->document_root.'/user_files/'.$user_myid, 0774);
		}
		
		if(!is_dir($this->document_root.'/user_files/'.$user_myid.'/files_for_non_standard_addition')){
			mkdir($this->document_root.'/user_files/'.$user_myid.'/files_for_non_standard_addition', 0774);
		}
		
		$file = $this->document_root.'/user_files/'.$user_myid.'/files_for_non_standard_addition/'.$file_name.'.'.$expansion;
		$file2 = '/user_files/'.$user_myid.'/files_for_non_standard_addition/'.$file_name.'.'.$expansion;
		
		if(!move_uploaded_file($_FILES['upload_file_for_non_standard_addition']['tmp_name'], $file)){
			parent::prepare_response(['error'=>'FAIL_UPLOAD_FILE']);
		}
		
		if(file_exists($file)){
			chmod($file, 0764);
		}
		if(file_exists($this->document_root . $file2)){
			chmod($this->document_root . $file2, 0664);
		}
		
		parent::prepare_response(['response' => $file2]);
		
	}
	
}
