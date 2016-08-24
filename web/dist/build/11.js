webpackJsonp([11],{

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(42)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] html\\dashboard\\vue\\transfer.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(43)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-4c2220b6/transfer.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 42:
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
	            loading: true,
	            project: {},
	            fileAccess: '',
	            userId: '',
	            users: []
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
	            this.loading = true;
	            var self = this;
	            _utils2.default.get('/project/' + this.$route.params.id + '/info.json', {}, function (rs) {
	                self.project = rs.data.project;
	            });
	            self.$parent.projectId = this.$route.params.id;

	            _utils2.default.get('/project/' + this.$route.params.id + '/users.json', {}, function (rs) {
	                self.users = rs.data.users;
	                self.fileAccess = rs.data.fileAccess;
	            }, function () {
	                self.loading = false;
	            });
	        }
	    },
	    methods: {
	        chose: function chose(item) {
	            if (item.id == this.userId) {
	                this.userId = '';
	            } else {
	                this.userId = item.id;
	            }
	        },
	        ok: function ok() {
	            _utils2.default.post('/project/' + this.project.id + '/transfer.json', { userId: this.userId }, function (rs) {
	                toastr.success('操作成功');
	            });
	        }
	    }
	};
	// </script>
	// <template>
	// <div class="db-members cb">
	//     <div class="form dvn-import-members">
	//         <div class="spinner" v-if="loading">
	//             <div class="rect1"></div>
	//             <div class="rect2"></div>
	//             <div class="rect3"></div>
	//             <div class="rect4"></div>
	//             <div class="rect5"></div>
	//         </div>
	//         <template v-if="users.length>1">
	//             <div class="item">
	//                 <div class="col-sm-2 label">选择成员</div>
	//                 <div class="col-sm-10">
	//                     <ul class="cb dbv-chose-users">
	//                         <li v-for="item in users" v-if="item.id != project.userId" v-bind:class="{'active':userId==item.id}" v-on:click="chose(item)">
	//                             <div class="dbv-user-icon">
	//                                 <img class="img" v-bind:src="item.avatar" v-if="item.avatar">
	//                                 <div class="img ta-c word" v-else>{{item.nickname}}</div>
	//                                 <p class="flag"></p>
	//                             </div>
	//                             <p>{{item.nickname}}</p>
	//                         </li>
	//                     </ul>
	//                 </div>
	//             </div>
	//             <div class="item">
	//                 <div class="col-sm-2 label"></div>
	//                 <div class="col-sm-2">
	//                     <input type="button" class="btn btn-primary full-width" v-on:click="ok" v-bind:disabled="!userId" value="确认">
	//                 </div>
	//             </div>
	//         </template>
	//         <template v-if="!loading && users.length<=1">
	//             <div class="ta-c api-error-tip" v-cloak v-else>
	//                 <i class="iconfont icon-api" style="font-size: 120px"></i>
	//                 <p style="font-size: 24px">该项目暂无其他同事</p>
	//             </div>
	//         </template>
	//     </div>
	// </div>
	// </template>
	// <script>

/***/ },

/***/ 43:
/***/ function(module, exports) {

	module.exports = "\r\n<div class=\"db-members cb\">\r\n    <div class=\"form dvn-import-members\">\r\n        <div class=\"spinner\" v-if=\"loading\">\r\n            <div class=\"rect1\"></div>\r\n            <div class=\"rect2\"></div>\r\n            <div class=\"rect3\"></div>\r\n            <div class=\"rect4\"></div>\r\n            <div class=\"rect5\"></div>\r\n        </div>\r\n        <template v-if=\"users.length>1\">\r\n            <div class=\"item\">\r\n                <div class=\"col-sm-2 label\">选择成员</div>\r\n                <div class=\"col-sm-10\">\r\n                    <ul class=\"cb dbv-chose-users\">\r\n                        <li v-for=\"item in users\" v-if=\"item.id != project.userId\" v-bind:class=\"{'active':userId==item.id}\" v-on:click=\"chose(item)\">\r\n                            <div class=\"dbv-user-icon\">\r\n                                <img class=\"img\" v-bind:src=\"item.avatar\" v-if=\"item.avatar\">\r\n                                <div class=\"img ta-c word\" v-else>{{item.nickname}}</div>\r\n                                <p class=\"flag\"></p>\r\n                            </div>\r\n                            <p>{{item.nickname}}</p>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n            <div class=\"item\">\r\n                <div class=\"col-sm-2 label\"></div>\r\n                <div class=\"col-sm-2\">\r\n                    <input type=\"button\" class=\"btn btn-primary full-width\" v-on:click=\"ok\" v-bind:disabled=\"!userId\" value=\"确认\">\r\n                </div>\r\n            </div>\r\n        </template>\r\n        <template v-if=\"!loading && users.length<=1\">\r\n            <div class=\"ta-c api-error-tip\" v-cloak v-else>\r\n                <i class=\"iconfont icon-api\" style=\"font-size: 120px\"></i>\r\n                <p style=\"font-size: 24px\">该项目暂无其他同事</p>\r\n            </div>\r\n        </template>\r\n    </div>\r\n</div>\r\n";

/***/ }

});