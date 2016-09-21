package cn.com.xiaoyaoji.api.cache;

/**
 * @author zhoujingjie
 * @date 2016-07-28
 */
public interface Cache {

    void put(String token,String key,Object data,int expires);

    Object get(String token,String key,int expires);

}
