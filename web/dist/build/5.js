webpackJsonp([5],{

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(25)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] html\\dashboard\\vue\\settings.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(26)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-798c17dd/settings.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	__webpack_require__(7);

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	// <div class="form db-view-form">
	//     <template v-if="!loading">
	//     <validator name="form">
	//     <div class="item">
	//         <div class="col-sm-2 label">项目名称</div>
	//         <div class="col-sm-10">
	//             <input type="text" v-model="project.name" v-validate:project-name="['required']" maxlength="20" class="text invalid" placeholder="请输入项目名称">
	//             <div class="tip"  v-if="$form.projectName.invalid">{{$form.projectName.errors[0].message}}</div>
	//         </div>
	//     </div>
	//     <div class="item">
	//         <div class="col-sm-2 label">项目描述</div>
	//         <div class="col-sm-10">
	//             <textarea rows="10" placeholder="请输入项目描述" maxlength="300" class="text" v-model="project.description">{{project.description}}</textarea>
	//         </div>
	//     </div>
	//     <div class="item">
	//         <div class="col-sm-2 label">项目公开性</div>
	//         <div class="col-sm-10">
	//             <p><input type="radio" name="permission" v-model="project.permission" value="PRIVATE" id="dvnr-private"> <label for="dvnr-private">私有项目（只有加入项目后的成员才能看见）</label></p>
	//             <p><input type="radio" name="permission" v-model="project.permission" id="dvnr-public" value="PUBLIC"> <label for="dvnr-public">公开项目（所有用户均能看见）</label></p>
	//             <div class="tip"></div>
	//         </div>
	//     </div>
	//     <div class="item">
	//         <div class="col-sm-2 label"></div>
	//         <div class="col-sm-3">
	//             <input type="submit" value="确认" v-on:click="ok" class="btn btn-primary biggest">
	//         </div>
	//     </div>
	//     </validator>
	//     </template>
	//     <template v-if="loading">
	//         <div class="spinner">
	//             <div class="rect1"></div>
	//             <div class="rect2"></div>
	//             <div class="rect3"></div>
	//             <div class="rect4"></div>
	//             <div class="rect5"></div>
	//         </div>
	//     </template>
	// </div>
	// </template>
	// <script>
	var _data = {
	    project: {},
	    loading: true,
	    projectName: null
	};
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
	            }, function () {
	                self.loading = false;
	            });
	            self.$parent.projectId = this.$route.params.id;
	        }
	    },
	    data: function data() {
	        return _data;
	    },
	    methods: {
	        ok: function ok() {
	            var project = this.project;
	            var self = this;
	            _utils2.default.post('/project/' + this.project.id + ".json", this.project, function (rs) {
	                self.project(project);
	                toastr.success('修改成功');
	            });
	        }
	    }
	};
	// </script>

/***/ },

/***/ 26:
/***/ function(module, exports) {

	module.exports = "\r\n<div class=\"form db-view-form\">\r\n    <template v-if=\"!loading\">\r\n    <validator name=\"form\">\r\n    <div class=\"item\">\r\n        <div class=\"col-sm-2 label\">项目名称</div>\r\n        <div class=\"col-sm-10\">\r\n            <input type=\"text\" v-model=\"project.name\" v-validate:project-name=\"['required']\" maxlength=\"20\" class=\"text invalid\" placeholder=\"请输入项目名称\">\r\n            <div class=\"tip\"  v-if=\"$form.projectName.invalid\">{{$form.projectName.errors[0].message}}</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"item\">\r\n        <div class=\"col-sm-2 label\">项目描述</div>\r\n        <div class=\"col-sm-10\">\r\n            <textarea rows=\"10\" placeholder=\"请输入项目描述\" maxlength=\"300\" class=\"text\" v-model=\"project.description\">{{project.description}}</textarea>\r\n        </div>\r\n    </div>\r\n    <div class=\"item\">\r\n        <div class=\"col-sm-2 label\">项目公开性</div>\r\n        <div class=\"col-sm-10\">\r\n            <p><input type=\"radio\" name=\"permission\" v-model=\"project.permission\" value=\"PRIVATE\" id=\"dvnr-private\"> <label for=\"dvnr-private\">私有项目（只有加入项目后的成员才能看见）</label></p>\r\n            <p><input type=\"radio\" name=\"permission\" v-model=\"project.permission\" id=\"dvnr-public\" value=\"PUBLIC\"> <label for=\"dvnr-public\">公开项目（所有用户均能看见）</label></p>\r\n            <div class=\"tip\"></div>\r\n        </div>\r\n    </div>\r\n    <div class=\"item\">\r\n        <div class=\"col-sm-2 label\"></div>\r\n        <div class=\"col-sm-3\">\r\n            <input type=\"submit\" value=\"确认\" v-on:click=\"ok\" class=\"btn btn-primary biggest\">\r\n        </div>\r\n    </div>\r\n    </validator>\r\n    </template>\r\n    <template v-if=\"loading\">\r\n        <div class=\"spinner\">\r\n            <div class=\"rect1\"></div>\r\n            <div class=\"rect2\"></div>\r\n            <div class=\"rect3\"></div>\r\n            <div class=\"rect4\"></div>\r\n            <div class=\"rect5\"></div>\r\n        </div>\r\n    </template>\r\n</div>\r\n";

/***/ }

});