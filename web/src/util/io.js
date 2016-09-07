import token from './token'
import {objectToFormdata} from './fun'

export class IO{
    constructor({url}){
        this.url = url;
        this.data = {};
    }
    
    get(data, callback, errorCallback){
        if(typeof data == 'function'){
            callback = data;
            errorCallback = callback;
        }else{
            this.data = data;
        }
        
        this.request('GET', callback, errorCallback);
    }
    
    post(data, callback, errorCallback){
        if(typeof data == 'function'){
            callback = data;
            errorCallback = callback;
        }else{
            this.data = data;
        }
        
        this.request('POST', callback, errorCallback);
    }
    
    put(data, callback, errorCallback){
        if(typeof data == 'function'){
            callback = data;
            errorCallback = callback;
        }else{
            this.data = data;
        }
        
        this.request('PUT', callback, errorCallback);
    }
    
    delete(callback,errorCallback){
        this.request('DELETE', callback, errorCallback);
    }
    
    request(type, callback, errorCallback){
        console.log(token.getToken())
        
        if(type === 'DELETE'){
            if(this.url.indexOf('?') > 0){
                this.url += '&token='+token.getToken()
            }else{
                this.url += '?token='+token.getToken()
            }
        }else{
            this.data.token = token.getToken()
        }
        
        $.ajax({
            url: this.url,
            data: this.data,
            type: type,
            success: (res)=>{
                console.log(res);
                if(callback){
                    callback(res);
                }
            },
            error:()=>{
                if(errorCallback){
                    errorCallback('服务器无法响应');
                }
            }
        });
    }
    
    advancePost(data, callback, errorCallback){
        if(typeof data == 'function'){
            callback = data;
            errorCallback = callback;
        }else{
            this.data = data;
        }
        
        this.data.token = token.getToken()
        
        $.ajax({
            url: this.url,
            data: objectToFormdata(this.data),
            type: 'POST',
            dataType: 'json',
            processData : false,
            contentType : false,
            success: (res)=>{
                console.log(res);
                if(callback){
                    callback(res);
                }
            },
            error:()=>{
                if(errorCallback){
                    errorCallback('服务器无法响应');
                }
            }
        });
    }
}