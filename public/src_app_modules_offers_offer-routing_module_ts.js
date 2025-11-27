"use strict";
(self["webpackChunksokrof_frontend"] = self["webpackChunksokrof_frontend"] || []).push([["src_app_modules_offers_offer-routing_module_ts"],{

/***/ 2906:
/*!********************************************************!*\
  !*** ./src/app/modules/offers/offer-routing.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OfferRoutingModule: () => (/* binding */ OfferRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _companents_offer_editor_offer_editor_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./companents/offer-editor/offer-editor.component */ 1370);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);




const routes = [{
  path: 'edit',
  component: _companents_offer_editor_offer_editor_component__WEBPACK_IMPORTED_MODULE_0__.OfferEditorComponent
}];
class OfferRoutingModule {
  static ɵfac = function OfferRoutingModule_Factory(t) {
    return new (t || OfferRoutingModule)();
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: OfferRoutingModule
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](OfferRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_modules_offers_offer-routing_module_ts.js.map