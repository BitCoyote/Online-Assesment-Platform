/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/AssesmentResult.js":
/*!*******************************************!*\
  !*** ./src/components/AssesmentResult.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mockdata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mockdata */ "./src/components/mockdata.js");
/* harmony import */ var _Loading_Loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Loading/Loading */ "./src/components/Loading/Loading.js");
/* harmony import */ var _Error_Error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Error/Error */ "./src/components/Error/Error.js");





function AssesmentResult(_ref) {
  let {
    testID,
    userID,
    companyID
  } = _ref;
  const [result, setResult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);

  //TODO: generate token from props values

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    fetch('http://15.222.168.158/sat-tool/get-results', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Token 7b4c76eaa68c192da374d197b2497151c4b08bc9',
        KMQJWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0X2lkIjoyLCJ1c2VyX2lkIjoxLCJjb21wYW55X2lkIjoiOGRkMGRlZjktOTdhNC00NTE4LWFmNjItNWVhNjI5ZjRiZDMwIn0.I7515FkEeQCupXczQhVtmvGKu6m_3jf1DhD6FLw-HHU'
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new _Error_Error__WEBPACK_IMPORTED_MODULE_4__["default"]('Something went wrong.');
    }).then(data => {
      if (!Array.isArray(data.user_results)) {
        throw new _Error_Error__WEBPACK_IMPORTED_MODULE_4__["default"]('Received data is not correct.');
      }
      setResult(data.user_results);
    }).catch(e => {
      setError(e.message);
    }).finally(() => setLoading(false));
  }, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, error && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Error_Error__WEBPACK_IMPORTED_MODULE_4__["default"], {
    msg: error
  }), loading && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Loading_Loading__WEBPACK_IMPORTED_MODULE_3__["default"], null), !error && !loading && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-100 dark:bg-gray-900"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "mb-3 text-2xl font-semibold leading-tight"
  }, "Test Result"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "overflow-x-auto"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "min-w-full text-xs"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", {
    className: "rounded-t-lg dark:bg-gray-700"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "text-right"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    title: "Ranking",
    className: "p-3 text-left"
  }, "Question Number"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    title: "Team name",
    className: "p-3 text-left"
  }, "Category"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    title: "Wins",
    className: "p-3"
  }, "Answer(Current)"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    title: "Losses",
    className: "p-3"
  }, "Answer(Desired)"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    title: "Win percentage",
    className: "p-3"
  }, "Answer(Value)"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    title: "Games behind",
    className: "p-3"
  }, "Gap"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    title: "Home games",
    className: "p-3"
  }, "Score"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, result.map((result, key) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    key: key,
    className: "text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "px-3 py-2 text-left"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, result.question.question_number)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "px-3 py-2 text-left"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, result.question.question_category)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "px-3 py-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, result.current_answer)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "px-3 py-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, result.desired_answer)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "px-3 py-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, result.value_answer)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "px-3 py-2 text-right"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, result.gap)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "px-3 py-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, result.score)))))))));
}
/* harmony default export */ __webpack_exports__["default"] = (AssesmentResult);

/***/ }),

/***/ "./src/components/Error/Error.js":
/*!***************************************!*\
  !*** ./src/components/Error/Error.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function Error(_ref) {
  let {
    msg
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "flex items-center h-full sm:p-16 dark:bg-gray-900 dark:text-gray-100"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    className: "w-40 h-40 dark:text-gray-600"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: "currentColor",
    d: "M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
    width: "176",
    height: "32",
    x: "168",
    y: "320",
    fill: "currentColor"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
    fill: "currentColor",
    points: "210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
    fill: "currentColor",
    points: "383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-3xl"
  }, msg), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    rel: "noopener noreferrer",
    href: "/main-page",
    className: "px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
  }, "Back to homepage")));
}
/* harmony default export */ __webpack_exports__["default"] = (Error);

/***/ }),

/***/ "./src/components/Loading/Loading.js":
/*!*******************************************!*\
  !*** ./src/components/Loading/Loading.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function Loading() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-full h-full fixed block top-0 left-0 bg-stone-700 grid place-items-center z-50"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-full grid justify-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "subpixel-antialiased mt-4 text-neutral-50 text-2xl"
  }, "Loading...")));
}
/* harmony default export */ __webpack_exports__["default"] = (Loading);

/***/ }),

/***/ "./src/components/mockdata.js":
/*!************************************!*\
  !*** ./src/components/mockdata.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mockData": function() { return /* binding */ mockData; }
