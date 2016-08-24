package cn.com.xiaoyaoji.test;

import cn.com.xiaoyaoji.api.utils.StringUtils;
import org.junit.Test;

/**
 * @author: zhoujingjie
 * @Date: 16/8/21
 */
public class TestCode {

    @Test
    public void test(){
        for(int i=0;i<1000;i++) {
            System.out.println(StringUtils.code(10));
        }
    }
}
