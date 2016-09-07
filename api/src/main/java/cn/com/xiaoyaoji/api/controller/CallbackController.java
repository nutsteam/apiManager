package cn.com.xiaoyaoji.api.controller;

import cn.com.xiaoyaoji.api.annotations.Ignore;
import cn.com.xiaoyaoji.api.ex._HashMap;
import cn.com.xiaoyaoji.api.thirdly.Github;
import cn.com.xiaoyaoji.api.thirdly.QQ;
import cn.com.xiaoyaoji.api.thirdly.Weibo;
import cn.com.xiaoyaoji.api.thirdly.github.User;
import cn.com.xiaoyaoji.api.thirdly.qq.AccessToken;
import cn.com.xiaoyaoji.api.utils.ConfigUtils;
import cn.com.xiaoyaoji.api.view.JspView;
import org.apache.log4j.Logger;
import org.mangoframework.core.annotation.Get;
import org.mangoframework.core.annotation.RequestMapping;
import org.mangoframework.core.dispatcher.Parameter;
import org.mangoframework.core.view.ResultView;

import java.util.HashSet;
import java.util.Set;

/**
 * @author zhoujingjie
 * @date 2016-06-03
 */
@RequestMapping("callback")
public class CallbackController {
    private static Logger logger = Logger.getLogger(CallbackController.class);
    private Set<String> states = new HashSet<String>() {{
        add("login");
        add("relation");
    }};

    @Ignore
    @Get(value = "qq", template = "/third-party")
    public Object qqCallback(Parameter parameter) {
        String code = parameter.getParamString().get("code");
        String state = parameter.getParamString().get("state");
        logger.info("callback qq -> code:"+code+" state:"+state);
        if (states.contains(state)) {
            QQ qq = new QQ();
            AccessToken accessToken = qq.getAccessToken(code, ConfigUtils.getProperty("qq.redirect_uri"));
            String openId = qq.getOpenid(accessToken.getAccess_token());
            return new _HashMap<>()
                    .add("openId", openId)
                    .add("type", "qq")
                    .add("state", state)
                    .add("accessToken", accessToken.getAccess_token());
        }

        return illegalView();
    }

    private ResultView illegalView() {
        JspView view = new JspView("/WEB-INF/jsp", ".jsp");
        view.setTemplate("/illegal");
        view.setData(new _HashMap<>().add("errorMsg", "非法请求"));
        return view;
    }


    @Ignore
    @Get(value = "weibo", template = "/third-party")
    public Object weibo(Parameter parameter) {
        String code = parameter.getParamString().get("code");
        String state = parameter.getParamString().get("state");
        logger.info("callback weibo -> code:"+code+" state:"+state);
        if (states.contains(state)) {
            Weibo weibo = new Weibo();
            cn.com.xiaoyaoji.api.thirdly.weibo.AccessToken accessToken = weibo.getAccessToken(ConfigUtils.getProperty("weibo.appkey"), ConfigUtils.getProperty("weibo.appsecret"), code, ConfigUtils.getProperty("weibo.redirect_uri"));
            return new _HashMap<>()
                    .add("type", "weibo")
                    .add("state", state)
                    .add("accessToken", accessToken.getAccess_token())
                    .add("uid", accessToken.getUid());
        }
        return illegalView();
    }

    @Ignore
    @Get(value = "weibo/cancel")
    public Object weiboCancel(Parameter parameter) {
        logger.info("callback weibo cancel");
        return null;
    }


    @Ignore
    @Get(value = "github", template = "/third-party")
    public Object github(Parameter parameter) {
        String code = parameter.getParamString().get("code");
        String state = parameter.getParamString().get("state");
        logger.info("callback github -> code:"+code+" state:"+state);
        if (states.contains(state)) {
            Github github = new Github();
            cn.com.xiaoyaoji.api.thirdly.AccessToken accessToken = github.getAccessToken(ConfigUtils.getProperty("github.clientid"),ConfigUtils.getProperty("github.secret"),code,ConfigUtils.getProperty("github.redirect_uri"));
            User user = github.getUser(accessToken.getAccess_token());
            return new _HashMap<>()
                    .add("type", "github")
                    .add("gitid",user.getId())
                    .add("state", state)
                    .add("accessToken", accessToken.getAccess_token());
        }
        return illegalView();
    }


}
