webpackJsonp([7],{

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(31)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] html\\dashboard\\vue\\member.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(32)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-73e21354/member.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 31:
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
	//     <div class="db-members cb">
	//         <div class="fl">
	//             <div style="width: 400px">
	//                 <ul class="nav nav-tabs nav-justified">
	//                     <li v-bind:class="{'active':showList}" v-on:click="showList=true"><a>成员列表</a></li>
	//                     <li v-bind:class="{'active':!showList}" v-on:click="showList=false"><a>添加</a></li>
	//                 </ul>
	//             </div>
	//             <div v-show="showList" class="db-m-list ">
	//                 <ul>
	//                     <li class="cb" v-for="item in users">
	//                         <div class="col-sm-2">
	//                             <img class="user-logo" v-if="item.avatar" v-bind:src="item.avatar">
	//                             <img class="user-logo" v-else src="../../assets/img/defaultlogo.jpg">
	//                         </div>
	//                         <div class="col-sm-2"> {{item.name}}</div>
	//                         <div class="col-sm-2"> {{item.nickname}}</div>
	//                         <div class="col-sm-3"> {{item.email}}</div>
	//                         <div class="col-sm-1">
	//                             <input type="button" class="btn btn-danger" v-on:click="remove(item)" value="移除">
	//                         </div>
	//                     </li>
	//                 </ul>
	//             </div>
	//
	//             <div v-else class="form dvn-import-members">
	//                 <div class="spinner" v-if="status.loading">
	//                     <div class="rect1"></div>
	//                     <div class="rect2"></div>
	//                     <div class="rect3"></div>
	//                     <div class="rect4"></div>
	//                     <div class="rect5"></div>
	//                 </div>
	//                 <div class="item" v-if="users && users.length>0">
	//                     <div class="col-sm-2 label">邀请同事</div>
	//                     <div class="col-sm-10">
	//                         <ul class="cb dbv-chose-users">
	//                             <li v-for="item in projectUsers" v-on:click="inviteByUserId(item.id,$event)">
	//                                 <div class="dbv-user-icon">
	//                                     <img class="img" v-bind:src="item.avatar" v-if="item.avatar">
	//                                     <div class="img ta-c word" v-else>{{item.nickname.substring(0,3)}}</div>
	//                                     <p class="flag"></p>
	//                                 </div>
	//                                 <p>{{item.nickname}}</p>
	//                             </li>
	//                         </ul>
	//                     </div>
	//                 </div>
	//                 <validator name="form">
	//                     <div class="item">
	//                         <div class="col-sm-2 label">邮箱邀请</div>
	//                         <div class="col-sm-9">
	//                             <input type="text" class="text" v-model="email"
	//                                    v-validate:email="['email']" initial="off" placeholder="请输入成员的邮箱">
	//                             <div class="tip" v-if="$form.email.invalid">{{this.$form.email.errors[0].message}}</div>
	//                             <div class="dvn-new-users" v-if="invites.length>0">
	//                                 <p>邀请了{{invites.length}}个同事</p><br/>
	//                                 <ul class="cb">
	//                                     <li v-for="item in invites">
	//                                         {{item.substring(0,4)}}
	//                                     </li>
	//                                 </ul>
	//                             </div>
	//                         </div>
	//                         <div class="col-sm-1">
	//                             <input type="button" class="btn btn-danger"
	//                                    v-on:click="inviteByEmail" value="邀请">
	//                         </div>
	//                     </div>
	//                 </validator>
	//             </div>
	//         </div>
	//     </div>
	//     <style>
	//         .db-members-box{
	//             padding:20px 0 0 20px
	//         }
	//     </style>
	// </template>
	// <script>
	var _data = {
	    status: {
	        loading: false
	    },
	    email: '',
	    error: false,
	    showList: true,
	    fileAccess: '',
	    users: [],
	    projectUsers: [],
	    invites: [],
	    id: 0,
	    project: {}
	};
	function loadUser(self) {
	    _utils2.default.get('/project/' + self.id + '/users.json', {}, function (rs) {
	        _data.users = rs.data.users;
	        if (_data.users.length == 0) {
	            _data.showList = false;
	        }
	        _data.fileAccess = rs.data.fileAccess;
	    });
	}
	exports.default = {
	    route: {
	        activate: function activate() {
	            this.$parent.showProject = true;
	            $(".db-main").addClass("db-members-box");
	        },
	        deactivate: function deactivate() {
	            this.$parent.showProject = false;
	            $(".db-main").removeClass("db-members-box");
	        },
	        data: function data() {
	            this.$parent.projectId = this.$route.params.id;
	            this.id = this.$route.params.id;
	            loadUser(this);
	            var self = this;
	            this.status.loading = true;
	            _utils2.default.get("/user/project_users.json", {}, function (rs) {
	                self.fileAccess = rs.data.fileAccess;
	                self.projectUsers = rs.data.users;
	            }, function () {
	                self.status.loading = false;
	            });
	        }
	    },
	    data: function data() {
	        return _data;
	    },
	    methods: {
	        remove: function remove(item) {
	            _utils2.default.delete('/project/' + this.id + '/pu/' + item.id + '.json', function () {
	                toastr.success('移除成功');
	                _data.users.$remove(item);
	            });
	        },
	        inviteByUserId: function inviteByUserId(userId, e) {
	            _utils2.default.post('/project/' + this.id + "/invite.json", { userId: userId }, function (rs) {
	                $(e.target).parents("li").addClass("active");
	            });
	        },
	        inviteByEmail: function inviteByEmail() {
	            this.$validate(true);
	            if (this.$form.invalid) return false;
	            if (this.email) {
	                var self = this;
	                _utils2.default.post('/project/' + this.id + "/invite/email.json", { email: this.email }, function () {
	                    self.email = '';
	                    toastr.success('邀请成功');
	                    self.showList = true;
	                    loadUser(self);
	                });
	            }
	        }
	    }
	};
	// </script>
	//

/***/ },

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n<div class=\"db-members cb\">\n    <div class=\"fl\">\n        <div style=\"width: 400px\">\n            <ul class=\"nav nav-tabs nav-justified\">\n                <li v-bind:class=\"{'active':showList}\" v-on:click=\"showList=true\"><a>成员列表</a></li>\n                <li v-bind:class=\"{'active':!showList}\" v-on:click=\"showList=false\"><a>添加</a></li>\n            </ul>\n        </div>\n        <div v-show=\"showList\" class=\"db-m-list \">\n            <ul>\n                <li class=\"cb\" v-for=\"item in users\">\n                    <div class=\"col-sm-2\">\n                        <img class=\"user-logo\" v-if=\"item.avatar\" v-bind:src=\"item.avatar\">\n                        <img class=\"user-logo\" v-else src=\"" + __webpack_require__(33) + "\">\n                    </div>\n                    <div class=\"col-sm-2\"> {{item.name}}</div>\n                    <div class=\"col-sm-2\"> {{item.nickname}}</div>\n                    <div class=\"col-sm-3\"> {{item.email}}</div>\n                    <div class=\"col-sm-1\">\n                        <input type=\"button\" class=\"btn btn-danger\" v-on:click=\"remove(item)\" value=\"移除\">\n                    </div>\n                </li>\n            </ul>\n        </div>\n\n        <div v-else class=\"form dvn-import-members\">\n            <div class=\"spinner\" v-if=\"status.loading\">\n                <div class=\"rect1\"></div>\n                <div class=\"rect2\"></div>\n                <div class=\"rect3\"></div>\n                <div class=\"rect4\"></div>\n                <div class=\"rect5\"></div>\n            </div>\n            <div class=\"item\" v-if=\"users && users.length>0\">\n                <div class=\"col-sm-2 label\">邀请同事</div>\n                <div class=\"col-sm-10\">\n                    <ul class=\"cb dbv-chose-users\">\n                        <li v-for=\"item in projectUsers\" v-on:click=\"inviteByUserId(item.id,$event)\">\n                            <div class=\"dbv-user-icon\">\n                                <img class=\"img\" v-bind:src=\"item.avatar\" v-if=\"item.avatar\">\n                                <div class=\"img ta-c word\" v-else>{{item.nickname.substring(0,3)}}</div>\n                                <p class=\"flag\"></p>\n                            </div>\n                            <p>{{item.nickname}}</p>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n            <validator name=\"form\">\n                <div class=\"item\">\n                    <div class=\"col-sm-2 label\">邮箱邀请</div>\n                    <div class=\"col-sm-9\">\n                        <input type=\"text\" class=\"text\" v-model=\"email\"\n                               v-validate:email=\"['email']\" initial=\"off\" placeholder=\"请输入成员的邮箱\">\n                        <div class=\"tip\" v-if=\"$form.email.invalid\">{{this.$form.email.errors[0].message}}</div>\n                        <div class=\"dvn-new-users\" v-if=\"invites.length>0\">\n                            <p>邀请了{{invites.length}}个同事</p><br/>\n                            <ul class=\"cb\">\n                                <li v-for=\"item in invites\">\n                                    {{item.substring(0,4)}}\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                    <div class=\"col-sm-1\">\n                        <input type=\"button\" class=\"btn btn-danger\"\n                               v-on:click=\"inviteByEmail\" value=\"邀请\">\n                    </div>\n                </div>\n            </validator>\n        </div>\n    </div>\n</div>\n<style>\n    .db-members-box{\n        padding:20px 0 0 20px\n    }\n</style>\n";

/***/ }

});