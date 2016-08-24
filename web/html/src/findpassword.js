import Vue from 'vue'
import utils from './utils.js'
new Vue({
    el:'#app',
    data:{password:null,rePassword:null,email:null,id:null},
    created(){
        if(location.search){
            var match=location.search.match(/token=([\d|\w]+)/);
            if(match && match.length==2){
                var token = match[1];
                if(token){
                    var d = atob(token).split("!");
                    this.id = d[0];
                    this.email=d[1];
                    return true;
                }
            }
        }
        toastr.error('无效地址');
    },
    methods:{
        submit:function(){
            this.$validate(true);
            if(!this.$form.valid){
                return false;
            }
            if(this.password !=this.rePassword){
                toastr.error('两次密码输入不一致');
                return;
            }
            utils.post('/user/newpassword.json',{
                email:this.email,password:this.password,id:this.id
            },function (rs) {
                toastr.success('操作成功!');
                location.href=utils.config.ctx+'/login.html?status=success';
            });
        }
    }
});