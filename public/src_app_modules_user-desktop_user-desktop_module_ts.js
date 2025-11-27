"use strict";
(self["webpackChunksokrof_frontend"] = self["webpackChunksokrof_frontend"] || []).push([["src_app_modules_user-desktop_user-desktop_module_ts"],{

/***/ 7290:
/*!********************************************************************************!*\
  !*** ./src/app/modules/orders/components/order-table/order-table.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrderTableComponent: () => (/* binding */ OrderTableComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _user_desktop_services_user_desktop_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../user-desktop/services/user-desktop.service */ 3571);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../app.service */ 2266);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/table */ 6192);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/api */ 8026);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var _shared_pipes_order_status_pipe_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/pipes/order-status-pipe.pipe */ 7748);
/* harmony import */ var _shared_pipes_counterparty_fullname_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/pipes/counterparty-fullname.pipe */ 6892);










function OrderTableComponent_ng_template_1_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr", 6)(1, "td", 7)(2, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "\u0417\u0430\u043A\u0430\u0437\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
}
function OrderTableComponent_ng_template_1_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr", 6)(1, "td", 7)(2, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "\u00A0\u00A0\u00A0loading ...");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
}
function OrderTableComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr")(1, "th", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "\u0414\u0430\u0442\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "\u041D\u043E\u043C\u0435\u0440");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "\u0421\u0442\u0430\u0442\u0443\u0441");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "\u0421\u0443\u043C\u043C\u0430, \u20BD");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "\u041E\u043F\u043B\u0430\u0442\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "\u041E\u0442\u0433\u0440\u0443\u0437\u043A\u0430 (\u043F\u043B\u0430\u043D)");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16, "\u0421\u043A\u043B\u0430\u0434 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, "Sokrof");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "\u041A\u043B\u0438\u0435\u043D\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](21, OrderTableComponent_ng_template_1_tr_21_Template, 4, 0, "tr", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](22, OrderTableComponent_ng_template_1_tr_22_Template, 5, 0, "tr", 5);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.globalThis.stateLoadDataForUserDesktop == "loaded" && (ctx_r0.userDesktopService.data.response == null ? null : ctx_r0.userDesktopService.data.response.orders == null ? null : ctx_r0.userDesktopService.data.response.orders.data.length) == 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.globalThis.stateLoadDataForUserDesktop != "loaded");
  }
}
const _c0 = function () {
  return ["/shipments/edit"];
};
function OrderTableComponent_ng_template_2_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "p-button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](1, _c0));
  }
}
function OrderTableComponent_ng_template_2_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "orderStatus");
  }
  if (rf & 2) {
    const order_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](1, 1, order_r4.status), " ");
  }
}
function OrderTableComponent_ng_template_2_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const order_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](2, 1, order_r4.sum, "2.0-2"));
  }
}
function OrderTableComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function OrderTableComponent_ng_template_2_Template_tr_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12);
      const order_r4 = restoredCtx.$implicit;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r11.goToOrderPage(order_r4.order_id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, OrderTableComponent_ng_template_2_ng_container_6_Template, 2, 2, "ng-container", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, OrderTableComponent_ng_template_2_ng_template_7_Template, 2, 3, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](11, "counterpartyFullname");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, OrderTableComponent_ng_template_2_span_13_Template, 3, 4, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const order_r4 = ctx.$implicit;
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](order_r4.date);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](order_r4.order_number);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", order_r4.status === "ready_for_shipment")("ngIfElse", _r6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](11, 11, order_r4.counterparty_name));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", order_r4.sum > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](order_r4.is_cash_payment === "1" ? "\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0435\u0442" : "\u0411\u0435\u0437\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0435\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](order_r4.shipping_date);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](order_r4.shipping_warehouse_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](order_r4.responsible_sokrof);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](order_r4.client_fio);
  }
}
class OrderTableComponent {
  userDesktopService;
  appService;
  router;
  orders = {
    data: [],
    pagination: []
  };
  globalThis = globalThis;
  constructor(userDesktopService, appService, router) {
    this.userDesktopService = userDesktopService;
    this.appService = appService;
    this.router = router;
  }
  ngOnInit() {
    this.appService.fakeSocketData$.subscribe(data => {
      data?.update_orders?.data?.forEach(item => {
        let orderItem = this.userDesktopService.data.response.orders.data.find(order => order.order_id === item.order_id);
        if (orderItem) {
          orderItem.status = item.status;
        }
      });
    });
  }
  ngOnDestroy() {
    // this.appService.fakeSocketData.unsubscribe()
  }
  goToOrderPage(order_id) {
    this.router.navigate(['/orders/details'], {
      queryParams: {
        id: order_id
      }
    }).then();
  }
  static ɵfac = function OrderTableComponent_Factory(t) {
    return new (t || OrderTableComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_user_desktop_services_user_desktop_service__WEBPACK_IMPORTED_MODULE_0__.UserDesktopService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_service__WEBPACK_IMPORTED_MODULE_1__.AppService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: OrderTableComponent,
    selectors: [["app-order-table"]],
    decls: 3,
    vars: 3,
    consts: [["scrollHeight", "400px", 3, "value", "scrollable", "styleClass"], ["pTemplate", "header"], ["pTemplate", "body"], [2, "min-width", "100px"], [2, "min-width", "200px"], ["style", "background-color: #fff;", 4, "ngIf"], [2, "background-color", "#fff"], ["colspan", "10"], [1, "nothing_found_text_orders"], [1, "loading_orders"], ["data-pc-section", "icon", 1, "pi", "pi-spin", "pi-spinner", "p-button-icon", "p-button-icon-left", "ng-star-inserted"], [2, "cursor", "pointer", 3, "click"], [4, "ngIf", "ngIfElse"], ["showStatusLabel", ""], [4, "ngIf"], ["label", "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0443", "severity", "primary", "size", "small", 1, "mr-2", 3, "routerLink"]],
    template: function OrderTableComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p-table", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, OrderTableComponent_ng_template_1_Template, 23, 2, "ng-template", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, OrderTableComponent_ng_template_2_Template, 24, 13, "ng-template", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", ctx.userDesktopService.data.response == null ? null : ctx.userDesktopService.data.response.orders == null ? null : ctx.userDesktopService.data.response.orders.data)("scrollable", true)("styleClass", "p-datatable-sm");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, primeng_table__WEBPACK_IMPORTED_MODULE_7__.Table, primeng_api__WEBPACK_IMPORTED_MODULE_8__.PrimeTemplate, primeng_button__WEBPACK_IMPORTED_MODULE_9__.Button, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_6__.DecimalPipe, _shared_pipes_order_status_pipe_pipe__WEBPACK_IMPORTED_MODULE_2__.OrderStatusPipe, _shared_pipes_counterparty_fullname_pipe__WEBPACK_IMPORTED_MODULE_3__.CounterpartyFullnamePipe],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 73:
/*!*************************************************!*\
  !*** ./src/app/modules/orders/orders.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrdersModule: () => (/* binding */ OrdersModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _components_order_table_order_table_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/order-table/order-table.component */ 7290);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/table */ 6192);
