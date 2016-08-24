webpackJsonp([22],{

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(22)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] html\\dashboard\\vue\\release.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(23)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-758d9f86/release.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	   route: {
	      activate: function activate() {
	         this.$parent.showProject = true;
	      },
	      deactivate: function deactivate() {
	         this.$parent.showProject = false;
	      },
	      data: function data() {
	         var self = this;
	         _utils2.default.get('/project/' + this.$route.params.id + '/info.json', {}, function (rs) {
	            self.project = rs.data.project;
	         });
	         self.$parent.projectId = this.$route.params.id;
	      }
	   },
	   data: function data() {
	      return {
	         isOk: false,
	         project: null,
	         projectName: '',
	         status: {
	            deleteModal: false
	         }
	      };
	   },
	   watch: {
	      "status.deleteModal": function statusDeleteModal(value) {
	         if (value) {
	            setTimeout(function () {
	               $("#projectName").focus();
	            }, 100);
	         }
	      }
	   },
	   methods: {
	      ok: function ok() {
	         var project = this.project;
	         var id = project.id;
	         var self = this;
	         if (project.name == this.projectName) {
	            _utils2.default.delete('/project/' + id + '.json', function (rs) {
	               toastr.success('删除成功');
	               self.$route.router.go({ path: '/welcome' });
	               self.$parent.reloadProject = true;
	            });
	         } else {
	            this.isOk = true;
	         }
	      }
	   }
	};
	// </script>
	// <template>
	// <div class="db-view-release">
	//       <button class="btn btn-danger" v-on:click="status.deleteModal=true" style="padding: 10px 100px;">删除项目</button>
	//    <div class="modal" v-cloak v-if="status.deleteModal">
	//       <div class="modal-header">
	//          <i class="iconfont icon-close modal-close" v-on:click="status.deleteModal=false"></i>
	//       </div>
	//       <div class="modal-content">
	//          <div class="modal-layout1 form">
	//                <p class="title">删除项目</p>
	//                <input type="text" class="k1 text" id="projectName" v-bind:class="{'invalid':isOk}" maxlength="20" initial="off"
	//                       v-model="projectName"
	//                       autofocus="autofocus"
	//                       tabindex="1" placeholder="请输入项目名称">
	//             <div class="tip">项目名称错误</div>
	//             <div class="ta-c actions">
	//                <button class="btn btn-default-box middle" tabindex="3" v-on:click="status.deleteModal=false">取消
	//                </button>
	//                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	//                <button class="btn btn-danger middle" v-on:click="ok" tabindex="2">确定</button>
	//             </div>
	//          </div>
	//       </div>
	//    </div>
	// </div>
	// </template>
	//
	// <script>

/***/ },

/***/ 23:
/***/ function(module, exports) {

	module.exports = "\r\n<div class=\"db-view-release\">\r\n      <button class=\"btn btn-danger\" v-on:click=\"status.deleteModal=true\" style=\"padding: 10px 100px;\">删除项目</button>\r\n   <div class=\"modal\" v-cloak v-if=\"status.deleteModal\">\r\n      <div class=\"modal-header\">\r\n         <i class=\"iconfont icon-close modal-close\" v-on:click=\"status.deleteModal=false\"></i>\r\n      </div>\r\n      <div class=\"modal-content\">\r\n         <div class=\"modal-layout1 form\">\r\n               <p class=\"title\">删除项目</p>\r\n               <input type=\"text\" class=\"k1 text\" id=\"projectName\" v-bind:class=\"{'invalid':isOk}\" maxlength=\"20\" initial=\"off\"\r\n                      v-model=\"projectName\"\r\n                      autofocus=\"autofocus\"\r\n                      tabindex=\"1\" placeholder=\"请输入项目名称\">\r\n            <div class=\"tip\">项目名称错误</div>\r\n            <div class=\"ta-c actions\">\r\n               <button class=\"btn btn-default-box middle\" tabindex=\"3\" v-on:click=\"status.deleteModal=false\">取消\r\n               </button>\r\n               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r\n               <button class=\"btn btn-danger middle\" v-on:click=\"ok\" tabindex=\"2\">确定</button>\r\n            </div>\r\n         </div>\r\n      </div>\r\n   </div>\r\n</div>\r\n";

/***/ }

});