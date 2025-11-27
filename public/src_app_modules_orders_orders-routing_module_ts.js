"use strict";
(self["webpackChunksokrof_frontend"] = self["webpackChunksokrof_frontend"] || []).push([["src_app_modules_orders_orders-routing_module_ts"],{

/***/ 9355:
/*!*********************************************************!*\
  !*** ./src/app/modules/orders/orders-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrdersRoutingModule: () => (/* binding */ OrdersRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _components_orders_list_orders_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/orders-list/orders-list.component */ 9501);
/* harmony import */ var _components_order_editor_order_editor_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/order-editor/order-editor.component */ 9430);
/* harmony import */ var _components_order_page_order_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/order-page/order-page.component */ 4543);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);






const routes = [{
  path: '',
  component: _components_orders_list_orders_list_component__WEBPACK_IMPORTED_MODULE_0__.OrdersListComponent
}, {
  path: 'edit',
  component: _components_order_editor_order_editor_component__WEBPACK_IMPORTED_MODULE_1__.OrderEditorComponent
}, {
  path: 'details',
  component: _components_order_page_order_page_component__WEBPACK_IMPORTED_MODULE_2__.OrderPageComponent
}];
class OrdersRoutingModule {
  static ɵfac = function OrdersRoutingModule_Factory(t) {
    return new (t || OrdersRoutingModule)();
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: OrdersRoutingModule
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](OrdersRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_modules_orders_orders-routing_module_ts.js.map