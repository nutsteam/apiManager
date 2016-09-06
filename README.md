# 小幺鸡接口管理页面
   ![LOGO](http://www.xiaoyaoji.com.cn/assets/img/logo/full.png)

### 特点
   * 在线接口测试 目前支持 json,text,html,xml,jsonp,Websocket
   * markdown编辑器

### [在线demo](http://www.xiaoyaoji.com.cn/) （推荐使用在线系统）
	
## 文件夹说明
* web 文件夹是前端静态页面 基于nodejs，webpack gulp，vuejs,jqueryjs开发完成
* api 使用java开发，运行在tomcat7.x以上版本。maven，druid，mariadb

## 兼容性
* 静态页系统暂时只兼容chrome，其他浏览器未测试。
* 后端：jdk1.7 tomcat7  mariadb5.5


## 使用说明
### 文件夹说明
 api : 接口
 web : 静态页面
    - extension:浏览器扩展
    - config.js 一些页面配置
    - gulp.js   gulp构建器
    - html 网页源码
    - package.json 
    - webpack.config.js webpack配置

### API
 * api.zip 用压缩软件打开并且解压放在tomcat webapps目录下 需要修改tomcat默认端口，防止与静态页面的端口冲突
 * 修改WEB-INF/classes/config.properties 中的数据库配置信息，
    * 如果要启用QQ，微博登陆，需要配置QQ和微博开发者信息
    * 需要修改sql连接地址与账户密码
    * 如果需要发邮件则需要配置邮件服务器地址
    * config.properties未单独做中文编码处理，为防止乱码，中文需要改为unicode
 * 导入sql/xiaoyaoji.sql 文件导入到mysql中，
 * 启动tomcat，浏览器运行 http://localhost:端口/api/index.html 能正常显示Hello XiaoYaoJi API 则表示可用。
 
#### API 依赖jar  org.mangoframework.core 1.2.3
     项目及使用说明都在这：http://git.oschina.net/zhoujingjie/mangoframework
     或者直接下载附件中的jar
### WEB
  * npm install 下载项目依赖包 
  * npm run build 编译并且监听文件改动
  * npm run build 运行项目 
  * 编译代码 npm run dist;
  * 发布 gulp;
  * 浏览器访问http://localhost:8080/html/
  * 修改html/assets/js/config.js配置
      * window.root : 接口地址
      * window.ctx : 静态页面相对路径
  * 构建发布版：gulp;
  * 发布后 dist目录就是编译后的静态页面

#### web 直接使用编译好的版本
    * 复制dist到本地服务器中根目录，修改 /assets/js/config.js 里面的window.root的地址为你部署api后的访问地址

### 效果
![基本](img/basic.png)
![基本](img/third1.png)
![基本](img/third2.png)
![基本](img/ws.png)
    