/* harmony import */ var _components_orders_list_orders_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/orders-list/orders-list.component */ 9501);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var primeng_divider__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/divider */ 920);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/calendar */ 7411);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/dropdown */ 4553);
/* harmony import */ var _components_order_editor_order_editor_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/order-editor/order-editor.component */ 9430);
/* harmony import */ var _managers_managers_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../managers/managers.module */ 8147);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! primeng/checkbox */ 1580);
/* harmony import */ var _products_products_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../products/products.module */ 1194);
/* harmony import */ var primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/inputtextarea */ 652);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/shared.module */ 6208);
/* harmony import */ var primeng_chip__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/chip */ 3500);
/* harmony import */ var primeng_badge__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/badge */ 7650);
/* harmony import */ var _dialogs_order_list_filters_order_list_filters_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dialogs/order-list-filters/order-list-filters.component */ 6335);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! primeng/paginator */ 5302);
/* harmony import */ var _components_order_page_order_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/order-page/order-page.component */ 4543);
/* harmony import */ var primeng_tag__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! primeng/tag */ 2455);
/* harmony import */ var primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! primeng/overlaypanel */ 7830);
/* harmony import */ var primeng_multiselect__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! primeng/multiselect */ 7524);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! primeng/toast */ 8313);
/* harmony import */ var _dialogs_non_standard_element_editor_non_standard_element_editor_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dialogs/non-standard-element-editor/non-standard-element-editor.component */ 9017);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! primeng/inputtext */ 873);
/* harmony import */ var primeng_messages__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! primeng/messages */ 9404);
/* harmony import */ var primeng_keyfilter__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! primeng/keyfilter */ 4367);
/* harmony import */ var _dialogs_non_standard_element_viewer_non_standard_element_viewer_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dialogs/non-standard-element-viewer/non-standard-element-viewer.component */ 2763);
/* harmony import */ var primeng_scrollpanel__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! primeng/scrollpanel */ 8788);
/* harmony import */ var primeng_tooltip__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! primeng/tooltip */ 1251);
/* harmony import */ var _components_cart_items_table_cart_items_table_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/cart-items-table/cart-items-table.component */ 6748);
/* harmony import */ var primeng_progressspinner__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! primeng/progressspinner */ 7355);
/* harmony import */ var _employees_employees_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../employees/employees.module */ 5940);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 1699);




































