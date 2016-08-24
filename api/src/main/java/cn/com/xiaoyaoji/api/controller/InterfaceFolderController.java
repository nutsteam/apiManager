package cn.com.xiaoyaoji.api.controller;

import cn.com.xiaoyaoji.api.data.bean.InterfaceFolder;
import cn.com.xiaoyaoji.api.service.ServiceFactory;
import cn.com.xiaoyaoji.api.utils.AssertUtils;
import cn.com.xiaoyaoji.api.utils.BeanUtils;
import cn.com.xiaoyaoji.api.utils.StringUtils;
import org.mangoframework.core.annotation.Delete;
import org.mangoframework.core.annotation.Post;
import org.mangoframework.core.annotation.RequestMapping;
import org.mangoframework.core.annotation.RequestParam;
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
        //todo 权限控制
        int rs = ServiceFactory.instance().deleteInterfaceFolder(id);
        AssertUtils.isTrue(rs>0,"操作失败");
        return rs;
    }

    @Post
    public String create(Parameter parameter) {
        InterfaceFolder folder = BeanUtils.convert(InterfaceFolder.class,parameter.getParamString());
        folder.setCreateTime(new Date());
        folder.setId(StringUtils.id());
        AssertUtils.notNull(folder.getModuleId(),"missing moduleId");
        int rs = ServiceFactory.instance().create(folder);
        AssertUtils.isTrue(rs>0,"操作失败");
        return folder.getId();
    }

    @Post("{id}")
    public int update(@RequestParam("id") String id,Parameter parameter){
        InterfaceFolder folder = BeanUtils.convert(InterfaceFolder.class,parameter.getParamString());
        AssertUtils.notNull(folder,"参数丢失");
        folder.setId(id);
        int rs = ServiceFactory.instance().update(folder);
        AssertUtils.isTrue(rs>0,"操作失败");
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
