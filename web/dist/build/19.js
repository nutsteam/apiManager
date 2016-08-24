webpackJsonp([19],{

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(6)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] html\\dashboard\\vue\\add.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(14)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-25dce2d7/add.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 6:
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
	//     <div class="db-view-new">
	//
	//         <div class="step1" v-if="!success">
	//             <validator name="af">
	//                 <div class="dvn-title">
	//                     <h2>添加项目</h2>
	//                     <br/>
	//                     <p>欢迎使用小幺鸡，在这里您可以创建项目、接口，通过简单操作便可以完成对接口管理。</p>
	//                 </div>
	//                 <br/><br/>
	//                 <div class="form db-view-form">
	//                     <div class="item">
	//                         <div class="col-sm-2 label">项目名称</div>
	//                         <div class="col-sm-10">
	//                             <input type="text" v-validate:project-name="{required:true,maxlength:20}" v-model="projectName" maxlength="20"
	//                                    initial="off" class="text invalid" placeholder="请输入项目名称">
	//                             <div class="tip" v-if="$af.projectName.invalid">{{$af.projectName.errors[0].message}}</div>
	//                         </div>
	//                     </div>
	//                     <div class="item">
	//                         <div class="col-sm-2 label">项目描述</div>
	//                         <div class="col-sm-10">
	//                             <textarea rows="10" v-model="project.description" placeholder="请输入项目描述"
	//                                       class="text" maxlength="300"></textarea>
	//                             <div class="tip"></div>
	//                         </div>
	//                     </div>
	//                     <div class="item">
	//                         <div class="col-sm-2 label">项目公开性</div>
	//                         <div class="col-sm-10">
	//                             <p><input type="radio" v-model="project.permission" value="PUBLIC" id="dvnr-private"><label
	//                                     for="dvnr-private">私有项目（只有加入项目后的成员才能看见）</label></p>
	//                             <p><input type="radio" v-model="project.permission" value="PRIVATE" id="dvnr-public"><label
	//                                     for="dvnr-public">公开项目（所有用户均能看见）</label></p>
	//                             <div class="tip"></div>
	//                         </div>
	//                     </div>
	//                     <div class="item">
	//                         <div class="col-sm-2 label"></div>
	//                         <div class="col-sm-3">
	//                             <input type="submit" value="创建项目" v-on:click="create" class="btn btn-primary btn-lg">
	//                         </div>
	//                     </div>
	//                 </div>
	//             </validator>
	//         </div>
	//         <div class="step2" v-else>
	//             <validator name="form">
	//                 <p class="db-add-succeed">项目创建成功，添加一些成员吧！</p>
	//                 <div class="form dvn-import-members">
	//                     <div class="spinner" v-if="status.loading">
	//                         <div class="rect1"></div>
	//                         <div class="rect2"></div>
	//                         <div class="rect3"></div>
	//                         <div class="rect4"></div>
	//                         <div class="rect5"></div>
	//                     </div>
	//                     <div class="item" v-if="users && users.length>0">
	//                         <div class="col-sm-2 label">邀请同事</div>
	//                         <div class="col-sm-10">
	//                             <ul class="cb dbv-chose-users">
	//                                 <li v-for="item in users" v-on:click="inviteByUserId(item.id,$event)">
	//                                     <div class="dbv-user-icon">
	//                                         <img class="img" v-bind:src="item.avatar" v-if="item.avatar">
	//                                         <div class="img ta-c word" v-else>{{item.nickname.substring(0,3)}}</div>
	//                                         <p class="flag"></p>
	//                                     </div>
	//                                     <p>{{item.nickname}}</p>
	//                                 </li>
	//                             </ul>
	//                         </div>
	//                     </div>
	//                     <div class="item">
	//                         <div class="col-sm-2 label">邮箱邀请</div>
	//                         <div class="col-sm-9">
	//                             <input type="text" class="text" v-model="email"
	//                                    v-validate:email="['email','exists']"  initial="off" placeholder="请输入成员的邮箱">
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
	//                             <input type="button" class="btn btn-danger" v-on:click="inviteByEmail"
	//                                                      value="邀请">
	//                         </div>
	//                     </div>
	//                     <div class="item">
	//                         <div class="col-sm-2 label"></div>
	//                         <div class="col-sm-10">
	//                             <a v-link="'/project/'+id" class="btn btn-primary">进入项目</a>
	//                         </div>
	//                     </div>
	//
	//                 </div>
	//             </validator>
	//         </div>
	//     </div>
	// </template>
	// <script>
	var invites = [];
	exports.default = {
	    data: function data() {
	        return {
	            id: '',
	            status: {
	                loading: false
	            },
	            success: false,
	            projectName: '',
	            project: {
	                description: '',
	                permission: 'PUBLIC'
	            },
	            email: '',
	            invites: invites,
	            fileAccess: '',
	            users: []
	        };
	    },
	    validators: {
	        exists: {
	            message: '该邮箱已存在邀请列表中',
	            check: function check(value) {
	                var exists;
	                invites.forEach(function (d) {
	                    if (d == value) {
	                        exists = true;
	                    }
	                    return false;
	                });
	                return !exists;
	            }
	        }
	    },
	    watch: {
	        "success": function success(value) {
	            if (value) {
	                var self = this;
	                this.status.loading = true;
	                _utils2.default.get("/user/project_users.json", {}, function (rs) {
	                    self.fileAccess = rs.data.fileAccess;
	                    self.users = rs.data.users;
	                }, function () {
	                    self.status.loading = false;
	                });
	            }
	        }
	    },
	    methods: {
	        create: function create() {
	            this.$validate(true);
	            if (this.$af.invalid) {
	                return false;
	            }
	            this.project.name = this.projectName;
	            var self = this;
	            _utils2.default.post('/project.json', this.project, function (rs) {
	                self.success = true;
	                self.id = rs.data;
	                self.$parent.reloadProject = true;
	            });
	        },
	        ok: function ok() {},
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
	                    self.invites.push(self.email);
	                    self.email = '';
	                });
	            }
	        }
	    }
	};
	// </script>

