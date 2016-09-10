(function () {
    function go() {
        var s = location.search;
        if (s) {
            var m = s.match('refer=(.*)&?');
            if (m && m.length == 2) {
                location.href = decodeURIComponent(m[1]);
            }
        }
    }
    var isUnSupportPage=location.pathname=='/unsupport.html';
    if (navigator.appVersion.indexOf("MSIE") != -1) {
        var v = navigator.appVersion.match(/MSIE\s*(\d+)/)[1];
        v = parseInt(v);
        if(v>=9){
            if(isUnSupportPage){
                go()
            }
        }else{
            if(!isUnSupportPage){
                location.href='/unsupport';
            }
        }
    } else {
        if(isUnSupportPage){
            go();
        }
    }
})();
