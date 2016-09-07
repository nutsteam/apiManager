package cn.com.xiaoyaoji.api.data;

import java.io.IOException;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.*;

import cn.com.xiaoyaoji.api.data.bean.*;
import cn.com.xiaoyaoji.api.ex.SQLBuildResult;
import cn.com.xiaoyaoji.api.handler.IntegerResultHandler;
import cn.com.xiaoyaoji.api.handler.StringResultHandler;
import cn.com.xiaoyaoji.api.utils.*;
import cn.com.xiaoyaoji.api.utils.StringUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.MapHandler;
import org.apache.commons.lang3.*;
import org.apache.log4j.Logger;

/**
 * @author: zhoujingjie
 * @Date: 16/5/2
 */
public class DataFactory implements Data {
    private static Logger logger = Logger.getLogger(DataFactory.class);
    private static Data instance;

    static {
        final DataFactory impl = new DataFactory();
        instance = (Data) Proxy.newProxyInstance(impl.getClass().getClassLoader(), impl.getClass().getInterfaces(), new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                try {
                    return method.invoke(impl, args);
                } catch (IllegalAccessException e) {
                    return e;
                } catch (IllegalArgumentException e) {
                    return e;
                } catch (InvocationTargetException e) {
                    throw e.getTargetException();
                }
            }
        });
    }

    private DataFactory() {}

    public static Data instance() {
        return instance;
    }

    private <T> T process(Handler<T> handler) {
        Connection connection = null;
        try {
            connection = JdbcUtils.getConnect();
            QueryRunner qr = new MyQueryRunner();
            T data = handler.handle(connection, qr);
            JdbcUtils.commit(connection);
            return data;
        } catch (Exception e) {
            if (connection != null) {
                try {
                    connection.rollback();
                } catch (SQLException e1) {
                    e1.printStackTrace();
                }
            }
            logger.error(e.getMessage(), e);
            // DbUtils.rollbackAndCloseQuietly(connection);
            throw new RuntimeException(e.getMessage());
        } finally {
            JdbcUtils.close(connection);
        }
    }

    public Connection getConnection() {
        try {
            return JdbcUtils.getConnect();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public QueryRunner getQueryRunner(){
        return new MyQueryRunner();
    }


    @Override
    public int insert(final Object instance) {
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                SQLBuildResult sb = SqlUtils.generateInsertSQL(instance);
                return qr.update(connection, sb.getSql(), sb.getParams());
            }
        });
    }

    @Override
    public int update(final Object instance) {
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                SQLBuildResult sb = SqlUtils.generateUpdateSQL(instance);
                return qr.update(connection, sb.getSql(), sb.getParams());
            }
        });
    }

    @Override
    public int delete(final Object instance) {
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                SQLBuildResult sb = SqlUtils.generateDeleteSQL(instance);
                return qr.update(connection, sb.getSql(), sb.getParams());
            }
        });
    }

    @Override
    public int delete(final String tableName, final String id) {
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                return qr.update(connection, "delete from " + tableName + " where id =?", id);
            }
        });
    }

    private String getId(Object instance) {
        try {
            return (String) instance.getClass().getMethod("getId").invoke(instance);
        } catch (IllegalAccessException | NoSuchMethodException e) {
            throw new RuntimeException(e);
        } catch (InvocationTargetException e) {
            throw new RuntimeException(e.getTargetException());
        }
    }

    @Override
    public Map<String, Object> getById(final String tableName, final String id) {
        return process(new Handler<Map<String, Object>>() {
            @Override
            public Map<String, Object> handle(Connection connection, QueryRunner qr) throws SQLException {
                String sql = "select * from " + tableName + " where id = ?";
                return qr.query(connection, sql, new MapHandler(), id);
            }
        });
    }

    @Override
    public <T> T getById(final Class<T> clazz, final String id) {
        return process(new Handler<T>() {
            @Override
            public T handle(Connection connection, QueryRunner qr) throws SQLException {
                String sql = "select * from " + SqlUtils.getTableName(clazz) + " where id = ?";
                return qr.query(connection, sql, new BeanHandler<>(clazz), id);
            }
        });
    }


    @Override
    public User login(final String email, final String password) {
        return process(new Handler<User>() {
            @Override
            public User handle(Connection connection, QueryRunner qr) throws SQLException {
                String sql = "select * from user where email=? and password=?";
                return qr.query(connection, sql, new BeanHandler<>(User.class), email, password);
            }
        });
    }

    @Override
    public int updateAndImage(final Object instance, final String... imgKeys) {
        final Map<String, Object> temp = getById(SqlUtils.getTableName(instance.getClass()), getId(instance));
        if (temp == null)
            return 0;
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                SQLBuildResult sb = SqlUtils.generateUpdateSQL(instance);
                int rs = qr.update(connection, sb.getSql(), sb.getParams());
                if (imgKeys != null && imgKeys.length != 0) {
                    for (String imgKey : imgKeys) {
                        try {
                            FileUtils.delete((String) temp.get(imgKey));
                        } catch (IOException e) {
                            // throw new RuntimeException(e);
                        }
                    }
                }
                return rs;
            }
        });
    }

    @Override
    public User getUserByThirdId(final String thirdId) {
        return process(new Handler<User>() {
            @Override
            public User handle(Connection connection, QueryRunner qr) throws SQLException {
                String sql = "select * from " + TableNames.USER + " where id = (select userid from " + TableNames.USER_THIRD + " where id=?)";
                return qr.query(connection, sql, new BeanHandler<>(User.class), thirdId);
            }
        });
    }

    @Override
    public int bindUserWithThirdParty(final Thirdparty thirdparty) {
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                User user = getById(User.class,thirdparty.getUserId());
                AssertUtils.notNull(user,"无效用户");
                //检查是否绑定
                int rs = qr.query(connection,"select count(id) from "+TableNames.USER_THIRD+" where userId=? and type=? and id =?",new IntegerResultHandler(),thirdparty.getUserId(),thirdparty.getType(),thirdparty.getId());
                if(rs == 1)
                    return rs;
                // 创建第三方
                StringBuilder thirdSql = new StringBuilder("insert into ");
                thirdSql.append(TableNames.USER_THIRD);
                thirdSql.append(" (id,userid,type) values(?,?,?)");
                rs = qr.update(connection, thirdSql.toString(), thirdparty.getId(), thirdparty.getUserId(),thirdparty.getType());
                if(rs>0){
                    if(org.apache.commons.lang3.StringUtils.isBlank(user.getAvatar())){

                    }
                }
                return rs;
            }
        });
    }

    @Override
    public List<Module> getModules(final String projectId) {
        return process(new Handler<List<Module>>() {
            @Override
            public List<Module> handle(Connection connection, QueryRunner qr) throws SQLException {
                StringBuilder sql = new StringBuilder();
                sql.append("select * from "+TableNames.MODULES);
                sql.append(" where projectId=?");
                sql.append(" order by createTime asc ");
                return qr.query(connection,sql.toString(),new BeanListHandler<>(Module.class),projectId);
            }
        });
    }

    @Override
    public List<Interface> getInterface(final String folderId) {
        return process(new Handler<List<Interface>>() {
            @Override
            public List<Interface> handle(Connection connection, QueryRunner qr) throws SQLException {
                StringBuilder sql = new StringBuilder();
                sql.append("select * from "+TableNames.INTERFACES);
                sql.append(" where folderId=?");
                sql.append(" order by createTime asc ");
                return qr.query(connection,sql.toString(),new BeanListHandler<>(Interface.class),folderId);
            }
        });
    }

    @Override
    public int updateInterfaceFolder(final String moduleId, final String originalName, final String newName) {
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                StringBuilder sql = new StringBuilder();
                sql.append("update "+TableNames.INTERFACES);
                sql.append(" set folder=? where moduleId=? and folder=?");
                return qr.update(connection,sql.toString(),newName,moduleId,originalName);
            }
        });
    }

    @Override
    public int deleteInterface(final String moduleId, final String folderId) {
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                qr.update(connection,"delete from "+TableNames.INTERFACE_FOLDER+" where id = ?",folderId);
                StringBuilder sql = new StringBuilder();
                sql.append("delete from "+TableNames.INTERFACES);
                sql.append("where moduleId=? and folderId=?");
                return qr.update(connection,sql.toString(),moduleId,folderId);
            }
        });
    }

    @Override
    public int deleteModule(final String id) {
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                int rs = qr.update(connection,"delete from "+TableNames.MODULES+" where id =?",id);
                rs += qr.update(connection,"delete from "+ TableNames.INTERFACES+" where moduleId=?",id);
                rs += qr.update(connection,"delete from "+TableNames.INTERFACE_FOLDER+" where moduleId=?",id);
                return rs;
            }
        });
    }

    @Override
    public List<InterfaceFolder> getFolders(final String moduleId) {
        return process(new Handler<List<InterfaceFolder>>() {
            @Override
            public List<InterfaceFolder> handle(Connection connection, QueryRunner qr) throws SQLException {
                String sql = "select * from "+TableNames.INTERFACE_FOLDER+" where moduleId=? order by createTime asc";
                return qr.query(connection,sql,new BeanListHandler<>(InterfaceFolder.class),moduleId);
            }
        });
    }

    @Override
    public int deleteInterfaceFolder(final String id) {
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                int rs =qr.update(connection,"delete from "+TableNames.INTERFACE_FOLDER+" where id=?",id);
                rs += qr.update(connection,"delete from "+ TableNames.INTERFACES+" where folderId=?",id);
                return rs;
            }
        });
    }

    @Override
    public List<Team> getTeams(final String userId) {
        return process(new Handler<List<Team>>() {
            @Override
            public List<Team> handle(Connection connection, QueryRunner qr) throws SQLException {
                StringBuilder sql = new StringBuilder("select t.* from ")
                        .append(TableNames.TEAM)
                        .append(" t left join team_user tu on tu.teamId=t.id ")
                        .append(" where tu.userId=? or t.userId=?")
                        .append(" order by tu.createTime desc,t.createTime desc ");

                return qr.query(connection,sql.toString(),new BeanListHandler<>(Team.class),userId,userId);
            }
        });
    }

    @Override
    public List<Project> getProjects(final String userId) {
        return process(new Handler<List<Project>>() {
            @Override
            public List<Project> handle(Connection connection, QueryRunner qr) throws SQLException {
                StringBuilder sql = new StringBuilder("select DISTINCT p.*,u.nickname userName from ").append(TableNames.PROJECT)
                        .append(" p left join user u on u.id = p.userId ")
                        .append(" left join project_user pu on pu.projectId = p.id ")
                        .append("  where (p.userId=? or pu.userId=?) and p.status='VALID'")
                        .append(" order by createTime asc")
                        ;
                return qr.query(connection,sql.toString(),new BeanListHandler<>(Project.class),userId,userId);
            }
        });
    }

    @Override
    public List<User> getUsersByProjectId(final String projectId) {
        return process(new Handler<List<User>>() {
            @Override
            public List<User> handle(Connection connection, QueryRunner qr) throws SQLException {
                StringBuilder sql = new StringBuilder("select u.id,u.nickname,u.avatar,email from user u left join project_user pu on pu.userId=u.id where pu.projectId=?");
                return qr.query(connection,sql.toString(),new BeanListHandler<>(User.class),projectId);
            }
        });
    }

    @Override
    public List<User> getAllProjectUsersByUserId(final String userId) {
        return process(new Handler<List<User>>() {
            @Override
            public List<User> handle(Connection connection, QueryRunner qr) throws SQLException {
                StringBuilder sql = new StringBuilder("select u.id,u.nickname,avatar,email from "+TableNames.USER+" u \n" +
                        "where u.id in (\n" +
                        "\tselect userId from "+TableNames.PROJECT_USER+" where projectId in (\n" +
                        "\t\tselect projectId from "+TableNames.PROJECT_USER+" where userId=?\n" +
                        "\t)\n" +
                        ")\n");
                return qr.query(connection,sql.toString(),new BeanListHandler<>(User.class),userId);
            }
        });
    }

    //真删除
   /* @Override
    public int deleteTeam(final String id) {
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                //删除接口
                StringBuilder sql = new StringBuilder("delete from "+TableNames.INTERFACES+" where projectId in (\n" +
                        "\tselect id from project where teamId= ?\n" +
                        ")");
                int rs = qr.update(connection,sql.toString(),id);
                //删除接口文件夹
                sql = new StringBuilder("delete from "+TableNames.INTERFACE_FOLDER+" where projectId in (\n" +
                        "\tselect id from project where teamId= ?\n" +
                        ")");
                rs += qr.update(connection,sql.toString(),id);
                //删除项目操作日志
                sql = new StringBuilder("delete from "+TableNames.PROJECT_LOG+" where projectId in (\n" +
                        "\tselect id from project where teamId= ?\n" +
                        ")");
                rs += qr.update(connection,sql.toString(),id);
                //删除项目与用户关联
                sql = new StringBuilder("delete from project_user where projectId in (\n" +
                        "\tselect id from project where teamId= ?\n" +
                        ")");
                rs += qr.update(connection,sql.toString(),id);
                //删除团队与用户关联
                sql = new StringBuilder("delete from team_user where teamId=?");
                rs += qr.update(connection,sql.toString(),id);
                //删除项目
                sql = new StringBuilder("delete from "+TableNames.PROJECT+" where teamId = ?");
                rs += qr.update(connection,sql.toString(),id);
                //删除团队
                sql = new StringBuilder("delete from "+TableNames.TEAM+" where id = ?");
                rs += qr.update(connection,sql.toString(),id);
                return rs;
            }
        });
    }
    */
    //假删除
   @Override
    public int deleteTeam(final String id) {
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                StringBuilder sql = new StringBuilder("update "+TableNames.TEAM+" set status=? where id =?");
                int rs= qr.update(connection,sql.toString(),Team.Status.INVALID,id);
                sql = new StringBuilder("update "+TableNames.PROJECT+" set status=? where teamId=?");
                rs+= qr.update(connection,sql.toString(),Team.Status.INVALID,id);
                return rs;
            }
        });
    }

    /**
     * //删除项目
     * @param id
     * @return
     */
    @Override
    public int deleteProject(final String id) {
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                //删除项目
                //删除文件夹
                //删除接口
                //删除项目与用户关联
                //todo 删除项目消息内容
                //删除项目日志
                StringBuilder sql = new StringBuilder("update "+TableNames.PROJECT+" set status=? where id=?");
                int rs = qr.update(connection,sql.toString(),Team.Status.INVALID,id);
                return rs;
            }
        });
    }

    @Override
    public List<User> searchUsers(final String key,final String... excludeIds) {
        return process(new Handler<List<User>>() {
            @Override
            public List<User> handle(Connection connection, QueryRunner qr) throws SQLException {
                String n = '%'+key+'%';
                StringBuilder _excludeIds_ =new StringBuilder("\'\',");
                if(excludeIds!=null && excludeIds.length>0){
                    for(String id:excludeIds){
                        _excludeIds_.append("\'");
                        _excludeIds_.append(id);
                        _excludeIds_.append("\'");
                        _excludeIds_.append(",");
                    }
                }
                _excludeIds_ = _excludeIds_.delete(_excludeIds_.length()-1,_excludeIds_.length());
                StringBuilder sql = new StringBuilder("select id,email,nickname from user where  id not in("+_excludeIds_+") and nickname like ? order by length(nickname) asc limit 5");
                return qr.query(connection,sql.toString(),new BeanListHandler<>(User.class),n);
            }
        });
    }

    @Override
    public boolean checkEmailExists(final String email) {
        return process(new Handler<Boolean>() {
            @Override
            public Boolean handle(Connection connection, QueryRunner qr) throws SQLException {
                return qr.query(connection,"select count(id) from "+TableNames.USER+" where email=?",new IntegerResultHandler(),email)>0;
            }
        });
    }

    @Override
    public boolean checkProjectUserExists(final String projectId, final String userId) {
        return process(new Handler<Boolean>() {
            @Override
            public Boolean handle(Connection connection, QueryRunner qr) throws SQLException {
                return qr.query(connection,"select count(id) from "+TableNames.PROJECT_USER+" where projectId=? and userId=?",new IntegerResultHandler(),projectId,userId)>0;
            }
        });
    }

    @Override
    public int deleteProjectUser(final String projectId, final String userId) {
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                String sql = "delete from "+TableNames.PROJECT_USER+" where projectId=? and userId=?";
                return qr.update(connection,sql,projectId,userId);
            }
        });
    }

    @Override
    public List<Interface> getInterfacesByModuleId(final String moduleId) {
        return process(new Handler<List<Interface>>() {
            @Override
            public List<Interface> handle(Connection connection, QueryRunner qr) throws SQLException {
                StringBuilder sql = new StringBuilder("select * from ").append(TableNames.INTERFACES);
                sql.append(" where moduleId=? order by createTime asc");
                return qr.query(connection,sql.toString(),new BeanListHandler<>(Interface.class),moduleId);
            }
        });
    }

    @Override
    public List<InterfaceFolder> getFoldersByProjectId(final String projectId) {
        return process(new Handler<List<InterfaceFolder>>() {
            @Override
            public List<InterfaceFolder> handle(Connection connection, QueryRunner qr) throws SQLException {
                StringBuilder sql = new StringBuilder("select * from ").append(TableNames.INTERFACE_FOLDER)
                        .append(" where projectId=?")
                        .append(" order by createtime asc");
                return qr.query(connection,sql.toString(),new BeanListHandler<>(InterfaceFolder.class),projectId);
            }
        });
    }

    @Override
    public List<Interface> getInterfacesByProjectId(final String projectId) {
        return process(new Handler<List<Interface>>() {
            @Override
            public List<Interface> handle(Connection connection, QueryRunner qr) throws SQLException {
                StringBuilder sql = new StringBuilder("select * from ").append(TableNames.INTERFACES).append(" where projectId=? order by createtime asc");
                return qr.query(connection,sql.toString(),new BeanListHandler<>(Interface.class),projectId);
            }
        });
    }

    @Override
    public String getUserIdByEmail(final String email) {
        return process(new Handler<String>() {
            @Override
            public String handle(Connection connection, QueryRunner qr) throws SQLException {
                String sql  ="select id from "+TableNames.USER+" where email =? limit 1";
                return qr.query(connection,sql,new StringResultHandler(),email);
            }
        });
    }

    @Override
    public int findPassword(final String id, final String email, final String password) {
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                FindPassword fp = getById(FindPassword.class,id);
                AssertUtils.notNull(fp,"无效请求");
                AssertUtils.isTrue(fp.getIsUsed()==0,"该token已使用");
                AssertUtils.isTrue(fp.getEmail().equals(email),"无效token");
                String newPassword = StringUtils.password(password);
                String sql = new StringBuilder("update ").append(TableNames.USER).append(" set password=? where email=?").toString();
                int rs = qr.update(connection,sql,newPassword,email);
                rs += qr.update(connection,new StringBuilder("update ").append(TableNames.FIND_PASSWORD).append(" set isUsed=1 where id =?").toString(),id);
                return rs;
            }
        });
    }

    @Override
    public boolean checkUserHasProjectPermission(final String userId, final String projectId) {
        return process(new Handler<Boolean>() {
            @Override
            public Boolean handle(Connection connection, QueryRunner qr) throws SQLException {
                String sql = new StringBuilder("select count(id) from ").append(TableNames.PROJECT_USER).append(" where userId=? and projectId=?").toString();
                return qr.query(connection,sql,new IntegerResultHandler(),userId,projectId)>0;
            }
        });
    }

    @Override
    public int importFromRap(final Project project, final List<Module> modules, final List<InterfaceFolder> folders, final List<Interface> interfaces) {
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                SQLBuildResult sb = SqlUtils.generateInsertSQL(project);
                int rs= qr.update(connection,sb.getSql(),sb.getParams());
                ProjectUser pu = new ProjectUser();
                pu.setId(StringUtils.id());
                pu.setCreateTime(new Date());
                pu.setStatus(ProjectUser.Status.ACCEPTED);
                pu.setUserId(project.getUserId());
                pu.setProjectId(project.getId());
                sb=SqlUtils.generateInsertSQL(pu);
                rs += qr.update(connection,sb.getSql(),sb.getParams());
                for(Module m:modules){
                    sb = SqlUtils.generateInsertSQL(m);
                    rs +=qr.update(connection,sb.getSql(),sb.getParams());
                    System.out.println("rs:"+rs+" +module");
                }
                for(InterfaceFolder f:folders){
                    sb = SqlUtils.generateInsertSQL(f);
                    rs +=qr.update(connection,sb.getSql(),sb.getParams());
                    System.out.println("rs:"+rs+" +folder");
                }
                for(Interface in:interfaces){
                    sb = SqlUtils.generateInsertSQL(in);
                    rs +=qr.update(connection,sb.getSql(),sb.getParams());
                    System.out.println("rs:"+rs+" +in");
                }
                return rs;
            }
        });
    }

    @Override
    public void initUserThirdlyBinds(final User user) {
        process(new Handler<Object>() {
            @Override
            public Object handle(Connection connection, QueryRunner qr) throws SQLException {
                user.setBindQQ(qr.query(connection,"select count(id) from "+TableNames.USER_THIRD+" where userId=? and type='QQ'",new IntegerResultHandler(),user.getId())>0);
                user.setBindWeibo(qr.query(connection,"select count(id) from "+TableNames.USER_THIRD+" where userId=? and type='WEIBO'",new IntegerResultHandler(),user.getId())>0);
                user.setBindGithub(qr.query(connection,"select count(id) from "+TableNames.USER_THIRD+" where userId=? and type='GITHUB'",new IntegerResultHandler(),user.getId())>0);
                return null;
            }
        });
    }

    @Override
    public int copyFolder(String folderId, final String moduleId) {
        final InterfaceFolder folder = getById(InterfaceFolder.class,folderId);
        AssertUtils.notNull(folder,"无效分类id");
        final List<Interface> interfaces = getInterface(folderId);
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                //copy 分类
                folder.setId(StringUtils.id());
                folder.setCreateTime(new Date());
                folder.setModuleId(moduleId);
                SQLBuildResult sb = SqlUtils.generateInsertSQL(folder);
                int rs= qr.update(connection,sb.getSql(),sb.getParams());

                if(interfaces!=null && interfaces.size()>0){
                    for(Interface in: interfaces){
                        in.setId(StringUtils.id());
                        in.setFolderId(folder.getId());
                        in.setModuleId(moduleId);
                        in.setCreateTime(new Date());
                        in.setLastUpdateTime(new Date());
                        sb = SqlUtils.generateInsertSQL(in);
                        rs += qr.update(connection,sb.getSql(),sb.getParams());
                    }
                }
                return rs;
            }
        });
    }

    @Override
    public int removeUserThirdPartyRelation(final String userId, final String type) {
        return process(new Handler<Integer>() {
            @Override
            public Integer handle(Connection connection, QueryRunner qr) throws SQLException {
                return qr.update(connection,"delete from "+TableNames.USER_THIRD+" where userId=? and type=?",userId,type);
            }
        });
    }


    public void test(){
        process(new Handler<Object>() {
            @Override
            public Object handle(Connection connection, QueryRunner qr) throws SQLException {
                List<Project> projects = qr.query(connection,"select id,userid from project",new BeanListHandler<>(Project.class));
                for(Project project : projects){
                    ProjectUser pu = new ProjectUser();
                    pu.setId(StringUtils.id());
                    pu.setUserId(project.getUserId());
                    pu.setProjectId(project.getId());
                    pu.setStatus(ProjectUser.Status.ACCEPTED);
                    pu.setCreateTime(new Date());
                    SQLBuildResult sb = SqlUtils.generateInsertSQL(pu);
                    int rs = qr.update(connection,sb.getSql(),sb.getParams());
                    System.out.println(rs);
                }
                return null;
            }
        });
    }

}