class OrdersModule {
  static ɵfac = function OrdersModule_Factory(t) {
    return new (t || OrdersModule)();
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({
    type: OrdersModule
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.CommonModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__.SharedModule, primeng_table__WEBPACK_IMPORTED_MODULE_14__.TableModule, primeng_button__WEBPACK_IMPORTED_MODULE_15__.ButtonModule, primeng_divider__WEBPACK_IMPORTED_MODULE_16__.DividerModule, primeng_calendar__WEBPACK_IMPORTED_MODULE_17__.CalendarModule, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.FormsModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_19__.DropdownModule, _managers_managers_module__WEBPACK_IMPORTED_MODULE_3__.ManagersModule, primeng_checkbox__WEBPACK_IMPORTED_MODULE_20__.CheckboxModule, _products_products_module__WEBPACK_IMPORTED_MODULE_4__.ProductsModule, primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_21__.InputTextareaModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__.SharedModule, primeng_chip__WEBPACK_IMPORTED_MODULE_22__.ChipModule, primeng_badge__WEBPACK_IMPORTED_MODULE_23__.BadgeModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_24__.PaginatorModule, primeng_tag__WEBPACK_IMPORTED_MODULE_25__.TagModule, primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_26__.OverlayPanelModule, primeng_multiselect__WEBPACK_IMPORTED_MODULE_27__.MultiSelectModule, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.ReactiveFormsModule, primeng_toast__WEBPACK_IMPORTED_MODULE_28__.ToastModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_29__.InputTextModule, primeng_messages__WEBPACK_IMPORTED_MODULE_30__.MessagesModule, primeng_keyfilter__WEBPACK_IMPORTED_MODULE_31__.KeyFilterModule, primeng_scrollpanel__WEBPACK_IMPORTED_MODULE_32__.ScrollPanelModule, primeng_tooltip__WEBPACK_IMPORTED_MODULE_33__.TooltipModule, primeng_progressspinner__WEBPACK_IMPORTED_MODULE_34__.ProgressSpinnerModule, _employees_employees_module__WEBPACK_IMPORTED_MODULE_11__.EmployeesModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](OrdersModule, {
    declarations: [_components_order_table_order_table_component__WEBPACK_IMPORTED_MODULE_0__.OrderTableComponent, _components_orders_list_orders_list_component__WEBPACK_IMPORTED_MODULE_1__.OrdersListComponent, _components_order_editor_order_editor_component__WEBPACK_IMPORTED_MODULE_2__.OrderEditorComponent, _dialogs_order_list_filters_order_list_filters_component__WEBPACK_IMPORTED_MODULE_6__.OrderListFiltersComponent, _components_order_page_order_page_component__WEBPACK_IMPORTED_MODULE_7__.OrderPageComponent, _dialogs_non_standard_element_editor_non_standard_element_editor_component__WEBPACK_IMPORTED_MODULE_8__.NonStandardElementEditorComponent, _dialogs_non_standard_element_viewer_non_standard_element_viewer_component__WEBPACK_IMPORTED_MODULE_9__.NonStandardElementViewerComponent, _components_cart_items_table_cart_items_table_component__WEBPACK_IMPORTED_MODULE_10__.CartItemsTableComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.CommonModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__.SharedModule, primeng_table__WEBPACK_IMPORTED_MODULE_14__.TableModule, primeng_button__WEBPACK_IMPORTED_MODULE_15__.ButtonModule, primeng_divider__WEBPACK_IMPORTED_MODULE_16__.DividerModule, primeng_calendar__WEBPACK_IMPORTED_MODULE_17__.CalendarModule, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.FormsModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_19__.DropdownModule, _managers_managers_module__WEBPACK_IMPORTED_MODULE_3__.ManagersModule, primeng_checkbox__WEBPACK_IMPORTED_MODULE_20__.CheckboxModule, _products_products_module__WEBPACK_IMPORTED_MODULE_4__.ProductsModule, primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_21__.InputTextareaModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__.SharedModule, primeng_chip__WEBPACK_IMPORTED_MODULE_22__.ChipModule, primeng_badge__WEBPACK_IMPORTED_MODULE_23__.BadgeModule, _angular_router__WEBPACK_IMPORTED_MODULE_35__.RouterLink, primeng_paginator__WEBPACK_IMPORTED_MODULE_24__.PaginatorModule, primeng_tag__WEBPACK_IMPORTED_MODULE_25__.TagModule, primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_26__.OverlayPanelModule, primeng_multiselect__WEBPACK_IMPORTED_MODULE_27__.MultiSelectModule, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.ReactiveFormsModule, primeng_toast__WEBPACK_IMPORTED_MODULE_28__.ToastModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_29__.InputTextModule, primeng_messages__WEBPACK_IMPORTED_MODULE_30__.MessagesModule, primeng_keyfilter__WEBPACK_IMPORTED_MODULE_31__.KeyFilterModule, primeng_scrollpanel__WEBPACK_IMPORTED_MODULE_32__.ScrollPanelModule, primeng_tooltip__WEBPACK_IMPORTED_MODULE_33__.TooltipModule, primeng_progressspinner__WEBPACK_IMPORTED_MODULE_34__.ProgressSpinnerModule, _employees_employees_module__WEBPACK_IMPORTED_MODULE_11__.EmployeesModule],
    exports: [_components_order_table_order_table_component__WEBPACK_IMPORTED_MODULE_0__.OrderTableComponent]
  });
})();

/***/ }),

