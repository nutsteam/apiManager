<template>
<div class="db-welcome">
    <div class="cb">
        <h2>小幺鸡在线接口文档管理工具</h2>
        <p class="db-wel-desc">欢迎使用小幺鸡,在这里您可以方便快捷的使用小幺鸡创建访问接口,支持在线http、websocket测试,支持项目导出。</p>
    </div>
    <ul class="cb db-wel-items">
        <li class="fl">
            <div class="cb">
                <a v-link="{path:'/add'}">
                    <i class="iconfont icon-project fl"></i>
                    <div class="fl db-wel-item">
                        <h3>创建项目</h3>
                        <p class="db-wel-item-desc">小手一抖,项目我有。</p>
                    </div>
                </a>
            </div>
        </li>
    </ul>
</div>
</template>
<script>
    export default{
        route:{
            activate: function (transition) {
                this.$parent.$data.welcome = true;
                this.$parent.pageName ='';
                transition.next();
            },
            deactivate: function (transition) {
                transition.next();
            }
        },
        data:function(){
            return {}
        }
    }
</script>
