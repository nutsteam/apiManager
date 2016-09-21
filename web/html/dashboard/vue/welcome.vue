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
        <li class="fl">
            <div class="cb">
                <a target="_blank" href="http://shang.qq.com/wpa/qunwpa?idkey=7e99bd0ada4c6586d8e4e609b28d997f86e07336124fca08ac7b02fbe9d07130">
                    <i class="iconfont icon-qqqun fl"></i>
                    <div class="fl db-wel-item">
                        <h3>加入组织</h3>
                        <p class="db-wel-item-desc">580084426</p>
                    </div>
                </a>
            </div>
        </li>
        <li class="fl">
            <div class="cb">
                <a target="_blank" href="http://www.xiaoyaoji.com.cn/help.html">
                    <i class="iconfont icon-feedback fl"></i>
                    <div class="fl db-wel-item">
                        <h3>反馈</h3>
                        <p class="db-wel-item-desc">bug,建议都来这儿。</p>
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