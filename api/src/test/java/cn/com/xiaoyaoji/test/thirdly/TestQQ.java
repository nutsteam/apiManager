package cn.com.xiaoyaoji.test.thirdly;

import cn.com.xiaoyaoji.api.thirdly.QQ;
import cn.com.xiaoyaoji.api.thirdly.qq.AccessToken;
import cn.com.xiaoyaoji.api.thirdly.qq.UserInfo;
import org.junit.Test;


/**
 * @author zhoujingjie
 * @date 2016-07-28
 */
public class TestQQ {

    @Test
    public void testLogin(){
        UserInfo userInfo = new QQ().getUserInfo("45E27344B0DA6FB7D83D18EF8D154EE6","3267237F686BD5F34FCB091EC4B6A7F9");
        System.out.println(userInfo);
    }

    @Test
    public void testAccessToken(){
        String code="4D3BB431B5D6CA04238607A152272174";
        AccessToken token = new QQ().getAccessToken(code,"http://www.xiaoyaoji.com.cn");

        System.out.println(token.getAccess_token());
    }
    @Test
    public void testOpenId(){
        System.out.println(new QQ().getOpenid("3267237F686BD5F34FCB091EC4B6A7F9"));
    }

    public void testCode(){

    }
}
