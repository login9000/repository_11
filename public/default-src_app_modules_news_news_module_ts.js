"use strict";
(self["webpackChunksokrof_frontend"] = self["webpackChunksokrof_frontend"] || []).push([["default-src_app_modules_news_news_module_ts"],{

/***/ 2423:
/*!*******************************************!*\
  !*** ./src/app/modules/news/NewsUtils.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NewsUtils: () => (/* binding */ NewsUtils)
/* harmony export */ });
class NewsUtils {
  /**
   * Заменяем каждый символ новой строки на <br>
   */
  static replaceNewlinesWithBr(input) {
    return input.replace(/(\n|\\n)/g, '<br>');
  }
}

/***/ }),

/***/ 8526:
/*!**************************************************************************!*\
  !*** ./src/app/modules/news/components/news-list/news-list.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NewsListComponent: () => (/* binding */ NewsListComponent)
/* harmony export */ });
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/dynamicdialog */ 4436);
/* harmony import */ var _news_editor_dialog_news_editor_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../news-editor-dialog/news-editor-dialog.component */ 3139);
/* harmony import */ var _NewsUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../NewsUtils */ 2423);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/api */ 8026);
/* harmony import */ var _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/error-handle/ErrorTranslator */ 8097);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_news_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/news.service */ 112);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../app.service */ 2266);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/paginator */ 5302);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/toast */ 8313);
/* harmony import */ var _shared_pipes_short_text_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/pipes/short-text.pipe */ 307);
















