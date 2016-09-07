package cn.com.xiaoyaoji.api.controller;

import cn.com.xiaoyaoji.api.annotations.Ignore;
import org.mangoframework.core.annotation.Get;
import org.mangoframework.core.annotation.RequestMapping;
import org.mangoframework.core.dispatcher.Parameter;
import org.mangoframework.core.view.RedirectView;

/**
 * @author zhoujingjie
 * @date 2016-07-21
 */
@RequestMapping("/")
public class IndexController {
    @Ignore
    @Get(value = "/login", template = "/login")
    public Object login() {
        return "login";
    }

    @Ignore
    @Get(value = "/register", template = "/register")
    public Object register() {
        return "register";
    }


    @Get("/logout")
    public RedirectView logout(Parameter parameter) {
        parameter.getRequest().getSession().invalidate();
        return new RedirectView("/");
    }

    @Ignore
    @Get(value = "/about", template = "/about")
    public Object about() {
        return null;
    }
}
