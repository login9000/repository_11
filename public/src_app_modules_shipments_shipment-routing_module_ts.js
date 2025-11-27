"use strict";
(self["webpackChunksokrof_frontend"] = self["webpackChunksokrof_frontend"] || []).push([["src_app_modules_shipments_shipment-routing_module_ts"],{

/***/ 1132:
/*!**************************************************************!*\
  !*** ./src/app/modules/shipments/shipment-routing.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShipmentRoutingModule: () => (/* binding */ ShipmentRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _components_shipment_list_shipment_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/shipment-list/shipment-list.component */ 6695);
/* harmony import */ var _components_shipment_editor_shipment_editor_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/shipment-editor/shipment-editor.component */ 7334);
/* harmony import */ var _components_shipment_page_shipment_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/shipment-page/shipment-page.component */ 6498);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);






const routes = [{
  path: '',
  component: _components_shipment_list_shipment_list_component__WEBPACK_IMPORTED_MODULE_0__.ShipmentListComponent
}, {
  path: 'edit',
  component: _components_shipment_editor_shipment_editor_component__WEBPACK_IMPORTED_MODULE_1__.ShipmentEditorComponent
}, {
  path: 'page',
  component: _components_shipment_page_shipment_page_component__WEBPACK_IMPORTED_MODULE_2__.ShipmentPageComponent
}];
class ShipmentRoutingModule {
  static ɵfac = function ShipmentRoutingModule_Factory(t) {
    return new (t || ShipmentRoutingModule)();
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: ShipmentRoutingModule
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ShipmentRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_modules_shipments_shipment-routing_module_ts.js.map