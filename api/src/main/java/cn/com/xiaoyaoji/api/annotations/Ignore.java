package cn.com.xiaoyaoji.api.annotations;

import java.lang.annotation.ElementType;

/**
 * @author: zhoujingjie
 * @Date: 16/5/2
 */
@java.lang.annotation.Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@java.lang.annotation.Target({ElementType.FIELD,ElementType.METHOD,ElementType.TYPE})
public @interface Ignore {
}
