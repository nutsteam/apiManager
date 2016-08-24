package cn.com.xiaoyaoji.api.controller;

import cn.com.xiaoyaoji.api.annotations.Ignore;
import cn.com.xiaoyaoji.api.data.bean.*;
import cn.com.xiaoyaoji.api.ex.Handler;
import cn.com.xiaoyaoji.api.ex.Message;
import cn.com.xiaoyaoji.api.ex._HashMap;
import cn.com.xiaoyaoji.api.message.MessageBus;
import cn.com.xiaoyaoji.api.service.ServiceFactory;
import cn.com.xiaoyaoji.api.utils.*;
import cn.com.xiaoyaoji.api.utils.StringUtils;
import org.mangoframework.core.annotation.*;
import org.mangoframework.core.dispatcher.Parameter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * //todo 权限验证
 * 项目
 *
 * @author zhoujingjie
 * @date 2016-07-20
 */
@RequestMapping("/project")
public class ProjectController {


    @Get("list")
    public Object list(Parameter parameter) {
        User user = MemoryUtils.getUser(parameter.getParamString().get("token"));
        List<Project> projects=new ArrayList<>();
        if(user!=null) {
            String userId = user.getId();
            projects = ServiceFactory.instance().getProjects(userId);
        }
        return new _HashMap<>()
                .add("projects", projects);

    }

    /**
     * 查询单个module对应的接口
     *
     * @param id
     * @return
     */
    @Ignore
    @Get(value = "{id}", template = "/api")
    public Object get(@RequestParam("id") String id, Parameter parameter) {
        Project project = ServiceFactory.instance().getProject(id);
        if (project == null || !Project.Status.VALID.equals(project.getStatus())) {
            return new _HashMap<>();
        }
        if(project.getPermission().equals(Project.Permission.PRIVATE)){
            User user = MemoryUtils.getUser(parameter);
            AssertUtils.isTrue(user!=null,"无访问权限");
            if(!user.getId().equals(project.getUserId())){
                AssertUtils.isTrue(ServiceFactory.instance().checkUserHasProjectPermission(user.getId(),project.getId()),"无访问权限");
            }
        }
        List<Module> modules = ServiceFactory.instance().getModules(id);
        List<InterfaceFolder> folders = null;
        if (modules.size() > 0) {
            //获取该项目下所有文件夹
            folders = ServiceFactory.instance().getFoldersByProjectId(project.getId());
            Map<String, List<InterfaceFolder>> folderMap = ResultUtils.listToMap(folders, new Handler<InterfaceFolder>() {
                @Override
                public String key(InterfaceFolder item) {
                    return item.getModuleId();
                }
            });
            for (Module module : modules) {
                List<InterfaceFolder> temp = folderMap.get(module.getId());
                if (temp != null) {
                    module.setFolders(temp);
                }
            }

            //获取该项目下所有接口
            List<Interface> interfaces = ServiceFactory.instance().getInterfacesByProjectId(project.getId());
            Map<String, List<Interface>> interMap = ResultUtils.listToMap(interfaces, new Handler<Interface>() {
                @Override
                public String key(Interface item) {
                    return item.getFolderId();
                }
            });
            for (InterfaceFolder folder : folders) {
                List<Interface> temp = interMap.get(folder.getId());
                if (temp != null) {
                    folder.setChildren(temp);
                }
            }
        } else {
            Module module = createDefaultModule(project.getId());
            modules = new ArrayList<>();
            modules.add(module);
        }
        return new _HashMap<>()
                .add("modules", modules)
                .add("project", project)
                ;
    }


    @Get("/{id}/info")
    public Object info(@RequestParam("id") String id) {
        Project project = ServiceFactory.instance().getProject(id);
        AssertUtils.isTrue(project != null, "project is null");
        return new _HashMap<>()
                .add("project", project);
    }


    private Module createDefaultModule(String projectId) {
        Module module = new Module();
        module.setLastUpdateTime(new Date());
        module.setCreateTime(new Date());
        module.setId(StringUtils.id());
        module.setProjectId(projectId);
        module.setName("默认模块");
        module.setHost("");
        int rs = ServiceFactory.instance().create(module);
        AssertUtils.isTrue(rs > 0, Message.OPER_ERR);
        return module;
    }

