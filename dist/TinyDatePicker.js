var TinyDatePicker =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/date-picker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/date-picker-options.ts":
/*!************************************!*\
  !*** ./src/date-picker-options.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @file Responsible for sanitizing and creating date picker options.\n */\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.DatePickerOptions = void 0;\nconst date_manip_1 = __webpack_require__(/*! ./lib/date-manip */ \"./src/lib/date-manip.ts\");\nconst fns_1 = __webpack_require__(/*! ./lib/fns */ \"./src/lib/fns.ts\");\nvar english = {\n    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],\n    months: [\n        'January',\n        'February',\n        'March',\n        'April',\n        'May',\n        'June',\n        'July',\n        'August',\n        'September',\n        'October',\n        'November',\n        'December',\n    ],\n    today: 'Today',\n    clear: 'Clear',\n    close: 'Close',\n};\n/**\n * DatePickerOptions constructs a new date picker options object, overriding\n * default values with any values specified in opts.\n *\n * @returns {DatePickerOptions}\n * @param _options\n */\nfunction DatePickerOptions(_options = {}) {\n    const options = fns_1.cp(defaults(), _options);\n    var parse = date_manip_1.dateOrParse(options.parse);\n    options.lang = fns_1.cp(english, options.lang);\n    options.parse = parse;\n    options.inRange = makeInRangeFn(options);\n    options.min = parse(options.min || date_manip_1.shiftYear(date_manip_1.now(), -100));\n    options.max = parse(options.max || date_manip_1.shiftYear(date_manip_1.now(), 100));\n    options.highlightedDate = options.parse(options.highlightedDate);\n    options.alignment = options.alignment || 'left';\n    return options;\n}\nexports.DatePickerOptions = DatePickerOptions;\nfunction defaults() {\n    return {\n        lang: english,\n        // Possible values: dp-modal, dp-below, dp-permanent\n        mode: 'dp-modal',\n        // The date to hilight initially if the date picker has no\n        // initial value.\n        highlightedDate: date_manip_1.now(),\n        format: function (dt) {\n            return (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();\n        },\n        parse: function (candidate) {\n            var date = new Date(candidate);\n            return isNaN(date.valueOf()) ? date_manip_1.now() : date;\n        },\n        dateClass: function (date) {\n            return '';\n        },\n        inRange: function () {\n            return true;\n        },\n        appendTo: document.body,\n        alignment: 'left'\n    };\n}\nfunction makeInRangeFn(opts) {\n    var inRange = opts.inRange; // Cache this version, and return a variant\n    return function (dt, dp) {\n        const earlierThanMin = opts.min ? opts.min <= dt : true;\n        const laterThanMax = opts.max ? opts.max >= dt : true;\n        return inRange(dt, dp) && earlierThanMin && laterThanMax;\n    };\n}\n\n\n//# sourceURL=webpack://TinyDatePicker/./src/date-picker-options.ts?");

/***/ }),

/***/ "./src/date-picker.ts":
/*!****************************!*\
  !*** ./src/date-picker.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @file The root date picker file, defines public exports for the library.\n */\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.DatePicker = void 0;\nconst date_picker_options_1 = __webpack_require__(/*! ./date-picker-options */ \"./src/date-picker-options.ts\");\nconst index_1 = __importDefault(__webpack_require__(/*! ./mode/index */ \"./src/mode/index.ts\"));\nconst emitter_1 = __importDefault(__webpack_require__(/*! ./lib/emitter */ \"./src/lib/emitter.ts\"));\n/**\n * DatePicker constructs a new date picker for the specified input\n *\n * @param {HTMLElement | string} input The input or CSS selector associated with the datepicker\n * @param {DatePickerOptions} opts The options for initializing the date picker\n * @returns {DatePicker}\n */\nfunction DatePicker(input, opts) {\n    const emitter = emitter_1.default();\n    const options = date_picker_options_1.DatePickerOptions(opts);\n    const mode = index_1.default(input, emit, options);\n    var me = {\n        get state() {\n            return mode.state;\n        },\n        on: emitter.on,\n        off: emitter.off,\n        setState: mode.setState,\n        open: mode.open,\n        close: mode.close,\n        destroy: mode.destroy,\n    };\n    function emit(evt) {\n        emitter.emit(evt, me);\n    }\n    return me;\n}\nexports.DatePicker = DatePicker;\n\n\n//# sourceURL=webpack://TinyDatePicker/./src/date-picker.ts?");

/***/ }),

