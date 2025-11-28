"use strict";
(self["webpackChunksokrof_frontend"] = self["webpackChunksokrof_frontend"] || []).push([["default-src_app_modules_shipments_components_shipment-editor_shipment-editor_component_ts-src-a83a85"],{

/***/ 7334:
/*!*******************************************************************************************!*\
  !*** ./src/app/modules/shipments/components/shipment-editor/shipment-editor.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShipmentEditorComponent: () => (/* binding */ ShipmentEditorComponent)
/* harmony export */ });
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/dynamicdialog */ 4436);
/* harmony import */ var _transport_models_TransportMapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../transport/models/TransportMapper */ 1085);
/* harmony import */ var _models_ShippingIntervalMapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/ShippingIntervalMapper */ 5255);
/* harmony import */ var _shared_DateUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/DateUtils */ 561);
/* harmony import */ var _orders_mappers_OrderDetailMapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../orders/mappers/OrderDetailMapper */ 9556);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/api */ 8026);
/* harmony import */ var _core_locale_CalendareRuLocale__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../core/locale/CalendareRuLocale */ 2104);
/* harmony import */ var _dialogs_address_selector_dialog_address_selector_dialog_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../dialogs/address-selector-dialog/address-selector-dialog.component */ 3655);
/* harmony import */ var _transport_dialogs_new_transport_editor_new_transport_editor_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../transport/dialogs/new-transport-editor/new-transport-editor.component */ 9993);
/* harmony import */ var _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../core/error-handle/ErrorTranslator */ 8097);
/* harmony import */ var _addresses_dialogs_address_editor_dialog_address_editor_dialog_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../addresses/dialogs/address-editor-dialog/address-editor-dialog.component */ 7638);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _addresses_services_address_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../addresses/services/address.service */ 5011);
/* harmony import */ var _services_shipments_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/shipments.service */ 4738);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/table */ 6192);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! primeng/calendar */ 7411);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/dropdown */ 4553);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var primeng_radiobutton__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/radiobutton */ 3313);
/* harmony import */ var primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! primeng/inputtextarea */ 652);
/* harmony import */ var primeng_progressspinner__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! primeng/progressspinner */ 7355);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! primeng/toast */ 8313);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! primeng/dialog */ 3311);
/* harmony import */ var _shared_pipes_counterparty_fullname_pipe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../shared/pipes/counterparty-fullname.pipe */ 6892);
/* harmony import */ var _shared_pipes_currency_ru_pipe__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../shared/pipes/currency-ru.pipe */ 6219);






























