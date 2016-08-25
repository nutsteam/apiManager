if(navigator.appVersion.indexOf("MSIE")!=-1){     //yeah, he's using IE
    var v = navigator.appVersion.match(/MSIE\s*(\d+)/)[1];
    v = parseInt(v);
    if(v<9){
        location.href='unsupport.html';
    }
}