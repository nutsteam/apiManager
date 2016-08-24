webpackJsonp([13],[
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
	    data: { password: null, rePassword: null, email: null, id: null },
	    created: function created() {
	        if (location.search) {
	            var match = location.search.match(/token=([\d|\w]+)/);
	            if (match && match.length == 2) {
	                var token = match[1];
	                if (token) {
	                    var d = atob(token).split("!");
	                    this.id = d[0];
	                    this.email = d[1];
	                    return true;
	                }
	            }
	        }
	        toastr.error('无效地址');
	    },

	    methods: {
	        submit: function submit() {
	            this.$validate(true);
	            if (!this.$form.valid) {
	                return false;
	            }
	            if (this.password != this.rePassword) {
	                toastr.error('两次密码输入不一致');
	                return;
	            }
	            _utils2.default.post('/user/newpassword.json', {
	                email: this.email, password: this.password, id: this.id
	            }, function (rs) {
	                toastr.success('操作成功!');
	                location.href = _utils2.default.config.ctx + '/login.html?status=success';
	            });
	        }
	    }
	});

/***/ }
]);