# 小幺鸡接口管理页面
   author：zhoujingjie cn_bboy@163.com
   ![LOGO](http://www.xiaoyaoji.com.cn/assets/img/logo/full.png)
## 特点
   * 在线接口测试 目前支持 json,text,html,xml,jsonp,Websocket
   * 可视化编辑
   
   
## [在线demo](http://www.xiaoyaoji.com.cn/) （推荐使用在线系统）
	
## 文件夹说明
* web 文件夹是前端静态页面 基于nodejs，webpack gulp
* api 文件夹是后台代码；基于mybatis+mysql+ [mangoframework](https://github.com/zhoujingjie/mangoframework)
    * mangoframework 类似于springMVC的web框架 文档信息还在编写中

## 兼容性
* 静态页系统暂时只兼容chrome，其他浏览器未测试。
* 后端：jdk1.7 tomcat7  mysql5.5


## 使用说明
### API
 * 修改src/main/resource/config.properties 中的数据库配置信息，如果要启用QQ登陆，需要配置qq信息
 * 导入sql/sql.sql 文件到mysql中，
 
### WEB
 * 修改web/html/assets/js/config.js 中的配置信息
    * window.root ：api接口地址
    * window.ctx : 文件夹相对路径
 * 运行: 打开web目录
    * dos: webpack --watch
    * dos: webpack-dev-server
    * 然后浏览器访问http://localhost:8080

 * 如果想要直接使用则 拷贝dist目录下到服务器根目录下即可。 （同样需要修改assets/js/config.js ）


### 效果
![基本](img/basic.png)
![基本](img/third1.png)
![基本](img/third2.png)
![基本](img/ws.png)
