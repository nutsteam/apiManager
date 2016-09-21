package cn.com.xiaoyaoji.api.websocket;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.net.SocketTimeoutException;

/**
 * @author zhoujingjie
 * @date 2016-07-26
 */
@ServerEndpoint(value = "/message")
public class MessageWs {
    //timeout 1分钟
    private static int timeout = 1*60*1000;
    @OnOpen
    public void onOpen(Session session) throws IOException {
        WsUtils.open(session);
        session.setMaxIdleTimeout(timeout);
        //sendMessage("onOpen",session);
    }

    @OnError
    public void onError(Session session,Throwable th) throws IOException {
        //sendMessage("onError "+th.toString(),session);
        if(!(th instanceof SocketTimeoutException)){
            th.printStackTrace();
        }
    }

    @OnClose
    public void onClose(Session session, CloseReason closeReason) throws IOException {
        WsUtils.close(session);
        System.out.println("on close "+closeReason.toString());
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        WsUtils.message(session,message);
        //sendMessage("onMessage: the server has received a message ->"+message,session);
    }

    private void sendMessage(String message,Session session) throws IOException {
        session.getBasicRemote().sendText(message);
    }
}
