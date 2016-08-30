package cn.com.xiaoyaoji.api.controller;

import cn.com.xiaoyaoji.api.data.bean.Team;
import cn.com.xiaoyaoji.api.data.bean.User;
import cn.com.xiaoyaoji.api.service.ServiceFactory;
import cn.com.xiaoyaoji.api.utils.AssertUtils;
import cn.com.xiaoyaoji.api.utils.BeanUtils;
import cn.com.xiaoyaoji.api.utils.MemoryUtils;
import cn.com.xiaoyaoji.api.utils.StringUtils;
import org.mangoframework.core.annotation.Delete;
import org.mangoframework.core.annotation.Post;
import org.mangoframework.core.annotation.RequestMapping;
import org.mangoframework.core.annotation.RequestParam;
import org.mangoframework.core.dispatcher.Parameter;

import java.util.Date;

/**
 * 团队
 * //todo 权限验证
 * @author zhoujingjie
 * @date 2016-07-20
 */
@Deprecated
@RequestMapping("/team")
public class TeamController {

    @Post
    public Object create(Parameter parameter){
        User user = MemoryUtils.getUser(parameter);
        Team team = BeanUtils.convert(Team.class,parameter.getParamString());
        AssertUtils.notNull(team.getName(),"missing name");
        team.setId(StringUtils.id());
        team.setCreateTime(new Date());
        team.setUserId(user.getId());
        team.setStatus(Team.Status.VALID);
        int rs = ServiceFactory.instance().create(team);
        AssertUtils.isTrue(rs > 0,"操作失败");
        return team.getId();
    }


    @Post("{id}")
    public Object update(@RequestParam("id") String id, Parameter parameter){
        Team team = BeanUtils.convert(Team.class,parameter.getParamString());
        team.setId(id);
        int rs = ServiceFactory.instance().update(team);
        AssertUtils.isTrue(rs > 0,"操作失败");
        return rs;
    }


    @Delete("{id}")
    public Object delete(@RequestParam("id") String id,Parameter parameter){
        int rs = ServiceFactory.instance().deleteTeam(id);
        AssertUtils.isTrue(rs > 0,"操作失败");
        return rs;
    }

    @Post("save")
    public Object save(Parameter parameter){
        String id = parameter.getParamString().get("id");
        if(org.apache.commons.lang3.StringUtils.isEmpty(id)){
            return create(parameter);
        }
        return update(id,parameter);
    }


}
