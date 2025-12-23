<?php

namespace App\Http\Controllers;

use App\Helpers\Common;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;

class ControllerTestMysql extends Common{
	
	public function __invoke(){
		
			return '<br>exit!!!!!!!!!!!!';
		
		
			// $data = '';
			// $result = DB::select('SELECT `data` FROM `product_catalog` WHERE `id` = 1 AND `data` != \'\' LIMIT 1');
			
			// foreach ($result as $row) {
				// $data =$row->data;
			// }
			
			// $f = fopen($this->document_root.'/../public/product_catalog.json','a+');
			// ftruncate($f, 0);
			// stream_set_write_buffer($f, 0); 
			// fwrite($f, $data);
			// fflush($f);
			// fclose($f);
		
		 exit('Done.');
		 
		 
		 
		 
		 // $commercial_offer_id = 'c1fcc173-901d-45c8-b19f-06d0cfb6c3e9';
		 
		 // $result = DB::select('SELECT `draft_id`, CONVERT(AES_DECRYPT(`recipient_of_the_commercial_offer`, :aes_key) USING utf8mb4) AS `recipient_of_the_commercial_offer`, `commercial_offer_amount`, `goods`, CONVERT(AES_DECRYPT(`comment`, :aes_key2) USING utf8mb4) AS `comment` FROM `commercial_offers_'.$user_myid.'` WHERE `commercial_offer_id` = :commercial_offer_id LIMIT 1', ['aes_key' => $this->aes_key[0], 'aes_key2' => $this->aes_key[0], 'commercial_offer_id' => $commercial_offer_id]);
		 
		 // var_dump($result);
	
	
		//$main_counterparty_id = '00022222-2a0c-11e5-89e1-40167e7a5fac';
		
		
		
		//exit(var_dump($result));
		
		
		// $date = parent::convert_format_date($this->date);
		// $phone = '3847293749';
		// $phone_hash = md5($phone.'phone_hash');
		// $user_myid = '36ad46c3-0e56-11f0-814d-000c29ac4925';
		// $email = 'guiltyfray@gigabitz.xyz';
		// $fio = 'Оооооооо Оооооооооооо Ооооооооооо';
		// $hashed_pass = Hash::make('Ор876gfgfq');
		// $token = '';
		// $token_hash = md5($token.'token_hash');
		// $manager_fio = '';
		// $manager_email = '';
		
		// DB::insert('INSERT INTO `users` (`date`, `ip`, `phone_hash`, `phone`, `user_myid`, `email`, `fio`, `hashed_pass`, `token_hash`, `token`, `manager_fio`, `manager_email`) values (:date, AES_ENCRYPT(:ip, :aes_key1), :phone_hash, AES_ENCRYPT(:phone, :aes_key2), :user_myid, AES_ENCRYPT(:email, :aes_key3), AES_ENCRYPT(:fio, :aes_key4), :hashed_pass, :token_hash, AES_ENCRYPT(:token, :aes_key5), AES_ENCRYPT(:manager_fio, :aes_key6), AES_ENCRYPT(:manager_email, :aes_key7))', ['date' => $date, 'ip' => '', 'aes_key1' => $this->aes_key[0], 'phone_hash' => $phone_hash, 'phone' => $phone, 'aes_key2' => $this->aes_key[0], 'user_myid' => $user_myid, 'email' => $email, 'aes_key3' => $this->aes_key[0], 'fio' => $fio, 'aes_key4' => $this->aes_key[0], 'hashed_pass' => $hashed_pass, 'token_hash' => $token_hash, 'token' => $token, 'aes_key5' => $this->aes_key[0],  'manager_fio' => $manager_fio, 'aes_key6' => $this->aes_key[0], 'manager_email' => $manager_email, 'aes_key7' => $this->aes_key[0]]);
		
		
		// $result = DB::select('SELECT `phone_hash`, CONVERT(AES_DECRYPT(`phone`, :aes_key) USING utf8mb4) AS `phone` FROM `users`', ['aes_key' => $this->aes_key[0]]);
		// foreach ($result as $row) {
			// echo 'phone_hash='.$row->phone_hash.', phone='.$row->phone.'<br>';
		// }
		
		
		//mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
		
		// $mysqli = @new \mysqli(env('DB_HOST'), env('DB_USERNAME'), env('DB_PASSWORD'), env('DB_DATABASE'));		
		// if ($mysqli->connect_error) {
				// exit($mysqli->connect_error);
		// }
		
		// if(!$mysqli->query('CREATE TABLE `users1` (`id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, `counterparty_id` char(36) NOT NULL DEFAULT \'\', `application_id` char(36) NOT NULL DEFAULT \'\', `fullname` blob DEFAULT NULL, `inn` tinyblob DEFAULT NULL, `kpp` tinyblob DEFAULT NULL, `ogrn` tinyblob DEFAULT NULL, `legal_address` blob DEFAULT NULL, `actual_address` blob DEFAULT NULL, `corr_account` tinyblob DEFAULT NULL, `bank_bik` tinyblob DEFAULT NULL, `bank_name` tinyblob DEFAULT NULL, `checking_account` tinyblob DEFAULT NULL, `bonus_percentage` tinyint(3) UNSIGNED DEFAULT 0, `id_delivery_addresses` char(36) DEFAULT \'\', `is_confirmed` char(1) DEFAULT \'\', `ids_row_update` text NOT NULL DEFAULT \'\') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4')){
			// exit('Error: '. $mysqli->error);
		// }
		
		
		// echo '$result='.$result;
		
		// return '<br>exit!';
		//$aes_key = $this->aes_key[0];
		// return '$aes_key='.$aes_key;
		
		
		
		// $aes_key = '5c5976f5937236153d6fbe7e696c405e25476f66c6c9f5e3561232a71d3095a5';
		
		// $email = 'edwe@gmail.com';
		// $login = 'Dexter';
		// DB::insert('INSERT INTO `testtt` (`login`, `email`) values (AES_ENCRYPT(:login, :aes_key), AES_ENCRYPT(:email, :aes_key2))', ['login' => $login, 'aes_key' => $this->aes_key[0], 'email' => $email, 'aes_key2' => $this->aes_key[0]]);
		
		// $result_ = DB::select('SELECT CONVERT(AES_DECRYPT(`email`, :aes_key) USING utf8mb4) AS `email` FROM `testtt`', ['aes_key' => $this->aes_key[0]]);
		// var_dump($result_);
		// foreach ($result_ as $row) {
			// echo 'email='.($row->email == '');
		// }
		
		// return '<br>Done!';
		
		
		
		
		// $result_ = DB::select('SHOW TABLES');
		// var_dump($result_);
		
		
		
		// $result_ = DB::select('SELECT `id`, CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token` FROM `users`', ['aes_key' => $this->aes_key[0]]);
		// foreach ($result_ as $row) {
			// $token_hash = md5($row->token . 'token_hash');
			// DB::update('UPDATE `users` SET `token_hash` = :token_hash WHERE `id` = :id', ['token_hash' => $token_hash, 'id' => $row->id]);
		// }
		
		
		
		
		
		
		
		
		
		// $mysqli = new \mysqli(env('DB_HOST'), env('DB_USERNAME'), env('DB_PASSWORD'), env('DB_DATABASE'));
		
		// $result = DB::select('SELECT `timestamp`, CONVERT(AES_DECRYPT(`rsa_privkey`, :aes_key) USING utf8mb4) AS `rsa_privkey`, CONVERT(AES_DECRYPT(`rsa_pubkey`, :aes_key2) USING utf8mb4) AS `rsa_pubkey` FROM `common_rsa_keys` WHERE `id` = 1', ['aes_key' => '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8', 'aes_key2' => '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8']);
		// foreach ($result as $row) {
			// DB::insert('INSERT INTO `common_rsa_keys_2` (`id`, `timestamp`, `rsa_privkey`, `rsa_pubkey`) values (:id, :timestamp, AES_ENCRYPT(:rsa_privkey, :aes_key), AES_ENCRYPT(:rsa_pubkey, :aes_key2))', ['id' => 1, 'timestamp' => $row->timestamp, 'rsa_privkey' => $row->rsa_privkey, 'aes_key' => $this->aes_key[0], 'rsa_pubkey' => $row->rsa_pubkey, 'aes_key2' => $this->aes_key[0]]);
		// }
	
		
		
		
		
		
		
		
		
		
		
		// $mysqli = new \mysqli(env('DB_HOST'), env('DB_USERNAME'), env('DB_PASSWORD'), env('DB_DATABASE'));
		
		// $result_ = DB::select('SHOW TABLES');
		
		
		// foreach ($result_ as $row) {
			// if(strpos($row->Tables_in_db1, 'shipments_') !== false){
				
				// $result_2 = DB::select('SELECT *, CONVERT(`responsible_sokrof` USING utf8mb4) AS `responsible_sokrof2`, CONVERT(`comment` USING utf8mb4) AS `comment2` FROM `'.($row->Tables_in_db1).'`');
				
				// $mysqli->query('CREATE TABLE `'.($row->Tables_in_db1).'_2` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, `shipping_date` char(22) NOT NULL DEFAULT \'\', `timestamp_shipments` int UNSIGNED NOT NULL DEFAULT 0, `shipment_id` char(36) NOT NULL DEFAULT \'\', `shipment_number` char(11) NOT NULL DEFAULT \'\', `status` enum(\'in_processing\',\'processed\',\'canceled\') NOT NULL DEFAULT \'in_processing\', `delivery_address_id` char(36) NOT NULL DEFAULT \'\', `shipping_warehouse_id` char(36) NOT NULL DEFAULT \'\', `counterparty_id` char(36) NOT NULL DEFAULT \'\', `sum` char(32) NOT NULL DEFAULT \'0\', `weight` char(32) NOT NULL DEFAULT \'0\', `responsible_sokrof` blob DEFAULT NULL, `client_id` char(36) NOT NULL DEFAULT \'\', `ids_row_update` text DEFAULT NULL, `comment` blob DEFAULT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;');
				
				// $mysqli->query('ALTER TABLE `'.($row->Tables_in_db1).'_2` ADD KEY `shipment_id_index` (`shipment_id`) USING BTREE');
			
				// foreach ($result_2 as $row2) {
					
					// $shipping_date = $row2->shipping_date;
					// $timestamp_shipments = $row2->timestamp_shipments;
					// $shipment_id = $row2->shipment_id;
					// $shipment_number = $row2->shipment_number;
					// $status = $row2->status;
					// $delivery_address_id = $row2->delivery_address_id;
					// $shipping_warehouse_id = $row2->shipping_warehouse_id;
					// $counterparty_id = $row2->counterparty_id;
					// $sum = $row2->sum;
					// $weight = $row2->weight;
					// $responsible_sokrof = $row2->responsible_sokrof2;
					// $client_id = $row2->client_id;
					// $ids_row_update = $row2->ids_row_update;
					// $comment = $row2->comment2;
					
					// DB::insert('INSERT INTO `'.($row->Tables_in_db1).'_2` (`shipping_date`, `timestamp_shipments`, `shipment_id`, `shipment_number`, `status`, `delivery_address_id`, `shipping_warehouse_id`, `counterparty_id`, `sum`, `weight`, `responsible_sokrof`, `client_id`, `ids_row_update`, `comment`) values (:shipping_date, :timestamp_shipments, :shipment_id, :shipment_number, :status, :delivery_address_id, :shipping_warehouse_id, :counterparty_id, :sum, :weight, AES_ENCRYPT(:responsible_sokrof, :aes_key), :client_id, :ids_row_update, AES_ENCRYPT(:comment, :aes_key2))', ['shipping_date' => $shipping_date, 'timestamp_shipments' => $timestamp_shipments, 'shipment_id' => $shipment_id, 'shipment_number' => $shipment_number, 'status' => $status, 'delivery_address_id' => $delivery_address_id, 'shipping_warehouse_id' => $shipping_warehouse_id, 'counterparty_id' => $counterparty_id, 'sum' => $sum, 'weight' => $weight, 'responsible_sokrof' => $responsible_sokrof, 'aes_key' => $this->aes_key[0], 'client_id' => $client_id, 'ids_row_update' => $ids_row_update, 'comment' => $comment, 'aes_key2' => $this->aes_key[0]]);
					
				// }
				
			// }
		// }
		
		

		/*
		foreach ($result_ as $row) {
			
			$date = $row->date;
			$ip = $row->ip;
			$phone = $row->phone;
			$phone_hash = md5($row->phone.'phone_hash');
			$user_myid = $row->user_myid;
			$email = $row->email;
			$status = $row->status;
			$fio = $row->fio;
			$hashed_pass = $row->hashed_pass;
			$photo = $row->photo;
			$timestamp_set_ban = $row->timestamp_set_ban;
			$token = $row->token;
			$expires_token = $row->expires_token;
			$manager_fio = $row->manager_fio;
			$manager_email = $row->manager_email;
			$manager_id = $row->manager_id;
			$client_user_myid = $row->client_user_myid;
			$number_of_unread_news = $row->number_of_unread_news;
			$number_new_row_news = $row->number_new_row_news;
			$is_banned = $row->is_banned;
			$main_counterparty_id = $row->main_counterparty_id;
			$password_changed_from_1c = $row->password_changed_from_1c;
			
			DB::insert('INSERT INTO `users2` (`date`, `ip`, `phone_hash`, `phone`, `user_myid`, `email`, `status`, `fio`, `photo`, `hashed_pass`, `timestamp_set_ban`, `token`, `expires_token`, `manager_fio`, `manager_email`, `manager_id`, `client_user_myid`, `number_of_unread_news`, `number_new_row_news`, `is_banned`, `main_counterparty_id`, `password_changed_from_1c`) values (:date, AES_ENCRYPT(:ip, :aes_key1), :phone_hash, AES_ENCRYPT(:phone, :aes_key2), :user_myid, AES_ENCRYPT(:email, :aes_key3), :status, AES_ENCRYPT(:fio, :aes_key4), :photo, :hashed_pass, :timestamp_set_ban, AES_ENCRYPT(:token, :aes_key5), :expires_token, AES_ENCRYPT(:manager_fio, :aes_key6), AES_ENCRYPT(:manager_email, :aes_key7), :manager_id, :client_user_myid, :number_of_unread_news, :number_new_row_news, :is_banned, :main_counterparty_id, :password_changed_from_1c)', ['date' => $date, 'ip' => $ip, 'aes_key1' => $this->aes_key[0], 'phone_hash' => $phone_hash, 'phone' => $phone, 'aes_key2' => $this->aes_key[0], 'user_myid' => $user_myid, 'email' => $email, 'aes_key3' => $this->aes_key[0], 'status' => $status, 'fio' => $fio, 'aes_key4' => $this->aes_key[0], 'photo' => $photo, 'hashed_pass' => $hashed_pass, 'timestamp_set_ban' => $timestamp_set_ban, 'token' => $token, 'aes_key5' => $this->aes_key[0], 'expires_token' => $expires_token, 'manager_fio' => $manager_fio, 'aes_key6' => $this->aes_key[0], 'manager_email' => $manager_email, 'aes_key7' => $this->aes_key[0], 'manager_id' => $manager_id, 'client_user_myid' => $client_user_myid, 'number_of_unread_news' => $number_of_unread_news, 'number_new_row_news' => $number_new_row_news, 'is_banned' => $is_banned, 'main_counterparty_id' => $main_counterparty_id, 'password_changed_from_1c' => $password_changed_from_1c]);
			
			// break;
			
		}
		*/
		
		// DB::update('UPDATE `counterparties_0c18e985-382e-11ee-8143-000c29ac4925` SET `application_id` = `counterparty_id`, `counterparty_id` = \'\' WHERE `counterparty_id` != \'\' AND `is_confirmed` = \'\'');
		
		/* 
		
		$result = DB::select('SELECT * FROM `counterparties_0c18e985-382e-11ee-8143-000c29ac4925`');
		foreach ($result as $row) {
			
			
			
		} */
		
		//DB::table('orders_')->count('id');
		//echo Schema::hasTable('users');
		return '<br>Done!!!!';
		/* $user_myid = '111';
		try{
			DB::table('orders_'.$user_myid)->count('id');
		} catch (QueryException $e) {
			if(strpos($e->getMessage(), 'Base table or view not found') === false){
				return json_encode(array('error'=>$e->getMessage()));
			}else{
				return json_encode(array('error'=>'NO_AVAILABLE_EMPLOYEES_IN_THE_DATABASE'));
			}
		}
		return 'ok!'; */
		
		//echo DB::table('users')->count('id');
		
		/* $orders2 = [[
			"ЗаказПокупателяИД" => "c8edc64a-22e6-11ed-8137-000c29ac4925",
			"ПользовательИД" => "0c18e985-382e-11ee-8143-000c29ac4925",
			"СтатусИД" => "ВРаботе",
			"СтатусОплаты" => "100%",
			"Дата" => "2022-08-23T16:23:34",
			"Номер" => "00СТ-017558",
			"КонтрагентИД" => "b0d340f5-b56f-11ec-812f-000c29ac4925",
			"НаличнаяОплата" => false,
			"ДатаОтгрузки" => "2023-04-10T00:00:00",
			"ДатаПереноса" => "0001-01-01T00:00:00",
			"СкладОтгрузкиИД" => "af9d1805-8548-11e0-b35b-485d60e01729",
			"Доставка" => true,
			"Вес" => 243.817,
			"СуммаДокумента" => 29316,
			"АдресДоставки" => "603059"
			],
			[
			"ЗаказПокупателяИД" => "5a9cce5e-2542-11ed-8137-000c29ac4925",
			"ПользовательИД" => "0c18e985-382e-11ee-8143-000c29ac4925",
			"СтатусИД" => "ВРаботе",
			"СтатусОплаты" => "100%",
			"Дата" => "2022-08-26T16:24:04",
			"Номер" => "00СТ-017908",
			"КонтрагентИД" => "b0d340f5-b56f-11ec-812f-000c29ac4925",
			"НаличнаяОплата" => false,
			"ДатаОтгрузки" => "2023-04-12T00:00:00",
			"ДатаПереноса" => "0001-01-01T00:00:00",
			"СкладОтгрузкиИД" => "af9d1805-8548-11e0-b35b-485d60e01729",
			"Доставка" => true,
			"Вес" => 108.158,
			"СуммаДокумента" => 16582.5,
			"АдресДоставки" => "603059, Нижегородская обл, Нижний Новгород г, Витебская ул, дом № 11"
			],
			[
			"ЗаказПокупателяИД" => "0b008639-28f9-11ed-8137-000c29ac4925",
			"ПользовательИД" => "0c18e985-382e-11ee-8143-000c29ac4925",
			"СтатусИД" => "ВРаботе",
			"СтатусОплаты" => "100%",
			"Дата" => "2022-08-31T09:49:24",
			"Номер" => "00СТ-018249",
			"КонтрагентИД" => "b0d340f5-b56f-11ec-812f-000c29ac4925",
			"НаличнаяОплата" => false,
			"ДатаОтгрузки" => "2022-09-05T00:00:00",
			"ДатаПереноса" => "0001-01-01T00:00:00",
			"СкладОтгрузкиИД" => "af9d1805-8548-11e0-b35b-485d60e01729",
			"Доставка" => false,
			"Вес" => 88.4,
			"СуммаДокумента" => 9240,
			"АдресДоставки" => ""
			],
			[
			"ЗаказПокупателяИД" => "63df3529-e4c3-11ed-8143-000c29ac4925",
			"ПользовательИД" => "0c18e985-382e-11ee-8143-000c29ac4925",
			"СтатусИД" => "ВРаботе",
			"СтатусОплаты" => "100%",
			"Дата" => "2023-04-27T09:18:57",
			"Номер" => "00СТ-000035",
			"КонтрагентИД" => "b0d340f5-b56f-11ec-812f-000c29ac4925",
			"НаличнаяОплата" => false,
			"ДатаОтгрузки" => "2023-05-08T00:00:00",
			"ДатаПереноса" => "0001-01-01T00:00:00",
			"СкладОтгрузкиИД" => "af9d1805-8548-11e0-b35b-485d60e01729",
			"Доставка" => false,
			"Вес" => 46.41,
			"СуммаДокумента" => 4915,
			"АдресДоставки" => ""
			]
		];
		
			$user_myid = '0c18e985-382e-11ee-8143-000c29ac4925';
		
			Schema::create('shipments_'.$user_myid, function ($table) {
				$table->engine = 'InnoDB';
				$table->increments('id');
				$table->char('shipping_date', 22)->default('');
				$table->integer('timestamp_shipments')->default(0)->unsigned();
				$table->char('shipment_id', 36)->default('');
				$table->char('shipment_number', 11)->default('');
				$table->enum('status', ['in_processing', 'processed', 'canceled'])->default('in_processing');
				$table->char('delivery_address_id', 36)->default('');
				$table->char('shipping_warehouse_id', 36)->default('');
				$table->char('counterparty_id', 36)->default('');
				$table->bigInteger('sum')->default(0)->unsigned();
				$table->char('weight', 32)->default('');
				$table->char('responsible_sokrof', 255)->default('');
				$table->char('client_id', 36)->default('');
				$table->text('ids_row_update')->default('');
			});
						
			DB::insert('INSERT INTO `shipments_'.$user_myid.'` (`ids_row_update`) values (\'\')');
			
			foreach($orders2 as $c){
				
				$delivery_address_id = $c['АдресДоставкиИД'];
				$shipping_warehouse_id = $c['СкладОтгрузкиИД'];
				$counterparty_id = $c['КонтрагентИД'];
				$sum = $c['СуммаДокумента'];
				$weight = $c['Вес'];
				$client_id = $c['ПользовательИД'];
				
				DB::insert('INSERT INTO `shipments_'.$user_myid.'` (`shipping_date`, `timestamp_shipments`, `shipment_id`, `shipment_number`, `delivery_address_id`, `shipping_warehouse_id`, `counterparty_id`, `sum`, `weight`, `responsible_sokrof`, `client_id`) values (:shipping_date, :timestamp_shipments, :shipment_id, :shipment_number, :delivery_address_id, :shipping_warehouse_id, :counterparty_id, :sum, :weight, :responsible_sokrof, :client_id)', ['shipping_date' => $shipping_date, 'timestamp_shipments' => $timestamp_shipments, 'shipment_id' => $shipment_id, 'shipment_number' => $shipment_number, 'delivery_address_id' => $delivery_address_id, 'shipping_warehouse_id' => $shipping_warehouse_id, 'counterparty_id' => $counterparty_id, 'sum' => $sum, 'weight' => $weight, 'responsible_sokrof' => $responsible_sokrof, 'client_id' => $client_id]);
			
			}
	
		
		echo 'Done.'; */
	
	
	
	
	
	
			
		/* for($i = 0; $i < 70; $i++){
				$date = mt_rand(0, 31).' авг 2023 в '.mt_rand(10, 23).':03:46';
				$header = 'Заголовок '.$i.' ... ';
				$text = 'Текст новости '.$i.' цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq цшйинсцйшни цумкшцсншкциунск цскшцунискшгцнуиксшцгнус vleriuvbkywkue 534ckwcq ... ';
				DB::insert('INSERT INTO `news` (`date`, `header`, `text`) values (:date, :header, :text)', ['date' => $date, 'header' => $header, 'text' => $text]);
			} */
		
		//echo parent::create_guid();
		
		
		/* try{

			Schema::create('users', function ($table) {
				$table->engine = 'InnoDB';
				$table->increments('id');
			});
			
		} catch (QueryException $e) {
			return 'Error: '.$e->getMessage();
		} */
		
		//echo DB::table('users1')->count('id');
		

			
			//DB::table('employees_111')->count('id');
			
			/* $user_id = '935';
			$result = DB::update('UPDATE `users` SET `fio` = CONCAT(`fio`, :user_id) WHERE NOT `fio` LIKE \'%'.$user_id.' %\'', ['user_id' => $user_id.' ']);
			var_dump($result); */
			
			/* $ip = '109.184.9.27';
			
			$result = DB::select('SELECT SQL_CACHE `country` FROM `geoip` WHERE `ip` < INET_ATON(\''.$ip.'\') ORDER BY `ip` DESC LIMIT 1');
			
			echo '<pre>';
			var_dump($result);
			echo '</pre>'; */
			
			/* $date = parent::convert_format_date($this->date);
			$date = str_replace('в ', '', $date);
			$time = $_SERVER['REQUEST_TIME'] ?? time();
			
			for($i = 0; $i < 10; $i++){
				
				$login = 'login ... '.mt_rand(100000,999000).mt_rand(100000,999000);
				$user_myid = mt_rand(100000,999000).mt_rand(100000,999000);
				$uuid = $this->create_guid();
				$uuid = '';
				$user_myid_and_id_duel = $user_myid.'-'.mt_rand(100000,999000).mt_rand(100000,999000);
				$hash_update_data = substr(md5(mt_rand(100000,999000) . $time), 0, 10);
				
				DB::insert('INSERT INTO `queue_for_api_requests` (`act`, `login`, `user_myid`, `card_number`, `sum`, `result`, `uuid`, `user_myid_and_id_duel`, `timestamp` , `date`, `hash_update_data`) values (\'1\', :login, :user_myid, \'5555 5555 5555 5555\', \'105\', \'-\', :uuid, :user_myid_and_id_duel, :timestamp , :date, :hash_update_data)', ['login' => $login, 'user_myid' => $user_myid, 'uuid' => $uuid, 'user_myid_and_id_duel' => $user_myid_and_id_duel, 'timestamp' => $time, 'date' => $date, 'hash_update_data' => $hash_update_data]);
				
			} */
			
			/*$result = DB::select('SELECT * FROM `users` WHERE `login` LIKE \'User %\'');
			$auth_salt = 'ehfg0';
			$arr_ = [];
			
			foreach ($result as $row) {
				
				$arr = [];
				$arr['login'] = $row->login;
				$arr['user_myid'] = $row->user_myid;
				$arr['uid'] = md5($row->login . $auth_salt).' '.md5($row->user_myid . $auth_salt);
				$arr_[] = $arr;
				
			}*/
		
		
		
	}
	
}
