package cn.com.xiaoyaoji.api.utils;

import cn.com.xiaoyaoji.api.ex.Handler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: zhoujingjie
 * @Date: 16/5/11
 */
public class ResultUtils {

    public static <T> List<T> list(List<T> rs) {
        if (rs == null) {
            return new ArrayList<>();
        }
        return rs;
    }

    public static <T> T get(List<T> rs) {
        if (rs != null && rs.size() > 0)
            return rs.get(0);
        return null;
    }

    public static <T> Map<String, List<T>> listToMap(List<T> list, Handler handler) {
        Map<String, List<T>> map = new HashMap<>();
        if (list != null && list.size() > 0) {
            for(T item:list){
                String key = handler.key(item);
                List<T> temp = map.get(key);
                if(temp == null){
                    temp = new ArrayList<>();
                    map.put(key,temp);
                }
                temp.add(item);
            }
        }
        return map;
    }
}