/***/ "./src/lib/date-manip.ts":
/*!*******************************!*\
  !*** ./src/lib/date-manip.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @file A generic set of mutation-free date functions.\n */\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.constrainDate = exports.dateOrParse = exports.setMonth = exports.setYear = exports.shiftYear = exports.shiftMonth = exports.shiftDay = exports.datesEq = exports.now = void 0;\n/**\n * now returns the current date without any time values\n *\n * @returns {Date}\n */\nfunction now() {\n    var dt = new Date();\n    dt.setHours(0, 0, 0, 0);\n    return dt;\n}\nexports.now = now;\n/**\n * dateEq compares two dates\n *\n * @param {Date} date1 the first date\n * @param {Date} date2 the second date\n * @returns {boolean}\n */\nfunction datesEq(date1, date2) {\n    return (date1 && date1.toDateString()) === (date2 && date2.toDateString());\n}\nexports.datesEq = datesEq;\n/**\n * shiftDay shifts the specified date by n days\n *\n * @param {Date} dt\n * @param {number} n\n * @returns {Date}\n */\nfunction shiftDay(dt, n) {\n    dt = new Date(dt);\n    dt.setDate(dt.getDate() + n);\n    return dt;\n}\nexports.shiftDay = shiftDay;\n/**\n * shiftMonth shifts the specified date by a specified number of months\n *\n * @param {Date} dt\n * @param {number} n\n * @param {boolean} wrap optional, if true, does not change year\n *                       value, defaults to false\n * @returns {Date}\n */\nfunction shiftMonth(dt, n, wrap = false) {\n    dt = new Date(dt);\n    var dayOfMonth = dt.getDate();\n    var month = dt.getMonth() + n;\n    dt.setDate(1);\n    dt.setMonth(wrap ? (12 + month) % 12 : month);\n    dt.setDate(dayOfMonth);\n    // If dayOfMonth = 31, but the target month only has 30 or 29 or whatever...\n    // head back to the max of the target month\n    if (dt.getDate() < dayOfMonth) {\n        dt.setDate(0);\n    }\n    return dt;\n}\nexports.shiftMonth = shiftMonth;\n/**\n * shiftYear shifts the specified date by n years\n *\n * @param {Date} dt\n * @param {number} n\n * @returns {Date}\n */\nfunction shiftYear(dt, n) {\n    dt = new Date(dt);\n    dt.setFullYear(dt.getFullYear() + n);\n    return dt;\n}\nexports.shiftYear = shiftYear;\n/**\n * setYear changes the specified date to the specified year\n *\n * @param {Date} dt\n * @param {number} year\n */\nfunction setYear(dt, year) {\n    dt = new Date(dt);\n    dt.setFullYear(year);\n    return dt;\n}\nexports.setYear = setYear;\n/**\n * setMonth changes the specified date to the specified month\n *\n * @param {Date} dt\n * @param {number} month\n */\nfunction setMonth(dt, month) {\n    return shiftMonth(dt, month - dt.getMonth());\n}\nexports.setMonth = setMonth;\n/**\n * dateOrParse creates a function which, given a date or string, returns a date\n *\n * @param {function} parse the function used to parse strings\n * @returns {function}\n */\nfunction dateOrParse(parse) {\n    return function (dt) {\n        return dropTime(typeof dt === 'string' ? parse(dt) : dt);\n    };\n}\nexports.dateOrParse = dateOrParse;\n/**\n * constrainDate returns dt or min/max depending on whether dt is out of bounds (inclusive)\n *\n * @export\n * @param {Date} dt\n * @param {Date} min\n * @param {Date} max\n * @returns {Date}\n */\nfunction constrainDate(dt, min, max) {\n    return (dt < min) ? min :\n        (dt > max) ? max :\n            dt;\n}\nexports.constrainDate = constrainDate;\nfunction dropTime(dt) {\n    dt = new Date(dt);\n    dt.setHours(0, 0, 0, 0);\n    return dt;\n}\n\n\n//# sourceURL=webpack://TinyDatePicker/./src/lib/date-manip.ts?");

/***/ }),

/***/ "./src/lib/dom.ts":
/*!************************!*\
  !*** ./src/lib/dom.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @file Helper functions for dealing with dom elements.\n */\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.on = exports.Key = void 0;\nexports.Key = {\n    left: 37,\n    up: 38,\n    right: 39,\n    down: 40,\n    enter: 13,\n    esc: 27,\n};\n/**\n * on attaches an event handler to the specified element, and returns an\n * off function which can be used to remove the handler.\n *\n * @param {string} evt the name of the event to handle\n * @param {HTMLElement} el the element to attach to\n * @param {function} handler the event handler\n * @returns {function} the off function\n */\nfunction on(evt, el, handler) {\n    el.addEventListener(evt, handler, true);\n    return function () {\n        el.removeEventListener(evt, handler, true);\n    };\n}\nexports.on = on;\n\n\n//# sourceURL=webpack://TinyDatePicker/./src/lib/dom.ts?");

/***/ }),

