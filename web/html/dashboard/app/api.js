import RequestHeadersVue from "../vue/api-editor-request-headers.vue";
import RequestArgsVue from "../vue/api-editor-request-args.vue";
import ResponseArgsVue from "../vue/api-editor-response-args.vue";
import utils from "../../src/utils";

import '../../assets/jsonformat/jsonFormater.js'
import '../../assets/jsonformat/jsonFormater.css'



RequestHeadersVue.name = 'request-headers-vue';
RequestHeadersVue.props = ['requestHeaders','editing'];

RequestArgsVue.name = 'request-args-vue';
RequestArgsVue.props = ['requestArgs','editing'];

ResponseArgsVue.name = 'response-args-vue';
ResponseArgsVue.props = ['responseArgs','editing'];
//

var gdata={
    status:{
        folderModal:false,
        moduleModal:false,
        importModal:false,
        loading:true,
        apiLoading:false,
        moveCopyModal:false,
        moveCopyId:''
    },
    ws:{
        instance:null,
        connected:false,
        message:'',
        log:'',
        url:'',
        destroy(){
            if(this.instance){
                this.instance.close();
                this.connected = false;
                this.log='';
                this.url='';
                this.message = '';
            }
        }
    },
    flag:{
        "import":null,
        "actionId":null,
        move:null,
        moveCopyName:null,
        moveCopySelectModuleId:null,
        moveCopySelectFolderId:null,
        moveCopyId:null,
        hostBefore:''
    },
    error:{
        projectNotExists:false,
        noModule:false,
        noInterface:false
    },
    importValue:null,
    editing:true,
    folderName:'',
    moduleName:'',
    showGuide:true,
    modules:[],
    currentApi:{result:null},
    currentModule:{},
    currentFolder:null,
    id:'',
    extVer:false,
    collapse:false,
    results:{}
};
export default{
    components:{
        RequestHeadersVue:RequestHeadersVue,
        RequestArgsVue:RequestArgsVue,
        ResponseArgsVue:ResponseArgsVue
    },
    created:function(){
        $("body").removeClass('loading');
    },
    route:{
        data:function(transition){
            this.$parent.$data.pageName='接口列表';
            this.id = transition.to.params.id;
            var self =this;
            //如果实时会出现获取不到的问题
            setTimeout(function(){
                self.extVer=document.body.getAttribute("data-ext-version");
                if(self.extVer){
                    self.extVer = parseFloat(self.extVer);
                }
                console.log('extVer:'+self.extVer);
            },1000);
            document.addEventListener('result.success', function(e) {
                new Result().resolve(e.detail,self.currentApi.contentType);
            });
            document.addEventListener('result.complete', function(e) {
                self.status.apiLoading = false;
                if(e.detail.type !='success'){
                    self.currentApi.result = '<div class="db-api-error">'+e.detail.text+'</div>';
                }
            });
            document.addEventListener('result.error', function(e) {
                // do whatever is necessary
                console.log("result.error");
            });

            //
            $(document).click(function(){
                self.flag.actionId = null;
            });
        },
        activate:function(transition){
            this.$parent.showProject =true;
            $('.dashboard').addClass('max');
            transition.next();

        },
        deactivate:function(){
            this.$parent.showProject =false;
            $('.dashboard').removeClass('max')
        }
    },
    watch:{
      "status.folderModal":function(value){
          if(!value){
              var self = this;
            setTimeout(function(){
                self.$data.currentFolder = null;
            },100)
          }

          if(value){
              $("body").addClass("modal-open");
          }else{
              $("body").removeClass("modal-open");
          }
      },
        "status.moduleModal":function(value){
          if(!value){
              var self = this;
            setTimeout(function(){
                self.$data.moduleId='';
                self.$data.moduleName='';
            },100)
          }

            if(value){
                $("body").addClass("modal-open");
            }else{
                $("body").removeClass("modal-open");
            }
      },
        "status.importModal":function(value){
            if(value){
                $("body").addClass("modal-open");
            }else{
                $("body").removeClass("modal-open");
            }
        },
        "id":function (value) {
            if(window._czc){
                _czc.push(["_trackPageview",location.pathname+(location.hash),document.referrer]);
            }
            this.$parent.projectId=value;

            var self = this;
            self.editing = (this.$route.query.n=='y');
            reget(self);
        },
        "status.loading":function(value){
            if(!value){
                document.title=this.currentModule.name || '';
                if(window.editor && window.editor){
                    window.editor.editor.remove();
                    window.editor = null;
                }
                var value = this.currentModule.description;
                if(this.editing){
                    initEditor(value,self);
                }
                renderViewBox(value);
            }

        },
        "editing":function(value){
            if(value){
                if(!window.editor){
                    var desc=this.currentModule.description;
                    initEditor(desc,this);
                }
            }else{
                renderViewBox(this.currentModule.description);
            }
        },
        "currentApi.result":function(value){
            if(this.currentApi.id){
                this.results[this.currentApi.id]=value;
            }
        }
    },
    data:function(){
        return gdata;
    },
    methods:{
        apiDescClick:function(){
            this.showGuide=true;
            this.currentFolder={children:[]};
            this.currentApi={};
            this.ws.destroy();
        },
        folderNew:function(event){
            this.status.folderModal= true;
            this.currentFolder = null;
            this.folderName = '';
            event.stopPropagation();
            focusFolderName();
        },
        folderEdit:function(item,event){
            this.status.folderModal = true;
            this.currentFolder = item;
            this.folderName = item.name;

            event.stopPropagation();
        },
        folderSave:function(){
            this.$validate(true);
            if(this.$ff.invalid){
                return false;
            }
            if(!this.folderName){
                toastr.error('文件夹名称为空');
                return false;
            }
            var name = this.folderName;
            var self = this;
            if(this.$data.currentFolder){
                var id = self.currentFolder.id;
                utils.post('/interfacefolder/'+this.currentFolder.id+".json",{name:name},function(rs){
                    if(rs.code == 0){
                        self.currentModule.folders.forEach(function(item){
                            if(item.id==id){
                                item.name = name;
                            }
                        });
                    }
                });
            }else{
                utils.post('/interfacefolder.json',{moduleId:self.currentModule.id,projectId:self.currentModule.projectId,name:name},function(rs){
                    if(rs.code == 0){
                        self.currentModule.folders.push({
                            name:name,id:rs.data,children:[]});
                    }
                });
            }
            gdata.status.folderModal= false;
            //this.currentFolder=null;
            this.folderName=null;
        },
        folderDelete:function(item,event){
            var self =this;
            utils.delete('/interfacefolder/'+item.id+".json",function(rs){
                self.$data.currentModule.folders.$remove(item);
            });
            event.stopPropagation();
        },
        folderNewApi:function(item,event){
            event.stopPropagation();
            this.flag.actionId=null;
            this.showGuide = false;
            this.currentApi = {
                protocol:'HTTP',
                requestMethod:'GET',
                dataType:'X-WWW-FORM-URLENCODED',
                contentType:'JSON',
                requestHeaders:[],
                requestArgs:[],
                responseArgs:[],
                result:''
            };
            this.currentFolder = item;
            if(document.documentElement.scrollTop>100){
                document.documentElement.scrollTop=110;
            }
        },
        folderClick:function(event){
            var $dom =$(event.currentTarget);
            $dom.toggleClass("open");
            $dom.next().slideToggle()
        },
        apiClick:function(item,folder){
            this.currentFolder = folder;
            this.showGuide = false;
            this.currentApi = item;
            if(!item.requestArgs){
                item.requestArgs = []
            }
            if(!item.requestHeaders){
                item.requestHeaders = []
            }
            if(!item.responseArgs){
                item.responseArgs = []
            }
            if(item.requestArgs.constructor.name =='String'){
                item.requestArgs = JSON.parse(gdata.currentApi.requestArgs);
            }
            if(item.responseArgs.constructor.name =='String'){
                item.responseArgs = JSON.parse(gdata.currentApi.responseArgs);
            }
            if(item.requestHeaders.constructor.name =='String'){
                item.requestHeaders = JSON.parse(gdata.currentApi.requestHeaders);
            }
            item.result=this.results[item.id] || '';

            initDefaultData(item.requestHeaders);
            initDefaultData(item.requestArgs);
            initDefaultData(item.responseArgs);
            //从地址上获取
            item.urlArgs= [];
            var match =(this.currentModule.host+this.currentApi.url).match(/(\{[a-zA-Z0-9_]+\})/g);
            if(match!=null && match.length>0){
                item.urlArgs = match;
                item.urlArgs=item.urlArgs.map(function(d){
                    return d.substring(1,d.length-1);
                });
            }
            this.currentApi = Object.assign({},item,item);
            if(document.documentElement.scrollTop>100){
                document.documentElement.scrollTop=110;
            }
        },
        apiDelete:function(item,arr,event){
            event.stopPropagation();
            utils.delete('/interface/'+item.id+".json",function(rs){
                arr.$remove(item);
            });
        },
        apiSave:function(){
            var data = this.currentApi;//$.extend({},this.currentApi);
            if(!data.id){
                data.moduleId = this.currentModule.id;
                data.projectId = this.currentModule.projectId;
                data.folderId = this.currentFolder.id;
            }
            var temp = $.extend({},data);
            temp.urlArgs=undefined;
            temp.requestArgs = JSON.stringify(temp.requestArgs);
            temp.responseArgs = JSON.stringify(temp.responseArgs);
            temp.requestHeaders = JSON.stringify(temp.requestHeaders);
            var self = this;
            utils.post('/interface/save.json',temp,function(rs){
                toastr.success('保存成功','',{timeOut:2000,"positionClass": "toast-top-right"});
                if(data.id){
                    var index = -1;
                    self.currentFolder.children.forEach(function(item,i){
                        if(item.id == data.id){
                            index = i;
                            return true;
                        }
                    });
                    if(index!=-1){
                        self.currentFolder.children.$set(index,data);
                    }
                }else{
                    data.id=rs.data;
                    self.currentFolder.children.push(data);
                }
            });
        },
        apiSubmit:function(){
            var self = this;
            var url = (this.currentModule.host || '') + this.currentApi.url;
            var args = getRequestArgs();
            //替换id
            if(this.currentApi.urlArgs!=null && this.currentApi.urlArgs.length>0){
                this.currentApi.urlArgs.forEach(function(item){
                    url= url.replace(new RegExp('{'+item+'}'),args[item]);
                    delete args[item];
                });
            }
            //如果是图片或二进制
            if(self.currentApi.contentType == "IMAGE" || self.currentApi.contentType == 'BINARY'){
                var params='';
                for(var p in args){
                    params += (p+'='+args[p]+'&');
                }
                window.open(url+'?'+params);
                var params=undefined;
                return true;
            }

            //获取rest地址url参数
            this.currentApi.urlArgs= [];
            var match =(this.currentModule.host+this.currentApi.url).match(/(\{[a-zA-Z0-9_]+\})/g);
            if(match!=null && match.length>0){
                this.currentApi.urlArgs = match;
                this.currentApi.urlArgs=this.currentApi.urlArgs.map(function(d){
                    return d.substring(1,d.length-1);
                });
            }

            var headers = getRequestHeaders();


            var params ={
                url: url ,
                cache:false,
                headers:headers,
                type:self.currentApi.requestMethod,
                data:args,
                dataType:self.currentApi.contentType,
                jsonpCallback:self.currentApi.contentType=='JSONP'?'callback':undefined,
                complete(xhr,type){
                    self.status.apiLoading = false;
                    if(type !='success'){
                        var msg=(xhr.responseText || xhr.statusText);
                        if(type == 'error'){
                            msg= ('status:'+xhr.status +' readyState:'+xhr.readyState +'  errorText:'+ msg);
                        }
                        self.currentApi.result = '<div class="db-api-error">'+msg+'</div>';
                    }
                },
                success(rs){
                    new Result().resolve(rs,self.currentApi.contentType);
                    //self.result = rs;
                },
                error(){
                    console.log(arguments)
                }
            };
            switch (this.currentApi.dataType){
                case "FORM-DATA":
                    params.contentType=false;
                    params.processData=false;
                    break;
                case "RAW":
                    params.data=$('#rawBody').val() || '';
                    params.processData=false;
                    params.contentType='text/plain';
                    break;
                case "BINARY":
                    params.processData = false;
                    params.contentType='application/octet-stream';
                    params.data=$('#binaryBody')[0];
                default:
                      break;
            }
            self.status.apiLoading = true;
            // chrome 插件中jsonp 会出问题
            if(this.extVer && self.currentApi.contentType!='JSONP'){
                delete params['complete'];
                delete params['success'];
                delete params['error'];
                if(this.currentApi.contentType == 'BINARY'){
                    params.data='#binaryBody';
                }
                var ce = new CustomEvent('request',{
                    detail:params
                });
                document.dispatchEvent(ce);
            }else{
                $._ajax_(params);
            }
        },
        moduleDelete:function(item){
            if(!confirm('是否确认删除?')){
                return false;
            }
            this.modules.$remove(item);
            if(this.modules.length > 0){
                this.currentModule = this.modules[0];
                utils.delete('/module/'+item.id+'.json')
            }else{
                this.error.noModule = true;
            }
        },
        moduleEdit:function(item){
            this.status.moduleModal = true;
            this.moduleName = item.name;
            this.moduleId = item.id;
            focusModuleName();
        },
        moduleNew:function () {
            this.status.moduleModal = true;
            focusModuleName();
            this.moduleName = '';
        },
        moduleClick:function(item){
            if(!item.folders){
                item.folders = [];
            }
            this.currentModule = item;
            this.currentApi = {};
            this.showGuide = true;
            if(window.editor && this.editing){
                if(!item.description){
                    item.description= item.name;
                }
                window.editor.setMarkdown(item.description);
            }
            if(!this.editing){
                renderViewBox(this.currentModule.description);
            }
        },
        moduleHostChange:function(){
            if(this.currentModule.host != this.flag.hostBefore){
                saveModule({host:this.currentModule.host});
            }
        },
        moduleSave:function(){
            this.$validate(true);
            if(this.$mf.invalid){
                return false;
            }
            if(!this.moduleName){
                toastr.error('模块名称为空');
                return false;
            }
            var self = this;
            if(this.moduleId){
                var moduleId = self.moduleId;
                var name = self.moduleName;
                utils.post('/module/'+moduleId+".json",{name:name},function(rs){
                    if(rs.code == 0){
                        self.modules.forEach(function(item){
                            if(item.id == moduleId){
                                item.name = name;
                            }
                        });
                    }
                });
            }else{
                var moduleName = this.moduleName;
                utils.post('/module.json',{projectId:self.id ,name:moduleName},function(rs){
                    if(rs.code == 0){
                        gdata.modules.push({name:moduleName,projectId:self.currentModule.projectId,id:rs.data,folders:[]})
                    }
                });
            }
            gdata.status.moduleModal= false;
            this.moduleName='';
            this.moduleId='';
        },
        insertNewResponseArgsRow:function(){
            gdata.currentApi.responseArgs.push({require:"true",children:[],type:'string'});
        },
        insertNewRequestHeadersRow:function(){
            gdata.currentApi.requestHeaders.push({require:'true',children:[]});
        },
        insertNewRequestArgsRow:function(){
            gdata.currentApi.requestArgs.push({require:"false",children:[],type:'string'});
        },
        import2RequestArgs(){
            this.status.importModal=true;
            this.flag.import="requestArgs";
        },
        import2RequestHeaders(){
            this.status.importModal=true;
            this.flag.import="requestHeaders";
        },
        import2ResponseArgs(){
            this.status.importModal=true;
            this.flag.import="responseArgs";
        },
        importOk(){
            this.$validate(true);
            if (this.$if.invalid) {
                return false;
            }
            if(!this.importValue){
                toastr.error('导入内容为空');
                return false;
            }
            var data = null;
            try {
                data = utils.toJSON(this.importValue)
            }catch (e){
                alert('JSON格式有误');
                return;
            }
            var temp=[];
            parseImportData(data, temp);
            var self= this;
            temp.forEach(function(d){
                if(self.flag.import == 'requestArgs'){
                    self.currentApi.requestArgs.push(d);
                }else if(self.flag.import == 'requestHeaders'){
                    self.currentApi.requestHeaders.push(d);
                }else if(self.flag.import == 'responseArgs'){
                    self.currentApi.responseArgs.push(d);
                }
            }) ;
            this.status.importModal=false
        },
        wsConnect(){
            var url = this.ws.url;
            var ws = new WebSocket(url);
            this.ws.instance= ws;
            var self = this;
            ws.onopen = function (evt) {
                self.ws.log = 'connected';
                self.ws.connected = true;
            };
            ws.onclose = function (evt) {
                self.ws.log += '\nonClose!';
                self.ws.connected = false;
            };
            ws.onmessage = function (evt) {
                self.ws.log += '\nonMessage:'+evt.data;
            };
            ws.onerror = function (evt) {
                self.ws.log += '\nonError:'+(evt.data || '');
            };
        },
        wsDisconnect(){
            this.ws.instance.close()
        },
        wsSendMessage(){
            this.ws.instance.send(this.ws.message);
            this.ws.log += '\n sent message:'+this.ws.message;
        },
        listItemCopy:function(type,id,move){
            if(type =='api'){
                this.flag.moveCopyName='接口';
            }else if(type =='folder'){
                this.flag.moveCopyName='分类';
            }
            this.flag.move=(move=='move');
            this.status.moveCopyModal=true;
            this.flag.moveCopyId = id;
        },
        copyMoveOk:function(){
            if(this.flag.move){
                if(this.flag.moveCopyName=='分类'){
                    if(this.flag.moveCopySelectModuleId == this.currentModule.id){
                        toastr.error('同一模块无须移动');
                        return false;
                    }else{
                        copyMove({type:'folder',action:'move',moduleId:this.flag.moveCopySelectModuleId});
                    }
                }else{
                    copyMove({type:'api',action:'move',moduleId:this.flag.moveCopySelectModuleId,folderId:this.flag.moveCopySelectFolderId});
                }
            }else{
                 //copy
                if(this.flag.moveCopyName=='分类'){
                    copyMove({type:'folder',action:'copy',moduleId:this.flag.moveCopySelectModuleId});
                }else{
                    copyMove({type:'api',action:'copy',moduleId:this.flag.moveCopySelectModuleId,folderId:this.flag.moveCopySelectFolderId});
                }
            }
        }
    }
}