function NewsListComponent_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function NewsListComponent_ng_container_7_Template_div_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r6.readAll());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " \u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u0432\u0441\u0435 \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043D\u044B\u043C\u0438 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
}
function NewsListComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 1)(1, "p-button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function NewsListComponent_div_8_Template_p_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r8.openNewsEditor());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function NewsListComponent_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "\u041D\u043E\u0432\u043E\u0441\u0442\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function NewsListComponent_span_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "\u00A0\u00A0\u00A0loading ...");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
const _c0 = function (a0, a1) {
  return {
    "unread-news": a0,
    "read-news": a1
  };
};
function NewsListComponent_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function NewsListComponent_ng_container_14_Template_div_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r12);
      const theNews_r10 = restoredCtx.$implicit;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r11.goToNews(theNews_r10));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 20)(3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](6, "shortText");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const theNews_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction2"](7, _c0, theNews_r10.is_unread !== "", theNews_r10.is_unread === ""));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", theNews_r10 == null ? null : theNews_r10.header, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](6, 4, theNews_r10 == null ? null : theNews_r10.text, 50), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", theNews_r10 == null ? null : theNews_r10.date, " ");
  }
}
function NewsListComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div")(1, "p-paginator", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onPageChange", function NewsListComponent_div_17_Template_p_paginator_onPageChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r13.onPageChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("first", ctx_r5.first)("rows", ctx_r5.pageSize)("totalRecords", 12 * ctx_r5.lastPage);
  }
}
class NewsListComponent {
  newsService;
  appService;
  router;
  dialogService;
  messageService;
  news = [];
  currentPage = 1;
  pageSize = 12;
  first = 0;
  lastPage = 0;
  globalThis = globalThis;
  constructor(newsService, appService, router, dialogService, messageService) {
    this.newsService = newsService;
    this.appService = appService;
    this.router = router;
    this.dialogService = dialogService;
    this.messageService = messageService;
  }
  ngOnInit() {
    this.getAllNews();
    this.appService.fakeSocketData$.subscribe(data => {
      for (let i = data?.news?.data.length - 1; i >= 0; i--) {
        const news1 = data?.news?.data[i];
        this.news.unshift({
          id: news1.id,
          date: news1.date,
          header: news1.header,
          text: _NewsUtils__WEBPACK_IMPORTED_MODULE_1__.NewsUtils.replaceNewlinesWithBr(news1.text),
          is_unread: news1.is_unread
        });
      }
    });
  }
  ngOnDestroy() {
    // this.appService.fakeSocketData.unsubscribe()
  }
  getAllNews() {
    globalThis.stateLoadAllNews = '';
    this.newsService.getAllNews(this.currentPage).subscribe({
      next: response => {
        globalThis.stateLoadAllNews = 'loaded';
        this.news = response?.data;
        this.news.forEach(news => {
          news.text = _NewsUtils__WEBPACK_IMPORTED_MODULE_1__.NewsUtils.replaceNewlinesWithBr(news.text);
        });
        this.lastPage = response.pagination_max_page;
      },
      error: error => {
        globalThis.stateLoadAllNews = 'error';
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_2__.ErrorTranslator.translate(_core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_2__.ErrorTranslator.prepare(error)),
          life: 30000
        });
      }
    });
  }
  readAll() {
    this.newsService.markAllNewsAsRead().subscribe({
      next: () => {
        const fakeData = this.appService.fakeSocketData$.getValue();
        fakeData.news.number_unread = 0;
        this.news.forEach(news => {
          news.is_unread = '';
        });
        this.appService.fakeSocketData$.next(fakeData);
      }
    });
  }
  onPageChange($event) {
    this.first = $event.first;
    this.currentPage = $event.page + 1;
    this.getAllNews();
  }
  frameElement = frameElement;
  loadNews() {
    this.currentPage += 1;
    this.first += this.pageSize;
    this.newsService.getAllNews(this.currentPage).subscribe(response => {
      this.news.push(...response?.data);
      this.lastPage = response.pagination_max_page;
    });
  }
  goToNews(news) {
    let value = this.appService.fakeSocketData$.value;
    if (news.is_unread === '1') {
      value.news.number_unread = value.news.number_unread > 0 ? value.news.number_unread - 1 : 0;
      this.appService.fakeSocketData$.next(value);
    }
    this.router.navigate(['/news/page', {
      id: news.id
    }]);
  }
  openNewsEditor() {
    const ref = this.dialogService.open(_news_editor_dialog_news_editor_dialog_component__WEBPACK_IMPORTED_MODULE_0__.NewsEditorDialogComponent, {
      header: 'Добавление новости',
      width: '800px',
      height: 'auto',
      style: {
        overflowY: 'none'
      },
      baseZIndex: 10000
    });
    ref.onClose.subscribe(response => {
      if (response) {
        this.getAllNews();
        const fakeData = this.appService.fakeSocketData$.getValue();
        fakeData.news.number_unread += 1;
        this.appService.fakeSocketData$.next(fakeData);
      }
    });
  }
  static ɵfac = function NewsListComponent_Factory(t) {
    return new (t || NewsListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_news_service__WEBPACK_IMPORTED_MODULE_3__.NewsService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_app_service__WEBPACK_IMPORTED_MODULE_4__.AppService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_8__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_9__.MessageService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: NewsListComponent,
    selectors: [["app-news-list"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵProvidersFeature"]([primeng_api__WEBPACK_IMPORTED_MODULE_9__.MessageService, primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_8__.DialogService])],
    decls: 18,
    vars: 8,
    consts: [[1, "flex", "justify-content-between", "flex-wrap"], [1, "flex", "align-items-center", "justify-content-center"], [1, "flex", "mb-3"], [1, "flex-initial", "flex", "align-items-center", "justify-content-center", "font-boldborder-round", "mr-3", "page-title"], [4, "ngIf"], ["class", "flex align-items-center justify-content-center", 4, "ngIf"], [1, "flex", "flex-row", "flex-wrap", "grid"], ["class", "nothing_found_text_news", 4, "ngIf"], ["class", "loading_news", 4, "ngIf"], [1, "flex", "col-10"], [1, "news-wrapper"], [4, "ngFor", "ngForOf"], [2, "text-align", "center"], ["severity", "secondary", 1, "w-full", 3, "label", "disabled", "click"], [1, "flex-initial", "flex", "align-items-center", "justify-content-center", "read-all-span", 3, "click"], ["label", "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u043E\u0441\u0442\u044C", "severity", "secondary", 3, "click"], [1, "nothing_found_text_news"], [1, "loading_news"], ["data-pc-section", "icon", 1, "pi", "pi-spin", "pi-spinner", "p-button-icon", "p-button-icon-left", "ng-star-inserted"], [1, "news-card", 3, "ngClass", "click"], [1, "news-card-header"], [1, "news-card-content", 3, "innerHTML"], [1, "news-card-footer"], [3, "first", "rows", "totalRecords", "onPageChange"]],
    template: function NewsListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "p-toast");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "\u041D\u043E\u0432\u043E\u0441\u0442\u0438");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, NewsListComponent_ng_container_7_Template, 3, 0, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, NewsListComponent_div_8_Template, 2, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, NewsListComponent_span_10_Template, 2, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, NewsListComponent_span_11_Template, 3, 0, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 9)(13, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, NewsListComponent_ng_container_14_Template, 9, 10, "ng-container", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "div", 12)(16, "p-button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function NewsListComponent_Template_p_button_click_16_listener() {
          return ctx.loadNews();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](17, NewsListComponent_div_17_Template, 2, 3, "div", 4);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !!ctx.news && (ctx.news == null ? null : ctx.news.length) > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx.appService.sessionConfig == null ? null : ctx.appService.sessionConfig.status) === "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.globalThis.stateLoadAllNews == "loaded" && ctx.news.length == 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.globalThis.stateLoadAllNews != "loaded");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.news);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("label", "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0435 " + ctx.pageSize)("disabled", ctx.currentPage === ctx.lastPage || ctx.globalThis.stateLoadAllNews != "loaded");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.lastPage > 1);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, primeng_paginator__WEBPACK_IMPORTED_MODULE_11__.Paginator, primeng_button__WEBPACK_IMPORTED_MODULE_12__.Button, primeng_toast__WEBPACK_IMPORTED_MODULE_13__.Toast, _shared_pipes_short_text_pipe__WEBPACK_IMPORTED_MODULE_5__.ShortTextPipe],
    styles: [".read-all-span[_ngcontent-%COMP%] {\n  color: rgb(0, 128, 128);\n  cursor: pointer;\n  display: inline;\n  font-family: Montserrat, sans-serif;\n  font-feature-settings: \"kern\";\n  font-kerning: normal;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: auto;\n  letter-spacing: normal;\n  line-height: normal;\n  text-align: left;\n  text-rendering: optimizelegibility;\n  text-transform: none;\n  white-space-collapse: collapse;\n}\n\n\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9uZXdzL2NvbXBvbmVudHMvbmV3cy1saXN0L25ld3MtbGlzdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsdUJBQXVCO0VBQ3ZCLGVBQWU7RUFDZixlQUFlO0VBQ2YsbUNBQW1DO0VBQ25DLDZCQUE2QjtFQUM3QixvQkFBb0I7RUFDcEIsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLGtDQUFrQztFQUNsQyxvQkFBb0I7RUFDcEIsOEJBQThCO0FBQ2hDIiwic291cmNlc0NvbnRlbnQiOlsiLnJlYWQtYWxsLXNwYW4ge1xyXG4gIGNvbG9yOiByZ2IoMCwgMTI4LCAxMjgpO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBkaXNwbGF5OiBpbmxpbmU7XHJcbiAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQsIHNhbnMtc2VyaWY7XHJcbiAgZm9udC1mZWF0dXJlLXNldHRpbmdzOiBcImtlcm5cIjtcclxuICBmb250LWtlcm5pbmc6IG5vcm1hbDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZWxlZ2liaWxpdHk7XHJcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XHJcbiAgd2hpdGUtc3BhY2UtY29sbGFwc2U6IGNvbGxhcHNlO1xyXG59XHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 1914:
/*!**************************************************************************!*\
  !*** ./src/app/modules/news/components/news-page/news-page.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NewsPageComponent: () => (/* binding */ NewsPageComponent)
