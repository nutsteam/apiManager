package cn.com.xiaoyaoji.api.controller;

import java.util.Date;
import java.util.List;

import cn.com.xiaoyaoji.api.data.bean.Thirdparty;
import cn.com.xiaoyaoji.api.thirdly.QQ;
import org.mangoframework.core.annotation.Get;
import org.mangoframework.core.annotation.Post;
import org.mangoframework.core.annotation.RequestMapping;
import org.mangoframework.core.annotation.RequestParam;
import org.mangoframework.core.dispatcher.Parameter;

import cn.com.xiaoyaoji.api.annotations.Ignore;
import cn.com.xiaoyaoji.api.data.DataFactory;
import cn.com.xiaoyaoji.api.data.bean.FindPassword;
import cn.com.xiaoyaoji.api.data.bean.User;
import cn.com.xiaoyaoji.api.ex.Message;
import cn.com.xiaoyaoji.api.ex.Result;
import cn.com.xiaoyaoji.api.ex._HashMap;
import cn.com.xiaoyaoji.api.service.ServiceFactory;
import cn.com.xiaoyaoji.api.utils.*;
import org.mangoframework.core.exception.InvalidArgumentException;

/**
 * @author zhoujingjie
 * @date 2016-05-31
 */
@RequestMapping("/user")
public class UserController {



    /**
     * 修改
     * @param id
     * @param parameter
     * @return
     */
    @Post("{id}")
    public Object update(@RequestParam("id") String id, Parameter parameter) {
        User temp = MemoryUtils.getUser(parameter);
        AssertUtils.isTrue(id.equals(temp.getId()), "无操作权限");
        User user = BeanUtils.convert(User.class, parameter.getParamString());
        user.setPassword(null);
        user.setCreatetime(null);
        user.setId(id);
        user.setAvatar(null);
        int rs = ServiceFactory.instance().update(user);
        AssertUtils.isTrue(rs > 0, "操作失败");
        return rs;
    }

    @Ignore
    @Post("register")
    public Object create(Parameter parameter) {
        AssertUtils.notNull(parameter, "email", "password", "nickname");
        User user = BeanUtils.convert(User.class, parameter.getParamString());
        // 去空格
        /*user.setNickname(user.getNickname().trim());*/
        user.setEmail(user.getEmail().trim());
        AssertUtils.isTrue(StringUtils.isEmail(user.getEmail()), "请输入有效的邮箱");
        // 检查账号是否已存在
        AssertUtils.isTrue(!ServiceFactory.instance().checkEmailExists(user.getEmail()), Message.EMAIL_EXISTS);
        user.setPassword(StringUtils.password(user.getPassword()));
        user.setType(User.Type.USER);
        user.setCreatetime(new Date());
        user.setId(StringUtils.id());
        user.setStatus(User.Status.PENDING);
        int rs = ServiceFactory.instance().create(user);
        AssertUtils.isTrue(rs > 0, Message.OPER_ERR);
        String token = MemoryUtils.token();
        user.setPassword(null);
        MemoryUtils.putUser(token, user);
        return new _HashMap<>().add("token", token).add("user", user);
    }

    @Get("search")
    public Object search(Parameter parameter) {
        String key = parameter.getParamString().get("key");
        if (key == null || key.trim().length() == 0)
            return null;
        User currentUser = MemoryUtils.getUser(parameter);
        List<User> users = ServiceFactory.instance().searchUsers(key, currentUser.getId());
        return new _HashMap<>().add("users", users);
    }

    @Get("project_users")
    public Object getAllProjectUsers(Parameter parameter) {
        String token = parameter.getParamString().get("token");
        User user = MemoryUtils.getUser(token);
        List<User> users = ServiceFactory.instance().getAllProjectUsersByUserId(user.getId());
        return new _HashMap<>().add("users", users).add("fileAccess", ConfigUtils.getFileAccessURL());
    }

    /**
     * 找回密码1
     *
     * @param parameter
     * @return
     */
    @Ignore
    @Post("findpassword")
    public Object findPassword(Parameter parameter) {
        String email = parameter.getParamString().get("email");
        AssertUtils.notNull(email, "邮箱为空");
        AssertUtils.isTrue(StringUtils.isEmail(email), "邮箱格式错误");
        AssertUtils.isTrue(ServiceFactory.instance().checkEmailExists(email), "邮箱不存在");
        FindPassword fp = new FindPassword();
        fp.setIsUsed(0);
        fp.setEmail(email);
        fp.setCreateTime(new Date());
        fp.setId(StringUtils.id());
        int rs = DataFactory.instance().insert(fp);
        AssertUtils.isTrue(rs > 0, "操作失败");
        MailUtils.findPassword(fp.getId(), email);
        return rs;
    }

    /**
     * 修改密码
     * @param parameter
     * @return
     */
    @Post("password")
    public Object updatePassword(Parameter parameter) {
        User user = MemoryUtils.getUser(parameter);
        User temp = new User();
        temp.setId(user.getId());
        String password = parameter.getParamString().get("password");
        temp.setPassword(StringUtils.password(password));
        int rs = ServiceFactory.instance().update(temp);
        AssertUtils.isTrue(rs > 0, "操作失败");
        return rs;
    }