/***/ 4017:
/*!*****************************************************************************************!*\
  !*** ./src/app/modules/shipments/components/shipment-table/shipment-table.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShipmentTableComponent: () => (/* binding */ ShipmentTableComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _user_desktop_services_user_desktop_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../user-desktop/services/user-desktop.service */ 3571);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/table */ 6192);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/api */ 8026);
/* harmony import */ var _shared_pipes_shipment_status_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/pipes/shipment-status.pipe */ 258);







function ShipmentTableComponent_ng_template_2_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr", 7)(1, "td", 8)(2, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "\u041E\u0442\u0433\u0440\u0443\u0437\u043A\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
}
function ShipmentTableComponent_ng_template_2_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr", 7)(1, "td", 8)(2, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "\u00A0\u00A0\u00A0loading ...");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
}
function ShipmentTableComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\u0414\u0430\u0442\u0430 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438 (\u043F\u043B\u0430\u043D)");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "\u041D\u043E\u043C\u0435\u0440");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "\u0421\u0442\u0430\u0442\u0443\u0441");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430/\u0421\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "\u0421\u043A\u043B\u0430\u0434 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "th", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "\u0421\u0443\u043C\u043C\u0430, \u20BD");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "\u0412\u0435\u0441, \u043A\u0433");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "th", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Sokrof");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "\u041A\u043B\u0438\u0435\u043D\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](21, ShipmentTableComponent_ng_template_2_tr_21_Template, 4, 0, "tr", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](22, ShipmentTableComponent_ng_template_2_tr_22_Template, 5, 0, "tr", 6);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.globalThis.stateLoadDataForUserDesktop == "loaded" && (ctx_r0.desktopService.data == null ? null : ctx_r0.desktopService.data.response == null ? null : ctx_r0.desktopService.data.response.shipments == null ? null : ctx_r0.desktopService.data.response.shipments.data.length) == 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.globalThis.stateLoadDataForUserDesktop != "loaded");
  }
}
function ShipmentTableComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ShipmentTableComponent_ng_template_3_Template_tr_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6);
      const shipment_r4 = restoredCtx.$implicit;
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r5.goToShipmentPage(shipment_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "shipmentStatus");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](16, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](19, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const shipment_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](shipment_r4.shipping_date);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](shipment_r4.shipment_number);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](7, 10, shipment_r4.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", shipment_r4.delivery_address_name, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", shipment_r4.shipping_warehouse_name, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", shipment_r4.counterparty_name, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](16, 12, shipment_r4.sum, "2.0-2"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](19, 15, shipment_r4.weight, "2.0-2"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](shipment_r4.responsible_sokrof);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](shipment_r4.client_fio);
  }
}
class ShipmentTableComponent {
  desktopService;
  router;
  globalThis = globalThis;
  constructor(desktopService, router) {
    this.desktopService = desktopService;
    this.router = router;
  }
  goToShipmentPage(shipment) {
    this.router.navigate(['/shipments/page'], {
      queryParams: {
        shipment_id: shipment.shipment_id
      }
    });
  }
  static ɵfac = function ShipmentTableComponent_Factory(t) {
    return new (t || ShipmentTableComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_user_desktop_services_user_desktop_service__WEBPACK_IMPORTED_MODULE_0__.UserDesktopService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ShipmentTableComponent,
    selectors: [["app-shipment-table"]],
    decls: 4,
    vars: 3,
    consts: [[1, "pt-2"], ["scrollHeight", "400px", 3, "value", "scrollable", "styleClass"], ["pTemplate", "header"], ["pTemplate", "body"], [2, "min-width", "200px"], [2, "min-width", "300px"], ["style", "background-color: #fff;", 4, "ngIf"], [2, "background-color", "#fff"], ["colspan", "10"], [1, "nothing_found_text_orders"], [1, "loading_shipments"], ["data-pc-section", "icon", 1, "pi", "pi-spin", "pi-spinner", "p-button-icon", "p-button-icon-left", "ng-star-inserted"], [2, "cursor", "pointer", 3, "click"], [3, "innerHTML"]],
    template: function ShipmentTableComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "p-table", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, ShipmentTableComponent_ng_template_2_Template, 23, 2, "ng-template", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, ShipmentTableComponent_ng_template_3_Template, 24, 18, "ng-template", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", ctx.desktopService.data == null ? null : ctx.desktopService.data.response == null ? null : ctx.desktopService.data.response.shipments == null ? null : ctx.desktopService.data.response.shipments.data)("scrollable", true)("styleClass", "p-datatable-sm");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, primeng_table__WEBPACK_IMPORTED_MODULE_5__.Table, primeng_api__WEBPACK_IMPORTED_MODULE_6__.PrimeTemplate, _angular_common__WEBPACK_IMPORTED_MODULE_4__.DecimalPipe, _shared_pipes_shipment_status_pipe__WEBPACK_IMPORTED_MODULE_1__.ShipmentStatusPipe],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 4196:
/*!*******************************************************!*\
  !*** ./src/app/modules/shipments/shipments.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShipmentsModule: () => (/* binding */ ShipmentsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _components_shipment_table_shipment_table_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/shipment-table/shipment-table.component */ 4017);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/table */ 6192);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/shared.module */ 6208);
