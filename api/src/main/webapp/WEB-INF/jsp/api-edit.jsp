<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  User: zhoujingjie
  Date: 2016-07-14
  Time: 13:41
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>${module.name!=null?(module.name):'可视化管理系统'}</title>
    <jsp:include page="css.jsp"/>
</head>
<body class="api-body api-editing">
<jsp:include page="header.jsp"/>
<section class="api-sec1">
    <%--<div class="api-sec1-desc ta-c">APIDOC是一个可视化接口管理系统</div>--%>
</section>
<!-- api module begin -->
<div class="api-modules">
    <div class="mc cb">
        <script type="text/plain" id="api-module-template">
    <li class="api-module fl api-module-item" id="!id!"><span onfocus="module.focus(this)" onclick="module.txtOnClick(this)" onblur="module.txtOnBlur(this)">{{name}}</span><i onclick="module.remove(this)" class="icon-close iconfont"></i><i onclick="module.edit(this)" class="icon-bianji iconfont"></i></li>
        </script>
        <ul id="api-modules">
            <c:forEach items="${modules}" var="d">
                <li data-id="${d.id}" class="api-module fl ${d.id==module.id?'active':''} api-module-item">
                    <span onclick="module.txtOnClick(this)" onfocus="module.focus(this)" onblur="module.txtOnBlur(this)">${d.name}</span>
                    <i onclick="module.remove(this)" class="icon-close iconfont"></i>
                    <i onclick="module.edit(this)" class="icon-bianji iconfont"></i>
                </li>
            </c:forEach>
            <li class="api-module fl api-new-module api-module-item" contenteditable="true">请编辑模块名称</li>
            <li class="api-module fl api-module-plus"><i class="icon-tianjia iconfont"></i></li>
            <li class="api-module fr api-cancel"><a href="../${project.id}"><i class="icon-cancel iconfont"></i><span>返回 </span></a></li>
        </ul>
    </div>
