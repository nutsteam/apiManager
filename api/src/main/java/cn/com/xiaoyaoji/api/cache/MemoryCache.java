package cn.com.xiaoyaoji.api.cache;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @author zhoujingjie
 * @date 2016-07-28
 */
public class MemoryCache implements Cache {
    private static Map<String, Value> dataMap;

    static {
        dataMap = new HashMap<>();
    }

    public void put(String token, String key, Object data, int expires) {
        Value value = dataMap.get(token);
        if (value == null) {
            value = new Value();
            dataMap.put(token, value);
        }
        value.setExpires(new Date(new Date().getTime() + expires * 1000));
        value.putData(key, data);
    }

    public Object get(String token, String key, int expires) {
        Value value = dataMap.get(token);
        if (value == null)
            return null;
        if (value.getExpires().getTime() < System.currentTimeMillis()) {
            dataMap.put(token, null);
            return null;
        }
        value.setExpires(new Date(new Date().getTime() + expires * 1000));
        return value.getData(key);
    }

    public class Value {
        private Date expires;
        private Map<String, Object> data = new HashMap<>();

        public Date getExpires() {
            return expires;
        }

        public void setExpires(Date expires) {
            this.expires = expires;
        }

        public void putData(String key, Object value) {
            data.put(key, value);
        }

        public Object getData(String key) {
            return data.get(key);
        }
    }
}
