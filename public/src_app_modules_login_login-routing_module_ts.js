"use strict";
(self["webpackChunksokrof_frontend"] = self["webpackChunksokrof_frontend"] || []).push([["src_app_modules_login_login-routing_module_ts"],{

/***/ 2113:
/*!*******************************************************!*\
  !*** ./src/app/modules/login/login-routing.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginRoutingModule: () => (/* binding */ LoginRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _components_signin_signin_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/signin/signin.component */ 3197);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);




const routes = [{
  path: '',
  component: _components_signin_signin_component__WEBPACK_IMPORTED_MODULE_0__.SigninComponent
}
// {
//   path: 'remember', component: OrderEditorComponent
// }
];

class LoginRoutingModule {
  static ɵfac = function LoginRoutingModule_Factory(t) {
    return new (t || LoginRoutingModule)();
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: LoginRoutingModule
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](LoginRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_modules_login_login-routing_module_ts.js.map