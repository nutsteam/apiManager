package cn.com.xiaoyaoji.api.asynctask.message;

import java.lang.annotation.ElementType;

/**
 * @author: zhoujingjie
 * @Date: 16/5/2
 */
@java.lang.annotation.Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@java.lang.annotation.Target({ElementType.METHOD})
public @interface Message {
    String value();
}
