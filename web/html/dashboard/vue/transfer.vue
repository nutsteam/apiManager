<template>
<div class="db-members cb">
    <div class="form dvn-import-members">
        <div class="spinner" v-if="loading">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
        <template v-if="users.length>1">
            <div class="item">
                <div class="col-sm-2 label">选择成员</div>
                <div class="col-sm-10">
                    <ul class="cb dbv-chose-users">
                        <li v-for="item in users" v-if="item.id != project.userId" v-bind:class="{'active':userId==item.id}" v-on:click="chose(item)">
                            <div class="dbv-user-icon">
                                <img class="img" v-bind:src="item.avatar" v-if="item.avatar">
                                <div class="img ta-c word" v-else>{{item.nickname}}</div>
                                <p class="flag"></p>
                            </div>
                            <p>{{item.nickname}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="item">
                <div class="col-sm-2 label"></div>
                <div class="col-sm-2">
                    <input type="button" class="btn btn-primary" v-on:click="ok" v-bind:disabled="!userId" value="确认">
                </div>
            </div>
        </template>
        <template v-if="!loading && users.length<=1">
            <div class="ta-c api-error-tip" v-cloak v-else>
                <i class="iconfont icon-api" style="font-size: 120px"></i>
                <p style="font-size: 24px">该项目暂无其他成员</p>
            </div>
        </template>
    </div>
</div>
</template>
<script>
    import utils from '../../src/utils.js'
    export default {
        data(){
            return {
                loading:true,
                project:{},
                fileAccess:'',
                userId:'',
                users:[]
            }
        },
        route:{
            activate:function(){
                this.$parent.showProject=true;
            },
            deactivate:function(){
                this.$parent.showProject =false;
            },
            data(){
                this.loading=true;
                var self = this;
                utils.get('/project/'+this.$route.params.id+'/info.json',{},function(rs){
                    self.project=rs.data.project;
                });
                self.$parent.projectId=this.$route.params.id;

                utils.get('/project/'+this.$route.params.id+'/users.json',{},function(rs){
                    self.users = rs.data.users;
                    self.fileAccess = rs.data.fileAccess;
                },function(){
                    self.loading=false;
                })   ;
                _czc.push(["_trackEvent",'接口','项目转移']);
            }
        },
        methods:{
            chose:function(item){
                if(item.id==this.userId){
                    this.userId= '';
                }else{
                    this.userId=  item.id;
                }
            },
            ok:function(){
                  utils.post('/project/'+this.project.id+'/transfer.json',{userId:this.userId},function(rs){
                      toastr.success('操作成功');
                  });
            }
        }
    }
</script>