    /**
     * 找回密码2
     *
     * @param parameter
     * @return
     */
    @Ignore
    @Post("newpassword")
    public Object newPassword(Parameter parameter) {
        String email = parameter.getParamString().get("email");
        String id = parameter.getParamString().get("id");
        String password = parameter.getParamString().get("password");
        AssertUtils.notNull(email, "邮箱为空");
        AssertUtils.notNull(id, "无效请求");
        AssertUtils.notNull(password, "密码为空");
        AssertUtils.isTrue(StringUtils.isEmail(email), "邮箱格式错误");
        int rs = ServiceFactory.instance().findPassword(id, email, password);
        AssertUtils.isTrue(rs > 0, "操作失败");
        return 1;
    }

    /**
     * 发送邮箱验证码
     *
     * @param parameter
     * @return
     */
    @Ignore
    @Post("email/captcha")
    public Object sendEmailCaptcha(Parameter parameter) {
        String code = StringUtils.code();
        String email = parameter.getParamString().get("email");
        AssertUtils.notNull(email, "邮箱为空");
        AssertUtils.isTrue(StringUtils.isEmail(email), "邮箱格式错误");
        MailUtils.sendCaptcha(code, email);
        MemoryUtils.put(parameter.getParamString().get("token"), "emailCaptcha", code);
        return true;
    }

    /**
     * 新邮件
     *
     * @param parameter
     * @return
     */
    @Post("email/new")
    public Object newEmail(Parameter parameter) {
        String code = parameter.getParamString().get("code");
        AssertUtils.notNull(code, "验证码为空");
        String email = parameter.getParamString().get("email");
        AssertUtils.notNull(email, "邮箱为空");
        AssertUtils.isTrue(StringUtils.isEmail(email), "邮箱格式错误");
        String token = parameter.getParamString().get("token");
        String captcha = (String) MemoryUtils.get(token, "emailCaptcha");
        AssertUtils.isTrue(code.equals(captcha), "验证码错误");
        // 检查邮箱是否存在
        AssertUtils.isTrue(!ServiceFactory.instance().checkEmailExists(email), "该邮箱已存在");
        User user = MemoryUtils.getUser(parameter);
        User temp = new User();
        temp.setId(user.getId());
        temp.setEmail(email);
        int rs = ServiceFactory.instance().update(temp);
        AssertUtils.isTrue(rs > 0, "操作失败");
        MemoryUtils.put(token, "emailCaptcha", "");
        return rs;
    }

    /**
     * 绑定第三方
     * @param parameter
     * @return
     */
    @Post("bind")
    public Object bind(Parameter parameter){
        AssertUtils.notNull(parameter,"type","accessToken");
        String type = parameter.getParamString().get("type");
        String accessToken = parameter.getParamString().get("accessToken");
        User user = MemoryUtils.getUser(parameter);
        Thirdparty thirdparty = new Thirdparty();
        thirdparty.setUserId(user.getId());
        switch (type){
            case "qq":
                String openId = parameter.getParamString().get("openId");
                AssertUtils.notNull(openId,"missing openId");
                thirdparty.setId(openId);
                thirdparty.setType(Thirdparty.Type.QQ);
                break;
            case "weibo":
                String uid = parameter.getParamString().get("uid");
                AssertUtils.notNull(uid,"missing uid");
                thirdparty.setId(uid);
                thirdparty.setType(Thirdparty.Type.WEIBO);
                break;
            case "github":
                String gitid = parameter.getParamString().get("gitid");
                AssertUtils.notNull(gitid,"missing gitid");
                thirdparty.setId(gitid);
                thirdparty.setType(Thirdparty.Type.GITHUB);
                break;
            default:
                throw new InvalidArgumentException("invalid type ");
        }
        int rs = ServiceFactory.instance().bindUserWithThirdParty(thirdparty);
        AssertUtils.isTrue(rs>0,"操作失败");
        switch (type){
            case "qq":
                user.setBindQQ(true);
                break;
            case "weibo":
                user.setBindWeibo(true);
                break;
            case "github":
                user.setBindGithub(true);
                break;
        }
        return new _HashMap<>()
                .add("user",user)
                ;
    }

    @Post("unbind/{type}")
    public Object unbind(Parameter parameter,@RequestParam("type")String type){
        User user = MemoryUtils.getUser(parameter);
        int rs = ServiceFactory.instance().unbindUserThirdPartyRelation(user.getId(),type);
        AssertUtils.isTrue(rs>0,"操作失败");
        switch (type.toLowerCase()){
            case "qq":
                user.setBindQQ(false);
                break;
            case "weibo":
                user.setBindWeibo(false);
                break;
            case "github":
                user.setBindGithub(false);
                break;
        }
        return new _HashMap<>()
                .add("user",user)
                ;
    }
}
