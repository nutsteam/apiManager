package cn.com.xiaoyaoji.api.utils;

import java.lang.reflect.InvocationTargetException;

/**
 * @author zhoujingjie
 * @date 2016-05-12
 */
public class BeanUtils {

    @SuppressWarnings("unchecked")
    public static <T> T convert(Class<T> cla,Object value){
        try {
            Object dest = cla.newInstance();
            org.apache.commons.beanutils.BeanUtils.copyProperties(dest,value);
            return (T) dest;
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException e) {
            throw new RuntimeException(e.getCause());
        }
    }

}
