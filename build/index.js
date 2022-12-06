/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/TestResult.js":
/*!**************************************!*\
  !*** ./src/components/TestResult.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mockdata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mockdata */ "./src/components/mockdata.js");



function TestResult() {
  const [result, setResult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
  var config = {
    method: 'get',
    mode: 'no-cors',
    headers: {
      'KMQJWT': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0X2lkIjoyLCJ1c2VyX2lkIjoxLCJjb21wYW55X2lkIjoiOGRkMGRlZjktOTdhNC00NTE4LWFmNjItNWVhNjI5ZjRiZDMwIn0.I7515FkEeQCupXczQhVtmvGKu6m_3jf1DhD6FLw-HHU',
      'Authorization': 'Token 7b4c76eaa68c192da374d197b2497151c4b08bc9'
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    fetch('http://15.222.168.158/sat-tool/get-results', config).then(response => {
      // if (response.ok) {
      //   return response.json();
      // }
      // throw new Error('Something went wrong.');
      console.log(_mockdata__WEBPACK_IMPORTED_MODULE_2__.mockData);
    }).then(data => {
      setResult(data);
      setLoading(false);
    }).catch(e => setError(e)).finally(() => setLoading(false));
  }, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, error && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
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
  }, error.message), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    rel: "noopener noreferrer",
    href: "#",
    className: "px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
  }, "Back to homepage"))), loading && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"
  }), !error && !loading && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
  }, "Average(Current)"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    title: "Losses",
    className: "p-3"
  }, "Average(Desired)"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    title: "Win percentage",
    className: "p-3"
  }, "Average(Value)"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    title: "Games behind",
    className: "p-3"
  }, "Gap"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    title: "Home games",
    className: "p-3"
  }, "Score"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, _mockdata__WEBPACK_IMPORTED_MODULE_2__.mockData.results.map((result, key) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    key: key,
    className: "text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "px-3 py-2 text-left"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, result.question.question_number)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "px-3 py-2 text-left"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, result.question.question_category)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "px-3 py-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, result.average_current)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "px-3 py-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, result.average_desired)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "px-3 py-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, result.average_value)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "px-3 py-2 text-right"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, result.gap)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "px-3 py-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, result.score)))))))));
}
/* harmony default export */ __webpack_exports__["default"] = (TestResult);

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
  "results": [{
    "average_current": 2.5,
    "average_desired": 3.5,
    "average_value": 2.83,
    "gap": 1,
    "score": 2.83,
    "question": {
      "question_title": "Leadership prioritizes customer success goals on a par with financial and operational goals in a Balanced Scorecard manner",
      "question_number": 1.1,
      "question_category": "Lead"
    }
  }, {
    "average_current": 2.75,
    "average_desired": 4.5,
    "average_value": 2.25,
    "gap": 1.75,
    "score": 3.94,
    "question": {
      "question_title": "Leadership champions a customer-centric approach to actions",
      "question_number": 1.2,
      "question_category": "Lead"
    }
  }, {
    "average_current": 4.17,
    "average_desired": 4.58,
    "average_value": 3.5,
    "gap": 0.42,
    "score": 1.46,
    "question": {
      "question_title": "Leadership is responsible and rated on top customer success",
      "question_number": 1.3,
      "question_category": "Lead"
    }
  }, {
    "average_current": 3.75,
    "average_desired": 4.42,
    "average_value": 3.58,
    "gap": 0.67,
    "score": 2.39,
    "question": {
      "question_title": "Customers are considered your most valuable external asset",
      "question_number": 1.4,
      "question_category": "Lead"
    }
  }, {
    "average_current": 3.08,
    "average_desired": 3.75,
    "average_value": 2.83,
    "gap": 0.67,
    "score": 1.89,
    "question": {
      "question_title": "All business units are constantly in contact with customer touch points",
      "question_number": 2.1,
      "question_category": "Understand"
    }
  }, {
    "average_current": 2.67,
    "average_desired": 3.33,
    "average_value": 3,
    "gap": 0.67,
    "score": 2,
    "question": {
      "question_title": "All employees really understand the needs of the customer.",
      "question_number": 2.2,
      "question_category": "Understand"
    }
  }, {
    "average_current": 3.17,
    "average_desired": 4.08,
    "average_value": 3.08,
    "gap": 0.92,
    "score": 2.83,
    "question": {
      "question_title": "All employees know who the top customers are.",
      "question_number": 2.3,
      "question_category": "Understand"
    }
  }, {
    "average_current": 3.08,
    "average_desired": 3.67,
    "average_value": 3.42,
    "gap": 0.58,
    "score": 1.99,
    "question": {
      "question_title": "Company has regular customer appreciation events",
      "question_number": 2.4,
      "question_category": "Understand"
    }
  }, {
    "average_current": 3.33,
    "average_desired": 4,
    "average_value": 3.42,
    "gap": 0.67,
    "score": 2.28,
    "question": {
      "question_title": "Complaining customers are treated as most valuable assets for insight",
      "question_number": 2.5,
      "question_category": "Understand"
    }
  }, {
    "average_current": 2.92,
    "average_desired": 3.67,
    "average_value": 2.92,
    "gap": 0.75,
    "score": 2.19,
    "question": {
      "question_title": "Company understands the customer emotional needs and the reasons behind their decision making",
      "question_number": 2.6,
      "question_category": "Understand"
    }
  }, {
    "average_current": 3.08,
    "average_desired": 4.08,
    "average_value": 2.67,
    "gap": 1,
    "score": 2.67,
    "question": {
      "question_title": "Customer input is incorporated into the development of new products and services",
      "question_number": 2.7,
      "question_category": "Understand"
    }
  }, {
    "average_current": 4.42,
    "average_desired": 4.83,
    "average_value": 3.08,
    "gap": 0.42,
    "score": 1.28,
    "question": {
      "question_title": "The desired customer experience is clearly defined from start to finish",
      "question_number": 3.1,
      "question_category": "Build Process"
    }
  }, {
    "average_current": 2.92,
    "average_desired": 3.92,
    "average_value": 2,
    "gap": 1,
    "score": 2,
    "question": {
      "question_title": "All systems, processes and channels are designed to support customer success",
      "question_number": 3.2,
      "question_category": "Build Process"
    }
  }, {
    "average_current": 2.83,
    "average_desired": 3.83,
    "average_value": 3.17,
    "gap": 1,
    "score": 3.17,
    "question": {
      "question_title": "Customers are invited to be partners via Advisory Boards, etc.",
      "question_number": 3.3,
      "question_category": "Build Process"
    }
  }, {
    "average_current": 3,
    "average_desired": 3.75,
    "average_value": 2.92,
    "gap": 0.75,
    "score": 2.19,
    "question": {
      "question_title": "Your most valuable customers are provided superior service",
      "question_number": 3.4,
      "question_category": "Build Process"
    }
  }, {
    "average_current": 3.08,
    "average_desired": 3.67,
    "average_value": 3.42,
    "gap": 0.58,
    "score": 1.99,
    "question": {
      "question_title": "Company is honest and transparent to the customer",
      "question_number": 3.5,
      "question_category": "Build Process"
    }
  }, {
    "average_current": 2.92,
    "average_desired": 3.58,
    "average_value": 2.42,
    "gap": 0.67,
    "score": 1.61,
    "question": {
      "question_title": "Customer can select their preferred communication channels",
      "question_number": 3.6,
      "question_category": "Build Process"
    }
  }, {
    "average_current": 3.25,
    "average_desired": 3.92,
    "average_value": 3.08,
    "gap": 0.67,
    "score": 2.06,
    "question": {
      "question_title": "Company has a formal customer engagement process.",
      "question_number": 3.7,
      "question_category": "Build Process"
    }
  }, {
    "average_current": 2.83,
    "average_desired": 4,
    "average_value": 2.75,
    "gap": 1.17,
    "score": 3.21,
    "question": {
      "question_title": "Leadership has given employees the necessary tools to be customer centric",
      "question_number": 4.1,
      "question_category": "Engage"
    }
  }, {
    "average_current": 3,
    "average_desired": 4.58,
    "average_value": 3.08,
    "gap": 1.58,
    "score": 4.88,
    "question": {
      "question_title": "The company culture encourages employees to be innovative and independently come up with novel solutions",
      "question_number": 4.2,
      "question_category": "Engage"
    }
  }, {
    "average_current": 2.83,
    "average_desired": 3.75,
    "average_value": 2.92,
    "gap": 0.92,
    "score": 2.67,
    "question": {
      "question_title": "Employees are aware that customer centric is important to company",
      "question_number": 4.3,
      "question_category": "Engage"
    }
  }, {
    "average_current": 3.67,
    "average_desired": 4.5,
    "average_value": 2.67,
    "gap": 0.83,
    "score": 2.22,
    "question": {
      "question_title": "Once decisions are given the green light, they are put in place",
      "question_number": 4.4,
      "question_category": "Engage"
    }
  }, {
    "average_current": 3.42,
    "average_desired": 4.25,
    "average_value": 2.83,
    "gap": 0.83,
    "score": 2.36,
    "question": {
      "question_title": "Employees can respond in real time with individual solutions  ~ the “moment of truth”",
      "question_number": 4.5,
      "question_category": "Engage"
    }
  }, {
    "average_current": 3.17,
    "average_desired": 4.33,
    "average_value": 2.83,
    "gap": 1.17,
    "score": 3.31,
    "question": {
      "question_title": "Teams work impartially across organizational boundaries – no silos",
      "question_number": 4.6,
      "question_category": "Engage"
    }
  }, {
    "average_current": 2.92,
    "average_desired": 3.92,
    "average_value": 2.58,
    "gap": 1,
    "score": 2.58,
    "question": {
      "question_title": "Company has a robust customer analysis program",
      "question_number": 5.1,
      "question_category": "Measure"
    }
  }, {
    "average_current": 2.83,
    "average_desired": 3.75,
    "average_value": 3.17,
    "gap": 0.92,
    "score": 2.9,
    "question": {
      "question_title": "Customer metrics are prevalent throughout the company",
      "question_number": 5.2,
      "question_category": "Measure"
    }
  }, {
    "average_current": 3,
    "average_desired": 3.92,
    "average_value": 3.5,
    "gap": 0.92,
    "score": 3.21,
    "question": {
      "question_title": "KPI’s (Key Performance Indicators) are aligned on customer success",
      "question_number": 5.3,
      "question_category": "Measure"
    }
  }, {
    "average_current": 3.42,
    "average_desired": 4.5,
    "average_value": 2.33,
    "gap": 1.08,
    "score": 2.53,
    "question": {
      "question_title": "Customer responses are timely and effective",
      "question_number": 6.1,
      "question_category": "Improve"
    }
  }, {
    "average_current": 3.17,
    "average_desired": 4,
    "average_value": 3.25,
    "gap": 0.83,
    "score": 2.71,
    "question": {
      "question_title": "The firm is constantly developing products and services.  Customers and employee feedback are integrated through CI.",
      "question_number": 6.2,
      "question_category": "Improve"
    }
  }, {
    "average_current": 2.58,
    "average_desired": 3.33,
    "average_value": 3.25,
    "gap": 0.75,
    "score": 2.44,
    "question": {
      "question_title": "Top customers are invited to provide meaningful feedback during NPI.",
      "question_number": 6.3,
      "question_category": "Improve"
    }
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
/* harmony import */ var _components_TestResult__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/TestResult */ "./src/components/TestResult.js");





if (document.querySelector("#render-react-example-here")) {
  react_dom__WEBPACK_IMPORTED_MODULE_3___default().render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_scripts_ExampleReactComponent__WEBPACK_IMPORTED_MODULE_1__["default"], null), document.querySelector("#render-react-example-here"));
}
if (document.querySelector("#test-result")) {
  react_dom__WEBPACK_IMPORTED_MODULE_3___default().render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_TestResult__WEBPACK_IMPORTED_MODULE_4__["default"], null), document.querySelector("#test-result"));
}
}();
/******/ })()
;
//# sourceMappingURL=index.js.map