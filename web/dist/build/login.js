webpackJsonp([16],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function qqlogin(openId, accessToken) {
	    _utils2.default.post('/login/qq.json', { openId: openId, accessToken: accessToken }, function (rs) {
	        _utils2.default.token(rs.data.token);
	        _utils2.default.user(rs.data.user);
	        location.href = _utils2.default.config.ctx + '/dashboard';
	    });
	}
	new _vue2.default({
	    el: '#login',
	    data: { password: null, email: null },
	    created: function created() {
	        if (location.search) {
	            var m = location.search.match(/status=(\w+)/);
	            if (m && m.length == 2) {
	                switch (m[1]) {
	                    case "expired":
	                        toastr.warning('会话已过期');
	                        break;
	                    case "success":
	                        toastr.success('操作成功');
	                        break;
	                }
	            }
	        }
	    },
	    methods: {
	        submit: function submit() {
	            this.$validate(true);
	            if (!this.$form.valid) {
	                return false;
	            }
	            _utils2.default.post('/user/login.json', {
	                email: this.email, password: this.password
	            }, function (rs) {
	                _utils2.default.token(rs.data.token);
	                _utils2.default.user(rs.data.user);
	                location.href = _utils2.default.config.ctx + '/dashboard';
	            });
	        },
	        qq: function qq() {
	            var interval = 0;
	            if (!QC.Login.check()) {
	                QC.Login.showPopup({ appId: 101333549 });
	                window.clearInterval(interval);
	                interval = setInterval(function () {
	                    if (QC.Login.check()) {
	                        window.clearInterval(interval);
	                        QC.Login.getMe(function (openId, accessToken) {
	                            qqlogin(openId, accessToken);
	                        });
	                    }
	                }, 300);
	            } else {
	                QC.Login.getMe(function (openId, accessToken) {
	                    QC.Login.getMe(function (openId, accessToken) {
	                        qqlogin(openId, accessToken);
	                    });
	                });
	            }
	        },
	        weibo: function weibo() {}
	    }
	});

/***/ }
]);