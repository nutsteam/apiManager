package cn.com.xiaoyaoji.api.thirdly.weibo;

/**
 * @author zhoujingjie
 * @date 2016-07-28
 */
public class User {
    private String id;
    //友好显示名称
    private String name;
    //用户昵称
    private String screen_name;
    private String description;
    private String location;
    private String city;
    private String province;
    private String gender;
    //用户头像地址（大图），180×180像素
    private String avatar_large;
    //用户头像地址（高清），高清头像原图
    private String avatar_hd;
    private String profile_url;

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

    public String getScreen_name() {
        return screen_name;
    }

    public void setScreen_name(String screen_name) {
        this.screen_name = screen_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAvatar_large() {
        return avatar_large;
    }

    public void setAvatar_large(String avatar_large) {
        this.avatar_large = avatar_large;
    }

    public String getAvatar_hd() {
        return avatar_hd;
    }

    public void setAvatar_hd(String avatar_hd) {
        this.avatar_hd = avatar_hd;
    }

    public String getProfile_url() {
        return profile_url;
    }

    public void setProfile_url(String profile_url) {
        this.profile_url = profile_url;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", screen_name='" + screen_name + '\'' +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", city='" + city + '\'' +
                ", province='" + province + '\'' +
                ", gender='" + gender + '\'' +
                ", avatar_large='" + avatar_large + '\'' +
                ", avatar_hd='" + avatar_hd + '\'' +
                ", profile_url='" + profile_url + '\'' +
                '}';
    }
}
