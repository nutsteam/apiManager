package cn.com.xiaoyaoji.test;

import cn.com.xiaoyaoji.api.data.DataFactory;
import cn.com.xiaoyaoji.api.data.bean.Interface;
import cn.com.xiaoyaoji.api.data.bean.InterfaceFolder;
import cn.com.xiaoyaoji.api.data.bean.Module;
import cn.com.xiaoyaoji.api.data.bean.Project;
import cn.com.xiaoyaoji.api.service.ServiceFactory;
import cn.com.xiaoyaoji.api.utils.StringUtils;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.junit.Test;

import java.util.*;

/**
 * @author zhoujingjie
 * @date 2016-08-24
 */
public class TestImportFromRAP {
    private List<Module> modules = new ArrayList<>();
    private Project project = new Project();
    private List<InterfaceFolder> folders = new ArrayList<>();
    private List<Interface> interfaces = new ArrayList<>();

    @Test
    public void test(){
        String str="rap data content";
        JSONArray arr = JSON.parseArray(str);

        String userId ="1kiQ78HJJzk";
        String projectId = StringUtils.id();
        String projectName = "第三方停车对接";
        project.setName(projectName);
        project.setId(projectId);
        project.setUserId(userId);
        project.setStatus(Project.Status.VALID);
        project.setPermission(Project.Permission.PRIVATE);
        project.setCreateTime(new Date());

        for(int i=0;i<arr.size();i++){
            JSONObject mo = arr.getJSONObject(i);
            String moduleName = mo.getString("name");
            String moduleId = StringUtils.id();
            createModule(moduleId,moduleName,projectId);
            JSONArray pa = mo.getJSONArray("pageList");
            if(pa!=null && pa.size()>0){
                for(int p=0;p<pa.size();p++){
                    JSONObject po = pa.getJSONObject(p);
                    String folderName = po.getString("name");
                    String folderId = StringUtils.id();
                    createFolder(folderId,folderName,moduleId,projectId);

                    JSONArray aa= po.getJSONArray("actionList");
                    if(aa!=null && aa.size()>0){
                        for(int a=0;a<aa.size();a++){
                            JSONObject ao=aa.getJSONObject(a);
                            List<Map<String,Object>> responseArgsList = new ArrayList<>();
                            resolveParameterList(ao.getJSONArray("responseParameterList"),responseArgsList);
                            String responseArgs = JSON.toJSONString(responseArgsList);

                            List<Map<String,Object>> requestArgsList = new ArrayList<>();
                            resolveParameterList(ao.getJSONArray("requestParameterList"),requestArgsList);
                            String requestArgs = JSON.toJSONString(requestArgsList);

                            String requestMethod = ao.getString("requestType");
                            if("1".equals(requestMethod)){
                                requestMethod = "GET";
                            }else if("2".equals(requestMethod)){
                                requestMethod = "POST";
                            }else if("3".equals(requestMethod)){
                                requestMethod = "PUT";
                            }else if("4".equals(requestMethod)){
                                requestMethod = "DELETE";
                            }
                            createInterface(ao.getString("name"),ao.getString("description"),folderId,ao.getString("requestUrl"),requestMethod,requestArgs,responseArgs,moduleId);
                        }
                    }
                }
            }
        }
        ServiceFactory.instance().importFromRap(project,modules,folders,interfaces);
    }

    @Test
    public void test2(){
        //DataFactory.instance().test();
    }
    private void createModule(String moduleId,String moduleName,String projectId){
        Module module = new Module();
        module.setId(moduleId);
        module.setProjectId(projectId);
        module.setName(moduleName);
        module.setLastUpdateTime(new Date());
        module.setCreateTime(new Date());
        modules.add(module);
    }

    private void createFolder(String folderId,String folderName,String moduleId,String projectId){
        InterfaceFolder folder = new InterfaceFolder();
        folder.setId(folderId);
        folder.setCreateTime(new Date());
        folder.setName(folderName);
        folder.setModuleId(moduleId);
        folder.setProjectId(projectId);
        folders.add(folder);
    }

    private void createInterface(String name,String desc,String folderId,String url,String requestMethod,String requestArgs,String responseArgs,String moduleId){
        Interface in = new Interface();
        in.setId(StringUtils.id());
        in.setName(name);
        in.setDescription(desc);
        in.setFolderId(folderId);
        in.setUrl(url);
        in.setRequestMethod(requestMethod);
        in.setContentType("JSON");
        in.setRequestHeaders("[]");
        in.setRequestArgs(requestArgs);
        in.setResponseArgs(responseArgs);
        in.setProjectId(project.getId());
        in.setModuleId(moduleId);
        in.setCreateTime(new Date());
        in.setLastUpdateTime(new Date());
        in.setDataType("X-WWW-FORM-URLENCODED");
        in.setProtocol("HTTP");
        interfaces.add(in);
    }

    private void resolveParameterList(JSONArray arr, List<Map<String,Object>> parent){
        if(arr!=null && arr.size()>0) {
            for (int i = 0; i < arr.size(); i++) {
                JSONObject o = arr.getJSONObject(i);
                Map<String,Object> map = new HashMap<>();
                map.put("type",o.getString("dataType"));
                map.put("name",o.getString("identifier"));
                map.put("required","true");
                map.put("description",o.getString("name"));
                List<Map<String,Object>> children = new ArrayList<>();
                map.put("children",children);
                parent.add(map);
                resolveParameterList(o.getJSONArray("parameterList"),children);
            }
        }
    }
}
