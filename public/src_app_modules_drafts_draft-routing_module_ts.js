"use strict";
(self["webpackChunksokrof_frontend"] = self["webpackChunksokrof_frontend"] || []).push([["src_app_modules_drafts_draft-routing_module_ts"],{

/***/ 4234:
/*!********************************************************!*\
  !*** ./src/app/modules/drafts/draft-routing.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DraftRoutingModule: () => (/* binding */ DraftRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _components_draft_page_draft_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/draft-page/draft-page.component */ 7738);
/* harmony import */ var _components_draft_editor_draft_editor_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/draft-editor/draft-editor.component */ 2197);
/* harmony import */ var _components_draft_list_draft_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/draft-list/draft-list.component */ 6497);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);






const routes = [{
  path: '',
  component: _components_draft_list_draft_list_component__WEBPACK_IMPORTED_MODULE_2__.DraftListComponent
}, {
  path: ':id',
  component: _components_draft_page_draft_page_component__WEBPACK_IMPORTED_MODULE_0__.DraftPageComponent
}, {
  path: 'edit/:id',
  component: _components_draft_editor_draft_editor_component__WEBPACK_IMPORTED_MODULE_1__.DraftEditorComponent
}];
class DraftRoutingModule {
  static ɵfac = function DraftRoutingModule_Factory(t) {
    return new (t || DraftRoutingModule)();
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: DraftRoutingModule
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](DraftRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_modules_drafts_draft-routing_module_ts.js.map