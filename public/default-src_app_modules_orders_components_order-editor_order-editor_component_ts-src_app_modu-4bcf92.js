"use strict";
(self["webpackChunksokrof_frontend"] = self["webpackChunksokrof_frontend"] || []).push([["default-src_app_modules_orders_components_order-editor_order-editor_component_ts-src_app_modu-4bcf92"],{

/***/ 6748:
/*!******************************************************************************************!*\
  !*** ./src/app/modules/orders/components/cart-items-table/cart-items-table.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CartItemsTableComponent: () => (/* binding */ CartItemsTableComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_order_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/order.service */ 3458);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/table */ 6192);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/api */ 8026);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/button */ 2947);






function CartItemsTableComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr")(1, "th", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "p-tableHeaderCheckbox");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "\u041D\u043E\u043C\u0435\u043D\u043A\u043B\u0430\u0442\u0443\u0440\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "\u0414\u043B\u0438\u043D\u0430, \u043C");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "\u0415\u0434. \u0438\u0437\u043C.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "\u041A\u043E\u043B-\u0432\u043E");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "\u0418\u0442\u043E\u0433\u043E");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "\u041D\u0430\u043B\u0438\u0447\u0438\u0435");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "\u0420\u0435\u0437\u0435\u0440\u0432");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "\u0426\u0435\u043D\u0430, \u20BD");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "\u0421\u0443\u043C\u043C\u0430, \u20BD");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function CartItemsTableComponent_ng_template_2_p_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const price_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", price_r5, " ");
  }
}
function CartItemsTableComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "p-tableCheckbox", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](11, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](14, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, CartItemsTableComponent_ng_template_2_p_20_Template, 2, 1, "p", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](23, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const product_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", product_r2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](product_r2["nomenclature_name"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](product_r2["length"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](product_r2["unit"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](11, 9, product_r2["quantity"], "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](14, 12, product_r2["total"], "1.1-3"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](product_r2.available);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", product_r2["price"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](product_r2["sum"] === -1 ? "-" : _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](23, 15, product_r2["sum"], "1.1-2"));
  }
}
const _c0 = function () {
  return {
    "min-width": "50rem"
  };
};
class CartItemsTableComponent {
  orderService;
  constructor(orderService) {
    this.orderService = orderService;
  }
  deleteSelectedProducts() {
    this.orderService.cartItems = this.orderService.cartItems.filter(item => !this.orderService.selectedCartItems.includes(item));
    this.orderService.selectedCartItems = [];
  }
  static ɵfac = function CartItemsTableComponent_Factory(t) {
    return new (t || CartItemsTableComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_order_service__WEBPACK_IMPORTED_MODULE_0__.OrderService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: CartItemsTableComponent,
    selectors: [["app-cart-items-table"]],
    decls: 5,
    vars: 5,
    consts: [["dataKey", "tmpId", 3, "value", "selection", "tableStyle", "selectionChange"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "pt-2"], ["label", "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u0442\u043E\u0432\u0430\u0440\u044B", "severity", "danger", 1, "m-2", 3, "disabled", "click"], [2, "width", "4rem"], [3, "value"], [4, "ngFor", "ngForOf"]],
    template: function CartItemsTableComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p-table", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectionChange", function CartItemsTableComponent_Template_p_table_selectionChange_0_listener($event) {
          return ctx.orderService.selectedCartItems = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, CartItemsTableComponent_ng_template_1_Template, 21, 0, "ng-template", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, CartItemsTableComponent_ng_template_2_Template, 24, 18, "ng-template", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3)(4, "p-button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CartItemsTableComponent_Template_p_button_click_4_listener() {
          return ctx.deleteSelectedProducts();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.orderService.cartItems)("selection", ctx.orderService.selectedCartItems)("tableStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](4, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", (ctx.orderService.selectedCartItems == null ? null : ctx.orderService.selectedCartItems.length) == 0 || (ctx.orderService.cartItems == null ? null : ctx.orderService.cartItems.length) == (ctx.orderService.selectedCartItems == null ? null : ctx.orderService.selectedCartItems.length));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, primeng_table__WEBPACK_IMPORTED_MODULE_3__.Table, primeng_api__WEBPACK_IMPORTED_MODULE_4__.PrimeTemplate, primeng_table__WEBPACK_IMPORTED_MODULE_3__.TableCheckbox, primeng_table__WEBPACK_IMPORTED_MODULE_3__.TableHeaderCheckbox, primeng_button__WEBPACK_IMPORTED_MODULE_5__.Button, _angular_common__WEBPACK_IMPORTED_MODULE_2__.DecimalPipe],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 9430:
/*!**********************************************************************************!*\
  !*** ./src/app/modules/orders/components/order-editor/order-editor.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrderEditorComponent: () => (/* binding */ OrderEditorComponent)
/* harmony export */ });
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/dynamicdialog */ 4436);
/* harmony import */ var _products_dialog_product_search_dialog_product_search_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../products/dialog/product-search-dialog/product-search-dialog.component */ 1404);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _shared_DateUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/DateUtils */ 561);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/api */ 8026);
/* harmony import */ var _core_locale_CalendareRuLocale__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/locale/CalendareRuLocale */ 2104);
/* harmony import */ var _addresses_dialogs_address_editor_dialog_address_editor_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../addresses/dialogs/address-editor-dialog/address-editor-dialog.component */ 7638);
/* harmony import */ var _dialogs_non_standard_element_editor_non_standard_element_editor_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../dialogs/non-standard-element-editor/non-standard-element-editor.component */ 9017);
/* harmony import */ var _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../core/error-handle/ErrorTranslator */ 8097);
/* harmony import */ var _dialogs_non_standard_element_viewer_non_standard_element_viewer_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../dialogs/non-standard-element-viewer/non-standard-element-viewer.component */ 2763);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ 2235);
/* harmony import */ var _mappers_SpecificationMapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../mappers/SpecificationMapper */ 3945);
/* harmony import */ var _mappers_PriceInputMapper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../mappers/PriceInputMapper */ 3629);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_order_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/order.service */ 3458);
/* harmony import */ var _products_services_product_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../products/services/product.service */ 555);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var primeng_divider__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/divider */ 920);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! primeng/calendar */ 7411);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! primeng/dropdown */ 4553);
/* harmony import */ var _managers_components_sokrof_responsible_avatar_and_name_sokrof_responsible_avatar_and_name_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../managers/components/sokrof-responsible-avatar-and-name/sokrof-responsible-avatar-and-name.component */ 3842);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! primeng/checkbox */ 1580);
/* harmony import */ var _products_components_product_table_for_order_editor_product_table_for_order_editor_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../products/components/product-table-for-order-editor/product-table-for-order-editor.component */ 8090);
/* harmony import */ var primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! primeng/inputtextarea */ 652);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! primeng/toast */ 8313);
/* harmony import */ var primeng_tooltip__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! primeng/tooltip */ 1251);
/* harmony import */ var _cart_items_table_cart_items_table_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../cart-items-table/cart-items-table.component */ 6748);
/* harmony import */ var _shared_pipes_currency_ru_pipe__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../shared/pipes/currency-ru.pipe */ 6219);

