/***/ "./src/lib/emitter.ts":
/*!****************************!*\
  !*** ./src/lib/emitter.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @file Defines simple event emitter behavior.\n */\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * Emitter constructs a new emitter object which has on/off methods.\n *\n * @returns {EventEmitter}\n */\nfunction Emitter() {\n    var handlers = {};\n    function onOne(name, handler) {\n        (handlers[name] = (handlers[name] || [])).push(handler);\n    }\n    function onMany(fns) {\n        for (const name in fns) {\n            onOne(name, fns[name]);\n        }\n    }\n    return {\n        on: function (name, handler) {\n            if (handler) {\n                onOne(name, handler);\n            }\n            else {\n                onMany(name);\n            }\n            return this;\n        },\n        emit: function (name, arg) {\n            (handlers[name] || []).forEach(function (handler) {\n                handler(name, arg);\n            });\n        },\n        off: function (name, handler) {\n            if (!name) {\n                handlers = {};\n            }\n            else if (!handler) {\n                handlers[name] = [];\n            }\n            else {\n                handlers[name] = (handlers[name] || []).filter(function (h) {\n                    return h !== handler;\n                });\n            }\n            return this;\n        }\n    };\n}\nexports.default = Emitter;\n\n\n//# sourceURL=webpack://TinyDatePicker/./src/lib/emitter.ts?");

/***/ }),

/***/ "./src/lib/fns.ts":
/*!************************!*\
  !*** ./src/lib/fns.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @file Utility functions for function manipulation.\n */\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.cp = exports.noop = exports.bufferFn = void 0;\n/**\n * bufferFn buffers calls to fn so they only happen every ms milliseconds\n *\n * @param {number} ms number of milliseconds\n * @param {function} fn the function to be buffered\n * @returns {function}\n */\nfunction bufferFn(ms, fn) {\n    let timeout = undefined;\n    return function () {\n        clearTimeout(timeout);\n        timeout = setTimeout(fn, ms);\n    };\n}\nexports.bufferFn = bufferFn;\n/**\n * noop is a function which does nothing at all.\n */\nfunction noop() { }\nexports.noop = noop;\n/**\n * copy properties from object o2 to object o1.\n *\n * @params {Object} o1\n * @params {Object} o2\n * @returns {Object}\n */\nfunction cp(...args) {\n    const o1 = args[0];\n    for (let i = 1; i < args.length; ++i) {\n        const o2 = args[i] || {};\n        for (const key in o2) {\n            o1[key] = o2[key];\n        }\n    }\n    return o1;\n}\nexports.cp = cp;\n\n\n//# sourceURL=webpack://TinyDatePicker/./src/lib/fns.ts?");

/***/ }),