/* harmony export */ });
const mockData = {
  "user_results": [{
    "current_answer": 4,
    "desired_answer": 4,
    "gap": 0,
    "question": {
      "question_category": "Lead",
      "question_number": "1.1",
      "question_title": "Leadership prioritizes customer success goals on a par with financial and operational goals in a Balanced Scorecard manner"
    },
    "score": 0,
    "value_answer": 2
  }, {
    "current_answer": 5,
    "desired_answer": 5,
    "gap": 0,
    "question": {
      "question_category": "Lead",
      "question_number": "1.2",
      "question_title": "Leadership champions a customer-centric approach to actions"
    },
    "score": 0,
    "value_answer": 1
  }, {
    "current_answer": 3,
    "desired_answer": 5,
    "gap": 2,
    "question": {
      "question_category": "Lead",
      "question_number": "1.3",
      "question_title": "Leadership is responsible and rated on top customer success"
    },
    "score": 6,
    "value_answer": 3
  }, {
    "current_answer": 4,
    "desired_answer": 4,
    "gap": 0,
    "question": {
      "question_category": "Lead",
      "question_number": "1.4",
      "question_title": "Customers are considered your most valuable external asset"
    },
    "score": 0,
    "value_answer": 5
  }, {
    "current_answer": 2,
    "desired_answer": 5,
    "gap": 3,
    "question": {
      "question_category": "Understand",
      "question_number": "2.1",
      "question_title": "All business units are constantly in contact with customer touch points"
    },
    "score": 6,
    "value_answer": 2
  }, {
    "current_answer": 1,
    "desired_answer": 2,
    "gap": 1,
    "question": {
      "question_category": "Understand",
      "question_number": "2.2",
      "question_title": "All employees really understand the needs of the customer."
    },
    "score": 2,
    "value_answer": 2
  }, {
    "current_answer": 1,
    "desired_answer": 5,
    "gap": 4,
    "question": {
      "question_category": "Understand",
      "question_number": "2.3",
      "question_title": "All employees know who the top customers are."
    },
    "score": 16,
    "value_answer": 4
  }, {
    "current_answer": 4,
    "desired_answer": 4,
    "gap": 0,
    "question": {
      "question_category": "Understand",
      "question_number": "2.4",
      "question_title": "Company has regular customer appreciation events"
    },
    "score": 0,
    "value_answer": 4
  }, {
    "current_answer": 1,
    "desired_answer": 2,
    "gap": 1,
    "question": {
      "question_category": "Understand",
      "question_number": "2.5",
      "question_title": "Complaining customers are treated as most valuable assets for insight"
    },
    "score": 3,
    "value_answer": 3
  }, {
    "current_answer": 5,
    "desired_answer": 5,
    "gap": 0,
    "question": {
      "question_category": "Understand",
      "question_number": "2.6",
      "question_title": "Company understands the customer emotional needs and the reasons behind their decision making"
    },
    "score": 0,
    "value_answer": 1
  }, {
    "current_answer": 3,
    "desired_answer": 4,
    "gap": 1,
    "question": {
      "question_category": "Understand",
      "question_number": "2.7",
      "question_title": "Customer input is incorporated into the development of new products and services"
    },
    "score": 3,
    "value_answer": 3
  }, {
    "current_answer": 4,
    "desired_answer": 4,
    "gap": 0,
    "question": {
      "question_category": "Build Process",
      "question_number": "3.1",
      "question_title": "The desired customer experience is clearly defined from start to finish"
    },
    "score": 0,
    "value_answer": 4
  }, {
    "current_answer": 1,
    "desired_answer": 4,
    "gap": 3,
    "question": {
      "question_category": "Build Process",
      "question_number": "3.2",
      "question_title": "All systems, processes and channels are designed to support customer success"
    },
    "score": 3,
    "value_answer": 1
  }, {
    "current_answer": 2,
    "desired_answer": 2,
    "gap": 0,
    "question": {
      "question_category": "Build Process",
      "question_number": "3.3",
      "question_title": "Customers are invited to be partners via Advisory Boards, etc."
    },
    "score": 0,
    "value_answer": 3
  }, {
    "current_answer": 2,
    "desired_answer": 4,
    "gap": 2,
    "question": {
      "question_category": "Build Process",
      "question_number": "3.4",
      "question_title": "Your most valuable customers are provided superior service"
    },
    "score": 8,
    "value_answer": 4
  }, {
    "current_answer": 4,
    "desired_answer": 4,
    "gap": 0,
    "question": {
      "question_category": "Build Process",
      "question_number": "3.5",
      "question_title": "Company is honest and transparent to the customer"
    },
    "score": 0,
    "value_answer": 5
  }, {
    "current_answer": 3,
    "desired_answer": 5,
    "gap": 2,
    "question": {
      "question_category": "Build Process",
      "question_number": "3.6",
      "question_title": "Customer can select their preferred communication channels"
    },
    "score": 8,
    "value_answer": 4
  }, {
    "current_answer": 4,
    "desired_answer": 4,
    "gap": 0,
    "question": {
      "question_category": "Build Process",
      "question_number": "3.7",
      "question_title": "Company has a formal customer engagement process."
    },
    "score": 0,
    "value_answer": 3
  }, {
    "current_answer": 2,
    "desired_answer": 2,
    "gap": 0,
    "question": {
      "question_category": "Engage",
      "question_number": "4.1",
      "question_title": "Leadership has given employees the necessary tools to be customer centric"
    },
    "score": 0,
    "value_answer": 2
  }, {
    "current_answer": 3,
    "desired_answer": 5,
    "gap": 2,
    "question": {
      "question_category": "Engage",
      "question_number": "4.2",
      "question_title": "The company culture encourages employees to be innovative and independently come up with novel solutions"
    },
    "score": 2,
    "value_answer": 1
  }, {
    "current_answer": 2,
    "desired_answer": 4,
    "gap": 2,
    "question": {
      "question_category": "Engage",
      "question_number": "4.3",
      "question_title": "Employees are aware that customer centric is important to company"
    },
    "score": 6,
    "value_answer": 3
  }, {
    "current_answer": 5,
    "desired_answer": 5,
    "gap": 0,
    "question": {
      "question_category": "Engage",
      "question_number": "4.4",
      "question_title": "Once decisions are given the green light, they are put in place"
    },
    "score": 0,
    "value_answer": 5
  }, {
    "current_answer": 5,
    "desired_answer": 5,
    "gap": 0,
    "question": {
      "question_category": "Engage",
      "question_number": "4.5",
      "question_title": "Employees can respond in real time with individual solutions  ~ the “moment of truth”"
    },
    "score": 0,
    "value_answer": 2
  }, {
    "current_answer": 4,
    "desired_answer": 5,
    "gap": 1,
    "question": {
      "question_category": "Engage",
      "question_number": "4.6",
      "question_title": "Teams work impartially across organizational boundaries – no silos"
    },
    "score": 4,
    "value_answer": 4
  }, {
    "current_answer": 1,
    "desired_answer": 2,
    "gap": 1,
    "question": {
      "question_category": "Measure",
      "question_number": "5.1",
      "question_title": "Company has a robust customer analysis program"
    },
    "score": 3,
    "value_answer": 3
  }, {
    "current_answer": 2,
    "desired_answer": 3,
    "gap": 1,
    "question": {
      "question_category": "Measure",
      "question_number": "5.2",
      "question_title": "Customer metrics are prevalent throughout the company"
    },
    "score": 3,
    "value_answer": 3
  }, {
    "current_answer": 2,
    "desired_answer": 4,
    "gap": 2,
    "question": {
      "question_category": "Measure",
      "question_number": "5.3",
      "question_title": "KPI’s (Key Performance Indicators) are aligned on customer success"
    },
    "score": 4,
    "value_answer": 2
  }, {
    "current_answer": 3,
    "desired_answer": 4,
    "gap": 1,
    "question": {
      "question_category": "Improve",
      "question_number": "6.1",
      "question_title": "Customer responses are timely and effective"
    },
    "score": 2,
    "value_answer": 2
  }, {
    "current_answer": 5,
    "desired_answer": 5,
    "gap": 0,
    "question": {
      "question_category": "Improve",
      "question_number": "6.2",
      "question_title": "The firm is constantly developing products and services.  Customers and employee feedback are integrated through CI."
    },
    "score": 0,
    "value_answer": 3
  }, {
    "current_answer": 1,
    "desired_answer": 3,
    "gap": 2,
    "question": {
      "question_category": "Improve",
      "question_number": "6.3",
      "question_title": "Top customers are invited to provide meaningful feedback during NPI."
    },
    "score": 6,
    "value_answer": 3
  }]
};