function ShipmentEditorComponent_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2, "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0434\u0430\u043D\u043D\u044B\u0435...");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](3, "p-progressSpinner", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerEnd"]();
  }
}
function ShipmentEditorComponent_ng_container_12_b_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind3"](2, 1, ctx_r2.expectedDeliveryDate, "dd MMMM yyyy", "ru"));
  }
}
function ShipmentEditorComponent_ng_container_12_b_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind3"](2, 1, ctx_r3.expectedPickupDate, "dd MMMM yyyy", "ru"));
  }
}
const _c0 = function () {
  return {
    "width": "100%"
  };
};
function ShipmentEditorComponent_ng_container_12_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div")(1, "div")(2, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3, "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](4, "p-dropdown", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function ShipmentEditorComponent_ng_container_12_div_18_Template_p_dropdown_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r7.selectedTransport = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "p", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ShipmentEditorComponent_ng_container_12_div_18_Template_p_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r8);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r9.showTransportEditorDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](6, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](5, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("options", ctx_r4.transports)("showClear", true)("ngModel", ctx_r4.selectedTransport);
  }
}
function ShipmentEditorComponent_ng_container_12_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div")(1, "div")(2, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3, "\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](4, "p-dropdown", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function ShipmentEditorComponent_ng_container_12_div_19_Template_p_dropdown_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r10.selectedAddress = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "p", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ShipmentEditorComponent_ng_container_12_div_19_Template_p_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r11);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r12.openAddressEditorDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](6, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](5, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("options", ctx_r5.addresses)("showClear", true)("ngModel", ctx_r5.selectedAddress);
  }
}
function ShipmentEditorComponent_ng_container_12_p_table_21_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "tr")(1, "th", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "p-tableHeaderCheckbox");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4, "\u0414\u0430\u0442\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](6, "\u041D\u043E\u043C\u0435\u0440");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](7, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](8, "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](9, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](10, "\u0412\u0435\u0441, \u043A\u0433");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](11, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](12, "\u0421\u0443\u043C\u043C\u0430, \u20BD");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](13, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](14, "\u041E\u043F\u043B\u0430\u0442\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](15, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](16, "\u041E\u0442\u0433\u0440\u0443\u0437\u043A\u0430 (\u043F\u043B\u0430\u043D)");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](17, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](18, "\u041D\u043E\u0432\u0430\u044F \u0434\u0430\u0442\u0430 \u0433\u043E\u0442\u043E\u0432\u043D\u043E\u0441\u0442\u0438");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](19, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](20, "\u0421\u043A\u043B\u0430\u0434 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](21, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](22, "Sokrof");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](23, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](24, "\u041A\u043B\u0438\u0435\u043D\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }
}
const _c1 = function () {
  return {
    "background": "#ffcccc"
  };
};
const _c2 = function () {
  return {
    "background": "white"
  };
};
function ShipmentEditorComponent_ng_container_12_p_table_21_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "p-tableCheckbox", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](9, "counterpartyFullname");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](10, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](12, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](13, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](15, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](16, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](18, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](20, "td", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](22, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](24, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](26, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ordersForShipment_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", ordersForShipment_r15);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ordersForShipment_r15.date);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ordersForShipment_r15.number);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](9, 13, ordersForShipment_r15.counterpartyName));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](12, 15, ordersForShipment_r15.weight));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](15, 17, ordersForShipment_r15.documentAmount));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ordersForShipment_r15.cashPayment ? "\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0435\u0442" : "\u0411\u0435\u0437\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0435\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ordersForShipment_r15.shipmentDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngStyle", ordersForShipment_r15.transferDate ? _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](19, _c1) : _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](20, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ordersForShipment_r15.transferDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ordersForShipment_r15.shipmentWarehouseName);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ordersForShipment_r15.responsible_sokrof);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ordersForShipment_r15.client_fio);
  }
}
const _c3 = function () {
  return {
    "min-width": "50rem"
  };
};
function ShipmentEditorComponent_ng_container_12_p_table_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "p-table", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("selectionChange", function ShipmentEditorComponent_ng_container_12_p_table_21_Template_p_table_selectionChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r17);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r16.selectedOrders = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, ShipmentEditorComponent_ng_container_12_p_table_21_ng_template_1_Template, 25, 0, "ng-template", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](2, ShipmentEditorComponent_ng_container_12_p_table_21_ng_template_2_Template, 28, 21, "ng-template", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", ctx_r6.ordersForShipment)("selection", ctx_r6.selectedOrders)("paginator", (ctx_r6.ordersForShipment == null ? null : ctx_r6.ordersForShipment.length) > 12)("rows", 12)("tableStyle", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](6, _c3))("styleClass", "p-datatable-sm");
  }
}
function ShipmentEditorComponent_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "i", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3, " \u0411\u043B\u0438\u0436\u0430\u0439\u0448\u0430\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430\u044F \u0434\u0430\u0442\u0430 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438 -\n");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](4, ShipmentEditorComponent_ng_container_12_b_4_Template, 3, 5, "b", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](5, ShipmentEditorComponent_ng_container_12_b_5_Template, 3, 5, "b", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "div", 16)(7, "div", 17)(8, "div")(9, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](10, "\u0416\u0435\u043B\u0430\u0435\u043C\u0430\u044F \u0434\u0430\u0442\u0430 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438/\u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](11, "p-calendar", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function ShipmentEditorComponent_ng_container_12_Template_p_calendar_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r18.expandedDeliveryDate = $event);
    })("ngModelChange", function ShipmentEditorComponent_ng_container_12_Template_p_calendar_ngModelChange_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r19);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r20.getAllOrdersForShipment());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](12, "div", 19)(13, "div")(14, "div")(15, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](16, "\u041E\u0440\u0438\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u043E\u0447\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](17, "p-dropdown", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function ShipmentEditorComponent_ng_container_12_Template_p_dropdown_ngModelChange_17_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r19);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r21.selectedInterval = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](18, ShipmentEditorComponent_ng_container_12_div_18_Template, 7, 6, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](19, ShipmentEditorComponent_ng_container_12_div_19_Template, 7, 6, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](20, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](21, ShipmentEditorComponent_ng_container_12_p_table_21_Template, 3, 7, "p-table", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](22, "div")(23, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](24, "\u041E\u0440\u0438\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u043E\u0447\u043D\u044B\u0439 \u0432\u0435\u0441 \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u0438: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](25, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](27, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](28, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](29, "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](30, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](32, "currencyRu");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](33, "div", 23)(34, "span", 24)(35, "textarea", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function ShipmentEditorComponent_ng_container_12_Template_textarea_ngModelChange_35_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r19);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r22.comment = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](36, "label", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](37, "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u0434\u043B\u044F \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](38, "p-button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ShipmentEditorComponent_ng_container_12_Template_p_button_click_38_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r19);
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r23.onSave());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.deliveryType === "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.deliveryType === "\u0421\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("readonlyInput", true)("minDate", ctx_r1.minShippingDate)("maxDate", ctx_r1.shippingCalendar[ctx_r1.shippingCalendar.length - 1])("disabledDates", ctx_r1.missingDates)("ngModel", ctx_r1.expandedDeliveryDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](22, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("options", ctx_r1.intervals)("showClear", true)("ngModel", ctx_r1.selectedInterval);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.deliveryType === "\u0421\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.deliveryType === "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", (ctx_r1.ordersForShipment == null ? null : ctx_r1.ordersForShipment.length) > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](27, 18, ctx_r1.getSummaryWeight()));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](32, 20, ctx_r1.getSummaryPrice()));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngModel", ctx_r1.comment);
  }
}
const _c4 = function () {
  return {
    width: "30vw"
  };
};
class ShipmentEditorComponent {
  dialogService;
  addressService;
  shipmentsService;
  primengConfig;
  messageService;
  router;
  deliveryType;
  expectedDeliveryDate = new Date();
  expectedPickupDate = new Date();
  expandedDeliveryDate;
  transports = [];
  selectedTransport;
  selectedOrders = [];
  ref;
  isLoading = true;
  transportMapper = new _transport_models_TransportMapper__WEBPACK_IMPORTED_MODULE_0__.TransportMapper();
  shippingIntervalMapper = new _models_ShippingIntervalMapper__WEBPACK_IMPORTED_MODULE_1__.ShippingIntervalMapper();
  deliveryIntervals = [];
  pickupIntervals = [];
  intervals = [];
  selectedInterval;
  orderMapper = new _orders_mappers_OrderDetailMapper__WEBPACK_IMPORTED_MODULE_3__.OrderDetailMapper();
  ordersForShipment;
  shippingCalendar = [];
  missingDates = [];
  comment;
  minShippingDate;
  ignoreNonUniqueAddresses = false;
  selectCarsQuantityModalIsVisible = false;
  warningOfDifferentCarsModalIsVisible = false;
  addresses = [];
  selectedAddress;
  blockSubmitButton = false;
  constructor(dialogService, addressService, shipmentsService, primengConfig, messageService, router) {
    this.dialogService = dialogService;
    this.addressService = addressService;
    this.shipmentsService = shipmentsService;
    this.primengConfig = primengConfig;
    this.messageService = messageService;
    this.router = router;
  }
  ngOnInit() {
    this.getAddresses();
    this.primengConfig.setTranslation(_core_locale_CalendareRuLocale__WEBPACK_IMPORTED_MODULE_4__.CALENDAR_RU_LOCALE);
    this.shipmentsService.getDataForEditor().subscribe({
      next: response => {
        this.transports = response.response.transport.data.map(item => this.transportMapper.mapRuToEng(item));
        this.expectedDeliveryDate = new Date(response.response?.nearest_available_dates?.data.delivery_date);
        this.expectedPickupDate = new Date(response.response?.nearest_available_dates?.data["pick-up_date"]);
        this.deliveryIntervals = response.response.shipping_intervals.data.delivery_intervals.map(this.shippingIntervalMapper.mapRuToEng);
        this.pickupIntervals = response.response.shipping_intervals.data.pickup_intervals.map(this.shippingIntervalMapper.mapRuToEng);
        this.shippingCalendar = response.response.shipping_calendar.data.map(date => new Date(date));
        this.getMissingDates();
      },
      error: e => {},
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  getSummaryWeight() {
    if (this.selectedOrders?.length === 0) {
      return 0;
    }
    let sum = 0;
    this.selectedOrders.forEach(order => {
      sum += order.weight;
    });
    return sum;
  }
  getSummaryPrice() {
    if (this.selectedOrders?.length === 0) {
      return 0;
    }
    let sum = 0;
    this.selectedOrders.forEach(order => {
      sum += order.documentAmount;
    });
    return sum;
  }
  onSave() {
    if (!this.blockSubmitButton) {
      this.blockSubmitButton = true;
      this.createShipment();
    }
  }
  createShipment() {
    const shipmentRequest = {
      delivery_shipping_date: this.getDeliveryShippingDate(),
      interval_id: this.selectedInterval?.intervalId,
      vehicle_id: this.deliveryType === 'Самовывоз' ? this.selectedTransport?.id : null,
      delivery_address_id: this.selectedAddress?.id,
      orders: this.selectedOrders.map(order => {
        return {
          order_id: order.id
        };
      }),
      is_delivery: this.deliveryType === 'Доставка' ? "1" : '',
      comments: this.comment
    };
    this.shipmentsService.createShipment(shipmentRequest).subscribe({
      next: response => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Отгрузка создана'
        });
        setTimeout(() => {
          this.blockSubmitButton = false;
          this.router.navigate(['/shipments']).then();
        }, 2000);
      },
      error: error => {
        this.blockSubmitButton = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_7__.ErrorTranslator.translate(_core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_7__.ErrorTranslator.prepare(error)),
          life: 10000
        });
      }
    });
  }
  checkAddressForAllOrders() {
    this.selectedOrders.forEach(order => {
      if (!order.deliveryAddressID) {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Необходимо указать адрес доставки для каждого выбранного заказа',
          life: 3000
        });
        return false;
      }
    });
    return true;
  }
  checkUniqueAddressesForAllOrders() {
    const ids = new Set();
    this.selectedOrders.map(order => order.deliveryAddressID).forEach(id => {
      if (!ids.has(id)) {
        ids.add(id);
      }
    });
    return ids.size <= 1;
  }
  getDeliveryShippingDate() {
    if (this.expandedDeliveryDate) {
      return _shared_DateUtils__WEBPACK_IMPORTED_MODULE_2__.DateUtils.formatDate(this.expandedDeliveryDate);
    }
    return "";
  }
  showTransportEditorDialog() {
    {
      this.ref = this.dialogService.open(_transport_dialogs_new_transport_editor_new_transport_editor_component__WEBPACK_IMPORTED_MODULE_6__.NewTransportEditorComponent, {
        header: "Добавить транспорт",
        width: '40%',
        height: '60%',
        style: {
          overflowY: 'none'
        },
        baseZIndex: 10000
      });
      this.ref.onClose.subscribe(response => {
        if (response) {
          this.transports.unshift({
            id: response.response.id,
            brand: response.response.brand,
            license_plate: response.response.license_plate,
            fullName: `${response.response.brand} (${response.response.license_plate})`,
            vehicle_type: response.response.vehicle_type
          });
          this.selectedTransport = this.transports[0];
        }
      });
    }
  }
  onChangeMode() {
    if (this.deliveryType === 'Доставка') {
      this.intervals = this.deliveryIntervals;
    } else if (this.deliveryType === 'Самовывоз') {
      this.intervals = this.pickupIntervals;
    }
    this.minShippingDate = this.getEarliestDate();
    this.selectedOrders = [];
  }
  getEarliestDate() {
    const date1 = new Date(this.shippingCalendar[0]);
    const date2 = this.deliveryType === 'Доставка' ? new Date(this.expectedDeliveryDate) : new Date(this.expectedPickupDate);
    // Преобразование дат в миллисекунды для сравнения
    const timestamp1 = date1.getTime();
    const timestamp2 = date2.getTime();
    // Получение минимального временного штампа
    const minTimestamp = Math.max(timestamp1, timestamp2);
    // Преобразование обратно в объект Date для возвращения
    return new Date(minTimestamp);
  }
  getAllOrdersForShipment() {
    let formatDate = _shared_DateUtils__WEBPACK_IMPORTED_MODULE_2__.DateUtils.formatDate(this.expandedDeliveryDate);
    this.shipmentsService.getAllOrdersForShipment(formatDate).subscribe(response => {
      let orderDetails = response.response.orders_for_shipment.data;
      if (orderDetails) {
        this.ordersForShipment = orderDetails.map(this.orderMapper.mapRuToEng);
      }
    });
  }
  changeDeliveryAddress(order) {
    this.ref = this.dialogService.open(_dialogs_address_selector_dialog_address_selector_dialog_component__WEBPACK_IMPORTED_MODULE_5__.AddressSelectorDialogComponent, {
      header: "Адрес доставки",
      width: '40%',
      height: 'auto',
      style: {
        overflowY: 'none'
      },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe(response => {
      if (response) {
        order.deliveryAddress = response.address;
        order.deliveryAddressID = response.addressId;
      }
    });
  }
  getMissingDates() {
    const sortedDates = this.shippingCalendar.sort((a, b) => a.getTime() - b.getTime());
    const firstDate = sortedDates[0];
    const lastDate = sortedDates[sortedDates.length - 1];
    const allDatesBetween = [];
    let currentDate = new Date(firstDate);
    while (currentDate.getTime() <= lastDate.getTime()) {
      allDatesBetween.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.missingDates = allDatesBetween.filter(date => !sortedDates.find(d => d.getTime() === date.getTime()));
  }
  onSelectOneCarAndSendShipment() {
    this.selectCarsQuantityModalIsVisible = false;
    this.createShipment();
  }
  showWarningModal() {
    this.selectCarsQuantityModalIsVisible = false;
    this.warningOfDifferentCarsModalIsVisible = true;
  }
  onCloseWarningOfDifferentCarsModal() {
    this.warningOfDifferentCarsModalIsVisible = false;
  }
  getAddresses() {
    this.addressService.findAll().subscribe({
      next: addresses => {
        this.addresses = addresses;
      },
      error: error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_7__.ErrorTranslator.translate(_core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_7__.ErrorTranslator.prepare(error)),
          life: 30000
        });
      }
    });
  }
  openAddressEditorDialog() {
    this.ref = this.dialogService.open(_addresses_dialogs_address_editor_dialog_address_editor_dialog_component__WEBPACK_IMPORTED_MODULE_8__.AddressEditorDialogComponent, {
      header: "Добавить адрес",
      width: '40%',
      height: 'auto',
      style: {
        overflowY: 'none'
      },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe(response => {
      if (response) {
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Адрес добавлен'
        });
        const newAddress = {
          id: response.response.delivery_addresses_id,
          addressFullName: response.response.full_delivery_addresses
        };
        this.addresses.unshift(newAddress);
        this.selectedAddress = newAddress;
        // this.getAddresses();
      }
    });
  }

  static ɵfac = function ShipmentEditorComponent_Factory(t) {
    return new (t || ShipmentEditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_14__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_addresses_services_address_service__WEBPACK_IMPORTED_MODULE_9__.AddressService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_services_shipments_service__WEBPACK_IMPORTED_MODULE_10__.ShipmentsService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_15__.PrimeNGConfig), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_15__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_16__.Router));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
    type: ShipmentEditorComponent,
    selectors: [["app-shipment-editor"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵProvidersFeature"]([primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_14__.DialogService, primeng_api__WEBPACK_IMPORTED_MODULE_15__.MessageService])],
    decls: 25,
    vars: 18,
    consts: [[1, "page-title"], [1, "page-title", "page-title-h2"], [1, "card", "flex"], [1, "flex", "flex-wrap", "gap-3"], [1, "flex"], ["value", "\u0421\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437", "label", "\u0421\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437", 3, "ngModel", "ngModelChange"], ["value", "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430", "label", "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430", 3, "ngModel", "ngModelChange"], [4, "ngIf"], ["header", "\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435!", 3, "visible", "modal", "draggable", "resizable", "visibleChange"], [1, "mb-2"], ["label", "\u0412 \u043E\u0434\u043D\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u0435", "severity", "primary", 1, "mt-3", 3, "click"], ["label", "\u0420\u0430\u0437\u043D\u044B\u043C\u0438 \u043C\u0430\u0448\u0438\u043D\u0430\u043C\u0438", "severity", "primary", 1, "mt-3", "ml-3", 3, "click"], [1, "m-0"], ["label", "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", "severity", "danger", 1, "mt-3", 3, "click"], ["styleClass", "w-4rem h-4rem", "strokeWidth", "8", "fill", "var(--surface-ground)", "animationDuration", ".5s"], [1, "pi", "pi-info-circle", 2, "color", "blue"], [1, "grid"], [1, "col-3"], [3, "readonlyInput", "minDate", "maxDate", "disabledDates", "ngModel", "ngModelChange"], [1, "col-5"], ["emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "optionLabel", "name", "placeholder", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435", 3, "options", "showClear", "ngModel", "ngModelChange"], ["dataKey", "id", 3, "value", "selection", "paginator", "rows", "tableStyle", "styleClass", "selectionChange", 4, "ngIf"], [1, "gray-text"], [1, "mt-5"], [1, "p-float-label"], ["id", "float-input", "rows", "5", "cols", "30", "pInputTextarea", "", 2, "width", "100%", 3, "ngModel", "ngModelChange"], ["for", "float-input"], ["label", "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0443", "icon", "pi pi-save", "iconPos", "left", "severity", "success", 1, "mt-3", 3, "click"], ["emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "optionLabel", "fullName", "placeholder", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435", 3, "options", "showClear", "ngModel", "ngModelChange"], [1, "green-link", "cursor-pointer", 3, "click"], ["emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "optionLabel", "addressFullName", "placeholder", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435", 3, "options", "showClear", "ngModel", "ngModelChange"], ["dataKey", "id", 3, "value", "selection", "paginator", "rows", "tableStyle", "styleClass", "selectionChange"], ["pTemplate", "header"], ["pTemplate", "body"], [2, "width", "4rem"], [3, "value"], [3, "ngStyle"]],
    template: function ShipmentEditorComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "p-toast");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "p", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2, "\u041D\u043E\u0432\u0430\u044F \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0430");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "p", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4, "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "div", 2)(6, "div", 3)(7, "div", 4)(8, "p-radioButton", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function ShipmentEditorComponent_Template_p_radioButton_ngModelChange_8_listener($event) {
          return ctx.deliveryType = $event;
        })("ngModelChange", function ShipmentEditorComponent_Template_p_radioButton_ngModelChange_8_listener() {
          return ctx.onChangeMode();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](9, "div", 4)(10, "p-radioButton", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function ShipmentEditorComponent_Template_p_radioButton_ngModelChange_10_listener($event) {
          return ctx.deliveryType = $event;
        })("ngModelChange", function ShipmentEditorComponent_Template_p_radioButton_ngModelChange_10_listener() {
          return ctx.onChangeMode();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](11, ShipmentEditorComponent_ng_container_11_Template, 4, 0, "ng-container", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](12, ShipmentEditorComponent_ng_container_12_Template, 39, 23, "ng-container", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](13, "p-dialog", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("visibleChange", function ShipmentEditorComponent_Template_p_dialog_visibleChange_13_listener($event) {
          return ctx.selectCarsQuantityModalIsVisible = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](14, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](15, " \u0412\u044B\u0431\u0440\u0430\u043D\u044B \u0437\u0430\u043A\u0430\u0437\u044B \u0441 \u0440\u0430\u0437\u043D\u044B\u043C\u0438 \u0430\u0434\u0440\u0435\u0441\u0430\u043C\u0438 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](16, "p", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](17, " \u0414\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u044B \u0432 \u043E\u0434\u043D\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u0435? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](18, "div")(19, "p-button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ShipmentEditorComponent_Template_p_button_click_19_listener() {
          return ctx.onSelectOneCarAndSendShipment();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](20, "p-button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ShipmentEditorComponent_Template_p_button_click_20_listener() {
          return ctx.showWarningModal();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](21, "p-dialog", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("visibleChange", function ShipmentEditorComponent_Template_p_dialog_visibleChange_21_listener($event) {
          return ctx.warningOfDifferentCarsModalIsVisible = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](22, "p", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](23, " \u0414\u043B\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 \u043D\u0430 \u0440\u0430\u0437\u043D\u044B\u0435 \u0430\u0434\u0440\u0435\u0441\u0430 \u0440\u0430\u0437\u043D\u044B\u043C\u0438 \u043C\u0430\u0448\u0438\u043D\u0430\u043C\u0438 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u0440\u0430\u0437\u043D\u044B\u0435 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043A\u0430\u0437\u044B \u0441 \u043E\u0434\u0438\u043D\u0430\u043A\u043E\u0432\u044B\u043C\u0438 \u0430\u0434\u0440\u0435\u0441\u0430\u043C\u0438 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](24, "p-button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ShipmentEditorComponent_Template_p_button_click_24_listener() {
          return ctx.onCloseWarningOfDifferentCarsModal();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngModel", ctx.deliveryType);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngModel", ctx.deliveryType);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.deliveryType);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](16, _c4));
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("visible", ctx.selectCarsQuantityModalIsVisible)("modal", true)("draggable", false)("resizable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](17, _c4));
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("visible", ctx.warningOfDifferentCarsModalIsVisible)("modal", true)("draggable", false)("resizable", false);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgStyle, primeng_table__WEBPACK_IMPORTED_MODULE_18__.Table, primeng_api__WEBPACK_IMPORTED_MODULE_15__.PrimeTemplate, primeng_table__WEBPACK_IMPORTED_MODULE_18__.TableCheckbox, primeng_table__WEBPACK_IMPORTED_MODULE_18__.TableHeaderCheckbox, primeng_button__WEBPACK_IMPORTED_MODULE_19__.Button, primeng_calendar__WEBPACK_IMPORTED_MODULE_20__.Calendar, primeng_dropdown__WEBPACK_IMPORTED_MODULE_21__.Dropdown, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.NgModel, primeng_radiobutton__WEBPACK_IMPORTED_MODULE_23__.RadioButton, primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_24__.InputTextarea, primeng_progressspinner__WEBPACK_IMPORTED_MODULE_25__.ProgressSpinner, primeng_toast__WEBPACK_IMPORTED_MODULE_26__.Toast, primeng_dialog__WEBPACK_IMPORTED_MODULE_27__.Dialog, _angular_common__WEBPACK_IMPORTED_MODULE_17__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_17__.DatePipe, _shared_pipes_counterparty_fullname_pipe__WEBPACK_IMPORTED_MODULE_11__.CounterpartyFullnamePipe, _shared_pipes_currency_ru_pipe__WEBPACK_IMPORTED_MODULE_12__.CurrencyRuPipe],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 6695:
/*!***************************************************************************************!*\
  !*** ./src/app/modules/shipments/components/shipment-list/shipment-list.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShipmentListComponent: () => (/* binding */ ShipmentListComponent)
/* harmony export */ });
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/api */ 8026);
/* harmony import */ var _shared_DateUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/DateUtils */ 561);
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/dynamicdialog */ 4436);
/* harmony import */ var _user_desktop_dialogs_shipment_filter_dialog_shipment_filter_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../user-desktop/dialogs/shipment-filter-dialog/shipment-filter-dialog.component */ 368);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 655);
/* harmony import */ var _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/error-handle/ErrorTranslator */ 8097);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_shipments_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/shipments.service */ 4738);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../app.service */ 2266);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/table */ 6192);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/calendar */ 7411);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/dropdown */ 4553);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/paginator */ 5302);
/* harmony import */ var primeng_multiselect__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/multiselect */ 7524);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/toast */ 8313);
/* harmony import */ var _shared_pipes_shipment_status_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/pipes/shipment-status.pipe */ 258);























