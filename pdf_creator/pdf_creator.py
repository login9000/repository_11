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
from fpdf import FPDF # pip3 install fpdf2
from fpdf.fonts import FontFace
import threading
import datetime
import time
import shutil
import json


document_root = re.sub(r'/[^/]+$', '', os.path.abspath(__file__).replace(u'\\', u'/'))
app_version = '5.0'
is_access_log = False
config_app = {}
max_size_errors_pdf_creator = 5_000_000
lock_1 = threading.RLock()

def log_err_pdf_creator(mess : str) -> None:

	with lock_1:

		if mess:

			date = datetime.datetime.now().strftime('%a %b %d %Y %H:%M:%S') + ' '+str(time.time())+' '
			mess = date+' '+mess + '\n'+'----------------------------------------------------------------------------------------' + '\n'
			
			file_path = document_root+'/../storage/logs/errors_pdf_creator_service(python).log'

			if os.path.isfile(file_path):
				if os.path.getsize(file_path) > max_size_errors_pdf_creator:
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
			ex = re.split('\'pdf_creator_service_port\' => ([0-9]+)', item.strip())
			if len(ex) > 1:
				config_app['pdf_creator_service_port'] = ex[1]

		if not 'pdf_creator_service_port' in config_app:
			print(f'[Error] pdf_creator_service_port is enpty. See {file_path} file')
			sys.exit(1)
		try:
			config_app['pdf_creator_service_port'] = int(config_app['pdf_creator_service_port'])
		except ValueError:
			print(f'[Error] pdf_creator_service_port is incorrect, a number between 1025 and 65535 is required. See {file_path} file')
			sys.exit(1)
		if config_app['pdf_creator_service_port'] < 1025 or config_app['pdf_creator_service_port'] > 65535:
			print(f'[Error] pdf_creator_service_port is incorrect, a number between 1025 and 65535 is required. See {file_path} file')
			sys.exit(1)

	except Exception:

		err = traceback.format_exc().strip()
		print('[Error] '+err)
		sys.exit(1)

