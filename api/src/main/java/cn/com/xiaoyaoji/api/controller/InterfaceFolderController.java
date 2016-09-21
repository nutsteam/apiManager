package cn.com.xiaoyaoji.api.controller;

import cn.com.xiaoyaoji.api.asynctask.AsyncTaskBus;
import cn.com.xiaoyaoji.api.data.bean.InterfaceFolder;
import cn.com.xiaoyaoji.api.asynctask.log.Log;
import cn.com.xiaoyaoji.api.data.bean.Project;
import cn.com.xiaoyaoji.api.ex._HashMap;
import cn.com.xiaoyaoji.api.service.ServiceFactory;
import cn.com.xiaoyaoji.api.utils.AssertUtils;
import cn.com.xiaoyaoji.api.utils.BeanUtils;
import cn.com.xiaoyaoji.api.utils.MemoryUtils;
import cn.com.xiaoyaoji.api.utils.StringUtils;
import org.mangoframework.core.annotation.*;
import org.mangoframework.core.dispatcher.Parameter;

import java.util.Date;

/**
 * @author zhoujingjie
 * @date 2016-07-14
 */
@RequestMapping("/interfacefolder")
public class InterfaceFolderController {

    @Delete("{id}")
    public Object delete(@RequestParam("id") String id, Parameter parameter){
        String token = parameter.getParamString().get("token");
        InterfaceFolder folder = ServiceFactory.instance().getById(id,InterfaceFolder.class);
        AssertUtils.isTrue(ServiceFactory.instance().checkUserHasProjectPermission(MemoryUtils.getUser(parameter).getId(),folder.getProjectId()),"无操作权限");
        AssertUtils.notNull(folder,"该分类不存在或已删除");
        int rs = ServiceFactory.instance().deleteInterfaceFolder(id);
        AssertUtils.isTrue(rs>0,"操作失败");
        AsyncTaskBus.instance().push(Log.create(token, Log.DELETE_FOLDER,folder.getName(),folder.getProjectId()));
        AsyncTaskBus.instance().push(folder.getProjectId(), Project.Action.DELETE_FOLDER,folder.getId(),token);
        return rs;
    }
    @Get("{id}")
    public Object get(@RequestParam("id") String id, Parameter parameter){
        String token = parameter.getParamString().get("token");
        InterfaceFolder folder = ServiceFactory.instance().getById(id,InterfaceFolder.class);
        AssertUtils.notNull(folder,"无效id");
        return new _HashMap<>()
                .add("folder",folder)
                ;
    }


    @Post
    public String create(Parameter parameter) {
        String token = parameter.getParamString().get("token");
        InterfaceFolder folder = BeanUtils.convert(InterfaceFolder.class,parameter.getParamString());
        folder.setCreateTime(new Date());
        folder.setId(StringUtils.id());
        AssertUtils.notNull(folder.getModuleId(),"missing moduleId");
        AssertUtils.notNull(folder.getProjectId(),"missing projectId");
        AssertUtils.isTrue(ServiceFactory.instance().checkUserHasProjectPermission(MemoryUtils.getUser(parameter).getId(),folder.getProjectId()),"无操作权限");
        int rs = ServiceFactory.instance().create(folder);
        AssertUtils.isTrue(rs>0,"操作失败");
        AsyncTaskBus.instance().push(Log.create(token, Log.CREATE_FOLDER,folder.getName(),folder.getProjectId()));
        AsyncTaskBus.instance().push(folder.getProjectId(), Project.Action.CREATE_FOLDER,folder.getId(),token,folder.getModuleId());
        return folder.getId();
    }

    @Post("{id}")
    public int update(@RequestParam("id") String id,Parameter parameter){
        String token = parameter.getParamString().get("token");
        InterfaceFolder temp = ServiceFactory.instance().getById(id,InterfaceFolder.class);
        AssertUtils.notNull(temp,"无效id");
        AssertUtils.isTrue(ServiceFactory.instance().checkUserHasProjectPermission(MemoryUtils.getUser(parameter).getId(),temp.getProjectId()),"无操作权限");
        InterfaceFolder folder = BeanUtils.convert(InterfaceFolder.class,parameter.getParamString());
        AssertUtils.notNull(folder,"参数丢失");
        folder.setId(id);
        int rs = ServiceFactory.instance().update(folder);
        AssertUtils.isTrue(rs>0,"操作失败");
        AsyncTaskBus.instance().push(Log.create(token, Log.UPDATE_FOLDER,folder.getName(),folder.getProjectId()));
        AsyncTaskBus.instance().push(temp.getProjectId(), Project.Action.UPDATE_FOLDER,temp.getId(),token);
        return rs;
    }

    @Post("save")
    public Object save(Parameter parameter){
        String id = parameter.getParamString().get("id");
        if(org.apache.commons.lang3.StringUtils.isEmpty(id))
            return create(parameter);
        return update(id,parameter);
    }


}
