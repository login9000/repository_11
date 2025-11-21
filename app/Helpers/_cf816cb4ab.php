<?php

namespace App\Helpers\_cf816cb4ab;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class _cf816cb4ab extends Common {
	
	protected $result_ = [['error'=>'unknown'], false];
	
	public function __construct(){
		
		parent::__construct();
		
		$target = trim(mb_substr(htmlspecialchars($_GET['target'] ?? '', ENT_QUOTES, $this->encoding), 0, 32));
		$shipping_warehouse_id = trim(preg_replace('/[^a-f0-9\-]/', '', mb_substr($_GET['shipping_warehouse_id'] ?? '', 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		
		if(!in_array($target, ['product_remains', 'substandard', 'finished_products'])){
			$this->result_ = [['error'=>'TARGET_IS_INCORRECT'], false];
			return;
		}
		
		switch($target){
			case 'product_remains':
				$table_name = 'product_remains';
				break;
			case 'substandard':
				$table_name = 'substandard_catalog';
				break;
			case 'finished_products':
				$table_name = 'finished_products';
				break;
		}
		
		if($shipping_warehouse_id == ''){
			$this->result_ = [['error'=>'SHIPPING_WAREHOUSE_ID_IS_EMPTY_OR_INCORRECT'], false];
			return;
		}
		
		try{

			$result = DB::select('SELECT `expires_token` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				$this->result_ = [['error'=>'NO_EXISTS_ACCOUNT'], false];
				return;
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					$this->result_ = [['error'=>'EXPIRES_TOKEN'], false];
					return;
				}
		
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			$this->result_ = [['error'=>$err], false];
			return;
		}		
		
		$shipment_warehouses_data = parent::get_shipment_warehouses();

		if(array_key_exists('error', $shipment_warehouses_data)){
			$this->result_ = [['error'=>$shipment_warehouses_data['error']], false];
			return;
		}
		
		$arr = [];
		foreach($shipment_warehouses_data['data'] as $c){
			if($target == 'substandard'){
				if($c['СкладНекондиции']){
					$arr[] = $c;
				}
			}else{
				if(!$c['СкладНекондиции']){
					$arr[] = $c;
				}
			}
		}
		$shipment_warehouses_data['data'] = $arr;
		
		$cart_info_data = parent::get_cart_info($user_myid, $target, $shipping_warehouse_id);
		
		if(array_key_exists('error', $cart_info_data)){
			$this->result_ = [['error'=>$cart_info_data['error']], false];
			return;
		}
		
		$data_ = [];
		
		try{
		
			$result = DB::select('SELECT `data` FROM `'.$table_name.'` WHERE `id` = 1 LIMIT 1');
			
			foreach($result as $row){
				$data_ = json_decode($row->data, true);
			}
		
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			if(strpos($err, 'Base table or view not found') === false){
				parent::log_er_mysql($err);
				$this->result_ = [['error'=>$err], false];
				return;
			}
		}
		
		$products = [];
		$list_profiles = [];
		$list_thickness = [];
		$list_coating = [];
		$list_colors = [];
		
		foreach($data_ as $c){
			$actual_date = parent::convert_format_date3($c['Дата']);
			$products[$c['ОсновнойРазделНаименование']] = [];
		}
		
		foreach($products as $key => $val){
			foreach($data_ as $c){
				if($key == $c['ОсновнойРазделНаименование']){
					if(!in_array($c['РазделНаименование'], $products[$key])){
						$products[$key][] = $c['РазделНаименование'];
					}
				}
			}
		}
		
		foreach($data_ as $c){
			foreach($c['ДоступныеЗначенияСвойств'] as $key => $val){
				if($key == 'Профиль'){
					foreach($val as $c2){
						if(!in_array($c2['Представление'], $list_profiles)){
							$list_profiles[] = $c2['Представление'];
						}
					}
				}
				if($key == 'Толщина'){
					foreach($val as $c2){
						if(!in_array($c2['Представление'], $list_thickness)){
							$list_thickness[] = $c2['Представление'];
						}
					}
				}
				if($key == 'Покрытие'){
					foreach($val as $c2){
						if(!in_array($c2['Представление'], $list_coating)){
							$list_coating[] = $c2['Представление'];
						}
					}
				}
				if($key == 'Цвет'){
					foreach($val as $c2){
						if(!in_array($c2['Представление'], $list_colors)){
							$list_colors[] = $c2['Представление'];
						}
					}
				}
			}
		}
			
		$this->result_ = [['response' => ['date' => $actual_date, 'shipment_warehouses' => $shipment_warehouses_data, 'products' => $products, 'list_profiles' => $list_profiles, 'list_thickness' => $list_thickness, 'list_coating' => $list_coating, 'list_colors' => $list_colors, 'cart_info' => $cart_info_data]], true];
		
	}

}