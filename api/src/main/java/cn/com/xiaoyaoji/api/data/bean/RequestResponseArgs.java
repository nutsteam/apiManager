package cn.com.xiaoyaoji.api.data.bean;

import java.util.ArrayList;
import java.util.List;

/**
 * @author zhoujingjie
 * @date 2016-09-07
 */
public class RequestResponseArgs {
    private String description;
    private String name;
    private String type;
    private String require;
    private String defaultValue;
    private List<RequestResponseArgs> children = new ArrayList<>();

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRequire() {
        return require;
    }

    public void setRequire(String require) {
        this.require = require;
    }

    public String getDefaultValue() {
        return defaultValue;
    }

    public void setDefaultValue(String defaultValue) {
        this.defaultValue = defaultValue;
    }

    public List<RequestResponseArgs> getChildren() {
        return children;
    }

    public void setChildren(List<RequestResponseArgs> children) {
        this.children = children;
    }
}
