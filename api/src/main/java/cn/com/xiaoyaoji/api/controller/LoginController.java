package cn.com.xiaoyaoji.api.controller;

import cn.com.xiaoyaoji.api.ex.Result;
import cn.com.xiaoyaoji.api.ex._HashMap;
import cn.com.xiaoyaoji.api.thirdly.Github;
import cn.com.xiaoyaoji.api.utils.MemoryUtils;
import cn.com.xiaoyaoji.api.utils.StringUtils;
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

    @Ignore
    @Post()
    public Object login(Parameter parameter) {
        String email = parameter.getParamString().get("email");
        String password = parameter.getParamString().get("password");
        AssertUtils.notNull(email, "用户名为空");
        AssertUtils.notNull(password, "密码为空");
        password = StringUtils.password(password);
        User user = ServiceFactory.instance().login(email, password);
        AssertUtils.notNull(user, "用户名或密码错误");
        if (user.getStatus().equals(User.Status.INVALID)) {
            return new Result(Result.ERROR, "invalid status");
        }
        // AssertUtils.isTrue(User.Type.ADMIN.equals(user.getType()),"无权访问");
        String token = MemoryUtils.token();
        MemoryUtils.putUser(token, user);
        return new _HashMap<>().add("token", token).add("user", user);
    }

    @Ignore
    @Post("/qq")
    public Object thirdlyQQ(Parameter parameter) {
        String openId = parameter.getParamString().get("openId");
        String accessToken = parameter.getParamString().get("accessToken");
        AssertUtils.notNull(openId, "missing openId");
        AssertUtils.notNull(accessToken, "missing accessToken");
        UserInfo userInfo = new QQ().getUserInfo(openId, accessToken);
        Thirdparty thirdparty = new Thirdparty();
        thirdparty.setId(openId);
        thirdparty.setLogo(userInfo.getFigureurl_qq_2());
        thirdparty.setNickName(userInfo.getNickname());
        thirdparty.setType(Thirdparty.Type.QQ);
        User user = ServiceFactory.instance().loginByThirdparty(thirdparty);
        AssertUtils.notNull(user,"该账户暂未绑定小幺鸡账户,请绑定后使用");
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
        AssertUtils.notNull(accessToken, "missing accessToken");
        cn.com.xiaoyaoji.api.thirdly.weibo.User weiboUser = new Weibo().showUser(accessToken, uid);
        Thirdparty thirdparty = new Thirdparty();
        thirdparty.setId(weiboUser.getId());
        thirdparty.setLogo(weiboUser.getAvatar_large());
        thirdparty.setNickName(weiboUser.getScreen_name());
        thirdparty.setType(Thirdparty.Type.WEIBO);
        User user = ServiceFactory.instance().loginByThirdparty(thirdparty);
        AssertUtils.notNull(user,"该账户暂未绑定小幺鸡账户,请绑定后使用");
        //MemoryUtils.putUser(parameter, user);
        AssertUtils.isTrue(!User.Status.INVALID.equals(user.getStatus()), "invalid status");
        String token = MemoryUtils.token();
        MemoryUtils.putUser(token,user);
        return new _HashMap<>()
                .add("token",token)
                .add("user",user);
    }

    @Ignore
    @Post("/github")
    public Object thirdPartyGithub(Parameter parameter){
        String accessToken = parameter.getParamString().get("accessToken");
        AssertUtils.notNull(accessToken, "missing accessToken");
        Github github = new Github();
        cn.com.xiaoyaoji.api.thirdly.github.User user = github.getUser(accessToken);
        Thirdparty thirdparty = new Thirdparty();
        thirdparty.setId(user.getId());
        thirdparty.setLogo(user.getAvatar_url());
        thirdparty.setNickName(user.getName());
        thirdparty.setType(Thirdparty.Type.WEIBO);
        thirdparty.setEmail(user.getEmail());
        User loginUser = ServiceFactory.instance().loginByThirdparty(thirdparty);
        AssertUtils.notNull(loginUser,"该账户暂未绑定小幺鸡账户,请绑定后使用");
        AssertUtils.isTrue(!User.Status.INVALID.equals(loginUser.getStatus()), "invalid status");
        String token = MemoryUtils.token();
        MemoryUtils.putUser(token,loginUser);
        return new _HashMap<>()
                .add("token",token)
                .add("user",loginUser);
    }



}
