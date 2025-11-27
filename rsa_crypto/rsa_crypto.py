# -*- coding: utf-8 -*-

import re
import os
import sys
import traceback
import rsa # pip3 install rsa
import base64
import datetime
import shutil
import threading
import time
import socket
import json
from color_print import Color_print
from typing import Union
import jsonschema # pip3 install jsonschema


document_root = re.sub(r'/[^/]+$', '', os.path.abspath(__file__).replace(u'\\', u'/'))
app_version = '5.6'
max_size_rsa_crypto_errors = 5_000_000
is_access_log = False
config_app = {}
lock_1 = threading.RLock()

def log_err_rsa_crypto_server(mes : str) -> None:

	with lock_1:

		if mes:

			line = sys._getframe(1).f_lineno

			date = datetime.datetime.now().strftime('%a %b %d %Y %H:%M:%S') + ' '+str(time.time())+' '
			mes = date+' (line:'+str(line)+') '+mes + '\n'+'----------------------------------------------------------------------------------------' + '\n'
			
			file_path = document_root+'/../storage/logs/errors_rsa_crypto_service(python).log'

			if os.path.isfile(file_path):
				if os.path.getsize(file_path) > max_size_rsa_crypto_errors:
					shutil.copyfile(file_path, re.sub(r'\.log', '_2.log', file_path))
					with open(file_path, 'w+', encoding = 'utf-8') as f:
						pass

			with open(file_path, 'a+', encoding = 'utf-8') as f:
				f.write(mes)

def parse_config_project() -> Union[dict, None]:

	global config_app

	try:

		file_path = document_root+'/../config/project.php'

		if not os.path.isfile(file_path):
			Color_print._fail(f'E: file {file_path} no exists')
			sys.exit(1)

		lines = []
		with open(file_path, 'r', encoding = 'utf-8') as f:
			lines = f.readlines()

		for item in lines:

			ex = re.split('\'rsa_crypto_service_port\' *=> *([0-9]+)', item.strip())
			if len(ex) > 1:
				config_app['rsa_crypto_service_port'] = ex[1]

			ex = re.split(r'\'rsa_crypto_service_socket\' *=> *\'([^\']+)\'', item.strip())
			if len(ex) > 1:
				config_app['rsa_crypto_service_socket'] = ex[1]

		if not 'rsa_crypto_service_port' in config_app:
			Color_print._fail(f'E: rsa_crypto_service_port is enpty. See {file_path} file')
			sys.exit(1)
		try:
			config_app['rsa_crypto_service_port'] = int(config_app['rsa_crypto_service_port'])
		except ValueError:
			Color_print._fail(f'E: rsa_crypto_service_port is incorrect, a number between 1025 and 65535 is required. See {file_path} file')
			sys.exit(1)
		if config_app['rsa_crypto_service_port'] < 1025 or config_app['rsa_crypto_service_port'] > 65535:
			Color_print._fail(f'E: rsa_crypto_service_port is incorrect, a number between 1025 and 65535 is required. See {file_path} file')
			sys.exit(1)

	except Exception:

		err = traceback.format_exc().strip()
		Color_print._fail(f'E: '+re.sub('\n', ' ', str(err)))
		sys.exit(1)

def generate_rsa_keys() -> dict:
	
	try:

		rsa_pubkey, rsa_privkey = rsa.newkeys(nbits = 1024)

		rsa_pubkey = rsa_pubkey.save_pkcs1('PEM').decode()
		rsa_privkey = rsa_privkey.save_pkcs1('PEM').decode()

		rsa_pubkey = re.sub('\r\n|\n', '\\n', re.sub('^(\r\n|\n)|(\r\n|\n)$', '', rsa_pubkey))
		rsa_pubkey = re.sub('-----BEGIN RSA PUBLIC KEY-----\n|\n-----END RSA PUBLIC KEY-----', '', rsa_pubkey)
		rsa_privkey = re.sub('\r\n|\n', '\\n', re.sub('^(\r\n|\n)|(\r\n|\n)$', '', rsa_privkey))
		rsa_privkey = re.sub('-----BEGIN RSA PRIVATE KEY-----\n|\n-----END RSA PRIVATE KEY-----', '', rsa_privkey)

		return {'rsa_pubkey':rsa_pubkey, 'rsa_privkey':rsa_privkey}

	except Exception:

		err = traceback.format_exc().strip()
		return {"error":convert_some_characters(str(err))}

def encrypt_data(data : str, key : str, key_source : str) -> dict:

	try:
		
		if key_source == 'js':
			rsa_pubkey = rsa.PublicKey.load_pkcs1_openssl_pem(key.replace('RSA ', '').encode())
		else:
			rsa_pubkey = rsa.PublicKey.load_pkcs1(key.encode())

		try:
			data_encrypt = rsa.encrypt(data.encode(), rsa_pubkey)
			data = None
		except rsa.pkcs1.EncryptionError as err:
			data = None
			return {"error":convert_some_characters(str(err))}

		b = base64.b64encode(data_encrypt)
		return {'result':b.decode('utf-8')}

	except Exception:

		err = traceback.format_exc().strip()
		return {"error": convert_some_characters(str(err))}

