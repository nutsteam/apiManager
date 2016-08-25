import './vue.ex'
var utils={
    config:{
        root:window.root,
        ctx:window.ctx
    },
    push:function(data,item){
        if(data === undefined){
            data = [];
        }
        data.push(item);
    },
    token:function(token){
        if(token){
            localStorage.setItem("token",token);
        }else{
            return localStorage.getItem("token") || '';
        }
    },
    user:function(user){
        if(user){
            localStorage.setItem("user",JSON.stringify(user));
        }else{
            var user =localStorage.getItem("user");
            if(user){
                return JSON.parse(user);
            }
            return {};
        }
    },
    logout:function(){
        localStorage.setItem("token","");
        localStorage.setItem("user","");
        location.href=utils.config.ctx+"/";
    },
    toJSON:function(data){
        if(data === undefined)
            return data;
        if(data.constructor.name =='String'){
            data=data.replace(/\s/g,'');
            return JSON.parse(data);
        }
        return data;
    },
    ajax:function(params){
        var url = this.config.root+params.url;
        if(url.indexOf("?")!=-1){
            url +='&token='+this.token();
        }else{
            url+='?token='+this.token();
        }
        params.url = url;
        $.ajax(params);
    },
    get:function(url,params,success,complete){
        this.ajax({
            url:url,
            data:params,
            type:'get',
            dataType:'json',
            success:success,
            complete:complete
        });
    },
    post:function(url,params,success,error){
        this.ajax({
            url:url,
            data:params,
            type:'post',
            dataType:'json',
            success:success,
            error:error
        });
    },
    "delete":function(url,success,error){
        this.ajax({
            url:url,
            type:'delete',
            success:success,
            error:error
        })
    },
    escape:function(str){
        return str.replace(/\</g,'&lt;')
            .replace(/\>/g,'&gt;')
            .replace(/\"/g,"&quot;")
            .replace(/\'/g,"&apos;")

    },
     getQueryParams(qs) {
        qs = qs.split('+').join(' ');
        var params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;
        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    }
};
$._ajax_=$.ajax;
$.ajax = function(params){
    //Pace.restart();
    var complete = params.complete;
    var success = params.success;
    params.complete = function(xhr,result){
        if(result == 'error'){
            if(xhr.readyState == XMLHttpRequest.UNSENT){
                toastr.error('网络错误');
            }else{
                console.log(arguments)
            }
        }
        if(complete){
            complete.apply(this,arguments);
        }
    };
    params.success =function(rs){
        if(rs.code == 0){
            if(success){
                success.apply(this,arguments);
            }
        }else if(rs.code == -2){
            if(location.href.indexOf('/project/demo') != -1)
                return false;
            location.href=utils.config.ctx+'/login.html?status=expired&refer='+encodeURIComponent(location.href);
        }else{
            toastr.error(rs.errorMsg);
        }
    };
    $._ajax_(params);
};

export default utils;