/***/ "./src/mode/base-mode.ts":
/*!*******************************!*\
  !*** ./src/mode/base-mode.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * @file Defines the base date picker behavior, overridden by constious modes.\n */\nconst day_picker_1 = __importDefault(__webpack_require__(/*! ../views/day-picker */ \"./src/views/day-picker.ts\"));\nconst month_picker_1 = __importDefault(__webpack_require__(/*! ../views/month-picker */ \"./src/views/month-picker.ts\"));\nconst year_picker_1 = __importDefault(__webpack_require__(/*! ../views/year-picker */ \"./src/views/year-picker.ts\"));\nconst fns_1 = __webpack_require__(/*! ../lib/fns */ \"./src/lib/fns.ts\");\nconst dom_1 = __webpack_require__(/*! ../lib/dom */ \"./src/lib/dom.ts\");\nconst date_manip_1 = __webpack_require__(/*! ../lib/date-manip */ \"./src/lib/date-manip.ts\");\nconst views = {\n    day: day_picker_1.default,\n    year: year_picker_1.default,\n    month: month_picker_1.default,\n};\nfunction BaseMode(input, emit, opts) {\n    let detatchInputEvents; // A function that detaches all events from the input\n    let closing = false; // A hack to prevent calendar from re-opening when closing.\n    let selectedDate; // The currently selected date\n    const dp = {\n        // The root DOM element for the date picker, initialized on first open.\n        el: undefined,\n        opts: opts,\n        shouldFocusOnBlur: true,\n        shouldFocusOnRender: true,\n        state: initialState(),\n        adjustPosition: fns_1.noop,\n        containerHTML: '<div class=\"dp\"></div>',\n        attachToDom: function () {\n            opts.appendTo.appendChild(dp.el);\n        },\n        updateInput: function (selectedDate) {\n            const e = new CustomEvent('change', { bubbles: true });\n            input.value = selectedDate ? opts.format(selectedDate) : '';\n            input.dispatchEvent(e);\n        },\n        computeSelectedDate: function () {\n            return opts.parse(input.value);\n        },\n        currentView: function () {\n            return views[dp.state.view];\n        },\n        open: function () {\n            if (closing) {\n                return;\n            }\n            if (!dp.el) {\n                dp.el = createContainerElement(opts, dp.containerHTML);\n                attachContainerEvents(dp);\n            }\n            selectedDate = date_manip_1.constrainDate(dp.computeSelectedDate(), opts.min, opts.max);\n            dp.state.highlightedDate = selectedDate || opts.highlightedDate;\n            dp.state.view = 'day';\n            dp.attachToDom();\n            dp.render();\n            emit('open');\n        },\n        isVisible: function () {\n            return !!dp.el && !!dp.el.parentNode;\n        },\n        hasFocus: function () {\n            const focused = document.activeElement;\n            return dp.el &&\n                dp.el.contains(focused) &&\n                focused.className.indexOf('dp-focuser') < 0;\n        },\n        shouldHide: function () {\n            return dp.isVisible();\n        },\n        close: function (becauseOfBlur) {\n            const el = dp.el;\n            if (!dp.isVisible()) {\n                return;\n            }\n            if (el) {\n                const parent = el.parentNode;\n                parent && parent.removeChild(el);\n            }\n            closing = true;\n            if (becauseOfBlur && dp.shouldFocusOnBlur) {\n                focusInput(input);\n            }\n            // When we close, the input often gains refocus, which\n            // can then launch the date picker again, so we buffer\n            // a bit and don't show the date picker within N ms of closing\n            setTimeout(function () {\n                closing = false;\n            }, 100);\n            emit('close');\n        },\n        destroy: function () {\n            dp.close();\n            detatchInputEvents();\n        },\n        render: function () {\n            if (!dp.el) {\n                return;\n            }\n            const hadFocus = dp.hasFocus();\n            const html = dp.currentView().render(dp);\n            if (html) {\n                dp.el.firstChild.innerHTML = html;\n            }\n            dp.adjustPosition();\n            if (hadFocus || dp.shouldFocusOnRender) {\n                focusCurrent(dp);\n            }\n        },\n        // Conceptually similar to setState in React, updates\n        // the view state and re-renders.\n        setState: function (state) {\n            for (const key in state) {\n                dp.state[key] = state[key];\n            }\n            emit('statechange');\n            dp.render();\n        },\n    };\n    detatchInputEvents = attachInputEvents(input, dp);\n    // Builds the initial view state\n    // selectedDate is a special case and causes changes to highlightedDate\n    // highlightedDate is set on open, so remains undefined initially\n    // view is the current view (day, month, year)\n    function initialState() {\n        return {\n            get selectedDate() {\n                return selectedDate;\n            },\n            set selectedDate(dt) {\n                if (dt && !opts.inRange(dt)) {\n                    return;\n                }\n                if (dt) {\n                    selectedDate = new Date(dt);\n                    dp.state.highlightedDate = selectedDate;\n                }\n                else {\n                    selectedDate = dt;\n                }\n                dp.updateInput(selectedDate);\n                emit('select');\n                dp.close();\n            },\n            view: 'day',\n        };\n    }\n    return dp;\n}\nexports.default = BaseMode;\nfunction createContainerElement(opts, containerHTML) {\n    const el = document.createElement('div');\n    el.className = opts.mode;\n    el.innerHTML = containerHTML;\n    return el;\n}\nfunction attachInputEvents(input, dp) {\n    const bufferShow = fns_1.bufferFn(5, function () {\n        if (dp.shouldHide()) {\n            dp.close();\n        }\n        else {\n            dp.open();\n        }\n    });\n    const off = [\n        dom_1.on('blur', input, fns_1.bufferFn(150, function () {\n            if (!dp.hasFocus()) {\n                dp.close(true);\n            }\n        })),\n        dom_1.on('mousedown', input, function () {\n            if (input === document.activeElement) {\n                bufferShow();\n            }\n        }),\n        dom_1.on('focus', input, bufferShow),\n        dom_1.on('input', input, function (e) {\n            if (!e || !e.target) {\n                return;\n            }\n            const target = e.target;\n            const date = dp.opts.parse(target.value);\n            isNaN(date.valueOf()) || dp.setState({\n                highlightedDate: date,\n            });\n        }),\n    ];\n    // Unregister all events that were registered above.\n    return function () {\n        off.forEach(function (f) {\n            f();\n        });\n    };\n}\nfunction focusCurrent(dp) {\n    const current = dp.el.querySelector('.dp-current');\n    return current && current.focus();\n}\nfunction attachContainerEvents(dp) {\n    const el = dp.el;\n    const calEl = el.querySelector('.dp');\n    // Hack to get iOS to show active CSS states\n    el.ontouchstart = fns_1.noop;\n    function onClick(e) {\n        if (!e) {\n            return;\n        }\n        e.target.className.split(' ').forEach(function (evt) {\n            const handler = dp.currentView().onClick[evt];\n            handler && handler(e, dp);\n        });\n    }\n    // The calender fires a blur event *every* time we redraw\n    // this means we need to buffer the blur event to see if\n    // it still has no focus after redrawing, and only then\n    // do we return focus to the input. A possible other approach\n    // would be to set context.redrawing = true on redraw and\n    // set it to false in the blur event.\n    dom_1.on('blur', calEl, fns_1.bufferFn(150, function () {\n        if (!dp.hasFocus()) {\n            dp.close(true);\n        }\n    }));\n    dom_1.on('keydown', el, function (e) {\n        const ke = e;\n        const code = ke.code || ke.keyCode;\n        if (code === dom_1.Key.enter) {\n            onClick(ke);\n        }\n        else {\n            dp.currentView().onKeyDown(ke, dp);\n        }\n    });\n    // If the user clicks in non-focusable space, but\n    // still within the date picker, we don't want to\n    // hide, so we need to hack some things...\n    dom_1.on('mousedown', calEl, function (e) {\n        //e.target.focus && e.target.focus(); // IE hack\n        if (document.activeElement !== e.target) {\n            e.preventDefault();\n            focusCurrent(dp);\n        }\n    });\n    dom_1.on('click', el, onClick);\n}\nfunction focusInput(input) {\n    // When the modal closes, we need to focus the original input so the\n    // user can continue tabbing from where they left off.\n    input.focus();\n    // iOS zonks out if we don't blur the input, so...\n    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {\n        input.blur();\n    }\n}\n\n\n//# sourceURL=webpack://TinyDatePicker/./src/mode/base-mode.ts?");

/***/ }),

