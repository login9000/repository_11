<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerAddNews extends Common{
	
	public function __invoke(Request $request){
		
		parent::check_allowed_method('POST');
		
		$header = ($request->input('header') ?? '');
		$text = ($request->input('text') ?? '');
		
		$header = trim(mb_substr(htmlspecialchars($header, ENT_QUOTES, $this->encoding), 0, 255));
		$text = trim(mb_substr(htmlspecialchars($text, ENT_QUOTES, $this->encoding), 0, 8192));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
			
		if($header == ''){
			parent::prepare_response(['error'=>'THE_INPUT_FIELD_HEADER_IS_NOT_FILLED_IN']);
		}
		
		if($text == ''){
			parent::prepare_response(['error'=>'THE_INPUT_FIELD_TEXT_IS_NOT_FILLED_IN']);
		}
		$text = str_replace('\\n', "\n", $text);
		
		try{

			$result = DB::select('SELECT `expires_token`, `status` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				if( $row->status != 'Администратор'){
					parent::prepare_response(['error'=>'YOU_CAN\'T_DO_THIS_REQUEST']);
				}
				
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		$date = parent::convert_format_date($this->date);
		
		try{
			
			DB::insert('INSERT INTO `news` (`date`, `header`, `text`) values (:date, :header, :text)', ['date' => $date, 'header' => $header, 'text' => $text]);
			DB::update('UPDATE `users` SET `number_new_row_news` = (`number_new_row_news` + 1), `number_of_unread_news` = (`number_of_unread_news` + 1) WHERE `user_myid` != :user_myid', ['user_myid' => $user_myid]);
			DB::update('UPDATE `users` SET `number_of_unread_news` = (`number_of_unread_news` + 1) WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			$id = DB::table('news')->max('id');
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		parent::prepare_response(['response' => ['id' => $id, 'date' => $date, 'header' => $header, 'text' => $text]], true);
		
	}
	
}
