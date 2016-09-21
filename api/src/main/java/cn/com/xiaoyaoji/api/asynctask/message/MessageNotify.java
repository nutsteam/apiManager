package cn.com.xiaoyaoji.api.asynctask.message;

import cn.com.xiaoyaoji.api.ex.ProjectMessage;
import cn.com.xiaoyaoji.api.websocket.WsUtils;

/**
 * @author zhoujingjie
 * @date 2016-07-26
 */
public class MessageNotify {

    @Message("PROJECT.INVITE")
    public void projectInviteUser(String projectId,String[] userIds){
        System.out.println("project:{},userId:");
    }

    @Message("PROJECT.UPDATE")
    public void projectUpdate(String projectId,String token){
        ProjectMessage message = new ProjectMessage("PROJECT.UPDATE");
        message.setProjectId(projectId);
        message.setToken(token);
        push(message);
    }
    @Message("PROJECT.DELETE")
    public void projectDelete(String projectId,String token){
        ProjectMessage message = new ProjectMessage("PROJECT.DELETE");
        message.setProjectId(projectId);
        message.setToken(token);
        push(message);
    }
    @Message("PROJECT.CREATE")
    public void projectCreate(String projectId,String token){
        ProjectMessage message = new ProjectMessage("PROJECT.CREATE");
        message.setProjectId(projectId);
        message.setToken(token);
        push(message);
    }
    @Message("MODULE.CREATE")
    public void moduleCreate(String projectId,String moduleId,String token){
        ProjectMessage message = new ProjectMessage("MODULE.CREATE");
        message.setProjectId(projectId);
        message.setModuleId(moduleId);
        message.setToken(token);
        push(message);
    }
    @Message("MODULE.UPDATE")
    public void moduleUpdate(String projectId,String moduleId,String token){
        ProjectMessage message = new ProjectMessage("MODULE.UPDATE");
        message.setProjectId(projectId);
        message.setModuleId(moduleId);
        message.setToken(token);
        push(message);
    }
    @Message("MODULE.DELETE")
    public void moduleDelete(String projectId,String moduleId,String token){
        ProjectMessage message = new ProjectMessage("MODULE.DELETE");
        message.setProjectId(projectId);
        message.setModuleId(moduleId);
        message.setToken(token);
        push(message);
    }
    @Message("FOLDER.DELETE")
    public void folderDelete(String projectId,String folderId,String token){
        ProjectMessage message = new ProjectMessage("FOLDER.DELETE");
        message.setProjectId(projectId);
        message.setFolderId(folderId);
        message.setToken(token);
        push(message);
    }
    @Message("FOLDER.CREATE")
    public void folderCreate(String projectId,String folderId,String token){
        ProjectMessage message = new ProjectMessage("FOLDER.CREATE");
        message.setProjectId(projectId);
        message.setFolderId(folderId);
        message.setToken(token);
        push(message);
    }
    @Message("FOLDER.UPDATE")
    public void folderUpdate(String projectId,String folderId,String token){
        ProjectMessage message = new ProjectMessage("FOLDER.UPDATE");
        message.setProjectId(projectId);
        message.setFolderId(folderId);
        message.setToken(token);
        push(message);
    }
    @Message("INTERFACE.CREATE")
    public void interfaceCreate(String projectId,String interfaceId,String token){
        ProjectMessage message = new ProjectMessage("INTERFACE.CREATE");
        message.setProjectId(projectId);
        message.setInterfaceId(interfaceId);
        message.setToken(token);
        push(message);
    }
    @Message("INTERFACE.DELETE")
    public void interfaceDelete(String projectId,String interfaceId,String token){
        ProjectMessage message = new ProjectMessage("INTERFACE.DELETE");
        message.setProjectId(projectId);
        message.setInterfaceId(interfaceId);
        message.setToken(token);
        push(message);
    }
    @Message("INTERFACE.UPDATE")
    public void interfaceUpdate(String projectId,String interfaceId,String token){
        ProjectMessage message = new ProjectMessage("INTERFACE.UPDATE");
        message.setProjectId(projectId);
        message.setInterfaceId(interfaceId);
        message.setToken(token);
        push(message);
    }

    private void push(ProjectMessage message){
        WsUtils.pushMessage(message);
    }
}