const _c0 = ["paginator"];
function ShipmentListComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 24)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const group_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](group_r4.label);
  }
}
function ShipmentListComponent_ng_template_41_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr", 26)(1, "td", 27)(2, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "\u041E\u0442\u0433\u0440\u0443\u0437\u043A\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0444\u0438\u043B\u044C\u0442\u0440\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
}
function ShipmentListComponent_ng_template_41_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr", 26)(1, "td", 27)(2, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "\u00A0\u00A0\u00A0loading ...");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
}
function ShipmentListComponent_ng_template_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr")(1, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "\u0414\u0430\u0442\u0430 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438 (\u043F\u043B\u0430\u043D)");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "\u041D\u043E\u043C\u0435\u0440");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "\u0421\u0442\u0430\u0442\u0443\u0441");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430/\u0421\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "\u0421\u043A\u043B\u0430\u0434 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12, "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, "\u0421\u0443\u043C\u043C\u0430, \u20BD");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16, "\u0412\u0435\u0441, \u043A\u0433");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](18, "Sokrof");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20, "\u041A\u043B\u0438\u0435\u043D\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](21, ShipmentListComponent_ng_template_41_tr_21_Template, 4, 0, "tr", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](22, ShipmentListComponent_ng_template_41_tr_22_Template, 5, 0, "tr", 25);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.globalThis.stateLoadShipments == "loaded" && ctx_r1.shipmentService.shipments.length == 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.globalThis.stateLoadShipments != "loaded");
  }
}
function ShipmentListComponent_ng_template_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ShipmentListComponent_ng_template_42_Template_tr_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r9);
      const shipment_r7 = restoredCtx.$implicit;
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r8.goToShipmentPage(shipment_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](7, "shipmentStatus");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](13, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](16, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](19, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const shipment_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](shipment_r7.shipping_date);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](shipment_r7.shipment_number);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](7, 10, shipment_r7.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](shipment_r7.delivery_type == null ? null : shipment_r7.delivery_type.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](shipment_r7.shipping_warehouse_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("innerHTML", shipment_r7.counterparty_name, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](16, 12, shipment_r7.sum));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](19, 14, shipment_r7.weight));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](shipment_r7.responsible_sokrof);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](shipment_r7.client_fio);
  }
}
function ShipmentListComponent_ng_container_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "p-paginator", 33, 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onPageChange", function ShipmentListComponent_ng_container_46_Template_p_paginator_onPageChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r11.onPageChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rows", 12)("totalRecords", ctx_r3.shipmentService.maxPage * 12);
  }
}
const _c1 = function () {
  return {
    "width": "100%"
  };
};
const _c2 = function () {
  return {
    "min-width": "150rem"
  };
};
class ShipmentListComponent {
  shipmentService;
  router;
  messageService;
  dialogService;
  appService;
  paginator;
  shipmentTypes = [];
  statuses = [];
  sortOrders = [];
  dialogRef;
  first = 0;
  globalThis = globalThis;
  constructor(shipmentService, router, messageService, dialogService, appService) {
    this.shipmentService = shipmentService;
    this.router = router;
    this.messageService = messageService;
    this.dialogService = dialogService;
    this.appService = appService;
  }
  ngOnInit() {
    this.initStatuses();
    this.initShipmentTypes();
    this.initSorting();
    this.initSokrofResponders();
    this.initFilterForm();
    this.shipmentService.resetFilters();
    this.shipmentService.filterForm.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.debounceTime)(300)).subscribe(() => {
      const e = new Event('click');
      this.paginator?.changePageToFirst(e);
      this._findAllByFilter(1);
    });
    this.findShipmentAndEmployees();
  }
  findShipmentAndEmployees() {
    globalThis.stateLoadShipments = '';
    const plannedDates = this.shipmentService.filterForm.value.plannedShipmentDate.map(date => _shared_DateUtils__WEBPACK_IMPORTED_MODULE_0__.DateUtils.formatDate(date)).join(' ');
    this.shipmentService.findAll(plannedDates, this.messageService);
    this._findAllByFilter(1);
    this.subscribeToFakeSocket();
  }
  subscribeToFakeSocket() {
    this.appService.fakeSocketData$.subscribe(data => {
      const updatedShipments = data?.update_shipments?.data;
      if (updatedShipments) {
        this.shipmentService.shipments?.forEach(s => {
          const matchingShipment = updatedShipments.find(u => s.shipment_id === u.shipment_id);
          if (matchingShipment) {
            s.status = matchingShipment.status;
          }
        });
      }
    });
  }
  createShipment() {
    this.router.navigate(['/shipments/edit']);
  }
  initStatuses() {
    this.statuses.push({
      label: 'На обработке',
      value: 'in_processing'
    });
    this.statuses.push({
      label: 'Обработана',
      value: 'processed'
    });
    this.statuses.push({
      label: 'Отменена',
      value: 'canceled'
    });
  }
  openFilterDialog() {
    this.initSokrofResponders();
    this.dialogRef = this.dialogService.open(_user_desktop_dialogs_shipment_filter_dialog_shipment_filter_dialog_component__WEBPACK_IMPORTED_MODULE_1__.ShipmentFilterDialogComponent, {
      header: "Дополнительные параметры фильтрации",
      width: '800px',
      style: {
        overflowY: 'none'
      },
      baseZIndex: 10000
    });
    this.dialogRef.onClose.subscribe(data => {
      this._findAllByFilter(1);
    });
  }
  initShipmentTypes() {
    this.shipmentTypes.push({
      label: 'Доставка',
      value: 'delivery'
    });
    this.shipmentTypes.push({
      label: 'Самовывоз',
      value: 'pickup'
    });
  }
  initSorting() {
    this.sortOrders.push({
      label: 'Дата отгрузки: раньше',
      value: 'shipping_date_is_earlier'
    });
    this.sortOrders.push({
      label: 'Дата отгрузки: позже',
      value: 'shipping_date_later'
    });
  }
  initSokrofResponders() {
    this.shipmentService.sokrofResponders = [{
      value: this.appService.sessionConfig?.manager_id,
      label: this.appService.sessionConfig?.manager_fio
    }];
  }
  onPageChange($event) {
    this._findAllByFilter($event.page + 1);
  }
  goToShipmentPage(shipment) {
    this.router.navigate(['/shipments/page'], {
      queryParams: {
        shipment_id: shipment.shipment_id
      }
    });
  }
  initFilterForm() {
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    this.shipmentService.filterForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroup({
      plannedShipmentDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl([oneMonthAgo, currentDate]),
      statuses: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl([]),
      shipmentType: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl(null),
      responder: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl(null),
      sort: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl(this.sortOrders[0]),
      counterparty: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl(null),
      shippingWarehouse: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl(null),
      sokrof: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl(null)
    });
  }
  resetFilters() {
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    this.shipmentService.filterForm.patchValue({
      plannedShipmentDate: [oneMonthAgo, currentDate],
      statuses: [],
      shipmentType: null,
      responder: null,
      sort: this.sortOrders[0],
      counterparty: null,
      shippingWarehouse: null,
      sokrof: null
    });
  }
  _findAllByFilter(page) {
    globalThis.stateLoadShipments = '';
    this.shipmentService.findAllByFilter(page).subscribe({
      next: response => {
        globalThis.stateLoadShipments = 'loaded';
        this.shipmentService.maxPage = response.pagination_max_page;
        this.shipmentService.shipments = response.data;
      },
      error: error => {
        globalThis.stateLoadShipments = 'error';
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_2__.ErrorTranslator.translate(_core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_2__.ErrorTranslator.prepare(error)),
          life: 30000
        });
      }
    });
  }
  static ɵfac = function ShipmentListComponent_Factory(t) {
    return new (t || ShipmentListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_shipments_service__WEBPACK_IMPORTED_MODULE_3__.ShipmentsService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_10__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_11__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_app_service__WEBPACK_IMPORTED_MODULE_4__.AppService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: ShipmentListComponent,
    selectors: [["app-shipment-list"]],
    viewQuery: function ShipmentListComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵProvidersFeature"]([primeng_api__WEBPACK_IMPORTED_MODULE_10__.MessageService, primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_11__.DialogService])],
    decls: 47,
    vars: 27,
    consts: [[1, "page-title"], [1, "mb-2"], ["label", "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C", "icon", "pi pi-plus", "iconPos", "left", "severity", "secondary", 3, "click"], [1, "grid", 3, "formGroup"], [1, "col-2"], ["selectionMode", "range", "formControlName", "plannedShipmentDate", "dateFormat", "dd.mm.yy"], ["placeholder", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435", "formControlName", "statuses", 3, "options", "showHeader", "showClear"], ["pTemplate", "group"], ["emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "formControlName", "shipmentType", "optionLabel", "label", "placeholder", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435", 3, "options", "showClear"], ["emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "formControlName", "responder", "optionLabel", "fio2", "placeholder", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435", 3, "options", "showClear"], [1, "col-1"], [2, "color", "white"], ["label", "\u0415\u0449\u0435", "icon", "pi pi-sliders-v", "iconPos", "right", "severity", "secondary", 1, "mr-2", 3, "click"], [1, "col-3"], ["formControlName", "sort", "emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "optionLabel", "label", 3, "options", "autoDisplayFirst"], [1, "col"], [1, "green-link", 3, "click"], [3, "value", "tableStyle", "scrollable"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "mt-3"], [1, "flex", "justify-content-center", "flex-wrap"], [1, "flex", "align-items-center", "justify-content-center"], [4, "ngIf"], [1, "flex", "align-items-center"], ["style", "background-color: #fff;", 4, "ngIf"], [2, "background-color", "#fff"], ["colspan", "10"], [1, "nothing_found_text_orders"], [1, "loading_shipments"], ["data-pc-section", "icon", 1, "pi", "pi-spin", "pi-spinner", "p-button-icon", "p-button-icon-left", "ng-star-inserted"], [2, "cursor", "pointer", 3, "click"], [3, "innerHTML"], [3, "rows", "totalRecords", "onPageChange"], ["paginator", ""]],
    template: function ShipmentListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "p-toast");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "p", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "\u041E\u0442\u0433\u0440\u0443\u0437\u043A\u0438");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 1)(4, "p-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ShipmentListComponent_Template_p_button_click_4_listener() {
          return ctx.createShipment();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 3)(6, "div", 4)(7, "div")(8, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "\u041F\u041B\u0410\u041D\u0418\u0420\u0423\u0415\u041C\u0410\u042F \u041E\u0422\u0413\u0420\u0423\u0417\u041A\u0410");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](10, "p-calendar", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "div", 4)(12, "div")(13, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, "\u0421\u0422\u0410\u0422\u0423\u0421");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "p-multiSelect", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, ShipmentListComponent_ng_template_16_Template, 3, 1, "ng-template", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "div", 4)(18, "div")(19, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20, "\u0422\u0418\u041F \u041E\u0422\u0413\u0420\u0423\u0417\u041A\u0418");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](21, "p-dropdown", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "div", 4)(23, "div")(24, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](25, "\u041E\u0422\u0412\u0415\u0422\u0421\u0422\u0412\u0415\u041D\u041D\u042B\u0419");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](26, "p-dropdown", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](27, "div", 10)(28, "div")(29, "small", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](30, "/");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](31, "p-button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ShipmentListComponent_Template_p_button_click_31_listener() {
          return ctx.openFilterDialog();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](32, "div", 13)(33, "div")(34, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](35, "\u0421\u041E\u0420\u0422\u0418\u0420\u041E\u0412\u0410\u0422\u042C");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](36, "p-dropdown", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](37, "div", 15)(38, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ShipmentListComponent_Template_span_click_38_listener() {
          return ctx.resetFilters();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](39, "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](40, "p-table", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](41, ShipmentListComponent_ng_template_41_Template, 23, 2, "ng-template", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](42, ShipmentListComponent_ng_template_42_Template, 24, 16, "ng-template", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](43, "div", 20)(44, "div", 21)(45, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](46, ShipmentListComponent_ng_container_46_Template, 3, 2, "ng-container", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx.shipmentService.filterForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](22, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx.statuses)("showHeader", false)("showClear", (ctx.shipmentService.filterForm.value["statuses"] == null ? null : ctx.shipmentService.filterForm.value["statuses"].length) > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](23, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx.shipmentTypes)("showClear", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](24, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx.shipmentService.responders)("showClear", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](25, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx.sortOrders)("autoDisplayFirst", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx.shipmentService.shipments)("tableStyle", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](26, _c2))("scrollable", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.shipmentService.maxPage > 1);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, primeng_table__WEBPACK_IMPORTED_MODULE_13__.Table, primeng_api__WEBPACK_IMPORTED_MODULE_10__.PrimeTemplate, primeng_button__WEBPACK_IMPORTED_MODULE_14__.Button, primeng_calendar__WEBPACK_IMPORTED_MODULE_15__.Calendar, primeng_dropdown__WEBPACK_IMPORTED_MODULE_16__.Dropdown, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, primeng_paginator__WEBPACK_IMPORTED_MODULE_17__.Paginator, primeng_multiselect__WEBPACK_IMPORTED_MODULE_18__.MultiSelect, primeng_toast__WEBPACK_IMPORTED_MODULE_19__.Toast, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_12__.DecimalPipe, _shared_pipes_shipment_status_pipe__WEBPACK_IMPORTED_MODULE_5__.ShipmentStatusPipe],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 6498:
/*!***************************************************************************************!*\
  !*** ./src/app/modules/shipments/components/shipment-page/shipment-page.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShipmentPageComponent: () => (/* binding */ ShipmentPageComponent)
/* harmony export */ });
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/api */ 8026);
/* harmony import */ var _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/error-handle/ErrorTranslator */ 8097);
/* harmony import */ var _managers_dialogs_managermessage_dialog_manager_message_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../managers/dialogs/managermessage-dialog/manager-message-dialog.component */ 4424);
/* harmony import */ var _managers_ManagerMessageUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../managers/ManagerMessageUtil */ 7734);
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/dynamicdialog */ 4436);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _services_shipments_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/shipments.service */ 4738);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../app.service */ 2266);
/* harmony import */ var _shared_services_file_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/file.service */ 38);
/* harmony import */ var _waybills_waybills_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../waybills/waybills.service */ 3084);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/table */ 6192);
/* harmony import */ var primeng_divider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/divider */ 920);
/* harmony import */ var primeng_tag__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/tag */ 2455);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/toast */ 8313);
/* harmony import */ var _employees_components_employee_card_employee_card_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../employees/components/employee-card/employee-card.component */ 6971);
/* harmony import */ var _shared_pipes_order_status_pipe_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../shared/pipes/order-status-pipe.pipe */ 7748);




















