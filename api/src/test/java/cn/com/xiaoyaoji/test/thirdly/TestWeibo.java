package cn.com.xiaoyaoji.test.thirdly;

import cn.com.xiaoyaoji.api.thirdly.Weibo;
import cn.com.xiaoyaoji.api.thirdly.weibo.User;
import org.junit.Test;

/**
 * @author zhoujingjie
 * @date 2016-07-28
 */
public class TestWeibo {

    @Test
    public void testShow(){
        String accessToken="2.00x3SbyC03kfg_12044d5a5afltpiC";
        String uid="2727734575";
        User user = new Weibo().showUser(accessToken,uid);
        System.out.println(user);

    }
}
