package cn.com.xiaoyaoji.api.filter;

import java.lang.reflect.Method;

import org.mangoframework.core.dispatcher.MangoFilter;
import org.mangoframework.core.dispatcher.Parameter;

import cn.com.xiaoyaoji.api.annotations.Ignore;
import cn.com.xiaoyaoji.api.data.bean.User;
import cn.com.xiaoyaoji.api.ex.NotLoginException;
import cn.com.xiaoyaoji.api.utils.MemoryUtils;

/**
 * @author zhoujingjie
 * @date 2016-07-22
 */
public class AuthorityFilter implements MangoFilter {

    @Override
    public boolean doFilter(Parameter parameter, Method method) throws Exception {
        String token = parameter.getParamString().get("token");
        User user = MemoryUtils.getUser(token);
        if (user != null) {
            return true;
        }
        if (method.getAnnotation(Ignore.class) != null) {
            return true;
        }
        if(method.getDeclaringClass().getAnnotation(Ignore.class) != null)
            return true;
        throw new NotLoginException();
    }
}