function ShipmentPageComponent_ng_container_6_p_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, " \u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4, ", \u041F\u043E \u0430\u0434\u0440\u0435\u0441\u0443: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r1.shipmentDetails.response.shipment_details["\u0414\u0430\u0442\u0430\u041E\u0442\u0433\u0440\u0443\u0437\u043A\u0438"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r1.shipmentDetails.response.shipment_details["\u0410\u0434\u0440\u0435\u0441\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0438\u0421\u0442\u0440\u043E\u043A\u0430"]);
  }
}
function ShipmentPageComponent_ng_container_6_p_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, " \u0421\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.shipmentDetails.response.shipment_details["\u0414\u0430\u0442\u0430\u041E\u0442\u0433\u0440\u0443\u0437\u043A\u0438"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", ctx_r2.shipmentDetails.response.shipment_details["\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u043E\u0435\u0421\u0440\u0435\u0434\u0441\u0442\u0432\u043E\u041C\u0430\u0440\u043A\u0430"], " ");
  }
}
function ShipmentPageComponent_ng_container_6_p_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "p")(1, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function ShipmentPageComponent_ng_container_6_p_16_Template_i_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r8);
      const waybill_r6 = restoredCtx.$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r7.downloadWaybill(waybill_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function ShipmentPageComponent_ng_container_6_p_16_Template_span_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r8);
      const waybill_r6 = restoredCtx.$implicit;
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r9.downloadWaybill(waybill_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const waybill_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("\u041D\u0430\u043A\u043B\u0430\u0434\u043D\u0430\u044F \u2116 ", waybill_r6["\u041D\u043E\u043C\u0435\u0440"], "");
  }
}
function ShipmentPageComponent_ng_container_6_ng_template_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "tr")(1, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "\u0414\u0430\u0442\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4, "\u041D\u043E\u043C\u0435\u0440");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6, "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8, "\u0412\u0435\u0441, \u043A\u0433.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](10, "\u0421\u0443\u043C\u043C\u0430, \u20BD");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](12, "\u041E\u043F\u043B\u0430\u0442\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](14, "\u041E\u0442\u0433\u0440\u0443\u0437\u043A\u0430 (\u043F\u043B\u0430\u043D)");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](16, "\u041D\u043E\u0432\u0430\u044F \u0434\u0430\u0442\u0430 \u0433\u043E\u0442\u043E\u0432\u043D\u043E\u0441\u0442\u0438");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](18, "\u0421\u043A\u043B\u0430\u0434 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](19, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](20, "Sokrof");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](21, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](22, "\u041A\u043B\u0438\u0435\u043D\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
}
const _c0 = function (a0) {
  return {
    "red-background": a0
  };
};
function ShipmentPageComponent_ng_container_6_ng_template_45_Template(rf, ctx) {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "td", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](19, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](21, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", item_r10["\u0414\u0430\u0442\u0430\u0417\u0430\u043A\u0430\u0437\u0430\u041F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044F"], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", item_r10["\u041D\u043E\u043C\u0435\u0440\u0417\u0430\u043A\u0430\u0437\u0430\u041F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044F"], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", item_r10["\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435"], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", item_r10["\u0412\u0435\u0441"], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", item_r10["\u0421\u0443\u043C\u043C\u0430\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430"], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", item_r10["\u041D\u0430\u043B\u0438\u0447\u043D\u0430\u044F\u041E\u043F\u043B\u0430\u0442\u0430"] ? "\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0435\u0442" : "\u0411\u0435\u0437\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0435\u0442", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", item_r10["\u0414\u0430\u0442\u0430\u041E\u0442\u0433\u0440\u0443\u0437\u043A\u0438\u041F\u043B\u0430\u043D"], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](12, _c0, !!item_r10["\u0414\u0430\u0442\u0430\u041E\u0442\u0433\u0440\u0443\u0437\u043A\u0438\u041D\u043E\u0432\u0430\u044F"]));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", item_r10["\u0414\u0430\u0442\u0430\u041E\u0442\u0433\u0440\u0443\u0437\u043A\u0438\u041D\u043E\u0432\u0430\u044F"], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", item_r10["\u0421\u043A\u043B\u0430\u0434\u041E\u0442\u0433\u0440\u0443\u0437\u043A\u0438\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435"], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", item_r10["Sokrof"], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", item_r10["\u041A\u043B\u0438\u0435\u043D\u0442"], " ");
  }
}
const _c1 = function () {
  return {
    "min-width": "50rem"
  };
};
function ShipmentPageComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 4)(2, "div", 5)(3, "div", 6)(4, "div")(5, "b", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](7, "p-tag", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](8, "orderStatus");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](9, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](11, "\u0421\u043A\u043B\u0430\u0434: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](12, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](14, ShipmentPageComponent_ng_container_6_p_14_Template, 7, 2, "p", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](15, ShipmentPageComponent_ng_container_6_p_15_Template, 5, 2, "p", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](16, ShipmentPageComponent_ng_container_6_p_16_Template, 4, 1, "p", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "div", 11)(18, "div", 12)(19, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](20, " \u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043E\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u0430 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](21, "app-employee-card", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](22, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](23, " \u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 Sokrof ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](24, "app-employee-card", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](25, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function ShipmentPageComponent_ng_container_6_Template_div_click_25_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r11.sendMessageToManager());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](26, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0443");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](27, "p-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](28, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](29, "\u0417\u0430\u043A\u0430\u0437\u044B \u0432 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0435");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](30, "div", 17)(31, "div", 18)(32, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](33, " \u041E\u0440\u0438\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u043E\u0447\u043D\u044B\u0439 \u0432\u0435\u0441 \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u0438: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](34, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](36, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](37, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](38, " \u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u0430: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](39, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](40);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](41, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](42, "div", 17)(43, "p-table", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](44, ShipmentPageComponent_ng_container_6_ng_template_44_Template, 23, 0, "ng-template", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](45, ShipmentPageComponent_ng_container_6_ng_template_45_Template, 23, 14, "ng-template", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](46, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("\u2116 ", ctx_r0.shipmentDetails.response.shipment_details["\u041D\u043E\u043C\u0435\u0440"], "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("value", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](8, 16, ctx_r0.shipmentDetails.response.shipment_details["\u0421\u0442\u0430\u0442\u0443\u0441\u0418\u0414"]));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("rounded", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("innerHTML", ctx_r0.shipmentDetails.response.shipment_details["\u0413\u043E\u043B\u043E\u0432\u043D\u043E\u0439\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435"], _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r0.shipmentDetails.response.shipment_details["\u041F\u043E\u043B\u0435\u0421\u043A\u043B\u0430\u0434"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r0.shipmentDetails.response.shipment_details["\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx_r0.shipmentDetails.response.shipment_details["\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r0.shipmentDetails.response.shipment_details["\u0420\u0430\u0441\u0445\u043E\u0434\u043D\u044B\u0435\u041D\u0430\u043A\u043B\u0430\u0434\u043D\u044B\u0435"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("personName", ctx_r0.shipmentDetails.response.shipment_details["\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439\u041E\u0442\u041A\u043B\u0438\u0435\u043D\u0442\u0430"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("personName", ctx_r0.shipmentDetails.response.shipment_details["\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439Sokrof"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](36, 18, ctx_r0.shipmentDetails.response.shipment_details["\u0412\u0435\u0441\u0418\u0442\u043E\u0433\u043E"], "1.1-3"), " \u043A\u0433");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](41, 21, ctx_r0.shipmentDetails.response.shipment_details["\u0421\u0443\u043C\u043C\u0430\u0418\u0442\u043E\u0433\u043E"], "RUB"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.shipmentDetails.response.shipment_details["\u0417\u0430\u043A\u0430\u0437\u044B"])("scrollable", true)("tableStyle", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction0"](24, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("innerHTML", ctx_r0.shipmentDetails.response.shipment_details["\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439"], _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsanitizeHtml"]);
  }
}
const _c2 = function () {
  return ["/shipments"];
};
class ShipmentPageComponent {
  route;
  shipmentService;
  messageService;
  dialogService;
  appService;
  fileService;
  waybillsService;
  shipmentDetails;
  shipmentId;
  constructor(route, shipmentService, messageService, dialogService, appService, fileService, waybillsService) {
    this.route = route;
    this.shipmentService = shipmentService;
    this.messageService = messageService;
    this.dialogService = dialogService;
    this.appService = appService;
    this.fileService = fileService;
    this.waybillsService = waybillsService;
    this.route.queryParams.subscribe(params => {
      let param = params['shipment_id'];
      if (param) {
        this.shipmentId = param;
        this.getShipmentDetailsById();
      }
    });
    this.appService.fakeSocketData$.subscribe(data => {
      if (data) {
        data.update_shipments.data.forEach(shipment => {
          if (shipment.shipment_id === this.shipmentId) {
            this.shipmentDetails.response.shipment_details.СтатусИД = shipment.status;
          }
        });
      }
    });
  }
  getShipmentDetailsById() {
    this.shipmentService.getById(this.shipmentId).subscribe({
      next: response => {
        response = globalThis.decryptResponse(response);
        this.shipmentDetails = response;
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
  }
  sendMessageToManager() {
    const ref = this.dialogService.open(_managers_dialogs_managermessage_dialog_manager_message_dialog_component__WEBPACK_IMPORTED_MODULE_1__.ManagerMessageDialogComponent, {
      header: 'Ваш менеджер',
      width: '500px',
      contentStyle: {
        overflow: 'auto'
      },
      baseZIndex: 10000
    });
    ref.onClose.subscribe(response => {
      if (response) {
        _managers_ManagerMessageUtil__WEBPACK_IMPORTED_MODULE_2__.ManagerMessageUtil.showSuccessMessage(this.dialogService);
      }
    });
  }
  downloadWaybill(waybill) {
    const waybillRequest = {
      id: waybill.РасходнаяНакладнаяИД,
      number: waybill.Номер
    };
    this.waybillsService.downloadWaybill(waybillRequest).subscribe({
      next: response => {
        const url = response.response.link;
        const fileName = url.replace(/.*?\/([^\/]+\.(pdf|xlsx?))/, '$1');
        this.fileService.downloadFile(url, fileName);
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
  }
  static ɵfac = function ShipmentPageComponent_Factory(t) {
    return new (t || ShipmentPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_shipments_service__WEBPACK_IMPORTED_MODULE_3__.ShipmentsService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_11__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_12__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_app_service__WEBPACK_IMPORTED_MODULE_4__.AppService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_file_service__WEBPACK_IMPORTED_MODULE_5__.FileService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_waybills_waybills_service__WEBPACK_IMPORTED_MODULE_6__.WaybillsService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
    type: ShipmentPageComponent,
    selectors: [["app-shipment-page"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵProvidersFeature"]([primeng_api__WEBPACK_IMPORTED_MODULE_11__.MessageService, primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_12__.DialogService])],
    decls: 7,
    vars: 3,
    consts: [[1, "page-title"], [1, "mb-3"], [1, "green-link", 3, "routerLink"], [4, "ngIf"], [1, "grid"], [1, "col-8"], [1, "shipment-detail-container"], [1, "mr-3"], ["severity", "success", 3, "value", "rounded"], [3, "innerHTML"], [4, "ngFor", "ngForOf"], [1, "col-4", "pl-3"], [1, "manager-card"], [1, "manager-card-header"], [3, "personName"], [1, "green-link", 3, "click"], [1, "page-title", "page-title-h2"], [1, "mt-3"], [1, "flex", "justify-content-between", "flex-wrap"], [1, "flex", "align-items-center", "justify-content-center"], ["scrollHeight", "400px", 3, "value", "scrollable", "tableStyle"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "shipment-detail-container", "mt-2", 3, "innerHTML"], [1, "pi", "pi-download", "mr-1", 2, "font-size", "1rem", 3, "click"], [3, "ngClass"]],
    template: function ShipmentPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "p-toast");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "\u0414\u0435\u0442\u0430\u043B\u0438 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "div", 1)(4, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5, "\u2190 \u041A \u0441\u043F\u0438\u0441\u043A\u0443 \u043E\u0442\u0433\u0440\u0443\u0437\u043E\u043A");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](6, ShipmentPageComponent_ng_container_6_Template, 47, 25, "ng-container", 3);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction0"](2, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.shipmentDetails == null ? null : ctx.shipmentDetails.response == null ? null : ctx.shipmentDetails.response.shipment_details);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, primeng_table__WEBPACK_IMPORTED_MODULE_14__.Table, primeng_api__WEBPACK_IMPORTED_MODULE_11__.PrimeTemplate, primeng_divider__WEBPACK_IMPORTED_MODULE_15__.Divider, primeng_tag__WEBPACK_IMPORTED_MODULE_16__.Tag, primeng_toast__WEBPACK_IMPORTED_MODULE_17__.Toast, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterLink, _employees_components_employee_card_employee_card_component__WEBPACK_IMPORTED_MODULE_7__.EmployeeCardComponent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_13__.CurrencyPipe, _shared_pipes_order_status_pipe_pipe__WEBPACK_IMPORTED_MODULE_8__.OrderStatusPipe],
    styles: [".red-background[_ngcontent-%COMP%] {\n  background-color: #ffcccc;\n}\n\n.shipment-detail-container[_ngcontent-%COMP%] {\n  font-family: Montserrat, sans-serif;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: normal;\n  line-height: normal;\n  text-transform: none;\n  background-color: rgba(242, 242, 242, 1);\n  border-radius: 7px;\n  position: relative;\n  padding: 15px;\n}\n\n\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9zaGlwbWVudHMvY29tcG9uZW50cy9zaGlwbWVudC1wYWdlL3NoaXBtZW50LXBhZ2UuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLG1DQUFtQztFQUNuQyxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsb0JBQW9CO0VBQ3BCLHdDQUF3QztFQUN4QyxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGFBQWE7QUFDZiIsInNvdXJjZXNDb250ZW50IjpbIi5yZWQtYmFja2dyb3VuZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmY2NjYztcclxufVxyXG5cclxuLnNoaXBtZW50LWRldGFpbC1jb250YWluZXIge1xyXG4gIGZvbnQtZmFtaWx5OiBNb250c2VycmF0LCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0MiwgMjQyLCAyNDIsIDEpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDdweDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgcGFkZGluZzogMTVweDtcclxufVxyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 3655:
/*!********************************************************************************************************!*\
  !*** ./src/app/modules/shipments/dialogs/address-selector-dialog/address-selector-dialog.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddressSelectorDialogComponent: () => (/* binding */ AddressSelectorDialogComponent)
/* harmony export */ });
/* harmony import */ var _addresses_dialogs_address_editor_dialog_address_editor_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../addresses/dialogs/address-editor-dialog/address-editor-dialog.component */ 7638);
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/dynamicdialog */ 4436);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _addresses_services_address_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../addresses/services/address.service */ 5011);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/dropdown */ 4553);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 8849);








const _c0 = function () {
  return {
    "width": "100%"
  };
};
class AddressSelectorDialogComponent {
  ref;
  dialogService;
  addressService;
  addressEditorDialogRef;
  addresses = [];
  selectedAddress;
  constructor(ref, dialogService, addressService) {
    this.ref = ref;
    this.dialogService = dialogService;
    this.addressService = addressService;
    this.addressService.findAll().subscribe({
      next: addresses => {
        this.addresses = addresses;
      },
      error: error => {}
    });
  }
  openAddressEditorDialog() {
    this.addressEditorDialogRef = this.dialogService.open(_addresses_dialogs_address_editor_dialog_address_editor_dialog_component__WEBPACK_IMPORTED_MODULE_0__.AddressEditorDialogComponent, {
      header: "Добавить адрес",
      width: '40%',
      height: 'auto',
      style: {
        overflowY: 'none'
      },
      baseZIndex: 10000
    });
    this.addressEditorDialogRef.onClose.subscribe(response => {
      if (response) {
        const newAddress = {
          id: response.response.delivery_addresses_id,
          addressFullName: response.response.full_delivery_addresses
        };
        this.addresses.unshift(newAddress);
        this.selectedAddress = this.addresses[0];
      }
    });
  }
  confirm() {
    this.ref.close({
      address: this.selectedAddress.addressFullName,
      addressId: this.selectedAddress.id
    });
  }
  static ɵfac = function AddressSelectorDialogComponent_Factory(t) {
    return new (t || AddressSelectorDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_3__.DynamicDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_3__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_addresses_services_address_service__WEBPACK_IMPORTED_MODULE_1__.AddressService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: AddressSelectorDialogComponent,
    selectors: [["app-address-selector-dialog"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵProvidersFeature"]([primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_3__.DialogService])],
    decls: 4,
    vars: 5,
    consts: [["emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "appendTo", "body", "optionLabel", "addressFullName", "placeholder", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441", 3, "options", "ngModel", "ngModelChange"], [1, "green-link", 3, "click"], ["label", "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C", 3, "click"]],
    template: function AddressSelectorDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p-dropdown", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function AddressSelectorDialogComponent_Template_p_dropdown_ngModelChange_0_listener($event) {
          return ctx.selectedAddress = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "p", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AddressSelectorDialogComponent_Template_p_click_1_listener() {
          return ctx.openAddressEditorDialog();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0430\u0434\u0440\u0435\u0441");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "p-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AddressSelectorDialogComponent_Template_p_button_click_3_listener() {
          return ctx.confirm();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](4, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("options", ctx.addresses)("ngModel", ctx.selectedAddress);
      }
    },
    dependencies: [primeng_button__WEBPACK_IMPORTED_MODULE_4__.Button, primeng_dropdown__WEBPACK_IMPORTED_MODULE_5__.Dropdown, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 5255:
/*!********************************************************************!*\
  !*** ./src/app/modules/shipments/models/ShippingIntervalMapper.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShippingIntervalMapper: () => (/* binding */ ShippingIntervalMapper)
/* harmony export */ });
class ShippingIntervalMapper {
  mapEngToRU(eng) {
    return {
      Наименование: eng.name,
      ИнтервалИД: eng.intervalId,
      Порядок: eng.sequence
    };
  }
  mapRuToEng(ru) {
    return {
      name: ru.Наименование,
      intervalId: ru.ИнтервалИД,
      sequence: ru.Порядок
    };
  }
}

/***/ }),

/***/ 4738:
/*!*****************************************************************!*\
  !*** ./src/app/modules/shipments/services/shipments.service.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShipmentsService: () => (/* binding */ ShipmentsService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 9736);
/* harmony import */ var _core_constants_api_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/constants/api-url */ 8572);
/* harmony import */ var _shared_DateUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/DateUtils */ 561);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 4860);






class ShipmentsService {
  http;
  filterForm;
  shipments;
  maxPage;
  responders;
  counterparties = [];
  shipmentWarehouses = [];
  sokrofResponders = [];
  constructor(http) {
    this.http = http;
  }
  getById(shipmentId) {
    return this.http.get(_core_constants_api_url__WEBPACK_IMPORTED_MODULE_0__.API_URL + 'get_shipping_details?client_rsa_pubkey=' + encodeURIComponent(globalThis.client_rsa_pubkey), {
      params: {
        shipment_id: shipmentId
      },
      "withCredentials": true
    });
  }
  findAll(plannedDates, messageService) {
    this.http.get(_core_constants_api_url__WEBPACK_IMPORTED_MODULE_0__.API_URL + 'get_other_data', {
      params: {
        query: 'e716b4abef',
        planned_dates: plannedDates,
        client_rsa_pubkey: globalThis.client_rsa_pubkey
      },
      "withCredentials": true
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(data => globalThis.decryptResponse(data)), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(data => data.response)).subscribe(response => {
      // this.shipments = response.shipments.data;
      this.counterparties = response.counterparties.data.filter(c => c.is_confirmed === '1').map(counterparty => {
        counterparty.fullname = counterparty.fullname.replace(/&quot;/g, '"');
        counterparty.counterparty_id = counterparty.counterparty_id || counterparty.application_id;
        return counterparty;
      });
      this.shipmentWarehouses = response.shipment_warehouses.data;
      this.maxPage = response.shipments.pagination_max_page;
      if (!response.employees.error) {
        this.responders = response.employees.data;
      } else {
        messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: response.employees.error
        });
      }
    });
  }
  findAllByFilter(page) {
    const filter = this.filterForm.value;
    localStorage.setItem('shipments_list_filters', JSON.stringify(this.filterForm.value));
    return this.http.get(_core_constants_api_url__WEBPACK_IMPORTED_MODULE_0__.API_URL + 'get_all_shipments?client_rsa_pubkey=' + encodeURIComponent(globalThis.client_rsa_pubkey), {
      params: {
        page: page,
        planned_dates: filter.plannedShipmentDate?.map(date => _shared_DateUtils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.formatDate(date)).join(' ') || '',
        statuses: filter.statuses?.join(',') || '',
        shipment_type: filter.shipmentType?.value || '',
        responsible_id: filter.responder?.user_myid || '',
        counterparty_id: filter.counterparty?.counterparty_id || '',
        shipping_warehouse_id: filter.shippingWarehouse?.СкладИД || '',
        sort: filter.sort?.value || '',
        responsible_sokrof_id: filter.sokrof?.value || ''
      },
      "withCredentials": true
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(data => globalThis.decryptResponse(data)), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(r => r.response));
  }
  getDataForEditor() {
    return this.http.get(_core_constants_api_url__WEBPACK_IMPORTED_MODULE_0__.API_URL + 'get_other_data', {
      params: {
        query: '1eb6b16ad9'
      },
      "withCredentials": true
    }).pipe();
  }
  getAllOrdersForShipment(date) {
    return this.http.get(_core_constants_api_url__WEBPACK_IMPORTED_MODULE_0__.API_URL + 'get_all_orders_for_shipment?client_rsa_pubkey=' + encodeURIComponent(globalThis.client_rsa_pubkey), {
      params: {
        shipping_date: date
      },
      "withCredentials": true
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(data => globalThis.decryptResponse(data)));
  }
  createShipment(shipment) {
    var [cipher, symmetric_key_crypt] = globalThis.aes_rsa_encrypt(shipment, globalThis.server_rsa_pubkey);
    var payload = {
      'data_crypt': cipher,
      'symmetric_key_crypt': symmetric_key_crypt,
      'client_rsa_pubkey': globalThis.client_rsa_pubkey
    };
    return this.http.post(_core_constants_api_url__WEBPACK_IMPORTED_MODULE_0__.API_URL + 'shipment_creation', payload, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true
    });
  }
  resetFilters() {
    var currentDate = new Date();
    var oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    var shipments_list_filters = JSON.parse(localStorage.getItem('shipments_list_filters'));
    var statuses = [];
    var shipmentType = null;
    var responder = null;
    var counterparty = null;
    var sokrof = null;
    var shippingWarehouse = null;
    var sort = {
      label: 'Дата: сначала новые',
      value: 'shipping_date_is_earlier'
    };
    if (typeof shipments_list_filters == 'object' && shipments_list_filters !== null) {
      if (typeof shipments_list_filters.plannedShipmentDate == 'object') {
        if (typeof shipments_list_filters.plannedShipmentDate[1] == 'string' && typeof shipments_list_filters.plannedShipmentDate[0] == 'string') {
          currentDate = new Date(shipments_list_filters.plannedShipmentDate[1]);
          oneMonthAgo = new Date(shipments_list_filters.plannedShipmentDate[0]);
        }
      }
      if (typeof shipments_list_filters.statuses == 'object') {
        statuses = shipments_list_filters.statuses;
      }
      if (typeof shipments_list_filters.shipmentType == 'object') {
        shipmentType = shipments_list_filters.shipmentType;
      }
      if (typeof shipments_list_filters.responder == 'object') {
        responder = shipments_list_filters.responder;
      }
      if (typeof shipments_list_filters.counterparty == 'string') {
        counterparty = shipments_list_filters.counterparty;
      }
      if (typeof shipments_list_filters.sokrof == 'object') {
        sokrof = shipments_list_filters.sokrof;
      }
      if (typeof shipments_list_filters.shippingWarehouse == 'object') {
        shippingWarehouse = shipments_list_filters.shippingWarehouse;
      }
      if (typeof shipments_list_filters.sort == 'object') {
        sort = shipments_list_filters.sort;
      }
    }
    this.filterForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroup({
      plannedShipmentDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl([oneMonthAgo, currentDate]),
      statuses: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(statuses),
      shipmentType: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(shipmentType),
      responder: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(responder),
      sokrof: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(sokrof),
      counterparty: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(counterparty),
      shippingWarehouse: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(shippingWarehouse),
      pageNumber: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(1),
      sort: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(sort)
    });
  }
  static ɵfac = function ShipmentsService_Factory(t) {
    return new (t || ShipmentsService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: ShipmentsService,
    factory: ShipmentsService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 368:
/*!*********************************************************************************************************!*\
  !*** ./src/app/modules/user-desktop/dialogs/shipment-filter-dialog/shipment-filter-dialog.component.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShipmentFilterDialogComponent: () => (/* binding */ ShipmentFilterDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/dynamicdialog */ 4436);
/* harmony import */ var _shipments_services_shipments_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shipments/services/shipments.service */ 4738);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/dropdown */ 4553);







const _c0 = function () {
  return {
    "width": "100%"
  };
};
const _c1 = function () {
  return {
    appendTo: "body"
  };
};
class ShipmentFilterDialogComponent {
  ref;
  shipmentService;
  counterparties = [];
  filterForm;
  constructor(ref, shipmentService) {
    this.ref = ref;
    this.shipmentService = shipmentService;
    let value = this.shipmentService.filterForm.value;
    this.filterForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroup({
      counterparty: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl(value.counterparty || ''),
      shipmentWarehouse: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl(value.shippingWarehouse || ''),
      sokrofResponsible: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl(value.sokrof || '')
    });
  }
  onConfirm() {
    this.shipmentService.filterForm.patchValue({
      counterparty: this.filterForm.get('counterparty').value,
      shippingWarehouse: this.filterForm.get('shipmentWarehouse').value,
      sokrof: this.filterForm.get('sokrofResponsible').value
    });
    this.ref.close({});
  }
  static ɵfac = function ShipmentFilterDialogComponent_Factory(t) {
    return new (t || ShipmentFilterDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_3__.DynamicDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_shipments_services_shipments_service__WEBPACK_IMPORTED_MODULE_0__.ShipmentsService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ShipmentFilterDialogComponent,
    selectors: [["app-shipment-filter-dialog"]],
    decls: 17,
    vars: 22,
    consts: [["dialog", ""], [3, "formGroup"], ["optionLabel", "fullname", "formControlName", "counterparty", "placeholder", "\u041B\u044E\u0431\u043E\u0439", "emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", 3, "options", "showClear", "overlayOptions"], [1, "mt-3"], ["optionLabel", "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435", "formControlName", "shipmentWarehouse", "placeholder", "\u041B\u044E\u0431\u043E\u0439", "emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", 3, "options", "showClear", "overlayOptions"], ["optionLabel", "label", "emptyMessage", "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", "formControlName", "sokrofResponsible", "placeholder", "\u041B\u044E\u0431\u043E\u0439", 3, "options", "showClear", "overlayOptions"], [1, "mt-2"], ["label", "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C", "severity", "secondary", 3, "click"]],
    template: function ShipmentFilterDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", null, 0)(2, "div")(3, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "p-dropdown", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 3)(8, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "\u0421\u043A\u043B\u0430\u0434 \u043E\u0442\u0433\u0440\u0443\u0437\u043A\u0438");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "p-dropdown", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 3)(12, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 Sokrof");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](14, "p-dropdown", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 6)(16, "p-button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ShipmentFilterDialogComponent_Template_p_button_click_16_listener() {
          return ctx.onConfirm();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.filterForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](16, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("options", ctx.shipmentService.counterparties)("showClear", true)("overlayOptions", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](17, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](18, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("options", ctx.shipmentService.shipmentWarehouses)("showClear", true)("overlayOptions", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](19, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](20, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("options", ctx.shipmentService.sokrofResponders)("showClear", true)("overlayOptions", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](21, _c1));
      }
    },
    dependencies: [primeng_button__WEBPACK_IMPORTED_MODULE_4__.Button, primeng_dropdown__WEBPACK_IMPORTED_MODULE_5__.Dropdown, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 3313:
/*!***************************************************************!*\
  !*** ./node_modules/primeng/fesm2022/primeng-radiobutton.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RADIO_VALUE_ACCESSOR: () => (/* binding */ RADIO_VALUE_ACCESSOR),
/* harmony export */   RadioButton: () => (/* binding */ RadioButton),
/* harmony export */   RadioButtonModule: () => (/* binding */ RadioButtonModule),
/* harmony export */   RadioControlRegistry: () => (/* binding */ RadioControlRegistry)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 8849);





const _c0 = ["input"];
const _c1 = function (a1, a2, a3) {
  return {
    "p-radiobutton-label": true,
    "p-radiobutton-label-active": a1,
    "p-disabled": a2,
    "p-radiobutton-label-focus": a3
  };
};
function RadioButton_label_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RadioButton_label_6_Template_label_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.select($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx_r1.labelStyleClass);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](6, _c1, _r0.checked, ctx_r1.disabled, ctx_r1.focused));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("for", ctx_r1.inputId)("data-pc-section", "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1.label);
  }
}
const _c2 = function (a1, a2, a3) {
  return {
    "p-radiobutton p-component": true,
    "p-radiobutton-checked": a1,
    "p-radiobutton-disabled": a2,
    "p-radiobutton-focused": a3
  };
};
const _c3 = function (a1, a2, a3) {
  return {
    "p-radiobutton-box": true,
    "p-highlight": a1,
    "p-disabled": a2,
    "p-focus": a3
  };
};
const RADIO_VALUE_ACCESSOR = {
  provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NG_VALUE_ACCESSOR,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => RadioButton),
  multi: true
};
class RadioControlRegistry {
  accessors = [];
  add(control, accessor) {
    this.accessors.push([control, accessor]);
  }
  remove(accessor) {
    this.accessors = this.accessors.filter(c => {
      return c[1] !== accessor;
    });
  }
  select(accessor) {
    this.accessors.forEach(c => {
      if (this.isSameGroup(c, accessor) && c[1] !== accessor) {
        c[1].writeValue(accessor.value);
      }
    });
  }
  isSameGroup(controlPair, accessor) {
    if (!controlPair[0].control) {
      return false;
    }
    return controlPair[0].control.root === accessor.control.control.root && controlPair[1].name === accessor.name;
  }
  static ɵfac = function RadioControlRegistry_Factory(t) {
    return new (t || RadioControlRegistry)();
  };
  static ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: RadioControlRegistry,
    factory: RadioControlRegistry.ɵfac,
    providedIn: 'root'
  });
}
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RadioControlRegistry, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], null, null);
})();
/**
 * RadioButton is an extension to standard radio button element with theming.
 * @group Components
 */
