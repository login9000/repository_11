<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;

class ControllerJsError extends Common{
		
	public function __invoke(){
		
		parent::check_allowed_method('GET');			
		parent::log_er_js();
		
	}
	
}
