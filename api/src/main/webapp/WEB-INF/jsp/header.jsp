<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  User: zhoujingjie
  Date: 2016-07-14
  Time: 13:41
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div id="loading"> <div id="loading-sub"></div> <div class="loading"></div> </div>
<header>
    <div class="top">
        <div class="cb mc">
            <div class="user-action fr">
                <c:if test="${sessionScope.user == null}">
                    <a class="item" href="${ctx}/login">登陆</a>
                    <a class="item" href="${ctx}/register">注册</a>
                    <a class="item thirdly"><i class="iconfont icon-qq"></i></a>
                    <a class="item thirdly"><i class="iconfont icon-weibo"></i></a>
                    <a class="item thirdly"><i class="iconfont icon-github"></i></a>
                </c:if>
            </div>
        </div>
    </div>

    <div class="header mc cb">
        <a href="${ctx}/" class="logo fl"><img src="${assets}/img/logo/full.png"></a>
        <nav class="fl">
            <ul class="cb">
                <c:if test="${sessionScope.user != null}">
                    <li><a href="${ctx}/dashboard">主页</a> </li>
                </c:if>
                <c:if test="${sessionScope.user == null}">
                    <li><a href="${ctx}/">主页</a> </li>
                </c:if>
                <li><a href="${ctx}/project/demo">在线演示</a> </li>
                <li><a href="http://git.oschina.net/zhoujingjie/apiManager" target="_blank">GITHUB</a> </li>
                <li><a href="${ctx}/about">关于我们</a> </li>
            </ul>
        </nav>
        <c:if test="${sessionScope.user!=null}">
        <div class="user-info fr">
            <a href="" class="fl"><i class="iconfont icon-bell"></i> 消息</a>
            <div class="name fl">
                <a href="${ctx}/dashboard">${sessionScope.user.nickname} <i class="iconfont icon-angle"></i></a>
                <ul class="profile">
                    <li><a href="${ctx}/dashboard">我的主页</a> </li>
                    <li><a href="">个人设置</a> </li>
                    <div class="line"></div>
                    <li><a href="${ctx}/logout">退出</a> </li>
                </ul>
            </div>
        </div>
        </c:if>
    </div>
</header>