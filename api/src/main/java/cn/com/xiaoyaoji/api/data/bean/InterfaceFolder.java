package cn.com.xiaoyaoji.api.data.bean;

import cn.com.xiaoyaoji.api.annotations.Alias;
import cn.com.xiaoyaoji.api.annotations.Ignore;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author zhoujingjie
 * @date 2016-07-14
 */
@Alias("interface_folder")
public class InterfaceFolder {
    private String id;
    private String name;
    private Date createTime;
    private String moduleId;
    private String projectId;
    @Ignore
    private List<Interface> children = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public List<Interface> getChildren() {
        return children;
    }

    public void setChildren(List<Interface> children) {
        this.children = children;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }
}
