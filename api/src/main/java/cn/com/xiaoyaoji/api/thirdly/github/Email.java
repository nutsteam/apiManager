package cn.com.xiaoyaoji.api.thirdly.github;

/**
 * @author: zhoujingjie
 * @Date: 16/9/2
 */
public class Email {
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Email{" +
                "email='" + email + '\'' +
                '}';
    }
}