/* harmony export */ });
/* harmony import */ var _NewsUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../NewsUtils */ 2423);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _services_news_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/news.service */ 112);




class NewsPageComponent {
  route;
  newsService;
  theNews = {};
  constructor(route, newsService) {
    this.route = route;
    this.newsService = newsService;
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.newsService.getById(params.get('id')).subscribe(theNews => {
        this.theNews = theNews;
        this.theNews.text = _NewsUtils__WEBPACK_IMPORTED_MODULE_0__.NewsUtils.replaceNewlinesWithBr(this.theNews.text);
      });
    });
  }
  static ɵfac = function NewsPageComponent_Factory(t) {
    return new (t || NewsPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_news_service__WEBPACK_IMPORTED_MODULE_1__.NewsService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: NewsPageComponent,
    selectors: [["app-news-page"]],
    decls: 9,
    vars: 3,
    consts: [["routerLink", "/news", 1, "green-link", "mb-2"], [1, "page-title", "mb-2"], [1, "subtitle", "mb-2"], [1, "news-text", 3, "innerHTML"]],
    template: function NewsPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u2190 \u041A \u0441\u043F\u0438\u0441\u043A\u0443 \u043D\u043E\u0432\u043E\u0441\u0442\u0435\u0439");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "br")(8, "div", 3);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.theNews == null ? null : ctx.theNews.header);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.theNews == null ? null : ctx.theNews.date);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", ctx.theNews == null ? null : ctx.theNews.text, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 8169:
/*!********************************************************************************!*\
  !*** ./src/app/modules/news/components/news-preview/news-preview.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NewsPreviewComponent: () => (/* binding */ NewsPreviewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _user_desktop_services_user_desktop_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../user-desktop/services/user-desktop.service */ 3571);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../app.service */ 2266);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _shared_pipes_short_text_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/pipes/short-text.pipe */ 307);






