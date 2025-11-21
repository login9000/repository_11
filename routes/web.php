
<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::any('/', 'ControllerRoot');
Route::any('/login', 'ControllerRoot');
Route::any('/profile', 'ControllerRoot');
Route::any('/drafts/edit', 'ControllerRoot');
Route::any('/drafts/edit/{id}', 'ControllerRoot');
Route::any('/drafts/{id}', 'ControllerRoot');
Route::any('/drafts', 'ControllerRoot');
Route::any('/orders/edit', 'ControllerRoot');
Route::any('/orders', 'ControllerRoot');
Route::any('/orders;status=draft', 'ControllerRoot');
Route::any('/orders/details', 'ControllerRoot');
Route::any('/shipments/edit', 'ControllerRoot');
Route::any('/shipments', 'ControllerRoot');
Route::any('/shipments/page', 'ControllerRoot');
Route::any('/waybills', 'ControllerRoot');
Route::any('/reports', 'ControllerRoot');
Route::any('/counterparties', 'ControllerRoot');
Route::any('/addresses', 'ControllerRoot');
Route::any('/transports', 'ControllerRoot');
Route::any('/news', 'ControllerRoot');
Route::any('/reports/metal', 'ControllerRoot');
Route::any('/reports/product_balance', 'ControllerRoot');
Route::any('/reports/mutual_settlement', 'ControllerRoot');
Route::any('/reports/finished_product_sale', 'ControllerRoot');
Route::any('/reports/substandard_product_sale', 'ControllerRoot');
Route::any('/notifications', 'ControllerRoot');
Route::any('/cart', 'ControllerRoot');
Route::any('/offers/edit', 'ControllerRoot');
Route::any('/offers', 'ControllerRoot');