function initDefaultData(arr){
    arr.forEach(function(d){
        d.children = d.children || [];
        initDefaultData(d.children)
    });
}

function focusFolderName(){
    setTimeout(function(){
        $("#folderName").focus();
    },100)
}
function focusModuleName(){
    setTimeout(function(){
        $("#moduleName").focus();
    },100)
}

/**
 * 获取数组类型
 * @param value
 * @returns {string}
 */
function getArrayValueType(value){
    var type='array';
    if(value.length>0){
        var name = value[0].constructor.name;
        if(name =='Array'){
            type='array[array]';
        }else if(name =='Object'){
            type = 'array[object]';
        }else if(name =='String'){
            type = 'array[string]'
        }else if(name=='Number'){
            type = 'array[number]'
        }else if(name =='Boolean'){
            type = 'array[boolean]'
        }
    }
    return type;
}
/**
 * 解析导入数据
 * @param data
 * @param temp
 */
function parseImportData(data, temp) {
    if (data.constructor.name == 'Array') {
        var fullObj = {};
        data.forEach(function (d) {
            if(d.constructor.name =='Object'){
                for(var key in d){
                    fullObj[key] = d[key];
                }
            }else if(d.constructor.name =='Array'){
                parseImportData(d,temp);
            }
        });
        parseImportData(fullObj,temp);
    } else if (data.constructor.name == 'Object') {
        for (var key in data) {
            var v = data[key];
            if (v != undefined) {
                var t={children:[]};
                t.name = key;
                if (v.constructor.name == 'Object') {
                    t.type='object';
                    parseImportData(v, t.children);
                } else if (v.constructor.name == 'Array') {
                    t.type=getArrayValueType(v);
                    if(t.type=='array[object]') {
                        parseImportData(v, t.children);
                    }else if(t.type =='array[array]'){
                        parseImportData(v[0], t.children);
                    }
                } else if (v.constructor.name == 'String') {
                    t.type = 'string'
                } else if (v.constructor.name == 'Number') {
                    t.type = 'number'
                } else if (v.constructor.name == 'Boolean') {
                    t.type = 'boolean'
                }
                t.require='false';
                temp.push(t);
            }
        }
    }
}

