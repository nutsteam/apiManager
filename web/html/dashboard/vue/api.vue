<template>
    <template v-if="!status.loading">
        <div class="api-modules-tab ta-c">
            <a class="api-module api-module-item" v-bind:class="{'active':editing}" v-on:click="editing=true">编辑模式</a>
            <a class="api-module api-module-item" v-bind:class="{'active':!editing}" v-on:click="editing=false">浏览模式</a>
        </div>
        <div v-show="editing">
            <div class="api-modules">
                <div class="cb api-modules-container">
                    <ul id="api-modules" >
                        <li data-id="{{item.id}}" v-for="item in modules" class="api-module fl api-module-item"
                            v-bind:class="{'active':currentModule.id == item.id}">
                            <span v-on:click="moduleClick(item)">{{item.name}}</span>
                            <i class="icon-close iconfont" v-on:click="moduleDelete(item)"></i>
                            <i class="icon-bianji iconfont" v-on:click="moduleEdit(item)"></i>
                        </li>
                        <li class="api-module fl api-module-plus" v-on:click="moduleNew">
                            <i class="icon-tianjia iconfont"></i></li>
                    </ul>
                </div>
            </div>
            <div id="api-edit-box" class="apis">
                <div class="cb api-container">
                    <div class="fl apis-left">
                        <ul class="apis-nav" id="api-edit-nav">
                            <li>
                                <div class="api-name api-description cb" v-bind:class="{'active':showGuide}"
                                     v-on:click="apiDescClick">
                                    <span>接口设置</span>
                                    <span class="fr api-actions">
                                        <i class="iconfont icon-list" v-on:click="collapse=!collapse"></i>
                                    </span>
                                </div>
                            </li>
                            <template v-if="!currentModule.folders">
                                {{currentModule.folders = []}}
                            </template>
                            <li v-for="item in currentModule.folders">
                                <div class="api-name api-folder cb" v-bind:class="{'open':!collapse}" v-on:click="folderClick">
                                    <span>{{item.name}}</span>
                                    <div class="fr">
                                        <i v-on:click="folderNewApi(item,$event)" class="icon-tianjia iconfont api-new"></i>
                                        <i v-on:click.stop="flag.actionId=item.id" class="icon-angeldownblock iconfont"></i>
                                    </div>
                                </div>
                                <ul class="apis-nav apis-nav-sub" v-bind:class="{'hide':collapse}">
                                    <li v-for="api in item.children">
                                        <div class="api-name cb" v-on:click="apiClick(api,item)"
                                             v-bind:class="{'active':currentApi.id == api.id}">
                                            <span>{{api.name}}</span>
                                            <div class="fr">
                                                <i v-on:click.stop="flag.actionId=api.id" class="icon-angeldownblock iconfont"></i>
                                            </div>
                                        </div>
                                        <div class="api-item-actions" v-show="flag.actionId==api.id">
                                            <div v-on:click="listItemCopy('api',api.id,'copy')"><i class="iconfont icon-copy"></i> 复制</div>
                                            <div v-on:click="listItemCopy('api',api.id,'move')"><i class="iconfont icon-move"></i> 移动</div>
                                            <div v-on:click="apiDelete(api,item.children,$event)"><i class="iconfont icon-move"></i> 删除</div>
                                        </div>
                                    </li>
                                </ul>
                                <div class="api-item-actions" v-show="flag.actionId==item.id">
                                    <div v-on:click="listItemCopy('folder',item.id,'copy')"><i class="iconfont icon-copy"></i> 复制</div>
                                    <div v-on:click="listItemCopy('folder',item.id,'move')"><i class="iconfont icon-move"></i> 移动</div>
                                    <div v-on:click="folderEdit(item,$event)" ><i class="iconfont icon-bianji"></i> 编辑</div>
                                    <div v-on:click="folderDelete(item,$event)"><i class="iconfont icon-move"></i> 删除</div>
                                </div>
                            </li>
                            <li v-on:click="folderNew">
                                <div class="api-name api-folder-new"><i class="icon-tianjia iconfont"></i> 创建分类</div>
                            </li>
                        </ul>
                    </div>
                    <div class="api-content fl">
                        <div id="api-edit-description" class="api-doc-desc" v-bind:class="{'hide':!showGuide}">
                            <p class="api-details-title">接口地址前缀</p>
                            <p class="api-details-title second">线上环境</p>
                            <div class="form-text">
                                <input type="text" debounce="500"
                                       v-model="currentModule.host" class="text" value="{{currentModule.host}}"
                                       placeholder="线上环境地址如：http://www.example.com">
                            </div>
                            <p class="api-details-title second">开发环境</p>
                            <div class="form-text">
                                <input type="text" debounce="500"
                                       v-model="currentModule.devHost" class="text" value="{{currentModule.devHost}}"
                                       placeholder="开发环境地址如：http://test.example.com">
                            </div>
                            <div class="api-details-title">接口描述</div>
                            <!--<script type="text/plain" id="myEditor" style="width:960px;height:500px;"></script>-->
                            <div id="editorBox"></div>

                            <div class="api-btn-save ta-c">
                                <button class="btn btn-orange" v-on:click="apiSaveHostDescription">保存修改</button>
                            </div>
                        </div>
                        <div id="api-edit-details" v-bind:class="{'hide':showGuide}">
                            <div id="api-edit-content" class="form">
                                <p class="api-details-title">基本信息</p>
                                <div class="item">
                                    <div class="col-sm-2 label">接口名称</div>
                                    <div class="col-sm-10">
                                        <input type="text" class="text" maxlength="20" placeholder="接口名称"
                                               v-model="currentApi.name" value="{{currentApi.name}}">
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="col-sm-2 label">请求类型</div>
                                    <div class="col-sm-10 full-text">
                                        <input type="radio" id="rt-http" value="HTTP" v-model="currentApi.protocol">
                                        <label for="rt-http">HTTP</label>
                                        <input type="radio" id="rt-ws" value="WEBSOCKET" v-model="currentApi.protocol">
                                        <label for="rt-ws">WEBSOCKET</label>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="col-sm-2 label">请求地址(不包含地址前缀)</div>
                                    <div class="col-sm-10">
                                        <input type="text" placeholder="如:/api/test" v-model="currentApi.url" class="text"
                                               value="{{currentApi.url}}">
                                    </div>
                                </div>
                                <div v-show="currentApi.protocol=='HTTP'">
                                    <div class="item">
                                        <div class="col-sm-2 label">请求方法</div>
                                        <div class="col-sm-10 full-text">
                                            <input type="radio" id="rm-GET" value="GET"
                                                   v-model="currentApi.requestMethod">
                                            <label for="rm-GET">GET</label>
                                            <input type="radio" id="rm-POST" value="POST"
                                                   v-model="currentApi.requestMethod">
                                            <label for="rm-POST">POST</label>
                                            <input type="radio" id="rm-PUT" value="PUT"
                                                   v-model="currentApi.requestMethod">
                                            <label for="rm-PUT">PUT</label>
                                            <input type="radio" id="rm-DELETE" value="DELETE"
                                                   v-model="currentApi.requestMethod">
                                            <label for="rm-DELETE">DELETE</label>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="col-sm-2 label">请求数据类型</div>
                                        <div class="col-sm-10 full-text">
                                        <span>
                                            <input type="radio" id="dt-X" value="X-WWW-FORM-URLENCODED"
                                                   v-model="currentApi.dataType">
                                            <label for="dt-X">X-WWW-FORM-URLENCODED</label>
                                        </span>
                                            <template
                                                    v-if="currentApi.requestMethod!='GET' && currentApi.requestMethod != 'DELETE'">
                                                <input type="radio" id="dt-DF" value="FORM-DATA"
                                                       v-model="currentApi.dataType">
                                                <label for="dt-DF">FORM-DATA</label>
                                                <input type="radio" id="dt-RAW" value="RAW"
                                                       v-model="currentApi.dataType">
                                                <label for="dt-RAW">RAW</label>
                                                <input type="radio" id="dt-BINARY" value="BINARY"
                                                       v-model="currentApi.dataType">
                                                <label for="dt-BINARY">BINARY</label>
                                            </template>
                                        </div>
                                    </div>

                                    <div class="item">
                                        <div class="col-sm-2 label">响应数据类型</div>
                                        <div class="col-sm-10 full-text">
                                            <input type="radio" id="ct-JSON" value="JSON"
                                                   v-model="currentApi.contentType">
                                            <label for="ct-JSON">JSON</label>
                                            <input type="radio" id="ct-JSONP" value="JSONP"
                                                   v-model="currentApi.contentType">
                                            <label for="ct-JSONP">JSONP</label>
                                            <input type="radio" id="ct-TEXT" value="TEXT"
                                                   v-model="currentApi.contentType">
                                            <label for="ct-TEXT">TEXT</label>
                                            <input type="radio" id="ct-XML" value="XML"
                                                   v-model="currentApi.contentType">
                                            <label for="ct-XML">XML</label>
                                            <input type="radio" id="ct-HTML" value="HTML"
                                                   v-model="currentApi.contentType">
                                            <label for="ct-HTML">HTML</label>
                                            <input type="radio" id="ct-IMAGE" value="IMAGE"
                                                   v-model="currentApi.contentType">
                                            <label for="ct-IMAGE">IMAGE</label>
                                            <input type="radio" id="ct-BINARY" value="BINARY"
                                                   v-model="currentApi.contentType">
                                            <label for="ct-BINARY">BINARY</label>
                                        </div>
                                    </div>

                                </div>
                                <div class="item">
                                    <div class="col-sm-2 label">接口描述</div>
                                    <div class="col-sm-10">
                                    <textarea class="text"
                                              v-model="currentApi.description">{{currentApi.description}}</textarea>
                                    </div>
                                </div>
                                <!-- 请求头参数 -->
                                <p class="api-details-title">请求头</p>
                                <div class="div-table editing">
                                    <ul class="div-table-header div-table-line cb">
                                        <li class="col-sm-1">操作</li>
                                        <li class="col-sm-3">参数名称</li>
                                        <li class="col-sm-2">是否必须</li>
                                        <li class="col-sm-4">描述</li>
                                        <li class="col-sm-2">默认值</li>
                                    </ul>
                                    <request-headers-vue
                                            v-bind:request-headers.sync="currentApi.requestHeaders"
                                            v-bind:editing="editing"></request-headers-vue>
                                </div>
                                <div class="item">
                                    <button class="btn btn-default btn-sm" v-on:click="insertNewRequestHeadersRow">
                                        <i class="iconfont icon-tianjia"></i>添加参数
                                    </button>
                                    <button class="btn btn-default btn-sm" v-on:click="import2RequestHeaders">
                                        <i class="iconfont icon-importexport"></i>导入json
                                    </button>
                                </div>
                                <!-- 请求参数 -->
                                <p class="api-details-title">请求参数</p>
                                <div class="div-table editing" v-if="currentApi.dataType!='BINARY'">
                                    <ul class="div-table-header div-table-line cb">
                                        <li class="col-sm-1">操作</li>
                                        <li class="col-sm-3">参数名称</li>
                                        <li class="col-sm-2">是否必须</li>
                                        <li class="col-sm-2">类型</li>
                                        <li class="col-sm-2">描述</li>
                                        <li class="col-sm-2">默认值</li>
                                    </ul>
                                    <request-args-vue v-bind:request-args="currentApi.requestArgs"
                                                      v-bind:editing="editing"></request-args-vue>
                                </div>
                                <div class="div-table" v-else>
                                    <ul class="div-table-header div-table-line cb">
                                        <li class="col-sm-1">操作</li>
                                        <li class="col-sm-11">参数名称</li>
                                    </ul>
                                    <ul class="div-table-line cb" v-for="item in currentApi.requestArgs">
                                        <li class="col-sm-1">
                                            <i class="iconfont icon-close"
                                               v-on:click="currentApi.requestArgs.$remove(item)"></i>
                                            <i class="iconfont icon-tianjia"
                                               v-on:click="currentApi.requestArgs.push({children:[]})"></i>
                                        </li>
                                        <li class="col-sm-11">{{item.name}}</li>
                                    </ul>
                                </div>

                                <div class="item">
                                    <button class="btn btn-default btn-sm" v-on:click="insertNewRequestArgsRow">
                                        <i class="iconfont icon-tianjia"></i>添加参数
                                    </button>
                                    <button class="btn btn-default btn-sm" v-on:click="import2RequestArgs">
                                        <i class="iconfont icon-importexport"></i>导入json
                                    </button>
                                </div>

                                <!-- 响应参数 -->
                                <p class="api-details-title">响应数据</p>
                                <div class="div-table editing">
                                    <ul class="div-table-header div-table-line cb">
                                        <li class="col-sm-1">操作</li>
                                        <li class="col-sm-3">参数名称</li>
                                        <li class="col-sm-2">是否必须</li>
                                        <li class="col-sm-2">类型</li>
                                        <li class="col-sm-4">描述</li>
                                    </ul>
                                    <response-args-vue v-bind:response-args="currentApi.responseArgs"
                                                       v-bind:editing="editing"></response-args-vue>
                                </div>
                                <div class="item">
                                    <button class="btn btn-default btn-sm" v-on:click="insertNewResponseArgsRow">
                                        <i class="iconfont icon-tianjia"></i>添加参数
                                    </button>
                                    <button class="btn btn-default btn-sm" v-on:click="import2ResponseArgs">
                                        <i class="iconfont icon-importexport"></i>导入json
                                    </button>
                                </div>
                                <p class="api-details-title">示例数据</p>
                            <textarea class="api-example api-field" v-model="currentApi.example"
                                      placeholder="请添加一些示例数据">{{currentApi.example}}</textarea>
                            </div>
                            <!--<div class="item">
                                <button class="btn btn-primary" v-on:click="apiSave">保存修改</button>
                            </div>-->
                            <div class="api-btn-save ta-c">
                                <button class="btn btn-orange" v-on:click="apiSave">保存修改</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal" v-cloak v-if="status.folderModal">
                <div class="modal-header">
                    <i class="iconfont icon-close modal-close" v-on:click="status.folderModal=false"></i>
                </div>
                <div class="modal-content">
                    <div class="modal-layout1 form">
                        <validator name="ff">
                            <p class="title">{{!folderName?'创建':'编辑'}}分类</p>
                            <input type="text" class="k1 text" id="folderName" value="{{folderName}}" maxlength="20"
                                   initial="off"
                                   v-model="folderName"
                                   v-validate:folder-name="{maxlength:20}"
                                   v-bind:autofocus="status.folderModal"
                                   tabindex="1" placeholder="请输入文件夹名称">
                            <div class="tip" v-if="$ff.folderName.invalid">{{$ff.errors[0].message}}</div>
                        </validator>
                        <div class="ta-c actions">
                            <button class="btn btn-default-box middle" tabindex="3"
                                    v-on:click="status.folderModal=false">取消
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button class="btn btn-primary middle" v-on:click="folderSave" tabindex="2">确定</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" v-cloak v-if="status.moduleModal">
                <div class="modal-header">
                    <i class="iconfont icon-close modal-close" v-on:click="status.moduleModal=false"></i>
                </div>
                <div class="modal-content">
                    <div class="modal-layout1 form">
                        <validator name="mf">
                            <p class="title">{{!moduleName?'创建':'编辑'}}模块</p>
                            <input type="text" maxlength="20" id="moduleName" class="k1 text" v-model="moduleName"
                                   value="{{moduleName}}"
                                   initial="off"
                                   v-validate:module-name="{maxlength:20}"
                                   v-bind:autofocus="status.folderModal"
                                   tabindex="1" placeholder="请输入模块名称">
                            <div class="tip" v-if="$mf.moduleName.invalid">{{$mf.errors[0].message}}</div>
                            <div class="ta-c actions">
                                <button class="btn btn-default-box middle" tabindex="3"
                                        v-on:click="status.moduleModal=false">
                                    取消
                                </button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button class="btn btn-primary middle" v-on:click="moduleSave" tabindex="2">确定</button>
                            </div>
                        </validator>
                    </div>
                </div>
            </div>
            <div class="modal" v-cloak v-if="status.importModal">
                <div class="modal-header">
                    <i class="iconfont icon-close modal-close" v-on:click="status.importModal=false"></i>
                </div>
                <div class="modal-content">
                    <div class="modal-layout1 form" style="width: 500px">
                        <validator name="if">
                            <p class="title">导入JSON</p>
                        <textarea rows="15" class="k1 text" v-model="importValue" initial="off"
                                  v-bind:autofocus="status.importModal"
                                  tabindex="1" placeholder="请粘贴导入的数据"></textarea>
                            <div class="ta-c actions">
                                <button class="btn btn-default-box middle" tabindex="3"
                                        v-on:click="status.importModal=false">
                                    取消
                                </button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button class="btn btn-primary middle" v-on:click="importOk" tabindex="2">确定</button>
                            </div>
                        </validator>
                    </div>
                </div>
            </div>
            <div class="modal" v-cloak v-if="status.moveCopyModal">
                    <div class="modal-header">
                        <i class="iconfont icon-close modal-close" v-on:click="status.moveCopyModal=false"></i>
                    </div>
                    <div class="modal-content">
                        <div class="modal-layout1 form" style="width: 500px">
                                <p class="title">{{flag.move?'移动':'复制'}}{{flag.moveCopyName}}</p>
                                <div class="item">
                                    <div class="label col-sm-2">选择模块</div>
                                    <div class="col-sm-10 full-text">
                                        <select class="text" v-model="flag.moveCopySelectModuleId">
                                            <option v-for="item in modules" v-bind:value="item.id">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="item" v-for="m in modules" v-if="flag.moveCopySelectModuleId==m.id && flag.moveCopyName=='接口'">
                                    <div class="label col-sm-2">选择分类</div>
                                    <div class="col-sm-10 full-text">
                                        <select class="text" v-model="flag.moveCopySelectFolderId">
                                            <option v-for="item in m.folders" v-bind:value="item.id">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="ta-c actions">
                                    <button class="btn btn-default-box middle" tabindex="3"
                                            v-on:click="status.moveCopyModal=false">
                                        取消
                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button class="btn btn-primary middle" v-on:click="copyMoveOk" tabindex="2">确定</button>
                                </div>
                        </div>
                    </div>
                </div>

        </div>
        <div v-show="!editing">
            <template v-if="!error.projectNotExists">
                <div class="api-modules">
                    <div class="cb api-modules-container">
                        <ul>
                            <li v-for="item in modules"
                                class="api-module fl api-module-item"
                                v-bind:class="{'active':currentModule.id == item.id}"><span
                                    v-on:click="moduleClick(item)">{{item.name}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="apis">
                    <div v-if="currentModule.folders && currentModule.folders.length>0" class="cb api-container">
                        <div class="fl apis-left">
                            <ul class="apis-nav">
                                <li>
                                    <div class="api-name api-description" v-bind:class="{'active':showGuide}"
                                         v-on:click="apiDescClick">
                                        <span>接口说明</span>
                                        <span class="fr api-actions">
                                        <i class="iconfont icon-list" v-on:click="collapse=!collapse"></i>
                                    </span>
                                    </div>
                                </li>
                                <template v-if="!currentModule.folders">
                                    {{currentModule.folders = []}}
                                </template>
                                <li v-for="item in currentModule.folders">
                                    <div class="api-name api-folder" v-bind:class="{'open':!collapse}" v-on:click="folderClick">
                                        <span>{{item.name}}</span>
                                    </div>
                                    <ul class="apis-nav apis-nav-sub" v-bind:class="{'hide':collapse}">
                                        <li v-for="api in item.children" v-on:click="showGuide=false">
                                            <div class="api-name" v-bind:class="{'active':currentApi.id == api.id}"
                                                 v-on:click="apiClick(api,item)">
                                                <span>{{api.name}}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="api-content fl">
                            <div class="cb">
                                <h3 class="apis-module-name fl" id="api-headline">接口信息</h3>
                                <span class="api-update-time fr">更新时间: <span id="api-update-time">{{currentModule.lastUpdateTime}}</span></span>
                            </div>
                            <div id="api-doc-desc" class="api-doc-desc" v-show="showGuide">
                                <template v-if="currentModule.host || currentModule.devHost">
                                    <p class="api-details-title">接口地址前缀</p>
                                    <p class="api-details-title second" v-if="currentModule.host">线上环境：{{currentModule.host}}</p>
                                    <p class="api-details-title second" v-if="currentModule.devHost">开发环境：{{currentModule.devHost}}</p>
                                </template>
                                <div id="view-box" v-show="currentModule.description"></div>
                                <div v-show="!currentModule.description" class="ta-c api-error-tip">
                                    <i class="iconfont icon-info" style="font-size: 120px"></i>
                                    <p style="font-size: 24px">该模块还没有描述信息</p>
                                </div>
                            </div>
                            <div id="api-details" class="api-details" v-show="!showGuide">
                                <p class="api-details-title">基本信息</p>
                                <div class="api-base-info api-edit-box">
                                    <p v-if="currentApi.protocol">请求类型: {{currentApi.protocol}}</p>
                                    <p v-if="currentModule.host || currentApi.url">接口地址:{{currentApi.url}}</p>
                                    <p v-if="currentApi.requestMethod">请求方式: {{currentApi.requestMethod}}</p>
                                    <p v-if="currentApi.dataType">数据类型: {{currentApi.dataType}}</p>
                                    <p v-if="currentApi.contentType">响应类型: {{currentApi.contentType}}</p>
                                </div>
                                <template v-if="currentApi.description">
                                    <p class="api-details-title">接口描述</p>
                                    <div>{{currentApi.description}}</div>
                                </template>
                                <template v-if="currentApi.requestHeaders  && currentApi.requestHeaders.length>0">
                                    <p class="api-details-title">请求头</p>
                                    <div class="div-table">
                                        <ul class="div-table-header div-table-line cb">
                                            <li class="col-sm-2">参数名称</li>
                                            <li class="col-sm-1">是否必须</li>
                                            <li class="col-sm-7">描述</li>
                                            <li class="col-sm-2">默认值</li>
                                        </ul>
                                        <request-headers-vue
                                                v-bind:request-headers.sync="currentApi.requestHeaders"
                                                v-bind:editing="editing"></request-headers-vue>
                                    </div>
                                </template>
                                <template v-if="currentApi.requestArgs  && currentApi.requestArgs.length>0">
                                    <p class="api-details-title">请求参数</p>
                                    <div class="div-table">
                                        <ul class="div-table-header div-table-line cb">
                                            <li class="col-sm-2">参数名称</li>
                                            <li class="col-sm-1">是否必须</li>
                                            <li class="col-sm-1">类型</li>
                                            <li class="col-sm-6">描述</li>
                                            <li class="col-sm-2">默认值</li>
                                        </ul>
                                        <request-args-vue
                                                v-bind:request-args.sync="currentApi.requestArgs"
                                                v-bind:editing="editing"></request-args-vue>
                                    </div>
                                </template>
                                <template v-if="currentApi.responseArgs && currentApi.responseArgs.length>0">
                                    <p class="api-details-title">响应数据</p>
                                    <div class="div-table">
                                        <ul class="div-table-header div-table-line cb">
                                            <li class="col-sm-2">参数名称</li>
                                            <li class="col-sm-1">是否必须</li>
                                            <li class="col-sm-9">描述</li>
                                        </ul>
                                        <response-args-vue
                                                v-bind:response-args.sync="currentApi.responseArgs"
                                                v-bind:editing="editing"></response-args-vue>
                                    </div>
                                </template>

                                <template v-if="currentApi.example">
                                    <p class="api-details-title">例子</p>
                                    <div class="api-details-desc api-edit-box">
                                        <pre class="content">{{currentApi.example}}</pre>
                                    </div>
                                </template>
                                <p class="api-details-title">演示</p>
                                <div class="api-details-title second cb">请求地址：{{requestURL}}
                                    <div class="fr">
                                        <label>
                                            <input type="radio" value="product" v-model="flag.env"> 线上环境
                                        </label>
                                        <label>
                                            <input type="radio" value="dev" v-model="flag.env"> 开发环境
                                        </label>
                                    </div>
                                </div>
                                <template v-if="!currentApi.protocol || currentApi.protocol == 'HTTP'">
                                    <template v-if="currentApi.requestHeaders && currentApi.requestHeaders.length>0">
                                        <form class="api-test form" id="header-form">
                                            <p class="api-details-title second">请求头</p>
                                            <div class="item" v-for="item in currentApi.requestHeaders">
                                                <div class="col-sm-2 label">{{item.name}}</div>
                                                <div class="col-sm-8">
                                                    <input type="text" name="{{item.name}}"
                                                           value="{{item.testValue || item.defaultValue}}"
                                                           placeholder="{{item.description}}" class="text">
                                                </div>
                                            </div>
                                        </form>
                                    </template>

                                    <form class="form" id="args-form" v-on:submit.prevent>
                                        <template v-if="currentApi.urlArgs && currentApi.urlArgs.length>0">
                                            <p class="api-details-title second">地址参数</p>
                                            <div class="item" v-for="item in currentApi.urlArgs">
                                                <div class="col-sm-2 label">{{item}}</div>
                                                <div class="col-sm-8">
                                                    <input data-type="text" type="text"
                                                           name="{{item}}" placeholder="替换URL上的参数"
                                                           class="text">
                                                </div>
                                            </div>
                                        </template>
                                        <template v-if="currentApi.requestArgs && currentApi.requestArgs.length>0">
                                            <p class="api-details-title second">请求参数</p>
                                            <div class="item" v-for="item in currentApi.requestArgs">
                                                <div class="col-sm-2 label">{{item.name}}</div>
                                                <div class="col-sm-8" v-bind:class="{'full-text':item.type=='file'}">
                                                    <input data-type="{{item.type}}"
                                                           type="{{item.type=='file'?'file':'text'}}"
                                                           name="{{item.name}}"
                                                           value="{{item.testValue || item.defaultValue}}"
                                                           placeholder="{{item.description}}"
                                                           v-bind:class="{'text':item.type!='file'}">
                                                </div>
                                            </div>
                                        </template>
                                        <template v-if="currentApi.dataType=='RAW'">
                                            <p class="api-details-title second">请求数据</p>
                                            <div class="item">
                                                <div class="col-sm-2 label">body</div>
                                                <div class="col-sm-8">
                                                    <textarea class="text" id="rawBody"></textarea>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-if="currentApi.dataType=='BINARY'">
                                            <p class="api-details-title second">请求数据</p>
                                            <div class="item">
                                                <div class="col-sm-2 label">BINARY</div>
                                                <div class="col-sm-8">
                                                    <input type="file" class="full-text" id="binaryBody">
                                                </div>
                                            </div>
                                        </template>



                                        <div class="form">
                                            <div class="item">
                                                <div class="col-sm-2 label"></div>
                                                <div class="col-sm-8">
                                                    <input type="submit" id="api-submit" v-on:click.stop="apiSubmit"
                                                           class="btn btn-primary" value="{{status.apiLoading?'加载中':'提交'}}">
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <!--<p class="api-details-title">结果数据</p>-->
                                    <div class="api-result-tabs cb" v-show="currentApi.result">
                                        <a class="tab fl active" v-on:click="flag.resultActive='content'" v-bind:class="{'active':(flag.resultActive=='content')}">Body</a>
                                        <a class="tab fl" v-on:click="flag.resultActive='headers'" v-bind:class="{'active':(flag.resultActive=='headers')}">Headers</a>
                                        <a class="tab fr">Time: {{currentApi.resultRunTime}} ms</a>
                                        <a class="tab fr">StatusCode: {{currentApi.resultStatusCode}}</a>
                                    </div>
                                    <div v-show="currentApi.result" class="api-result-box">
                                        <i v-show="!!currentApi.result && (flag.resultActive=='content')" id="api-result-copy" class="iconfont icon-copy"></i>
                                        <i v-show="!!currentApi.result && (flag.resultActive=='headers')" id="api-result-header-copy" class="iconfont icon-copy"></i>
                                        <div id="api-result">
                                            <pre v-show="flag.resultActive=='content'" id="api-result-content">{{{currentApi.result}}}</pre>
                                            <div v-show="flag.resultActive=='headers'" id="api-result-headers">
                                                <div class="api-result-headers-list" v-show="currentApi.resultHeaders">
                                                    {{{currentApi.resultHeaders | html}}}
                                                </div>
                                                <div v-else class="api-result-headers-list">
                                                    <div v-if="extVer>=1.4">
                                                        No header for you
                                                    </div>
                                                    <div v-else>
                                                        请下载或升级浏览器插件。
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ta-c api-plugin-tip" v-if="!extVer">
                                        <i class="iconfont icon-chrome"></i><br/>
                                        <p>由于浏览器有跨域限制，如果您的服务器不支持CORS协议，需要安装我们开发的Chrome插件“小幺鸡”</p>
                                        <p>安装的时候请注意勾选，安装后请刷新页面。</p>
                                        <p>
                                            <a href="https://chrome.google.com/webstore/detail/%E5%B0%8F%E5%B9%BA%E9%B8%A1/omohfhadnbkakganodaofplinheljnbd" target="_blank" class="btn btn-default">Chrome应用商店</a>
                                            <a href="/extension/xiaoyaoji.crx" target="_blank" class="btn btn-default">本地下载</a>
                                            <a href="http://jingyan.baidu.com/article/e5c39bf56286ae39d6603374.html" target="_blank" class="btn btn-default">本地下载安装教程</a>
                                        </p>
                                    </div>
                                    <div v-else>
                                        <div class="ta-c api-plugin-tip" v-if="extVer < 1.3">
                                            <i class="iconfont icon-chrome"></i><br/>
                                            <p>您安装的『小幺鸡』插件版本有更新,为了避免使用出现bug,请下载升级</p>
                                            <p>安装的时候请注意勾选，安装后请刷新页面。</p>
                                            <p>
                                                <a href="https://chrome.google.com/webstore/detail/%E5%B0%8F%E5%B9%BA%E9%B8%A1/omohfhadnbkakganodaofplinheljnbd" target="_blank" class="btn btn-default">Chrome应用商店</a>
                                                <a href="/extension/xiaoyaoji.crx" target="_blank" class="btn btn-default">本地下载</a>
                                                <a href="http://jingyan.baidu.com/article/e5c39bf56286ae39d6603374.html" target="_blank" class="btn btn-default">本地下载安装教程</a>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="currentApi.protocol == 'WEBSOCKET'">
                                    <div class="form">
                                        <div class="item">
                                            <div class="col-sm-2 label">日志</div>
                                            <div class="col-sm-10"><textarea class="text" v-model="ws.log"
                                                                             rows="10"></textarea></div>
                                        </div>
                                        <div class="item">
                                            <div class="col-sm-2 label">地址</div>
                                            <div class="col-sm-10"><input type="text" class="text"
                                                                          value="{{currentModule.host}}{{currentApi.url}}"
                                                                          v-model="ws.url"></div>
                                        </div>

                                        <div class="item" v-if="ws.connected">
                                            <div class="col-sm-2 label">发送消息</div>
                                            <div class="col-sm-10"><input type="text" class="text" v-model="ws.message">
                                            </div>
                                        </div>

                                        <div class="item">
                                            <div class="col-sm-2">&nbsp;</div>
                                            <div class="col-sm-10">
                                                <input type="button" v-if="!ws.connected" v-on:click="wsConnect"
                                                       class="btn btn-primary" value="连接">
                                                <template v-else>
                                                    <input type="button" class="btn btn-primary"
                                                           v-on:click="wsSendMessage" value="发送消息">
                                                    <input type="button" class="btn btn-danger"
                                                           v-on:click="wsDisconnect" value="断开连接">
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="ta-c api-error-tip" v-cloak v-else>
                        <i class="iconfont icon-api" style="font-size: 120px"></i>
                        <p style="font-size: 24px">该模块下接口列表为空</p>
                    </div>
                </div>

            </template>
            <template v-if="error.projectNotExists">
                <div class="ta-c api-error-tip">
                    <i class="iconfont icon-cloud"></i>
                    <p style="font-size: 24px">项目不可见或不存在</p>
                </div>
            </template>
        </div>
    </template>

    <template v-if="status.loading">
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    </template>

</template>


<script>
    import js from '../app/api';
    export default js;
</script>