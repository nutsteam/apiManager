package cn.com.xiaoyaoji.api;

import cn.com.xiaoyaoji.api.asynctask.message.MessageBus;
import cn.com.xiaoyaoji.api.asynctask.message.MessageNotify;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.DateConverter;

import java.util.Date;

/**
 * @author zhoujingjie
 * @date 2016-07-26
 */
public class Application {

    public static void started(){
        MessageBus.instance().register(new MessageNotify());
        DateConverter converter = new DateConverter();
        converter.setPattern("yyyy-MM-dd HH:mm:ss");
        ConvertUtils.register(converter, Date.class);
    }
}