function Result(){
    var jf = new JsonFormater({
        dom:'#api-result',
        imgCollapsed:'../assets/jsonformat/images/Collapsed.gif',
        imgExpanded:'../assets/jsonformat/images/Expanded.gif'
    });
    var fn={
        JSON(data){
            gdata.currentApi.result = jf.doFormat(data);
        },
        JSONP(data){
            gdata.currentApi.result = jf.doFormat(data);
        },
        TEXT(data){
            gdata.currentApi.result=data;
        },
        XML(data){
            if(data instanceof XMLDocument){
                data = new XMLSerializer().serializeToString(data)
            }
            gdata.currentApi.result=utils.escape(data);
        },
        HTML(){
            gdata.currentApi.result=data;
        }
    };

    return {
        resolve:function(data,type){
            fn[type](data);
        }
    }
}

function getRequestArgs(){
    var args ={};
    $("#args-form input").each(function(){
        var type = this.type;
        var name = this.name;
        if(args[name]){
            var temp = args[name];
            if(temp.constructor.name!='Array'){
                args[name] = [];
                args[name].push(temp);
            }
            if(type=='file'){
                args[name].push(this.files[0])
            }else{
                args[name].push(this.value);
            }
        }else{
            if(type == 'file'){
                args[name] = this.files[0];
            }else{
                args[name] = this.value;
            }
        }
    });
    return args;
}
function getRequestHeaders(){
       var headers={};
    $("#header-form input").each(function(){
        headers[$(this).attr("name")] = $(this).val();
    });
    headers['Power-By']='http://www.xiaoyaoji.com.cn';
    return headers;
}

