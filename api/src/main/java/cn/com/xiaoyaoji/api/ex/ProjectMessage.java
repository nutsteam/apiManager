package cn.com.xiaoyaoji.api.ex;

/**
 * @author zhoujingjie
 * @date 2016-09-13
 */
public class ProjectMessage {
    private String projectId;
    private String moduleId;
    private String folderId;
    private String interfaceId;
    private String action;
    private String token;
    private String[] ext;

    public ProjectMessage(String action) {
        this.action = action;
    }


    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public String getFolderId() {
        return folderId;
    }

    public void setFolderId(String folderId) {
        this.folderId = folderId;
    }

    public String getInterfaceId() {
        return interfaceId;
    }

    public void setInterfaceId(String interfaceId) {
        this.interfaceId = interfaceId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getToken() {
        if(token ==null)
            return null;
        return token.substring(0,10);
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String[] getExt() {
        return ext;
    }

    public void setExt(String[] ext) {
        this.ext = ext;
    }
}
