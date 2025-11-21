<?php

namespace App\Http\Controllers;
use App\Helpers\Common;

class ControllerRoot extends Common {
	
	public function __invoke(){
		list($rsa_pubkey, $rsa_privkey, $err) = parent::get_common_rsa_keys();

		return view('home', [
			'rsa_pubkey' => $rsa_pubkey
		//'get_meta_tags_' => parent::get_meta_tags_(), 
		//'get_detect_js_errors_script' => parent::get_detect_js_errors_script()
		]);

	}
	
}
