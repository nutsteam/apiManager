package cn.com.xiaoyaoji.api.controller;

import org.mangoframework.core.annotation.RequestMapping;

/**
 * @author zhoujingjie
 * @date 2016-06-03
 */
@RequestMapping("callback")
public class CallbackController {
    /*
    @Ignore
    @Get("qq")
    public Object qqCallback(Parameter parameter) throws QQConnectException, IOException {
        HttpServletRequest request = parameter.getRequest();
        //PrintWriter out = parameter.getResponse().getWriter();
        AccessToken accessTokenObj = (new Oauth()).getAccessTokenByRequest(request);
    
        String accessToken = null, openID = null;
        long tokenExpireIn = 0L;
    
        if (accessTokenObj.getAccessToken().equals("")) {
            // 我们的网站被CSRF攻击了或者用户取消了授权
            // 做一些数据统计工作
            System.out.print("没有获取到响应参数");
            return new StringView("invalid code");
        } else {
            accessToken = accessTokenObj.getAccessToken();
            tokenExpireIn = accessTokenObj.getExpireIn();
    
            request.getSession().setAttribute("qq_access_token", accessToken);
            request.getSession().setAttribute("qq_token_expirein", String.valueOf(tokenExpireIn));
    
            // 利用获取到的accessToken 去获取当前用的openid -------- start
            OpenID openIDObj = new OpenID(accessToken);
            openID = openIDObj.getUserOpenID();
            return new RedirectView(request.getContextPath() + "/login/thirdly?type=qq&openid=" + openID);
        }
    }*/

    /*
    @Ignore
    @Get("weibo")
    public RedirectView weibo(Parameter parameter) throws WeiboException {
        String code = parameter.getParamString().get("code");
        AssertUtils.notNull(code,"无效请求");
        weibo4j.Oauth oauth = new weibo4j.Oauth();
        weibo4j.http.AccessToken accessToken = oauth.getAccessTokenByCode(code);
        String token = accessToken.getAccessToken();
        Users users = new Users(token);
        User user= users.showUserById(accessToken.getUid());
        Thirdparty thirdparty = new Thirdparty();
        thirdparty.setId(user.getId());
        thirdparty.setNickName(user.getName());
        thirdparty.setLogo(user.getAvatarLarge());
        org.xiqiguguai.service.data.bean.User myUser = ServiceFactory.instance().loginByThirdparty(thirdparty);
        UserUtils.setUser(parameter,myUser);
        String referer = (String)parameter.getRequest().getSession().getAttribute("referer");
        if(referer != null) {
            parameter.getRequest().getSession().setAttribute("referer",null);
            return new RedirectView(referer);
        }
        String redirectURL = parameter.getRequest().getContextPath()+"/";
        return new RedirectView(redirectURL);
    }
    */

}