Route::any('/api/v1/js_error', 'ControllerJsError');
Route::any('/api/v1/auth', 'ControllerAuth');
Route::any('/api/v1/check_password_change', 'ControllerPasswordChange');
Route::any('/api/v1/recovery_pass', 'ControllerRecoveryPass');
Route::any('/api/v1/upload_photo', 'ControllerUploadPhoto');
Route::any('/api/v1/update_email', 'ControllerUpdateEmail');
Route::any('/api/v1/upload_file_for_manager', 'ControllerUploadFileForManager');
Route::any('/api/v1/post_mess_for_manager', 'ControllerPostMessForManager');
Route::any('/api/v1/add_new_employee', 'ControllerAddNewEmployee');
Route::any('/api/v1/edit_employee', 'ControllerEditEmployee');
Route::any('/api/v1/notification_delegation', 'ControllerNotificationDelegation');
Route::any('/api/v1/get_all_news', 'ControllerGetAllNews');
Route::any('/api/v1/get_news', 'ControllerGetNews');
Route::any('/api/v1/mark_all_news_as_read', 'ControllerMarkAllNewsAsRead');
Route::any('/api/v1/get_delivery_addresses', 'ControllerGetDeliveryAddresses');
Route::any('/api/v1/add_new_delivery_addresses', 'ControllerAddNewDeliveryAddresses');
Route::any('/api/v1/edit_delivery_addresses', 'ControllerEditDeliveryAddresses');
Route::any('/api/v1/delete_delivery_addresses', 'ControllerDeleteDeliveryAddresses');
Route::any('/api/v1/graphql', 'ControllerPseudoGraphql');
Route::any('/api/v1/add_new_counterparty', 'ControllerAddNewCounterparty');
Route::any('/api/v1/weight_calculation', 'ControllerWeightCalculation');
Route::any('/api/v1/order_creation', 'ControllerOrderCreation');
Route::any('/api/v1/delete_transport', 'ControllerDeleteTransport');
Route::any('/api/v1/get_transport', 'ControllerGetTransport');
Route::any('/api/v1/add_new_transport', 'ControllerAddNewTransport');
Route::any('/api/v1/download_price_list', 'ControllerDownloadPriceList');
Route::any('/api/v1/order_confirm', 'ControllerOrderConfirm');
Route::any('/api/v1/get_leftover_metal_for_products', 'ControllerGetLeftoverMetalForProducts');
Route::any('/api/v1/get_product_balances', 'ControllerGetProductBalances');
Route::any('/api/v1/upload_file_for_non_standard_addition', 'ControllerUploadFileForNonStandardAddition');
Route::any('/api/v1/delete_counterparty', 'ControllerDeleteCounterparty');
Route::any('/api/v1/get_employees', 'ControllerGetEmployees');
Route::any('/api/v1/edit_transport', 'ControllerEditTransport');
Route::any('/api/v1/logout', 'ControllerLogout');
Route::any('/api/v1/mark_all_notification_as_read', 'ControllerMarkAllNotificationAsRead');
Route::any('/api/v1/mark_notification_as_read', 'ControllerMarkNotificationAsRead');
Route::any('/api/v1/get_all_orders', 'ControllerGetAllOrders');
Route::any('/api/v1/get_all_notifications', 'ControllerGetAllNotifications');
Route::any('/api/v1/get_order_details', 'ControllerGetOrderDetails');
Route::any('/api/v1/order_cancel', 'ControllerOrderCancel');
Route::any('/api/v1/get_metal_presence_report', 'ControllerGetMetalPresenceReport');
Route::any('/api/v1/delete_draft', 'ControllerDeleteDraft');
Route::any('/api/v1/download_order_details', 'ControllerDownloadOrderDetails');
Route::any('/api/v1/get_all_orders_for_shipment', 'ControllerGetAllOrdersForShipment');
Route::any('/api/v1/shipment_creation', 'ControllerShipmentCreation');
Route::any('/api/v1/get_other_variables', 'ControllerGetOtherVariables');
Route::any('/api/v1/delete_file_for_non_standard_addition', 'ControllerDeleteFileForNonStandardAddition');
Route::any('/api/v1/download_invoice', 'ControllerDownloadInvoice');
Route::any('/api/v1/download_mutual_settlements', 'ControllerDownloadMutualSettlements');
Route::any('/api/v1/delete_file_for_manager', 'ControllerDeleteFileForManager');
Route::any('/api/v1/get_draft_details', 'ControllerGetDraftDetails');
Route::any('/api/v1/commercial_offers_edit_or_creation', 'ControllerCommercialOffersEditOrCreation');
Route::any('/api/v1/get_draft_for_new_commercial_offer', 'ControllerGetDraftForNewCommercialOffer');
Route::any('/api/v1/get_old_commercial_offer', 'ControllerGetOldCommercialOffer');
Route::any('/api/v1/delete_commercial_offer', 'ControllerDeleteCommercialOffer');
Route::any('/api/v1/download_commercial_offer', 'ControllerDownloadCommercialOffer');
Route::any('/api/v1/order_creation2', 'ControllerOrderCreation2');
Route::any('/api/v1/get_invoices', 'ControllerGetInvoices');
Route::any('/api/v1/download_list_of_invoices', 'ControllerDownloadListOfInvoices');
Route::any('/api/v1/get_shipping_warehouses', 'ControllerGetShippingWarehouses');
Route::any('/api/v1/get_all_shipments', 'ControllerGetAllShipments');
Route::any('/api/v1/get_product_remains', 'ControllerGetProductRemains');
Route::any('/api/v1/download_product_remains', 'ControllerDownloadProductRemains');
Route::any('/api/v1/get_substandard', 'ControllerGetSubstandard');
Route::any('/api/v1/download_substandard', 'ControllerDownloadSubstandard');
Route::any('/api/v1/get_finished_products', 'ControllerGetFinishedProducts');
Route::any('/api/v1/download_finished_products', 'ControllerDownloadFinishedProducts');
Route::any('/api/v1/add_news', 'ControllerAddNews');
Route::any('/api/v1/add_to_cart', 'ControllerAddToCart');
Route::any('/api/v1/get_shipping_details', 'ControllerGetShippingDetails');
Route::any('/api/v1/delete_from_cart', 'ControllerDeleteFromCart');
Route::any('/api/v1/edit_quantity_from_cart', 'ControllerEditQuantityFromCart');
Route::any('/api/v1/get_cart', 'ControllerGetCart');
Route::any('/api/v1/get_cart_info', 'ControllerGetCartInfo');
Route::any('/api/v1/length_check', 'ControllerLengthCheck');
Route::any('/api/v1/save_non_standard_addition', 'ControllerSaveNonStandardAddition');
Route::any('/api/v1/get_product_availability', 'ControllerGetProductAvailability');
Route::any('/api/v1/download_draft_details', 'ControllerDownloadDraftDetails');
Route::any('/api/v1/copy_order', 'ControllerCopyOrder');
Route::any('/api/v1/clear_cart', 'ControllerClearCart');

Route::any('/test_mysql', 'ControllerTestMysql');
// Route::any('/api/v1/test_post_request', 'ControllerTestPostRequest');
// Route::any('/api/v1/test_delete_request', 'ControllerTestDeleteRequest');

/* Route::get('/{anything}.{expansion}', function ($anything, $expansion) {
  
	return $anything.'.'.$expansion;
	
})->where(['anything' => '.+', 'expansion' => '(css|js|jpe?g|png|gif|ico|mp3|m4a|aac|ogg|midi?|wav|mp4|mov|webm|mpe?g|avi|ogv|fl|svgz?|ttf|ttc|otf|eot|woff|woff2)']); */

