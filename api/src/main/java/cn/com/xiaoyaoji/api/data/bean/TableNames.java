package cn.com.xiaoyaoji.api.data.bean;


import cn.com.xiaoyaoji.api.utils.SqlUtils;

/**
 * @author: zhoujingjie
 * @Date: 16/5/11
 */
public interface TableNames {

    String IMAGE="image";
    String USER = SqlUtils.getTableName(User.class);

    String USER_THIRD = "user_third";

    String INTERFACES = SqlUtils.getTableName(Interface.class);

    String MODULES = SqlUtils.getTableName(Module.class);

    String INTERFACE_FOLDER=SqlUtils.getTableName(InterfaceFolder.class);

    String TEAM=SqlUtils.getTableName(Team.class);

    String PROJECT=SqlUtils.getTableName(Project.class);

    String PROJECT_LOG=SqlUtils.getTableName(ProjectLog.class);
    //
    String PROJECT_USER=SqlUtils.getTableName(ProjectUser.class);
    //
    String FIND_PASSWORD =SqlUtils.getTableName(FindPassword.class);
}
