<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  User: zhoujingjie
  Date: 2016-07-14
  Time: 13:59
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>${module.name!=null?(module.name):'可视化管理系统'}</title>
    <jsp:include page="css.jsp"/>
    <link href="${assets}/jsonformat/jsonFormater.css" type="text/css" rel="stylesheet">
</head>
<body class="api-body">
<jsp:include page="header.jsp"/>
<section class="api-sec1">
    <%--<div class="api-sec1-desc ta-c">APIDOC是一个可视化接口管理系统</div>--%>
</section>
<c:if test="${module != null}">
    <!-- api module begin -->
    <div class="api-modules">
        <div class="mc cb">
            <ul id="api-modules">
                <c:forEach items="${modules}" var="d">
                <li data-id="${d.id}" class="api-module fl ${d.id==module.id?'active':''} api-module-item">
                    <span onclick="module.txtOnClick(this)" onblur="module.txtOnBlur(this)">${d.name}</span><i onclick="module.remove(this)" class="icon-close iconfont"></i><i onclick="module.edit(this)" class="icon-bianji iconfont"></i>
                </li>
                </c:forEach>
                <li class="api-module fr api-export"><i class="icon-export iconfont"></i><span>导出</span></li>
                <%--<li class="api-module fr api-export"><a href="${project.id}/log"><span>操作日志</span></a></li>--%>
                <c:if test="${sessionScope.user != null}">
                <li class="api-module fr api-edit"><a href="${project.id}/edit?moduleId=${module.id}"><i class="icon-bianji iconfont"></i><span>编辑</span></a> </li>
                </c:if>
            </ul>
        </div>
    </div>
    <!-- api module end -->
</c:if>