/* harmony import */ var _components_shipment_list_shipment_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/shipment-list/shipment-list.component */ 6695);
/* harmony import */ var _components_shipment_editor_shipment_editor_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/shipment-editor/shipment-editor.component */ 7334);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/calendar */ 7411);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/dropdown */ 4553);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var primeng_divider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/divider */ 920);
/* harmony import */ var primeng_card__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/card */ 4722);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/checkbox */ 1580);
/* harmony import */ var primeng_radiobutton__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/radiobutton */ 3313);
/* harmony import */ var primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/inputtextarea */ 652);
/* harmony import */ var primeng_progressspinner__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! primeng/progressspinner */ 7355);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/paginator */ 5302);
/* harmony import */ var _dialogs_address_selector_dialog_address_selector_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dialogs/address-selector-dialog/address-selector-dialog.component */ 3655);
/* harmony import */ var primeng_multiselect__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/multiselect */ 7524);
/* harmony import */ var _components_shipment_page_shipment_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/shipment-page/shipment-page.component */ 6498);
/* harmony import */ var _managers_managers_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../managers/managers.module */ 8147);
/* harmony import */ var primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/overlaypanel */ 7830);
/* harmony import */ var primeng_tag__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! primeng/tag */ 2455);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! primeng/toast */ 8313);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! primeng/dialog */ 3311);
/* harmony import */ var primeng_tooltip__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! primeng/tooltip */ 1251);
/* harmony import */ var _employees_employees_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../employees/employees.module */ 5940);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 1699);





























class ShipmentsModule {
  static ɵfac = function ShipmentsModule_Factory(t) {
    return new (t || ShipmentsModule)();
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
    type: ShipmentsModule
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, primeng_table__WEBPACK_IMPORTED_MODULE_10__.TableModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, primeng_button__WEBPACK_IMPORTED_MODULE_11__.ButtonModule, primeng_calendar__WEBPACK_IMPORTED_MODULE_12__.CalendarModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_13__.DropdownModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormsModule, primeng_divider__WEBPACK_IMPORTED_MODULE_15__.DividerModule, primeng_card__WEBPACK_IMPORTED_MODULE_16__.CardModule, primeng_checkbox__WEBPACK_IMPORTED_MODULE_17__.CheckboxModule, primeng_radiobutton__WEBPACK_IMPORTED_MODULE_18__.RadioButtonModule, primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_19__.InputTextareaModule, primeng_progressspinner__WEBPACK_IMPORTED_MODULE_20__.ProgressSpinnerModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_21__.PaginatorModule, primeng_multiselect__WEBPACK_IMPORTED_MODULE_22__.MultiSelectModule, _managers_managers_module__WEBPACK_IMPORTED_MODULE_6__.ManagersModule, primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_23__.OverlayPanelModule, primeng_tag__WEBPACK_IMPORTED_MODULE_24__.TagModule, primeng_toast__WEBPACK_IMPORTED_MODULE_25__.ToastModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.ReactiveFormsModule, primeng_dialog__WEBPACK_IMPORTED_MODULE_26__.DialogModule, primeng_tooltip__WEBPACK_IMPORTED_MODULE_27__.TooltipModule, _employees_employees_module__WEBPACK_IMPORTED_MODULE_7__.EmployeesModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](ShipmentsModule, {
    declarations: [_components_shipment_table_shipment_table_component__WEBPACK_IMPORTED_MODULE_0__.ShipmentTableComponent, _components_shipment_list_shipment_list_component__WEBPACK_IMPORTED_MODULE_2__.ShipmentListComponent, _components_shipment_editor_shipment_editor_component__WEBPACK_IMPORTED_MODULE_3__.ShipmentEditorComponent, _dialogs_address_selector_dialog_address_selector_dialog_component__WEBPACK_IMPORTED_MODULE_4__.AddressSelectorDialogComponent, _components_shipment_page_shipment_page_component__WEBPACK_IMPORTED_MODULE_5__.ShipmentPageComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, primeng_table__WEBPACK_IMPORTED_MODULE_10__.TableModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, primeng_button__WEBPACK_IMPORTED_MODULE_11__.ButtonModule, primeng_calendar__WEBPACK_IMPORTED_MODULE_12__.CalendarModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_13__.DropdownModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormsModule, primeng_divider__WEBPACK_IMPORTED_MODULE_15__.DividerModule, primeng_card__WEBPACK_IMPORTED_MODULE_16__.CardModule, primeng_checkbox__WEBPACK_IMPORTED_MODULE_17__.CheckboxModule, primeng_radiobutton__WEBPACK_IMPORTED_MODULE_18__.RadioButtonModule, primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_19__.InputTextareaModule, primeng_progressspinner__WEBPACK_IMPORTED_MODULE_20__.ProgressSpinnerModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_21__.PaginatorModule, primeng_multiselect__WEBPACK_IMPORTED_MODULE_22__.MultiSelectModule, _managers_managers_module__WEBPACK_IMPORTED_MODULE_6__.ManagersModule, primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_23__.OverlayPanelModule, primeng_tag__WEBPACK_IMPORTED_MODULE_24__.TagModule, primeng_toast__WEBPACK_IMPORTED_MODULE_25__.ToastModule, _angular_router__WEBPACK_IMPORTED_MODULE_28__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.ReactiveFormsModule, primeng_dialog__WEBPACK_IMPORTED_MODULE_26__.DialogModule, primeng_tooltip__WEBPACK_IMPORTED_MODULE_27__.TooltipModule, _employees_employees_module__WEBPACK_IMPORTED_MODULE_7__.EmployeesModule],
    exports: [_components_shipment_table_shipment_table_component__WEBPACK_IMPORTED_MODULE_0__.ShipmentTableComponent]
  });
})();

