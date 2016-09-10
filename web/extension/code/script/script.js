var evt = document.createEvent('CustomEvent');
evt.initEvent('resultChange', true, false);
evt.initEvent('apiSubmit', true, false);
evt.initEvent('result.success',true,false);
evt.initEvent('result.error',true,false);
evt.initEvent('result.complete',true,false);

document.addEventListener('request', function (e) {

    var params = e.detail;
    if(params.processData==false){
        if(params.contentType=='application/octet-stream'){
            //means binary
            var file=$(params.data)[0];
            if(file){
                params.data=file.files[0];
            }else{
                params.data='';
            }
        }else if(params.contentType == false){
            //means form data
            var fd = new FormData();
            var args=params.data;
            for(var name in params.data){
                var value = args[name];
                if(value == undefined)
                    continue;
                if(value instanceof Array){
                    value.forEach(function(item){
                        fd.append(name,item);
                    })
                }else{
                    fd.append(name,args[name]);
                }
            }
            params.data=fd;
        }else if(params.contentType == 'text/plain'){
            //mean raw
        }
    }
    params.success = function(rs){
        if(!rs){
            rs = '';
        }
        if(rs instanceof XMLDocument){
            rs = new XMLSerializer().serializeToString(rs);
        }
        document.dispatchEvent(new CustomEvent('result.success',{detail:rs}));
    };
    params.error = function(rs){
        document.dispatchEvent(new CustomEvent('result.error',{detail:rs}));
    };
    params.complete = function(xhr,type){
        var useTime = Date.now() - xhr.beginTime;
        document.dispatchEvent(new CustomEvent('result.complete',{detail:{
            type:type,
            text:(xhr.responseText || xhr.statusText),
            headers:xhr.getAllResponseHeaders(),
            readyState:xhr.readyState,
            responseText:xhr.responseText,
            status:xhr.status,
            statusText:xhr.statusText,
            useTime:useTime
        }}));
    };
    params.beforeSend = function (xhr) {
        xhr.beginTime= Date.now();
    };
    $.ajax(params);
    return false;
});