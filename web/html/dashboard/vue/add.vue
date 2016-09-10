<template>
    <div class="db-view-new">

        <div class="step1" v-if="!success">
            <validator name="af">
                <div class="dvn-title">
                    <h2>添加项目</h2>
                    <br/>
                    <p>欢迎使用小幺鸡，在这里您可以创建项目、接口，通过简单操作便可以完成对接口管理。</p>
                </div>
                <br/><br/>
                <div class="form db-view-form">
                    <div class="item">
                        <div class="col-sm-2 label">项目名称</div>
                        <div class="col-sm-10">
                            <input type="text" v-validate:project-name="{required:true,maxlength:20}" v-model="projectName" maxlength="20"
                                   initial="off" class="text invalid" placeholder="请输入项目名称">
                            <div class="tip" v-if="$af.projectName.invalid">{{$af.projectName.errors[0].message}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="col-sm-2 label">项目描述</div>
                        <div class="col-sm-10">
                            <textarea rows="10" v-model="project.description" placeholder="请输入项目描述"
                                      class="text" maxlength="300"></textarea>
                            <div class="tip"></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="col-sm-2 label">项目公开性</div>
                        <div class="col-sm-10">
                            <p><input type="radio" v-model="project.permission" value="PUBLIC" id="dvnr-private"> <label
                                    for="dvnr-private">私有项目（只有加入项目后的成员才能看见）</label></p>
                            <p><input type="radio" v-model="project.permission" value="PRIVATE" id="dvnr-public"> <label
                                    for="dvnr-public">公开项目（所有用户均能看见）</label></p>
                            <div class="tip"></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="col-sm-2 label"></div>
                        <div class="col-sm-3">
                            <input type="submit" value="创建项目" v-on:click="create" class="btn btn-primary btn-lg">
                        </div>
                    </div>
                </div>
            </validator>
        </div>
        <div class="step2" v-else>
            <validator name="form">
                <p class="db-add-succeed">项目创建成功，添加一些成员吧！</p>
                <div class="form dvn-import-members">
                    <div class="spinner" v-if="status.loading">
                        <div class="rect1"></div>
                        <div class="rect2"></div>
                        <div class="rect3"></div>
                        <div class="rect4"></div>
                        <div class="rect5"></div>
                    </div>
                    <div class="item" v-if="users && users.length>1">
                        <div class="col-sm-2 label">邀请同事</div>
                        <div class="col-sm-10">
                            <ul class="cb dbv-chose-users">
                                <li v-for="item in users" v-on:click="inviteByUserId(item.id,$event)">
                                    <div class="dbv-user-icon">
                                        <img class="img" v-bind:src="item.avatar" v-if="item.avatar">
                                        <div class="img ta-c word" v-else>{{item.nickname.substring(0,3)}}</div>
                                        <p class="flag"></p>
                                    </div>
                                    <p>{{item.nickname}}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item">
                        <div class="col-sm-2 label">邮箱邀请</div>
                        <div class="col-sm-9">
                            <input type="text" class="text" v-model="email"
                                   v-validate:email="['email','exists']"  initial="off" placeholder="请输入成员的邮箱">
                            <div class="tip" v-if="$form.email.invalid">{{this.$form.email.errors[0].message}}</div>
                            <div class="dvn-new-users" v-if="invites.length>0">
                                <p>邀请了{{invites.length}}个同事</p><br/>
                                <ul class="cb">
                                    <li v-for="item in invites">
                                        {{item.substring(0,4)}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <input type="button" class="btn btn-danger" v-on:click="inviteByEmail"
                                                     value="邀请">
                        </div>
                    </div>
                    <div class="item">
                        <div class="col-sm-2 label"></div>
                        <div class="col-sm-10">
                            <a v-link="{path:'/project/'+id,query:{'n':'y'}}" class="btn btn-primary">进入项目</a>
                        </div>
                    </div>

                </div>
            </validator>
        </div>
    </div>
</template>
<script>
    import '../../src/vue.ex.js';
    import utils from '../../src/utils.js'
    var invites=[];
    export default {
        data: function () {
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
                email:'',
                invites: invites,
                fileAccess: '',
                users: []
            }
        },
        validators: {
            exists: {
                message: '该邮箱已存在邀请列表中',
                check: function (value) {
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
            "success": function (value) {
                if (value) {
                    var self = this;
                    this.status.loading = true;
                    utils.get("/user/project_users.json", {}, function (rs) {
                        self.fileAccess = rs.data.fileAccess;
                        self.users = rs.data.users;
                    }, function () {
                        self.status.loading = false;
                    });
                }
            }
        },
        methods: {
            create: function () {
                this.$validate(true);
                if (this.$af.invalid) {
                    return false;
                }
                this.project.name = this.projectName;
                var self = this;
                utils.post('/project.json', this.project, function (rs) {
                    self.success = true;
                    self.id = rs.data;
                    self.$parent.reloadProject=true;
                });
            },
            ok: function () {
            },
            inviteByUserId:function(userId,e){
                utils.post('/project/'+this.id+"/invite.json",{userId:userId},function(rs){
                    $(e.target).parents("li").addClass("active");
                });
            },
            inviteByEmail: function () {
                this.$validate(true);
                if (this.$form.invalid)
                    return false;
                if(this.email){
                    var self = this;
                    utils.post('/project/'+this.id+"/invite/email.json",{email:this.email},function(){
                        self.invites.push(self.email);
                        self.email='';
                    });
                }
            }
        }
    }
</script>