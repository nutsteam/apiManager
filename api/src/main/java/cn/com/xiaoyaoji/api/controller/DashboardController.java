package cn.com.xiaoyaoji.api.controller;

import java.util.List;

import org.mangoframework.core.annotation.Get;
import org.mangoframework.core.annotation.RequestMapping;
import org.mangoframework.core.annotation.RequestMethod;
import org.mangoframework.core.dispatcher.Parameter;

import cn.com.xiaoyaoji.api.data.bean.Project;
import cn.com.xiaoyaoji.api.ex._HashMap;
import cn.com.xiaoyaoji.api.service.ServiceFactory;
import cn.com.xiaoyaoji.api.utils.ConfigUtils;
import cn.com.xiaoyaoji.api.utils.MemoryUtils;

/**
 * @author zhoujingjie
 * @date 2016-07-20
 */
@RequestMapping("/dashboard")
public class DashboardController {

    @Get(template = "/dashboard")
    public Object get(Parameter parameter) {
        // 获取团队
        String userId = MemoryUtils.getUser(parameter).getId();
        List<Project> projects = ServiceFactory.instance().getProjects(null, userId);

        return new _HashMap<>().add("fileAccess", ConfigUtils.getFileAccessURL())
                // .add("teams",teams)
                // .add("team",currentTeam)
                .add("projects", projects);
    }
}
