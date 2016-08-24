package cn.com.xiaoyaoji.api.websocket;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

/**
 * @author zhoujingjie
 * @date 2016-07-26
 */
@ServerEndpoint("/test")
public class TestWebsocket {

    @OnOpen
    public void onOpen(Session session) throws IOException {
        sendMessage("onOpen",session);
    }

    @OnError
    public void onError(Session session,Throwable th) throws IOException {
        sendMessage("onError "+th.toString(),session);
    }

    @OnClose
    public void onClose(Session session, CloseReason closeReason) throws IOException {
        sendMessage("onClose "+closeReason.toString(),session);
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        sendMessage("onMessage: the server has received a message ->"+message,session);
    }

    private void sendMessage(String message,Session session) throws IOException {
        session.getBasicRemote().sendText(message);
    }
}
