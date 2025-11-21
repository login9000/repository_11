<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\Api_v2\ControllerUpdateCounterpartyStatus;
use App\Http\Controllers\Api_v2\ControllerUpdateOrderStatus;
use App\Http\Controllers\Api_v2\ControllerUpdateShipmentStatus;
use App\Http\Controllers\Api_v2\ControllerUnauthenticated;
use App\Http\Controllers\Api_v2\ControllerUpdateProductCatalog;
use App\Http\Controllers\Api_v2\ControllerUpdatePricesOfTheMainCounterparty;
use App\Http\Controllers\Api_v2\ControllerUpdateAvailableCharacteristics;
use App\Http\Controllers\Api_v2\ControllerUpdateWarehouses;
use App\Http\Controllers\Api_v2\ControllerUpdateSubstandardCatalog;
use App\Http\Controllers\Api_v2\ControllerUpdateMetalResidues;
use App\Http\Controllers\Api_v2\ControllerUpdateLeftoverMetalForProducts;
use App\Http\Controllers\Api_v2\ControllerUpdateProductBalances;
use App\Http\Controllers\Api_v2\ControllerUpdateSubstandardBalances;
use App\Http\Controllers\Api_v2\ControllerAddNewNotification;
use App\Http\Controllers\Api_v2\ControllerUpdateListOfColors;
use App\Http\Controllers\Api_v2\ControllerUpdateProductRemains;
use App\Http\Controllers\Api_v2\ControllerUpdateFinishedProducts;
use App\Http\Controllers\Api_v2\ControllerUpdateUserData;
use App\Http\Controllers\Api_v2\ControllerUpdateCounterpartyData;
use App\Http\Controllers\Api_v2\ControllerAddCounterparty;
use App\Http\Controllers\Api_v2\ControllerAddOrder;
use App\Http\Controllers\Api_v2\ControllerUpdateOrder;
use App\Http\Controllers\Api_v2\ControllerUpdateCatalogItem;
use App\Http\Controllers\Api_v2\ControllerDeleteShipment;

Route::get('Unauthenticated', [ControllerUnauthenticated::class, 'handler'])->name('Unauthenticated');
Route::middleware('auth:sanctum')->group(function () {
	Route::any('v2/update_product_catalog', [ControllerUpdateProductCatalog::class, 'handler']);
	Route::any('v2/update_order_status', [ControllerUpdateOrderStatus::class, 'handler']);
	Route::any('v2/update_shipment_status', [ControllerUpdateShipmentStatus::class, 'handler']);
	Route::any('v2/update_counterparty_status', [ControllerUpdateCounterpartyStatus::class, 'handler']);
	Route::any('v2/update_prices_of_the_main_counterparty', [ControllerUpdatePricesOfTheMainCounterparty::class, 'handler']);
	Route::any('v2/update_available_characteristics', [ControllerUpdateAvailableCharacteristics::class, 'handler']);
	Route::any('v2/update_warehouses', [ControllerUpdateWarehouses::class, 'handler']);
	Route::any('v2/update_substandard_catalog', [ControllerUpdateSubstandardCatalog::class, 'handler']);
	Route::any('v2/update_metal_residues', [ControllerUpdateMetalResidues::class, 'handler']);
	Route::any('v2/update_leftover_metal_for_products', [ControllerUpdateLeftoverMetalForProducts::class, 'handler']);
	Route::any('v2/update_product_balances', [ControllerUpdateProductBalances::class, 'handler']);
	Route::any('v2/update_substandard_balances', [ControllerUpdateSubstandardBalances::class, 'handler']);
	Route::any('v2/add_new_notification', [ControllerAddNewNotification::class, 'handler']);
	Route::any('v2/update_list_of_colors', [ControllerUpdateListOfColors::class, 'handler']);
	Route::any('v2/update_product_remains', [ControllerUpdateProductRemains::class, 'handler']);
	Route::any('v2/update_finished_products', [ControllerUpdateFinishedProducts::class, 'handler']);
	Route::any('v2/update_user_data', [ControllerUpdateUserData::class, 'handler']);
	Route::any('v2/add_counterparty', [ControllerAddCounterparty::class, 'handler']);
	Route::any('v2/update_counterparty_data', [ControllerUpdateCounterpartyData::class, 'handler']);
	Route::any('v2/add_order', [ControllerAddOrder::class, 'handler']);
	Route::any('v2/update_order', [ControllerUpdateOrder::class, 'handler']);
	Route::any('v2/update_catalog_item', [ControllerUpdateCatalogItem::class, 'handler']);
	Route::any('v2/delete_shipment', [ControllerDeleteShipment::class, 'handler']);
});
