package cn.com.xiaoyaoji.test.thirdly;

import cn.com.xiaoyaoji.api.thirdly.Weibo;
import cn.com.xiaoyaoji.api.thirdly.weibo.AccessToken;
import cn.com.xiaoyaoji.api.thirdly.weibo.User;
import cn.com.xiaoyaoji.api.utils.ConfigUtils;
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

    @Test
    public void testAccessToken(){
        String code = "b4e91f0df76eb03544e3efdd49c7aac1";
        Weibo weibo = new Weibo();
        AccessToken accessToken = weibo.getAccessToken(ConfigUtils.getProperty("weibo.appkey"),ConfigUtils.getProperty("weibo.appsecret"),code,ConfigUtils.getProperty("weibo.redirect_uri"));
        System.out.println(accessToken.getAccess_token() +" "+accessToken.getUid());
    }

    @Test
    public void testEmail(){
         Weibo weibo = new Weibo();
        String rs = weibo.getEmail("2.00x3SbyC03kfg_12044d5a5afltpiC");
    }
}