    @Get("/{id}/users")
    public Object getUsers(@RequestParam("id") String id, Parameter parameter) {
        List<User> users = ServiceFactory.instance().getUsersByProjectId(id);
        return new _HashMap<>()
                .add("users", users)
                .add("fileAccess", ConfigUtils.getFileAccessURL())
                ;
    }


    @Post
    public Object create(Parameter parameter) {
        String token = parameter.getParamString().get("token");
        User user = MemoryUtils.getUser(token);
        Project project = BeanUtils.convert(Project.class, parameter.getParamString());
        project.setId(StringUtils.id());
        project.setCreateTime(new Date());
        project.setUserId(user.getId());
        project.setStatus(Project.Status.VALID);
        AssertUtils.notNull(project.getName(), "missing name");
        //AssertUtils.notNull(project.getTeamId(),"missing teamId");
        AssertUtils.notNull(project.getUserId(), "missing userId");
        int rs = ServiceFactory.instance().create(project);
        AssertUtils.isTrue(rs > 0, Message.OPER_ERR);
        rs = ServiceFactory.instance().createProjectUserRelation(user.getId(),project.getId());
        return project.getId();
    }
    private void checkUserHasEditPermission(String projectId,Parameter parameter){
        User user = MemoryUtils.getUser(parameter);
        AssertUtils.notNull(user,"无操作权限");
        boolean permission = ServiceFactory.instance().checkUserHasProjectPermission(user.getId(),projectId);
        AssertUtils.isTrue(permission,"无操作权限");
    }

    private void checkUserHasOperatePermission(String projectId,Parameter parameter){
        User user = MemoryUtils.getUser(parameter);
        AssertUtils.notNull(user,"无操作权限");
        Project project = ServiceFactory.instance().getProject(projectId);
        AssertUtils.notNull(project,"项目不存在");
        AssertUtils.notNull(user.getId().equals(project.getUserId()),"无操作权限");
    }


    @Post("{id}")
    public Object update(@RequestParam("id") String id, Parameter parameter) {
        checkUserHasEditPermission(id,parameter);
        Project project = BeanUtils.convert(Project.class, parameter.getParamString());
        project.setId(id);
        project.setUserId(null);
        int rs = ServiceFactory.instance().update(project);
        AssertUtils.isTrue(rs > 0, Message.OPER_ERR);
        return rs;
    }

    @Post("/{id}/transfer")
    public Object transfer(@RequestParam("id") String id, Parameter parameter) {
        String userId = parameter.getParamString().get("userId");
        AssertUtils.isTrue(org.apache.commons.lang3.StringUtils.isNoneBlank(userId),"missing userId");
        checkUserHasOperatePermission(id,parameter);
        Project temp = new Project() ;
        temp.setId(id);
        temp.setUserId(userId);
        int rs = ServiceFactory.instance().update(temp);
        AssertUtils.isTrue(rs > 0, Message.OPER_ERR);
        return rs;
    }



    @Delete("{id}")
    public Object delete(@RequestParam("id") String id, Parameter parameter) {
        checkUserHasOperatePermission(id,parameter);
        int rs = ServiceFactory.instance().deleteProject(id);
        AssertUtils.isTrue(rs > 0, Message.OPER_ERR);
        return rs;
    }

    @Post("save")
    public Object save(Parameter parameter) {
        String id = parameter.getParamString().get("id");
        if (org.apache.commons.lang3.StringUtils.isEmpty(id)) {
            return create(parameter);
        }
        checkUserHasOperatePermission(id,parameter);
        return update(id, parameter);
    }

    /**
     * 邀请成员
     *
     * @param id
     * @param parameter
     * @return
     */
    @Post("/{id}/invite")
    public String invite(@RequestParam("id") String id, Parameter parameter) {
        User user = MemoryUtils.getUser(parameter);
        ProjectUser pu = new ProjectUser();
        pu.setId(StringUtils.id());
        pu.setUserId(parameter.getParamString().get("userId"));
        AssertUtils.isTrue(org.apache.commons.lang3.StringUtils.isNotBlank(pu.getUserId()), "missing userId");
        AssertUtils.isTrue(!ServiceFactory.instance().checkProjectUserExists(id, pu.getUserId()), "用户已存在该项目中");
        AssertUtils.isTrue(!pu.getUserId().equals(user.getId()), "不能邀请自己");
        pu.setCreateTime(new Date());
        pu.setStatus(ProjectUser.Status.PENDING);
        pu.setProjectId(id);
        int rs = ServiceFactory.instance().create(pu);
        AssertUtils.isTrue(rs > 0, Message.OPER_ERR);
        MessageBus.instance().push("PROJECT.INVITE", pu.getProjectId(), new String[]{pu.getUserId()});
        return pu.getId();
    }

