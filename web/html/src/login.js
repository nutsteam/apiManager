import Vue from 'vue'
import utils from './utils.js'
function qqlogin(openId,accessToken){
    utils.post('/login/qq.json',{openId:openId,accessToken:accessToken},function(rs){
        utils.token(rs.data.token);
        utils.user(rs.data.user);
        location.href=utils.config.ctx+'/dashboard';
    });
}
new Vue({
    el:'#login',
    data:{password:null,email:null},
    created:function(){
        if(location.search){
            var m = location.search.match(/status=(\w+)/);
            if(m && m.length==2){
                switch(m[1]){
                    case "expired":
                        toastr.warning('会话已过期');
                        break;
                    case "success":
                        toastr.success('操作成功');
                        break;
                }
            }
        }
    },
    methods:{
        submit:function(){
            this.$validate(true);
            if(!this.$form.valid){
                return false;
            }
            utils.post('/user/login.json',{
                email:this.email,password:this.password
            },function (rs) {
                utils.token(rs.data.token);
                utils.user(rs.data.user);
                location.href=utils.config.ctx+'/dashboard';
            });
        },
        qq: function () {
            var interval = 0;
            if (!QC.Login.check()) {
                QC.Login.showPopup({appId: 101333549});
                window.clearInterval(interval);
                interval = setInterval(function () {
                    if (QC.Login.check()) {
                        window.clearInterval(interval);
                        QC.Login.getMe(function (openId, accessToken) {
                            qqlogin(openId,accessToken);
                        })
                    }
                }, 300);
            } else {
                QC.Login.getMe(function (openId, accessToken) {
                    QC.Login.getMe(function (openId, accessToken) {
                        qqlogin(openId,accessToken);
                    })
                })
            }
        },
        weibo:function(){

        }
    }
});