/***/ "./src/mode/dropdown-mode.ts":
/*!***********************************!*\
  !*** ./src/mode/dropdown-mode.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @file Defines the dropdown date picker behavior.\n */\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst base_mode_1 = __importDefault(__webpack_require__(/*! ./base-mode */ \"./src/mode/base-mode.ts\"));\nfunction DropdownMode(input, emit, opts) {\n    const dp = base_mode_1.default(input, emit, opts);\n    dp.shouldFocusOnBlur = false;\n    Object.defineProperty(dp, 'shouldFocusOnRender', {\n        get: function () {\n            return input !== document.activeElement;\n        },\n    });\n    dp.adjustPosition = function () {\n        autoPosition(input, dp, opts.alignment);\n    };\n    return dp;\n}\nexports.default = DropdownMode;\nfunction autoPosition(input, dp, alignment) {\n    const inputPos = input.getBoundingClientRect();\n    const win = window;\n    adjustCalY(dp, inputPos, win);\n    adjustCalX(dp, inputPos, win, alignment);\n    dp.el.style.visibility = '';\n}\nfunction adjustCalX(dp, inputPos, win, alignment) {\n    const cal = dp.el;\n    const scrollLeft = win.pageXOffset;\n    const inputLeft = inputPos.left + scrollLeft;\n    const maxRight = win.innerWidth + scrollLeft;\n    const offsetWidth = cal.offsetWidth;\n    const calRight = inputLeft + offsetWidth;\n    const shiftedLeft = maxRight - offsetWidth;\n    const left = calRight > maxRight && shiftedLeft > 0 ? shiftedLeft : inputLeft;\n    if (alignment === 'right') {\n        cal.style.left = left + (inputPos.width - offsetWidth) + 'px';\n    }\n    else {\n        cal.style.left = left + 'px';\n    }\n}\nfunction adjustCalY(dp, inputPos, win) {\n    const cal = dp.el;\n    const scrollTop = win.pageYOffset;\n    const inputTop = scrollTop + inputPos.top;\n    const calHeight = cal.offsetHeight;\n    const belowTop = inputTop + inputPos.height + 8;\n    const aboveTop = inputTop - calHeight - 8;\n    const isAbove = (aboveTop > 0 && belowTop + calHeight > scrollTop + win.innerHeight);\n    const top = isAbove ? aboveTop : belowTop;\n    if (cal.classList) {\n        cal.classList.toggle('dp-is-above', isAbove);\n        cal.classList.toggle('dp-is-below', !isAbove);\n    }\n    cal.style.top = top + 'px';\n}\n\n\n//# sourceURL=webpack://TinyDatePicker/./src/mode/dropdown-mode.ts?");

/***/ }),

/***/ "./src/mode/index.ts":
/*!***************************!*\
  !*** ./src/mode/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @file Defines the various date picker modes (modal, dropdown, permanent)\n */\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst modal_mode_1 = __importDefault(__webpack_require__(/*! ./modal-mode */ \"./src/mode/modal-mode.ts\"));\nconst dropdown_mode_1 = __importDefault(__webpack_require__(/*! ./dropdown-mode */ \"./src/mode/dropdown-mode.ts\"));\nconst permanent_mode_1 = __importDefault(__webpack_require__(/*! ./permanent-mode */ \"./src/mode/permanent-mode.ts\"));\nfunction Mode(input, emit, opts) {\n    const el = input instanceof HTMLElement ? input : document.querySelector(input);\n    if (!el) {\n        throw new Error(`The provided input '${input}' could not be found.`);\n    }\n    switch (opts.mode) {\n        case 'dp-modal':\n            return modal_mode_1.default(el, emit, opts);\n        case 'dp-below':\n            return dropdown_mode_1.default(el, emit, opts);\n        case 'dp-permanent':\n            return permanent_mode_1.default(el, emit, opts);\n        default:\n            throw new Error(`Unknown mode: '${opts.mode}`);\n    }\n}\nexports.default = Mode;\n\n\n//# sourceURL=webpack://TinyDatePicker/./src/mode/index.ts?");

/***/ }),

