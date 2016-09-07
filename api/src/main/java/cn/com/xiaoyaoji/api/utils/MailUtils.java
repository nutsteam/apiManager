package cn.com.xiaoyaoji.api.utils;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.log4j.Logger;

import cn.com.xiaoyaoji.api.ex._HashMap;

import com.alibaba.fastjson.JSON;

/**
 * @author: zhoujingjie
 * @Date: 16/8/21
 */
public class MailUtils {
    private static Logger logger = Logger.getLogger(MailUtils.class);
    private static String TEMPLATE_URL = "http://sendcloud.sohu.com/webapi/mail.send_template.json";

    public static void sendCaptcha(String code, String to) {
        String vars = JSON.toJSONString(new _HashMap<>().add("to", new String[] { to }).add("sub", new _HashMap<>().add("%captcha%", new String[] { code })));
        NameValuePair[] pairs = new NameValuePair[] { new NameValuePair("api_user", ConfigUtils.getProperty("sendcloud.system.apiuser")),
                new NameValuePair("api_key", ConfigUtils.getProperty("sendcloud.apikey")),
                new NameValuePair("from", ConfigUtils.getProperty("sendcloud.system.from")), new NameValuePair("fromname", "小幺鸡系统通知"),
                new NameValuePair("subject", "小幺鸡系统通知-验证码"), new NameValuePair("substitution_vars", vars), new NameValuePair("use_maillist", "false"),
                new NameValuePair("template_invoke_name", "captcha"), };
        String rs = HttpUtils.post(TEMPLATE_URL, pairs);
        if (rs.contains("error")) {
            throw new RuntimeException(rs);
        }
        logger.debug(rs);
    }

    public static void findPassword(String id, String to) {
        String url = "http://www.xiaoyaoji.com.cn/findpassword.html?token=" + Base64.encodeBase64String((id + "!" + to).getBytes());
        String vars = JSON.toJSONString(new _HashMap<>().add("to", new String[] { to }).add("sub", new _HashMap<>().add("%url%", new String[] { url })));
        NameValuePair[] pairs = new NameValuePair[] { new NameValuePair("api_user", ConfigUtils.getProperty("sendcloud.system.apiuser")),
                new NameValuePair("api_key", ConfigUtils.getProperty("sendcloud.apikey")),
                new NameValuePair("from", ConfigUtils.getProperty("sendcloud.system.from")), new NameValuePair("fromname", "小幺鸡系统通知"),
                new NameValuePair("subject", "小幺鸡系统通知-找回密码"), new NameValuePair("substitution_vars", vars),
                new NameValuePair("template_invoke_name", "find_password"), };
        String rs = HttpUtils.post(TEMPLATE_URL, pairs);
        if (rs.contains("error")) {
            throw new RuntimeException(rs);
        }
        logger.debug(rs);
    }

    public static void market(String... to) {

        String vars = JSON.toJSONString(new _HashMap<>().add("to", to));
        NameValuePair[] pairs = new NameValuePair[] { new NameValuePair("api_user", ConfigUtils.getProperty("sendcloud.market.apiuser")),
                new NameValuePair("api_key", ConfigUtils.getProperty("sendcloud.apikey")),
                new NameValuePair("from", ConfigUtils.getProperty("sendcloud.market.from")), new NameValuePair("fromname", "小幺鸡邀请你使用"),
                new NameValuePair("subject", "朋友,给你推荐一款接口文档管理工具"), new NameValuePair("substitution_vars", vars),
                new NameValuePair("template_invoke_name", "market_1"), };
        String rs = HttpUtils.post(TEMPLATE_URL, pairs);
        if (rs.contains("error")) {
            throw new RuntimeException(rs);
        }
        logger.debug(rs);
    }

}
