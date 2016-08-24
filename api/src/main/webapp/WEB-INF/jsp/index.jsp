<%--
  User: zhoujingjie
  Date: 2016-07-21
  Time: 17:09
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta property="qc:admins" content="347646601047210661412366547" />
    <title>小幺鸡在线接口管理系统</title>
    <jsp:include page="css.jsp"/>
    <meta name="keywords" content="小幺鸡,接口,api,接口管理,接口文档" />
    <meta name="description" content="小幺鸡在线接口管理系统，提升开发效率降低接口错误率。" />
</head>
<body>
<jsp:include page="header.jsp"/>
<section class="m-sec1">
    <div class="m-sec1-desc ta-c">小幺鸡，在线接口管理系统</div>
    <div class="ta-c m-sec1-go"><a href="${ctx}/register">立即使用</a></div>
</section>
<section class="m-sec2 cb mc">
    <div class="fl">
        <h3>在线接口测试</h3>
        <p class="m-s-desc">在线测试，方便前后端开发，降低错误率。<br/>支持：xml、json、txt、binary、websocket、thrift、protobuff</p>
    </div>
    <div class="fl">
        <h3>可视化编辑与分享</h3>
        <p class="m-s-desc">可视化编辑器，完善的分享机制，多功能导出。让接口撰写变得十分简单。</p>
    </div>
    <div class="fl">
        <h3>安全保障</h3>
        <p class="m-s-desc">基于阿里云服务器，提供安全备份系统。多家公司使用，安全证明。</p>
    </div>
    <div class="fl">
        <h3>代码开源</h3>
        <p class="m-s-desc">可离线安装到内网服务器仅供公司内部使用。</p>
    </div>
</section>
<jsp:include page="footer.jsp"/>
</body>
</html>