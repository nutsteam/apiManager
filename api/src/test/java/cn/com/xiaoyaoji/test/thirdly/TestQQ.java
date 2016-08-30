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
        UserInfo userInfo = new QQ().getUserInfo("45E27344B0DA6FB7D83D18EF8D154EE6","3267237F686BD5F33D46E22158C3E1E0");
        System.out.println(userInfo);
    }

    @Test
    public void testAccessToken(){
        String code="B857AB26028D44F1BC01D15789609E1C";
        AccessToken token = new QQ().getAccessToken(code,"http://www.xiaoyaoji.com.cn/callback/qq");
        System.out.println(token.getAccess_token());
    }
}
