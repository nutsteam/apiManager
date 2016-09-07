package cn.com.xiaoyaoji.api.thirdly;

import cn.com.xiaoyaoji.api.thirdly.weibo.AccessToken;
import cn.com.xiaoyaoji.api.thirdly.weibo.User;
import cn.com.xiaoyaoji.api.thirdly.weibo.WeiboException;
import cn.com.xiaoyaoji.api.utils.HttpUtils;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.log4j.Logger;

import java.util.HashMap;

/**
 * @author zhoujingjie
 * @date 2016-07-28
 */
public class Weibo {
    private static Logger logger = Logger.getLogger("thirdly");

    /**
     * 获取用户信息
     * @param accessToken
     * @param uid
     * @return
     */
    public User showUser(String accessToken, String uid){
        String rs = HttpUtils.get("https://api.weibo.com/2/users/show.json?access_token="+accessToken+"&uid="+uid);
        if(rs.contains("error_code")){
            throw new WeiboException(rs);
        }
        return JSON.parseObject(rs,User.class);
    }

    /**
     * 获取accessToken
     * @param appKey
     * @param appSecret
     * @param code
     * @param redirectUri
     * @return
     */
    public AccessToken getAccessToken(String appKey,String appSecret,String code,String redirectUri){
        NameValuePair[] pairs = new NameValuePair[]{
                new NameValuePair("client_id",appKey),
                new NameValuePair("client_secret",appSecret),
                new NameValuePair("grant_type","authorization_code"),
                new NameValuePair("code",code),
                new NameValuePair("redirect_uri",redirectUri)
        };
        String rs = HttpUtils.post("https://api.weibo.com/oauth2/access_token",pairs);
        AccessToken accessToken = JSON.parseObject(rs, AccessToken.class);
        if(accessToken == null || accessToken.getAccess_token() == null)
            throw new WeiboException(rs);
        return accessToken;
    }


    public String getEmail(String accessToken){
        String url ="https://api.weibo.com/2/account/profile/email.json?access_token="+accessToken;
        String rs = HttpUtils.get(url);
        if(rs.contains("error"))
            throw new WeiboException(rs);
        System.out.println(rs);
        return null;
    }
}
