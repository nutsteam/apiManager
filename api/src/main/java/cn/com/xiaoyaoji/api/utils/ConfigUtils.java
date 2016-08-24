package cn.com.xiaoyaoji.api.utils;

import java.io.IOException;
import java.util.Properties;

/**
 * @author: zhoujingjie
 * @Date: 16/5/2
 */
public class ConfigUtils {
    private static Properties properties;
    static {
        properties = new Properties();
        try {
            properties.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("config.properties"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static String getProperty(String key){
        return properties.getProperty(key);
    }

    public static String getFileUploadDir(){
        return properties.getProperty("file.upload.dir");
    }

    public static String getFileAccessURL(){
        return properties.getProperty("file.access.url");
    }

    public static String getBucketURL(){
        return properties.getProperty("file.qiniu.bucket");
    }

    public static String getUploadServer(){
        return properties.getProperty("file.upload.server","owner");
    }

    public static String getJdbcURL(){
        return properties.getProperty("jdbc.url");
    }
    public static String getJdbcUsername(){
        return properties.getProperty("jdbc.username");
    }
    public static String getJdbcPassword(){
        return properties.getProperty("jdbc.password");
    }
    public static String getJdbcDriverclass(){
        return properties.getProperty("jdbc.driverclass");
    }

    public static String getJdbcInitSize(){
        return properties.getProperty("jdbc.initsize");
    }
    public static String getJdbcMaxWait(){
        return properties.getProperty("jdbc.maxwait");
    }
    public static String getJdbcMinIdle(){
        return properties.getProperty("jdbc.minidle");
    }

    public static String getQiniuAccessKey(){
        return properties.getProperty("file.qiniu.accessKey");
    }

    public static String getQiniuSecretKey(){
        return properties.getProperty("file.qiniu.secretKey");
    }

    public static String getSalt(){
        return properties.getProperty("salt");
    }

    public static String getQQAppId() {
        return properties.getProperty("qq.appid");
    }
    public static String getQQAppKey() {
        return properties.getProperty("qq.appkey");
    }

    public static int getTokenExpires() {
        return Integer.parseInt(properties.getProperty("token.expires"));
    }
}
