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
        String str="[{\"id\":24,\"introduction\":\"\",\"name\":\"TCP协议\",\"pageList\":[{\"id\":96,\"introduction\":\"\",\"name\":\"停车场发送请求TCP\",\"actionList\":[{\"id\":310,\"name\":\"连接登录\",\"description\":\"请求示例:\\n{\\\"data\\\":{\\\"id\\\":\\\"05011\\\",\\\"password\\\":\\\"password\\\"},\\\"method\\\":\\\"POST\\\",\\\"path\\\":\\\"/connect\\\"}\",\"requestType\":\"2\",\"requestUrl\":\"/connect\",\"responseTemplate\":\"\",\"requestParameterList\":[{\"id\":2755,\"identifier\":\"path\",\"name\":\"请求路径:/connect\",\"remark\":\"@mock=/connect\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":2754,\"identifier\":\"method\",\"name\":\"POST,支持的方法:GE,POST,DELETE,PUT\",\"remark\":\"\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":2751,\"identifier\":\"data\",\"name\":\"\",\"remark\":\"\",\"parameterList\":[{\"id\":2752,\"identifier\":\"id\",\"name\":\"停车场id\",\"remark\":\"@mock=05011\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":2753,\"identifier\":\"password\",\"name\":\"登录密码\",\"remark\":\"@mock=password\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"}],\"validator\":\"\",\"dataType\":\"object\"}],\"responseParameterList\":[{\"id\":2758,\"identifier\":\"data\",\"name\":\"返回数据\",\"remark\":\"@mock=data\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"object\"},{\"id\":2756,\"identifier\":\"msg\",\"name\":\"返回错误信息\",\"remark\":\"@mock=msg\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":2757,\"identifier\":\"code\",\"name\":\"0为成功,-1为失败\",\"remark\":\"@mock=0\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"}]}]},{\"id\":97,\"introduction\":\"\",\"name\":\"停车场接受请求TCP\",\"actionList\":[{\"id\":313,\"name\":\"支付停车费用\",\"description\":\"请求示例:\\n{\\\"data\\\":{\\\"carnumber\\\":\\\"京A99999\\\",\\\"cash\\\":-1,\\\"cashid\\\":-1,\\\"cost\\\":0,\\\"discount\\\":1000,\\\"discountid\\\":123456,\\\"inid\\\":\\\"050112\\\",\\\"intime\\\":\\\"2016-05-24 16:05:51\\\",\\\"outid\\\":\\\"\\\",\\\"outtime\\\":\\\"\\\",\\\"pay\\\":2000,\\\"payid\\\":123456,\\\"paytime\\\":\\\"2016-05-24 15:51:56\\\",\\\"paytype\\\":\\\"WEIXIN\\\",\\\"time\\\":0,\\\"type\\\":\\\"PUBLIC\\\"},\\\"method\\\":\\\"POST\\\",\\\"path\\\":\\\"/parking/pay\\\"}\",\"requestType\":\"2\",\"requestUrl\":\"/parking/pay\",\"responseTemplate\":\"\",\"requestParameterList\":[{\"id\":2795,\"identifier\":\"path\",\"name\":\"/parking/pay\",\"remark\":\"@mock=/parking/pay\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":2777,\"identifier\":\"data\",\"name\":\"\",\"remark\":\"\",\"parameterList\":[{\"id\":2788,\"identifier\":\"payid\",\"name\":\"\",\"remark\":\"@mock=123456\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"},{\"id\":2782,\"identifier\":\"pay\",\"name\":\"支付金额\",\"remark\":\"@mock=2000\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"},{\"id\":2787,\"identifier\":\"cash\",\"name\":\"\",\"remark\":\"@mock=-1\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"},{\"id\":2789,\"identifier\":\"discount\",\"name\":\"优惠券金额，单位分\",\"remark\":\"@mock=1000\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"},{\"id\":2792,\"identifier\":\"time\",\"name\":\"\",\"remark\":\"@mock=0\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"},{\"id\":2790,\"identifier\":\"paytype\",\"name\":\"支付类型\",\"remark\":\"@mock=WEIXIN\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":2781,\"identifier\":\"outtime\",\"name\":\"车辆离开时间, 格式\\\"yyyy-MM-dd HH:mm:ss\\\"\",\"remark\":\"@mock=\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":2783,\"identifier\":\"type\",\"name\":\"车辆类型\",\"remark\":\"@mock=PUBLIC\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":2791,\"identifier\":\"intime\",\"name\":\"车辆进入时间,格式\\\"yyyy-MM-dd HH:mm:ss\\\"\",\"remark\":\"@mock=1464076316705\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":2780,\"identifier\":\"cost\",\"name\":\"\",\"remark\":\"@mock=0\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"},{\"id\":2786,\"identifier\":\"outid\",\"name\":\"车辆离开出口id\",\"remark\":\"@mock=\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":2779,\"identifier\":\"cashid\",\"name\":\"\",\"remark\":\"@mock=-1\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"},{\"id\":2784,\"identifier\":\"carnumber\",\"name\":\"车牌号\",\"remark\":\"@mock=京A99999\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":2793,\"identifier\":\"discountid\",\"name\":\"优惠券id\",\"remark\":\"@mock=123456\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"},{\"id\":2785,\"identifier\":\"inid\",\"name\":\"车辆进入入口id\",\"remark\":\"@mock=050112\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":2778,\"identifier\":\"paytime\",\"name\":\"支付时间, 格式\\\"yyyy-MM-dd HH:mm:ss\\\"\",\"remark\":\"@mock=2016-05-24 15:51:56\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"}],\"validator\":\"\",\"dataType\":\"object\"},{\"id\":2794,\"identifier\":\"method\",\"name\":\"POST\",\"remark\":\"@mock=POST\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"}],\"responseParameterList\":[{\"id\":2797,\"identifier\":\"msg\",\"name\":\"返回错误信息\",\"remark\":\"@mock=msg\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":2796,\"identifier\":\"code\",\"name\":\"0为成功,-1为失败\",\"remark\":\"@mock=0\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"},{\"id\":2798,\"identifier\":\"data\",\"name\":\"返回数据\",\"remark\":\"@mock=data\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"}]},{\"id\":314,\"name\":\"查询停车费用\",\"description\":\"请求示例\\n{\\\"data\\\":\\\"京A99999\\\",\\\"method\\\":\\\"POST\\\",\\\"path\\\":\\\"/parking/cost\\\"}\",\"requestType\":\"1\",\"requestUrl\":\"/parking/cost\",\"responseTemplate\":\"\",\"requestParameterList\":[{\"id\":2799,\"identifier\":\"method\",\"name\":\"POST\",\"remark\":\"@mock=POST\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":2801,\"identifier\":\"data\",\"name\":\"车牌号\",\"remark\":\"@mock=京A99999\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":2800,\"identifier\":\"path\",\"name\":\"/parking/cost\",\"remark\":\"@mock=/parking/cost\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"}],\"responseParameterList\":[{\"id\":2803,\"identifier\":\"code\",\"name\":\"0为成功,-1为失败\",\"remark\":\"@mock=0\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"},{\"id\":2804,\"identifier\":\"data\",\"name\":\"返回数据\",\"remark\":\"@mock=data\",\"parameterList\":[{\"id\":3266,\"identifier\":\"time\",\"name\":\"停车共计时间,单位分钟\",\"remark\":\"\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"},{\"id\":3264,\"identifier\":\"carnumber\",\"name\":\"车牌号\",\"remark\":\"\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":3268,\"identifier\":\"cost\",\"name\":\"停车费用,停车费用,单位分\",\"remark\":\"\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"},{\"id\":3265,\"identifier\":\"intime\",\"name\":\"进入时间,格式 2016-06-01 09:00\",\"remark\":\"\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":3267,\"identifier\":\"parkid\",\"name\":\"停车场id\",\"remark\":\"\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"}],\"validator\":\"\",\"dataType\":\"object\"},{\"id\":2802,\"identifier\":\"msg\",\"name\":\"返回错误信息\",\"remark\":\"@mock=msg\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"}]},{\"id\":398,\"name\":\"剩余车位查询\",\"description\":\"\",\"requestType\":\"1\",\"requestUrl\":\"http://parking.tingche.in/parking/rest/parks/id/{id}/left\",\"responseTemplate\":\"\",\"requestParameterList\":[],\"responseParameterList\":[{\"id\":3704,\"identifier\":\"code\",\"name\":\"0为成功,-1为失败\",\"remark\":\"@mock=-1\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"},{\"id\":3705,\"identifier\":\"msg\",\"name\":\"返回错误信息\",\"remark\":\"@mock=停车场网络连接失败\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":3706,\"identifier\":\"data\",\"name\":\"返回车位数\",\"remark\":\"\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"}]}]},{\"id\":98,\"introduction\":\"\",\"name\":\"心跳\",\"actionList\":[{\"id\":315,\"name\":\"停车场接受心跳请求\",\"description\":\"服务器每隔5分钟，向停车场发送心跳进行ping操作，内容为0x9一个字节byte，对应ASCII 十进制值9的水平制表符，停车场收到后及时回复内容为0xA，对应ASCII 十进制值10的换行键，服务器在连续9次没有收到心跳回复后会断开socket连接，停车场发现socket断开后，sleep 2000毫秒后，重新连接。\",\"requestType\":\"1\",\"requestUrl\":\"无\",\"responseTemplate\":\"\",\"requestParameterList\":[{\"id\":2805,\"identifier\":\"0x9\",\"name\":\"ping内容，制表符\",\"remark\":\"\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"}],\"responseParameterList\":[{\"id\":2806,\"identifier\":\"0xA\",\"name\":\"pong内容,换行符\",\"remark\":\"\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"}]}]},{\"id\":109,\"introduction\":\"\",\"name\":\"Http协议\",\"actionList\":[{\"id\":355,\"name\":\"车辆离开\",\"description\":\"请求示例：\\n{\\\"carnumber\\\":\\\"京A99999\\\",\\\"id\\\":\\\"050112\\\",\\\"time\\\":\\\"1464074999024\\\"}\",\"requestType\":\"2\",\"requestUrl\":\"http://lake.tingche.in/rest/parking/in\",\"responseTemplate\":\"\",\"requestParameterList\":[{\"id\":3253,\"identifier\":\"time\",\"name\":\"离开时间戳\",\"remark\":\"@mock=1464074999024\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":3707,\"identifier\":\"cost\",\"name\":\"停车费用\",\"remark\":\"\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"},{\"id\":3254,\"identifier\":\"carnumber\",\"name\":\"车牌号\",\"remark\":\"@mock=京A99999\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":3252,\"identifier\":\"id\",\"name\":\"出口id,异常离场时id为停车场id+00\",\"remark\":\"@mock=050112\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"}],\"responseParameterList\":[{\"id\":3256,\"identifier\":\"code\",\"name\":\"0为成功,-1为失败\",\"remark\":\"@mock=0\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"},{\"id\":3257,\"identifier\":\"data\",\"name\":\"返回数据\",\"remark\":\"@mock=data\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":3255,\"identifier\":\"msg\",\"name\":\"返回错误信息\",\"remark\":\"@mock=msg\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"}]},{\"id\":356,\"name\":\"车辆进入\",\"description\":\"请求示例：\\n{\\\"carnumber\\\":\\\"京A99999\\\",\\\"id\\\":\\\"050112\\\",\\\"time\\\":\\\"1464074999024\\\"}\",\"requestType\":\"2\",\"requestUrl\":\"http://lake.web.com/rest/parking/in\",\"responseTemplate\":\"\",\"requestParameterList\":[{\"id\":3259,\"identifier\":\"time\",\"name\":\"进入时间戳\",\"remark\":\"@mock=1464074999024\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":3258,\"identifier\":\"id\",\"name\":\"进入入口id\",\"remark\":\"@mock=050112\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":3260,\"identifier\":\"carnumber\",\"name\":\"车牌号\",\"remark\":\"@mock=京A99999\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"}],\"responseParameterList\":[{\"id\":3262,\"identifier\":\"data\",\"name\":\"返回数据\",\"remark\":\"@mock=data\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":3263,\"identifier\":\"code\",\"name\":\"0为成功,-1为失败\",\"remark\":\"@mock=0\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"},{\"id\":3261,\"identifier\":\"msg\",\"name\":\"返回错误信息\",\"remark\":\"@mock=msg\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"}]},{\"id\":397,\"name\":\"修改在场车牌号\",\"description\":\"\",\"requestType\":\"2\",\"requestUrl\":\"http://parking.tingche.in/parking/rest/parking/carnumber/{carnumber}\",\"responseTemplate\":\"\",\"requestParameterList\":[{\"id\":3701,\"identifier\":\"modify\",\"name\":\"最后改成的车牌号\",\"remark\":\"\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"}],\"responseParameterList\":[{\"id\":3703,\"identifier\":\"msg\",\"name\":\"返回错误信息\",\"remark\":\"\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"string\"},{\"id\":3702,\"identifier\":\"code\",\"name\":\"0为成功-1为失败\",\"remark\":\"\",\"parameterList\":[],\"validator\":\"\",\"dataType\":\"number\"}]}]}]}]";
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
