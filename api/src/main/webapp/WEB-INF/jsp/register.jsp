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
    <title>注册 - 小幺鸡</title>
    <jsp:include page="css.jsp"/>
    <meta name="keywords" content="小幺鸡,接口,api,接口管理,接口文档" />
    <meta name="description" content="小幺鸡在线接口管理系统，提升开发效率降低接口错误率。" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<body class="login-register-body">

<div class="login-form mc">
    <form class="form" onsubmit="return false" id="register-box">
        <div class="ta-c logo"><a href="${ctx}/"><img src="${assets}/img/logo/full.png"></a> </div>
        <div class="item">
            <input type="password" name="nickname" maxlength="20" class="text" autocomplete="off"  placeholder="输入姓名方便团队查找"/>
        </div>
        <div class="item">
            <input type="email" name="email" maxlength="40" class="text" autocomplete="off" placeholder="输入邮箱可以找回密码"/>
        </div>
        <div class="item">
            <input type="password" name="password" maxlength="20" class="text" autocomplete="off"  placeholder="密码"/>
        </div>
        <div class="item">
            <input type="submit" id="register-btn" class="btn" value="免费注册"/>
        </div>
    </form>
    <div class="long-line"></div>
    <br/>
    <div>
        <a href="${ctx}/login">返回登陆</a>
    </div>
</div>
<script src="${ctx}/assets/js/jquery.min.js"></script>
<script src="${ctx}/assets/js/ex.js"></script>
<script src="${ctx}/assets/js/sea.js"></script>
<script>
    seajs.config({
        base:'${assets}/'
    });
    seajs.use('js/app.js',function(app){
        app.clearForm();
    });
    //注册
    $("#register-btn").click(function(){
        //$(this).val('注册中...');
        $.post('${ctx}/user/register.json',$('#register-box').serialize(),function(){
            alert('注册成功');
            location.href='${ctx}/login';
        },'json');
        return false;
    });
</script>
</body>
</html>
