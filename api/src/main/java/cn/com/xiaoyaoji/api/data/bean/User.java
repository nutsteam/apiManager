package cn.com.xiaoyaoji.api.data.bean;

import cn.com.xiaoyaoji.api.annotations.Alias;
import cn.com.xiaoyaoji.api.annotations.Ignore;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户
 * @author: zhoujingjie
 * @Date: 16/5/22
 */
@Alias("user")
public class User implements Serializable {
    private String id;
    private String nickname;
    private Date createtime;
    private String email;
    private String password;
    private String type;
    private String avatar;
    private String status;
    @Ignore
    private boolean bindQQ;
    @Ignore
    private boolean bindWeibo;
    @Ignore
    private boolean bindGithub;

    public interface Type{
        String USER="USER";
        String ADMIN="ADMIN";
    }
    public interface Status{
        String VALID="VALID";
        String INVALID="INVALID";
        String PENDING="PENDING";
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getAvatar() {
        return avatar;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isBindQQ() {
        return bindQQ;
    }

    public void setBindQQ(boolean bindQQ) {
        this.bindQQ = bindQQ;
    }

    public boolean isBindWeibo() {
        return bindWeibo;
    }

    public void setBindWeibo(boolean bindWeibo) {
        this.bindWeibo = bindWeibo;
    }

    public boolean isBindGithub() {
        return bindGithub;
    }

    public void setBindGithub(boolean bindGithub) {
        this.bindGithub = bindGithub;
    }
}
