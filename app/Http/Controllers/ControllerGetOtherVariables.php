<?php

namespace App\Http\Controllers;

use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerGetOtherVariables extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');

		$err = parent::validate_get_params('other');
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		$client_rsa_pubkey = htmlspecialchars($_GET['client_rsa_pubkey'], ENT_QUOTES, $this->encoding);
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		
		if($user_myid !== ''){
			$err = parent::check_valid_cookies();
			if($err){
				parent::prepare_response(['error'=>$err]);
			}
		}
		
		$product_catalog_time_modify = @filemtime($this->document_root.'/../public/product_catalog.json');
		
		list($phone, $user_myid, $email, $status, $fio, $photo, $manager_fio, $manager_email, $manager_id, $is_not_enter_verify_code, $delegation_fio, $delegation_user_myid, $csrf_token, $server_rsa_pubkey) = parent::get_other_user_data();

		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['phone' => $phone, 'user_myid' => $user_myid, 'email' => $email, 'status' => $status, 'fio' => $fio, 'photo' => $photo, 'manager_fio' => $manager_fio, 'manager_email' => $manager_email, 'manager_id' => $manager_id, 'is_not_enter_verify_code' => $is_not_enter_verify_code, 'max_file_size_for_manager' => $this->config_project['max_file_size_for_manager'], 'max_file_size_photo' => $this->config_project['max_file_size_photo'], 'max_file_size_for_non_standard_addition' => $this->config_project['max_file_size_for_non_standard_addition'], 'delegation_fio' => $delegation_fio, 'delegation_user_myid' => $delegation_user_myid, 'csrf_token' => $csrf_token, 'server_rsa_pubkey' => $server_rsa_pubkey, 'product_catalog_time_modify' => $product_catalog_time_modify], $client_rsa_pubkey);
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true);
				
	}
	
}