def create_pdf(act : str, data : Union[list, dict], output_link : str) -> dict:

	try:

		pdf = FPDF(orientation = 'landscape')
		pdf.add_page()

		pdf.add_font('DejaVuSans-Bold', style = 'B', fname = document_root + '/DejaVuSans-Bold.ttf')
		pdf.add_font('DejaVuSans-ExtraLight', style = 'B', fname = document_root + '/DejaVuSans-ExtraLight.ttf')
		pdf.add_font('DejaVuSans', style = 'B', fname = document_root + '/DejaVuSans.ttf')

		if act == 'list_of_invoices':

			pdf.set_font(family = 'DejaVuSans-Bold', style = 'B', size = 7)

			with pdf.table(line_height = 4.5 * pdf.font_size, col_widths = (9, 10, 10, 7, 20, 20, 20, 15, 15), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (242, 242, 242)), borders_layout = 'HORIZONTAL_LINES') as table:

				for item in data:
					row = table.row()
					for i in item:
						row.cell(i)
					break

			pdf.set_font(family = 'DejaVuSans-ExtraLight', style = 'B', size = 7)
			pdf.set_draw_color(200, 200, 200)
			pdf.set_line_width(0.1)

			with pdf.table(col_widths = (9, 10, 10, 7, 20, 20, 20, 15, 15), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'HORIZONTAL_LINES') as table:

				for idx, item in enumerate(data):
					if idx > 0:
						row = table.row()
						for idx, i in enumerate(item):
							i = str(i)
							# if idx == 4 or idx == 5 or idx == 6:
							# 	if len(i) > 64:
							# 		i = i[:64] + '...'
							row.cell(i)

			pdf.output(document_root + '/../public' + output_link)

		if act == 'commercial_offers':

			pdf.set_font(family = 'DejaVuSans', style = 'B', size = 8)

			with pdf.table(line_height = 2.5 * pdf.font_size, col_widths = (35), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('Получатель КП:')

			pdf.set_font(family = 'DejaVuSans-ExtraLight', style = 'B', size = 8)

			with pdf.table(line_height = 2.5 * pdf.font_size, col_widths = (200), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell(data['recipient_of_the_commercial_offer'])

			pdf.set_font(family = 'DejaVuSans-Bold', style = 'B', size = 11)

			with pdf.table(line_height = 2.5 * pdf.font_size, col_widths = (50), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('Товары в заказе')

			pdf.set_font(family = 'DejaVuSans-ExtraLight', style = 'B', size = 8)

			with pdf.table(line_height = 3.5 * pdf.font_size, col_widths = (70, 26), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('Ориентировочный вес продукции: '+str(data['weight'])+' кг')
				row.cell('Стоимость заказа: '+str(data['commercial_offer_amount'])+' ₽')

			pdf.set_font(family = 'DejaVuSans-Bold', style = 'B', size = 7)

			with pdf.table(line_height = 1.5 * pdf.font_size, col_widths = (4, 45, 6, 6, 7, 8, 8, 11), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (242, 242, 242)), text_align = ('CENTER', 'LEFT', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER'), borders_layout = 'HORIZONTAL_LINES') as table:

				for item in data['goods']:
					row = table.row()
					for i in item:
						row.cell(i)
					break

			pdf.set_font(family = 'DejaVuSans-ExtraLight', style = 'B', size = 7)
			pdf.set_draw_color(200, 200, 200)
			pdf.set_line_width(0.1)

			with pdf.table(col_widths = (4, 45, 6, 6, 7, 8, 8, 11), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), text_align = ('CENTER', 'LEFT', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER'), borders_layout = 'HORIZONTAL_LINES') as table:

				for idx, item in enumerate(data['goods']):
					if idx > 0:
						row = table.row()
						for idx, i in enumerate(item):
							i = str(i)
							# if idx == 1:
							# 	if len(i) > 64:
							# 		i = i[:64] + '...'
							row.cell(i)

			pdf.set_font(family = 'DejaVuSans', style = 'B', size = 8)

			with pdf.table(line_height = 2.5 * pdf.font_size, col_widths = (35), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('Комментарий:')

			pdf.set_font(family = 'DejaVuSans-ExtraLight', style = 'B', size = 8)

			with pdf.table(line_height = 2.5 * pdf.font_size, col_widths = (250), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell(data['comment'])

			pdf.output(document_root + '/../public' + output_link)

		if act == 'order_details':

			pdf.set_font(family = 'DejaVuSans-Bold', style = 'B', size = 9)

			with pdf.table(align = 'LEFT', cell_fill_color = (180, 180, 180), cell_fill_mode = 'COLUMNS', line_height = 2 * pdf.font_size, width = 70, text_align = ('LEFT', 'CENTER'), col_widths = (35, 35), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell(' № '+str(data['number']))
				row.cell(data['orders_status'])

			pdf.set_font(family = 'DejaVuSans-ExtraLight', style = 'B', size = 9)

			counterparty_name = data['counterparty_name']
			if len(counterparty_name) > 75:
				counterparty_name = counterparty_name[:75]+'...'
			
			with pdf.table(line_height = 3.5 * pdf.font_size, col_widths = (155), headings_style = FontFace(emphasis = 'BOLD', color = (27, 27, 27), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell(counterparty_name)

			pdf.set_font(family = 'DejaVuSans-ExtraLight', style = 'B', size = 8)

			with pdf.table(line_height = 2 * pdf.font_size, col_widths = (155), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell(data['calculation_type'])

			with pdf.table(align = 'LEFT', line_height = 2 * pdf.font_size, width = 155, col_widths = (45, 110), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('Статус оплаты: '+str(data['payment_state']))
				row.cell('Дата готовности: '+str(data['shipping_date']))

			shipment_warehouse_name = data['shipment_warehouse_name']
			if len(shipment_warehouse_name) > 80:
				shipment_warehouse_name = shipment_warehouse_name[:80]+'...'
			
			with pdf.table(align = 'LEFT', line_height = 2 * pdf.font_size, width = 155, headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('Склад: '+shipment_warehouse_name)

			delivery_address = data['delivery_address']
			if len(delivery_address) > 88:
				delivery_address = delivery_address[:88]+'...'
			
			with pdf.table(align = 'LEFT', line_height = 2 * pdf.font_size, width = 155, col_widths = (45, 110), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('Доставка: '+data['shipping_date'])
				row.cell(delivery_address)

			pdf.set_font(family = 'DejaVuSans-Bold', style = 'B', size = 11)

			with pdf.table(line_height = 4 * pdf.font_size, col_widths = (50), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('Товары в заказе')

			pdf.set_font(family = 'DejaVuSans-ExtraLight', style = 'B', size = 8)

			with pdf.table(line_height = 3.5 * pdf.font_size, col_widths = (70, 26), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('Ориентировочный вес продукции: '+str(data['weight'])+' кг')
				row.cell('Стоимость заказа: '+str(data['order_cost'])+' ₽')

			pdf.set_font(family = 'DejaVuSans-Bold', style = 'B', size = 7)

			col_widths = (4, 30, 6, 6, 7, 8, 8, 9, 8, 8, 8, 8)
			text_align = ('CENTER', 'LEFT', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER')

			lenn = len(data['goods'][0])
			if lenn == 11:
				col_widths = (4, 38, 6, 6, 7, 8, 8, 9, 8, 8, 8)
				text_align = ('CENTER', 'LEFT', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER')
			if lenn == 10:
				col_widths = (4, 45, 6, 6, 7, 8, 8, 9, 8, 8)
				text_align = ('CENTER', 'LEFT', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER')

			with pdf.table(line_height = 2.5 * pdf.font_size, col_widths = col_widths, headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (242, 242, 242)), text_align = text_align, borders_layout = 'HORIZONTAL_LINES') as table:

				for item in data['goods']:
					row = table.row()
					for i in item:
						row.cell(i)
					break

			pdf.set_font(family = 'DejaVuSans-ExtraLight', style = 'B', size = 7)
			pdf.set_draw_color(200, 200, 200)
			pdf.set_line_width(0.1)

			with pdf.table(col_widths = col_widths, headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), text_align = text_align, borders_layout = 'HORIZONTAL_LINES') as table:

				for idx, item in enumerate(data['goods']):
					if idx > 0:
						row = table.row()
						for idx, i in enumerate(item):
							i = str(i)
							# if idx == 1:
							# 	if len(i) > 64:
							# 		i = i[:64] + '...'
							row.cell(i)

			pdf.output(document_root + '/../public' + output_link)

		if act == 'draft_details':

			pdf.set_font(family = 'DejaVuSans-Bold', style = 'B', size = 9)

			with pdf.table(align = 'LEFT', line_height = 2 * pdf.font_size, width = 70, text_align = ('CENTER'), col_widths = (35, 35), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (180, 180, 180)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('Черновик')

			pdf.set_font(family = 'DejaVuSans-ExtraLight', style = 'B', size = 9)

			counterparty_name = data['counterparty_name']
			if len(counterparty_name) > 75:
				counterparty_name = counterparty_name[:75]+'...'
			
			with pdf.table(line_height = 3.5 * pdf.font_size, col_widths = (155), headings_style = FontFace(emphasis = 'BOLD', color = (27, 27, 27), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell(counterparty_name)

			pdf.set_font(family = 'DejaVuSans-ExtraLight', style = 'B', size = 8)

			with pdf.table(line_height = 2 * pdf.font_size, col_widths = (155), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell(data['calculation_type'])

			with pdf.table(align = 'LEFT', line_height = 2 * pdf.font_size, width = 155, col_widths = (45, 110), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('Статус оплаты: не оплачен')
				row.cell('Дата готовности: '+str(data['ready_date']))

			shipment_warehouse_name = data['shipment_warehouse_name']
			if len(shipment_warehouse_name) > 80:
				shipment_warehouse_name = shipment_warehouse_name[:80]+'...'
			
			with pdf.table(align = 'LEFT', line_height = 2 * pdf.font_size, width = 155, headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('Склад: '+shipment_warehouse_name)

			delivery_address = ''
			# delivery_address = data['delivery_address']
			# if len(delivery_address) > 88:
			# 	delivery_address = delivery_address[:88]+'...'
			
			with pdf.table(align = 'LEFT', line_height = 2 * pdf.font_size, width = 155, col_widths = (45, 110), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('Доставка: '+data['shipping_date'])
				row.cell(delivery_address)

			pdf.set_font(family = 'DejaVuSans-Bold', style = 'B', size = 11)

			with pdf.table(line_height = 4 * pdf.font_size, col_widths = (50), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('Товары в заказе')

			pdf.set_font(family = 'DejaVuSans-ExtraLight', style = 'B', size = 8)

			with pdf.table(line_height = 3.5 * pdf.font_size, col_widths = (70, 26), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('Ориентировочный вес продукции: '+str(data['weight'])+' кг')
				row.cell('Стоимость заказа: '+str(data['order_cost'])+' ₽')

			pdf.set_font(family = 'DejaVuSans-Bold', style = 'B', size = 7)

			col_widths = (4, 30, 6, 6, 7, 8, 8, 9, 8, 8, 8, 8)
			text_align = ('CENTER', 'LEFT', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER')

			lenn = len(data['goods'][0])
			if lenn == 11:
				col_widths = (4, 38, 6, 6, 7, 8, 8, 9, 8, 8, 8)
				text_align = ('CENTER', 'LEFT', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER')
			if lenn == 10:
				col_widths = (4, 45, 6, 6, 7, 8, 8, 9, 8, 8)
				text_align = ('CENTER', 'LEFT', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER')

			with pdf.table(line_height = 2.5 * pdf.font_size, col_widths = col_widths, headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (242, 242, 242)), text_align = text_align, borders_layout = 'HORIZONTAL_LINES') as table:

				for item in data['goods']:
					row = table.row()
					for i in item:
						row.cell(i)
					break

			pdf.set_font(family = 'DejaVuSans-ExtraLight', style = 'B', size = 7)
			pdf.set_draw_color(200, 200, 200)
			pdf.set_line_width(0.1)

			with pdf.table(col_widths = col_widths, headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), text_align = text_align, borders_layout = 'HORIZONTAL_LINES') as table:

				for idx, item in enumerate(data['goods']):
					if idx > 0:
						row = table.row()
						for idx, i in enumerate(item):
							i = str(i)
							# if idx == 1:
							# 	if len(i) > 64:
							# 		i = i[:64] + '...'
							row.cell(i)

			pdf.output(document_root + '/../public' + output_link)

		if act == 'product_remains' or act == 'substandard' or act == 'finished_products':
			
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

			pdf.set_font(family = 'DejaVuSans-Bold', style = 'B', size = 16)

			with pdf.table(align = 'LEFT', line_height = 2 * pdf.font_size, width = 170, headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell(header_)

			pdf.set_font(family = 'DejaVuSans-Bold', style = 'B', size = 7)

			with pdf.table(align = 'LEFT', line_height = 3.5 * pdf.font_size, width = 110, headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('Актуальность: '+data['actual_date'])

			pdf.set_font(family = 'DejaVuSans', style = 'B', size = 7)

			with pdf.table(line_height = 2 * pdf.font_size, col_widths = (55, 55), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('СКЛАД ОТГРУЗКИ:')
				row.cell('ПРОДУКЦИЯ:')

			pdf.set_font(family = 'DejaVuSans-ExtraLight', style = 'B', size = 7)

			shipping_warehouse_name = data['shipping_warehouse_name']
			if len(shipping_warehouse_name) > 88:
				shipping_warehouse_name = shipping_warehouse_name[:88]+'...'

			with pdf.table(v_align = 'TOP', line_height = 2 * pdf.font_size, col_widths = (55, 55), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell(shipping_warehouse_name)
				row.cell(data['products'])

			pdf.set_font(family = 'DejaVuSans', style = 'B', size = 7)

			with pdf.table(line_height = 0.5, width = 277, headings_style = FontFace(emphasis = 'BOLD', color = (255, 255, 255), fill_color = (240, 240, 240)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('_')

			with pdf.table(line_height = 2 * pdf.font_size, col_widths = (25, 25, 25, 25), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('ПРОФИЛЬ:')
				row.cell('ТОЛЩИНА:')
				row.cell('ПОКРЫТИЕ:')
				row.cell('ЦВЕТ:')

			pdf.set_font(family = 'DejaVuSans-ExtraLight', style = 'B', size = 7)

			with pdf.table(line_height = 2 * pdf.font_size, col_widths = (25, 25, 25, 25), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell(data['profile'])
				row.cell(data['thickness'])
				row.cell(data['coating'])
				row.cell(data['color'])

			with pdf.table(line_height = 2 * pdf.font_size, width = 100, headings_style = FontFace(emphasis = 'BOLD', color = (255, 255, 255), fill_color = (255, 255, 255)), borders_layout = 'NONE') as table:
				row = table.row()
				row.cell('.')

			pdf.set_font(family = 'DejaVuSans-Bold', style = 'B', size = 7)
			
			with pdf.table(line_height = 2.5 * pdf.font_size, col_widths = (40, 6, 5, 5, 8, 8, 9), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (242, 242, 242)), text_align = ('LEFT', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER'), borders_layout = 'HORIZONTAL_LINES') as table:

				for item in data_:
					row = table.row()
					for i in item:
						row.cell(i)
					break

			pdf.set_font(family = 'DejaVuSans-ExtraLight', style = 'B', size = 7)
			pdf.set_draw_color(200, 200, 200)
			pdf.set_line_width(0.1)

			with pdf.table(col_widths = (40, 6, 5, 5, 8, 8, 9), headings_style = FontFace(emphasis = 'BOLD', color = (51, 51, 51), fill_color = (255, 255, 255)), text_align = ('LEFT', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER', 'CENTER'), borders_layout = 'HORIZONTAL_LINES') as table:

				for idx, item in enumerate(data_):
					if idx > 0:
						row = table.row()
						for idx, i in enumerate(item):
							i = str(i)
							# if idx == 0:
							# 	if len(i) > 64:
							# 		i = i[:64] + '...'
							row.cell(i)
			
			pdf.output(document_root + '/../public' + output_link)
		
		data = None
		
		return {'result': 'ok'}

	except Exception:

		err = traceback.format_exc().strip()
		return {'error': re.sub('\r?\n', '', str(err))}

def validate_fields(data: dict) -> Union[dict, None]:
	
	if not 'act' in data:
		return {"error":"MISSING_ACT_FIELD"}
	if not data['act'] in ('list_of_invoices', 'commercial_offers', 'order_details', 'draft_details', 'product_remains', 'substandard', 'finished_products'):
		return {"error":"ACT_IS_INCORRECT"}

	if not 'output_link' in data:
		return {"error":"MISSING_OUTPUT_LINK_FIELD"}

	if not isinstance(data['output_link'], str) or data['output_link'] == '':
		return {"error":"OUTPUT_LINK_FIELD_IS_INCORRECT"}

	path = document_root + '/../public' + re.sub('/[^/]+$', '', data['output_link'])
	if not os.path.exists(path):
		return {"error":"DIRECTORY_NOT_FOUND", "comment":path}
		
	if not 'data' in data:
		return {"error":"MISSING_DATA_FIELD"}
	
	if data['act'] == 'list_of_invoices':
		if not isinstance(data['data'], list):
			return {"error":"THE_DATA_FIELD_IS_OF_THE_WRONG_TYPE"}

	if data['act'] == 'commercial_offers':
		if not isinstance(data['data'], dict):
			return {"error":"THE_DATA_FIELD_IS_OF_THE_WRONG_TYPE"}
		if not 'recipient_of_the_commercial_offer' in data['data']:
			return {"error":"THE_RECIPIENT_OF_THE_COMMERCIAL_OFFER_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'commercial_offer_amount' in data['data']:
			return {"error":"THE_COMMERCIAL_OFFER_AMOUNT_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'goods' in data['data']:
			return {"error":"THE_GOODS_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'weight' in data['data']:
			return {"error":"WEIGHT_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'comment' in data['data']:
			return {"error":"COMMENT_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}

	if data['act'] == 'order_details':
		if not isinstance(data['data'], dict):
			return {"error":"THE_DATA_FIELD_IS_OF_THE_WRONG_TYPE"}
		if not 'number' in data['data']:
			return {"error":"THE_NUMBER_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'orders_status' in data['data']:
			return {"error":"THE_ORDERS_STATUS_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'counterparty_name' in data['data']:
			return {"error":"THE_COUNTERPARTY_NAME_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'calculation_type' in data['data']:
			return {"error":"THE_CALCULATION_TYPE_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'payment_state' in data['data']:
			return {"error":"THE_PAYMENT_STATE_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'shipment_warehouse_name' in data['data']:
			return {"error":"THE_SHIPMENT_WAREHOUSE_NAME_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'shipping_date' in data['data']:
			return {"error":"THE_SHIPPING_DATE_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'delivery_address' in data['data']:
			return {"error":"THE_DELIVERY_ADDRESS_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'weight' in data['data']:
			return {"error":"THE_WEIGHT_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'order_cost' in data['data']:
			return {"error":"THE_ORDER_COST_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'goods' in data['data']:
			return {"error":"THE_GOODS_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
	
	if data['act'] == 'draft_details':
		if not isinstance(data['data'], dict):
			return {"error":"THE_DATA_FIELD_IS_OF_THE_WRONG_TYPE"}
		if not 'counterparty_name' in data['data']:
			return {"error":"THE_COUNTERPARTY_NAME_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'calculation_type' in data['data']:
			return {"error":"THE_CALCULATION_TYPE_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'ready_date' in data['data']:
			return {"error":"THE_READY_DATE_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'shipment_warehouse_name' in data['data']:
			return {"error":"THE_SHIPMENT_WAREHOUSE_NAME_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'shipping_date' in data['data']:
			return {"error":"THE_SHIPPING_DATE_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'weight' in data['data']:
			return {"error":"THE_WEIGHT_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'order_cost' in data['data']:
			return {"error":"THE_ORDER_COST_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}
		if not 'goods' in data['data']:
			return {"error":"THE_GOODS_FIELD_IS_MISSING_IN_THE_DATE_SUBFIELD"}

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
		
		result = create_pdf(act = body['act'], data = body['data'], output_link = body['output_link'])
		return result

	except Exception:

		err = traceback.format_exc().strip()
		return {"error": re.sub('\r?\n', ' ', str(err))}

fast_api = FastAPI()

@fast_api.get('/')
async def handler_fast_api_response():
	return 'Hello world!'

@fast_api.post('/api/v4/create')
async def create(request: Request):
	try:
		body = await request.json()
	except json.decoder.JSONDecodeError:
		err = traceback.format_exc().strip()
		await run_in_threadpool(lambda: log_err_pdf_creator(err))
		return JSONResponse(content = {"error": err}, status_code = 400)
	result = await run_in_threadpool(lambda: _send( body))
	if 'error' in result:
		if 'comment' in result:
			await run_in_threadpool(lambda: log_err_pdf_creator(result['error'] + ' ('+result['comment']+')'))
			return JSONResponse(content = {"error": result['error'], "comment": result['comment']}, status_code = 400)
		await run_in_threadpool(lambda: log_err_pdf_creator(result['error']))
		return JSONResponse(content = {"error": result['error']}, status_code = 400)
	return result

def run():

	try:
		
		print('pdf_creator v'+app_version)
		print('[Info] launching application ...')
		uvicorn.run(fast_api, host = '127.0.0.1', port = config_app['pdf_creator_service_port'], access_log = is_access_log)

	except KeyboardInterrupt:
		pass

	except Exception:

		err = traceback.format_exc().strip()
		print('[Error] '+err)
		log_err_pdf_creator(err)

if __name__ == '__main__':
	parse_config_app()
	run()
