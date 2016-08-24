webpackJsonp([17],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * User: zhoujingjie
	 * Date: 16/8/20
	 * Time: 22:13
	 */
	new _vue2.default({
	    el: '#register',
	    data: { password: null, nickname: null, email: null },
	    methods: {
	        submit: function submit() {
	            this.$validate(true);
	            if (!this.$form.valid) {
	                return false;
	            }
	            _utils2.default.post('/user/register.json', {
	                email: this.email, password: this.password, nickname: this.nickname
	            }, function (rs) {
	                _utils2.default.token(rs.data.token);
	                _utils2.default.user(rs.data.user);
	                toastr.success('注册成功!');
	                location.href = _utils2.default.config.ctx + '/dashboard';
	            });
	        }
	    }
	});

/***/ }
]);