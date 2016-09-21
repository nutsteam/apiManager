package cn.com.xiaoyaoji.api.service;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import cn.com.xiaoyaoji.api.data.DataFactory;
import cn.com.xiaoyaoji.api.data.bean.*;
import cn.com.xiaoyaoji.api.utils.FileUtils;
import cn.com.xiaoyaoji.api.utils.ResultUtils;
import cn.com.xiaoyaoji.api.utils.StringUtils;

/**
 * @author: zhoujingjie
 * @Date: 16/5/15
 */
public class ServiceFactory {
    private static ServiceFactory instance;

    static {
        instance = new ServiceFactory();
    }

    public static ServiceFactory instance() {
        return instance;
    }

    public int create(Object instance) {
        return DataFactory.instance().insert(instance);
    }

    public int update(Object instance) {
        return DataFactory.instance().update(instance);
    }

    public int delete(Object instance) {
        return DataFactory.instance().delete(instance);
    }

    public int delete(String tableName, String id) {
        return DataFactory.instance().delete(tableName, id);
    }

    /**
     * 删除数据与图片
     * @param tableName
     * @param id
     * @param imgFields
     * @return
     */
    public int deleteWithImage(String tableName, String id, String... imgFields) {
        Map<String, Object> map = DataFactory.instance().getById(tableName, id);
        if (map == null)
            return 0;
        if (imgFields != null && imgFields.length > 0) {
            for (String field : imgFields) {
                try {
                    FileUtils.delete((String) map.get(field));
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
        return DataFactory.instance().delete(tableName, id);
    }
    public int updateAndImage(Object instance,String... imgKeys) {
        return DataFactory.instance().updateAndImage(instance,imgKeys);
    }

    public User login(String email, String password) {
        User user = DataFactory.instance().login(email,password);
        if(user != null){
            initUserThirdlyBinds(user);
            user.setPassword(null);
        }
        return user;
    }

    public User loginByThirdparty(Thirdparty thirdparty) {
        User user = DataFactory.instance().getUserByThirdId(thirdparty.getId());
        if(user != null){
            user.setPassword(null);
            initUserThirdlyBinds(user);
        }
        return user;
    }

    public int bindUserWithThirdParty(Thirdparty thirdparty) {
        return DataFactory.instance().bindUserWithThirdParty(thirdparty);
    }



    public List<Module> getModules(String projectId) {
        return ResultUtils.list(DataFactory.instance().getModules(projectId));
    }

    public List<Interface> getInterface(String folderId) {
        return ResultUtils.list(DataFactory.instance().getInterface(folderId));
    }

    public List<Interface> getInterfacesByModuleId(String moduleId) {
        return ResultUtils.list(DataFactory.instance().getInterfacesByModuleId(moduleId));
    }

    public int updateInterfaceFolder(String moduleId, String originalName, String newName) {
        return DataFactory.instance().updateInterfaceFolder(moduleId,originalName,newName);
    }

    public int deleteInterface(String moduleId, String folderId) {
        return DataFactory.instance().deleteInterface(moduleId,folderId);
    }

    public int deleteModule(String id) {
        return DataFactory.instance().deleteModule(id);
    }

    public List<InterfaceFolder> getFolders(String moduleId) {
        return ResultUtils.list(DataFactory.instance().getFolders(moduleId));
    }

    public int deleteInterfaceFolder(String id) {
        return DataFactory.instance().deleteInterfaceFolder(id);
    }

    public List<Team> getTeams(String userId) {
        return ResultUtils.list(DataFactory.instance().getTeams(userId));
    }

    /**
     * @see #getProject(String)
     * @param teamId
     * @param userId
     * @return
     */
    @Deprecated
    public List<Project> getProjects(String teamId,String userId) {
        return ResultUtils.list(DataFactory.instance().getProjects(userId));
    }
    public List<Project> getProjects(String userId) {
        return ResultUtils.list(DataFactory.instance().getProjects(userId));
    }


    public List<User> getUsersByProjectId(String projectId){
        return ResultUtils.list(DataFactory.instance().getUsersByProjectId(projectId));
    }
    public List<User> getAllProjectUsersByUserId(String userId){
        return ResultUtils.list(DataFactory.instance().getAllProjectUsersByUserId(userId));
    }


    public int deleteTeam(String id) {
        return DataFactory.instance().deleteTeam(id);
    }

    public int deleteProject(String id) {
        return DataFactory.instance().deleteProject(id);
    }

    public List<User> searchUsers(String key,String... excludeIds) {
        return ResultUtils.list(DataFactory.instance().searchUsers(key,excludeIds));
    }

    public Project getProject(String id) {
        return DataFactory.instance().getById(Project.class,id);
    }

    public boolean checkEmailExists(String email) {
        return DataFactory.instance().checkEmailExists(email);
    }

    public boolean checkProjectUserExists(String projectId, String userId) {
        return DataFactory.instance().checkProjectUserExists(projectId,userId);
    }

    public int deleteProjectUser(String projectId, String userId) {
        return DataFactory.instance().deleteProjectUser(projectId,userId);
    }

    public List<InterfaceFolder> getFoldersByProjectId(String projectId) {
        return ResultUtils.list(DataFactory.instance().getFoldersByProjectId(projectId));
    }

    public List<Interface> getInterfacesByProjectId(String projectId) {
        return ResultUtils.list(DataFactory.instance().getInterfacesByProjectId(projectId));
    }
    public String getUserIdByEmail(String email) {
        return DataFactory.instance().getUserIdByEmail(email);
    }

    public int createProjectUserRelation(String userId, String projectId) {
        if(!checkProjectUserExists(projectId,userId)) {
            ProjectUser pu = new ProjectUser();
            pu.setUserId(userId);
            pu.setId(StringUtils.id());
            pu.setCreateTime(new Date());
            pu.setProjectId(projectId);
            pu.setStatus(ProjectUser.Status.ACCEPTED);
            return create(pu);
        }
        return 0;
    }

    public <T> T getById(String id,Class<T> clazz) {
        return DataFactory.instance().getById(clazz,id);
    }


    public int findPassword(String id, String email, String password) {
        return DataFactory.instance().findPassword(id,email,password);
    }

    public boolean checkUserHasProjectPermission(String userId, String projectId) {
        return DataFactory.instance().checkUserHasProjectPermission(userId,projectId);
    }

    public int importFromRap(Project project, List<Module> modules, List<InterfaceFolder> folders, List<Interface> interfaces) {
        return DataFactory.instance().importFromRap(project,modules,folders,interfaces);
    }

    public void initUserThirdlyBinds(User user) {
        DataFactory.instance().initUserThirdlyBinds(user);
    }

    public int copyFolder(String folderId, String moduleId) {
        return DataFactory.instance().copyFolder(folderId,moduleId);
    }

    public int unbindUserThirdPartyRelation(String userId, String type) {
        return DataFactory.instance().removeUserThirdPartyRelation(userId,type);
    }

    public int createProject(Project project) {
        return DataFactory.instance().createProject(project);
    }

    public String getProjectName(String projectId) {
        return DataFactory.instance().getProjectName(projectId);
    }
    public String getInterfaceFolderName(String folderId) {
        return DataFactory.instance().getInterfaceFolderName(folderId);
    }
    public String getModuleName(String moduleId) {
        return DataFactory.instance().getModuleName(moduleId);
    }
    public String getInterfaceName(String interfaceId) {
        return DataFactory.instance().getInterfaceName(interfaceId);
    }

}
