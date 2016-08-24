import RequestHeadersVue from "../vue/api-editor-request-headers.vue";
import RequestArgsVue from "../vue/api-editor-request-args.vue";
import ResponseArgsVue from "../vue/api-editor-response-args.vue";
import utils from "../../src/utils";
window.UEDITOR_CONFIG.UEDITOR_HOME_URL=utils.config.ctx+'/assets/ueditor/';
window.UEDITOR_CONFIG.serverUrl='';
import '../../assets/ueditor/ueditor.config.js'
import '../../assets/ueditor/ueditor.all.min.js'
import '../../assets/ueditor/lang/zh-cn/zh-cn.js'
/*import '../../assets/ueditor/themes/default/css/umeditor.min.css'*/
var ue = null;
import '../../assets/jsonformat/jsonFormater.js'
import '../../assets/jsonformat/jsonFormater.css'


function saveModule(data){
    utils.post('/module/'+gdata.currentModule.id+'.json',data);
}

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
        loading:true
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
        "import":null
    },
    error:{
        projectNotExists:false,
        noModule:false,
        noInterface:false
    },
    importValue:null,
    editing:false,
    folderName:'',
    moduleName:'',
    showGuide:true,
    modules:[],
    currentApi:{result:null},
    currentModule:{},
    currentFolder:null,
    id:'',
    extVer:false
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
            //console.log('data',transition)
            this.$parent.$data.pageName='接口列表';
            this.id = transition.to.params.id;
            var self =this;
            self.extVer=document.body.getAttribute("data-ext-version");
            document.addEventListener('result.success', function(e) {
                new Result().resolve(e.detail,self.currentApi.contentType);
            });
            document.addEventListener('result.complete', function(e) {
                if(e.detail.type !='success'){
                    self.currentApi.result = '<div class="db-api-error">'+e.detail.text+'</div>';
                }
            });
            document.addEventListener('result.error', function(e) {
                // do whatever is necessary
                console.log(arguments);
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
            if(window.MtaH5){
                MtaH5.clickStat('api',{id:value})
            }
            this.$parent.projectId=value;

            var self = this;
            self.status.loading=true;
            self.error.projectNotExists=false;
            self.error.noModule=false;
            self.error.noInterface=false;
            self.editing = false;
            utils.get('/project/'+value+'.json',{},function(rs){
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
        },
        "currentModule.description":function(value){
            if(this.editing) {
                setTimeout(function () {
                    ue.setContent(value || "");
                }, 100)
            }
        },
        "status.loading":function(value){
            if(!value){
                if(ue){
                    ue.destroy();
                }
                ue=UE.getEditor('myEditor');
                ue.addListener("blur",function(){
                    var content = ue.getContent();
                    gdata.currentModule.description = content;
                    saveModule({description:content});
                });
                var value = this.currentModule.description;
                setTimeout(function () {
                    ue.setContent(value || "");
                }, 100)
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
            this.currentFolder=null;
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
            this.showGuide = false;
            this.currentApi = {
                protocol:'HTTP',
                requestMethod:'GET',
                dataType:'X-WWW-FORM-URLENCODED',
                contentType:'JSON',
                requestHeaders:[],
                requestArgs:[],
                responseArgs:[]
            };
            this.currentFolder = item;
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
            item.result='';

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
            var headers = {};
            $("#header-form input").each(function(){
                headers[$(this).attr("name")] = $(this).val();
            });
            var args = {};
            $("#args-form input").each(function(){
                var type = this.type;
                var name = this.name;
                if(args[name]){
                    var temp = args[name];
                    if(temp.constructor.name!='Array'){
                        args[name] = [];
                        args[name].push(temp);
                    }
                    args[name].push(this.files[0])
                }else{
                    if(type == 'file'){
                        args[name] = this.files[0];
                    }else{
                        args[name] = this.value;
                    }
                }
            });
            var url = (this.currentModule.host || '') + this.currentApi.url;
            var self = this;
            if(self.currentApi.contentType == "IMAGE" || self.currentApi.contentType == 'BINARY'){
                window.open(url);
                return true;
            }

            //替换id
            if(this.currentApi.urlArgs!=null && this.currentApi.urlArgs.length>0){
                this.currentApi.urlArgs.forEach(function(item){
                    url= url.replace(new RegExp('{'+item+'}'),args[item]);
                    delete args[item];
                });
            }
            var params ={
                url: url ,
                headers:headers,
                data:args,
                dataType:self.currentApi.contentType,
                jsonpCallback:self.currentApi.contentType=='JSONP'?'callback':undefined,
                complete(xhr,type){
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
            if(this.extVer){
                delete params['complete'];
                delete params['success'];
                delete params['error'];
                var ce = new CustomEvent('request',{
                    detail:params
                });
                document.dispatchEvent(ce);
            }else{
                $._ajax_(params);
            }
        },
        moduleDelete:function(item){
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
        },
        moduleHostChange:function(){
            saveModule({host:this.currentModule.host});
        },
        moduleSave:function(){
            this.$validate(true);
            if(this.$mf.invalid){
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
            gdata.currentApi.responseArgs.push({require:"false",children:[],type:'string'});
        },
        insertNewRequestHeadersRow:function(){
            gdata.currentApi.requestHeaders.push({require:'false',children:[]});
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
            if(data.constructor.name=='XMLDocument'){
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