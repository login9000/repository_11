"use strict";
(self["webpackChunksokrof_frontend"] = self["webpackChunksokrof_frontend"] || []).push([["src_app_modules_waybills_waybill-routing_module_ts"],{

/***/ 1944:
/*!************************************************************!*\
  !*** ./src/app/modules/waybills/waybill-routing.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WaybillRoutingModule: () => (/* binding */ WaybillRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _components_waybill_list_waybill_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/waybill-list/waybill-list.component */ 6780);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);




const routes = [{
  path: '',
  component: _components_waybill_list_waybill_list_component__WEBPACK_IMPORTED_MODULE_0__.WaybillListComponent
}];
class WaybillRoutingModule {
  static ɵfac = function WaybillRoutingModule_Factory(t) {
    return new (t || WaybillRoutingModule)();
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: WaybillRoutingModule
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](WaybillRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_modules_waybills_waybill-routing_module_ts.js.map