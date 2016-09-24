<template>
    <div class="db-members cb">
        <div class="fl">
            <div style="width: 400px">
                <ul class="nav nav-tabs nav-justified">
                    <li v-bind:class="{'active':showList}" v-on:click="showList=true"><a>成员列表</a></li>
                    <li v-bind:class="{'active':!showList}" v-on:click="showList=false"><a>添加</a></li>
                </ul>
            </div>
            <div v-show="showList" class="db-m-list ">
                <ul>
                    <li class="cb" v-for="item in users">
                        <div class="col-sm-2">
                            <img class="user-logo" v-if="item.avatar" v-bind:src="item.avatar">
                            <img class="user-logo" v-else src="../../assets/img/defaultlogo.jpg">
                        </div>
                        <div class="col-sm-2"> {{item.name}}</div>
                        <div class="col-sm-2"> {{item.nickname}}</div>
                        <div class="col-sm-3"> {{item.email}}</div>
                        <div class="col-sm-1">
                            <input type="button" class="btn btn-danger" v-on:click="remove(item)" value="移除">
                        </div>
                    </li>
                </ul>
            </div>

            <div v-else class="form dvn-import-members">
                <div class="spinner" v-if="status.loading">
                    <div class="rect1"></div>
                    <div class="rect2"></div>
                    <div class="rect3"></div>
                    <div class="rect4"></div>
                    <div class="rect5"></div>
                </div>
                <div class="item" v-if="users && users.length>0">
                    <div class="col-sm-2 label">邀请同事</div>
                    <div class="col-sm-10">
                        <ul class="cb dbv-chose-users">
                            <li v-for="item in projectUsers" v-on:click="inviteByUserId(item,$event)">
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
                <validator name="form">
                    <div class="item">
                        <div class="col-sm-2 label">邮箱邀请</div>
                        <div class="col-sm-9">
                            <input type="text" class="text" v-model="email"
                                   v-validate:email="['email']" initial="off" placeholder="请输入成员的邮箱">
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
                            <input type="button" class="btn btn-danger"
                                   v-on:click="inviteByEmail" value="邀请">
                        </div>
                    </div>
                </validator>
            </div>
        </div>
    </div>
    <style>
        .db-members-box{
            padding:20px 0 0 20px
        }
    </style>
</template>
<script>
    import '../../src/vue.ex.js';
    import utils from '../../src/utils.js'
    var data = {
        status:{
            loading:false
        },
        email: '',
        error: false,
        showList: true,
        fileAccess: '',
        users: [],
        projectUsers:[],
        invites: [],
        id: 0,
        project: {}
    };
    function loadUser(self){
        utils.get('/project/' + self.id + '/users.json', {}, function (rs) {
            data.users = rs.data.users;
            if (data.users.length == 0) {
                data.showList = false;
            }
            data.fileAccess = rs.data.fileAccess;
        });
    }
    export default {
        route: {
            activate: function () {
                this.$parent.showProject = true;
                $(".db-main").addClass("db-members-box")
            },
            deactivate: function () {
                this.$parent.showProject = false;
                $(".db-main").removeClass("db-members-box")
            },
            data: function () {
                this.$parent.projectId = this.$route.params.id;
                this.id = this.$route.params.id;
                loadUser(this);
                var self = this;
                this.status.loading = true;
                utils.get("/user/project_users.json", {}, function (rs) {
                    self.fileAccess = rs.data.fileAccess;
                    self.projectUsers = rs.data.users;
                }, function () {
                    self.status.loading = false;
                });
                _czc.push(["_trackEvent",'接口','成员管理']);
            }
        },
        data: function () {
            return data;
        },
        methods: {
            remove: function (item) {
                utils.delete('/project/' + this.id + '/pu/' + item.id + '.json', function () {
                    toastr.success('移除成功');
                    data.users.$remove(item);
                });
            },
            inviteByUserId:function(user,e){
                var self=this;
                utils.post('/project/'+this.id+"/invite.json",{userId:user.id},function(rs){
                    toastr.success('添加成功');
                    self.users.push(user);
                    $(e.target).parents("li").addClass("active");
                });
            },
            inviteByEmail: function () {
                this.$validate(true);
                if (this.$form.invalid)
                    return false;
                if (this.email) {
                    var self = this;
                    utils.post('/project/' + this.id + "/invite/email.json", {email: this.email}, function () {
                        self.email = '';
                        toastr.success('邀请成功');
                        self.showList=true;
                        loadUser(self);
                    });
                }
            }
        }
    };
</script>

