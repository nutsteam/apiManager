package cn.com.xiaoyaoji.api.utils;

import cn.com.xiaoyaoji.api.ex.MyPostMethod;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.util.Map;

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
        return get(url, 0,null);
    }

    public static Map<String, Object> getJSON(String url) {
        return JSON.parseObject(get(url), new TypeReference<Map<String, Object>>() {
        });
    }
    public static String get(String url,Header... headers){
        return get(url,0,headers);
    }
    public static String get(String url, int deep,Header... headers) {
        GetMethod method = new GetMethod(url);
        try {
            if(headers!= null && headers.length>0) {
                for(Header header:headers) {
                    method.setRequestHeader(header);
                }
            }
            int code = client.executeMethod(method);
            if (code >= 300 && code < 400) {
                Header header = method.getResponseHeader("Location");
                if (header != null && deep < 3) {
                    return get(header.getValue(), deep++);
                }
            }
            String charset = method.getResponseCharSet();
            if (charset == null) {
                charset = "UTF-8";
            }
            return IOUtils.toString(method.getResponseBodyAsStream(), charset);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static String post(String url, RequestEntity entity) {
        return post(url, entity, null, 0,null);
    }

    public static String post(String url, NameValuePair[] nameValuePairs) {
        return post(url, null, nameValuePairs, 0,null);
    }
    public static String post(String url, NameValuePair[] nameValuePairs,Header... headers) {
        return post(url, null, nameValuePairs, 0,headers);
    }


    public static String post(String url, RequestEntity entity, NameValuePair[] requestBody, int deep,Header... requestHeaders) {
        PostMethod method = new MyPostMethod(url);
        try {
            //method.addRequestHeader("Content-Type","text/html;charset=UTF-8");
            //method.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
            //String host=method.getURI().getHost();
            if (entity != null) {
                method.setRequestEntity(entity);
            }
            if(requestHeaders!= null && requestHeaders.length>0) {
                for(Header header:requestHeaders) {
                    method.setRequestHeader(header);
                }
            }
            if (requestBody != null) {
                method.setRequestBody(requestBody);
            }
            int code = client.executeMethod(method);
            if (code >= 300 && code < 400) {
                Header header = method.getResponseHeader("Location");
                if (header != null && deep < 3) {
                    return post(url, entity, requestBody, deep++,requestHeaders);
                }
            }
            String charset = method.getResponseCharSet();
            if (charset == null) {
                charset = "UTF-8";
            }
            return IOUtils.toString(method.getResponseBodyAsStream(), charset);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


}
