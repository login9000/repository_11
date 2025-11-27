<?php

namespace App\Helpers\_7a5d225581;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class _7a5d225581 extends Common {
	
	protected $result_ = [['error'=>'unknown'], false];
	
	public function __construct(){
		
		parent::__construct();
		
		$err = parent::validate_get_params('other');
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		$client_rsa_pubkey = htmlspecialchars($_GET['client_rsa_pubkey'], ENT_QUOTES, $this->encoding);
		
		$based_on_cart = $_GET['based_on_cart'] ?? '';
		$shipping_warehouse_id = trim(preg_replace('/[^a-f0-9\-]/', '', substr($_GET['shipping_warehouse_id'] ?? '', 0, 36)));
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			$this->result_ = [['error'=>$err], false];
			return;
		}
		
		if($based_on_cart != '' && !in_array($based_on_cart, ['product_remains', 'substandard', 'finished_products'])){
			$this->result_ = [['error'=>'BASED_ON_CART_IS_INCORRECT'], false];
			return;
		}
		
		if($based_on_cart != '' && $shipping_warehouse_id == ''){
			$this->result_ = [['error'=>'SHIPPING_WAREHOUSE_ID_IS_EMPTY_OR_INCORRECT'], false];
			return;
		}
		
		$token = '';
		$main_counterparty_id = '';
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token`, `main_counterparty_id` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				$this->result_ = [['error'=>'NO_EXISTS_ACCOUNT'], false];
				return;
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					$this->result_ = [['error'=>'EXPIRES_TOKEN'], false];
					return;
				}
				$token = $row->token;
				$main_counterparty_id = $row->main_counterparty_id;
				
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			$this->result_ = [['error'=>$err], false];
			return;
		}		
		
		$product_catalog_data = ['data' => []];
		$prices_product_catalog_data = ['data' => []];
		$available_specifications_data = ['data' => []];
		$shipping_warehouse_name = '';
		$cart_contents = ['data' => []];
		
		$delivery_addresses_data = parent::get_delivery_addresses($token);
		$counterparties_data = parent::get_counterparties($main_counterparty_id);
		$shipment_warehouses_data = parent::get_shipment_warehouses();
			
		if(array_key_exists('error', $shipment_warehouses_data)){
			$this->result_ = [['error'=>$shipment_warehouses_data['error']], true];
			return;
		}
		$arr = [];
		foreach($shipment_warehouses_data['data'] as $c){
			if(!$c['СкладНекондиции']){
				$arr[] = $c;
			}
		}
		$shipment_warehouses_data['data'] = $arr;
		
		if($based_on_cart == ''){
			$product_catalog_data = parent::get_product_catalog();
			$prices_product_catalog_data = parent::get_prices_of_the_main_counterparty();
			$available_specifications_data = parent::get_available_specifications();
		}else{
			list($shipping_warehouse_name, $cart_contents, $err) = parent::prepare_cart_contents($user_myid, $based_on_cart, $shipping_warehouse_id);
			if($err){
				$this->result_ = [['error'=>$err], true];
				return;
			}
		}
		
		list($data_crypt, $symmetric_key_crypt, $err) = parent::handler_data_crypt2(['delivery_addresses' => $delivery_addresses_data, 'counterparties' => $counterparties_data, 'shipment_warehouses' => $shipment_warehouses_data, 'prices_product_catalog' => $prices_product_catalog_data, 'shipping_warehouse_name' => $shipping_warehouse_name, 'shipping_warehouse_id' => $shipping_warehouse_id, 'cart_contents' => $cart_contents, 'available_specifications' => $available_specifications_data], $client_rsa_pubkey);
		if($err){
		 $this->result_ = [['error'=>$err], false];
		 return;
		}
		
		$this->result_ = [['response' => ['data_crypt' => $data_crypt, 'symmetric_key_crypt' => $symmetric_key_crypt]], true];
		
	}

}