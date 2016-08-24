webpackJsonp([21],{

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(19)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] html\\dashboard\\vue\\quit.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(20)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-b943adee/quit.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 19:
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
	         project: {}
	      };
	   },
	   route: {
	      activate: function activate() {
	         this.$parent.showProject = true;
	      },
	      deactivate: function deactivate() {
	         this.$parent.showProject = false;
	      },
	      data: function data() {
	         var self = this;
	         /*utils.get('/project/'+this.$route.params.id+'/info.json',{},function(rs){
	            self.project=rs.data.project;
	         });*/
	         self.$parent.projectId = this.$route.params.id;
	      }
	   },
	   methods: {
	      ok: function ok() {
	         _utils2.default.delete('/project/' + this.$route.params.id + '/quit.json', function () {
	            toastr.success('操作成功');
	         });
	      }
	   }
	};
	// </script>
	// <template>
	// <div class="db-view-quit">
	//    <button class="btn btn-danger" v-on:click="ok" style="padding: 10px 100px;">退出项目</button>
	// </div>
	// </template>
	// <script>

/***/ },

/***/ 20:
/***/ function(module, exports) {

	module.exports = "\r\n<div class=\"db-view-quit\">\r\n   <button class=\"btn btn-danger\" v-on:click=\"ok\" style=\"padding: 10px 100px;\">退出项目</button>\r\n</div>\r\n";

/***/ }

});