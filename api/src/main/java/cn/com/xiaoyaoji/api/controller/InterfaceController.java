package cn.com.xiaoyaoji.api.controller;

import cn.com.xiaoyaoji.api.data.bean.Interface;
import cn.com.xiaoyaoji.api.data.bean.InterfaceFolder;
import cn.com.xiaoyaoji.api.data.bean.Module;
import cn.com.xiaoyaoji.api.data.bean.TableNames;
import cn.com.xiaoyaoji.api.ex._HashMap;
import cn.com.xiaoyaoji.api.service.ServiceFactory;
import cn.com.xiaoyaoji.api.utils.AssertUtils;
import cn.com.xiaoyaoji.api.utils.BeanUtils;
import cn.com.xiaoyaoji.api.utils.StringUtils;
import org.apache.commons.lang3.StringEscapeUtils;
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
     * @param moduleId
     * @param parameter
     * @return
     */
    @Post("{moduleId}/folder")
    public int updateFolderName(@RequestParam("moduleId") String moduleId, Parameter parameter){
        //todo 判断操作权限
        String originalName = parameter.getParamString().get("originalName");
        String newName = parameter.getParamString().get("newName");
        AssertUtils.notNull(originalName,"missing originalName");
        AssertUtils.notNull(newName,"missing newName");
        int rs= ServiceFactory.instance().updateInterfaceFolder(moduleId,originalName,newName );
        AssertUtils.isTrue(rs > 0,"修改失败");
        return rs;
    }

    /**
     * 新增
     * @param parameter
     * @return
     */
    @Post
    public String createInterface(Parameter parameter){
        //todo 判断操作权限
        Interface in = BeanUtils.convert(Interface.class,parameter.getParamString());
        AssertUtils.notNull(in.getModuleId(),"missing moduleId");
        AssertUtils.notNull(in.getProjectId(),"missing projectId");
        AssertUtils.notNull(in.getFolderId(),"missing folderId");
        in.setLastUpdateTime(new Date());
        in.setCreateTime(new Date());
        in.setId(StringUtils.id());
        int rs = ServiceFactory.instance().create(in);
        AssertUtils.isTrue(rs>0,"增加失败");
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
        //todo 判断操作权限
        Interface in = BeanUtils.convert(Interface.class,parameter.getParamString());
        in.setId(id);
        in.setLastUpdateTime(new Date());
        in.setCreateTime(null);
        int rs= ServiceFactory.instance().update(in);
        AssertUtils.isTrue(rs>0,"修改失败");
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
        //todo 判断操作权限
        int rs = ServiceFactory.instance().delete(TableNames.INTERFACES,id);
        AssertUtils.isTrue(rs>0,"删除失败");
        return rs;
    }

    /**
     * 根据文件夹名称删除
     * @param moduleId
     * @param folderId
     * @param parameter
     * @return
     */
    @Delete("{moduleId}/folder/{folderId}")
    public int deleteFolder(@RequestParam("moduleId")String moduleId,@RequestParam("folderId")String folderId,Parameter parameter){
        //todo 判断操作权限
        int rs = ServiceFactory.instance().deleteInterface(moduleId,folderId);
        AssertUtils.isTrue(rs>0,"删除失败");
        return rs;
    }

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
