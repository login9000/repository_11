<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerGetMetalPresenceReport extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}
		
		try{

			$result = DB::select('SELECT CONVERT(AES_DECRYPT(`token`, :aes_key) USING utf8mb4) AS `token`, `expires_token` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['aes_key' => $this->aes_key[0], 'user_myid' => $user_myid]);
			
			if(sizeof($result) == 0){
				parent::prepare_response(['error'=>'NO_EXISTS_ACCOUNT']);
			}
			
			foreach ($result as $row) {
				
				if($this->time - $row->expires_token >= 0){
					parent::prepare_response(['error'=>'EXPIRES_TOKEN']);
				}
				
			}
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=>$err]);
		}
		
		$metal_residues_data = parent::get_metal_residues();

		if(array_key_exists('error', $metal_residues_data)){
			parent::prepare_response(['error'=>$metal_residues_data['error']]);
		}
		
		$list_of_colors_data = parent::get_list_of_colors();

		if(array_key_exists('error', $list_of_colors_data)){
			parent::prepare_response(['error'=>$list_of_colors_data['error']]);
		}
		
		$arr_list_of_colors_id_color = [];
		foreach ($list_of_colors_data['data'] as $c) {
			$arr_list_of_colors_id_color[$c['ЦветИД']] = $c['Красный'].','.$c['Зеленый'].','.$c['Синий'];
		}

		$metal_residues_data2 = [];
		$arr = [];
		$arr2 = [];
		$arr3 = [];
		$arr4 = [];
		$number_of_columns_for_thickness = 0;
		$actual_date = '';
		
		foreach ($metal_residues_data['data'] as $key => $val) {
			
			if($key == 'Данные'){
				foreach ($val as $c) {
					$thickness = (string) $c['Толщина'];
					if(!array_key_exists($thickness, $arr4)){
						$arr4[$thickness] = 1;
						$number_of_columns_for_thickness++;
					}
				}
			}
			
		}
		
		$arr2[] = 'Цвет';
		$arr2[] = 'rgb';
		$arr2[] = 'Покрытие';
		
		foreach ($arr4 as $key => $val) {
			$arr2[] = $key;
		}
		
		$arr3[] = $arr2;
		$arr4 = [];
		$offset = -1;
		
		foreach ($metal_residues_data['data'] as $key => $val) {
			
			if($key == 'Дата'){
				$actual_date = parent::convert_format_date2($val);
			} 
			
			if($key == 'Данные'){
				foreach ($val as $c) {
					
					$arr2 = [];
					$rgb = '';
					$y = -1;
					
					if(array_key_exists($c['ЦветИД'], $arr_list_of_colors_id_color)){
						$rgb = $arr_list_of_colors_id_color[$c['ЦветИД']];
					}
					
					$arr2[] = $c['Цвет'];
					$arr2[] = $rgb;
					$arr2[] = $c['Покрытие'];
					$y += 3;
					
					$thickness = (string) $c['Толщина'];
					if(!array_key_exists($thickness, $arr4)){
						$arr4[$thickness] = 1;
						$offset++;
					}
					
					if($offset > 0){
						for($i = 0; $i < $offset; $i++){
							$arr2[] = '';
							$y++;
						}
					}
					
					$arr2[] = $c['ЦветИД'].' '.$c['Количество'];
					$y++;
					
					for($i = 1; $i < $number_of_columns_for_thickness - $offset; $i++){
						$arr2[] = '';
					}
					
					$arr3[] = $arr2;
					
					if($y > 3){
						
						$y_ = $y;
						$y--;
						$si = sizeof($arr3);
						
						if($si > 1){
							
							$si -= 2;
							$is_break = false;
							
							for($yy = $y; $yy >= 0; $yy--){
								
								if($yy == 2){
									break;
								}
								
								$is_break = false;
								
								for($i = $si; $i >= 0; $i--){
									if(preg_replace('/([a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}).+/', '$1', $arr3[$i][$yy]) == $c['ЦветИД']){
										$arr3[$i][$y_] = $c['ЦветИД'].' '.$c['Количество'];
										$is_break = true;
										break;
									}
								}
								
								if($is_break){
									break;
								}
								
							}
							
							if($is_break){
								array_pop($arr3);
							}
							
						}
						
					}
					
				}
			}
			
		}
		
		foreach ($arr3 as $c) {
			$arr = [];
			foreach ($c as $c2) {
				if(preg_match('/[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}.+/', $c2)){
					$arr[] = preg_replace('/([a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}) (.+)/', '$2', $c2);
				}else{
					$arr[] = $c2;
				}
			}
			$metal_residues_data2[] = $arr;
		}
		
		parent::prepare_response(['response' => ['date' => $actual_date, 'data' => $metal_residues_data2]], true);
		
	}
	
}
