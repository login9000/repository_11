<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerNotificationDelegation extends Common{
	
	public function __invoke(Request $request){
		
		parent::check_allowed_method('PUT');

		$delegation_user_myid = ($request->input('delegation_user_myid') ?? '');
		$delegation_user_myid = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($delegation_user_myid, 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		if($user_myid == $delegation_user_myid){
			parent::prepare_response(['error'=>'INCORRECT_DELEGATION_USER_MYID']);
		}
		
		$is_i_reg = false;
		$is_employee_delegate_reg = false;
		$client_user_myid = '';
		
		try{
			
			if($delegation_user_myid != ''){
				$result = DB::select('SELECT `user_myid`, `status`, `expires_token`, `client_user_myid` FROM `users` WHERE `user_myid` = :user_myid OR `user_myid` = :delegation_user_myid LIMIT 2', ['user_myid' => $user_myid, 'delegation_user_myid' => $delegation_user_myid]);
			}else{
				$result = DB::select('SELECT `user_myid`, `status`, `expires_token`, `client_user_myid` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			}
			
			foreach ($result as $row) {
				
				if($row->user_myid == $user_myid){
					$is_i_reg = true;
					$client_user_myid = $row->client_user_myid;
				}
				
				if($row->user_myid == $delegation_user_myid){
					$is_employee_delegate_reg = true;
				}
				
				if($row->user_myid == $user_myid && $this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				
				if($row->user_myid == $user_myid && $row->status != 'Сотрудник'){
					parent::prepare_response(['error'=>'YOU_CAN\'T_DO_THIS_REQUEST']);
				}
				
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		if(!$is_i_reg){
			parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
		}
		
		if($delegation_user_myid != '' && !$is_employee_delegate_reg){
			parent::prepare_response(['error'=>'NO_EXISTS_EMPLOYEE_DELEGATE_ACCOUNT']);
		}

		try{
			
			if($delegation_user_myid != ''){
				$result = DB::select('SELECT `id` FROM `employees_'.$client_user_myid.'` WHERE `user_myid` = :delegation_user_myid LIMIT 1', ['delegation_user_myid' => $delegation_user_myid]);
				if(sizeof($result) == 0){
					parent::prepare_response(['error'=>'THIS_USER_WAS_NOT_FOUND_AMONG_POSSIBLE_USERS']);
				}
			}
			
			DB::update('UPDATE `employees_'.$client_user_myid.'` SET `delegation_user_myid` = :delegation_user_myid WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid, 'delegation_user_myid' => $delegation_user_myid]);
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				parent::prepare_response(['error'=>$err]);
			}else{
				parent::prepare_response(['error'=>'NO_AVAILABLE_EMPLOYEES_IN_THE_DATABASE']);
			}
		}
		
		parent::prepare_response(['response' => 'ok']);
		
	}
	
}
