webpackHotUpdate_N_E("pages/books",{

/***/ "./components/book.js":
/*!****************************!*\
  !*** ./components/book.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ \"./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _styles_content_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/content.module.css */ \"./styles/content.module.css\");\n/* harmony import */ var _styles_content_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_content_module_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\nvar _jsxFileName = \"/Users/joey/github/jyzblog/jyzblog.github.io/components/book.js\";\n\n\n\nfunction book(props) {\n  console.log(props);\n\n  var hashtags = Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(props.hashtags);\n\n  var hashtagStr = hashtags.map(function (h) {\n    return \"#\".concat(h);\n  }).join(' ');\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"li\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"a\", {\n      href: props.address,\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"span\", {\n        className: _styles_content_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.title,\n        children: props.title\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 11,\n        columnNumber: 37\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 11,\n      columnNumber: 13\n    }, this), \" \", /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"div\", {\n      className: _styles_content_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.hashtags,\n      children: hashtagStr\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 11,\n      columnNumber: 93\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 10,\n    columnNumber: 9\n  }, this);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (book);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9ib29rLmpzPzJjYmUiXSwibmFtZXMiOlsiYm9vayIsInByb3BzIiwiY29uc29sZSIsImxvZyIsImhhc2h0YWdzIiwiaGFzaHRhZ1N0ciIsIm1hcCIsImgiLCJqb2luIiwiYWRkcmVzcyIsInN0eWxlcyIsInRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsU0FBU0EsSUFBVCxDQUFjQyxLQUFkLEVBQXFCO0FBQ2pCQyxTQUFPLENBQUNDLEdBQVIsQ0FBWUYsS0FBWjs7QUFDQSxNQUFNRyxRQUFRLEdBQUcsNkZBQUlILEtBQUssQ0FBQ0csUUFBYixDQUFkOztBQUNBLE1BQU1DLFVBQVUsR0FBR0QsUUFBUSxDQUFDRSxHQUFULENBQWMsVUFBQUMsQ0FBQztBQUFBLHNCQUFRQSxDQUFSO0FBQUEsR0FBZixFQUE0QkMsSUFBNUIsQ0FBaUMsR0FBakMsQ0FBbkI7QUFFQSxzQkFDSTtBQUFBLDRCQUNJO0FBQUcsVUFBSSxFQUFFUCxLQUFLLENBQUNRLE9BQWY7QUFBQSw2QkFBd0I7QUFBTSxpQkFBUyxFQUFFQyxpRUFBTSxDQUFDQyxLQUF4QjtBQUFBLGtCQUFnQ1YsS0FBSyxDQUFDVTtBQUF0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFESixvQkFDb0Y7QUFBSyxlQUFTLEVBQUVELGlFQUFNLENBQUNOLFFBQXZCO0FBQUEsZ0JBQWtDQztBQUFsQztBQUFBO0FBQUE7QUFBQTtBQUFBLFlBRHBGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURKO0FBS0g7O0FBRWNMLG1FQUFmIiwiZmlsZSI6Ii4vY29tcG9uZW50cy9ib29rLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9zdHlsZXMvY29udGVudC5tb2R1bGUuY3NzJztcblxuZnVuY3Rpb24gYm9vayhwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKHByb3BzKVxuICAgIGNvbnN0IGhhc2h0YWdzID0gWy4uLnByb3BzLmhhc2h0YWdzXTtcbiAgICBjb25zdCBoYXNodGFnU3RyID0gaGFzaHRhZ3MubWFwKCBoID0+IGAjJHtofWApLmpvaW4oJyAnKTtcbiAgICBcbiAgICByZXR1cm4gKFxuICAgICAgICA8bGk+XG4gICAgICAgICAgICA8YSBocmVmPXtwcm9wcy5hZGRyZXNzfT48c3BhbiBjbGFzc05hbWU9e3N0eWxlcy50aXRsZX0+e3Byb3BzLnRpdGxlfTwvc3Bhbj48L2E+IDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuaGFzaHRhZ3N9PntoYXNodGFnU3RyfTwvZGl2PlxuICAgICAgICA8L2xpPlxuICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgYm9va1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/book.js\n");

/***/ })

})