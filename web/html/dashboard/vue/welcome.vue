<template>
<div class="db-welcome">
    <div class="cb">
        <h2 class="fl">小幺鸡在线接口文档管理工具</h2>
    </div>
    <div class="api-details-title">功能</div>
    <div class="db-welcome-fns">
        <p>1.支持json、txt、js、image、binary、xml等数据格式在线测试，降低接口错误率。</p>
        <p>2.支持WebSocket、HTTP协议。</p>
        <p>3.支持form-data、x-www-form-urlencoded 、raw、binary 上传格式！</p>
        <p>4.支持Markdown编辑器</p>
        <p>5.支持Restful 接口;如:http://www.xxx.com/{id}, 会自动转换成http://www.xxx.com/123</p>
    </div>
    <div class="api-details-title">更新内容</div>
    <div class="db-updates">
        <div v-for="item in updates" class="db-updates-item">
            <p>{{item.date}}</p>
            <p>{{{item.content}}}</p>
        </div>
    </div>

    <div class="api-details-title">加入QQ群</div>
    <div><a style="color: #2078B6;font-size: 16px;" target="_blank" href="http://shang.qq.com/wpa/qunwpa?idkey=7e99bd0ada4c6586d8e4e609b28d997f86e07336124fca08ac7b02fbe9d07130">580084426</a> </div>

    <div class="api-details-title">帮助与反馈</div>
    <div>
        如果在使用过程中发现bug或者有更好的建议，请在这儿<a style="color: #2078B6;font-size: 16px;" target="_blank" href="../help.html">帮助与反馈</a>留言，我每天都会检查。
         </div>
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
            return {
                updates:[
                    {date:"2016-09-06",content:"新增pdf导出。<br/> 新增结果响应头、接口状态码、接口请求时间。<br/>新增线上、开发环境。<br/>修改markdown编辑器某些情况下视觉异常问题。 "},
                    {date:"2016-09-03",content:"新增响应数据复制功能。<br/>新增QQ,微博,GITHUB登录。<br/>其他小修改。"},
                    {date:"2016-08-27",content:"替换ueditor为markdown编辑器。"}
                ]
            }
        }
    }
</script>