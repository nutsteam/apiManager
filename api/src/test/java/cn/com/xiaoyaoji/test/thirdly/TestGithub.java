package cn.com.xiaoyaoji.test.thirdly;

import cn.com.xiaoyaoji.api.thirdly.AccessToken;
import cn.com.xiaoyaoji.api.thirdly.Github;
import cn.com.xiaoyaoji.api.thirdly.github.Email;
import cn.com.xiaoyaoji.api.thirdly.github.User;
import cn.com.xiaoyaoji.api.utils.ConfigUtils;
import com.alibaba.fastjson.JSON;
import org.junit.Test;

import java.util.List;

/**
 * @author: zhoujingjie
 * @Date: 16/9/2
 */
public class TestGithub {

    @Test
    public void testAccessToken(){
        Github github = new Github();
        String code = "f9f31a42bdc5ce39df91";
        AccessToken accessToken = github.getAccessToken(ConfigUtils.getProperty("github.clientid"),ConfigUtils.getProperty("github.secret"),code,ConfigUtils.getProperty("github.redirect_uri"));
        System.out.println(accessToken.getAccess_token());
    }


    @Test
    public void testEmail(){
        Github github = new Github();
        List<Email> emailList = github.getEmail("1fd11149e879289929a8c5a09614ef020a3115ce");
        System.out.println(emailList);
    }

    @Test
    public void getUser(){
        Github github = new Github();
        User user = github.getUser("1fd11149e879289929a8c5a09614ef020a3115ce");
        System.out.println(JSON.toJSON(user));
    }

}
