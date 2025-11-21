<?php


$socket = @fsockopen('unix://tmp/rsa_crypto_service_sokrof.sock', -1, $errorNumber, $errorDescription, 15);

//$socket = @fsockopen('31.129.108.253', 5101, $errorNumber, $errorDescription, 15); // <-- если это раскомментить то работает

echo 'unix<br>';

if(!$socket ){
	exit('FAIL_SOCKET_CONNECT');
}

echo 'ok';
