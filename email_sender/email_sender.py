# -*- coding: utf-8 -*-

import re
import os
import sys
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import traceback
from fastapi import Request, FastAPI # pip3 install fastapi
from fastapi.concurrency import run_in_threadpool
from fastapi.responses import JSONResponse
import uvicorn # pip3 install "uvicorn[standard]"
from typing import Union
import threading
import datetime
import time
import shutil
import json
from urllib.parse import unquote


document_root = re.sub(r'/[^/]+$', '', os.path.abspath(__file__).replace(u'\\', u'/'))
app_version = '4.0'
is_access_log = False
config_app = {}
max_size_errors_email_sender = 5_000_000
lock_1 = threading.RLock()

def log_err_email_sender(mess : str) -> None:

	with lock_1:

		if mess:

			date = datetime.datetime.now().strftime('%a %b %d %Y %H:%M:%S') + ' '+str(time.time())+' '
			mess = date+' '+mess + '\n'+'----------------------------------------------------------------------------------------' + '\n'
			
			file_path = document_root+'/../storage/logs/errors_email_sender_service(python).log'

			if os.path.isfile(file_path):
				if os.path.getsize(file_path) > max_size_errors_email_sender:
					shutil.copyfile(file_path, re.sub(r'\.log', '_2.log', file_path))
					with open(file_path, 'w+', encoding = 'utf-8') as f:
						pass

			with open(file_path, 'a+', encoding = 'utf-8') as f:
				f.write(mess)

def parse_config_app() -> None:
	
	global config_app
	
	try:

		file_path = document_root+'/../config/project.php'

		if not os.path.isfile(file_path):
			print(f'[Error] file {file_path} no exists')
			sys.exit(1)

		lines = []
		with open(file_path, 'r', encoding = 'utf-8') as f:
			lines = f.readlines()

		for item in lines:
			ex = re.split('\'email_sender_service_port\' => ([0-9]+)', item.strip())
			if len(ex) > 1:
				config_app['email_sender_service_port'] = ex[1]

		if not 'email_sender_service_port' in config_app:
			print(f'[Error] email_sender_service_port is enpty. See {file_path} file')
			sys.exit(1)
		try:
			config_app['email_sender_service_port'] = int(config_app['email_sender_service_port'])
		except ValueError:
			print(f'[Error] email_sender_service_port is incorrect, a number between 1025 and 65535 is required. See {file_path} file')
			sys.exit(1)
		if config_app['email_sender_service_port'] < 1025 or config_app['email_sender_service_port'] > 65535:
			print(f'[Error] email_sender_service_port is incorrect, a number between 1025 and 65535 is required. See {file_path} file')
			sys.exit(1)

	except Exception:

		err = traceback.format_exc().strip()
		print('[Error] '+err)
		sys.exit(1)

def send_email(host : str, port : int, user : str, password : str, recipients : Union[list, tuple, str], subject : str, message : str, email_from : str, service_from : str) -> dict:
	
	port_list = (25, 587, 465)

	email_from = email_from if email_from else user 
	to_ = recipients if isinstance(recipients, (list, tuple)) else [recipients]

	try:

		if port not in port_list: 
			return {'error': 'FAILED_TO_SEND_EMAIL', 'comment':'Port %s not one of %s' % (port, port_list)}

		mess = MIMEMultipart('alternative')
		mess['Subject'] = subject
		mess['From'] = service_from
		mess['To'] = ', '.join(to_)
		mess.attach(MIMEText(unquote(message).encode('utf8'), 'html', 'utf-8'))
		mess = mess.as_string()
		
		if port == 465:
			smtp = smtplib.SMTP_SSL(host, port)
		else:
			smtp = smtplib.SMTP(host, port)

		smtp.ehlo()

		if port == 587: 
			smtp.starttls()

		smtp.login(user, password)
		smtp.sendmail(email_from, to_, mess)
		smtp.quit()

		return {'result': 'ok'}

	except Exception:
		
		err = traceback.format_exc().strip()
		return {'error': re.sub('\r?\n', '', str(err))}

	finally:

		try:
			smtp.quit()
		except Exception:
			pass