function NewsPreviewComponent_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u041D\u043E\u0432\u043E\u0441\u0442\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function NewsPreviewComponent_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\u00A0\u00A0\u00A0loading ...");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
const _c0 = function (a0, a1) {
  return {
    "unread-news": a0,
    "read-news": a1
  };
};
function NewsPreviewComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NewsPreviewComponent_ng_container_3_Template_div_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5);
      const theNews_r3 = restoredCtx.$implicit;
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r4.goToNews(theNews_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 8)(3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](6, "shortText");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const theNews_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction2"](7, _c0, theNews_r3.is_unread !== "", theNews_r3.is_unread === ""));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", theNews_r3 == null ? null : theNews_r3.header, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](6, 4, theNews_r3 == null ? null : theNews_r3.text, 50), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", theNews_r3 == null ? null : theNews_r3.date, " ");
  }
}
class NewsPreviewComponent {
  desktopService;
  router;
  appService;
  globalThis = globalThis;
  constructor(desktopService, router, appService) {
    this.desktopService = desktopService;
    this.router = router;
    this.appService = appService;
  }
  ngOnInit() {}
  goToNews(news) {
    let value = this.appService.fakeSocketData$.value;
    if (news.is_unread === '1') {
      value.news.number_unread = value.news.number_unread > 0 ? value.news.number_unread - 1 : 0;
      this.appService.fakeSocketData$.next(value);
    }
    this.router.navigate(['/news/page', {
      id: news.id
    }]);
  }
  static ɵfac = function NewsPreviewComponent_Factory(t) {
    return new (t || NewsPreviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_user_desktop_services_user_desktop_service__WEBPACK_IMPORTED_MODULE_0__.UserDesktopService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_app_service__WEBPACK_IMPORTED_MODULE_1__.AppService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: NewsPreviewComponent,
    selectors: [["app-news-preview"]],
    decls: 4,
    vars: 3,
    consts: [[1, "news-wrapper"], ["class", "nothing_found_text_news", 4, "ngIf"], ["class", "loading_news", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "nothing_found_text_news"], [1, "loading_news"], ["data-pc-section", "icon", 1, "pi", "pi-spin", "pi-spinner", "p-button-icon", "p-button-icon-left", "ng-star-inserted"], [1, "news-card", 3, "ngClass", "click"], [1, "news-card-header"], [1, "news-card-content", 3, "innerHTML"], [1, "news-card-footer"]],
    template: function NewsPreviewComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, NewsPreviewComponent_span_1_Template, 2, 0, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, NewsPreviewComponent_span_2_Template, 3, 0, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, NewsPreviewComponent_ng_container_3_Template, 9, 10, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.globalThis.stateLoadDataForUserDesktop == "loaded" && (ctx.desktopService.data == null ? null : ctx.desktopService.data.response == null ? null : ctx.desktopService.data.response.news == null ? null : ctx.desktopService.data.response.news.data.length) == 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.globalThis.stateLoadDataForUserDesktop != "loaded");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.desktopService.data == null ? null : ctx.desktopService.data.response == null ? null : ctx.desktopService.data.response.news == null ? null : ctx.desktopService.data.response.news.data);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _shared_pipes_short_text_pipe__WEBPACK_IMPORTED_MODULE_2__.ShortTextPipe],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 3139:
/*!*********************************************************************************!*\
  !*** ./src/app/modules/news/news-editor-dialog/news-editor-dialog.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NewsEditorDialogComponent: () => (/* binding */ NewsEditorDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/error-handle/ErrorTranslator */ 8097);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/dynamicdialog */ 4436);
/* harmony import */ var _services_news_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/news.service */ 112);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/inputtext */ 873);
/* harmony import */ var primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/inputtextarea */ 652);
/* harmony import */ var primeng_messages__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/messages */ 9404);