class RadioButton {
  cd;
  injector;
  registry;
  /**
   * Value of the radiobutton.
   * @group Props
   */
  value;
  /**
   * The name of the form control.
   * @group Props
   */
  formControlName;
  /**
   * Name of the radiobutton group.
   * @group Props
   */
  name;
  /**
   * When present, it specifies that the element should be disabled.
   * @group Props
   */
  disabled;
  /**
   * Label of the radiobutton.
   * @group Props
   */
  label;
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex;
  /**
   * Identifier of the focus input to match a label defined for the component.
   * @group Props
   */
  inputId;
  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Used to define a string that labels the input element.
   * @group Props
   */
  ariaLabel;
  /**
   * Inline style of the component.
   * @group Props
   */
  style;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Style class of the label.
   * @group Props
   */
  labelStyleClass;
  /**
   * Callback to invoke on radio button click.
   * @param {RadioButtonClickEvent} event - Custom click event.
   * @group Emits
   */
  onClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  /**
   * Callback to invoke when the receives focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onFocus = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  /**
   * Callback to invoke when the loses focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onBlur = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  inputViewChild;
  onModelChange = () => {};
  onModelTouched = () => {};
  checked;
  focused;
  control;
  constructor(cd, injector, registry) {
    this.cd = cd;
    this.injector = injector;
    this.registry = registry;
  }
  ngOnInit() {
    this.control = this.injector.get(_angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControl);
    this.checkName();
    this.registry.add(this.control, this);
  }
  handleClick(event, radioButton, focus) {
    event.preventDefault();
    if (this.disabled) {
      return;
    }
    this.select(event);
    if (focus) {
      radioButton.focus();
    }
  }
  select(event) {
    if (!this.disabled) {
      this.inputViewChild.nativeElement.checked = true;
      this.checked = true;
      this.onModelChange(this.value);
      this.registry.select(this);
      this.onClick.emit({
        originalEvent: event,
        value: this.value
      });
    }
  }
  writeValue(value) {
    this.checked = value == this.value;
    if (this.inputViewChild && this.inputViewChild.nativeElement) {
      this.inputViewChild.nativeElement.checked = this.checked;
    }
    this.cd.markForCheck();
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  setDisabledState(val) {
    this.disabled = val;
    this.cd.markForCheck();
  }
  onInputFocus(event) {
    this.focused = true;
    this.onFocus.emit(event);
  }
  onInputBlur(event) {
    this.focused = false;
    this.onModelTouched();
    this.onBlur.emit(event);
  }
  /**
   * Applies focus to input field.
   * @group Method
   */
  focus() {
    this.inputViewChild.nativeElement.focus();
  }
  ngOnDestroy() {
    this.registry.remove(this);
  }
  checkName() {
    if (this.name && this.formControlName && this.name !== this.formControlName) {
      this.throwNameError();
    }
    if (!this.name && this.formControlName) {
      this.name = this.formControlName;
    }
  }
  throwNameError() {
    throw new Error(`
          If you define both a name and a formControlName attribute on your radio button, their values
          must match. Ex: <p-radioButton formControlName="food" name="food"></p-radioButton>
        `);
  }
  static ɵfac = function RadioButton_Factory(t) {
    return new (t || RadioButton)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](RadioControlRegistry));
  };
  static ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: RadioButton,
    selectors: [["p-radioButton"]],
    viewQuery: function RadioButton_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.inputViewChild = _t.first);
      }
    },
    hostAttrs: [1, "p-element"],
    inputs: {
      value: "value",
      formControlName: "formControlName",
      name: "name",
      disabled: "disabled",
      label: "label",
      tabindex: "tabindex",
      inputId: "inputId",
      ariaLabelledBy: "ariaLabelledBy",
      ariaLabel: "ariaLabel",
      style: "style",
      styleClass: "styleClass",
      labelStyleClass: "labelStyleClass"
    },
    outputs: {
      onClick: "onClick",
      onFocus: "onFocus",
      onBlur: "onBlur"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([RADIO_VALUE_ACCESSOR])],
    decls: 7,
    vars: 29,
    consts: [[3, "ngStyle", "ngClass", "click"], [1, "p-hidden-accessible"], ["type", "radio", 3, "checked", "disabled", "value", "focus", "blur"], ["input", ""], [3, "ngClass"], [1, "p-radiobutton-icon"], [3, "class", "ngClass", "click", 4, "ngIf"], [3, "ngClass", "click"]],
    template: function RadioButton_Template(rf, ctx) {
      if (rf & 1) {
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RadioButton_Template_div_click_0_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
          const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
          return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx.handleClick($event, _r0, true));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1)(2, "input", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("focus", function RadioButton_Template_input_focus_2_listener($event) {
          return ctx.onInputFocus($event);
        })("blur", function RadioButton_Template_input_blur_2_listener($event) {
          return ctx.onInputBlur($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, RadioButton_label_6_Template, 2, 10, "label", 6);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx.styleClass);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", ctx.style)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](21, _c2, ctx.checked, ctx.disabled, ctx.focused));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("data-pc-name", "radiobutton")("data-pc-section", "root");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("data-pc-section", "hiddenInputWrapper");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", ctx.checked)("disabled", ctx.disabled)("value", ctx.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("id", ctx.inputId)("name", ctx.name)("aria-labelledby", ctx.ariaLabelledBy)("aria-label", ctx.ariaLabel)("tabindex", ctx.tabindex)("aria-checked", ctx.checked)("data-pc-section", "hiddenInput");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](25, _c3, ctx.checked, ctx.disabled, ctx.focused));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("data-pc-section", "input");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("data-pc-section", "icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.label);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgStyle],
    encapsulation: 2,
    changeDetection: 0
  });
}
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RadioButton, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'p-radioButton',
      template: `
        <div
            [ngStyle]="style"
            [ngClass]="{ 'p-radiobutton p-component': true, 'p-radiobutton-checked': checked, 'p-radiobutton-disabled': disabled, 'p-radiobutton-focused': focused }"
            [class]="styleClass"
            [attr.data-pc-name]="'radiobutton'"
            [attr.data-pc-section]="'root'"
            (click)="handleClick($event, input, true)"
        >
            <div class="p-hidden-accessible" [attr.data-pc-section]="'hiddenInputWrapper'">
                <input
                    #input
                    [attr.id]="inputId"
                    type="radio"
                    [attr.name]="name"
                    [checked]="checked"
                    [disabled]="disabled"
                    [value]="value"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel"
                    [attr.tabindex]="tabindex"
                    [attr.aria-checked]="checked"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    [attr.data-pc-section]="'hiddenInput'"
                />
            </div>
            <div [ngClass]="{ 'p-radiobutton-box': true, 'p-highlight': checked, 'p-disabled': disabled, 'p-focus': focused }" [attr.data-pc-section]="'input'">
                <span class="p-radiobutton-icon" [attr.data-pc-section]="'icon'"></span>
            </div>
        </div>
        <label
            (click)="select($event)"
            [class]="labelStyleClass"
            [ngClass]="{ 'p-radiobutton-label': true, 'p-radiobutton-label-active': input.checked, 'p-disabled': disabled, 'p-radiobutton-label-focus': focused }"
            *ngIf="label"
            [attr.for]="inputId"
            [attr.data-pc-section]="'label'"
            >{{ label }}</label
        >
    `,
      providers: [RADIO_VALUE_ACCESSOR],
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      host: {
        class: 'p-element'
      }
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector
    }, {
      type: RadioControlRegistry
    }];
  }, {
    value: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    formControlName: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    name: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    label: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    tabindex: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    inputId: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    ariaLabelledBy: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    ariaLabel: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    style: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    styleClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    labelStyleClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    onClick: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    onFocus: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    onBlur: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    inputViewChild: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['input']
    }]
  });
})();
class RadioButtonModule {
  static ɵfac = function RadioButtonModule_Factory(t) {
    return new (t || RadioButtonModule)();
  };
  static ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: RadioButtonModule
  });
  static ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule]
  });
}
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RadioButtonModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
      exports: [RadioButton],
      declarations: [RadioButton]
    }]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ })

}]);
//# sourceMappingURL=default-src_app_modules_shipments_components_shipment-editor_shipment-editor_component_ts-src-a83a85.js.map