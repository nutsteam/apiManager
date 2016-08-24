webpackJsonp([26],{

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_template__ = __webpack_require__(35)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-3361564c/profile-relation.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 35:
/***/ function(module, exports) {

	module.exports = "\r\n<div class=\"db-relation cb\">\r\n    <h1>关联账户</h1><br/>\r\n    <p class=\"db-rel-desc\">通过关联账户的绑定，您可以使用相关的授权账号登录小幺鸡服务。您也可以通过这些社会化服务，<br/>及时获取小幺鸡服务的信息。</p>\r\n<ul>\r\n    <li class=\"ta-c\">\r\n        <i class=\"iconfont icon-github\"></i>\r\n        <p>Github</p>\r\n        <input type=\"button\" class=\"btn btn-black-box\" value=\"关联Github\">\r\n    </li>\r\n    <li class=\"ta-c\">\r\n        <i class=\"iconfont icon-weibo\"></i>\r\n        <p>微博</p>\r\n        <input type=\"button\" class=\"btn btn-black-box\" value=\"关联微博\">\r\n    </li>\r\n    <li class=\"ta-c\">\r\n        <i class=\"iconfont icon-qq\"></i>\r\n        <p>QQ</p>\r\n        <input type=\"button\" class=\"btn btn-black-box\" value=\"关联QQ\">\r\n    </li>\r\n</ul>\r\n</div>\r\n";

/***/ }

});