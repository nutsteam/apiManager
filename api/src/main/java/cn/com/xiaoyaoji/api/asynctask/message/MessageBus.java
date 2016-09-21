package cn.com.xiaoyaoji.api.asynctask.message;


import cn.com.xiaoyaoji.api.asynctask.ex.ObjectMethod;
import org.apache.log4j.Logger;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @author zhoujingjie
 * @date 2016-07-26
 */
public class MessageBus {
    private static Map<String, ObjectMethod> messageMap;
    private static Logger log = Logger.getLogger(MessageBus.class);
    //
    private ExecutorService threadPool = Executors.newFixedThreadPool(10);
    private static MessageBus instance;

    static {
        instance = new MessageBus();
        messageMap = new HashMap<>();
    }

    private MessageBus() {
    }

    public static MessageBus instance() {
        return instance;
    }

    /**
     * 发消息
     *
     * @param messageKey
     * @param args
     */
    public void push(String messageKey, final Object... args) {
        final ObjectMethod om = messageMap.get(messageKey);
        if (om != null) {
            threadPool.execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        om.getMethod().invoke(om.getInstance(), args);
                    } catch (IllegalAccessException | InvocationTargetException e) {
                        log.error(e);
                    }
                }
            });
        }
    }

    /**
     * 注册事件
     *
     * @param instance
     */
    public void register(Object instance) {
        for (Method method : instance.getClass().getMethods()) {
            Message message = method.getAnnotation(Message.class);
            if (message != null) {
                messageMap.put(message.value(), new ObjectMethod(instance, method));
            }
        }
    }

}
