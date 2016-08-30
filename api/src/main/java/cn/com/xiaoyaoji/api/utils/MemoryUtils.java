package cn.com.xiaoyaoji.api.utils;

import cn.com.xiaoyaoji.api.cache.Cache;
import cn.com.xiaoyaoji.api.cache.MemoryCache;
import cn.com.xiaoyaoji.api.data.bean.User;
import org.apache.commons.lang3.*;
import org.mangoframework.core.dispatcher.Parameter;

import java.util.UUID;

/**
 * @author: zhoujingjie
 * @Date: 16/5/4
 */
public class MemoryUtils {
    private static Cache cache;
    private static int expires=  ConfigUtils.getTokenExpires();
    static {
        cache = new MemoryCache();
    }

    public static String token(){
        return UUID.randomUUID().toString().replaceAll("-","").toLowerCase();
    }
    public static void putUser(String token, User user){
        cache.put(token,"user",user,expires);
    }

    public static User getUser(String token){
        return (User) cache.get(token,"user",expires);
    }

    public static User getUser(Parameter parameter){
        String token=parameter.getParamString().get("token");
        if(org.apache.commons.lang3.StringUtils.isBlank(token))
            return null;
        return (User) cache.get(token,"user",expires);
    }

    public static void put(String token,String key,Object data){
        cache.put(token,key,data,expires);
    }
    public static Object get(String token,String key){
        return cache.get(token,key,expires);
    }
}
