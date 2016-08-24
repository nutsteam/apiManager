<template>
<div class="db-profile form">
    <div class="item">
        <div class="col-sm-2">头像</div>
        <div class="col-sm-10">
            <div class="user-logo">
                <img v-if="user.avatar" v-bind:src="user.avatar" alt="">
                <img src="../../assets/img/defaultlogo.jpg" v-else>
                <div class="logo-edit" title="修改头像"><i class="iconfont icon-edit3"></i></div>
            </div>
        </div>
    </div>
    <div class="item">
        <div class="col-sm-2">姓名</div>
        <div class="col-sm-4"><input type="text" v-on:change="modify=true" v-model="user.nickname" value="{{user.nickname}}" class="text" placeholder="请输入姓名"></div>
    </div>

    <div class="item">
        <div class="col-sm-2">邮箱</div>
        <div class="col-sm-6">{{user.email}}</div>
    </div>
    <div class="item">
        <div class="col-sm-2">注册时间</div>
        <div class="col-sm-6">{{user.createtime}}</div>
    </div>

    <div class="item">
        <div class="col-sm-2 label"></div>
        <div class="col-sm-6"><input type="button" class="btn btn-primary" v-on:click="ok" v-bind:disabled="!modify" value="确认"></div>
    </div>

</div>
</template>
<script>
    import utils from '../../src/utils.js';
    export default{
        data:function(){
            return {
                user:utils.user(),
                modify:false
            }
        },
        methods:{
            ok:function(){
                var self=this;
                utils.post('/user/'+this.user.id+".json",{nickname:this.user.nickname},function(){
                    toastr.success('修改成功');
                    utils.user(self.user);
                });
            }
        }
    }
</script>