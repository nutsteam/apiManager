package cn.com.xiaoyaoji.api.utils;

import java.net.URL;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.mail.*;
import org.apache.commons.mail.resolver.DataSourceUrlResolver;

/**
 * @author: zhoujingjie
 * @Date: 16/8/21
 */
public class MailUtils {
    public static String sendEmail(String subject, String msg, String to) {
        try {
            Email email = new SimpleEmail();
            email.setHostName(ConfigUtils.getProperty("mail.smtp"));
            email.setSmtpPort(Integer.parseInt(ConfigUtils.getProperty("mail.smtp.port")));
            email.setAuthenticator(new DefaultAuthenticator(ConfigUtils.getProperty("mail.username"), ConfigUtils.getProperty("mail.password")));
            email.setSSLOnConnect(true);
            email.setFrom("system@xiaoyaoji.com.cn","小幺鸡系统通知-验证码");
            email.setSubject(subject);
            email.setMsg(msg);
            email.setCharset("UTF-8");
            email.addTo(to);
            return email.send();
        } catch (EmailException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    public static String sendHtmlMail(String subject, String html, String msg, String to, String link) {
        try {
            // define you base URL to resolve relative resource locations
            URL url = new URL(link);

            // create the email message
            ImageHtmlEmail email = new ImageHtmlEmail();
            email.setCharset("UTF-8");
            email.setDataSourceResolver(new DataSourceUrlResolver(url));
            email.setHostName(ConfigUtils.getProperty("mail.smtp"));
            email.setSmtpPort(Integer.parseInt(ConfigUtils.getProperty("mail.smtp.port")));
            email.setAuthenticator(new DefaultAuthenticator(ConfigUtils.getProperty("mail.username"), ConfigUtils.getProperty("mail.password")));
            email.setSSLOnConnect(true);
            email.addTo(to);
            email.setFrom(ConfigUtils.getProperty("mail.from"),ConfigUtils.getProperty("mail.from.name") );
            email.setSubject(subject);

            // set the html message
            email.setHtmlMsg(html);

            // set the alternative message
            email.setTextMsg(msg);
            // send the email
            return email.send();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    public static String findPassWord(String id, String to) {
        String url = "http://www.xiaoyaoji.com.cn/findpassword.html?token=" + Base64.encodeBase64String((id + "!" + to).getBytes());
        String text = "请复制URL到浏览器上打开进行后续操作 " + url;
        String html = "<a href=\"" + url + "\">点击找回密码进行后续操作</a> 如果该链接不能点击" + text;
        return sendHtmlMail("找回密码", html, text, to, "http://www.xiaoyaoji.com.cn");
    }
    /*
    public static String newEmail(String id,String to){
        String url = "http://www.xiaoyaoji.com/findpassword.html?token="+id;
        String text = "请复制URL到浏览器上打开进行后续操作 " + url;
        String html = " 请验证您的邮箱<br/><a href=\"" + url + "\">验证</a><br/>如果该链接不能点击" + text;
        return sendHtmlMail("找回密码", html, text, to, "http://www.xiaoyaoji.com.cn");
    }*/
}