/***/ },

/***/ 14:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"db-view-new\">\n\n    <div class=\"step1\" v-if=\"!success\">\n        <validator name=\"af\">\n            <div class=\"dvn-title\">\n                <h2>添加项目</h2>\n                <br/>\n                <p>欢迎使用小幺鸡，在这里您可以创建项目、接口，通过简单操作便可以完成对接口管理。</p>\n            </div>\n            <br/><br/>\n            <div class=\"form db-view-form\">\n                <div class=\"item\">\n                    <div class=\"col-sm-2 label\">项目名称</div>\n                    <div class=\"col-sm-10\">\n                        <input type=\"text\" v-validate:project-name=\"{required:true,maxlength:20}\" v-model=\"projectName\" maxlength=\"20\"\n                               initial=\"off\" class=\"text invalid\" placeholder=\"请输入项目名称\">\n                        <div class=\"tip\" v-if=\"$af.projectName.invalid\">{{$af.projectName.errors[0].message}}</div>\n                    </div>\n                </div>\n                <div class=\"item\">\n                    <div class=\"col-sm-2 label\">项目描述</div>\n                    <div class=\"col-sm-10\">\n                        <textarea rows=\"10\" v-model=\"project.description\" placeholder=\"请输入项目描述\"\n                                  class=\"text\" maxlength=\"300\"></textarea>\n                        <div class=\"tip\"></div>\n                    </div>\n                </div>\n                <div class=\"item\">\n                    <div class=\"col-sm-2 label\">项目公开性</div>\n                    <div class=\"col-sm-10\">\n                        <p><input type=\"radio\" v-model=\"project.permission\" value=\"PUBLIC\" id=\"dvnr-private\"><label\n                                for=\"dvnr-private\">私有项目（只有加入项目后的成员才能看见）</label></p>\n                        <p><input type=\"radio\" v-model=\"project.permission\" value=\"PRIVATE\" id=\"dvnr-public\"><label\n                                for=\"dvnr-public\">公开项目（所有用户均能看见）</label></p>\n                        <div class=\"tip\"></div>\n                    </div>\n                </div>\n                <div class=\"item\">\n                    <div class=\"col-sm-2 label\"></div>\n                    <div class=\"col-sm-3\">\n                        <input type=\"submit\" value=\"创建项目\" v-on:click=\"create\" class=\"btn btn-primary btn-lg\">\n                    </div>\n                </div>\n            </div>\n        </validator>\n    </div>\n    <div class=\"step2\" v-else>\n        <validator name=\"form\">\n            <p class=\"db-add-succeed\">项目创建成功，添加一些成员吧！</p>\n            <div class=\"form dvn-import-members\">\n                <div class=\"spinner\" v-if=\"status.loading\">\n                    <div class=\"rect1\"></div>\n                    <div class=\"rect2\"></div>\n                    <div class=\"rect3\"></div>\n                    <div class=\"rect4\"></div>\n                    <div class=\"rect5\"></div>\n                </div>\n                <div class=\"item\" v-if=\"users && users.length>0\">\n                    <div class=\"col-sm-2 label\">邀请同事</div>\n                    <div class=\"col-sm-10\">\n                        <ul class=\"cb dbv-chose-users\">\n                            <li v-for=\"item in users\" v-on:click=\"inviteByUserId(item.id,$event)\">\n                                <div class=\"dbv-user-icon\">\n                                    <img class=\"img\" v-bind:src=\"item.avatar\" v-if=\"item.avatar\">\n                                    <div class=\"img ta-c word\" v-else>{{item.nickname.substring(0,3)}}</div>\n                                    <p class=\"flag\"></p>\n                                </div>\n                                <p>{{item.nickname}}</p>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n                <div class=\"item\">\n                    <div class=\"col-sm-2 label\">邮箱邀请</div>\n                    <div class=\"col-sm-9\">\n                        <input type=\"text\" class=\"text\" v-model=\"email\"\n                               v-validate:email=\"['email','exists']\"  initial=\"off\" placeholder=\"请输入成员的邮箱\">\n                        <div class=\"tip\" v-if=\"$form.email.invalid\">{{this.$form.email.errors[0].message}}</div>\n                        <div class=\"dvn-new-users\" v-if=\"invites.length>0\">\n                            <p>邀请了{{invites.length}}个同事</p><br/>\n                            <ul class=\"cb\">\n                                <li v-for=\"item in invites\">\n                                    {{item.substring(0,4)}}\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                    <div class=\"col-sm-1\">\n                        <input type=\"button\" class=\"btn btn-danger\" v-on:click=\"inviteByEmail\"\n                                                 value=\"邀请\">\n                    </div>\n                </div>\n                <div class=\"item\">\n                    <div class=\"col-sm-2 label\"></div>\n                    <div class=\"col-sm-10\">\n                        <a v-link=\"'/project/'+id\" class=\"btn btn-primary\">进入项目</a>\n                    </div>\n                </div>\n\n            </div>\n        </validator>\n    </div>\n</div>\n";

/***/ }

});