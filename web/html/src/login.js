import Vue from "vue";
import utils from "./utils.js";
function qqlogin(openId, accessToken) {
    utils.post('/login/qq.json', {openId: openId, accessToken: accessToken}, function (rs) {
        utils.token(rs.data.token);
        utils.user(rs.data.user);
        location.href = utils.config.ctx + '/dashboard';
    });
}
new Vue({
    el: '#login',
    data: {password: null, email: null, params: {}, remember: false},
    created: function () {
        if (location.search) {
            this.params = utils.getQueryParams(location.search);
            switch (this.params['status']) {
                case "expired":
                    toastr.warning('会话已过期');
                    break;
                case "success":
                    toastr.success('操作成功');
                    break;
            }
        }
        let self = this;
        setTimeout(function () {
            $('#email').focus();
            if(localStorage.getItem('login.remember') == 1){
                self.email = (localStorage.getItem('user.email') || '');
                self.password =(localStorage.getItem('user.password') || '');
                self.remember = true;
            }
        }, 100);
    },
    methods: {
        submit: function () {
            this.$validate(true);
            if (!this.$form.valid) {
                return false;
            }
            var self = this;
            utils.post('/login.json', {
                email: this.email, password: this.password
            }, function (rs) {
                if (self.remember) {
                    localStorage.setItem('user.email', self.email);
                    localStorage.setItem('user.password', self.password);
                    localStorage.setItem('login.remember', '1');
                }else{
                    localStorage.setItem('user.email', '');
                    localStorage.setItem('user.password', '');
                    localStorage.setItem('login.remember', '0');
                }
                utils.login.success(rs.data.token, rs.data.user, self.params['refer']);
            });
            _czc.push(['_trackEvent', '登录', '账户密码']);
        },
        qq: function () {
            utils.login.qq();
            _czc.push(['_trackEvent', '登录', 'QQ']);
        },
        weibo: function () {
            utils.login.weibo();
            _czc.push(['_trackEvent', '登录', '微博']);
        },
        github: function () {
            utils.login.github();
            _czc.push(['_trackEvent', '登录', 'GITHUB']);
        }
    }
});