/***/ }),

/***/ "./src/scripts/ExampleReactComponent.js":
/*!**********************************************!*\
  !*** ./src/scripts/ExampleReactComponent.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function ExampleReactComponent() {
  const [clickCount, setClickCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-md",
    onClick: () => setClickCount(prev => prev + 1)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "text-xl"
  }, "Hello from React!"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-sm"
  }, "You have clicked on this component ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "text-yellow-200 font-bold"
  }, clickCount), " times."));
}
/* harmony default export */ __webpack_exports__["default"] = (ExampleReactComponent);

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ (function(module) {

module.exports = window["ReactDOM"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scripts_ExampleReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/ExampleReactComponent */ "./src/scripts/ExampleReactComponent.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_AssesmentResult__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AssesmentResult */ "./src/components/AssesmentResult.js");





if (document.querySelector("#render-react-example-here")) {
  react_dom__WEBPACK_IMPORTED_MODULE_3___default().render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_scripts_ExampleReactComponent__WEBPACK_IMPORTED_MODULE_1__["default"], null), document.querySelector("#render-react-example-here"));
}
if (document.querySelector("#test-result")) {
  react_dom__WEBPACK_IMPORTED_MODULE_3___default().render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_AssesmentResult__WEBPACK_IMPORTED_MODULE_4__["default"], null), document.querySelector("#test-result"));
}
}();
/******/ })()
;
//# sourceMappingURL=index.js.map