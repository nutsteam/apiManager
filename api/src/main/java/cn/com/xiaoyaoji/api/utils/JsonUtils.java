package cn.com.xiaoyaoji.api.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;

/**
 * @author: zhoujingjie
 * @Date: 16/9/14
 */
public class JsonUtils {
    public static String toString(Object data){
        return JSON.toJSONString(data, SerializerFeature.WriteDateUseDateFormat,SerializerFeature.WriteMapNullValue);
    }
}