function OrderEditorComponent_form_1_ng_container_3_p_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "p", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1, "\u0421\u043E\u0437\u0434\u0430\u043D \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u0438 \u043E\u0442\u0447\u0435\u0442\u0430 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](ctx_r8.basedReportName);
  }
}
function OrderEditorComponent_form_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, OrderEditorComponent_form_1_ng_container_3_p_1_Template, 4, 1, "p", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !!ctx_r2.basedReportName);
  }
}
const _c0 = function () {
  return {
    "width": "100%"
  };
};
function OrderEditorComponent_form_1_div_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 32)(1, "div", 13)(2, "div")(3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](4, "\u0410\u0434\u0440\u0435\u0441");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](6, "p-dropdown", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "p", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function OrderEditorComponent_form_1_div_37_Template_p_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r9.addNewAddress());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](8, "\u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction0"](3, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("options", ctx_r3.addresses);
  }
}
function OrderEditorComponent_form_1_p_button_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "p-button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function OrderEditorComponent_form_1_p_button_43_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r11.onShowProductSearchDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("icon", ctx_r4.isDataLoaded && !ctx_r4.isBasedOnCart ? "pi pi-plus" : "pi pi-spin pi-spinner");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("disabled", !ctx_r4.isDataLoaded || ctx_r4.isBasedOnCart);
  }
}
function OrderEditorComponent_form_1_p_button_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "p-button", 36);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("disabled", ctx_r5.isBasedOnCart);
  }
}
function OrderEditorComponent_form_1_div_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 19)(1, "p-button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function OrderEditorComponent_form_1_div_46_Template_p_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r13.onShowNonStandardProductViewer());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "p-button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function OrderEditorComponent_form_1_div_46_Template_p_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r14);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r15.removeNonStandardElements());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("text", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("text", true);
  }
}
function OrderEditorComponent_form_1_ng_container_62_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "app-cart-items-table");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementContainerEnd"]();
  }
}
const _c1 = function () {
  return {
    standalone: true
  };
};
function OrderEditorComponent_form_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "form", 4)(1, "p", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2, "\u041D\u043E\u0432\u044B\u0439 \u0437\u0430\u043A\u0430\u0437");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](3, OrderEditorComponent_form_1_ng_container_3_Template, 2, 1, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](4, "div", 7)(5, "div", 8)(6, "div", 7)(7, "div", 9)(8, "div")(9, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](10, "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](11, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](12, "p-dropdown", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](13, "div", 9)(14, "div")(15, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](16, "\u0421\u043A\u043B\u0430\u0434 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](17, "div")(18, "p-dropdown", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("onChange", function OrderEditorComponent_form_1_Template_p_dropdown_onChange_18_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r17);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r16.onChangWareHouse($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](19, "div", 9)(20, "div")(21, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](22, "\u0424\u043E\u0440\u043C\u0430 \u043E\u043F\u043B\u0430\u0442\u044B");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](23, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](24, "p-dropdown", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](25, "div", 13)(26, "div")(27, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](28, "\u0416\u0435\u043B\u0430\u0435\u043C\u0430\u044F \u0434\u0430\u0442\u0430 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438/\u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](29, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](30, "p-calendar", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](31, "div", 13)(32, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](33, "\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043E\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](34, "app-sokrof-responsible-avatar-and-name");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](35, "div")(36, "p-checkbox", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngModelChange", function OrderEditorComponent_form_1_Template_p_checkbox_ngModelChange_36_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r17);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r18.isDeliveryNeeded = $event);
    })("ngModelChange", function OrderEditorComponent_form_1_Template_p_checkbox_ngModelChange_36_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r17);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r19.toggleDeliveryNeeded());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](37, OrderEditorComponent_form_1_div_37_Template, 9, 4, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](38, "p-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](39, "p", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](40, "\u0422\u043E\u0432\u0430\u0440\u044B");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](41, "div", 18)(42, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](43, OrderEditorComponent_form_1_p_button_43_Template, 1, 2, "p-button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](44, OrderEditorComponent_form_1_p_button_44_Template, 1, 1, "p-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](45, "p-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function OrderEditorComponent_form_1_Template_p_button_click_45_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r17);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r20.onShowNonStandardProductEditor());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](46, OrderEditorComponent_form_1_div_46_Template, 3, 2, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](47, "div", 18)(48, "div", 19)(49, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](50, " \u041E\u0440\u0438\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u043E\u0447\u043D\u044B\u0439 \u0432\u0435\u0441 \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u0438: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](51, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](52);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](53, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](54, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function OrderEditorComponent_form_1_Template_i_click_54_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r17);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r21.calculateWeight());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](55, "div", 19)(56, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](57, "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u0430: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](58, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](59);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](60, "currencyRu");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](61, "app-product-table-for-order-editor", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](62, OrderEditorComponent_form_1_ng_container_62_Template, 2, 0, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](63, "div", 26)(64, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](65, "textarea", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](66, "label", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](67, "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u0434\u043B\u044F \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("formGroup", ctx_r0.orderForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r0.isBasedOnCart);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction0"](28, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("options", ctx_r0.counterparties);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction0"](29, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("options", ctx_r0.data == null ? null : ctx_r0.data.response == null ? null : ctx_r0.data.response.shipment_warehouses == null ? null : ctx_r0.data.response.shipment_warehouses.data);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction0"](30, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("options", ctx_r0.paymentTypes);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("dateFormat", "dd.mm.yy");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngModel", ctx_r0.isDeliveryNeeded)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction0"](31, _c1))("binary", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r0.isDeliveryNeeded);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx_r0.isBasedOnCart);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r0.isBasedOnCart);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("disabled", ctx_r0.isBasedOnCart);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r0.showRequestedWindow);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](53, 24, ctx_r0.summaryWeight), " \u043A\u0433");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](60, 26, ctx_r0.getOrderCost()));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("warehouseId", ctx_r0.orderForm.value["shipping_warehouse"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r0.isBasedOnCart && ctx_r0.orderService.cartItems.length > 0);
  }
}
function OrderEditorComponent_p_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "p-button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function OrderEditorComponent_p_button_3_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r23);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r22.sendToManager());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("icon", ctx_r1.animationSubmitButton1 ? "pi pi-spin pi-spinner" : "pi pi-spin");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("disabled", ctx_r1.blockSubmitButton1);
  }
}
class OrderEditorComponent {
  fb;
  dialogService;
  messageService;
  primengConfig;
  orderService;
  productService;
  route;
  router;
  summaryWeight = 0;
  orderCost = 0;
  options = [];
  ref;
  orderForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormGroup({});
  data;
  counterparties = [];
  paymentTypes = [];
  isDeliveryNeeded = false;
  addresses = [];
  addressDialogRef;
  nonStandardElementDialogRef;
  basedReportName = '';
  //Если заказ формируется на основе корзины
  isDataLoaded = false;
  basedOnCart = '';
  isBasedOnCart = false;
  shippingWarehouseId = '';
  showNonstandardElements = false;
  shipmentWarehouses;
  orderForCopy;
  blockSubmitButton1 = false;
  blockSubmitButton2 = false;
  animationSubmitButton1 = false;
  animationSubmitButton2 = false;
  disableSubmitButton = false;
  interval_1 = null;
  constructor(fb, dialogService, messageService, primengConfig, orderService, productService, route, router) {
    this.fb = fb;
    this.dialogService = dialogService;
    this.messageService = messageService;
    this.primengConfig = primengConfig;
    this.orderService = orderService;
    this.productService = productService;
    this.route = route;
    this.router = router;
  }
  startCheckProductCatalog() {
    if (this.interval_1 !== null) {
      return;
    }
    var co = 0;
    var max_sec = 25;
    this.interval_1 = setInterval(() => {
      if (globalThis.productCatalog.length > 0) {
        clearInterval(this.interval_1);
        this.interval_1 = null;
        this.isDataLoaded = true;
        return;
      }
      co++;
      if (co >= max_sec) {
        clearInterval(this.interval_1);
        this.interval_1 = null;
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Неудалось загрузить каталог продукции за ' + max_sec + ' секуд ожидания',
          life: 15000
        });
      }
    }, 1000);
  }
  ngOnInit() {
    this.initPaymentTypes();
    this.basedOnCart = this.route.snapshot.queryParams['based_on_cart'];
    this.shippingWarehouseId = this.route.snapshot.queryParams['shipping_warehouse_id'];
    this.isBasedOnCart = !!this.basedOnCart;
    this.orderService.showRequestedWindow = false;
    this.initForm();
    this.route.queryParams.subscribe(params => {
      this.orderService.cartItems = [];
      this.isBasedOnCart = this.basedOnCart !== undefined;
      if (this.isBasedOnCart) {
        this.basedReportName = this.getCartBasedName(this.basedOnCart);
      }
      if (params['id']) {
        this.orderService.copyOrder(params['id']).subscribe({
          next: response => {
            this.orderForCopy = response;
            this.isDeliveryNeeded = response.delivery;
            // @ts-ignore
            this.productService.products = response.inventory.map(inventory => {
              return {
                tmpId: Math.random(),
                summaryPrice: inventory.amount,
                available: inventory.availability,
                bonus_percentage: inventory.bonusPercentage,
                length: inventory.characteristic,
                color: inventory.colorID,
                fillCharacteristic: inventory.fillCharacteristic,
                id: inventory.nomenclatureID,
                name: inventory.nomenclatureName,
                typeId: inventory.nomenclatureTypeID,
                price: inventory.price,
                amount: inventory.quantity,
                quantityConversionFactor: inventory.quantityConversionCoefficient,
                soldInSets: inventory.soldInSets,
                thickness: inventory.thickness,
                result: inventory.total,
                measureUnitName: inventory.unitOfMeasurementName
              };
            });
            this.counterparties.push({
              counterparty_id: response.counterpartyID,
              fullname: response.counterpartyName.replace(/&amp;quot;/g, '"').replace(/&quot;/g, '"')
            });
            this.orderForm.patchValue({
              counterparty: this.counterparties[0],
              is_cash_payment: this.orderForCopy['cashPayment'] ? this.paymentTypes[0] : this.paymentTypes[1],
              shipping_date: new Date(),
              shipping_warehouse: {
                СкладИД: response.shipmentWarehouseID,
                Наименование: response.shipmentWarehouseName
              },
              delivery_address: {
                АдресДоставкиИД: response.deliveryAddressID,
                АдресДоставки: response.deliveryAddress
              },
              comment: this.orderForCopy['comment']
            });
            response.nonStandardElements.forEach(element => {
              this.nonStandardElements.push(this.fb.group({
                description: [element.description || '', _angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.required],
                quantity: [element.quantity || '', _angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.min(1)])]
              }));
            });
            response.nonStandardElementFiles.forEach(file => {
              this.nonStandardElementPhotos.push(this.fb.group({
                link: [file.link],
                file_name: [file.fileName]
              }));
            });
            if (response.nonStandardElementFiles.length > 0 || response.nonStandardElements.length > 0) {
              this.orderService.showRequestedWindow = true;
            } else {
              this.orderService.showRequestedWindow = false;
            }
          }
        });
      } else {
        this.orderForm.patchValue({
          counterparty: null,
          is_cash_payment: null,
          shipping_date: null,
          shipping_warehouse: null,
          delivery_address: null,
          comment: null
        });
        this.orderService.nonStandardElementsForm = this.fb.group({
          nonStandardElements: this.fb.array([]),
          nonStandardElementPhotos: this.fb.array([])
        });
        this.productService.products = [];
      }
    });
    this.primengConfig.setTranslation(_core_locale_CalendareRuLocale__WEBPACK_IMPORTED_MODULE_2__.CALENDAR_RU_LOCALE);
    let dataForOrderEditor = null;
    if (this.isBasedOnCart) {
      dataForOrderEditor = this.orderService.getDataForOrderEditor(this.basedOnCart, this.shippingWarehouseId);
    } else {
      dataForOrderEditor = this.orderService.getDataForOrderEditor();
    }
    dataForOrderEditor.subscribe(data => {
      this.data = data;
      this.productService.availableSpecifications = this.data?.response?.available_specifications.data.map(item => {
        const mapper = new _mappers_SpecificationMapper__WEBPACK_IMPORTED_MODULE_7__.SpecificationMapper();
        return mapper.mapRuToEng(item);
      });
      this.productService.prices = this.data?.response?.prices_product_catalog?.data.map(item => {
        const mapper = new _mappers_PriceInputMapper__WEBPACK_IMPORTED_MODULE_8__.PriceInputMapper();
        return mapper.mapRuToEng(item);
      });
      this.productService.productCatalog = globalThis.productCatalog;
      this.productService.productCatalog.forEach(productContainer => {
        productContainer.data.forEach(product => {
          product.price = this.productService.prices[0]?.prices?.find(p => p.id === product?.itemID)?.price;
          const specification = this.productService.availableSpecifications.find(spec => spec.id === product?.itemID);
          if (specification) {
            product.min = specification.min;
            product.max = specification.max;
            product.step = specification.step;
          }
        });
      });
      if (this.isBasedOnCart) {
        this.orderService.cartItems = this.data?.response?.cart_contents.data;
        this.orderService.cartItems.forEach(item => {
          item.tmpId = Math.random();
          this.productService.getProductAvailability(this.shippingWarehouseId, item.id_nomenclature).subscribe(response => {
            item.available = response.response.availability;
          });
        });
        const shipmentWarehouse = {
          СкладИД: this.data?.response?.shipping_warehouse_id,
          Наименование: this.data?.response?.shipping_warehouse_name
        };
        this.shipmentWarehouses = [shipmentWarehouse];
        this.orderForm.patchValue({
          shipping_warehouse: shipmentWarehouse
        });
      }
      this.counterparties = this.data?.response?.counterparties?.data.filter(c => c.is_confirmed === '1').map(counterparty => {
        counterparty.fullname = counterparty.fullname.replace(/&quot;/g, '"');
        counterparty.counterparty_id = counterparty.counterparty_id || counterparty.application_id;
        return counterparty;
      });
      if (globalThis.productCatalog.length > 0) {
        this.isDataLoaded = true;
      } else {
        this.startCheckProductCatalog();
      }
      this.addresses = this.data?.response.delivery_addresses.data;
    });
    this.orderService.nonStandardElementsForm = this.fb.group({
      nonStandardElements: this.fb.array([]),
      nonStandardElementPhotos: this.fb.array([])
    });
  }
  get showRequestedWindow() {
    return this.orderService.showRequestedWindow;
  }
  get nonStandardElements() {
    return this.orderService.nonStandardElementsForm?.get('nonStandardElements') || null;
  }
  get nonStandardElementPhotos() {
    return this.orderService.nonStandardElementsForm?.get('nonStandardElementPhotos') || null;
  }
  onShowProductSearchDialog() {
    if (!!this.orderForm.value['shipping_warehouse']) {
      this.ref = this.dialogService.open(_products_dialog_product_search_dialog_product_search_dialog_component__WEBPACK_IMPORTED_MODULE_0__.ProductSearchDialogComponent, {
        header: "Найти товар",
        width: '90%',
        height: '90%',
        data: {
          data: this.data
        },
        contentStyle: {
          overflow: 'auto'
        },
        baseZIndex: 10000
      });
      this.ref.onClose.subscribe(response => {
        if (response) {
          if (!this.productService.products) {
            this.productService.products = [];
          }
          response.forEach(p => p.tmpId = Math.random());
          this.productService.products.push(...response);
          this.productService.signalToUpdateAvailable$.next(this.orderForm.value['shipping_warehouse']?.СкладИД);
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Необходимо выбрать склад отгрузки'
      });
    }
  }
  toggleDeliveryNeeded() {}
  calculateWeight() {
    let weightObservable$ = new rxjs__WEBPACK_IMPORTED_MODULE_17__.Observable();
    if (this.isBasedOnCart) {
      weightObservable$ = this.productService.calculateCartItemWeight(this.orderService.cartItems);
    } else {
      weightObservable$ = this.productService.calculateWeight();
    }
    weightObservable$.subscribe({
      next: res => {
        this.summaryWeight = res.response;
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: err.error.error
        });
      }
    });
  }
  sendToManager() {
    if (!this.blockSubmitButton1 && !this.blockSubmitButton2) {
      const request = this.buildRequest();
      if (request) {
        request.is_draft = '';
        this.blockSubmitButton1 = true;
        this.blockSubmitButton2 = true;
        this.animationSubmitButton1 = true;
        this.createOrder(request, 'Заказ создан и отправлен менеджеру', '/orders');
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Выберите склад'
        });
      }
    }
  }
  saveToDraft() {
    if (!this.blockSubmitButton2 && !this.blockSubmitButton1) {
      const request = this.buildRequest();
      if (request) {
        request.is_draft = '1';
        this.blockSubmitButton2 = true;
        this.blockSubmitButton1 = true;
        this.animationSubmitButton2 = true;
        this.createOrder(request, 'Заказ сохранен в черновики', '/drafts');
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Выберите склад'
        });
      }
    }
  }
  createOrder(request, successMessage, navigateUrl) {
    this.orderService.createOrder(request).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: successMessage
        });
        this.productService.products = [];
        this.productService.selectedProducts = [];
        this.orderService.nonStandardElementsForm = this.fb.group({
          nonStandardElements: this.fb.array([]),
          nonStandardElementPhotos: this.fb.array([])
        });
        setTimeout(() => {
          this.router.navigate([navigateUrl]);
          this.blockSubmitButton1 = false;
          this.blockSubmitButton2 = false;
          this.animationSubmitButton1 = false;
          this.animationSubmitButton2 = false;
        }, 3000);
      },
      error: err => {
        this.blockSubmitButton1 = false;
        this.blockSubmitButton2 = false;
        this.animationSubmitButton1 = false;
        this.animationSubmitButton2 = false;
        if (err.error.error === 'LIMIT_MAX_COUNT_GOODS_NON_STANDARD_ADDITION') {
          const errorText = `Достигнуто максимальное количество нестандартных элементов (${err.error.comment})`;
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: errorText
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_5__.ErrorTranslator.translate(_core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_5__.ErrorTranslator.prepare(err)),
            life: 10000
          });
        }
      }
    });
  }
  onChangWareHouse(event) {
    sessionStorage.removeItem('add_order_filter_selectedNode');
    sessionStorage.removeItem('add_order_filter_profile');
    sessionStorage.removeItem('add_order_filter_weight');
    sessionStorage.removeItem('add_order_filter_coating');
    sessionStorage.removeItem('add_order_filter_color');
  }
  buildRequest() {
    let value = this.orderForm.value;
    if (value.shipping_warehouse || this.shippingWarehouseId) {
      const request = {
        counterparty_id: value.counterparty?.counterparty_id,
        is_cash_payment: value.is_cash_payment ? value.is_cash_payment?.id : '',
        shipping_date: !!value.shipping_date ? _shared_DateUtils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.formatDate(value.shipping_date) : "",
        shipping_warehouse_id: this.isBasedOnCart ? this.shipmentWarehouses[0].СкладИД : value.shipping_warehouse['СкладИД'],
        is_shipping: this.isDeliveryNeeded ? '1' : '',
        delivery_address: value.delivery_address ? value.delivery_address['АдресДоставки'] : '',
        delivery_address_id: value.delivery_address ? value.delivery_address['АдресДоставкиИД'] : '',
        goods: this.getGoods(),
        goods_non_standard_addition: this.isBasedOnCart ? [] : this.orderService.nonStandardElementsForm?.get('nonStandardElements').value || [],
        files_non_standard_addition: this.isBasedOnCart ? [] : this.orderService.nonStandardElementsForm?.get('nonStandardElementPhotos').value || [],
        comment: value.comment
      };
      if (this.isBasedOnCart) {
        request.based_on_cart = this.basedOnCart;
      }
      return request;
    }
  }
  initForm() {
    this.orderForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormGroup({
      counterparty: new _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.required),
      is_cash_payment: new _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormControl(''),
      shipping_date: new _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormControl(''),
      shipping_warehouse: new _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormControl({
        value: '',
        disabled: this.isBasedOnCart
      }),
      delivery_address: new _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormControl(''),
      comment: new _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormControl('')
    });
    this.orderForm.valueChanges.subscribe(changes => {
      if (!this.isBasedOnCart && !!changes?.shipping_warehouse && changes?.shipping_warehouse['СкладИД']) {
        this.productService.signalToUpdateAvailable$.next(changes.shipping_warehouse['СкладИД']);
      }
    });
  }
  getGoods() {
    if (this.isBasedOnCart) {
      return this.orderService.cartItems.map(item => {
        return {
          id_nomenclature: item.id_nomenclature.toString(),
          id_nomenclature_type: item.id_nomenclature_type,
          length: item.length,
          quantity: item.quantity,
          bonus_percentage: 0
        };
      });
    }
    return this.productService.products.map(product => {
      return {
        id_nomenclature: product.id,
        id_nomenclature_type: product.typeId,
        length: this.getLength(product.length),
        quantity: product.amount,
        bonus_percentage: 0
      };
    });
  }
  getLength(length) {
    if (+length > 0) {
      return length;
    }
    return "";
  }
  addNewAddress() {
    this.addressDialogRef = this.dialogService.open(_addresses_dialogs_address_editor_dialog_address_editor_dialog_component__WEBPACK_IMPORTED_MODULE_3__.AddressEditorDialogComponent, {
      header: "Добавить адрес",
      width: '40%',
      height: 'auto',
      style: {
        overflowY: 'none'
      },
      baseZIndex: 10000
    });
    this.addressDialogRef.onClose.subscribe(response => {
      if (response) {
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Адрес добавлен'
        });
      }
      const newAddress = {
        АдресДоставкиИД: response.response.delivery_addresses_id,
        АдресДоставки: response.response.full_delivery_addresses
      };
      this.addresses.unshift(newAddress);
      this.orderForm.patchValue({
        delivery_address: this.addresses[0]
      });
    });
  }
  getOrderCost() {
    if (this.isBasedOnCart) {
      this.orderCost = 0;
      this.orderService.cartItems.forEach(item => {
        this.orderCost += item.sum;
      });
    } else {
      this.orderCost = 0;
      this.productService.products.forEach(item => {
        this.orderCost += item.summaryPrice;
      });
    }
    return this.orderCost;
  }
  onShowNonStandardProductEditor() {
    // this.showNonstandardElements = false
    this.nonStandardElementDialogRef = this.dialogService.open(_dialogs_non_standard_element_editor_non_standard_element_editor_component__WEBPACK_IMPORTED_MODULE_4__.NonStandardElementEditorComponent, {
      header: "Добавление нестандартного элемента",
      width: '80%',
      style: {
        overflowY: 'none'
      },
      baseZIndex: 10000
    });
    this.nonStandardElementDialogRef.onClose.subscribe(result => {
      if (result) {
        this.showNonstandardElements = true;
      }
    });
  }
  onShowNonStandardProductViewer() {
    const ref = this.dialogService.open(_dialogs_non_standard_element_viewer_non_standard_element_viewer_component__WEBPACK_IMPORTED_MODULE_6__.NonStandardElementViewerComponent, {
      header: "Нестандартные доборные элементы",
      width: '80%',
      style: {
        overflowY: 'none'
      },
      baseZIndex: 10000
    });
  }
  removeNonStandardElements() {
    this.orderService.nonStandardElementsForm = this.fb.group({
      nonStandardElements: this.fb.array([]),
      nonStandardElementPhotos: this.fb.array([])
    });
    this.orderService.showRequestedWindow = false;
  }
  getCartBasedName(target) {
    switch (target) {
      case 'product_remains':
        {
          return 'Остатки складских позиций';
        }
      case 'substandard':
        {
          return 'Распродажа некондиции';
        }
      case 'finished_products':
        {
          return 'Распродажа готовой продукции';
        }
    }
  }
  initPaymentTypes() {
    this.paymentTypes = [{
      id: '1',
      title: 'Наличный расчет'
    }, {
      id: '',
      title: 'Безналичный расчет'
    }];
  }
  getSummaryWeight() {}
  static ɵfac = function OrderEditorComponent_Factory(t) {
    return new (t || OrderEditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_18__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_19__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_19__.PrimeNGConfig), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_services_order_service__WEBPACK_IMPORTED_MODULE_9__.OrderService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_products_services_product_service__WEBPACK_IMPORTED_MODULE_10__.ProductService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_20__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_20__.Router));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({
    type: OrderEditorComponent,
    selectors: [["app-order-editor"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵProvidersFeature"]([primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_18__.DialogService, primeng_api__WEBPACK_IMPORTED_MODULE_19__.MessageService])],
    decls: 5,
    vars: 4,
    consts: [[3, "formGroup", 4, "ngIf"], [1, "mt-2"], ["class", "mr-2", "iconPos", "left", "label", "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0443", "severity", "success", 3, "icon", "disabled", "click", 4, "ngIf"], ["label", "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0438", "severity", "secondary", 1, "mr-2", 3, "icon", "disabled", "click"], [3, "formGroup"], [1, "page-title"], [4, "ngIf"], [1, "grid"], [1, "col-8"], [1, "col-6"], ["emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "optionLabel", "fullname", "placeholder", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435", "formControlName", "counterparty", 3, "options"], ["emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "optionLabel", "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435", "formControlName", "shipping_warehouse", "placeholder", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435", 3, "options", "onChange"], ["emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "optionLabel", "title", "formControlName", "is_cash_payment", "placeholder", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435", 3, "options"], [1, "col-4"], ["formControlName", "shipping_date", 3, "dateFormat"], ["label", "\u041D\u0443\u0436\u043D\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430", 3, "ngModel", "ngModelOptions", "binary", "ngModelChange"], ["class", "grid mt-2", 4, "ngIf"], [1, "page-title", "page-title-h2"], [1, "flex", "justify-content-between", "flex-wrap"], [1, "flex", "align-items-center", "justify-content-center"], ["class", "mr-2", "label", "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C", "iconPos", "left", "severity", "secondary", 3, "icon", "disabled", "click", 4, "ngIf"], ["class", "mr-2", "label", "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C", "iconPos", "left", "severity", "secondary", 3, "disabled", 4, "ngIf"], ["label", "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u0435\u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u0443\u044E \u0434\u043E\u0431\u043E\u0440\u043A\u0443", "iconPos", "left", "severity", "secondary", 1, "mr-2", 3, "disabled", "click"], ["class", "flex align-items-center justify-content-center", 4, "ngIf"], [1, "pi", "pi-refresh", "ml-2", "cursor-pointer", 3, "click"], [3, "warehouseId"], [1, "mt-3", "pt-3"], [1, "p-float-label"], ["id", "float-input", "rows", "5", "cols", "30", "pInputTextarea", "", "formControlName", "comment", 2, "width", "100%"], ["for", "float-input"], ["class", "based-on-report", 4, "ngIf"], [1, "based-on-report"], [1, "grid", "mt-2"], ["emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "optionLabel", "\u0410\u0434\u0440\u0435\u0441\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0438", "formControlName", "delivery_address", "placeholder", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435", 3, "options"], [1, "green-link", 3, "click"], ["label", "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C", "iconPos", "left", "severity", "secondary", 1, "mr-2", 3, "icon", "disabled", "click"], ["label", "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C", "iconPos", "left", "severity", "secondary", 1, "mr-2", 3, "disabled"], ["label", "\u0417\u0430\u044F\u0432\u043A\u0430 \u043D\u0430 \u043D\u0435\u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u0443\u044E \u0434\u043E\u0431\u043E\u0440\u043A\u0443", "iconPos", "left", "severity", "primary", 1, "mr-2", 3, "text", "click"], ["icon", "pi pi-times", "severity", "secondary", "pTooltip", "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043D\u0435\u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u0443\u044E \u0434\u043E\u0431\u043E\u0440\u043A\u0443", "tooltipPosition", "bottom", 3, "text", "click"], ["iconPos", "left", "label", "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0443", "severity", "success", 1, "mr-2", 3, "icon", "disabled", "click"]],
    template: function OrderEditorComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "p-toast");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, OrderEditorComponent_form_1_Template, 68, 32, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](3, OrderEditorComponent_p_button_3_Template, 1, 2, "p-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](4, "p-button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function OrderEditorComponent_Template_p_button_click_4_listener() {
          return ctx.saveToDraft();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.orderForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx.disableSubmitButton);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("icon", ctx.animationSubmitButton2 ? "pi pi-spin pi-spinner" : "pi pi-spin");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("disabled", ctx.isBasedOnCart || ctx.blockSubmitButton2);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_21__.NgIf, primeng_button__WEBPACK_IMPORTED_MODULE_22__.Button, primeng_divider__WEBPACK_IMPORTED_MODULE_23__.Divider, primeng_calendar__WEBPACK_IMPORTED_MODULE_24__.Calendar, _angular_forms__WEBPACK_IMPORTED_MODULE_16__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_16__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgModel, primeng_dropdown__WEBPACK_IMPORTED_MODULE_25__.Dropdown, _managers_components_sokrof_responsible_avatar_and_name_sokrof_responsible_avatar_and_name_component__WEBPACK_IMPORTED_MODULE_11__.SokrofResponsibleAvatarAndNameComponent, primeng_checkbox__WEBPACK_IMPORTED_MODULE_26__.Checkbox, _products_components_product_table_for_order_editor_product_table_for_order_editor_component__WEBPACK_IMPORTED_MODULE_12__.ProductTableForOrderEditorComponent, primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_27__.InputTextarea, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormControlName, primeng_toast__WEBPACK_IMPORTED_MODULE_28__.Toast, primeng_tooltip__WEBPACK_IMPORTED_MODULE_29__.Tooltip, _cart_items_table_cart_items_table_component__WEBPACK_IMPORTED_MODULE_13__.CartItemsTableComponent, _angular_common__WEBPACK_IMPORTED_MODULE_21__.DecimalPipe, _shared_pipes_currency_ru_pipe__WEBPACK_IMPORTED_MODULE_14__.CurrencyRuPipe],
    styles: [".based-on-report[_ngcontent-%COMP%] {\n  color: #456481\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9vcmRlcnMvY29tcG9uZW50cy9vcmRlci1lZGl0b3Ivb3JkZXItZWRpdG9yLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmJhc2VkLW9uLXJlcG9ydCB7XHJcbiAgY29sb3I6ICM0NTY0ODFcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 4543:
/*!******************************************************************************!*\
  !*** ./src/app/modules/orders/components/order-page/order-page.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrderPageComponent: () => (/* binding */ OrderPageComponent)
/* harmony export */ });
/* harmony import */ var _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/error-handle/ErrorTranslator */ 8097);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/api */ 8026);
/* harmony import */ var _managers_dialogs_managermessage_dialog_manager_message_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../managers/dialogs/managermessage-dialog/manager-message-dialog.component */ 4424);
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/dynamicdialog */ 4436);
/* harmony import */ var _managers_ManagerMessageUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../managers/ManagerMessageUtil */ 7734);
/* harmony import */ var _dialogs_non_standard_element_viewer_non_standard_element_viewer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../dialogs/non-standard-element-viewer/non-standard-element-viewer.component */ 2763);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_order_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/order.service */ 3458);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../app.service */ 2266);
/* harmony import */ var _shared_services_file_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/services/file.service */ 38);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/table */ 6192);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var primeng_divider__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/divider */ 920);
/* harmony import */ var primeng_tag__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/tag */ 2455);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/toast */ 8313);
/* harmony import */ var _employees_components_employee_card_employee_card_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../employees/components/employee-card/employee-card.component */ 6971);
/* harmony import */ var _shared_pipes_order_status_pipe_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../shared/pipes/order-status-pipe.pipe */ 7748);





















