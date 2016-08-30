package cn.com.xiaoyaoji.api.message;

/**
 * @author zhoujingjie
 * @date 2016-07-26
 */
public class MessageNotify {

    @Message("PROJECT.INVITE")
    public void projectInviteUser(String projectId,String[] userIds){
        System.out.println("project:{},userId:");
    }

}