/***/ }),

/***/ 8393:
/*!******************************************************************************************!*\
  !*** ./src/app/modules/user-desktop/components/user-descktop/user-descktop.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserDescktopComponent: () => (/* binding */ UserDescktopComponent)
/* harmony export */ });
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/api */ 8026);
/* harmony import */ var _news_NewsUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../news/NewsUtils */ 2423);
/* harmony import */ var _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/error-handle/ErrorTranslator */ 8097);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_user_desktop_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/user-desktop.service */ 3571);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../app.service */ 2266);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _news_components_news_preview_news_preview_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../news/components/news-preview/news-preview.component */ 8169);
/* harmony import */ var _orders_components_order_table_order_table_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../orders/components/order-table/order-table.component */ 7290);
/* harmony import */ var _shipments_components_shipment_table_shipment_table_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shipments/components/shipment-table/shipment-table.component */ 4017);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var _managers_components_manager_card_manager_card_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../managers/components/manager-card/manager-card.component */ 233);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/toast */ 8313);














const _c0 = function () {
  return ["/news"];
};
const _c1 = function () {
  return ["/orders"];
};
const _c2 = function () {
  return ["/orders/edit"];
};
const _c3 = function () {
  return ["/shipments"];
};
const _c4 = function () {
  return ["/shipments/edit"];
};
class UserDescktopComponent {
  userDesktopService;
  messageService;
  appService;
  constructor(userDesktopService, messageService, appService) {
    this.userDesktopService = userDesktopService;
    this.messageService = messageService;
    this.appService = appService;
    globalThis.stateLoadDataForUserDesktop = '';
    this.userDesktopService.getDataForUserDesktop().subscribe({
      next: res => {
        globalThis.stateLoadDataForUserDesktop = 'loaded';
        this.userDesktopService.data = globalThis.decryptResponse(res);
        this.userDesktopService.data.response.news.data.map(news => news.text = _news_NewsUtils__WEBPACK_IMPORTED_MODULE_0__.NewsUtils.replaceNewlinesWithBr(news.text));
      },
      error: error => {
        globalThis.stateLoadDataForUserDesktop = 'error';
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_1__.ErrorTranslator.translate(_core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_1__.ErrorTranslator.prepare(error)),
          life: 30000
        });
      }
    });
  }
  ngOnInit() {
    this.appService.fakeSocketData$.subscribe({
      next: data => {
        for (let i = data?.news?.data.length - 1; i >= 0; i--) {
          const news = data?.news?.data[i];
          this.userDesktopService.data.response.news.data.unshift({
            id: news.id,
            date: news.date,
            header: news.header,
            text: _news_NewsUtils__WEBPACK_IMPORTED_MODULE_0__.NewsUtils.replaceNewlinesWithBr(news.text),
            is_unread: news.is_unread
          });
          this.userDesktopService.data.response.news.data.pop();
        }
        const updatedShipments = data?.update_shipments?.data;
        if (updatedShipments) {
          this.userDesktopService?.data?.response?.shipments?.data?.forEach(s => {
            const matchingShipment = updatedShipments.find(u => s.shipment_id === u.shipment_id);
            if (matchingShipment) {
              s.status = matchingShipment.status;
            }
          });
        }
        data?.update_orders?.data?.forEach(item => {
          let orderItem = this.userDesktopService.data.response.orders.data.find(order => order.order_id === item.order_id);
          if (orderItem) {
            orderItem.status = item.status;
          }
        });
      }
    });
  }
  ngOnDestroy() {
    // this.appService.fakeSocketData.unsubscribe()
  }
  static ɵfac = function UserDescktopComponent_Factory(t) {
    return new (t || UserDescktopComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_user_desktop_service__WEBPACK_IMPORTED_MODULE_2__.UserDesktopService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_9__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_app_service__WEBPACK_IMPORTED_MODULE_3__.AppService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
    type: UserDescktopComponent,
    selectors: [["app-user-descktop"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵProvidersFeature"]([primeng_api__WEBPACK_IMPORTED_MODULE_9__.MessageService])],
    decls: 24,
    vars: 12,
    consts: [[1, "grid"], [1, "col-9"], [1, "mb-3"], [1, "news-title"], [1, "all-news-link", 3, "routerLink"], [1, "col-3"], [3, "showMessageButton", "messageService"], [1, "flex", "flex-row", "flex-wrap"], ["severity", "secondary", "label", "\u0412\u0441\u0435 \u0437\u0430\u043A\u0430\u0437\u044B", 1, "mr-2", 3, "routerLink"], ["label", "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u044B\u0439", "icon", "pi pi-plus", "iconPos", "left", 1, "mr-2", 3, "routerLink"], [1, "mb-2"], ["severity", "secondary", "label", "\u0412\u0441\u0435 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438", 1, "mr-2", 3, "routerLink"], ["label", "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u0443\u044E", "icon", "pi pi-plus", "iconPos", "left", 1, "mr-2", 3, "routerLink"]],
    template: function UserDescktopComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "p-toast");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "\u041D\u043E\u0432\u043E\u0441\u0442\u0438");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "\u0412\u0441\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438 \u2192");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "app-news-preview");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](10, "app-manager-card", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u044B");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](14, "p-button", 8)(15, "p-button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](16, "p")(17, "app-order-table");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](19, "\u041E\u0442\u0433\u0440\u0443\u0437\u043A\u0438");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](21, "p-button", 11)(22, "p-button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](23, "app-shipment-table");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](7, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("showMessageButton", true)("messageService", ctx.messageService);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](8, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](9, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](10, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](11, _c4));
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterLink, _news_components_news_preview_news_preview_component__WEBPACK_IMPORTED_MODULE_4__.NewsPreviewComponent, _orders_components_order_table_order_table_component__WEBPACK_IMPORTED_MODULE_5__.OrderTableComponent, _shipments_components_shipment_table_shipment_table_component__WEBPACK_IMPORTED_MODULE_6__.ShipmentTableComponent, primeng_button__WEBPACK_IMPORTED_MODULE_11__.Button, _managers_components_manager_card_manager_card_component__WEBPACK_IMPORTED_MODULE_7__.ManagerCardComponent, primeng_toast__WEBPACK_IMPORTED_MODULE_12__.Toast],
    styles: [".news-title[_ngcontent-%COMP%] {\n  color: rgb(127, 127, 127);\n  display: inline;\n  font-family: \"Montserrat SemiBold\", \"Montserrat Regular\", Montserrat, sans-serif;\n  font-feature-settings: \"kern\";\n  font-kerning: normal;\n  font-size: 20px;\n  font-style: normal;\n  font-weight: 600;\n  height: auto;\n  letter-spacing: normal;\n  line-height: normal;\n  text-align: left;\n  text-rendering: optimizelegibility;\n  text-transform: none;\n  white-space-collapse: collapse;\n  margin-bottom: 1rem;\n  margin-right: 2rem;\n}\n\n.all-news-link[_ngcontent-%COMP%] {\n  color: rgb(0, 128, 128);\n  cursor: pointer;\n  display: inline;\n  font-family: Montserrat, sans-serif;\n  font-feature-settings: \"kern\";\n  font-kerning: normal;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: auto;\n  letter-spacing: normal;\n  line-height: normal;\n  text-align: left;\n  text-rendering: optimizelegibility;\n  text-transform: none;\n  white-space-collapse: collapse;\n  margin-bottom: 1rem;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy91c2VyLWRlc2t0b3AvY29tcG9uZW50cy91c2VyLWRlc2NrdG9wL3VzZXItZGVzY2t0b3AuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHlCQUF5QjtFQUN6QixlQUFlO0VBQ2YsZ0ZBQWdGO0VBQ2hGLDZCQUE2QjtFQUM3QixvQkFBb0I7RUFDcEIsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLGtDQUFrQztFQUNsQyxvQkFBb0I7RUFDcEIsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsZUFBZTtFQUNmLGVBQWU7RUFDZixtQ0FBbUM7RUFDbkMsNkJBQTZCO0VBQzdCLG9CQUFvQjtFQUNwQixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsa0NBQWtDO0VBQ2xDLG9CQUFvQjtFQUNwQiw4QkFBOEI7RUFDOUIsbUJBQW1CO0FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiLm5ld3MtdGl0bGUge1xyXG4gIGNvbG9yOiByZ2IoMTI3LCAxMjcsIDEyNyk7XHJcbiAgZGlzcGxheTogaW5saW5lO1xyXG4gIGZvbnQtZmFtaWx5OiBcIk1vbnRzZXJyYXQgU2VtaUJvbGRcIiwgXCJNb250c2VycmF0IFJlZ3VsYXJcIiwgTW9udHNlcnJhdCwgc2Fucy1zZXJpZjtcclxuICBmb250LWZlYXR1cmUtc2V0dGluZ3M6IFwia2VyblwiO1xyXG4gIGZvbnQta2VybmluZzogbm9ybWFsO1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBoZWlnaHQ6IGF1dG87XHJcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplbGVnaWJpbGl0eTtcclxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcclxuICB3aGl0ZS1zcGFjZS1jb2xsYXBzZTogY29sbGFwc2U7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICBtYXJnaW4tcmlnaHQ6IDJyZW07XHJcbn1cclxuXHJcbi5hbGwtbmV3cy1saW5rIHtcclxuICBjb2xvcjogcmdiKDAsIDEyOCwgMTI4KTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgZGlzcGxheTogaW5saW5lO1xyXG4gIGZvbnQtZmFtaWx5OiBNb250c2VycmF0LCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtZmVhdHVyZS1zZXR0aW5nczogXCJrZXJuXCI7XHJcbiAgZm9udC1rZXJuaW5nOiBub3JtYWw7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG4gIGhlaWdodDogYXV0bztcclxuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVsZWdpYmlsaXR5O1xyXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xyXG4gIHdoaXRlLXNwYWNlLWNvbGxhcHNlOiBjb2xsYXBzZTtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 5143:
/*!*********************************************************************!*\
  !*** ./src/app/modules/user-desktop/user-desktop-routing.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserDesktopRoutingModule: () => (/* binding */ UserDesktopRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _components_user_descktop_user_descktop_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/user-descktop/user-descktop.component */ 8393);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);




