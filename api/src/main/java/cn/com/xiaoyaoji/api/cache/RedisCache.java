package cn.com.xiaoyaoji.api.cache;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;

/**
 * @author zhoujingjie
 * @date 2016-08-31
 */
public class RedisCache implements Cache {

    private JedisPool pool;

    public RedisCache(String host, int port, int timeout) {
        this(host, port, timeout, null);
    }

    public RedisCache(String host, int port, int timeout, String password) {
        pool = new JedisPool(new JedisPoolConfig(), host, port, timeout, password);
    }

    public RedisCache(String host, int port) {
        this(host, port, 2000);
    }

    @Override
    public void put(String token, String key, Object data, int expires) {
        synchronized (this) {
            Jedis jedis = null;
            try {
                String json = JSON.toJSONString(data);
                jedis = pool.getResource();
                jedis.hset(token, key, json);
                jedis.expire(token, expires);
            } finally {
                if (jedis != null)
                    jedis.close();
            }
        }
    }

    public void put(String key, String data, int expires){
        synchronized (this) {
            Jedis jedis = null;
            try {
                jedis = pool.getResource();
                jedis.set(key, data);
                jedis.expire(key, expires);
            } finally {
                if (jedis != null)
                    jedis.close();
            }
        }
    }


    @Override
    public Object get(String token, String key, int expires) {
        return hget(token, key, expires);
    }

    public <T> T get(String token, String key, int expires, Class<T> clazz){
        String data = (String) get(token, key, expires);
        return JSON.parseObject(data,clazz);
    }
    public <T> T get(String token, String key, int expires, TypeReference<T> clazz){
        String data = (String) get(token, key, expires);
        return JSON.parseObject(data,clazz);
    }



    public String get(String key, int expires){
        Jedis jedis = null;
        try {
            jedis = pool.getResource();
            String rs= jedis.get(key);
            if (rs != null) {
                jedis.expire(key, expires);
            }
            return rs;
        }finally {
            if(jedis!=null){
                jedis.close();
            }
        }
    }

    private String hget(String token, String key, int expire) {
        if (key == null)
            return null;
        Jedis jedis = null;
        try {
            jedis = pool.getResource();
            String rs = jedis.hget(token, key);
            if (rs != null) {
                jedis.expire(token, expire);
            }
            return rs;
        } finally {
            if (jedis != null) {
                jedis.close();
            }
        }
    }

}
