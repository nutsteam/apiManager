package cn.com.xiaoyaoji.api.websocket;

import cn.com.xiaoyaoji.api.ex.ProjectMessage;
import cn.com.xiaoyaoji.api.utils.JsonUtils;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

import javax.websocket.Session;
import java.io.IOException;
import java.util.*;

/**
 * @author zhoujingjie
 * @date 2016-09-13
 */
public class WsUtils {

    private final static Map<String,Set<Session>> sessionMap = new HashMap<>();
    private final static Logger log = Logger.getLogger(WsUtils.class);
    public static void open(Session session) {
        log.debug("on open:"+session.getId());
    }
    public static void message(Session session,String message) {
        log.debug("on message:"+session.getId() +" message:"+message);
        String key = "projectId:";
        if(message.indexOf(key) == 0){
            String projectId = message.substring(key.length());
            Set<Session> sessions = sessionMap.get(projectId);
            if(sessions == null) {
                sessions = new HashSet<>();
                sessionMap.put(projectId,sessions);
            }
            synchronized (sessionMap) {
                sessions.add(session);
            }
        }
    }

    public static void close(Session session){
        for(Map.Entry<String,Set<Session>> entry: sessionMap.entrySet()){
            synchronized (sessionMap) {
                entry.getValue().remove(session);
            }
        }
    }

    public static void error(Session session,Throwable th){
        IOUtils.closeQuietly(session);
        log.error(th.getMessage(),th);
    }

    public static void pushMessage(ProjectMessage message){
        Set<Session> sessions = sessionMap.get(message.getProjectId());
        if(sessions!= null){
            for(Session session :sessions){
                try {
                    session.getBasicRemote().sendText(JsonUtils.toString(message));
                } catch (IOException e) {
                    log.error(e.getMessage(),e);
                }
            }
        }
    }
}
