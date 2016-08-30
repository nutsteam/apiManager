package cn.com.xiaoyaoji.api.data.bean;

import cn.com.xiaoyaoji.api.annotations.Alias;
import cn.com.xiaoyaoji.api.annotations.Ignore;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 模块
 * @author zhoujingjie
 * @date 2016-07-13
 */
@Alias("module")
public class Module {

    private String id;
    private String name;
    private String host;
    private String description;
    private Date lastUpdateTime;
    private Date createTime;
    private String projectId;

    @Ignore
    private List<InterfaceFolder> folders=new ArrayList<>();

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

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getLastUpdateTime() {
        return lastUpdateTime;
    }

    public void setLastUpdateTime(Date lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return JSON.toJSONString(this, SerializerFeature.WriteDateUseDateFormat);
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public List<InterfaceFolder> getFolders() {
        return this.folders;
    }
    public void addInterface(InterfaceFolder in){
        this.folders.add(in);
    }

    public void setFolders(List<InterfaceFolder> folders) {
        this.folders = folders;
    }
}
