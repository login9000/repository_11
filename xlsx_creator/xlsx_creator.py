# -*- coding: utf-8 -*-

import re
import os
import sys
import traceback
from fastapi import Request, FastAPI # pip3 install fastapi
from fastapi.concurrency import run_in_threadpool
from fastapi.responses import JSONResponse
import uvicorn # pip3 install "uvicorn[standard]"
from typing import Union
import xlsxwriter # pip3 install xlsxwriter
import threading
import datetime
import time
import shutil
import json


document_root = re.sub(r'/[^/]+$', '', os.path.abspath(__file__).replace(u'\\', u'/'))
app_version = '4.0'
is_access_log = False
config_app = {}
max_size_errors_xlsx_creator = 5_000_000
lock_1 = threading.RLock()

def log_err_xlsx_creator(mess : str) -> None:

	with lock_1:

		if mess:

			date = datetime.datetime.now().strftime('%a %b %d %Y %H:%M:%S') + ' '+str(time.time())+' '
			mess = date+' '+mess + '\n'+'----------------------------------------------------------------------------------------' + '\n'
			
			file_path = document_root+'/../storage/logs/errors_xlsx_creator_service(python).log'

			if os.path.isfile(file_path):
				if os.path.getsize(file_path) > max_size_errors_xlsx_creator:
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
			ex = re.split('\'xlsx_creator_service_port\' => ([0-9]+)', item.strip())
			if len(ex) > 1:
				config_app['xlsx_creator_service_port'] = ex[1]

		if not 'xlsx_creator_service_port' in config_app:
			print(f'[Error] xlsx_creator_service_port is enpty. See {file_path} file')
			sys.exit(1)
		try:
			config_app['xlsx_creator_service_port'] = int(config_app['xlsx_creator_service_port'])
		except ValueError:
			print(f'[Error] xlsx_creator_service_port is incorrect, a number between 1025 and 65535 is required. See {file_path} file')
			sys.exit(1)
		if config_app['xlsx_creator_service_port'] < 1025 or config_app['xlsx_creator_service_port'] > 65535:
			print(f'[Error] xlsx_creator_service_port is incorrect, a number between 1025 and 65535 is required. See {file_path} file')
			sys.exit(1)

	except Exception:

		err = traceback.format_exc().strip()
		print('[Error] '+err)
		sys.exit(1)

def create_xlsx(act : str, data : Union[list, dict], output_link : str) -> dict:

	try:

		workbook = xlsxwriter.Workbook(document_root + '/../public' + output_link)
		worksheet = workbook.add_worksheet()
		bold = workbook.add_format({'bold': 1})

		data_ = []
		header_ = ''

		if act == 'product_remains':
			data_ = data['product_remains']
			header_ = 'Остатки продукции'
		if act == 'substandard':
			data_ = data['substandard']
			header_ = 'Раcпродажа некондиции'
		if act == 'finished_products':
			data_ = data['finished_products']
			header_ = 'Распродажа готовой продукции'
		
		row = 0
		col = 0

		for item in data_:
			for idx, i in enumerate(item):
				worksheet.write(row, col + idx, i, bold)
			break

		row += 1

		worksheet.merge_range('A1:G1', header_, workbook.add_format({'bold': 1, 'font_size': 20, 'align': 'left'}))
		worksheet.merge_range('A2:G2', '')

		for item in data_:
			for idx, i in enumerate(item):
				worksheet.write(row, col + idx, '')
			break

		row += 1

		worksheet.write(row, col, 'Актуальность: '+data['actual_date'], bold)
		
		row += 1

		worksheet.write(row, 0, 'Склад отгрузки:', bold)
		worksheet.write(row, 1, 'Продукция:', bold)

		row += 1

		for item in data_:
			for idx, i in enumerate(item):
				worksheet.write(row, col + idx, '')
			break
		
		row += 1

		shipping_warehouse_name = data['shipping_warehouse_name']
		if len(shipping_warehouse_name) > 88:
			shipping_warehouse_name = shipping_warehouse_name[:88]+'...'

		worksheet.write(row - 1, 0, shipping_warehouse_name)
		worksheet.merge_range('B5:E5', data['products'], workbook.add_format({'align': 'left'}))
		
		for item in data_:
			for idx, i in enumerate(item):
				worksheet.write(row, col + idx, '', bold)
			break
		
		worksheet.write(row, 0, 'Профиль:', bold)
		worksheet.write(row, 1, 'Толщина:', bold)
		worksheet.write(row, 3, 'Покрытие:', bold)
		worksheet.write(row, 5, 'Цвет:', bold)

		row += 1

		for item in data_:
			for idx, i in enumerate(item):
				worksheet.write(row, col + idx, '')
			break
		
		worksheet.write(row, 0, data['profile'])
		worksheet.merge_range('B7:C7', data['thickness'], workbook.add_format({'align': 'left'}))
		worksheet.merge_range('D7:E7', data['coating'], workbook.add_format({'align': 'left'}))
		worksheet.write(row, 5, data['color'])

		row += 1

		for item in data_:
			for idx, i in enumerate(item):
				worksheet.write(row, col + idx, '')
			break
		
		worksheet.merge_range('A8:G8', '')

		row += 1
		
		for item in data_:
			for idx, i in enumerate(item):
				worksheet.write(row, col + idx, i, bold)
			break
		
		row += 1

		for idx, item in enumerate(data_):
			if idx > 0:
				for idx, i in enumerate(item):
					worksheet.write(row, col + idx, i)
				row += 1
		
		worksheet.set_column('A:A', 90)
		worksheet.set_column('B:B', 15)
		worksheet.set_column('C:C', 10)
		worksheet.set_column('D:D', 12)
		worksheet.set_column('E:E', 15)
		worksheet.set_column('F:F', 40)
		worksheet.set_column('G:G', 15)

		workbook.close()

		data = None
		
		return {'result': 'ok'}

	except Exception:

		err = traceback.format_exc().strip()
		return {'error': re.sub('\r?\n', '', str(err))}

