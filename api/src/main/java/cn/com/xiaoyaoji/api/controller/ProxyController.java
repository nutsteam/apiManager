package cn.com.xiaoyaoji.api.controller;

import cn.com.xiaoyaoji.api.utils.HttpUtils;
import org.apache.commons.httpclient.NameValuePair;
import org.mangoframework.core.annotation.*;
import org.mangoframework.core.dispatcher.Parameter;

import java.util.ArrayList;
import java.util.List;

/**
 * @author zhoujingjie
 * @date 2016-07-18
 */
@RequestMapping("/proxy")
public class ProxyController {

    @Get
    public Object get(Parameter parameter){
        String url= parameter.getParamString().get("url");
        return HttpUtils.get(url);
    }

    @Post
    public Object post(Parameter parameter){
        String url= parameter.getParamString().get("url");
        List<NameValuePair> nvp = new ArrayList<>();
        return HttpUtils.post(url,nvp.toArray(new NameValuePair[nvp.size()]));
    }

}
