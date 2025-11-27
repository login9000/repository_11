"use strict";
(self["webpackChunksokrof_frontend"] = self["webpackChunksokrof_frontend"] || []).push([["src_app_modules_reports_reports-routing_module_ts"],{

/***/ 7953:
/*!***********************************************************!*\
  !*** ./src/app/modules/reports/reports-routing.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReportsRoutingModule: () => (/* binding */ ReportsRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _components_reports_reports_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/reports/reports.component */ 3650);
/* harmony import */ var _components_metal_report_metal_report_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/metal-report/metal-report.component */ 9261);
/* harmony import */ var _components_product_balance_report_product_balance_report_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/product-balance-report/product-balance-report.component */ 3019);
/* harmony import */ var _components_mutual_settlement_report_mutual_settlement_report_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/mutual-settlement-report/mutual-settlement-report.component */ 2907);
/* harmony import */ var _components_finished_products_sale_report_finished_products_sale_report_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/finished-products-sale-report/finished-products-sale-report.component */ 3044);
/* harmony import */ var _components_substandart_product_sale_report_substandart_product_sale_report_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/substandart-product-sale-report/substandart-product-sale-report.component */ 8878);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);









const routes = [{
  path: '',
  component: _components_reports_reports_component__WEBPACK_IMPORTED_MODULE_0__.ReportsComponent
}, {
  path: 'metal',
  component: _components_metal_report_metal_report_component__WEBPACK_IMPORTED_MODULE_1__.MetalReportComponent
}, {
  path: 'product_balance',
  component: _components_product_balance_report_product_balance_report_component__WEBPACK_IMPORTED_MODULE_2__.ProductBalanceReportComponent
}, {
  path: 'mutual_settlement',
  component: _components_mutual_settlement_report_mutual_settlement_report_component__WEBPACK_IMPORTED_MODULE_3__.MutualSettlementReportComponent
}, {
  path: 'finished_product_sale',
  component: _components_finished_products_sale_report_finished_products_sale_report_component__WEBPACK_IMPORTED_MODULE_4__.FinishedProductsSaleReportComponent
}, {
  path: 'substandard_product_sale',
  component: _components_substandart_product_sale_report_substandart_product_sale_report_component__WEBPACK_IMPORTED_MODULE_5__.SubstandartProductSaleReportComponent
}];
class ReportsRoutingModule {
  static ɵfac = function ReportsRoutingModule_Factory(t) {
    return new (t || ReportsRoutingModule)();
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
    type: ReportsRoutingModule
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](ReportsRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_modules_reports_reports-routing_module_ts.js.map