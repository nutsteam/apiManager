export default {
    '/add':{
        component:function(resolve){
            require(['../vue/add.vue'],resolve)
        }
    },
    '/welcome':{
        component:function(resolve){
            require(['../vue/welcome.vue'],resolve)
        }
    },
    '/':{
        component:function(resolve){
            require(['../vue/welcome.vue'],resolve)
        }
    },
    '/project/:id/quit':{
        component:function (resolve) {
            require(['../vue/quit.vue'],resolve)
        }
    },
    '/project/:id/release':{
        component:function (resolve) {
            require(['../vue/release.vue'],resolve)
        }
    },
    '/project/:id/settings':{
        component:function (resolve) {
            require(['../vue/settings.vue'],resolve)
        }
    },
    '/project/:id/export':{
        component:function (resolve) {
            require(['../vue/export.vue'],resolve)
        }
    },
    '/project/:id/members':{
        component:function (resolve) {
            require(['../vue/member.vue'],resolve)
        }
    },
    '/profile/relation':{
        component:function(resolve){
            require(['../vue/profile-relation.vue'],resolve)
        }
    },
    '/profile/security':{
        component:function(resolve){
            require(['../vue/profile-security.vue'],resolve)
        }
    },
    '/profile':{
        component:function(resolve){
            require(['../vue/profile.vue'],resolve)
        }
    },
    '/project/:id/transfer':{
        component:function(resolve){
            require(['../vue/transfer.vue'],resolve)
        }
    },
    '/project/:id':{
        component:function(resolve){
            $('body').addClass('loading');
            require(['../vue/api.vue'],resolve);
        }
    }
    
}