const routes = [{
  path: '',
  component: _components_user_descktop_user_descktop_component__WEBPACK_IMPORTED_MODULE_0__.UserDescktopComponent
}];
class UserDesktopRoutingModule {
  static ɵfac = function UserDesktopRoutingModule_Factory(t) {
    return new (t || UserDesktopRoutingModule)();
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: UserDesktopRoutingModule
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](UserDesktopRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 647:
/*!*************************************************************!*\
  !*** ./src/app/modules/user-desktop/user-desktop.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserDesktopModule: () => (/* binding */ UserDesktopModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _components_user_descktop_user_descktop_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/user-descktop/user-descktop.component */ 8393);
/* harmony import */ var _user_desktop_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-desktop-routing.module */ 5143);
/* harmony import */ var _news_news_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../news/news.module */ 6366);
/* harmony import */ var _orders_orders_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../orders/orders.module */ 73);
/* harmony import */ var _shipments_shipments_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shipments/shipments.module */ 4196);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _managers_managers_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../managers/managers.module */ 8147);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/toast */ 8313);
/* harmony import */ var _dialogs_shipment_filter_dialog_shipment_filter_dialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dialogs/shipment-filter-dialog/shipment-filter-dialog.component */ 368);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/dropdown */ 4553);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/paginator */ 5302);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 1699);















