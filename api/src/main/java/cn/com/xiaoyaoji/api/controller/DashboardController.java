package cn.com.xiaoyaoji.api.controller;

import cn.com.xiaoyaoji.api.data.bean.Project;
import cn.com.xiaoyaoji.api.ex._HashMap;
import cn.com.xiaoyaoji.api.service.ServiceFactory;
import cn.com.xiaoyaoji.api.utils.ConfigUtils;
import cn.com.xiaoyaoji.api.utils.MemoryUtils;
import org.mangoframework.core.annotation.Get;
import org.mangoframework.core.annotation.RequestMapping;
import org.mangoframework.core.dispatcher.Parameter;

import java.util.List;

/**
 * @author zhoujingjie
 * @date 2016-07-20
 */
@RequestMapping("/dashboard")
public class DashboardController {

    @Get(template = "/dashboard")
    public Object get(Parameter parameter){
        //获取团队
        String userId = MemoryUtils.getUser(parameter).getId();
        List<Project> projects = ServiceFactory.instance().getProjects(null,userId);

        return new _HashMap<>()
                .add("fileAccess", ConfigUtils.getFileAccessURL())
                //.add("teams",teams)
                //.add("team",currentTeam)
                .add("projects",projects);
    }

  /*  @Get(value = "/team/{teamId}",template = "/dashboard")
    public Object get(@RequestParam("teamId")String teamId,Parameter parameter){
        //获取团队
        String userId = UserUtils.getUser(parameter).getId();
        List<Team> teams = ServiceFactory.instance().getTeams(userId);
        Team currentTeam = null;
        List<Project> projects = null;
        if(teams.size()>0){
            if(teamId!=null){
                for(Team team : teams){
                    if(team.getId().equals(teamId)){
                        currentTeam = team;
                    }
                }
            }
            if(currentTeam == null){
                currentTeam = teams.get(0);
            }
            projects = ServiceFactory.instance().getProjects(currentTeam.getId());
        }

        return new _HashMap<>()
                .add("fileAccess", ConfigUtils.getFileAccessURL())
                .add("teams",teams)
                .add("team",currentTeam)
                .add("projects",projects);
    }*/


}
