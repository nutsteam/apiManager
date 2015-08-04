# api接口管理页面
    author：zhoujingjie leunpha@gmail.com

## 文件说明
* api.json api接口的json文件
* index.html 主页
* 预览该文件需要放到本地服务器中或者使用ie9以上浏览器打开
* 该系统不兼容ie8及以下浏览器

### api.json 格式说明
    [
        {
            "name":"接口名称",
            "method":"接口方法: get,post,head,put,delete...",
            "category":"接口分类:用户,系统...",
            "url":"接口地址： /api.json",
            "desc":"接口说明",
            "target":"form表单目标，默认空，如果是上传文件则需要设置成_blank或者其他",
            "args":[
                {
                    "name":"参数名称",
                    "required":"是否必须 true/false",
                    "defaultValue":"默认值",
                    "desc":"参数描述",
                    "type":"参数类型，默认text，如果上传文件则设置成file"
                },{...}
            ],
            "returnValues":[
                {
                    "name":"返回值名称",
                    "desc":"返回值描述",
                    "sub":[
                        {
                            "name":"codeToken",
                            "desc":"验证码token"
                        },{....}
                    ]
                },
                {
                    "name":"返回值名称",
                    "desc":"返回值描述",
                    "sub":{
                        "key" :[],
                        "key":{}
                    }
                },
                {
                    "name":"返回的json数据名称",
                    "desc":"数据描述"
               }
            ]
        }
    ]
returnValues中，如果有子元素。则放置在sub 中
![输入图片说明](http://git.oschina.net/uploads/images/2015/0804/113732_78af25bd_91198.png "在这里输入图片标题")
![输入图片说明](http://git.oschina.net/uploads/images/2015/0804/113749_001e8648_91198.png "在这里输入图片标题")