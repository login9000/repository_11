<?php

namespace App\Http\Controllers;
 
use App\Helpers\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerUploadPhoto extends Common{
	
	public function __invoke(Request $request){
		
		parent::check_allowed_method('POST');
		
		$user_myid = preg_replace('/[^a-f0-9\-]/', '', $_COOKIE['user_myid'] ?? '');
		$err = parent::check_valid_cookies();
		if($err){
			parent::prepare_response(['error'=>$err]);
		}

		try{

			$result = DB::select('SELECT `expires_token` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			
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
		
		if(!$request->hasFile('upload_photo')) {
			parent::prepare_response(['error'=>'INCORRECT_UPLOADING']);
		}
		
		$filedata = getimagesize($_FILES['upload_photo']['tmp_name']);
		
		if($filedata === false){
			parent::prepare_response(['error'=>'NO_VALID_FILE']);
		}	
		
		$size = filesize($_FILES['upload_photo']['tmp_name']) / 1000;
		$expansion = preg_replace('/[^a-zA-Z]/','',image_type_to_extension($filedata[2]));
	
		if(!in_array($expansion, $this->config_project['allow_photo_expansions'])){
			parent::prepare_response(['error'=>'INCORRECT_EXPANSION']);
		}
		
		if($size > $this->config_project['max_file_size_photo']){
			parent::prepare_response(['error'=>'LIMIT_FILE_SIZE']);
		}
		
		$natural_width = $filedata[0];
		$natural_height = $filedata[1];
		
		if(($natural_width > 5000 || $natural_height > 5000) || ($natural_width <= 1 || $natural_height <= 1)){
			parent::prepare_response(['error'=>'NO_VALID_IMAGE']);
		}
		
		if($size == 0){
			parent::prepare_response(['error'=>'NULL_FILE_SIZE']);
		}
		
		$expansion = strtolower($expansion);
		$hash = substr(md5($this->rnd . $this->time), 0, 10);
		
		if(!is_dir($this->document_root.'/user_files/'.$user_myid)){
			mkdir($this->document_root.'/user_files/'.$user_myid, 0774);
		}
		
		if(!is_dir($this->document_root.'/user_files/'.$user_myid.'/photo')){
			mkdir($this->document_root.'/user_files/'.$user_myid.'/photo', 0774);
		}
		
		$img = $this->document_root.'/user_files/'.$user_myid.'/photo/'.$hash.'.'.$expansion;
		$img2 = '/user_files/'.$user_myid.'/photo/preview_'.$hash.'.'.$expansion;
		
		if(!move_uploaded_file($_FILES['upload_photo']['tmp_name'], $img)){
			parent::prepare_response(['error'=>'FAIL_UPLOAD_IMAGE']);
		}
		
		$max_image_resolution = 512;
		
		if($natural_width != $natural_height || $natural_width > $max_image_resolution){
		
			switch($expansion){
				case 'jpg':
				case 'jpeg':
					$img_src = imagecreatefromjpeg($img);
					break;
				case 'gif':
					$img_src = imagecreatefromgif($img);
					$expansion = 'png';
					break;
				case 'png':
					$img_src = imagecreatefrompng($img);
					break;
			}
			
			if(!$img_src){
				
				@unlink($img);
				parent::prepare_response(['error'=>'NO_VALID_IMAGE']);

			}
			
			if($natural_width != $natural_height){
				
				if($natural_width > $natural_height){
					
					if($natural_height > $max_image_resolution){
						
						$size_w = $max_image_resolution;
						$size_h = $max_image_resolution;
						
					}else{
						
						$size_w = $natural_height;
						$size_h = $natural_height;
						
					}
					
					$x = ($natural_width - $natural_height) / 2;
					$y = 0;
					
					$natural_width = $natural_height;
					
				}else{
					
					if($natural_width > $max_image_resolution){
						
						$size_w = $max_image_resolution;
						$size_h = $max_image_resolution;
						
					}else{
						
						$size_w = $natural_width;
						$size_h = $natural_width;
						
					}
					
					$x = 0;
					$y = ($natural_height - $natural_width) / 2;
					
					$natural_height = $natural_width;
					
				}
				
			}else{
				
				$x = 0;
				$y = 0;
				
				if($natural_width > $max_image_resolution){
					
					$size_w = $max_image_resolution;
					$size_h = $max_image_resolution;
					
				}else{
					
					$size_w = $natural_width;
					$size_h = $natural_width;
					
				}
				
			}

			$copy_img = imagecreatetruecolor($size_w, $size_h);
			imagealphablending($copy_img, false);
			imagesavealpha($copy_img, true);
			imagecopyresampled($copy_img, $img_src, 0, 0, $x, $y, $size_w, $size_h, $natural_width, $natural_height);

			if($expansion == 'jpg' || $expansion == 'jpeg'){
				imagejpeg($copy_img, $this->document_root.'/user_files/'.$user_myid.'/photo/preview_'.$hash.'.'.$expansion);
			}else{
				imagepng($copy_img, $this->document_root.'/user_files/'.$user_myid.'/photo/preview_'.$hash.'.'.$expansion);
			}

			imagedestroy($img_src); 
			imagedestroy($copy_img);
			
		}else{
			copy($img, $this->document_root.'/user_files/'.$user_myid.'/photo/preview_'.$hash.'.'.$expansion);
		}
		
		try{
			
			$result = DB::select('SELECT `photo` FROM `users` WHERE `user_myid` = :user_myid LIMIT 1', ['user_myid' => $user_myid]);
			
			foreach ($result as $row) {
				if($row->photo != ''){
					$exp = preg_replace('/.*?\.(jpe?g|png|gif)/', '$1', $row->photo);
					if($exp == 'png'){
						if(file_exists($this->document_root.'/user_files/'.$user_myid.'/photo/'.str_replace('preview_', '', str_replace('png', 'gif', $row->photo)))){
							@unlink($this->document_root.'/user_files/'.$user_myid.'/photo/'.str_replace('preview_', '', str_replace('png', 'gif', $row->photo)));
						}else{
							@unlink($this->document_root.'/user_files/'.$user_myid.'/photo/'.str_replace('preview_', '', $row->photo));
						}
					}else{
						@unlink($this->document_root.'/user_files/'.$user_myid.'/photo/'.str_replace('preview_', '', $row->photo));
					}					
					@unlink($this->document_root.'/user_files/'.$user_myid.'/photo/'.$row->photo);
				}
			}
			
			DB::update('UPDATE `users` SET `photo` = :photo WHERE `user_myid` = :user_myid LIMIT 1', ['photo' => 'preview_'.$hash.'.'.$expansion, 'user_myid' => $user_myid]);
			
		} catch (QueryException $e) {
			$err = mb_convert_encoding($e->getMessage(), 'ASCII', 'UTF-8');
			parent::log_er_mysql($err);
			parent::prepare_response(['error'=> $err]);
		}
		
		if(file_exists($img)){
			chmod($img, 0764);
		}
		if(file_exists($this->document_root . $img2)){
			chmod($this->document_root . $img2, 0664);
		}
		
		parent::prepare_response(['response' => $img2]);
		
	}
	
}
