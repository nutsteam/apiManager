import Vue from 'vue'
import utils from './utils.js'
var app = new Vue({
    el:'#app',
    data:{
        resendtext:'重发验证邮件',
        succeed:false,
        email:''
    },
    methods:{
        findPassword:function(){
            this.$validate(true);
            if(!this.$form.valid){
                return;
            }
            var self =this;
            utils.post('/user/findpassword.json',{email:this.email},function(){
                self.succeed = true;
            });
            //history.pushState(null,'找回密码成功','sendemail');
        },
        resend:function(){
            this.resendtext='发送中';
            var self =this;
            utils.post('/user/findpassword.json',{email:this.email},function(){
                self.succeed = true;
                self.resendtext='发送成功';
            });
        },
        go:function(){
            var domain =this.email.substring(this.email.indexOf('@')+1);
            location.href='http://mail.'+domain;
        }
    }
});