/***/ "./src/mode/modal-mode.ts":
/*!********************************!*\
  !*** ./src/mode/modal-mode.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * @file Defines the modal date picker behavior.\n */\nconst base_mode_1 = __importDefault(__webpack_require__(/*! ./base-mode */ \"./src/mode/base-mode.ts\"));\nfunction ModalMode(input, emit, opts) {\n    const dp = base_mode_1.default(input, emit, opts);\n    // In modal mode, users really shouldn't be able to type in\n    // the input, as all input is done via the calendar.\n    input.readOnly = true;\n    // In modal mode, we need to know when the user has tabbed\n    // off the end of the calendar, and set focus to the original\n    // input. To do this, we add a special element to the DOM.\n    // When the user tabs off the bottom of the calendar, they\n    // will tab onto this element.\n    dp.containerHTML += '<a href=\"#\" class=\"dp-focuser\">.</a>';\n    return dp;\n}\nexports.default = ModalMode;\n\n\n//# sourceURL=webpack://TinyDatePicker/./src/mode/modal-mode.ts?");

/***/ }),

/***/ "./src/mode/permanent-mode.ts":
/*!************************************!*\
  !*** ./src/mode/permanent-mode.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * @file Defines the permanent date picker behavior.\n */\nconst fns_1 = __webpack_require__(/*! ../lib/fns */ \"./src/lib/fns.ts\");\nconst base_mode_1 = __importDefault(__webpack_require__(/*! ./base-mode */ \"./src/mode/base-mode.ts\"));\nfunction PermanentMode(root, emit, opts) {\n    const dp = base_mode_1.default(root, emit, opts);\n    dp.close = fns_1.noop;\n    dp.updateInput = fns_1.noop;\n    dp.shouldFocusOnRender = opts.shouldFocusOnRender || false;\n    dp.computeSelectedDate = function () {\n        return opts.highlightedDate;\n    };\n    dp.attachToDom = function () {\n        if (dp.el) {\n            root.appendChild(dp.el);\n        }\n    };\n    dp.open();\n    return dp;\n}\nexports.default = PermanentMode;\n\n\n//# sourceURL=webpack://TinyDatePicker/./src/mode/permanent-mode.ts?");

/***/ }),

