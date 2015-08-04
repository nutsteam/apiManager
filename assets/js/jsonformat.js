/**
 * 格式化json
 * @returns {JSONFormat}
 * @constructor
 */
var JSONFormat = function(){

    function tab(n){
        var _n='';
        for(var i=0;i<n*4;i++){
            _n += '&nbsp;';
        }
        return _n;
    }

    var _parse = function(html,obj,depth,isValue){
        depth = depth || 0;
        depth++;
        var _tab = tab(isValue?0:depth);
        if(obj instanceof Array){
            html += _tab+'[<span class="icon ex"></span><span class=depth_'+depth+'><br/>';
            for(var i in obj){
                html = _parse(html,obj[i],depth);
            }
            html += tab(depth)+'</span>],<br/>';
        }else if(obj instanceof Object){
            html += _tab+'{<span class="icon ex"></span><span class="depth_'+depth+'"><br/>';
            for(var item in obj){
                html += tab(depth+1)+'"'+item.replace(/\s/g,'')+'":';
                html = _parse(html,obj[item],depth,true);
            }
            html += tab(depth)+'</span>},<br/>';
        }else if(typeof obj == "string"){
            html += _tab+'"'+obj+'\",<br/>';
        }else if(typeof obj == "number"){
            html += _tab+obj+',<br/>';
        }else if(typeof obj =="boolean"){
            html += _tab+obj+',<br/>'
        }
        return html;
    };
    this.parse = function(obj){
        var str = _parse('',obj);
        str = str.replace(/,([<br/>]*[&nbsp;]*[</span>]*[}|\]])/g,'$1')
            .replace(/,([<br/>]*[&nbsp;]*[</span>]*$)/g,'$1');
        return str;
    };

    return this;
};