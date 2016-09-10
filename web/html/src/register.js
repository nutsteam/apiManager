/**
 * User: zhoujingjie
 * Date: 16/8/20
 * Time: 22:13
 */
import Vue from 'vue'
import utils from './utils.js'
new Vue({
    el:'#register',
    data:{password:null,nickname:null,email:null},
    methods:{
        submit:function(){
            this.$validate(true);
            if(!this.$form.valid){
                return false;
            }
            utils.post('/user/register.json',{
                email:this.email,password:this.password,nickname:this.nickname
            },function (rs) {
                utils.token(rs.data.token);
                utils.user(rs.data.user);
                toastr.success('注册成功!');
                location.href=utils.config.ctx+'/dashboard';
            });
            _czc.push(['_trackEvent', '注册', '账户密码']);
        }
    }
});