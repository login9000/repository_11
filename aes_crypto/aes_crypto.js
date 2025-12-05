const fs = require('fs');
const aes = require('./crypto-js-aes.js');
const readline = require('readline');
const net = require('net');
const dotenv = require('dotenv'); // npm install dotenv
const { console_log_pass, console_log_fail, console_log_warn } = require('./colorfull_console_log');
const axios = require('axios'); // npm install axios
const Validator = require('jsonschema').Validator; // npm i jsonschema

var document_root = __dirname,
		js_eol = (process.platform == 'linux' ? '\r\n' : '\n'),
		app_version = '9.4',
		count_lines_log_err_aes_crypto = 0,
		config_app = {};
		
async function log_err_aes_crypto(mes){
	try{
		var file_name = document_root+'/logs/errors_aes_crypto_service(js).log';
		var dt = new Date();
		var timestamp = dt / 1000;
		var date = String(dt) + ' ' + timestamp + ' ';
		mes = date+' '+mes + js_eol+'----------------------------------------------------------------------------------------' + js_eol
		if(count_lines_log_err_aes_crypto > 100000){
			await new Promise(async (resolve, reject) => {
				try{
					if(!await file_exists(file_name)){
						resolve();
						return;
					}
					fs.copyFile(file_name, file_name.replace(/(\.log)$/, '_2$1'), (err) => { if (err) { reject(err); return; }; resolve(); }); 
				}catch(err){
					reject(err);
				}
			});
			await new Promise(async (resolve, reject) => {
				try{
					if(!await file_exists(file_name)){
						resolve();
						return;
					}
					fs.truncate(file_name, 0, (err) => { if (err) { reject(err); return; }; resolve(); }); 
				}catch(err){
					reject(err);
				}
			});
			count_lines_log_err_aes_crypto = 0;
		}
		await new Promise((resolve, reject) => {
			try{
				fs.appendFile(file_name, mes, 'utf8', (err) => { 
					date = null, 
					mes = null, 
					matches = null; 
					if (err) { reject(err); return; }; 
					resolve(); 
				});
			}catch(err){
				reject(err);
			}
		});
		count_lines_log_err_aes_crypto++;
	}catch (err) {
		console_log_fail('E: '+err.stack ? String(err.stack) : err);
	}
}

async function report_errors_to_tg(source, error){
	try{
		new Promise(async (resolve, reject) => {
			try{
				axios.post('http://127.0.0.1:'+config_app['report_errors_to_tg_service_port']+'/api/v5/log', {
					'source': source,
					'error': error.replace(/\r?\n/g, ' ')
				}, { 'timeout':5000 })
				.then((res) => {})
				.catch((err) => {console_log_fail('E: '+err)});
				resolve();
			}catch (err) {
				reject(err)
			}
		});
	}catch (err) {
		console_log_fail('E: '+err.stack ? String(err.stack) : err);
	}
}

async function remove_unix_socket(){
	if(process.platform != 'linux'){
		return;
	}
	try {
		await fs.promises.access(config_app['aes_crypto_service_socket']);
		fs.unlinkSync(config_app['aes_crypto_service_socket']);
	} catch (e) {}
}

async function file_exists(file_name){
	try{
		await fs.promises.access(file_name);
		return true;
	}catch(err){
		return false;
	}
}

async function file_to_array(filepath){
	try{
		var read_stream = fs.createReadStream(filepath);
		var result = await new Promise((resolve, reject) => {
			try{
				var strings = [];
				var rl = readline.createInterface({
					input: read_stream,
				});
				rl.on('line', (line) => strings.push(line));
				rl.once('close', () => resolve(strings));
				rl.once('error', (err) => reject(err));
			}catch(err){
				reject(err);
			}
		});
		read_stream = null;
		return result;
	}catch(err){
		var err = (err.stack ? String(err.stack) : err);
		log_err_aes_crypto(err);
		return [];
	}
}

function parse_env(){
	config_app['aes_crypto_service_port'] = process.env.AES_CRYPTO_SERVICE_PORT;
	config_app['aes_crypto_service_socket'] = process.env.AES_CRYPTO_SERVICE_SOCKET;
	config_app['report_errors_to_tg_service_port'] = process.env.REPORT_ERRORS_TO_TG_SERVICE_PORT;
	config_app['default_host_for_microservices'] = process.env.DEFAULT_HOST_FOR_MICROSERVICES;
	if(config_app['aes_crypto_service_port'] == undefined){
		return 'aes_crypto_service_port is enpty or not set. See '+document_root+'/../.env file';
	}
	if(isNaN(+config_app['aes_crypto_service_port'])){
		return 'aes_crypto_service_port is incorrect, a number between 1025 and 65535 is required.';
	}
	if(+config_app['aes_crypto_service_port'] < 1025 || +config_app['aes_crypto_service_port'] > 65535){
		return 'aes_crypto_service_port is incorrect, a number between 1025 and 65535 is required.';
	}
	if(config_app['aes_crypto_service_socket'] == undefined){
		return 'aes_crypto_service_socket is enpty or not set. See '+document_root+'/../.env file';
	}
	if(config_app['report_errors_to_tg_service_port'] == undefined){
		return 'report_errors_to_tg_service_port is enpty or not set. See '+document_root+'/../.env file';
	}
	if(isNaN(+config_app['report_errors_to_tg_service_port'])){
		return 'report_errors_to_tg_service_port is incorrect, a number between 1025 and 65535 is required.';
	}
	if(+config_app['report_errors_to_tg_service_port'] < 1025 || +config_app['report_errors_to_tg_service_port'] > 65535){
		return 'report_errors_to_tg_service_port is incorrect, a number between 1025 and 65535 is required.';
	}
	if(config_app['default_host_for_microservices'] == undefined){
		return 'default_host_for_microservices is enpty or not set. See '+document_root+'/../.env file';
	}
}