function OrderPageComponent_span_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, "\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0435\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
}
function OrderPageComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, "\u0411\u0435\u0437\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0435\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
}
function OrderPageComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, "\u0414\u0430\u0442\u0430 \u0433\u043E\u0442\u043E\u0432\u043D\u043E\u0441\u0442\u0438: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r3.orderDetails == null ? null : ctx_r3.orderDetails.shipmentDate);
  }
}
function OrderPageComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r4.orderDetails == null ? null : ctx_r4.orderDetails.unloadDate);
  }
}
function OrderPageComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, "\u041D\u0435\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
}
function OrderPageComponent_div_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 30)(1, "div", 3)(2, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "i", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5, " \u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043B \u0432\u0430\u0448 \u0437\u0430\u043A\u0430\u0437. \u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0437\u0430\u043F\u0443\u0441\u043A \u0432 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "div", 34)(7, "p-button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrderPageComponent_div_35_Template_p_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r15.confirmOrder());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
  }
}
function OrderPageComponent_div_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 30)(1, "div", 3)(2, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "i", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5, " \u0417\u0430\u043A\u0430\u0437 \u0433\u043E\u0442\u043E\u0432 \u043A \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0435. \u0421\u0444\u043E\u0440\u043C\u0438\u0440\u0443\u0439\u0442\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u043D\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0443 \u0438\u043B\u0438 \u0441\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "div", 34)(7, "p-button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrderPageComponent_div_36_Template_p_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r17.createShipment());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
  }
}
function OrderPageComponent_ng_container_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "app-employee-card", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("personName", ctx_r8.orderDetails["\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439\u041E\u0442\u041A\u043B\u0438\u0435\u043D\u0442\u0430"]);
  }
}
function OrderPageComponent_ng_container_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "app-employee-card", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("personName", ctx_r9.orderDetails["\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439Sokrof"]);
  }
}
function OrderPageComponent_ng_container_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "p-button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrderPageComponent_ng_container_53_Template_p_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r20);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r19.cancelOrder());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
  }
}
function OrderPageComponent_div_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 22)(1, "p-button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrderPageComponent_div_54_Template_p_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r21.onShowNonStandardProductViewer());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("text", true);
  }
}
function OrderPageComponent_ng_template_67_th_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, "\u0411\u043E\u043D\u0443\u0441, %");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
}
function OrderPageComponent_ng_template_67_th_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, "\u0421\u043A\u0438\u0434\u043A\u0430, %");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
}
function OrderPageComponent_ng_template_67_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "tr")(1, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "#");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4, "\u041D\u043E\u043C\u0435\u043D\u043A\u043B\u0430\u0442\u0443\u0440\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6, "\u0414\u043B\u0438\u043D\u0430, \u043C");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8, "\u0415\u0434. \u0438\u0437\u043C.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](10, "\u041A\u043E\u043B-\u0432\u043E");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](12, "\u0418\u0442\u043E\u0433\u043E");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](14, "\u041D\u0430\u043B\u0438\u0447\u0438\u0435");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](16, "\u0420\u0435\u0437\u0435\u0440\u0432");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](18, "\u0426\u0435\u043D\u0430, \u20BD");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](19, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](20, "\u0421\u0443\u043C\u043C\u0430, \u20BD");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](21, OrderPageComponent_ng_template_67_th_21_Template, 2, 0, "th", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](22, OrderPageComponent_ng_template_67_th_22_Template, 2, 0, "th", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r12.showBonus());
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r12.showSales());
  }
}
function OrderPageComponent_ng_template_68_td_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const inventoryItem_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](2, 1, inventoryItem_r25.bonusPercentage, "1.1-2"));
  }
}
function OrderPageComponent_ng_template_68_td_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const inventoryItem_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](2, 1, inventoryItem_r25.discountMarkupPercentage, "1.1-2"));
  }
}
function OrderPageComponent_ng_template_68_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](11, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](12, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](14, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](19, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](21, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](22, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](24, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](25, OrderPageComponent_ng_template_68_td_25_Template, 3, 4, "td", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](26, OrderPageComponent_ng_template_68_td_26_Template, 3, 4, "td", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const inventoryItem_r25 = ctx.$implicit;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](inventoryItem_r25.lineNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](inventoryItem_r25.nomenclatureName);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](inventoryItem_r25.characteristic);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](inventoryItem_r25.unitOfMeasurementName);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](11, 12, inventoryItem_r25.quantity, "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](14, 15, inventoryItem_r25.total, "1.3-3"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](inventoryItem_r25.availability);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](inventoryItem_r25.reserve);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](21, 18, inventoryItem_r25.price, "1.2-2"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](24, 21, inventoryItem_r25.amount, "1.2-2"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r13.showBonus());
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r13.showSales());
  }
}
function OrderPageComponent_div_69_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "div", 40);
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("innerHTML", ctx_r14.orderDetails == null ? null : ctx_r14.orderDetails.comment, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsanitizeHtml"]);
  }
}
const _c0 = function () {
  return ["/orders"];
};
const _c1 = function () {
  return {
    "min-width": "50rem"
  };
};
class OrderPageComponent {
  orderService;
  dialogService;
  route;
  router;
  messageService;
  appService;
  fileService;
  orderDetails = undefined;
  ref;
  downloadLoader = false;
  constructor(orderService, dialogService, route, router, messageService, appService, fileService) {
    this.orderService = orderService;
    this.dialogService = dialogService;
    this.route = route;
    this.router = router;
    this.messageService = messageService;
    this.appService = appService;
    this.fileService = fileService;
    this.route.queryParams.subscribe(params => {
      this.orderService.getOrderDetails(params.id).subscribe({
        next: orderDetails => {
          this.orderDetails = orderDetails;
        },
        error: error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_0__.ErrorTranslator.translate(_core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_0__.ErrorTranslator.prepare(error)),
            life: 10000
          });
        }
      });
    });
  }
  ngOnInit() {
    this.appService.fakeSocketData$.subscribe(data => {
      if (data) {
        let optionalOrder = data.update_orders.data.find(order => order.order_id === this.orderDetails.id);
        if (optionalOrder) {
          this.orderDetails.statusID = optionalOrder.status;
        }
      }
    });
  }
  ngOnDestroy() {}
  downloadOrderDetails() {
    this.downloadLoader = true;
    this.orderService.downloadOrderDetails(this.orderDetails.id).subscribe({
      next: response => {
        this.downloadLoader = false;
        const url = response.response.link;
        const fileName = url.replace(/.*?\/([^\/]+\.(pdf|xlsx?))/, '$1');
        this.fileService.downloadFile(url, fileName);
      },
      error: error => {
        this.downloadLoader = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_0__.ErrorTranslator.translate(_core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_0__.ErrorTranslator.prepare(error)),
          life: 10000
        });
      }
    });
  }
  sendMessageToManager() {
    {
      this.ref = this.dialogService.open(_managers_dialogs_managermessage_dialog_manager_message_dialog_component__WEBPACK_IMPORTED_MODULE_1__.ManagerMessageDialogComponent, {
        header: 'Ваш менеджер',
        width: '450px',
        contentStyle: {
          overflow: 'auto'
        },
        baseZIndex: 10000
      });
      this.ref.onClose.subscribe(response => {
        if (response) {
          _managers_ManagerMessageUtil__WEBPACK_IMPORTED_MODULE_2__.ManagerMessageUtil.showSuccessMessage(this.dialogService);
        }
      });
    }
  }
  confirmOrder() {
    this.orderService.confirm(this.orderDetails.id).subscribe(response => {
      if (response.response) {
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Заказ подтвержден'
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_0__.ErrorTranslator.translate(_core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_0__.ErrorTranslator.prepare(response)),
          life: 10000
        });
      }
    });
  }
  cancelOrder() {
    this.orderService.cancel(this.orderDetails.id).subscribe({
      next: response => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Заказ отменен'
        });
        this.orderDetails.statusID = 'Отменен';
      },
      error: error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: error.error.error
        });
      }
    });
  }
  editOrder() {
    this.router.navigate(['/orders/edit'], {
      queryParams: {
        id: this.orderDetails.id
      }
    });
  }
  copyOrder() {
    this.router.navigate(['/orders/edit'], {
      queryParams: {
        id: this.orderDetails.id
      }
    });
  }
  createShipment() {
    this.router.navigate(['shipments/edit'], {
      queryParams: {
        orderId: this.orderDetails.id
      }
    });
  }
  onShowNonStandardProductViewer() {
    this.dialogService.open(_dialogs_non_standard_element_viewer_non_standard_element_viewer_component__WEBPACK_IMPORTED_MODULE_3__.NonStandardElementViewerComponent, {
      header: "Нестандартные доборные элементы",
      width: '80%',
      style: {
        overflowY: 'none'
      },
      data: {
        nonStandardElements: this.orderDetails.nonStandardElements,
        nonStandardElementFiles: this.orderDetails.nonStandardElementFiles
      },
      baseZIndex: 10000
    });
  }
  showBonus() {
    if (this.orderDetails?.cashPayment) {
      let bonus = 0;
      this.orderDetails?.inventory.forEach(item => {
        bonus += item.bonusPercentage;
      });
      return bonus > 0;
    }
    return false;
  }
  showSales() {
    let discountMarkupPercentage = 0;
    this.orderDetails?.inventory.forEach(item => {
      discountMarkupPercentage += item.discountMarkupPercentage;
    });
    return discountMarkupPercentage > 0;
  }
  undefined = undefined;
  static ɵfac = function OrderPageComponent_Factory(t) {
    return new (t || OrderPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_order_service__WEBPACK_IMPORTED_MODULE_4__.OrderService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_10__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_12__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_app_service__WEBPACK_IMPORTED_MODULE_5__.AppService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_file_service__WEBPACK_IMPORTED_MODULE_6__.FileService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
    type: OrderPageComponent,
    selectors: [["app-order-page"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵProvidersFeature"]([primeng_api__WEBPACK_IMPORTED_MODULE_12__.MessageService, primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_10__.DialogService])],
    decls: 70,
    vars: 35,
    consts: [[1, "page-title"], [1, "mb-3"], [1, "green-link", 3, "routerLink"], [1, "grid"], [1, "col-8"], [1, "order-detail-container"], [1, "mr-3"], ["severity", "success", 3, "value", "rounded"], ["label", "\u041F\u0435\u0447\u0430\u0442\u044C", "size", "small", "icon", "pi pi-print", "severity", "secondary", 1, "print-button", 3, "loading", "click"], [3, "innerHTML"], [4, "ngIf", "ngIfElse"], ["withoutCash", ""], [1, "col-4"], ["class", "col-4", 4, "ngIf"], ["class", "order-detail-container mt-2 p-4", 4, "ngIf"], [1, "col-4", "pl-3"], [1, "manager-card"], [1, "manager-card-header"], [4, "ngIf"], [1, "green-link", 3, "click"], [1, "page-title", "page-title-h2"], [1, "flex", "justify-content-between", "flex-wrap"], [1, "flex", "align-items-center", "justify-content-center"], ["label", "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C", "size", "small", "severity", "success", 1, "mr-2", 3, "click"], ["class", "flex align-items-center justify-content-center", 4, "ngIf"], [1, "mt-3"], ["scrollHeight", "400px", 3, "value", "scrollable", "tableStyle"], ["pTemplate", "header"], ["pTemplate", "body"], ["class", "order-detail-container mt-2", 3, "innerHTML", 4, "ngIf"], [1, "order-detail-container", "mt-2", "p-4"], [1, "col-1"], [1, "pi", "pi-info-circle", 2, "font-size", "2.5rem"], [1, "col-9"], [1, "col-2"], ["label", "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C", "size", "small", "severity", "secondary", 3, "click"], ["label", "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0443", "size", "small", "severity", "secondary", 3, "click"], [3, "personName"], ["label", "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C", "size", "small", "severity", "danger", 1, "mr-2", 3, "click"], ["label", "\u0417\u0430\u044F\u0432\u043A\u0430 \u043D\u0430 \u043D\u0435\u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u0443\u044E \u0434\u043E\u0431\u043E\u0440\u043A\u0443", "iconPos", "left", "severity", "primary", 1, "mr-2", 3, "text", "click"], [1, "order-detail-container", "mt-2", 3, "innerHTML"]],
    template: function OrderPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "p-toast");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "\u0414\u0435\u0442\u0430\u043B\u0438 \u0437\u0430\u043A\u0430\u0437\u0430");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "div", 1)(4, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5, "\u2190 \u041A \u0441\u043F\u0438\u0441\u043A\u0443 \u0437\u0430\u043A\u0430\u0437\u043E\u0432");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "div", 3)(7, "div", 4)(8, "div", 5)(9, "div")(10, "b", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](12, "p-tag", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](13, "orderStatus");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "p-button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrderPageComponent_Template_p_button_click_14_listener() {
          return ctx.downloadOrderDetails();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](15, "p", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](16, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](17, OrderPageComponent_span_17_Template, 2, 0, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](18, OrderPageComponent_ng_template_18_Template, 2, 0, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](20, "div", 3)(21, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](22, "\u0421\u0442\u0430\u0442\u0443\u0441 \u043E\u043F\u043B\u0430\u0442\u044B: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](23, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](25, OrderPageComponent_div_25_Template, 4, 1, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](26, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](27, "\u0421\u043A\u043B\u0430\u0434: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](28, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](30, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](31, OrderPageComponent_div_31_Template, 4, 1, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](32, OrderPageComponent_div_32_Template, 4, 0, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](33, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](34);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](35, OrderPageComponent_div_35_Template, 8, 0, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](36, OrderPageComponent_div_36_Template, 8, 0, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](37, "div", 15)(38, "div", 16)(39, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](40, " \u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043E\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u0430 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](41, OrderPageComponent_ng_container_41_Template, 2, 1, "ng-container", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](42, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](43, " \u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 Sokrof ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](44, OrderPageComponent_ng_container_44_Template, 2, 1, "ng-container", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](45, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrderPageComponent_Template_div_click_45_listener() {
          return ctx.sendMessageToManager();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](46, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0443");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](47, "p-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](48, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](49, "\u0422\u043E\u0432\u0430\u0440\u044B \u0432 \u0437\u0430\u043A\u0430\u0437\u0435");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](50, "div", 21)(51, "div", 22)(52, "p-button", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function OrderPageComponent_Template_p_button_click_52_listener() {
          return ctx.copyOrder();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](53, OrderPageComponent_ng_container_53_Template, 2, 0, "ng-container", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](54, OrderPageComponent_div_54_Template, 2, 1, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](55, "div", 25)(56, "div", 21)(57, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](58);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](59, "number");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](60, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](61, " \u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u0430: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](62, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](63);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](64, "currency");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](65, "div", 25)(66, "p-table", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](67, OrderPageComponent_ng_template_67_Template, 23, 2, "ng-template", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](68, OrderPageComponent_ng_template_68_Template, 27, 24, "ng-template", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](69, OrderPageComponent_div_69_Template, 1, 1, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction0"](33, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("\u2116 ", ctx.orderDetails == null ? null : ctx.orderDetails.number, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("value", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](13, 26, ctx.orderDetails == null ? null : ctx.orderDetails.statusID));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("rounded", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("loading", ctx.downloadLoader);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("innerHTML", ctx.orderDetails == null ? null : ctx.orderDetails.counterpartyName, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsanitizeHtml"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.orderDetails == null ? null : ctx.orderDetails.cashPayment)("ngIfElse", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx.orderDetails == null ? null : ctx.orderDetails.paymentStatus);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", (ctx.orderDetails == null ? null : ctx.orderDetails.shipmentDate) !== "");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx.orderDetails == null ? null : ctx.orderDetails.shipmentWarehouseName);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", (ctx.orderDetails == null ? null : ctx.orderDetails.delivery) !== false);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", (ctx.orderDetails == null ? null : ctx.orderDetails.delivery) == false);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx.orderDetails == null ? null : ctx.orderDetails.deliveryAddress);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", (ctx.orderDetails == null ? null : ctx.orderDetails.statusID) === "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", (ctx.orderDetails == null ? null : ctx.orderDetails.statusID) === "\u0413\u043E\u0442\u043E\u0432\u041A\u041E\u0442\u0433\u0440\u0443\u0437\u043A\u0435");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.orderDetails);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.orderDetails);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !((ctx.orderDetails == null ? null : ctx.orderDetails.statusID) === "\u041E\u0442\u043C\u0435\u043D\u0435\u043D" || (ctx.orderDetails == null ? null : ctx.orderDetails.statusID) === "canceled") && (ctx.orderDetails == null ? null : ctx.orderDetails.statusID) === "\u041D\u0430\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", (ctx.orderDetails == null ? null : ctx.orderDetails.nonStandardElements == null ? null : ctx.orderDetails.nonStandardElements.length) > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" \u041E\u0440\u0438\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u043E\u0447\u043D\u044B\u0439 \u0432\u0435\u0441 \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u0438: ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](59, 28, ctx.orderDetails == null ? null : ctx.orderDetails.weight), " \u043A\u0433 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](64, 30, ctx.orderDetails == null ? null : ctx.orderDetails.documentAmount, "RUB"));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx.orderDetails == null ? null : ctx.orderDetails.inventory)("scrollable", true)("tableStyle", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction0"](34, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.orderDetails == null ? null : ctx.orderDetails.comment);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, primeng_table__WEBPACK_IMPORTED_MODULE_14__.Table, primeng_api__WEBPACK_IMPORTED_MODULE_12__.PrimeTemplate, primeng_button__WEBPACK_IMPORTED_MODULE_15__.Button, primeng_divider__WEBPACK_IMPORTED_MODULE_16__.Divider, _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterLink, primeng_tag__WEBPACK_IMPORTED_MODULE_17__.Tag, primeng_toast__WEBPACK_IMPORTED_MODULE_18__.Toast, _employees_components_employee_card_employee_card_component__WEBPACK_IMPORTED_MODULE_7__.EmployeeCardComponent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_13__.CurrencyPipe, _shared_pipes_order_status_pipe_pipe__WEBPACK_IMPORTED_MODULE_8__.OrderStatusPipe],
    styles: [".order-detail-container[_ngcontent-%COMP%] {\n  font-family: Montserrat, sans-serif;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: normal;\n  line-height: normal;\n  text-transform: none;\n  background-color: rgba(242, 242, 242, 1);\n  border-radius: 7px;\n  position: relative;\n  padding: 15px;\n}\n\n.print-button[_ngcontent-%COMP%] {\n  position: absolute;\n  top:15px;\n  right: 15px;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9vcmRlcnMvY29tcG9uZW50cy9vcmRlci1wYWdlL29yZGVyLXBhZ2UuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1DQUFtQztFQUNuQyxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsb0JBQW9CO0VBQ3BCLHdDQUF3QztFQUN4QyxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsV0FBVztBQUNiIiwic291cmNlc0NvbnRlbnQiOlsiLm9yZGVyLWRldGFpbC1jb250YWluZXIge1xyXG4gIGZvbnQtZmFtaWx5OiBNb250c2VycmF0LCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0MiwgMjQyLCAyNDIsIDEpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDdweDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgcGFkZGluZzogMTVweDtcclxufVxyXG5cclxuLnByaW50LWJ1dHRvbiB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDoxNXB4O1xyXG4gIHJpZ2h0OiAxNXB4O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 9501:
/*!********************************************************************************!*\
  !*** ./src/app/modules/orders/components/orders-list/orders-list.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrdersListComponent: () => (/* binding */ OrdersListComponent)
