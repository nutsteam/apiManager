package cn.com.xiaoyaoji.api.controller;

import cn.com.xiaoyaoji.api.annotations.Ignore;
import cn.com.xiaoyaoji.api.ex._HashMap;
import org.apache.commons.io.IOUtils;
import org.mangoframework.core.annotation.Post;
import org.mangoframework.core.annotation.RequestMapping;
import org.mangoframework.core.dispatcher.Parameter;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * @author: zhoujingjie
 * @Date: 16/8/27
 */
@Ignore
@RequestMapping("/test")
public class TestController {

    @Post("/raw")
    public Object testRaw(Parameter parameter) throws IOException {
        Enumeration<String> names = parameter.getRequest().getHeaderNames();
        Map<String,String> headerMap = new HashMap<>();
        while (names!=null && names.hasMoreElements()){
            String name = names.nextElement();
            String value = parameter.getRequest().getHeader(name);
            headerMap.put(name,value);
        }
        String encoding=parameter.getRequest().getCharacterEncoding();
        if(encoding == null){
            encoding = "UTF-8";
        }
        String raw = IOUtils.toString(parameter.getRequest().getInputStream(),encoding);
        return new _HashMap<>()
                .add("headers",headerMap)
                .add("raw",raw);
    }

}
