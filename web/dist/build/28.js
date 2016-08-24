webpackJsonp([28],{

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(39)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] html\\dashboard\\vue\\profile.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(40)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-79ce1e42/profile.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            user: _utils2.default.user(),
	            modify: false
	        };
	    },
	    methods: {
	        ok: function ok() {
	            var self = this;
	            _utils2.default.post('/user/' + this.user.id + ".json", { nickname: this.user.nickname }, function () {
	                toastr.success('修改成功');
	                _utils2.default.user(self.user);
	            });
	        }
	    }
	};
	// </script>
	// <template>
	// <div class="db-profile form">
	//     <div class="item">
	//         <div class="col-sm-2">头像</div>
	//         <div class="col-sm-10">
	//             <div class="user-logo">
	//                 <img v-if="user.avatar" v-bind:src="user.avatar" alt="">
	//                 <img src="../../assets/img/defaultlogo.jpg" v-else>
	//                 <div class="logo-edit" title="修改头像"><i class="iconfont icon-edit3"></i></div>
	//             </div>
	//         </div>
	//     </div>
	//     <div class="item">
	//         <div class="col-sm-2">姓名</div>
	//         <div class="col-sm-4"><input type="text" v-on:change="modify=true" v-model="user.nickname" value="{{user.nickname}}" class="text" placeholder="请输入姓名"></div>
	//     </div>
	//
	//     <div class="item">
	//         <div class="col-sm-2">邮箱</div>
	//         <div class="col-sm-6">{{user.email}}</div>
	//     </div>
	//     <div class="item">
	//         <div class="col-sm-2">注册时间</div>
	//         <div class="col-sm-6">{{user.createtime}}</div>
	//     </div>
	//
	//     <div class="item">
	//         <div class="col-sm-2 label"></div>
	//         <div class="col-sm-6"><input type="button" class="btn btn-primary" v-on:click="ok" v-bind:disabled="!modify" value="确认"></div>
	//     </div>
	//
	// </div>
	// </template>
	// <script>

/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\r\n<div class=\"db-profile form\">\r\n    <div class=\"item\">\r\n        <div class=\"col-sm-2\">头像</div>\r\n        <div class=\"col-sm-10\">\r\n            <div class=\"user-logo\">\r\n                <img v-if=\"user.avatar\" v-bind:src=\"user.avatar\" alt=\"\">\r\n                <img src=\"" + __webpack_require__(33) + "\" v-else>\r\n                <div class=\"logo-edit\" title=\"修改头像\"><i class=\"iconfont icon-edit3\"></i></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"item\">\r\n        <div class=\"col-sm-2\">姓名</div>\r\n        <div class=\"col-sm-4\"><input type=\"text\" v-on:change=\"modify=true\" v-model=\"user.nickname\" value=\"{{user.nickname}}\" class=\"text\" placeholder=\"请输入姓名\"></div>\r\n    </div>\r\n\r\n    <div class=\"item\">\r\n        <div class=\"col-sm-2\">邮箱</div>\r\n        <div class=\"col-sm-6\">{{user.email}}</div>\r\n    </div>\r\n    <div class=\"item\">\r\n        <div class=\"col-sm-2\">注册时间</div>\r\n        <div class=\"col-sm-6\">{{user.createtime}}</div>\r\n    </div>\r\n\r\n    <div class=\"item\">\r\n        <div class=\"col-sm-2 label\"></div>\r\n        <div class=\"col-sm-6\"><input type=\"button\" class=\"btn btn-primary\" v-on:click=\"ok\" v-bind:disabled=\"!modify\" value=\"确认\"></div>\r\n    </div>\r\n\r\n</div>\r\n";

/***/ }

});