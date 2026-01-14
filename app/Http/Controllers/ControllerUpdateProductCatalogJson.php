<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Helpers\Common;

class ControllerUpdateProductCatalogJson extends Common {
	
	public function __invoke(){
		
		$data = '';
		$result = DB::select('SELECT `data` FROM `product_catalog` WHERE `id` = 1 AND `data` != \'\' LIMIT 1');

		foreach ($result as $row) {
			$data =$row->data;
		}

		$product_catalog = parent::transformation_product_catalog(json_decode($data, true));
		
		$f = fopen($this->document_root.'/../public/product_catalog.json','a+');
		ftruncate($f, 0);
		stream_set_write_buffer($f, 0); 
		fwrite($f,json_encode($product_catalog, JSON_UNESCAPED_UNICODE));
		fflush($f);
		fclose($f);

		exit('Done.');
		 
	}
	
}