def decrypt_data(data_crypt : str, key : str) -> dict:

	try:
		
		rsa_privkey = rsa.PrivateKey.load_pkcs1(key.encode())

		try:
			data = rsa.decrypt(base64.b64decode(data_crypt), rsa_privkey)
			data_crypt = None
		except rsa.pkcs1.DecryptionError as err:
			data_crypt = None
			return {"error":convert_some_characters(str(err))}

		return {"result":data.decode()}

	except Exception:

		err = traceback.format_exc().strip()
		return {"error":convert_some_characters(str(err))}

def remove_unix_socket() -> None:
	try:
		os.unlink(config_app['rsa_crypto_service_socket'])
	except:
		pass

def validate_fields(data: dict) -> dict:

	try:
		jsonschema.validate(instance = data, schema = {
			"type" : "object",
			"properties" : {
				"act" : {"type" : "string", "enum": ['generate_keys', 'decrypt', 'encrypt']},
				"data" : {"type" : "string"},
				"key" : {"type" : "string"},
				"key_source" : {"type" : "string"},
			},
			"required": [
				"act"
			]
		})
	except jsonschema.exceptions.ValidationError as err:
		_err = str(err).replace('\n', ' ')
		return {'error': f'{_err}'}
	
def handler(sock : socket) -> dict:

	try:

		result = b''

		while True:
			_data = sock.recv(1024)
			if len(_data) == 0:
				break
			result += _data
			try:
				if re.search(b'(\r|\n|\r\n)$', _data):
					break
			except Exception:
				pass
		result = result.decode('utf-8')

		body = json.JSONDecoder().decode(re.sub('\n$', '', result))
		
		result = validate_fields(body)
		if result and 'error' in result:
			log_err_rsa_crypto_server(result['error'])
			err = json.dumps({'error': result['error']}) + '\r\n'
			sock.sendall(err.encode('utf-8'))
			return
		                                                                                                                                      
		if body['act'] == 'decrypt':

			result = decrypt_data(body['data'], body['key'])
			body = None
			if 'error' in result:
				log_err_rsa_crypto_server(result['error'])
				err = json.dumps({'error': result['error']}) + '\r\n'
				sock.sendall(err.encode('utf-8'))
				return	

			result = json.dumps({'result': result['result']}) + '\r\n'
			sock.sendall(result.encode('utf-8'))
			return

		if body['act'] == 'encrypt':
			
			result = encrypt_data(body['data'], body['key'], body['key_source'])
			
			body = None
			if 'error' in result:
				log_err_rsa_crypto_server(result['error'])
				err = json.dumps({'error': result['error']}) + '\r\n'
				sock.sendall(err.encode('utf-8'))
				return	

			result = json.dumps({'result': result['result']}) + '\r\n'
			sock.sendall(result.encode('utf-8'))
			return

		if body['act'] == 'generate_keys':

			result = generate_rsa_keys()
			body = None
			if 'error' in result:
				log_err_rsa_crypto_server(result['error'])
				err = json.dumps({'error': result['error']}) + '\r\n'
				sock.sendall(err.encode('utf-8'))
				return

			result = json.dumps({'result':{'rsa_privkey': result['rsa_privkey'], 'rsa_pubkey': result['rsa_pubkey']}}) + '\r\n'
			sock.sendall(result.encode('utf-8'))
			return
		
	except Exception:

		err = traceback.format_exc().strip()
		log_err_rsa_crypto_server(err)
		err = json.dumps({'error': convert_some_characters(str(err))}) + '\r\n'
		sock.sendall(err.encode('utf-8'))

def convert_some_characters(err: str) -> str:
	return re.sub('\r?\n', ' ', re.sub('"', r'\\"', re.sub(r'\\', r'\\\\', err)))

def run():

	try:
		
		Color_print._pass(f'I: rsa_crypto v'+app_version)
	
		if sys.platform != 'win32':
			Color_print._pass(f'I: Listening '+config_app['rsa_crypto_service_socket']+' ...')
		else:
			Color_print._pass(f'I: Listening 127.0.0.1:'+str(config_app['rsa_crypto_service_port'])+' ...')

		remove_unix_socket()

		if sys.platform != 'win32':
			sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
		else:
			sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		if sys.platform != 'win32':
			sock.bind(config_app['rsa_crypto_service_socket'])
		else:
			sock.bind(('127.0.0.1', config_app['rsa_crypto_service_port']))	
		sock.listen(30)

		while True:
			sock_, addr = sock.accept()
			threading.Thread(target = handler, args = (sock_,)).start()

	except KeyboardInterrupt:
		pass

	except Exception:

		err = traceback.format_exc().strip()
		Color_print._fail(f'E: '+re.sub('\n', ' ', str(err)))
		log_err_rsa_crypto_server(err)
		sys.exit(1)

if __name__ == '__main__':
	parse_config_project()
	run()