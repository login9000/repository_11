<?php

namespace App\Http\Controllers\Api_v2;

class ControllerUnauthenticated{
	
	public function handler(){
		
		header($_SERVER['SERVER_PROTOCOL'].' 401 Unauthorized', true, 401);
		exit('{"message": "Unauthenticated."}');
		
	}
	
}