def validate_fields( data: dict) -> Union[dict, None]:
	
	if not 'host' in data:
		return {"error":"MISSING_HOST_FIELD"}
	if not isinstance(data['host'], str) or data['host'] == '':
		return {"error":"HOST_IS_INCORRECT"}

	if not 'port' in data:
		return {"error":"MISSING_PORT_FIELD"}
	if not isinstance(data['port'], int):
		return {"error":"PORT_IS_INCORRECT"}

	if not 'user' in data:
		return {"error":"MISSING_USER_FIELD"}
	if not isinstance(data['user'], str) or data['user'] == '':
		return {"error":"USER_IS_INCORRECT"}

	if not 'password' in data:
		return {"error":"MISSING_PASSWORD_FIELD"}
	if not isinstance(data['password'], str):
		return {"error":"PASSWORD_IS_INCORRECT"}
		
	if not 'recipients' in data:
		return {"error":"MISSING_RECIPIENTS_FIELD"}
	if not isinstance(data['recipients'], str) or data['recipients'] == '':
		return {"error":"RECIPIENTS_IS_INCORRECT"}
	
	if not 'subject' in data:
		return {"error":"MISSING_SUBJECT_FIELD"}
	if not isinstance(data['subject'], str) or data['subject'] == '':
		return {"error":"SUBJECT_IS_INCORRECT"}

	if not 'message' in data:
		return {"error":"MISSING_MESSAGE_FIELD"}
	if not isinstance(data['message'], str) or data['message'] == '':
		return {"error":"MESSAGE_IS_INCORRECT"}

	if not 'service_from' in data:
		return {"error":"MISSING_SERVICE_FROM_FIELD"}
	if not isinstance(data['service_from'], str) or data['service_from'] == '':
		return {"error":"SERVICE_FROM_IS_INCORRECT"}

	if not 'email_from' in data:
		return {"error":"MISSING_EMAIL_FROM_FIELD"}
	if not isinstance(data['email_from'], str) or data['email_from'] == '':
		return {"error":"EMAIL_FROM_IS_INCORRECT"}

def _send(body : dict) -> dict:
	
	try:
		
		result = validate_fields( body)
		if result and 'error' in result:
			return {"error": result['error']}
		
		result = send_email(host = body['host'], port = body['port'], user = body['user'], password = body['password'], recipients = body['recipients'], subject = body['subject'], message = body['message'], service_from = body['service_from'], email_from = body['email_from'])
		
		return result

	except Exception:
		
		err = traceback.format_exc().strip()
		return {"error":re.sub('\r?\n', '', str(err))}

fast_api = FastAPI()

@fast_api.post('/api/v3/send')
async def send(request: Request):
	try:
		body = await request.json()
	except json.decoder.JSONDecodeError:
		err = traceback.format_exc().strip()
		await run_in_threadpool(lambda: log_err_email_sender(err))
		return JSONResponse(content = {'error': err}, status_code = 400)
	result = await run_in_threadpool(lambda: _send(body))
	if 'error' in result:
		if 'comment' in result:
			await run_in_threadpool(lambda: log_err_email_sender(result['error'] + ' ('+result['comment']+')'))
			return JSONResponse(content = {'error': result['error'], 'comment': result['comment']}, status_code = 400)
		await run_in_threadpool(lambda: log_err_email_sender(result['error']))
		return JSONResponse(content = {'error': result['error']}, status_code = 400)
	return result

def run():

	try:
		
		print('email_sender v'+app_version)
		print('[Info] launching application ...')
		uvicorn.run(fast_api, host = '0.0.0.0', port = config_app['email_sender_service_port'], access_log = is_access_log)

	except KeyboardInterrupt:
		pass

	except Exception:

		err = traceback.format_exc().strip()
		print('[Error] '+err)
		log_err_email_sender(err)

if __name__ == '__main__':
	parse_config_app()
	run()
