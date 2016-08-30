package cn.com.xiaoyaoji.api.controller;

import cn.com.xiaoyaoji.api.ex._HashMap;
import cn.com.xiaoyaoji.api.utils.MemoryUtils;
import org.mangoframework.core.annotation.Get;
import org.mangoframework.core.annotation.Post;
import org.mangoframework.core.annotation.RequestMapping;
import org.mangoframework.core.dispatcher.Parameter;

import cn.com.xiaoyaoji.api.annotations.Ignore;
import cn.com.xiaoyaoji.api.data.bean.Thirdparty;
import cn.com.xiaoyaoji.api.data.bean.User;
import cn.com.xiaoyaoji.api.service.ServiceFactory;
import cn.com.xiaoyaoji.api.thirdly.QQ;
import cn.com.xiaoyaoji.api.thirdly.Weibo;
import cn.com.xiaoyaoji.api.thirdly.qq.UserInfo;
import cn.com.xiaoyaoji.api.utils.AssertUtils;
import org.mangoframework.core.view.RedirectView;

/**
 * @author zhoujingjie
 * @date 2016-06-03
 */
@RequestMapping("/login")
public class LoginController {

    /*  @Ignore
    @Get("/qq")
    public RedirectView qq(Parameter parameter) throws QQConnectException {
        String redirectURL = new Oauth().getAuthorizeURL(parameter.getRequest());
        String referer = parameter.getRequest().getHeader("Referer");
        if(referer != null) {
            parameter.getRequest().getSession().setAttribute("referer", referer);
        }
        return new RedirectView(redirectURL);
    }*/

    /* @Get("/weibo")
    public RedirectView weibo(Parameter parameter) throws WeiboException {
        String referer = parameter.getRequest().getHeader("Referer");
        if(referer != null) {
            parameter.getRequest().getSession().setAttribute("referer", referer);
        }
        return new RedirectView(new weibo4j.Oauth().authorize("code"));
    }
    
    */

    /**
     * 登录
     * @param parameter
     * @return
     */
    /*   @Ignore
    @Get("/thirdly")
    public RedirectView login(Parameter parameter) {
        HttpSession session = parameter.getRequest().getSession();
        String openid = parameter.getParamString().get("openid");
        String type = parameter.getParamString().get("type");
    
        Thirdparty thirdparty = new Thirdparty();
        thirdparty.setId(openid);
        User user = null;
        if ("qq".equals(type)) {
            UserInfo qzoneUserInfo = new UserInfo((String) session.getAttribute("qq_access_token"), openid);
            UserInfoBean userInfoBean = qzoneUserInfo.getUserInfo();
            thirdparty.setLogo(userInfoBean.getAvatar().getAvatarURL100());
            thirdparty.setNickName(userInfoBean.getNickname());
            user = ServiceFactory.instance().loginByThirdparty(thirdparty);
            UserUtils.setUser(parameter, user);
            */
    /*String referer = (String)parameter.getRequest().getSession().getAttribute("referer");
    if(referer != null) {
      parameter.getRequest().getSession().setAttribute("referer",null);
      return new RedirectView(referer);
    }*//*
       String redirectURL = parameter.getRequest().getContextPath() + "/";
       return new RedirectView(redirectURL);
       }
       return null;
       }*/

    @Ignore
    @Post("/qq")
    public Object thirdlyQQ(Parameter parameter) {
        String openId = parameter.getParamString().get("openId");
        String accessToken = parameter.getParamString().get("accessToken");
        AssertUtils.notNull(openId, "missing openId");
        AssertUtils.notNull(accessToken, "missing openId");
        UserInfo userInfo = new QQ().getUserInfo(openId, accessToken);
        Thirdparty thirdparty = new Thirdparty();
        thirdparty.setId(openId);
        thirdparty.setLogo(userInfo.getFigureurl_qq_2());
        thirdparty.setNickName(userInfo.getNickname());
        thirdparty.setType(Thirdparty.Type.QQ);
        User user = ServiceFactory.instance().loginByThirdparty(thirdparty);
        //MemoryUtils.putUser(parameter, user);
        AssertUtils.isTrue(!User.Status.INVALID.equals(user.getStatus()), "invalid status");
        String token = MemoryUtils.token();
        MemoryUtils.putUser(token,user);
        return new _HashMap<>()
                .add("token",token)
                .add("user",user);
    }

    @Ignore
    @Post("/weibo")
    public Object thirdlyWeibo(Parameter parameter) {
        String uid = parameter.getParamString().get("uid");
        String accessToken = parameter.getParamString().get("accessToken");
        AssertUtils.notNull(uid, "missing uid");
        AssertUtils.notNull(accessToken, "missing openId");
        cn.com.xiaoyaoji.api.thirdly.weibo.User weiboUser = new Weibo().showUser(accessToken, uid);
        Thirdparty thirdparty = new Thirdparty();
        thirdparty.setId(weiboUser.getId());
        thirdparty.setLogo(weiboUser.getAvatar_large());
        thirdparty.setNickName(weiboUser.getScreen_name());
        thirdparty.setType(Thirdparty.Type.WEIBO);
        User user = ServiceFactory.instance().loginByThirdparty(thirdparty);
        //MemoryUtils.putUser(parameter, user);
        AssertUtils.isTrue(!User.Status.INVALID.equals(user.getStatus()), "invalid status");
        String token = MemoryUtils.token();
        MemoryUtils.putUser(token,user);
        return new _HashMap<>()
                .add("token",token)
                .add("user",user);
    }



}