def validate_fields(data: dict) -> Union[dict, None]:
	
	if not 'act' in data:
		return {"error":"MISSING_ACT_FIELD"}
	if not data['act'] in ('product_remains', 'substandard', 'finished_products'):
		return {"error":"ACT_IS_INCORRECT"}
	
	if not 'data' in data:
		return {"error":"MISSING_DATA_FIELD"}
	
	if not 'output_link' in data:
		return {"error":"MISSING_OUTPUT_LINK_FIELD"}

	if not isinstance(data['output_link'], str) or data['output_link'] == '':
		return {"error":"OUTPUT_LINK_FIELD_IS_INCORRECT"}

	path = document_root + '/../public' + re.sub('/[^/]+$', '', data['output_link'])
	if not os.path.exists(path):
		return {"error":"DIRECTORY_NOT_FOUND", "comment":path}

	if data['act'] == 'product_remains':
		if not isinstance(data['data'], dict):
			return {"error":"THE_DATA_FIELD_IS_OF_THE_WRONG_TYPE"}
		if not 'shipping_warehouse_name' in data['data']:
			return {"error":"THE_SHIPPING_WAREHOUSE_NAME_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'products' in data['data']:
			return {"error":"THE_PRODUCTS_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'profile' in data['data']:
			return {"error":"THE_PROFILE_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'thickness' in data['data']:
			return {"error":"THE_THICKNESS_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'coating' in data['data']:
			return {"error":"THE_COATING_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'color' in data['data']:
			return {"error":"THE_COLOR_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'actual_date' in data['data']:
			return {"error":"THE_ACTUAL_DATE_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'product_remains' in data['data']:
			return {"error":"THE_PRODUCT_REMAINS_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
	
	if data['act'] == 'substandard':
		if not isinstance(data['data'], dict):
			return {"error":"THE_DATA_FIELD_IS_OF_THE_WRONG_TYPE"}
		if not 'shipping_warehouse_name' in data['data']:
			return {"error":"THE_SHIPPING_WAREHOUSE_NAME_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'products' in data['data']:
			return {"error":"THE_PRODUCTS_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'profile' in data['data']:
			return {"error":"THE_PROFILE_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'thickness' in data['data']:
			return {"error":"THE_THICKNESS_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'coating' in data['data']:
			return {"error":"THE_COATING_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'color' in data['data']:
			return {"error":"THE_COLOR_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'actual_date' in data['data']:
			return {"error":"THE_ACTUAL_DATE_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'substandard' in data['data']:
			return {"error":"THE_SUBSTANDARD_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
	
	if data['act'] == 'finished_products':
		if not isinstance(data['data'], dict):
			return {"error":"THE_DATA_FIELD_IS_OF_THE_WRONG_TYPE"}
		if not 'shipping_warehouse_name' in data['data']:
			return {"error":"THE_SHIPPING_WAREHOUSE_NAME_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'products' in data['data']:
			return {"error":"THE_PRODUCTS_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'profile' in data['data']:
			return {"error":"THE_PROFILE_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'thickness' in data['data']:
			return {"error":"THE_THICKNESS_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'coating' in data['data']:
			return {"error":"THE_COATING_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'color' in data['data']:
			return {"error":"THE_COLOR_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'actual_date' in data['data']:
			return {"error":"THE_ACTUAL_DATE_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'finished_products' in data['data']:
			return {"error":"THE_FINISHED_PRODUCTS_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}

def _send(body : dict) -> dict:
	
	try:

		result = validate_fields(body)
		if result and 'error' in result:
			return {"error": result['error']}
		
		result = create_xlsx(act = body['act'], data = body['data'], output_link = body['output_link'])
		return result

	except Exception:

		err = traceback.format_exc().strip()
		return {"error": re.sub('\r?\n', ' ', str(err))}

fast_api = FastAPI()

@fast_api.post('/api/v5/create')
async def create(request: Request):
	try:
		body = await request.json()
	except json.decoder.JSONDecodeError:
		err = traceback.format_exc().strip()
		await run_in_threadpool(lambda: log_err_xlsx_creator(err))
		return JSONResponse(content = {"error": err}, status_code = 400)
	result = await run_in_threadpool(lambda: _send( body))
	if 'error' in result:
		if 'comment' in result:
			await run_in_threadpool(lambda: log_err_xlsx_creator(result['error'] + ' ('+result['comment']+')'))
			return JSONResponse(content = {"error": result['error'], "comment": result['comment']}, status_code = 400)
		await run_in_threadpool(lambda: log_err_xlsx_creator(result['error']))
		return JSONResponse(content = {"error": result['error']}, status_code = 400)
	return result

def run():

	try:
		
		print('xlsx_creator v'+app_version)
		print('[Info] launching application ...')
		uvicorn.run(fast_api, host = '0.0.0.0', port = config_app['xlsx_creator_service_port'], access_log = is_access_log)

	except KeyboardInterrupt:
		pass

	except Exception:

		err = traceback.format_exc().strip()
		print('[Error] '+err)
		log_err_xlsx_creator(err)

if __name__ == '__main__':
	parse_config_app()
	run()
