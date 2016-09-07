import Vue from 'vue'
import VueValidator from 'vue-validator';
import resources from './resources.js'
Vue.use(VueValidator);

Vue.validator('email', {
    message:'邮箱格式错误，格式为：abc@domain.com',
    check:function (val) {
        if(!val){
            return true;
        }
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
    }
});
Vue.validator('required',{
    message:function(field){
        if(resources[field]){
            return '请输入'+(resources[field]);
        }else{
            return '该字段是必须的';
        }
    },
    check: Vue.validator('required')
});
Vue.validator('maxlength',{
    message:function(field,length){
        return '长度超过不能超过'+length;
    },
    check: Vue.validator('maxlength')
});


Vue.filter('html',function(value){
    if(value){
        return value.replace(/\n/g,'<br/>')
    }
    return '';
});