</div>
<!-- api module end -->
<!-- api editbox begin -->
<div id="api-edit-box" class="apis hide">
    <div class="mc cb api-container">
        <div class="fl apis-left">
            <script type="text/x-template" id="api-folder-template">
                <li id="!id!">
                    <div class="api-name api-folder open">
                        <i onclick="editor.folderToggleSlide(this)" class="icon-angeldownblock iconfont"></i>
                        <span contenteditable="true" onfocus="editor.folder.focus(this)" onblur="editor.folder.blur(this)">文件夹名称</span>
                        <i onclick="editor.folder.del(this)" class="icon-close iconfont"></i>
                        <i onclick="$(this).siblings('span').focus()" class="icon-bianji iconfont api-new"></i>
                        <i onclick="editor.newApi(this)" class="icon-tianjia iconfont api-new"></i>
                    </div>
                    <ul class="apis-nav apis-nav-sub"></ul>
                </li>
            </script>
            <script type="text/x-template" id="api-item-template">
                <li id="!id!">
                    <div class="api-name">
                        <span onclick="editor.turnRight(this)">!!name!!</span>
                        <i onclick="editor.apiDelete(this)" class="icon-close iconfont"></i>
                        <i onclick="editor.apiEdit(this)" class="icon-bianji iconfont api-new"></i>
                    </div>
                </li>
            </script>
            <ul class="apis-nav" id="api-edit-nav">
                <li>
                    <div class="api-name api-description active" onclick="editor.turnRightDoc(this)">
                        <span>接口说明</span>
                    </div>
                </li>
                <c:forEach items="${folders}" var="f">
                <li data-id="${f.id}">
                    <div class="api-name api-folder open">
                        <i onclick="editor.folderToggleSlide(this)" class="icon-angeldownblock iconfont"></i>
                        <span contenteditable="true" onfocus="editor.folder.focus(this)"  onblur="editor.folder.blur(this)">${f.name}</span>
                        <i onclick="editor.folder.del(this)" class="icon-close iconfont"></i>
                        <i onclick="$(this).siblings('span').focus()" class="icon-bianji iconfont api-new"></i>
                        <i onclick="editor.newApi(this)" class="icon-tianjia iconfont api-new"></i>
                    </div>
                    <ul class="apis-nav apis-nav-sub">
                        <c:forEach items="${f.children}" var="d">
                            <li data-id="${d.id}" data-folder-id="${f.id}">
                                <div class="api-name"<%-- data-json='${d}'--%>>
                                    <span onclick="editor.turnRight(this)">${d.name}</span>
                                    <i onclick="editor.apiDelete(this)" class="icon-close iconfont"></i>
                                    <i onclick="editor.apiEdit(this)" class="icon-bianji iconfont api-new"></i>
                                </div>
                            </li>
                        </c:forEach>
                    </ul>
                </li>
                </c:forEach>
                <li id="api-new-folder">
                    <div class="api-name api-folder-new"><i class="icon-tianjia iconfont"></i> 添加分类</div>
                </li>
            </ul>
        </div>
        <div class="api-content fl">
            <div id="api-edit-description" class="api-doc-desc">
                <p class="api-details-title">接口地址域名</p>
                <div class="form-text">
                    <input type="text" id="api-host" class="text" value="${module.host}" placeholder="接口地址域名如：http://example.com"/>
                </div>
                <div class="apis-module-name">接口说明</div>
                <script type="text/plain" id="myEditor" style="width:960px;height:500px;">${module.description}</script>
            </div>
            <script type="text/html" id="api-edit-details-template">
                <p class="api-details-title">基本信息</p>
                <div class="api-base-info api-edit-box">
                    <p>请求地址: {{host}}{{url}}</p>
                    <p>请求方式: {{requestMethod}}</p>
                    <p>响应类型: {{contentType}}</p>
                </div>
                <p class="api-details-title">接口描述</p>
                <div class="api-details-desc api-edit-box">{{#description}}</div>

                <!-- 请求头参数 -->
                <p class="api-details-title">请求头</p>
                <table class="table" cellpadding="0" cellspacing="0">
                    <thead>
                    <tr>
                        <th width="8%">操作</th>
                        <th width="20%">参数名称</th>
                        <th width="15%">是否必须</th>
                        <th width="20%">描述</th>
                        <th>默认值</th>
                    </tr>
                    </thead>
                    <tbody id="requestHeaderTbody">{{#requestHeaderBody}}</tbody>
                </table>
                <div class="form-text">
                    <button class="btn btn-primary"
                            onclick="$('#requestHeaderTbody').append($('#requestHeadTemplate').html().replace(/@level@/g,1))">
                        <i class="iconfont icon-tianjia"></i>添加参数
                    </button>
                </div>
                <!-- 请求参数 -->
                <p class="api-details-title">请求参数</p>
                <table class="table" cellpadding="0" cellspacing="0">
                    <thead>
                    <tr>
                        <th width="8%">操作</th>
                        <th width="20%">参数名称</th>
                        <th width="15%">是否必须</th>
                        <th width="20%">描述</th>
                        <th width="15%">类型</th>
                        <th>默认值</th>
                    </tr>
                    </thead>
                    <tbody id="requestArgTbody">{{#requestArgsBody}}</tbody>
                </table>
                <div class="form-text">
                    <button class="btn btn-primary"
                            onclick="$('#requestArgTbody').append($('#requestArgTemplate').html().replace(/@level@/g,1))">
                        <i class="iconfont icon-tianjia"></i>添加参数
                    </button>
                    <button class="btn btn-primary btn-import" data-for="#requestArgTbody"><i class="iconfont icon-importexport"></i>导入json</button>
                </div>

                <!-- 响应参数 -->
                <p class="api-details-title">响应数据</p>
                <table class="table" cellpadding="0" cellspacing="0">
                    <thead>
                    <tr>
                        <th class="edit-item" width="8%">操作</th>
                        <th width="20%">参数名称</th>
                        <th width="15%">类型</th>
                        <th>描述</th>
                    </tr>
                    </thead>
                    <tbody id="responseArgTbody">{{#responseArgsBody}}</tbody>
                </table>
                <div class="form-text">
                    <button class="btn btn-primary"
                            onclick="$('#responseArgTbody').append($('#responseArgTemplate').html().replace(/@level@/g,1))">
                        <i class="iconfont icon-tianjia"></i>添加参数
                    </button>
                    <button class="btn btn-primary btn-import" data-for="#responseArgTbody"><i class="iconfont icon-importexport"></i>导入json</button>
                </div>
                <p class="api-details-title">示例数据</p>
                <textarea class="api-example api-field" data-name="example" placeholder="请添加一些示例数据">{{example}}</textarea>

            </script>
            <!-- 请求参数模版 -->
            <script type="text/html" id="requestArgTemplate">
                <tr data-level="@level@" class="api-tr-row-@level@">
                    <td><i class="iconfont icon-close" onclick="editor.removeRow(this)"></i>
                        <i class="iconfont icon-tianjia api-add-sub" onclick='editor.requestArgTypeAppend(this)'></i>
                    </td>
                    <td contenteditable="true" class="td-name api-field" data-name="name"></td>
                    <td>
                        <select class="select api-field" data-name="require">
                            <option>false</option>
                            <option>true</option>
                        </select>
                    </td>
                    <td contenteditable="true" data-name="description" class="api-field"></td>
                    <td>
                        <select class="select api-field" data-name="type" onchange="editor.requestArgTypeChange(this)">
                            <option>string</option>
                            <option>number</option>
                            <option>boolean</option>
                            <option>file</option>
                            <option>object</option>
                            <option>array[object]</option>
                            <option>array[string]</option>
                            <option>array[number]</option>
                            <option>array[boolean]</option>
                        </select>
                    </td>
                    <td contenteditable="true" data-name="defaultValue" class="api-field"></td>
                </tr>
            </script>
            <!-- 请求头参数模版 -->
            <script type="text/html" id="requestHeadTemplate">
                <tr data-level="@level@" class="api-tr-row-@level@">
                    <td><i class="iconfont icon-close" onclick="editor.removeRow(this)"></i>
                        <i class="iconfont icon-tianjia api-add-sub" onclick='editor.requestArgTypeAppend(this)'></i>
                    </td>
                    <td contenteditable="true" class="td-name api-field" data-name="name"></td>
                    <td>
                        <select class="select api-field" data-name="require">
                            <option>false</option>
                            <option>true</option>
                        </select>
                    </td>
                    <td contenteditable="true" data-name="description" class="api-field"></td>
                    <td contenteditable="true" data-name="defaultValue" class="api-field"></td>
                </tr>
            </script>

            <!-- 响应参数模版 -->
            <script type="text/html" id="responseArgTemplate">
                <tr data-level="@level@" class="api-tr-row-@level@">
                    <td>
                        <i class="iconfont icon-close" onclick="editor.removeRow(this)"></i>
                        <i class="api-add-sub iconfont icon-tianjia" onclick='editor.responseArgTypeAppend(this)'></i>
                    </td>
                    <td contenteditable="true" class="td-name api-field" data-name="name"></td>
                    <td>
                        <select class="select api-field" data-name="type" onchange="editor.requestArgTypeChange(this)">
                            <option>string</option>
                            <option>number</option>
                            <option>boolean</option>
                            <option>object</option>
                            <option>array</option>
                            <option>array[object]</option>
                            <option>array[string]</option>
                            <option>array[number]</option>
                            <option>array[boolean]</option>
                        </select>
                    </td>
                    <td contenteditable="true" data-name="description" class="api-field"></td>
                </tr>
            </script>
            <div id="api-edit-details" class="hide">
                <div id="api-edit-content"></div>
                <div class="form-text">
                    <button class="btn btn-primary" id="api-save">保存修改</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- api editbox end -->

<div class="modal modal-layer"></div>
<div class="modal-box modal" id="api-add-modal">
    <div class="container">
        <div class="head cb">
            <div class="fl">添加接口</div>
            <div class="fr"><i class="iconfont modal-close icon-close"></i></div>
        </div>
        <div class="content">
            <form id="api-form" action="${ctx}/interface/save.json">
                <input type="hidden" id="api-modal-id" name="id">
                <input type="hidden" name="moduleId" class="api-field" value="${module.id}">
                <input type="hidden" name="projectId" class="api-field" value="${project.id}">
                <input type="hidden" name="folderId" class="api-field" id="api-folder-id">
                <div class="form-text">
                    <div class="field-name">接口名称</div>
                    <div><input class="text api-field" name="name" placeholder="接口名称" type="text"></div>
                </div>
                <div class="form-text">
                    <div class="field-name">请求地址</div>
                    <div><input class="text api-field" name="url" placeholder="请求地址" type="text"></div>
                </div>
                <div class="form-text">
                    <div class="field-name">请求方式</div>
                    <div>
                        <input type="radio" id="R-GET" name="requestMethod" value="GET">
                        <label for="R-GET">GET</label>
                        <input type="radio" id="R-POST" name="requestMethod" value="POST">
                        <label for="R-POST">POST</label>
                        <input type="radio" id="R-PUT" name="requestMethod" value="PUT">
                        <label for="R-PUT">PUT</label>
                        <input type="radio" id="R-PATCH" name="requestMethod" value="PATCH">
                        <label for="R-PATCH">PATCH</label>
                        <input type="radio" id="R-DELETE" name="requestMethod" value="DELETE">
                        <label for="R-DELETE">DELETE</label>
                        <input type="radio" id="R-HEAD" name="requestMethod" value="HEAD">
                        <label for="R-HEAD">HEAD</label>
                        <input type="radio" id="R-OPTIONS" name="requestMethod" value="OPTIONS">
                        <label for="R-OPTIONS">OPTIONS</label>
                    </div>
                </div>
                <div class="form-text">
                    <div class="field-name">响应类型</div>
                    <div>
                        <span>
                            <input type="radio" id="R-JSON" name="contentType" value="JSON">
                            <label for="R-JSON">JSON</label>
                        </span>
                        <span>
                            <input type="radio" id="R-JSONP" name="contentType" value="JSONP">
                            <label for="R-JSONP">JSONP</label>
                        </span>
                        <span>
                            <input type="radio" id="R-txt" name="contentType" value="TXT">
                            <label for="R-txt">TXT</label>
                        </span>
                        <span>
                            <input type="radio" id="R-HTML" name="contentType" value="HTML">
                            <label for="R-HTML">HTML</label>
                        </span>
                        <span>
                            <input type="radio" id="R-xml" name="contentType" value="XML">
                            <label for="R-xml">XML</label>
                        </span>
                        <span>
                            <input type="radio" id="R-image" name="contentType" value="IMAGE">
                            <label for="R-image">IMAGE</label>
                        </span>
                        <span>
                            <input type="radio" id="R-WEBSOCKET" name="contentType" value="WEBSOCKET">
                            <label for="R-WEBSOCKET">WEBSOCKET</label>
                        </span>

                        <span>
                            <input type="radio" id="R-binary" name="contentType" value="BINARY">
                            <label for="R-binary">BINARY</label>
                        </span>
                    </div>

                </div>
                <div class="form-text">
                    <div class="field-name">接口说明</div>
                    <div><textarea name="description" class="text api-field" placeholder="接口描述" rows="5"></textarea>
                    </div>
                </div>
            </form>
        </div>
        <div class="footer">
            <button data-type="new" id="api-add-modal-ok" class="btn btn-primary api-add-modal-ok">确认</button>
            <button class="btn btn-gray modal-close">取消</button>
        </div>
    </div>
</div>
<div class="modal-box modal" id="api-import-modal">
    <div class="container">
        <div class="head cb">
            <div class="fl">导入JSON</div>
            <div class="fr"><i class="iconfont modal-close icon-close"></i></div>
        </div>
        <div class="content">
            <textarea class="text" rows="10" id="api-import-data"></textarea>
        </div>
        <div class="footer">
            <button id="api-import-modal-ok" class="btn btn-primary">确认</button>
            <button class="btn btn-gray modal-close">取消</button>
        </div>
    </div>
</div>


</div>
<jsp:include page="footer.jsp"/>
<script src="${assets}/js/sea.js"></script>
<link href="${assets}/umeditor/themes/default/css/umeditor.css" type="text/css" rel="stylesheet">
<script charset="utf-8" src="${assets}/umeditor/umeditor.config.js"></script>
<script charset="utf-8" src="${assets}/umeditor/umeditor.min.js"></script>
<script src="${assets}/umeditor/lang/zh-cn/zh-cn.js"></script>

<script>
    var um = UM.getEditor('myEditor',{
        toolbars: [
            ['fullscreen', 'source', 'undo', 'redo', 'bold']
        ],
    });
    var apiData={};
    <c:forEach items="${folders}" var="f">
    <c:forEach items="${f.children}" var="d">
    apiData['${d.id}']=${d};
    </c:forEach></c:forEach>


    var currentModule = {
        id:"${module.id}",host:"${module.host}",name:"${module.name}",projectId:"${project.id}"
    };

    seajs.config({
        base:'${assets}/',
        alias:{
            "template":"arttemplate/template.js",
        },vars:{
            ctx:'${ctx}',data:apiData
        },
        preload:['template','jsonformat/jsonFormater.js'],
        debug:true,
        charset:'utf-8'
    });
    seajs.use(['js/api-editor.js','js/api-editor-module.js'],function(editor,module){
        editor.init();
        window.editor =editor;
        window.module = module;
    });
</script>
</body>
</html>