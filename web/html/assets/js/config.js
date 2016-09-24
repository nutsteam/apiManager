toastr.options.escapeHtml = true;
toastr.options.closeButton = true;
toastr.options.positionClass = 'toast-top-center';
toastr.options.preventDuplicates=true;
window.root='//www.xiaoyaoji.com.cn/api';
//window.root='//localhost:8888/api';
window.ctx='';
window._xyj_={
    history:false,
    version:'1.5.1',
    ws:'ws://localhost:8888/api'
    //ws:'ws://www.xiaoyaoji.com.cn/api'
};
console.log('version:'+_xyj_.version);