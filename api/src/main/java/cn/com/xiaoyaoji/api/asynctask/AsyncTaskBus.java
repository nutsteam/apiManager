package cn.com.xiaoyaoji.api.asynctask;

import cn.com.xiaoyaoji.api.asynctask.log.Log;
import cn.com.xiaoyaoji.api.data.bean.ProjectLog;
import cn.com.xiaoyaoji.api.ex.ProjectMessage;
import cn.com.xiaoyaoji.api.websocket.WsUtils;
import org.apache.log4j.Logger;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @author: zhoujingjie
 * @Date: 16/9/14
 */
public class AsyncTaskBus {
    private static Logger logger = Logger.getLogger(AsyncTaskBus.class);
    private BlockingQueue queue ;
    private static AsyncTaskBus instance;
    private static Log log;
    private ExecutorService threadPool = Executors.newFixedThreadPool(50);
    static {
        instance = new AsyncTaskBus();
        log = new Log();
    }
    private AsyncTaskBus(){
        queue = new ArrayBlockingQueue(50);
        start();
    }

    private void start(){
        threadPool.execute(new Runnable() {
            @Override
            public void run() {
                while (true){
                    try {
                        Object data = queue.take();
                        if(data instanceof ProjectMessage){
                            WsUtils.pushMessage((ProjectMessage) data);
                        }else if(data instanceof ProjectLog){
                            //log.push((ProjectLog) data);
                        }
                    } catch (InterruptedException e) {
                        logger.error(e.getMessage(),e);
                    }
                }
            }
        });

    }
    public static AsyncTaskBus instance(){
        return instance;
    }

    public void push(final ProjectLog message){
        threadPool.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    queue.put(message);
                } catch (InterruptedException e) {
                    logger.error(e.getMessage(),e);
                }
            }
        });
    }
    public void push(String projectId,String action,String id,String token,String... ext){
        if(action == null)
            return;
        final ProjectMessage message = new ProjectMessage(action);
        message.setProjectId(projectId);
        message.setToken(token);
        if(action.contains("interface")){
            message.setInterfaceId(id);
        }else if (action.contains("module")){
            message.setModuleId(id);
        }else if (action.contains("folder")){
            message.setFolderId(id);
        }else if (action.contains("project")){
        }else {
            logger.info("action not found");
            return;
        }
        message.setExt(ext);
        threadPool.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    queue.put(message);
                } catch (InterruptedException e) {
                    logger.error(e.getMessage(),e);
                }
            }
        });
    }

}
