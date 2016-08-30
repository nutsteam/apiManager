package cn.com.xiaoyaoji.api.ex;

/**
 * @author zhoujingjie
 * @date 2016-07-27
 */
public interface Handler<T> {

    String key(T item);

}
