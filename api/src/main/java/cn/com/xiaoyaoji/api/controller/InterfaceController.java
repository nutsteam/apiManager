package cn.com.xiaoyaoji.api.controller;

import cn.com.xiaoyaoji.api.asynctask.AsyncTaskBus;
import cn.com.xiaoyaoji.api.asynctask.log.Log;
import cn.com.xiaoyaoji.api.data.bean.Interface;
import cn.com.xiaoyaoji.api.data.bean.Project;
import cn.com.xiaoyaoji.api.data.bean.TableNames;
import cn.com.xiaoyaoji.api.ex._HashMap;
import cn.com.xiaoyaoji.api.service.ServiceFactory;
import cn.com.xiaoyaoji.api.utils.AssertUtils;
import cn.com.xiaoyaoji.api.utils.BeanUtils;
import cn.com.xiaoyaoji.api.utils.MemoryUtils;
import cn.com.xiaoyaoji.api.utils.StringUtils;
import org.mangoframework.core.annotation.*;
import org.mangoframework.core.dispatcher.Parameter;

import java.util.*;

/**
 * @author: zhoujingjie
 * @Date: 16/7/13
 */
@RequestMapping("/interface")
public class InterfaceController {


    /**
     * 修改文件夹
     * @param
     * @param parameter
     * @return
     */
    /*@Post("{moduleId}/folder")
    public int updateFolderName(@RequestParam("moduleId") String moduleId, Parameter parameter){
        String originalName = parameter.getParamString().get("originalName");
        String newName = parameter.getParamString().get("newName");
        AssertUtils.notNull(originalName,"missing originalName");
        AssertUtils.notNull(newName,"missing newName");
        int rs= ServiceFactory.instance().updateInterfaceFolder(moduleId,originalName,newName );
        AssertUtils.isTrue(rs > 0,"修改失败");
        return rs;
    }*/


    @Get("/{id}")
    public Object get(@RequestParam("id")String id,Parameter parameter){
        Interface in = ServiceFactory.instance().getById(id,Interface.class);
        return new _HashMap<>()
                .add("interface",in);
    }
    /**
     * 新增
     * @param parameter
     * @return
     */
    @Post
    public String createInterface(Parameter parameter){
        String token = parameter.getParamString().get("token");
        Interface in = BeanUtils.convert(Interface.class,parameter.getParamString());
        AssertUtils.notNull(in.getModuleId(),"missing moduleId");
        AssertUtils.notNull(in.getProjectId(),"missing projectId");
        AssertUtils.notNull(in.getFolderId(),"missing folderId");
        AssertUtils.isTrue(ServiceFactory.instance().checkUserHasProjectPermission(MemoryUtils.getUser(parameter).getId(),in.getProjectId()),"无操作权限");
        in.setLastUpdateTime(new Date());
        in.setCreateTime(new Date());
        in.setId(StringUtils.id());
        int rs = ServiceFactory.instance().create(in);
        AssertUtils.isTrue(rs>0,"增加失败");
        AsyncTaskBus.instance().push(Log.create(parameter.getParamString().get("token"), Log.CREATE_INTERFACE,in.getName(),in.getProjectId()));
        AsyncTaskBus.instance().push(in.getProjectId(),Project.Action.CREATE_INTERFACE,in.getId(),token,in.getFolderId());
        return in.getId();
    }

    /**
     * 更新
     * @param id id
     * @param parameter
     * @return
     */
    @Post("{id}")
    public int update(@RequestParam("id")String id,Parameter parameter){
        AssertUtils.notNull(id,"missing id");
        Interface temp = ServiceFactory.instance().getById(id,Interface.class);
        AssertUtils.notNull(temp,"接口不存在或已删除");
        Interface in = BeanUtils.convert(Interface.class,parameter.getParamString());
        in.setId(id);
        AssertUtils.isTrue(ServiceFactory.instance().checkUserHasProjectPermission(MemoryUtils.getUser(parameter).getId(),temp.getProjectId()),"无操作权限");
        in.setLastUpdateTime(new Date());
        in.setCreateTime(null);
        int rs= ServiceFactory.instance().update(in);
        AssertUtils.isTrue(rs>0,"修改失败");
        String token = parameter.getParamString().get("token");
        AsyncTaskBus.instance().push(Log.create(token, Log.UPDATE_INTERFACE,temp.getName(),temp.getProjectId()));
        AsyncTaskBus.instance().push(temp.getProjectId(),Project.Action.UPDATE_INTERFACE,id,token);
        return rs;
    }

    /**
     * 根据id删除
     * @param id
     * @param parameter
     * @return
     */
    @Delete("{id}")
    public int delete(@RequestParam("id")String id,Parameter parameter){
        String token = parameter.getParamString().get("token");
        AssertUtils.notNull(id,"missing id");
        Interface temp = ServiceFactory.instance().getById(id,Interface.class);
        AssertUtils.notNull(temp,"接口不存在或已删除");
        AssertUtils.isTrue(ServiceFactory.instance().checkUserHasProjectPermission(MemoryUtils.getUser(parameter).getId(),temp.getProjectId()),"无操作权限");
        int rs = ServiceFactory.instance().delete(TableNames.INTERFACES,id);
        AssertUtils.isTrue(rs>0,"删除失败");
        AsyncTaskBus.instance().push(Log.create(parameter.getParamString().get("token"), Log.DELETE_INTERFACE,temp.getName(),temp.getProjectId()));
        AsyncTaskBus.instance().push(temp.getProjectId(),Project.Action.DELETE_INTERFACE,id,token);
        return rs;
    }

    /**
     * 根据文件夹名称删除
     * @param moduleId
     * @param folderId
     * @param parameter
     * @return
     */
   /* @Delete("{moduleId}/folder/{folderId}")
    public int deleteFolder(@RequestParam("moduleId")String moduleId,@RequestParam("folderId")String folderId,Parameter parameter){
        int rs = ServiceFactory.instance().deleteInterface(moduleId,folderId);
        AssertUtils.isTrue(rs>0,"删除失败");
        return rs;
    }
*/
    /**
     * 保存
     * @param parameter
     * @return
     */
    @Post("save")
    public Object save(Parameter parameter){
        String id = parameter.getParamString().get("id");
        if(org.apache.commons.lang3.StringUtils.isEmpty(id)){
            return createInterface(parameter);
        }
        return update(id,parameter);
    }
}