/***/ "./src/views/day-picker.ts":
/*!*********************************!*\
  !*** ./src/views/day-picker.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @file Manages the calendar / day-picker view.\n */\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dom_1 = __webpack_require__(/*! ../lib/dom */ \"./src/lib/dom.ts\");\nconst date_manip_1 = __webpack_require__(/*! ../lib/date-manip */ \"./src/lib/date-manip.ts\");\nexports.default = {\n    onKeyDown: keyDown,\n    onClick: {\n        'dp-day': selectDay,\n        'dp-next': gotoNextMonth,\n        'dp-prev': gotoPrevMonth,\n        'dp-today': selectToday,\n        'dp-clear': clear,\n        'dp-close': close,\n        'dp-cal-month': showMonthPicker,\n        'dp-cal-year': showYearPicker,\n    },\n    render: render\n};\n/**\n * view renders the calendar (day picker) as an HTML string.\n *\n * @param {DatePickerContext} context the date picker being rendered\n * @returns {string}\n */\nfunction render(dp) {\n    const opts = dp.opts;\n    const lang = opts.lang;\n    const state = dp.state;\n    const dayNames = lang.days;\n    const dayOffset = opts.dayOffset || 0;\n    const selectedDate = state.selectedDate;\n    const highlightedDate = state.highlightedDate;\n    const hilightedMonth = highlightedDate.getMonth();\n    const today = date_manip_1.now().getTime();\n    return ('<div class=\"dp-cal\">' +\n        '<header class=\"dp-cal-header\">' +\n        '<button tabindex=\"-1\" type=\"button\" class=\"dp-prev\">Prev</button>' +\n        '<button tabindex=\"-1\" type=\"button\" class=\"dp-cal-month\">' +\n        lang.months[hilightedMonth] +\n        '</button>' +\n        '<button tabindex=\"-1\" type=\"button\" class=\"dp-cal-year\">' +\n        highlightedDate.getFullYear() +\n        '</button>' +\n        '<button tabindex=\"-1\" type=\"button\" class=\"dp-next\">Next</button>' +\n        '</header>' +\n        '<div class=\"dp-days\">' +\n        dayNames.map(function (name, i) {\n            return ('<span class=\"dp-col-header\">' + dayNames[(i + dayOffset) % dayNames.length] + '</span>');\n        }).join('') +\n        mapDays(highlightedDate, dayOffset, function (date) {\n            const isNotInMonth = date.getMonth() !== hilightedMonth;\n            const isDisabled = !opts.inRange(date);\n            const isToday = date.getTime() === today;\n            let className = 'dp-day';\n            className += (isNotInMonth ? ' dp-edge-day' : '');\n            className += (date_manip_1.datesEq(date, highlightedDate) ? ' dp-current' : '');\n            className += (date_manip_1.datesEq(date, selectedDate) ? ' dp-selected' : '');\n            className += (isDisabled ? ' dp-day-disabled' : '');\n            className += (isToday ? ' dp-day-today' : '');\n            className += ' ' + opts.dateClass(date);\n            return ('<button tabindex=\"-1\" type=\"button\" class=\"' + className + '\" data-date=\"' + date.getTime() + '\">' +\n                date.getDate() +\n                '</button>');\n        }) +\n        '</div>' +\n        '<footer class=\"dp-cal-footer\">' +\n        '<button tabindex=\"-1\" type=\"button\" class=\"dp-today\">' + lang.today + '</button>' +\n        '<button tabindex=\"-1\" type=\"button\" class=\"dp-clear\">' + lang.clear + '</button>' +\n        '<button tabindex=\"-1\" type=\"button\" class=\"dp-close\">' + lang.close + '</button>' +\n        '</footer>' +\n        '</div>');\n}\n/**\n * keyDown handles the key down event for the day-picker\n *\n * @param {Event} e\n * @param {DatePickerContext} dp\n */\nfunction keyDown(e, dp) {\n    const key = e.code || e.keyCode;\n    const shiftBy = (key === dom_1.Key.left) ? -1 :\n        (key === dom_1.Key.right) ? 1 :\n            (key === dom_1.Key.up) ? -7 :\n                (key === dom_1.Key.down) ? 7 :\n                    0;\n    if (key === dom_1.Key.esc) {\n        dp.close();\n    }\n    else if (shiftBy) {\n        e.preventDefault();\n        dp.setState({\n            highlightedDate: date_manip_1.shiftDay(dp.state.highlightedDate, shiftBy)\n        });\n    }\n}\nfunction selectToday(e, dp) {\n    dp.setState({\n        selectedDate: date_manip_1.now(),\n    });\n}\nfunction clear(e, dp) {\n    dp.setState({\n        selectedDate: null,\n    });\n}\nfunction close(e, dp) {\n    dp.close();\n}\nfunction showMonthPicker(e, dp) {\n    dp.setState({\n        view: 'month'\n    });\n}\nfunction showYearPicker(e, dp) {\n    dp.setState({\n        view: 'year'\n    });\n}\nfunction gotoNextMonth(e, dp) {\n    const highlightedDate = dp.state.highlightedDate;\n    dp.setState({\n        highlightedDate: date_manip_1.shiftMonth(highlightedDate, 1)\n    });\n}\nfunction gotoPrevMonth(e, dp) {\n    const highlightedDate = dp.state.highlightedDate;\n    dp.setState({\n        highlightedDate: date_manip_1.shiftMonth(highlightedDate, -1)\n    });\n}\nfunction selectDay(e, dp) {\n    if (!e.target) {\n        return;\n    }\n    const evTarget = e.target;\n    dp.setState({\n        selectedDate: new Date(parseInt(evTarget.getAttribute('data-date'))),\n    });\n}\nfunction mapDays(currentDate, dayOffset, fn) {\n    let result = '';\n    const iter = new Date(currentDate);\n    iter.setDate(1);\n    iter.setDate(1 - iter.getDay() + dayOffset);\n    // If we are showing monday as the 1st of the week,\n    // and the monday is the 2nd of the month, the sunday won't\n    // show, so we need to shift backwards\n    if (dayOffset && iter.getDate() === dayOffset + 1) {\n        iter.setDate(dayOffset - 6);\n    }\n    // We are going to have 6 weeks always displayed to keep a consistent\n    // calendar size\n    for (let day = 0; day < (6 * 7); ++day) {\n        result += fn(iter);\n        iter.setDate(iter.getDate() + 1);\n    }\n    return result;\n}\n\n\n//# sourceURL=webpack://TinyDatePicker/./src/views/day-picker.ts?");

/***/ }),