    /**
     * 邀请成员
     *
     * @param id
     * @param parameter
     * @return
     */
    @Post("/{id}/invite/email")
    public String inviteByEmail(@RequestParam("id") String id, Parameter parameter) {
        String email = parameter.getParamString().get("email");
        String userId = ServiceFactory.instance().getUserIdByEmail(email);
        AssertUtils.isTrue(userId != null, "该邮箱未注册");
        User user = MemoryUtils.getUser(parameter);
        AssertUtils.isTrue(!userId.equals(user.getId()), "不能邀请自己");
        AssertUtils.isTrue(!ServiceFactory.instance().checkProjectUserExists(id, userId), "用户已存在该项目中");

        ProjectUser pu = new ProjectUser();
        pu.setId(StringUtils.id());
        pu.setUserId(userId);
        pu.setProjectId(id);
        AssertUtils.isTrue(org.apache.commons.lang3.StringUtils.isNotBlank(pu.getProjectId()), "missing projectId");
        pu.setCreateTime(new Date());
        pu.setStatus(ProjectUser.Status.PENDING);
        int rs = ServiceFactory.instance().create(pu);
        AssertUtils.isTrue(rs > 0, Message.OPER_ERR);
        MessageBus.instance().push("PROJECT.INVITE", pu.getProjectId(), new String[]{pu.getUserId()});
        return pu.getId();
    }


    /**
     * 接受邀请
     *
     * @param inviteId
     * @return
     */
    @Post("/{id}/pu/{inviteId}/accept")
    public int acceptInvite(@RequestParam("inviteId") String inviteId) {
        ProjectUser pu = new ProjectUser();
        pu.setId(inviteId);
        pu.setStatus(ProjectUser.Status.ACCEPTED);
        int rs = ServiceFactory.instance().create(pu);
        AssertUtils.isTrue(rs > 0, Message.OPER_ERR);
        return rs;
    }

    /**
     * 拒绝邀请
     */
    @Post("/{id}/pu/{inviteId}/refuse")
    public int acceptRefuse(@RequestParam("inviteId") String inviteId) {
        ProjectUser pu = new ProjectUser();
        pu.setId(inviteId);
        pu.setStatus(ProjectUser.Status.REFUSED);
        int rs = ServiceFactory.instance().create(pu);
        AssertUtils.isTrue(rs > 0, Message.OPER_ERR);
        MessageBus.instance().push("PROJECT.INVITE.REFUSE", pu.getProjectId(), pu.getUserId());
        return rs;
    }


    /**
     * 移除成员
     *
     * @param userId    userId
     * @param id projectId
     * @param parameter
     * @return
     */
    @Delete("/{id}/pu/{userId}")
    public int removeMember(@RequestParam("id") String id, @RequestParam("userId") String userId, Parameter parameter) {
        checkUserHasOperatePermission(id,parameter);
        Project project = ServiceFactory.instance().getProject(id);
        AssertUtils.notNull(project,"项目不存在");
        AssertUtils.isTrue(!project.getUserId().equals(userId),"不能移除自己");
        int rs = ServiceFactory.instance().deleteProjectUser(id, userId);
        AssertUtils.isTrue(rs > 0, Message.OPER_ERR);
        return rs;
    }

    /**
     * 退出项目
     * @param id
     * @param parameter
     * @return
     */
    @Delete("/{id}/quit")
    public int quit(@RequestParam("id") String id,Parameter parameter) {
        Project project = ServiceFactory.instance().getProject(id);
        AssertUtils.notNull(project,"project not exists");
        String userId=MemoryUtils.getUser(parameter).getId();
        AssertUtils.isTrue(!project.getUserId().equals(userId),"项目所有人不能退出项目");
        int rs = ServiceFactory.instance().deleteProjectUser(id, userId);
        AssertUtils.isTrue(rs > 0, Message.OPER_ERR);
        return rs;
    }


}