/* harmony export */ });
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/dynamicdialog */ 4436);
/* harmony import */ var _dialogs_order_list_filters_order_list_filters_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dialogs/order-list-filters/order-list-filters.component */ 6335);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/api */ 8026);
/* harmony import */ var _core_locale_CalendareRuLocale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/locale/CalendareRuLocale */ 2104);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 655);
/* harmony import */ var _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/error-handle/ErrorTranslator */ 8097);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_order_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/order.service */ 3458);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../app.service */ 2266);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/table */ 6192);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var primeng_divider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/divider */ 920);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/calendar */ 7411);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/dropdown */ 4553);
/* harmony import */ var primeng_badge__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/badge */ 7650);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/paginator */ 5302);
/* harmony import */ var primeng_multiselect__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! primeng/multiselect */ 7524);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/toast */ 8313);
/* harmony import */ var _shared_pipes_order_status_pipe_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/pipes/order-status-pipe.pipe */ 7748);
























const _c0 = ["paginator"];
function OrdersListComponent_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "p-badge", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx_r0.popularStatuses == null ? null : ctx_r0.popularStatuses.ready_for_shipment == null ? null : ctx_r0.popularStatuses.ready_for_shipment.toString());
  }
}
function OrdersListComponent_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "p-badge", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx_r1.popularStatuses == null ? null : ctx_r1.popularStatuses.with_shipments == null ? null : ctx_r1.popularStatuses.with_shipments.toString());
  }
}
function OrdersListComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "p-badge", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx_r2.popularStatuses == null ? null : ctx_r2.popularStatuses.needs_confirmation == null ? null : ctx_r2.popularStatuses.needs_confirmation.toString());
  }
}
function OrdersListComponent_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "p-badge", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx_r3.popularStatuses == null ? null : ctx_r3.popularStatuses.draft == null ? null : ctx_r3.popularStatuses.draft.toString());
  }
}
function OrdersListComponent_ng_template_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 26)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const group_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](group_r8.label);
  }
}
function OrdersListComponent_ng_template_53_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr", 31)(1, "td", 32)(2, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "\u0417\u0430\u043A\u0430\u0437\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0444\u0438\u043B\u044C\u0442\u0440\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
}
function OrdersListComponent_ng_template_53_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr", 31)(1, "td", 32)(2, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "\u00A0\u00A0\u00A0loading ...");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
}
function OrdersListComponent_ng_template_53_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "th", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "\u0414\u0430\u0442\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "\u041D\u043E\u043C\u0435\u0440");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "\u0421\u0442\u0430\u0442\u0443\u0441");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "\u0421\u0443\u043C\u043C\u0430, \u20BD");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13, "\u041E\u043F\u043B\u0430\u0442\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15, "\u041E\u0442\u0433\u0440\u0443\u0437\u043A\u0430 (\u043F\u043B\u0430\u043D)");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](17, "\u0421\u043A\u043B\u0430\u0434 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19, "Sokrof");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](21, "\u041A\u043B\u0438\u0435\u043D\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](22, OrdersListComponent_ng_template_53_tr_22_Template, 4, 0, "tr", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](23, OrdersListComponent_ng_template_53_tr_23_Template, 5, 0, "tr", 30);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r5.globalThis.stateLoadOrders == "loaded" && ctx_r5.orders.length == 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r5.globalThis.stateLoadOrders != "loaded");
  }
}
const _c1 = function () {
  return ["/shipments/edit"];
};
function OrdersListComponent_ng_template_54_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "p-button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](1, _c1));
  }
}
function OrdersListComponent_ng_template_54_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "td", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrdersListComponent_ng_template_54_ng_template_8_Template_td_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r17);
      const order_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r15.goToOrderDetails(order_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "orderStatus");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const order_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, order_r11.status), " ");
  }
}
function OrdersListComponent_ng_template_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "p-tableRadioButton", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "td", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrdersListComponent_ng_template_54_Template_td_click_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20);
      const order_r11 = restoredCtx.$implicit;
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r19.goToOrderDetails(order_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "td", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrdersListComponent_ng_template_54_Template_td_click_5_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20);
      const order_r11 = restoredCtx.$implicit;
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r21.goToOrderDetails(order_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, OrdersListComponent_ng_template_54_ng_container_7_Template, 3, 2, "ng-container", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, OrdersListComponent_ng_template_54_ng_template_8_Template, 3, 3, "ng-template", null, 39, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "td", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrdersListComponent_ng_template_54_Template_td_click_10_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20);
      const order_r11 = restoredCtx.$implicit;
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r22.goToOrderDetails(order_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "td", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrdersListComponent_ng_template_54_Template_td_click_12_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20);
      const order_r11 = restoredCtx.$implicit;
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r23.goToOrderDetails(order_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](14, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "td", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrdersListComponent_ng_template_54_Template_td_click_15_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20);
      const order_r11 = restoredCtx.$implicit;
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r24.goToOrderDetails(order_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "td", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrdersListComponent_ng_template_54_Template_td_click_17_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20);
      const order_r11 = restoredCtx.$implicit;
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r25.goToOrderDetails(order_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "td", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrdersListComponent_ng_template_54_Template_td_click_19_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20);
      const order_r11 = restoredCtx.$implicit;
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r26.goToOrderDetails(order_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "td", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrdersListComponent_ng_template_54_Template_td_click_21_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20);
      const order_r11 = restoredCtx.$implicit;
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r27.goToOrderDetails(order_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "td", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrdersListComponent_ng_template_54_Template_td_click_23_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20);
      const order_r11 = restoredCtx.$implicit;
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r28.goToOrderDetails(order_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const order_r11 = ctx.$implicit;
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](9);
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", order_r11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](order_r11.date);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](order_r11.order_number);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", order_r11.status === "ready_for_shipment")("ngIfElse", _r13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", ctx_r6.getCounterpartyName(order_r11.counterparty_name), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](14, 12, order_r11.sum, "1.2-2"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", order_r11.is_cash_payment === "1" ? "\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0435\u0442" : "\u0411\u0435\u0437\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0435\u0442", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](order_r11.shipping_date);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](order_r11.shipping_warehouse_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](order_r11.responsible_sokrof);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](order_r11.client_fio);
  }
}
function OrdersListComponent_ng_container_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "p-paginator", 41, 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onPageChange", function OrdersListComponent_ng_container_59_Template_p_paginator_onPageChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r31);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r30.onPageChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rows", 12)("totalRecords", ctx_r7.maxPage * 12);
  }
}
const _c2 = function () {
  return ["/orders/edit"];
};
const _c3 = function () {
  return ["/drafts"];
};
const _c4 = function () {
  return {
    "width": "100%"
  };
};
const _c5 = function () {
  return {
    standalone: true
  };
};
const _c6 = function () {
  return {
    "min-width": "50rem"
  };
};
class OrdersListComponent {
  orderService;
  dialogService;
  router;
  primengConfig;
  appService;
  messageService;
  paginator;
  orders = [];
  selectedOrder;
  statuses = [];
  sortOrders = [];
  data;
  popularStatuses;
  employees;
  ref;
  pageArray = [];
  maxPage = 0;
  groupedStatuses;
  selectedStatuses = [];
  selectedOrdersActionList = [];
  selectedOrdersAction;
  globalThis = globalThis;
  constructor(orderService, dialogService, router, primengConfig, appService, messageService) {
    this.orderService = orderService;
    this.dialogService = dialogService;
    this.router = router;
    this.primengConfig = primengConfig;
    this.appService = appService;
    this.messageService = messageService;
    this.orderService.getOrderStatuses().subscribe(data => {
      this.statuses = data;
    });
    this.primengConfig.setTranslation(_core_locale_CalendareRuLocale__WEBPACK_IMPORTED_MODULE_1__.CALENDAR_RU_LOCALE);
  }
  ngOnInit() {
    this.orderService.orderListPageNumber = 1;
    this.initStatuses();
    this.initSortOrders();
    this.initSelectedOrdersActionList();
    this.orderService.resetFilters();
    var order_list_filters = JSON.parse(localStorage.getItem('order_list_filters'));
    if (typeof order_list_filters == 'object' && order_list_filters !== null) {
      if (typeof order_list_filters.statuses == 'object') {
        this.selectedStatuses = order_list_filters.statuses;
      }
    }
    this.orderService.filterForm.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.debounceTime)(300)).subscribe(values => {
      const e = new Event('click');
      this.paginator?.changePageToFirst(e);
      this.getOrdersByFilter();
    });
    this.getOrders();
    this.appService.fakeSocketData$.subscribe(data => {
      data?.update_orders?.data?.forEach(item => {
        let orderItem = this.orders.find(order => order.order_id === item.order_id);
        if (orderItem) {
          orderItem.status = item.status;
        }
      });
      if (data) {
        this.popularStatuses = data.popular_statuses.data;
      }
    });
  }
  calendarChanged(event) {}
  initSortOrders() {
    this.sortOrders = [{
      label: 'Дата заказа: сначала новые',
      value: 'order_date_new_first'
    }, {
      label: 'Дата заказа: сначала старые',
      value: 'order_date_old_first'
    }, {
      label: 'Дата отгрузки: сначала новые',
      value: 'shipping_date_is_earlier'
    }, {
      label: 'Дата отгрузки: сначала старые',
      value: 'shipping_date_later'
    }];
  }
  initStatuses() {
    this.groupedStatuses = [{
      label: '',
      items: [{
        label: 'На обработке',
        value: 'in_processing'
      }, {
        label: 'Требует подтверждения',
        value: 'needs_confirmation'
      }, {
        label: 'В работе',
        value: 'in_work'
      }, {
        label: 'Готов к отгрузке',
        value: 'ready_for_shipment'
      }, {
        label: 'В отгрузке',
        value: 'in_shipment'
      }, {
        label: 'Отгружен',
        value: 'shipped'
      }, {
        label: 'Отменен',
        value: 'canceled'
      }]
    }, {
      label: '_________________________',
      items: [{
        label: 'Кроме завершенных',
        value: 'except_completed'
      }]
    }];
  }
  getOrders() {
    globalThis.stateLoadOrders = '';
    this.orderService.getOrders(false).subscribe({
      next: data => {
        globalThis.stateLoadOrders = 'loaded';
        this.data = data;
        this.data.response.counterparties.data = this.data.response.counterparties.data.filter(c => c.is_confirmed === '1').map(counterparty => {
          counterparty.fullname = counterparty.fullname.replace(/&quot;/g, '"');
          counterparty.counterparty_id = counterparty.counterparty_id || counterparty.application_id;
          return counterparty;
        });
        let pages = data.response.orders.pagination;
        this.pageArray = pages?.length > 0 ? pages : [1];
        this.popularStatuses = this.data.response.popular_statuses.data;
        this.employees = this.data.response.employees.data;
      },
      error: error => {
        globalThis.stateLoadOrders = 'error';
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_2__.ErrorTranslator.translate(_core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_2__.ErrorTranslator.prepare(error)),
          life: 30000
        });
      }
    });
  }
  showFiltersDialog() {
    if (!this.data?.response) {
      return;
    }
    this.ref = this.dialogService.open(_dialogs_order_list_filters_order_list_filters_component__WEBPACK_IMPORTED_MODULE_0__.OrderListFiltersComponent, {
      header: "Дополнительные параметры фильтрации",
      width: '800px',
      height: '60%',
      style: {
        overflowY: 'none'
      },
      data: {
        counterparties: this.data.response.counterparties.data,
        paymentTypes: [{
          value: 'cash_on_delivery',
          label: 'Наличный расчет'
        }, {
          value: 'prepayment',
          label: 'Безналичный расчет'
        }],
        shipmentWarehouses: this.data.response.shipment_warehouses.data,
        responders: [{
          value: this.appService.sessionConfig?.manager_id,
          label: this.appService.sessionConfig?.manager_fio
        }]
      },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe(data => {
      this.getOrdersByFilter();
    });
  }
  onPageChange($event) {
    this.orderService.orderListPageNumber = $event.page + 1;
    this.getOrdersByFilter();
  }
  goToOrderDetails(order) {
    this.orderService.orderListPageNumber = 1;
    this.router.navigate(['/orders/details'], {
      queryParams: {
        id: order.order_id
      }
    }).then();
  }
  onStatusSelect(event) {
    const selectedValue = event;
    if (selectedValue?.length > 1) {
      if (selectedValue[0] === 'except_completed') {
        const filteredStatuses = selectedValue.filter(value => value !== 'except_completed');
        this.orderService.filterForm.patchValue({
          statuses: filteredStatuses
        });
        this.selectedStatuses = filteredStatuses;
        return;
      }
      if (selectedValue.includes('except_completed')) {
        const filteredStatuses = selectedValue.filter(value => value === 'except_completed');
        this.orderService.filterForm.patchValue({
          statuses: filteredStatuses
        });
        this.selectedStatuses = filteredStatuses;
        return;
      }
    }
    this.orderService.filterForm.patchValue({
      statuses: selectedValue
    });
  }
  getOrdersByFilter() {
    globalThis.stateLoadOrders = '';
    if (!!this.orderService.filterForm.value.orderDateRange?.[1]) {
      this.orderService.getAllOrdersByFilter(false).subscribe({
        next: response => {
          globalThis.stateLoadOrders = 'loaded';
          response = globalThis.decryptResponse(response);
          this.orders = response.response.data;
          this.maxPage = response.response.pagination_max_page;
        },
        error: error => {
          globalThis.stateLoadOrders = 'error';
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_2__.ErrorTranslator.translate(_core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_2__.ErrorTranslator.prepare(error)),
            life: 30000
          });
        }
      });
    }
  }
  getCounterpartyName(name) {
    return name?.replace(/&quot;/g, '"') || '';
  }
  getByStatus(status) {
    this.orderService.filterForm.patchValue({
      statuses: [status]
    });
  }
  resetFilters() {
    this.selectedStatuses = [];
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    this.orderService.filterForm.patchValue({
      orderDateRange: [oneMonthAgo, currentDate],
      statuses: [],
      responsible: null,
      counterparty: null,
      paymentType: null,
      shipmentWarehouse: null,
      sokrofResponsible: null,
      pageNumber: 1,
      sort: {
        label: 'Дата заказа: сначала новые',
        value: 'order_date_new_first'
      }
    });
  }
  initSelectedOrdersActionList() {
    this.selectedOrdersActionList.push({
      label: 'Копировать',
      value: 'copy'
    });
    this.selectedOrdersActionList.push({
      label: 'Удалить',
      value: 'delete'
    });
  }
  executeAction() {
    if (this.selectedOrdersAction?.value === 'copy') {
      this.copyOrder();
    }
  }
  copyOrder() {
    this.router.navigate(['/orders/edit'], {
      queryParams: {
        id: this.selectedOrder.order_id
      }
    });
  }
  static ɵfac = function OrdersListComponent_Factory(t) {
    return new (t || OrdersListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_order_service__WEBPACK_IMPORTED_MODULE_3__.OrderService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_8__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_10__.PrimeNGConfig), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_app_service__WEBPACK_IMPORTED_MODULE_4__.AppService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_10__.MessageService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: OrdersListComponent,
    selectors: [["app-orders-list"]],
    viewQuery: function OrdersListComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵProvidersFeature"]([primeng_api__WEBPACK_IMPORTED_MODULE_10__.MessageService, primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_8__.DialogService])],
    decls: 60,
    vars: 36,
    consts: [[1, "page-title"], ["label", "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C", "icon", "pi pi-plus", "iconPos", "left", "severity", "secondary", 1, "mr-2", 3, "routerLink"], [1, "gray-text", "mr-2", 3, "click"], [4, "ngIf"], [1, "gray-text", "mr-2", 3, "routerLink"], [1, "grid"], [1, "col-2"], [1, "grid", 3, "formGroup"], ["formControlName", "orderDateRange", "selectionMode", "range", "onChange", "calendarChanged($event)", 3, "dateFormat"], [1, "col-3"], ["placeholder", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435", "scrollHeight", "550px", 3, "options", "group", "showHeader", "ngModel", "ngModelOptions", "showClear", "ngModelChange"], ["pTemplate", "group"], ["formControlName", "responsible", "emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "optionLabel", "fio2", "placeholder", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435", 3, "options", "showClear"], [2, "color", "white"], ["label", "\u0415\u0449\u0435", "icon", "pi pi-sliders-v", "iconPos", "right", "severity", "secondary", 1, "mr-2", 3, "click"], ["formControlName", "sort", "emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "optionLabel", "label", "placeholder", "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0443", 3, "options"], [1, "col"], [1, "green-link", 3, "click"], ["selectionMode", "single", "dataKey", "order_number", 3, "value", "selection", "styleClass", "tableStyle", "selectionChange"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "mt-2"], ["label", "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C", "icon", "pi pi-copy", "iconPos", "left", "severity", "secondary", 1, "mr-2", "ml-2", 3, "disabled", "click"], [1, "flex", "justify-content-center", "flex-wrap"], [1, "flex", "align-items-center", "justify-content-center"], ["severity", "info", 3, "value"], [1, "flex", "align-items-center"], [2, "width", "4rem"], [2, "min-width", "100px"], [2, "min-width", "200px"], ["style", "background-color: #fff;", 4, "ngIf"], [2, "background-color", "#fff"], ["colspan", "10"], [1, "nothing_found_text_orders"], [1, "loading_orders"], ["data-pc-section", "icon", 1, "pi", "pi-spin", "pi-spinner", "p-button-icon", "p-button-icon-left", "ng-star-inserted"], [3, "value"], [1, "cursor-pointer", 3, "click"], [4, "ngIf", "ngIfElse"], ["showStatusLabel", ""], ["label", "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0443", "severity", "primary", "size", "small", 1, "mr-2", 3, "routerLink"], [3, "rows", "totalRecords", "onPageChange"], ["paginator", ""]],
    template: function OrdersListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "p-toast");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "p", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "\u0417\u0430\u043A\u0430\u0437\u044B");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "p-button", 1)(4, "p-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrdersListComponent_Template_span_click_7_listener() {
          return ctx.getByStatus("ready_for_shipment");
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, " \u0413\u043E\u0442\u043E\u0432\u044B \u043A \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0435 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, OrdersListComponent_ng_container_9_Template, 2, 1, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrdersListComponent_Template_span_click_10_listener() {
          return ctx.getByStatus("in_shipment");
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, " \u0421 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0430\u043C\u0438 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](12, OrdersListComponent_ng_container_12_Template, 2, 1, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrdersListComponent_Template_span_click_13_listener() {
          return ctx.getByStatus("needs_confirmation");
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, " \u0422\u0440\u0435\u0431\u0443\u044E\u0442 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, OrdersListComponent_ng_container_15_Template, 2, 1, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](17, " \u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0438 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, OrdersListComponent_ng_container_18_Template, 2, 1, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](19, "p-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](21, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "div", 7)(23, "div", 6)(24, "div")(25, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](26, "\u0414\u0410\u0422\u0410 \u0417\u0410\u041A\u0410\u0417\u0410");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](27, "p-calendar", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "div", 9)(29, "div")(30, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](31, "\u0421\u0422\u0410\u0422\u0423\u0421");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](32, "p-multiSelect", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function OrdersListComponent_Template_p_multiSelect_ngModelChange_32_listener($event) {
          return ctx.selectedStatuses = $event;
        })("ngModelChange", function OrdersListComponent_Template_p_multiSelect_ngModelChange_32_listener($event) {
          return ctx.onStatusSelect($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](33, OrdersListComponent_ng_template_33_Template, 3, 1, "ng-template", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](34, "div", 6)(35, "div")(36, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](37, "\u041E\u0422\u0412\u0415\u0422\u0421\u0422\u0412\u0415\u041D\u041D\u042B\u0419");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](38, "p-dropdown", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](39, "div", 6)(40, "div")(41, "small", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](42, "-");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](43, "p-button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrdersListComponent_Template_p_button_click_43_listener() {
          return ctx.showFiltersDialog();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](44, "div", 9)(45, "div")(46, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](47, "\u0421\u041E\u0420\u0422\u0418\u0420\u041E\u0412\u0410\u0422\u042C");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](48, "p-dropdown", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](49, "div", 16)(50, "span", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrdersListComponent_Template_span_click_50_listener() {
          return ctx.resetFilters();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](51, "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](52, "p-table", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("selectionChange", function OrdersListComponent_Template_p_table_selectionChange_52_listener($event) {
          return ctx.selectedOrder = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](53, OrdersListComponent_ng_template_53_Template, 24, 2, "ng-template", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](54, OrdersListComponent_ng_template_54_Template, 25, 15, "ng-template", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](55, "div", 21)(56, "p-button", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OrdersListComponent_Template_p_button_click_56_listener() {
          return ctx.copyOrder();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](57, "div", 23)(58, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](59, OrdersListComponent_ng_container_59_Template, 3, 2, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](29, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx.popularStatuses == null ? null : ctx.popularStatuses.ready_for_shipment) > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx.popularStatuses == null ? null : ctx.popularStatuses.with_shipments) > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx.popularStatuses == null ? null : ctx.popularStatuses.needs_confirmation) > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](30, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx.popularStatuses == null ? null : ctx.popularStatuses.draft) > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx.orderService.filterForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dateFormat", "dd.mm.yy");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](31, _c4));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx.groupedStatuses)("group", true)("showHeader", false)("ngModel", ctx.selectedStatuses)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](32, _c5))("showClear", (ctx.selectedStatuses == null ? null : ctx.selectedStatuses.length) > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](33, _c4));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx.employees)("showClear", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](34, _c4));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx.sortOrders);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx.orders)("selection", ctx.selectedOrder)("styleClass", "p-datatable-sm")("tableStyle", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](35, _c6));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", !ctx.selectedOrder);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.maxPage > 1);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, primeng_table__WEBPACK_IMPORTED_MODULE_12__.Table, primeng_api__WEBPACK_IMPORTED_MODULE_10__.PrimeTemplate, primeng_table__WEBPACK_IMPORTED_MODULE_12__.TableRadioButton, primeng_button__WEBPACK_IMPORTED_MODULE_13__.Button, primeng_divider__WEBPACK_IMPORTED_MODULE_14__.Divider, primeng_calendar__WEBPACK_IMPORTED_MODULE_15__.Calendar, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgModel, primeng_dropdown__WEBPACK_IMPORTED_MODULE_17__.Dropdown, primeng_badge__WEBPACK_IMPORTED_MODULE_18__.Badge, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLink, primeng_paginator__WEBPACK_IMPORTED_MODULE_19__.Paginator, primeng_multiselect__WEBPACK_IMPORTED_MODULE_20__.MultiSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormControlName, primeng_toast__WEBPACK_IMPORTED_MODULE_21__.Toast, _angular_common__WEBPACK_IMPORTED_MODULE_11__.DecimalPipe, _shared_pipes_order_status_pipe_pipe__WEBPACK_IMPORTED_MODULE_5__.OrderStatusPipe],
    styles: ["p-dropdown[_ngcontent-%COMP%] {\n  width: 100% !important;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9vcmRlcnMvY29tcG9uZW50cy9vcmRlcnMtbGlzdC9vcmRlcnMtbGlzdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usc0JBQXNCO0FBQ3hCIiwic291cmNlc0NvbnRlbnQiOlsicC1kcm9wZG93biB7XHJcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 2763:
/*!*************************************************************************************************************!*\
  !*** ./src/app/modules/orders/dialogs/non-standard-element-viewer/non-standard-element-viewer.component.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NonStandardElementViewerComponent: () => (/* binding */ NonStandardElementViewerComponent)