class UserDesktopModule {
  static ɵfac = function UserDesktopModule_Factory(t) {
    return new (t || UserDesktopModule)();
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
    type: UserDesktopModule
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _user_desktop_routing_module__WEBPACK_IMPORTED_MODULE_1__.UserDesktopRoutingModule, _news_news_module__WEBPACK_IMPORTED_MODULE_2__.NewsModule, _orders_orders_module__WEBPACK_IMPORTED_MODULE_3__.OrdersModule, _shipments_shipments_module__WEBPACK_IMPORTED_MODULE_4__.ShipmentsModule, primeng_button__WEBPACK_IMPORTED_MODULE_9__.ButtonModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClientModule, _managers_managers_module__WEBPACK_IMPORTED_MODULE_5__.ManagersModule, primeng_toast__WEBPACK_IMPORTED_MODULE_11__.ToastModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_12__.DropdownModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_13__.PaginatorModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.ReactiveFormsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](UserDesktopModule, {
    declarations: [_components_user_descktop_user_descktop_component__WEBPACK_IMPORTED_MODULE_0__.UserDescktopComponent, _dialogs_shipment_filter_dialog_shipment_filter_dialog_component__WEBPACK_IMPORTED_MODULE_6__.ShipmentFilterDialogComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _user_desktop_routing_module__WEBPACK_IMPORTED_MODULE_1__.UserDesktopRoutingModule, _news_news_module__WEBPACK_IMPORTED_MODULE_2__.NewsModule, _orders_orders_module__WEBPACK_IMPORTED_MODULE_3__.OrdersModule, _shipments_shipments_module__WEBPACK_IMPORTED_MODULE_4__.ShipmentsModule, primeng_button__WEBPACK_IMPORTED_MODULE_9__.ButtonModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClientModule, _managers_managers_module__WEBPACK_IMPORTED_MODULE_5__.ManagersModule, primeng_toast__WEBPACK_IMPORTED_MODULE_11__.ToastModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_12__.DropdownModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_13__.PaginatorModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.ReactiveFormsModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_modules_user-desktop_user-desktop_module_ts.js.map