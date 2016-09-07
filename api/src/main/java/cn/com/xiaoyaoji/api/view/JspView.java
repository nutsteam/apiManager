package cn.com.xiaoyaoji.api.view;

import java.net.URLEncoder;

import cn.com.xiaoyaoji.api.ex.NotLoginException;
import cn.com.xiaoyaoji.api.utils.ConfigUtils;
import org.mangoframework.core.dispatcher.Parameter;

/**
 * @author zhoujingjie
 * @date 2016-06-07
 */
public class JspView extends org.mangoframework.core.view.JspView {
    public JspView(String prefix, String suffix) {
        super(prefix, suffix);
    }

    @Override
    public void handleException(Parameter parameter, Throwable throwable) throws Exception {
        if(throwable instanceof NotLoginException){
            String loginUrl = ConfigUtils.getProperty("login.url");
            if(loginUrl == null){
                loginUrl = parameter.getContextPath();
            }
            parameter.getResponse().sendRedirect(loginUrl);
        }else {
            super.handleException(parameter, throwable);
        }
    }
}
