<?php

return [
	
	'ignor_error_mes' => '|Script error.|Script error|[object Event]|UnknownError|InvalidStateError|Uncaught ArgumentError: Error |Uncaught TypeError: Object |UNTRUSTED/1.0|nokia 6233|Dalvik/2.|UCBrowser/9.|Firefox/3.|',
	'descriptions' => ['home' => ''],
	'connect_process_timeout' => 29,
	'connect_process_timeout2' => 30,
	'authorization_basic' => 'MUM6MQ==',
	'project_name' => 'SOKROF',
	'host_name' => '31.129.108.253', // например «site.com» или ip или пусто
	'smtp_host' => 'mail.sokrof.com',
	'smtp_port' => 587,
	'smtp_login' => 'sokrof\\no-reply',
	'smtp_password' => 'Piano555',
	'email_sender_service_port' => 23424,
	'pdf_creator_service_port' => 18024,
	'xlsx_creator_service_port' => 6722,
	'max_count_fail_auth' => 5,
	'find_time_fail_auth' => 3600,
	'time_ban_if_fail_auth' => 600,
	'auth_salt' => 'fljkwefwef',
	'allow_photo_expansions' => ['jpg', 'png', 'jpeg', 'gif', 'JPG', 'PNG', 'JPEG', 'GIF'],
	'max_file_size_photo' => 5000,
	'max_file_size_for_manager' => 5000,
	'max_file_size_for_non_standard_addition' => 6000,
	'allow_file_for_non_standard_addition' => ['doc', 'rar', 'zip', '7z', 'pdf', 'xlsx', 'xls', 'jpg', 'png', 'jpeg', 'gif', 'DOC', 'RAR', 'ZIP', '7Z', 'PDF', 'XLSX', 'XLS', 'JPG', 'PNG', 'JPEG', 'GIF'],
	'allow_file_for_manager' => ['docx', 'doc', 'rar', 'zip', '7z', 'pdf', 'xlsx', 'xls', 'jpg', 'jpeg', 'DOCX', 'DOC', 'RAR', 'ZIP', '7Z', 'PDF', 'XLSX', 'XLS', 'JPG', 'JPEG'],
	'url_1с' => 'sokrof.com',
	'path_1с' => '/unf_sitec', // "/unf" - рабочий, "/unf_sitec" - тестовый
	'port_1с' => 81,	
	'orders_statuses' => [
		'ТребуетПодтверждения' => 'needs_confirmation',
		'ГотовКОтгрузке' => 'ready_for_shipment',
		'ВРаботе' => 'in_work',
		'НаОбработке' => 'in_processing',
		'Отгружен' => 'shipped',
		'ВОтгрузке' => 'in_shipment',
		'Отменен' => 'canceled',
		'Черновик' => 'draft'
	],
	'user_statuses' => [
		'Администратор',
		'ОсновнойПрофиль',
		'Сотрудник'
	],
	'rsa_crypto_service_port' => 5101,
	'rsa_crypto_service_socket' => '/tmp/rsa_crypto_service_sokrof.sock',
	'aes_crypto_service_port' => 5102,
	'aes_crypto_service_socket' => '/tmp/aes_crypto_service_sokrof.sock'

];