class NewsEditorDialogComponent {
  ref;
  newsService;
  newsForm;
  messages;
  constructor(ref, newsService) {
    this.ref = ref;
    this.newsService = newsService;
  }
  ngOnInit() {
    this.initForm();
  }
  onClose() {
    this.ref.close(this.newsForm.value);
  }
  initForm() {
    this.newsForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroup({
      header: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required),
      text: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required)
    });
  }
  save() {
    this.newsService.addNews(this.newsForm.value.header, this.escapeNewlines(this.newsForm.value.text)).subscribe({
      next: v => {
        this.ref.close(v);
      },
      error: error => {
        this.messages = [{
          severity: 'error',
          summary: 'Ошибка',
          detail: _core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_0__.ErrorTranslator.translate(_core_error_handle_ErrorTranslator__WEBPACK_IMPORTED_MODULE_0__.ErrorTranslator.prepare(error)),
          life: 10000
        }];
      }
    });
  }
  escapeNewlines(input) {
    // Заменяем каждый символ новой строки на экранированный вариант
    const escapedString = input.replace(/\n/g, '\\n');
    return escapedString;
  }
  static ɵfac = function NewsEditorDialogComponent_Factory(t) {
    return new (t || NewsEditorDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_4__.DynamicDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_news_service__WEBPACK_IMPORTED_MODULE_1__.NewsService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: NewsEditorDialogComponent,
    selectors: [["app-news-editor-dialog"]],
    decls: 10,
    vars: 8,
    consts: [[3, "formGroup"], ["type", "text", "pInputText", "", "formControlName", "header", "maxlength", "255", 1, "mt-1"], [1, "mt-2"], ["rows", "5", "cols", "30", "pInputTextarea", "", "formControlName", "text", "maxlength", "8192", 1, "mt-1"], [3, "value", "enableService", "valueChange"], ["label", "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u043E\u0441\u0442\u044C", "severity", "secondary", 3, "disabled", "click"]],
    template: function NewsEditorDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "form", 0)(1, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\u0422\u0435\u043C\u0430");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "label", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "\u0422\u0435\u043A\u0441\u0442");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "textarea", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "p-messages", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("valueChange", function NewsEditorDialogComponent_Template_p_messages_valueChange_7_listener($event) {
          return ctx.messages = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 2)(9, "p-button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NewsEditorDialogComponent_Template_p_button_click_9_listener() {
          return ctx.save();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.newsForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleMap"]("width: 100%");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleMap"]("width: 100%");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", ctx.messages)("enableService", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !ctx.newsForm.valid);
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.MaxLengthValidator, primeng_button__WEBPACK_IMPORTED_MODULE_5__.Button, primeng_inputtext__WEBPACK_IMPORTED_MODULE_6__.InputText, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_7__.InputTextarea, primeng_messages__WEBPACK_IMPORTED_MODULE_8__.Messages],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 926:
/*!*****************************************************!*\
  !*** ./src/app/modules/news/news-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NewsRoutingModule: () => (/* binding */ NewsRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _components_news_list_news_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/news-list/news-list.component */ 8526);
/* harmony import */ var _components_news_page_news_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/news-page/news-page.component */ 1914);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);





const routes = [{
  path: '',
  component: _components_news_list_news_list_component__WEBPACK_IMPORTED_MODULE_0__.NewsListComponent
}, {
  path: 'page',
  component: _components_news_page_news_page_component__WEBPACK_IMPORTED_MODULE_1__.NewsPageComponent
}];
class NewsRoutingModule {
  static ɵfac = function NewsRoutingModule_Factory(t) {
    return new (t || NewsRoutingModule)();
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: NewsRoutingModule
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](NewsRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 6366:
/*!*********************************************!*\
  !*** ./src/app/modules/news/news.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NewsModule: () => (/* binding */ NewsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _components_news_preview_news_preview_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/news-preview/news-preview.component */ 8169);
/* harmony import */ var primeng_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/card */ 4722);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/shared.module */ 6208);
/* harmony import */ var _components_news_list_news_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/news-list/news-list.component */ 8526);
/* harmony import */ var _news_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./news-routing.module */ 926);
/* harmony import */ var _components_news_page_news_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/news-page/news-page.component */ 1914);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/paginator */ 5302);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var _news_editor_dialog_news_editor_dialog_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./news-editor-dialog/news-editor-dialog.component */ 3139);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/inputtext */ 873);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/inputtextarea */ 652);
/* harmony import */ var primeng_messages__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/messages */ 9404);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/toast */ 8313);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);
