<!-- api viewbox begin -->
<div id="api-view-box">
    <div class="apis">
        <c:if test="${module != null}">
        <div class="api-container mc cb">
            <div class="fl apis-left">
                <div class="apis-module-name">接口文档</div>
                <div style="height: 1px;background: #d6d6d6;margin-bottom: 10px;"></div>

                <ul class="apis-nav" id="api-nav">
                    <li>
                        <div class="api-name api-description active">
                            <span>接口说明</span>
                        </div>
                    </li>
                    <c:forEach items="${folders}" var="f">
                        <li data-id="${f.id}">
                            <div class="api-name api-folder open"><span>${f.name}</span></div>
                            <ul class="apis-nav apis-nav-sub">
                                <c:forEach items="${f.children}" var="d">
                                <li data-id="${d.id}"><div class="api-name">${d.name}</div></li>
                                </c:forEach>
                            </ul>
                        </li>
                    </c:forEach>
                </ul>
            </div>
            <div class="api-content fl">
                <div class="cb">
                    <h3 class="apis-module-name fl" id="api-headline">接口说明</h3>
                    <span class="api-update-time fr">更新时间: <span id="api-update-time">${module.lastUpdateTime}</span></span>
                </div>
                <div id="api-doc-desc" class="api-doc-desc">
                    <c:if test="${module == null}">
                        <div class="api-no-module">请先创建module</div>
                    </c:if>
                    <c:if test="${module != null}">
                    <c:if test="${module.host!=null && module.host.length()>0}">
                        <div class="apis-module-host">域名前缀：${module.host}</div>
                    </c:if>
                    <div class="">${module.description}</div>
                    </c:if>
                </div>
                <script type="text/html" id="api-view-details-reqtr-template">
                    <tr  class="api-tr-row-{{level}}"><td class="td-name field-name">{{name}}</td> <td>{{require}}</td> <td>{{defaultValue}}</td> <td>{{type}}</td> <td>{{description}}</td> </tr>
                </script>
                <script type="text/html" id="api-view-details-resptr-template">
                    <tr class="api-tr-row-{{level}}"><td class="field-name td-name">{{name}}</td> <td>{{type}}</td> <td>{{description}}</td> </tr>
                </script>

                <script type="text/html" id="api-view-details-template">
                    <div class="api-details-desc api-edit-box">
                        <span class="content">{{#description}}</span>
                    </div>
                    <p class="api-details-title">基本信息</p>
                    <div class="api-base-info api-edit-box">
                        <p>请求地址: {{host}}{{url}}</p>
                        <p>请求方式: {{requestMethod}}</p>
                        <p>响应类型: {{contentType}}</p>
                    </div>
                    {{if requestArgs&& requestArgs.length>0}}
                    <p class="api-details-title">请求参数</p>
                    <table class="table" cellpadding="0" cellspacing="0">
                        <thead><tr> <th width="20%">参数名称</th> <th>是否必须</th> <th>默认值</th> <th>类型</th> <th>描述</th> </tr></thead>
                        <tbody>{{#requestArgsBody}}</tbody>
                    </table>
                    {{/if}}
                    {{if responseArgs&& responseArgs.length>0}}
                    <p class="api-details-title">响应数据</p>
                    <table class="table" cellpadding="0" cellspacing="0">
                        <thead><tr> <th width="20%">参数名称</th> <th>类型</th> <th>描述</th> </tr> </thead>
                        <tbody> {{#responseArgsBody}}</tbody>
                    </table>
                    {{/if}}
                    {{if example}}
                    <p class="api-details-title">示例数据</p>
                    <pre><code>{{example}}</code></pre>
                    {{/if}}

                    <p class="api-details-title">演示</p>
                    {{if contentType!='WEBSOCKET' }}
                    <form class="api-test" action="{{host}}{{url}}" method="{{requestMethod}}" data-contenttype="{{contentType}}">
                        {{each requestArgs}}
                        <div class="form-text cb">
                            <div class="text-field-name fl">{{$value.name}}</div>
                            <div class="text-value fl">
                                {{if $value.type != 'file'}}
                                <input type="text" name="{{$value.name}}" value="{{$value.defaultValue}}" placeholder="{{$value.description}}" class="text">
                                {{/if}}
                                {{if $value.type == 'file'}}
                                <input type="file" name="{{$value.name}}" class="text">
                                {{/if}}
                            </div>
                        </div>
                        {{/each}}
                        <div class="form-text cb" >
                            <div class="text-field-name fl"></div>
                            <div class="text-value fl"><input type="button" onclick="apis.submitExample(this,'{{id}}')" class="btn btn-primary" value="提交"></div>
                        </div>
                    </form>
                    {{/if}}
                    {{if contentType=='WEBSOCKET' }}
                    <div class="form">
                        <div class="item">
                        <div class="label col-sm-1">消息框</div>
                        <div class="col-sm-9">
                            <textarea class="text" rows="5" id="ws-message"></textarea>
                        </div>
                        </div>
                        <div class="item">
                            <div class="col-sm-1 label">发送消息</div>
                            <div class="col-sm-9"><input type="text" id="ws-input" class="text"></div>
                        </div>
                        <div class="item">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-9">
                                <div class="form-text cb" >
                                    <input type="button" id="ws-btn-connect" onclick="apis.ws.connect('{{host}}{{url}}')" class="btn btn-primary" value="连接">
                                    <input type="button" onclick="apis.ws.sendMessage()" class="btn btn-primary" value="发送消息">
                                </div>
                            </div>
                        </div>
                    </div>
                    {{/if}}

                    <!--<p class="api-details-title">结果数据</p>-->
                    <div id="api-result">{{#apiresult}}</div>

                </script>
                <div id="api-details" class="api-details"></div>
            </div>
        </div>
        </c:if>
        <c:if test="${project == null}">
            <div class="api-container mc api-nodata">
                <div class="ta-c i"><i class="iconfont icon-cloud"></i></div>
                <div class="ta-c tip">该项目不存在或者已下线</div>
            </div>
        </c:if>
        <c:if test="${project!=null && module == null}">
        <div class="api-container mc api-nodata">
            <div class="ta-c i"><i class="iconfont icon-cloud"></i></div>
            <div class="ta-c tip">该项目暂无任何接口</div>
            <div class="ta-c new-api"><a href="${project.id}/edit">添加接口</a> </div>
        </div>
        </c:if>

    </div>
</div>
<!-- api viewbox end -->
<jsp:include page="footer.jsp"/>
<script src="${assets}/js/sea.js"></script>
<%--<script src="${assets}/js/api.js"></script>
<script src="${assets}/arttemplate/template.js"></script>--%>
<%--<link href="${assets}/jsonformat/jsonFormater.css" type="text/css" rel="stylesheet">--%>
<%--<script src="${assets}/jsonformat/jsonFormater.js"></script>--%>
<script>

    gdata={result:{}};
    var currentModule = {id:'${module.id}',name:'${module.name}',host:'${module.host}'};
    var apiData={};
    <c:forEach items="${folders}" var="f">
    <c:forEach items="${f.children}" var="d">
    apiData['${d.id}']=${d};
    </c:forEach></c:forEach>


    seajs.config({
        base:'${assets}/',
        alias:{
            "template":"arttemplate/template.js",
            'jsonformat':'jsonformat/jsonFormater.js'
        },vars:{
            ctx:'${ctx}',data:apiData
        },
        preload:['template','jsonformat'],
        debug:true,
        charset:'utf-8'
    });
    seajs.use(['js/api-view.js','js/api-view-module.js'],function(apis,module){
        window.apis=apis;
        apis.init();
        window.module = module;
    });
</script>
</body>
</html>