/***/ "./src/views/month-picker.ts":
/*!***********************************!*\
  !*** ./src/views/month-picker.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @file Manages the month-picker view.\n */\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dom_1 = __webpack_require__(/*! ../lib/dom */ \"./src/lib/dom.ts\");\nconst date_manip_1 = __webpack_require__(/*! ../lib/date-manip */ \"./src/lib/date-manip.ts\");\nexports.default = {\n    onKeyDown: keyDown,\n    onClick: {\n        'dp-month': onChooseMonth\n    },\n    render: render\n};\nfunction onChooseMonth(e, dp) {\n    dp.setState({\n        highlightedDate: date_manip_1.setMonth(dp.state.highlightedDate, parseInt(e.target.getAttribute('data-month'))),\n        view: 'day',\n    });\n}\n/**\n * render renders the month picker as an HTML string\n *\n * @param {DatePickerContext} dp the date picker context\n * @returns {string}\n */\nfunction render(dp) {\n    const opts = dp.opts;\n    const lang = opts.lang;\n    const months = lang.months;\n    const currentDate = dp.state.highlightedDate;\n    const currentMonth = currentDate.getMonth();\n    return ('<div class=\"dp-months\">' +\n        months.map(function (month, i) {\n            let className = 'dp-month';\n            className += (currentMonth === i ? ' dp-current' : '');\n            return ('<button tabindex=\"-1\" type=\"button\" class=\"' + className + '\" data-month=\"' + i + '\">' +\n                month +\n                '</button>');\n        }).join('') +\n        '</div>');\n}\n/**\n * keyDown handles keydown events that occur in the month picker\n *\n * @param {Event} e\n* @param {DatePickerContext} dp\n */\nfunction keyDown(e, dp) {\n    const key = e.code || e.keyCode;\n    const shiftBy = (key === dom_1.Key.left) ? -1 :\n        (key === dom_1.Key.right) ? 1 :\n            (key === dom_1.Key.up) ? -3 :\n                (key === dom_1.Key.down) ? 3 :\n                    0;\n    if (key === dom_1.Key.esc) {\n        dp.setState({\n            view: 'day',\n        });\n    }\n    else if (shiftBy) {\n        e.preventDefault();\n        dp.setState({\n            highlightedDate: date_manip_1.shiftMonth(dp.state.highlightedDate, shiftBy, true)\n        });\n    }\n}\n\n\n//# sourceURL=webpack://TinyDatePicker/./src/views/month-picker.ts?");

/***/ }),

/***/ "./src/views/year-picker.ts":
/*!**********************************!*\
  !*** ./src/views/year-picker.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @file Manages the year-picker view.\n */\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dom_1 = __webpack_require__(/*! ../lib/dom */ \"./src/lib/dom.ts\");\nconst date_manip_1 = __webpack_require__(/*! ../lib/date-manip */ \"./src/lib/date-manip.ts\");\nexports.default = {\n    render: render,\n    onKeyDown: keyDown,\n    onClick: {\n        'dp-year': onChooseYear\n    },\n};\n/**\n * view renders the year picker as an HTML string.\n *\n * @param {DatePickerContext} dp the date picker context\n * @returns {string}\n */\nfunction render(dp) {\n    const state = dp.state;\n    const currentYear = state.highlightedDate.getFullYear();\n    const selectedYear = state.selectedDate.getFullYear();\n    return ('<div class=\"dp-years\">' +\n        mapYears(dp, function (year) {\n            let className = 'dp-year';\n            className += (year === currentYear ? ' dp-current' : '');\n            className += (year === selectedYear ? ' dp-selected' : '');\n            return ('<button tabindex=\"-1\" type=\"button\" class=\"' + className + '\" data-year=\"' + year + '\">' +\n                year +\n                '</button>');\n        }) +\n        '</div>');\n}\nfunction onChooseYear(e, dp) {\n    dp.setState({\n        highlightedDate: date_manip_1.setYear(dp.state.highlightedDate, parseInt(e.target.getAttribute('data-year'))),\n        view: 'day',\n    });\n}\nfunction keyDown(e, dp) {\n    const key = e.code || e.keyCode;\n    const opts = dp.opts;\n    const shiftBy = (key === dom_1.Key.left || key === dom_1.Key.up) ? 1 :\n        (key === dom_1.Key.right || key === dom_1.Key.down) ? -1 :\n            0;\n    if (key === dom_1.Key.esc) {\n        dp.setState({\n            view: 'day',\n        });\n    }\n    else if (shiftBy) {\n        e.preventDefault();\n        const shiftedYear = date_manip_1.shiftYear(dp.state.highlightedDate, shiftBy);\n        dp.setState({\n            highlightedDate: date_manip_1.constrainDate(shiftedYear, opts.min, opts.max),\n        });\n    }\n}\nfunction mapYears(dp, fn) {\n    let result = '';\n    const max = dp.opts.max.getFullYear();\n    for (let i = max; i >= dp.opts.min.getFullYear(); --i) {\n        result += fn(i);\n    }\n    return result;\n}\n\n\n//# sourceURL=webpack://TinyDatePicker/./src/views/year-picker.ts?");

/***/ })

/******/ });