<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  User: zhoujingjie
  Date: 2016-07-22
  Time: 16:41
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>登陆 - 小幺鸡</title>
    <jsp:include page="css.jsp"/>
    <meta name="keywords" content="小幺鸡,接口,api,接口管理,接口文档" />
    <meta name="description" content="小幺鸡在线接口管理系统，提升开发效率降低接口错误率。" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<body class="login-register-body">

<div class="login-form mc">
    <form class="form" onsubmit="return false" id="login-box">
        <div class="ta-c logo"><a href="${ctx}/"><img src="${assets}/img/logo/full.png"></a> </div>
        <div class="item">
            <input type="email" name="email" class="text" placeholder="邮箱"/>
        </div>
        <div class="item">
            <input type="password" name="password" class="text" placeholder="密码"/>
        </div>
        <div class="item">
            <input type="submit" id="login-btn" class="btn" value="登陆"/>
        </div>
    </form>
    <div class="long-line"></div>
    <div class="login-third ta-c">
        <a id="qq"><i class="iconfont icon-qq"></i></a>
        <a id="weibo"><i class="iconfont icon-weibo"></i></a>
        <a id="github"><i class="iconfont icon-github"></i></a>
    </div>
    <div class="ta-c">
        <a href="">忘记密码</a>
        <a href="${ctx}/register">免费注册</a>
    </div>
</div>
<script src="${ctx}/assets/js/jquery.min.js"></script>
<script src="${ctx}/assets/js/ex.js"></script>
<script src="${ctx}/assets/js/sea.js"></script>
<%--<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=290920638&debug=true" type="text/javascript" charset="utf-8"></script>--%>
<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="101333549" data-callback="true" charset="utf-8"></script>
<script src="${ctx}/assets/js/login.js"></script>
<script>
    seajs.config({
        base:'${assets}/',
        vars:{ctx:'${ctx}'}
    });
    //登陆
    $("#login-btn").click(function(){
        //$(this).val('登录中...');
        $.post('${ctx}/user/login.json',$('#login-box').serialize(),function(){
            location.href='${ctx}/dashboard';
        },'json');
        return false;
    });
    seajs.use('js/login.js',function(login){
        login.qq();
    });

</script>
</body>
</html>