class NewsModule {
  static ɵfac = function NewsModule_Factory(t) {
    return new (t || NewsModule)();
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
    type: NewsModule
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, primeng_card__WEBPACK_IMPORTED_MODULE_8__.CardModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _news_routing_module__WEBPACK_IMPORTED_MODULE_3__.NewsRoutingModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_9__.PaginatorModule, primeng_button__WEBPACK_IMPORTED_MODULE_10__.ButtonModule, primeng_toast__WEBPACK_IMPORTED_MODULE_11__.ToastModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_12__.InputTextModule, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.ReactiveFormsModule, primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_14__.InputTextareaModule, primeng_messages__WEBPACK_IMPORTED_MODULE_15__.MessagesModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](NewsModule, {
    declarations: [_components_news_preview_news_preview_component__WEBPACK_IMPORTED_MODULE_0__.NewsPreviewComponent, _components_news_list_news_list_component__WEBPACK_IMPORTED_MODULE_2__.NewsListComponent, _components_news_page_news_page_component__WEBPACK_IMPORTED_MODULE_4__.NewsPageComponent, _news_editor_dialog_news_editor_dialog_component__WEBPACK_IMPORTED_MODULE_5__.NewsEditorDialogComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, primeng_card__WEBPACK_IMPORTED_MODULE_8__.CardModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _news_routing_module__WEBPACK_IMPORTED_MODULE_3__.NewsRoutingModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_9__.PaginatorModule, primeng_button__WEBPACK_IMPORTED_MODULE_10__.ButtonModule, primeng_toast__WEBPACK_IMPORTED_MODULE_11__.ToastModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_12__.InputTextModule, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.ReactiveFormsModule, primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_14__.InputTextareaModule, primeng_messages__WEBPACK_IMPORTED_MODULE_15__.MessagesModule],
    exports: [_components_news_preview_news_preview_component__WEBPACK_IMPORTED_MODULE_0__.NewsPreviewComponent]
  });
})();

/***/ }),

/***/ 112:
/*!*******************************************************!*\
  !*** ./src/app/modules/news/services/news.service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NewsService: () => (/* binding */ NewsService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 9736);
/* harmony import */ var _core_constants_api_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/constants/api-url */ 8572);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 4860);




class NewsService {
  http;
  constructor(http) {
    this.http = http;
  }
  getById(id) {
    return this.http.get(_core_constants_api_url__WEBPACK_IMPORTED_MODULE_0__.API_URL + 'get_news', {
      params: {
        id: id
      },
      "withCredentials": true
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(res => res.response));
  }
  getAllNews(page) {
    return this.http.get(_core_constants_api_url__WEBPACK_IMPORTED_MODULE_0__.API_URL + 'get_all_news', {
      params: {
        page: page
      },
      "withCredentials": true
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(res => res.response));
  }
  markAllNewsAsRead() {
    return this.http.put(_core_constants_api_url__WEBPACK_IMPORTED_MODULE_0__.API_URL + 'mark_all_news_as_read', {}, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true
    });
  }
  addNews(header, text) {
    return this.http.post(_core_constants_api_url__WEBPACK_IMPORTED_MODULE_0__.API_URL + 'add_news', {
      header: header,
      text: text
    }, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true
    });
  }
  static ɵfac = function NewsService_Factory(t) {
    return new (t || NewsService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: NewsService,
    factory: NewsService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 3571:
/*!***********************************************************************!*\
  !*** ./src/app/modules/user-desktop/services/user-desktop.service.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserDesktopService: () => (/* binding */ UserDesktopService)
/* harmony export */ });
/* harmony import */ var _core_constants_api_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/constants/api-url */ 8572);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 4860);



// import {NewsUtils} from "../../news/NewsUtils";
class UserDesktopService {
  http;
  data = {};
  constructor(http) {
    this.http = http;
  }
  getDataForUserDesktop() {
    return this.http.get(_core_constants_api_url__WEBPACK_IMPORTED_MODULE_0__.API_URL + 'get_other_data', {
      params: {
        query: '80fff71329',
        client_rsa_pubkey: globalThis.client_rsa_pubkey
      },
      "withCredentials": true
    });
  }
  static ɵfac = function UserDesktopService_Factory(t) {
    return new (t || UserDesktopService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: UserDesktopService,
    factory: UserDesktopService.ɵfac,
    providedIn: 'root'
  });
}

/***/ })

}]);
//# sourceMappingURL=default-src_app_modules_news_news_module_ts.js.map