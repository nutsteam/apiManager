package cn.com.xiaoyaoji.api.listener;

import cn.com.xiaoyaoji.api.Application;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * @author zhoujingjie
 * @date 2016-07-26
 */
public class ContextListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        Application.started();
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {

    }
}