/* harmony export */ });
/* harmony import */ var _core_constants_api_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/constants/api-url */ 8572);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/dynamicdialog */ 4436);
/* harmony import */ var _services_order_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/order.service */ 3458);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var primeng_divider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/divider */ 920);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var primeng_chip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/chip */ 3500);
/* harmony import */ var primeng_scrollpanel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/scrollpanel */ 8788);









const _c0 = function () {
  return {
    width: "100%",
    height: "150px"
  };
};
function NonStandardElementViewerComponent_ng_container_0_div_1_ng_container_8_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "p-scrollPanel")(2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const element_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](3, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", element_r7["description"], " ");
  }
}
function NonStandardElementViewerComponent_ng_container_0_div_1_ng_container_8_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](element_r7["description"]);
  }
}
function NonStandardElementViewerComponent_ng_container_0_div_1_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, NonStandardElementViewerComponent_ng_container_0_div_1_ng_container_8_ng_container_2_Template, 4, 4, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, NonStandardElementViewerComponent_ng_container_0_div_1_ng_container_8_ng_template_3_Template, 2, 1, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 6)(6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const element_r7 = ctx.$implicit;
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", element_r7.description.length > 500)("ngIfElse", _r9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", element_r7["quantity"], " ");
  }
}
function NonStandardElementViewerComponent_ng_container_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 5)(3, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 6)(6, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, NonStandardElementViewerComponent_ng_container_0_div_1_ng_container_8_Template, 8, 3, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.nonStandardElements);
  }
}
function NonStandardElementViewerComponent_ng_container_0_p_divider_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "p-divider");
  }
}
function NonStandardElementViewerComponent_ng_container_0_ng_container_3_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 10)(2, "p-chip", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NonStandardElementViewerComponent_ng_container_0_ng_container_3_ng_container_3_Template_p_chip_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r16);
      const photo_r14 = restoredCtx.$implicit;
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r15.openFileInNewTab(photo_r14));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const photo_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("label", photo_r14.fileName);
  }
}
function NonStandardElementViewerComponent_ng_container_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u043D\u044B\u0435 \u0444\u043E\u0442\u043E:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, NonStandardElementViewerComponent_ng_container_0_ng_container_3_ng_container_3_Template, 3, 1, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r5.nonStandardElementFiles);
  }
}
function NonStandardElementViewerComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, NonStandardElementViewerComponent_ng_container_0_div_1_Template, 9, 1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, NonStandardElementViewerComponent_ng_container_0_p_divider_2_Template, 1, 0, "p-divider", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, NonStandardElementViewerComponent_ng_container_0_ng_container_3_Template, 4, 1, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (ctx_r0.nonStandardElements == null ? null : ctx_r0.nonStandardElements.length) > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (ctx_r0.nonStandardElements == null ? null : ctx_r0.nonStandardElements.length) > 0 && (ctx_r0.nonStandardElementFiles == null ? null : ctx_r0.nonStandardElementFiles.length) > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (ctx_r0.nonStandardElementFiles == null ? null : ctx_r0.nonStandardElementFiles.length) > 0);
  }
}
function NonStandardElementViewerComponent_ng_template_1_div_1_ng_container_9_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "p-scrollPanel")(2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const element_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](3, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", element_r21.value["description"], " ");
  }
}
function NonStandardElementViewerComponent_ng_template_1_div_1_ng_container_9_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](element_r21.value["description"]);
  }
}
function NonStandardElementViewerComponent_ng_template_1_div_1_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0)(1, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, NonStandardElementViewerComponent_ng_template_1_div_1_ng_container_9_ng_container_3_Template, 4, 4, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, NonStandardElementViewerComponent_ng_template_1_div_1_ng_container_9_ng_template_4_Template, 2, 1, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 6)(7, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]()();
  }
  if (rf & 2) {
    const element_r21 = ctx.$implicit;
    const i_r22 = ctx.index;
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroupName", i_r22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", element_r21.value["description"].length > 500)("ngIfElse", _r24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", element_r21.value["quantity"], " ");
  }
}
function NonStandardElementViewerComponent_ng_template_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 5)(3, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 6)(6, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](8, 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, NonStandardElementViewerComponent_ng_template_1_div_1_ng_container_9_Template, 9, 4, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r17.nonStandardElementsFromForm.controls);
  }
}
function NonStandardElementViewerComponent_ng_template_1_p_divider_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "p-divider");
  }
}
function NonStandardElementViewerComponent_ng_template_1_ng_container_3_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0)(1, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "p-chip", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]()();
  }
  if (rf & 2) {
    const photo_r29 = ctx.$implicit;
    const i_r30 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroupName", i_r30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("label", photo_r29.value["file_name"]);
  }
}
function NonStandardElementViewerComponent_ng_template_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u043D\u044B\u0435 \u0444\u0430\u0439\u043B\u044B:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, NonStandardElementViewerComponent_ng_template_1_ng_container_3_ng_container_4_Template, 4, 2, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r19.nonStandardElementPhotos.controls);
  }
}
function NonStandardElementViewerComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "form", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, NonStandardElementViewerComponent_ng_template_1_div_1_Template, 10, 1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, NonStandardElementViewerComponent_ng_template_1_p_divider_2_Template, 1, 0, "p-divider", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, NonStandardElementViewerComponent_ng_template_1_ng_container_3_Template, 5, 1, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx_r2.orderService.nonStandardElementsForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (ctx_r2.nonStandardElementsFromForm.controls == null ? null : ctx_r2.nonStandardElementsFromForm.controls.length) > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (ctx_r2.nonStandardElementsFromForm.controls == null ? null : ctx_r2.nonStandardElementsFromForm.controls.length) > 0 && (ctx_r2.nonStandardElementPhotos.controls == null ? null : ctx_r2.nonStandardElementPhotos.controls.length) > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (ctx_r2.nonStandardElementPhotos.controls == null ? null : ctx_r2.nonStandardElementPhotos.controls.length) > 0);
  }
}
class NonStandardElementViewerComponent {
  dialogConfig;
  orderService;
  nonStandardElements;
  nonStandardElementFiles;
  constructor(dialogConfig, orderService) {
    this.dialogConfig = dialogConfig;
    this.orderService = orderService;
    if (!!this.dialogConfig.data?.nonStandardElements) {
      this.nonStandardElements = this.dialogConfig.data.nonStandardElements;
    }
    if (!!this.dialogConfig.data?.nonStandardElementFiles) {
      this.nonStandardElementFiles = this.dialogConfig.data.nonStandardElementFiles;
    }
  }
  get nonStandardElementsFromForm() {
    return this.orderService.nonStandardElementsForm.get('nonStandardElements');
  }
  get nonStandardElementPhotos() {
    return this.orderService.nonStandardElementsForm.get('nonStandardElementPhotos');
  }
  openFileInNewTab(photo) {
    const url = _core_constants_api_url__WEBPACK_IMPORTED_MODULE_0__.PROJECT_URL + photo.link;
    window.open(url, '_blank');
  }
  static ɵfac = function NonStandardElementViewerComponent_Factory(t) {
    return new (t || NonStandardElementViewerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_3__.DynamicDialogConfig), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_order_service__WEBPACK_IMPORTED_MODULE_1__.OrderService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: NonStandardElementViewerComponent,
    selectors: [["app-non-standard-element-viewer"]],
    inputs: {
      nonStandardElements: "nonStandardElements",
      nonStandardElementFiles: "nonStandardElementFiles"
    },
    decls: 3,
    vars: 2,
    consts: [[4, "ngIf", "ngIfElse"], ["showForm", ""], ["class", "grid", 4, "ngIf"], [4, "ngIf"], [1, "grid"], [1, "col-9"], [1, "col-2"], [4, "ngFor", "ngForOf"], [1, "col-10"], ["showInPTag", ""], [1, "mt-1"], [3, "label", "click"], [3, "formGroup"], ["formArrayName", "nonStandardElements"], [3, "formGroupName"], ["formArrayName", "nonStandardElementPhotos"], [3, "label"]],
    template: function NonStandardElementViewerComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, NonStandardElementViewerComponent_ng_container_0_Template, 4, 3, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, NonStandardElementViewerComponent_ng_template_1_Template, 4, 4, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !!ctx.nonStandardElements)("ngIfElse", _r1);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, primeng_divider__WEBPACK_IMPORTED_MODULE_5__.Divider, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatusGroup, primeng_chip__WEBPACK_IMPORTED_MODULE_7__.Chip, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroupName, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormArrayName, primeng_scrollpanel__WEBPACK_IMPORTED_MODULE_8__.ScrollPanel],
    styles: ["[_nghost-%COMP%]     .p-chip {\n  cursor: pointer\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9vcmRlcnMvZGlhbG9ncy9ub24tc3RhbmRhcmQtZWxlbWVudC12aWV3ZXIvbm9uLXN0YW5kYXJkLWVsZW1lbnQtdmlld2VyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3QgOjpuZy1kZWVwIC5wLWNoaXAge1xyXG4gIGN1cnNvcjogcG9pbnRlclxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 6335:
/*!*******************************************************************************************!*\
  !*** ./src/app/modules/orders/dialogs/order-list-filters/order-list-filters.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrderListFiltersComponent: () => (/* binding */ OrderListFiltersComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/dynamicdialog */ 4436);
