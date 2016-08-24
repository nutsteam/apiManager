package cn.com.xiaoyaoji.api.utils;

import java.io.IOException;
import java.util.Map;

import org.apache.commons.httpclient.*;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;

/**
 * @author zhoujingjie
 * @date 2016-05-13
 */
public class HttpUtils {
    private static Logger log = Logger.getLogger(HttpUtils.class);
    private static HttpClient client;

    static {
        client = new HttpClient();
    }
    public static String get(String url) {
        return get(url,0);
    }

    public static Map<String, Object> getJSON(String url) {
        return JSON.parseObject(get(url), new TypeReference<Map<String, Object>>() {
        });
    }

    public static String get(String url,int deep) {
        GetMethod method = new GetMethod(url);
        try {
            int code = client.executeMethod(method);
            if (code >= 300 && code < 400) {
                Header header = method.getResponseHeader("Location");
                if (header != null && deep<3) {
                    return get(header.getValue(),deep++);
                }
            }
            String charset=method.getResponseCharSet();
            if(charset == null){
                charset="UTF-8";
            }
            return IOUtils.toString(method.getResponseBodyAsStream(),charset);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static String post(String url,RequestEntity entity){
        return post(url, entity,null,0);
    }
    public static String post(String url, NameValuePair[] nameValuePairs){
        return post(url,null, nameValuePairs,0);
    }

    public static String post(String url,RequestEntity entity,NameValuePair[] requestBody,int deep){
        PostMethod method = new PostMethod(url);
        try {
            //String host=method.getURI().getHost();
            if(entity!=null) {
                method.setRequestEntity(entity);
            }
            if(requestBody!=null){
                method.setRequestBody(requestBody);
            }
            int code = client.executeMethod(method);
            if (code >= 300 && code < 400) {
                Header header = method.getResponseHeader("Location");
                if (header != null && deep<3) {
                    return post(url, entity,requestBody, deep++);
                }
            }
            String charset=method.getResponseCharSet();
            if(charset == null){
                charset="UTF-8";
            }
            return IOUtils.toString(method.getResponseBodyAsStream(),charset);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


}