async function aes_crypto(data){
	try{
		switch(data.act){
			case 'decrypt':
				return aes().AES.decrypt(data.data, data.key).toString(aes().enc.Utf8);
				break;
			case 'encrypt':
				return aes().AES.encrypt(decodeURIComponent(data.data), data.key).toString();
				break;
		}
	}catch(err){
		var err = (err.stack ? String(err.stack) : err);
		return {"error":err};
	}
}

function validate_fields(data){
	var result = (new Validator()).validate(data, {
		"type": "object",
		"properties": {
			"act": {"type": "string", "enum":["decrypt", "encrypt"]},
			"data": {"type": "string", "pattern":".+"},
			"key": {"type": "string", "pattern":".+"}
		},
		"required": [
			"act", 
			"data",
			"key"
		]
	});
	if(result.errors[0]){
		return {'error': result.errors[0].stack};
	}
}

async function handler(socket, body){
	try{
		var body = JSON.parse(body);
		var result = validate_fields(body);
		if(result && result['error']){
			log_err_aes_crypto(result['error']);
			report_errors_to_tg('aes_crypto', result['error']);
			socket.write(JSON.stringify({"error":result['error']})+'\r\n');
			return;
		}
		var result = await aes_crypto(body);
		if(result['error']){
			log_err_aes_crypto(result['error']);
			report_errors_to_tg('aes_crypto', result['error']);
			socket.write(JSON.stringify({"error":result['error'].replace(/\r?\n/g, ' ')})+'\r\n');
			return;
		}
		socket.write(JSON.stringify({"result": encodeURIComponent(result)})+'\r\n');
	}catch(err){
		var err = (err.stack ? String(err.stack) : err);
		log_err_aes_crypto(err);
		report_errors_to_tg('aes_crypto', err);
		socket.write(JSON.stringify({"error":err.replace(/\r?\n/g, ' ')})+'\r\n');
	}
}

(async () => {
	document_root += '/..'
	try{
		dotenv.config({path: document_root+'/.env'});
		var file_name = document_root+'/logs/errors_aes_crypto_service(js).log';
		if(await file_exists(file_name)){
			var lines = await file_to_array(file_name);
			count_lines_log_err_aes_crypto = lines.length;
		}
		var err = parse_env();
		if(err){
			console_log_fail('E: '+err);
			log_err_aes_crypto(err);
			return;
		}
		await remove_unix_socket();
		console_log_pass('I: aes_crypto v'+app_version);
		var server = net.createServer(function(socket) {
			var body = '';
			socket.on('data', function(data) {
				var data = String(data);
				var ex = data.split(/\n/);
				var len = ex.length;
				for(var i = 0; i < len; i++){
					if(ex[i] ){
						body += ex[i];
						if(i + 1 < len){
							handler(socket, body);
							body = '';
						}
					}
				}
			});
			//socket.on('end', function() {}); // Выдается, когда другой конец сокета отправляет пакет FIN.
			//socket.on('timeout', function() {}); // Вызывается, если сокет простаивает из-за неактивности. Используется только для уведомления о простое сокета. Пользователь должен вручную закрыть соединение.
			//socket.on('drain', function() {}); // Вызывается, когда буфер записи очищается. Может использоваться для загрузки дросселя.
			socket.on('error', function(err) {  }); // Запускается при возникновении ошибки. Событие закрытия будет вызвано сразу после этого события.
			//socket.on('close', function() {}); // Запускается после полного закрытия сокета. Аргумент has_error — это логическое значение, указывающее, был ли сокет закрыт из-за ошибки передачи.
			//socket.destroy(); // Гарантирует, что этот сокет не содержит никаких операций ввода-вывода. Требуется только в случае ошибок (ошибка синтаксического анализа или что-то подобное).
		});
		server.listen(process.platform == 'linux' ? config_app['aes_crypto_service_socket'] : config_app['aes_crypto_service_port']);
		server.on('listening', function() {
			console_log_pass('I: Listening '+(process.platform == 'linux' ? config_app['aes_crypto_service_socket'] : '127.0.0.1:'+config_app['aes_crypto_service_port'])+'...');
		});
		//server.on('connection', function(socket) {}); // Запускается при создании нового соединения. Объект сокета и объект соединения доступны обработчику событий. Socket — это экземпляр net.Socket.
		//server.on('close', function() {}); // Выключение сервера. Обратите внимание: если соединения не завершены, это событие не будет генерироваться до тех пор, пока не будут завершены все соединения.
		server.on('err', function(err) {  }); //  Запускается при возникновении ошибки. Событие закрытия будет вызвано сразу после этого события.
	}catch(err){
		var err = (err.stack ? String(err.stack) : err);
		log_err_aes_crypto(err);
		report_errors_to_tg('aes_crypto', err);
		console_log_fail('E: '+err);
	}
})();
