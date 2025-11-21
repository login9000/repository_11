<?php

namespace App\Http\Controllers;

use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerPseudoGraphql extends Common{
	
	public function __invoke(){
		
		parent::check_allowed_method('GET');
		header('Cache-Control: no-store, no-cache, must-revalidate');

		$query = preg_replace('/[^a-f0-9]/', '', $_GET['query'] ?? '');
		
		switch($query){
			
			case '80fff71329': // последние 3 новости, последние 5 заказов, последние 5 отгрузок
			
				require $this->document_root.'/../app/Helpers/_80fff71329.php';
				$obj = new \app\Helpers\_80fff71329\_80fff71329();
				parent::prepare_response($obj->result_[0], $obj->result_[1]);
				
				break;
				
			case '7a5d225581': // контрагенты, адреса доставки, склады отгрузки, каталог продукции, каталог цен, доступные характеристики
			
				require $this->document_root.'/../app/Helpers/_7a5d225581.php';
				$obj = new \app\Helpers\_7a5d225581\_7a5d225581();
				parent::prepare_response($obj->result_[0], $obj->result_[1]);
				
				break;
				
			case '9a420f87c5': // контрагенты, адреса доставки
			
				require $this->document_root.'/../app/Helpers/_9a420f87c5.php';
				$obj = new \app\Helpers\_9a420f87c5\_9a420f87c5();
				parent::prepare_response($obj->result_[0], $obj->result_[1]);
				
				break;

			case 'baa7a52965': // (запросы раз в 10 сек.) непрочитанные новости, непрочитанные уведомления, новые уведомления, статусы по заказам, популярные статусы, статусы по отгрузкам, статусы по контрагентам
			
				require $this->document_root.'/../app/Helpers/_baa7a52965.php';
				$obj = new \app\Helpers\_baa7a52965\_baa7a52965();
				parent::prepare_response($obj->result_[0], $obj->result_[1]);
				
				break;
				
			case '00b73371f6': // заказы, популярные статусы, сотрудники, контрагенты, склады отгрузки
			
				require $this->document_root.'/../app/Helpers/_00b73371f6.php';
				$obj = new \app\Helpers\_00b73371f6\_00b73371f6();
				parent::prepare_response($obj->result_[0], $obj->result_[1]);
				
				break;
				
			case '1eb6b16ad9': // ближайшие доступные даты, транспорт, календари отгрузок, интервалы отгрузок, все заказы со статусом который позволяем создать отгрузку
			
				require $this->document_root.'/../app/Helpers/_1eb6b16ad9.php';
				$obj = new \app\Helpers\_1eb6b16ad9\_1eb6b16ad9();
				parent::prepare_response($obj->result_[0], $obj->result_[1]);
				
				break;
				
			case 'e716b4abef': // отгрузки, сотрудники
			
				require $this->document_root.'/../app/Helpers/_e716b4abef.php';
				$obj = new \app\Helpers\_e716b4abef\_e716b4abef();
				parent::prepare_response($obj->result_[0], $obj->result_[1]);
				
				break;
				
			case '2b1d87eb63': // контрагенты, адреса доставки, склады отгрузки, каталог продукции, каталог цен, доступные характеристики, некоторые данные черновика
			
				require $this->document_root.'/../app/Helpers/_2b1d87eb63.php';
				$obj = new \app\Helpers\_2b1d87eb63\_2b1d87eb63();
				parent::prepare_response($obj->result_[0], $obj->result_[1]);
				
				break;
				
			case '6b7d7832ff': // контрагенты, склады отгрузки
			
				require $this->document_root.'/../app/Helpers/_6b7d7832ff.php';
				$obj = new \app\Helpers\_6b7d7832ff\_6b7d7832ff();
				parent::prepare_response($obj->result_[0], $obj->result_[1]);
				
				break;
				
			case 'cf816cb4ab': // склады отгрузки, продукция
			
				require $this->document_root.'/../app/Helpers/_cf816cb4ab.php';
				$obj = new \app\Helpers\_cf816cb4ab\_cf816cb4ab();
				parent::prepare_response($obj->result_[0], $obj->result_[1]);
				
				break;
				
			default:
				parent::prepare_response(['error' => 'UNKNOWN_QUERY']);
				break;
				
		}
		
	}
	
}
