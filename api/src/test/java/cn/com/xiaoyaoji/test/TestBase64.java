package cn.com.xiaoyaoji.test;

import org.apache.commons.codec.binary.Base64;
import org.junit.Test;

/**
 * @author zhoujingjie
 * @date 2016-08-22
 */
public class TestBase64 {
    @Test
    public void test() {
        System.out.println(Base64.encodeBase64String("abcd!cn_bboy@163.com".getBytes()));
    }
}