function initEditor(value,vueInstance){
    window.editor = editormd("editorBox", {
        width: 1060,
        height: 740,
        path : '../assets/editor.md/lib/',
        theme : "default",
        previewTheme : "default",
        editorTheme : "mdn-like",
        markdown : value,
        codeFold : true,
        //syncScrolling : false,
        toolbarIcons:function () {
             return [
                "undo", "redo", "|",
                "bold", "del", "italic", "quote","|",
                "h1", "h2", "h3", "h4", "h5", "h6", "|",
                "list-ul", "list-ol", "hr", "|",
                "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "watch", "preview", "fullscreen", "clear", "search", "|",
                "help", "info"
            ]
        },
        saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
        searchReplace : true,
        //watch : false,                // 关闭实时预览
        htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
        //toolbar  : false,             //关闭工具栏
        //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
        emoji : false,
        taskList : false,
        tocm : true,         // Using [TOCM]
        tex : false,                   // 开启科学公式TeX语言支持，默认关闭
        flowChart : false,             // 开启流程图支持，默认关闭
        toolbarAutoFixed:false,
        sequenceDiagram : false,       // 开启时序/序列图支持，默认关闭,
        dialogLockScreen : true,   // 设置弹出层对话框不锁屏，全局通用，默认为true
        dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
        dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
        //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
        //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
        //暂时关闭图片上传
        imageUpload : false,
        imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageUploadURL : "./php/upload.php",
        onload : function() {
            this.gotoLine(1);
            var delay=null;
            this.on('change',function() {
                console.log(1111)
                window.clearTimeout(delay);
                var self=this;
                var value = self.getMarkdown();
                var description = vueInstance.currentModule.description;
                var id = vueInstance.currentModule.id;
                if(value != description){
                    vueInstance.currentModule.description = value;
                    delay = setTimeout(function(){
                        saveModule({description: value,id:id});
                    },1500);
                }

            });
        }
    });
}

