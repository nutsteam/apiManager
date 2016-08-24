webpackJsonp([15],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	new _vue2.default({
	    el: '#app',
	    data: {
	        user: _utils2.default.user()
	    },
	    methods: {
	        logout: function logout() {
	            _utils2.default.logout();
	            location.reload();
	        }
	    }
	});

/***/ }
]);