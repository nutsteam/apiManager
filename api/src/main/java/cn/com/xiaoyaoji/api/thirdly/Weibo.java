package cn.com.xiaoyaoji.api.thirdly;

import cn.com.xiaoyaoji.api.thirdly.weibo.User;
import cn.com.xiaoyaoji.api.thirdly.weibo.WeiboException;
import cn.com.xiaoyaoji.api.utils.HttpUtils;
import com.alibaba.fastjson.JSON;

/**
 * @author zhoujingjie
 * @date 2016-07-28
 */
public class Weibo {

    public User showUser(String accessToken, String uid){
        String rs = HttpUtils.get("https://api.weibo.com/2/users/show.json?access_token="+accessToken+"&uid="+uid);
        if(rs.contains("error_code")){
            throw new WeiboException(rs);
        }
        return JSON.parseObject(rs,User.class);
    }

}
