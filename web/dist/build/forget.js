webpackJsonp([14],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = new _vue2.default({
	    el: '#app',
	    data: {
	        resendtext: '重发验证邮件',
	        succeed: false,
	        email: ''
	    },
	    methods: {
	        findPassword: function findPassword() {
	            this.$validate(true);
	            if (!this.$form.valid) {
	                return;
	            }
	            var self = this;
	            _utils2.default.post('/user/findpassword.json', { email: this.email }, function () {
	                self.succeed = true;
	            });
	            //history.pushState(null,'找回密码成功','sendemail');
	        },
	        resend: function resend() {
	            this.resendtext = '发送中';
	            var self = this;
	            _utils2.default.post('/user/findpassword.json', { email: this.email }, function () {
	                self.succeed = true;
	                self.resendtext = '发送成功';
	            });
	        },
	        go: function go() {
	            var domain = this.email.substring(this.email.indexOf('@') + 1);
	            location.href = 'http://mail.' + domain;
	        }
	    }
	});

/***/ }
]);