function renderViewBox(value){
    $('#view-box').html('');
    editormd.markdownToHTML('view-box',{
        htmlDecode      : "style,script,iframe",  // you can filter tags decode
        markdown:value,
        emoji           : true,
        taskList        : false,
        tex             : false,  // 默认不解析
        flowChart       : false,  // 默认不解析
        sequenceDiagram : false  // 默认不解析
    });
}

function saveModule(data){
    var id = data.id || gdata.currentModule.id;
    data.id = undefined;
    utils.post('/module/'+id+'.json',data,function(){
        toastr.success('保存成功','',{timeOut:2000,"positionClass": "toast-top-right"});
    });
}

function copyMove(data){
    data.targetId=gdata.flag.moveCopyId;
    gdata.status.moveCopyModal=false;
    utils.post('/project/'+gdata.id+'/copymove.json',data,function(){
        toastr.success('操作成功','',{timeOut:2000,"positionClass": "toast-top-right"});
        //location.reload();
        reget();
    });
}

function reget(self){
    self.status.loading=true;
    self.error.projectNotExists=false;
    self.error.noModule=false;
    self.error.noInterface=false;
    self.currentApi={result:null};
    utils.get('/project/'+self.$parent.projectId+'.json',{},function(rs){
        if(rs.code == 0 ){
            if(!rs.data.project){
                self.error.projectNotExists = true;
                return;
            }
            if(rs.data.modules.length>0){
                gdata.modules = rs.data.modules;
                gdata.currentModule =gdata.modules[0];
            }
        }
    },function(){
        self.status.loading=false;
    });
}