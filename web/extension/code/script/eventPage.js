chrome.browserAction.onClicked.addListener(function(tab) {
   window.open('http://www.xiaoyaoji.com.cn/?f=chromeapp');
});

/*
chrome.runtime.onMessage.addListener(function(params,o,fn){
    $.ajax(params);
    fn.call('success')
	console.log(arguments);
});*/
