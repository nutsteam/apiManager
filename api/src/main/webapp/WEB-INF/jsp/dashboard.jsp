<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  User: zhoujingjie
  Date: 2016-07-20
  Time: 10:49
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>小幺鸡API可视化管理系统</title>
    <jsp:include page="css.jsp"/>
    <meta name="keywords" content="" />
    <meta name="description" content="" />

</head>
<body>
<jsp:include page="header.jsp"/>
<div class="hp-line"></div>
<div class="mc hp-title">我的主页</div>
<c:if test="${teams.size()>0}">
    <div class="hp-tabs">
        <div class="mc cb">
            <c:forEach items="${teams}" var="d">
                <a href="${ctx}/dashboard/team/${d.id}" class="hp-tab fl ${d.id == team.id?'active':''}">${d.name}</a>
            </c:forEach>

            <a class="hp-tab fl hp-plus" data-modal="#team-modal"></a>
            <a class="hp-tab fr hp-setting"  data-json='{"id":"${team.id}","name":"${team.name}","description":"${team.description}"}'><i class="iconfont icon-setting"></i></a>
        </div>
    </div>
</c:if>
<section class="hp-sec1">
    <div class="hp-projects cb mc">
        <c:forEach items="${projects}" var="d">
        <div class="hp-project" data-id="${d.id}">
            <a href="${ctx}/project/${d.id}" class="hp-p-name">${d.name} </a>
            <div class="hp-p-desc">${d.description}</div>
            <div class="hp-actions">
                <ul class="cb">
                    <li class="fl hp-atn-edit" title="编辑" data-json='{"id":"${d.id}","name":"${d.name}","description":"${d.description}"}'><i class="iconfont icon-bianji"></i></li>
                    <li class="fl hp-atn-delete" title="删除"><i class="iconfont icon-shanchu"></i></li>
                </ul>
            </div>
            <div class="hp-master" data-id="${d.userId}">@${d.userName}</div>
        </div>
        </c:forEach>
        <c:if test="${teams.size()>0}">
            <div class="hp-project hp-p-new hp-add-box">
                <i class="iconfont icon-tianjia"></i>
                <div>创建项目</div>
            </div>
        </c:if>
        <c:if test="${teams.size()==0}">
            <div id="new-team" class="hp-project hp-add-box">
                <i class="iconfont icon-tianjia"></i>
                <div>创建团队</div>
            </div>
        </c:if>
    </div>
</section>

<div class="modal-box modal" id="project-modal">
    <div class="container">
        <div class="head cb">
            <div class="fl">项目</div>
            <div class="fr"><i class="iconfont modal-close icon-close"></i></div>
        </div>
        <div class="content">
            <form action="" id="project-form" class="form">
                <input type="hidden" name="id">
                <input type="hidden" name="teamId" value="${team.id}">
                <div class="item">
                    <div class="label col-sm-2">项目名称</div>
                    <div class="col-sm-9"><input class="text" maxlength="50" name="name" placeholder="团队名称" type="text"></div>
                </div>
                <div class="item">
                    <div class="label col-sm-2">项目简介</div>
                    <div class="col-sm-9"><textarea name="description" maxlength="300" class="text" placeholder="团队描述" rows="5"></textarea></div>
                </div>
                <div class="item">
                    <div class="label col-sm-2">项目成员</div>
                    <div class="col-sm-9" id="members">
                        <ul class="cb hp-team-members"></ul>
                        <script type="text/html" id="hp-team-member"> <li data-id="{{id}}" data-projectid="{{projectId}}">{{name}}<i class="iconfont icon-close" onclick="o.memRemove(this)"></i></li></script>
                        <div class="hp-invite-box">
                            <div class="hide" id="hp-mem-hiddens"></div>
                            <input type="text" class="invite text" placeholder="添加项目成员"/>
                            <img src="${assets}/img/loading.gif" id="input-loading">
                            <script type="text/html" id="hp-mem-dl-item">
                                {{each list}}<li onclick="o.memberClick('{{$value.id}}','{{$value.nickname}}')" data-id="{{$value.id}}">{{$value.nickname}} - {{$value.email}}</li>{{/each}}
                            </script>
                            <ul class="hp-member-list" id="hp-mem-dl"></ul>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="label col-sm-2">公开性</div>
                    <div class="col-sm-10">
                        <div class="label">
                            <input type="radio" checked="checked" name="permission" id="team-prop-public" value="public">
                            <label for="team-prop-public">公开</label>
                            <input type="radio" name="permission"  id="team-prop-private" value="private">
                            <label for="team-prop-private">私有</label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="footer">
            <button class="btn btn-primary btn-project-ok">确认</button>
            <button class="btn btn-gray modal-close">取消</button>
        </div>
    </div>
</div>
<div class="modal modal-layer" ></div>
<div class="modal modal-box" id="team-modal">
    <div class="container">
        <div class="head cb">
            <div class="fl head-name">团队</div>
            <div class="fr"><i class="iconfont modal-close icon-close"></i></div>
        </div>
        <div class="content">
            <div class="g-tabs">
                <a href="#team-baseinfo" id="team-baseinfo-a" class="g-tab active">基本信息</a>
                <a href="#team-transfer" class="g-tab">其他设置</a>
            </div>
            <div class="g-tab-content active" id="team-baseinfo">
                <form id="team-form" class="form">
                    <input type="hidden" class="team-id" name="id">
                    <div class="item">
                        <div class="label col-sm-2">团队名称</div>
                        <div class="col-sm-10"><input maxlength="50" class="text" name="name" placeholder="团队名称" type="text"></div>
                    </div>
                    <div class="item">
                        <div class="label col-sm-2">团队简介</div>
                        <div class="col-sm-10"><textarea maxlength="300" name="description" class="text" placeholder="团队描述" id="" rows="5"></textarea></div>
                    </div>

                </form>

                <div class="footer">
                    <button class="btn btn-primary btn-team-ok">确认</button>
                    <button class="btn btn-gray modal-close">取消</button>
                </div>
            </div>
            <div class="g-tab-content form" id="team-transfer">
                <div class="item">
                    <div class="label col-sm-2">转让团队</div>
                    <div class="col-sm-8">
                        <input type="text" class="text" placeholder="请输入接收人邮箱"/>
                    </div>
                    <div class="col-sm-2"><button class="btn btn-danger">转让</button></div>
                </div>
                <div class="item">
                    <div class="label col-sm-2">解散团队</div>
                    <div class="col-sm-10"><button class="btn btn-danger hp-team-release">解散当前团队</button></div>
                </div>
            </div>
        </div>

    </div>
</div>
<script>var _ctx_='${ctx}',team={id:'${team.id}'};</script>
<script src="${assets}/js/sea.js"></script>
<script>
    seajs.config({
        base:'${assets}/',
        alias:{
            "template":"arttemplate/template.js",
            "apis":"js/ex.js",
            "jquery":'js/jquery.min.js'
        },vars:{
            ctx:'${ctx}'
        },
        preload:['jquery'],
        debug:true,
        charset:'utf-8'
    });
    seajs.use('js/dashboard');
    define(function(require){
        window.o = require('js/dashboard')
    })
</script>
<jsp:include page="footer.jsp"/>
<c:if test="${teams.size()==0}">
    <script>
        $("#new-team").on("click",function(e){
            $("#team-modal .g-tabs").hide();
            $("#team-baseinfo-a").click();
            $("#team-modal").modal();
            e.stopPropagation();
        });
        $("#team-modal .head-name").text("创建团队");
    </script>
</c:if>
</body>
</html>