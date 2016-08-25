# 小幺鸡接口管理页面
   author：zhoujingjie cn_bboy@163.com
   ![LOGO](http://www.xiaoyaoji.com.cn/assets/img/logo/full.png)
## 特点
   * 在线接口测试 目前支持 json,text,html,xml,jsonp,Websocket
   * 可视化编辑
   
   
## [在线demo](http://www.xiaoyaoji.com.cn/) （推荐使用在线系统）
	
## 文件夹说明
* web 文件夹是前端静态页面 基于nodejs，webpack gulp，vuejs,jqueryjs开发完成
* api 文件夹是项目API包，使用java开发，运行在tomcat7.x以上版本。

## 兼容性
* 静态页系统暂时只兼容chrome，其他浏览器未测试。
* 后端：jdk1.7 tomcat7  mysql5.5


## 使用说明
### API
 * api.war修改为api.zip 用压缩软件打开并且解压放在tomcat webapps目录下 需要修改tomcat默认端口，防止与静态页面的端口冲突
 * 修改WEB-INF/classes/config.properties 中的数据库配置信息，
    * 如果要启用QQ，微博登陆，需要配置QQ和微博开发者信息
    * 需要修改sql连接地址与账户密码
    * 如果需要发邮件则需要配置邮件服务器地址
    * config.properties未单独做中文编码处理，为防止乱码，中文需要改为unicode
 * 导入sql/sql.sql 文件到mysql中，
 * 启动tomcat，浏览器运行 http://localhost:端口/api/index.html 能正常显示Hello XiaoYaoJi API 则表示可用。
 
### WEB
 * 开发版
    * npm install 下载项目依赖包 
    * webpack --watch 编译并且监听文件改动
    * webpack-dev-server 运行项目 
    * 浏览器访问http://localhost:8080/html/
    * 修改html/assets/js/config.js配置
        * window.root : 接口地址
        * window.ctx : 静态页面相对路径
 * 已编译版本
    * 复制dist目录下的已编译代码到 tomcat /webapps/ROOT 下，
    * 修改html/assets/js/config.js配置
    * 浏览器访问http://localhost:tomcat端口/

### 效果
![基本](img/basic.png)
![基本](img/third1.png)
![基本](img/third2.png)
![基本](img/ws.png)
