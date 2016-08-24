package cn.com.xiaoyaoji.api.utils;

import cn.com.xiaoyaoji.api.Config;
import org.apache.commons.codec.digest.DigestUtils;

import java.math.BigInteger;
import java.util.Random;
import java.util.UUID;

/**
 * @author: zhoujingjie
 * @Date: 16/4/30
 */
public class StringUtils {

    public static String id(){
        return new BaseX().encode(new BigInteger(System.nanoTime()+""));
    }

    public static String uuid(){
        return UUID.randomUUID().toString().replace("-","");
    }

    public static boolean isEmail(String str){
        return str.matches(".+@[\\d|\\w]+\\.[\\d|\\w]+(\\.[\\d|\\w]+)*");
    }

    public static String password(String password){
        return DigestUtils.md5Hex(Config.SALT +password);
    }

    public static String code(){
        return code(6);
    }

    public static String code(int num){
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for(int i=0;i<num;i++){
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }

}