/* harmony import */ var _services_order_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/order.service */ 3458);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/dropdown */ 4553);







const _c0 = function () {
  return {
    "width": "100%"
  };
};
class OrderListFiltersComponent {
  ref;
  dialogConfig;
  orderService;
  counterparties = [];
  paymentTypes = [];
  shipmentWarehouses = [];
  responders = [];
  filterForm;
  constructor(ref, dialogConfig, orderService) {
    this.ref = ref;
    this.dialogConfig = dialogConfig;
    this.orderService = orderService;
    if (this.dialogConfig.data) {
      this.counterparties = this.dialogConfig.data.counterparties;
      this.paymentTypes = this.dialogConfig.data.paymentTypes;
      this.shipmentWarehouses = this.dialogConfig.data.shipmentWarehouses;
      this.responders = this.dialogConfig.data.responders;
    }
    this.filterForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroup({
      counterparty: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl(this.orderService.filterForm.value.counterparty || ''),
      paymentType: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl(this.orderService.filterForm.value.paymentType || ''),
      shipmentWarehouse: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl(this.orderService.filterForm.value.shipmentWarehouse || ''),
      sokrofResponsible: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl(this.orderService.filterForm.value.sokrofResponsible || '')
    });
  }
  onConfirm() {
    let value = this.filterForm.value;
    this.orderService.filterForm.patchValue({
      counterparty: value.counterparty,
      paymentType: value.paymentType,
      shipmentWarehouse: value.shipmentWarehouse,
      sokrofResponsible: value.sokrofResponsible
    });
    this.ref.close({});
  }
  static ɵfac = function OrderListFiltersComponent_Factory(t) {
    return new (t || OrderListFiltersComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_3__.DynamicDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_3__.DynamicDialogConfig), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_order_service__WEBPACK_IMPORTED_MODULE_0__.OrderService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: OrderListFiltersComponent,
    selectors: [["app-order-list-filters"]],
    decls: 19,
    vars: 21,
    consts: [[3, "formGroup"], ["optionLabel", "fullname", "formControlName", "counterparty", "emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "placeholder", "\u041B\u044E\u0431\u043E\u0439", "appendTo", "body", 3, "options", "showClear"], [1, "mt-3"], ["optionLabel", "label", "formControlName", "paymentType", "placeholder", "\u041B\u044E\u0431\u0430\u044F", "emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "appendTo", "body", 3, "options", "showClear"], ["optionLabel", "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435", "formControlName", "shipmentWarehouse", "placeholder", "\u041B\u044E\u0431\u043E\u0439", "emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "appendTo", "body", 3, "options", "showClear"], ["optionLabel", "label", "formControlName", "sokrofResponsible", "placeholder", "\u041B\u044E\u0431\u043E\u0439", "emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "appendTo", "body", 3, "options", "showClear"], [1, "mt-2"], ["label", "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C", "severity", "secondary", 3, "click"]],
    template: function OrderListFiltersComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "p-dropdown", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 2)(6, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "\u041E\u043F\u043B\u0430\u0442\u0430");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "p-dropdown", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 2)(10, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "\u0421\u043A\u043B\u0430\u0434 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "p-dropdown", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 2)(14, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 Sokrof");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](16, "p-dropdown", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 6)(18, "p-button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function OrderListFiltersComponent_Template_p_button_click_18_listener() {
          return ctx.onConfirm();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.filterForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](17, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("options", ctx.counterparties)("showClear", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](18, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("options", ctx.paymentTypes)("showClear", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](19, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("options", ctx.shipmentWarehouses)("showClear", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](20, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("options", ctx.responders)("showClear", true);
      }
    },
    dependencies: [primeng_button__WEBPACK_IMPORTED_MODULE_4__.Button, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, primeng_dropdown__WEBPACK_IMPORTED_MODULE_5__.Dropdown, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ })

}]);
//# sourceMappingURL=default-src_app_modules_orders_components_order-editor_order-editor_component_ts-src_app_modu-4bcf92.js.map