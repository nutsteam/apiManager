package cn.com.xiaoyaoji.api.data.bean;

/**
 * 第三方
 * @author: zhoujingjie
 * @Date: 16/5/2
 */
public class Thirdparty {
    private String id;
    private String nickName;
    private String logo;
    private String type;
    private String email;
    private String userId;
    public static class Type{
        public static String QQ="QQ";
        public static String WEIBO="WEIBO";
        public static String GITHUB="GITHUB";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
