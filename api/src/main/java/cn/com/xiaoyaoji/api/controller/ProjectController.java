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
import cn.com.xiaoyaoji.api.view.PdfView;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.apache.commons.io.IOUtils;
import org.mangoframework.core.annotation.*;
import org.mangoframework.core.dispatcher.Parameter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
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


    /**
     * 删除项目
     * @param id
     * @param parameter
     * @return
     */
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
     * 移动复制
     * @param id
     * @param parameter
     * @return
     */
    @Post("/{id}/copymove")
    public int copyMove(@RequestParam("id") String id, Parameter parameter){
        AssertUtils.notNull(parameter,"action","moduleId","type","targetId");
        //动作
        String action = parameter.getParamString().get("action");
        //类型
        String type = parameter.getParamString().get("type");
        //
        String moduleId = parameter.getParamString().get("moduleId");
        //
        String folderId = parameter.getParamString().get("folderId");
        //
        String targetId = parameter.getParamString().get("targetId");
        if(type.equals("api")){
            AssertUtils.notNull(folderId,"missing folderId");
        }
        int rs = 0;
        if(action.equals("move")){
            //移动
            if(type.equals("folder")){
                InterfaceFolder folder = new InterfaceFolder();
                folder.setId(targetId);
                folder.setModuleId(moduleId);
                rs = ServiceFactory.instance().update(folder);
            }else{
                Interface in = new Interface();
                in.setId(targetId);
                in.setModuleId(moduleId);
                in.setFolderId(folderId);
                rs = ServiceFactory.instance().update(in);
            }
        }else if(action.equals("copy")){
            //复制
            if(type.equals("folder")){
                rs = ServiceFactory.instance().copyFolder(targetId,moduleId);
            }else{
                //接口
                Interface in = ServiceFactory.instance().getById(targetId,Interface.class);
                AssertUtils.notNull(in,"无效接口Id");
                in.setId(StringUtils.id());
                in.setFolderId(folderId);
                in.setModuleId(moduleId);
                in.setCreateTime(new Date());
                in.setLastUpdateTime(new Date());
                rs = ServiceFactory.instance().create(in);
            }
        }
        AssertUtils.isTrue(rs>0,"操作失败");
        return rs;
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


    /**
     * 项目导出
     * @param parameter
     * @param id
     * @return
     * @throws DocumentException
     * @throws IOException
     */
    @Get("/{id}/export")
    public Object export(Parameter parameter,@RequestParam("id")String id) throws DocumentException, IOException {
        String token = parameter.getParamString().get("token");
        Project project = ServiceFactory.instance().getProject(id);
        List<Module> modules = getModulesByProjectId(project,token);
        AssertUtils.notNull(modules,"该项目不存在或已下线");
        Document document = new Document(PageSize.A4, 50, 50, 50, 50);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {

            PdfWriter writer = PdfWriter.getInstance(document, baos);
            writer.setViewerPreferences(PdfWriter.PageModeUseOutlines);
            document.open();
            //方正兰亭
            BaseFont font = BaseFont.createFont("FZLTCXHJW.TTF",BaseFont.IDENTITY_H,BaseFont.NOT_EMBEDDED);
            Font moduleFont = new Font(font,24f,Font.BOLD, BaseColor.BLACK);
            Font folderFont =new Font(font,20f,Font.BOLD,new BaseColor(66,66,66));
            Font apiName = new Font(font,18f,Font.BOLD,new BaseColor(66,66,66));
            Font subtitle = new Font(font,14f,Font.BOLD,BaseColor.BLACK);
            Font apiFont =  new Font(font,10f,Font.BOLD,new BaseColor(66,66,66));
            Paragraph temp = new Paragraph(project.getName(),new Font(font,32f,Font.BOLD,BaseColor.BLACK));
            document.add(Chunk.NEWLINE);
            temp.setAlignment(Element.ALIGN_CENTER);
            document.add(temp);
            for(int m=0;m<modules.size();m++){
                Module module = modules.get(m);
                document.add(new Paragraph(module.getName(),moduleFont));
                createUpdateTimeCell(document,DateUtils.toStr(module.getLastUpdateTime()),apiFont);

                if(org.apache.commons.lang3.StringUtils.isNotBlank(module.getDescription())) {
                    document.add(new Paragraph(module.getDescription(),apiFont));
                }


                Paragraph cTitle = new Paragraph(module.getName(), moduleFont);
                Chapter chapter = new Chapter(cTitle, m+1);
                List<InterfaceFolder> folders = module.getFolders();
                for(int f=0;f<folders.size();f++){
                    InterfaceFolder folder = folders.get(f);
                    Section section = chapter.addSection(new Paragraph(folder.getName(),folderFont));
                    section.setIndentationRight(0);
                    section.setIndentationLeft(0);
                    if(m>2) {
                        section.setBookmarkOpen(false);
                    }
                    //section.add(new Paragraph());
                    List<Interface> ins =folder.getChildren();
                    for(int i=0;i<ins.size();i++){
                        Interface in = ins.get(i);
                        section.addSection(new Paragraph(in.getName(),apiName));
                        section.add(new Paragraph("基本信息",subtitle));
                        createUpdateTimeCell(section,DateUtils.toStr(in.getLastUpdateTime()),apiFont);
                        section.add(new Paragraph("请求类型："+in.getProtocol(),apiFont));
                        if(org.apache.commons.lang3.StringUtils.isNotBlank(in.getUrl())) {
                            if (module.getHost() == null && module.getDevHost() == null) {
                                section.add(new Paragraph("请求地址：" + in.getUrl(), apiFont));
                            } else {
                                if (org.apache.commons.lang3.StringUtils.isNotBlank(module.getHost())) {
                                    section.add(new Paragraph("线上环境地址：" + module.getHost() + in.getUrl(), apiFont));
                                }
                                if (org.apache.commons.lang3.StringUtils.isNotBlank(module.getDevHost())) {
                                    section.add(new Paragraph("开发环境地址：" + module.getDevHost() + in.getUrl(), apiFont));
                                }
                            }
                        }
                        section.add(new Paragraph("请求方式："+in.getRequestMethod(),apiFont));
                        section.add(new Paragraph("数据类型："+in.getDataType(),apiFont));
                        section.add(new Paragraph("响应类型："+in.getContentType(),apiFont));


                        String requestHeader = in.getRequestHeaders();
                        if(org.apache.commons.lang3.StringUtils.isNotBlank(requestHeader)){
                            List<RequestResponseArgs> requestHeaders = JSON.parseObject(requestHeader, new TypeReference<List<RequestResponseArgs>>(){});
                            if(requestHeaders.size()>0) {
                                Paragraph p = new Paragraph("请求头",subtitle);
                                section.add(p);
                                PdfPTable table = new PdfPTable(4);
                                decorateTable(table);
                                table.addCell(createHeaderCell("参数名称",apiFont));
                                table.addCell(createHeaderCell("是否必须",apiFont));
                                table.addCell(createHeaderCell("描述",apiFont));
                                table.addCell(createHeaderCell("默认值",apiFont));
                                addCells(table, requestHeaders, "requestHeaders",apiFont);
                                section.add(table);
                            }
                        }

                        String requestArg = in.getRequestArgs();
                        if(org.apache.commons.lang3.StringUtils.isNotBlank(requestArg)){
                            List<RequestResponseArgs> requestArgs = JSON.parseObject(requestArg, new TypeReference<List<RequestResponseArgs>>(){});
                            if(requestArgs.size()>0) {
                                section.add(new Paragraph("请求参数",subtitle));
                                PdfPTable table = new PdfPTable(5);
                                decorateTable(table);
                                table.addCell(createHeaderCell("参数名称",apiFont));
                                table.addCell(createHeaderCell("是否必须",apiFont));
                                table.addCell(createHeaderCell("类型",apiFont));
                                table.addCell(createHeaderCell("描述",apiFont));
                                table.addCell(createHeaderCell("默认值",apiFont));
                                addCells(table, requestArgs, "requestArgs",apiFont);
                                section.add(table);
                            }
                        }
                        String responseArg = in.getRequestHeaders();
                        if(org.apache.commons.lang3.StringUtils.isNotBlank(responseArg)){
                            List<RequestResponseArgs> responseArgs = JSON.parseObject(responseArg, new TypeReference<List<RequestResponseArgs>>(){});
                            if(responseArgs.size()>0) {
                                section.add(new Paragraph("响应数据",subtitle));
                                PdfPTable table = new PdfPTable(3);
                                decorateTable(table);
                                table.addCell(createHeaderCell("参数名称",apiFont));
                                table.addCell(createHeaderCell("是否必须",apiFont));
                                table.addCell(createHeaderCell("描述",apiFont));
                                addCells(table, responseArgs, "responseArgs",apiFont);
                                section.add(table);
                            }
                        }
                        section.add(new Paragraph(in.getDescription(),apiFont));

                        if(org.apache.commons.lang3.StringUtils.isNotBlank(in.getExample())) {
                            section.add(new Paragraph("例子", subtitle));
                            section.add(new Paragraph(in.getExample()));
                        }

                        //document.newPage();
                        section.add(Chunk.NEWLINE);
                        section.add(Chunk.NEWLINE);
                        section.add(Chunk.NEWLINE);
                        //section.newPage();
                    }
                }
                document.add(chapter);
            }
            document.close();
            byte[] data = baos.toByteArray();
            return new PdfView(data,project.getName()+".pdf");
        } finally {
            //document.close();
            IOUtils.closeQuietly(baos);
        }
    }



    //创建时间更新
    private void createUpdateTimeCell(Document document,String text,Font font) throws DocumentException {
        Paragraph lastUpdateTime= new Paragraph("更新时间:"+text,font);
        lastUpdateTime.setIndentationRight(0);
        lastUpdateTime.setPaddingTop(0);
        lastUpdateTime.setAlignment(Element.ALIGN_RIGHT);
        document.add(lastUpdateTime);
    }
    //创建更新时间
    private void createUpdateTimeCell(Section element,String text,Font font) throws DocumentException {
        Paragraph lastUpdateTime= new Paragraph("更新时间:"+text,font);
        lastUpdateTime.setIndentationRight(0);
        lastUpdateTime.setPaddingTop(0);
        lastUpdateTime.setAlignment(Element.ALIGN_RIGHT);
        element.add(lastUpdateTime);
    }

    //创建table 列
    private PdfPCell createCell(String text, Font font){
        if(text == null)
            text = " ";
        PdfPCell cell =new PdfPCell(new Phrase(text,font));
        cell.setPadding(5);
        return cell;
    }
    //创建table头
    private PdfPCell createHeaderCell(String text,Font font){
        PdfPCell cell =new PdfPCell(new Phrase(text,font));
        cell.setPadding(8);
        cell.setBackgroundColor(new BaseColor(204,204,204));
        return cell;
    }

    //添加列
    private void addCells(PdfPTable table,List<RequestResponseArgs> list,String type,Font font){
        for(RequestResponseArgs item:list){
            table.addCell(createCell(item.getName(),font));
            if(org.apache.commons.lang3.StringUtils.isBlank(item.getRequire())){
                table.addCell(createCell("false",font));
            }else {
                table.addCell(createCell(item.getRequire(),font));
                //table.addCell(new Phrase(getText(item.getRequire()),font));
            }
            if(type.equals("requestArgs")){
                table.addCell(createCell(item.getType(),font));
            }
            table.addCell(createCell(item.getDescription(),font));
            if(!type.equals("responseArgs")){
                table.addCell(createCell(item.getDefaultValue(),font));
            }
            addCells(table,item.getChildren(),type,font);
        }
    }

    //设置table样式
    private void decorateTable(PdfPTable table ){
        table.setHeaderRows(1);
        //table.setFooterRows(1);
        table.setComplete(true);
        //table.setSkipFirstHeader(true);
        table.setWidthPercentage(100);
        table.setSpacingAfter(10);
        table.setSpacingBefore(10);
    }

    private java.util.List<Module> getModulesByProjectId(Project project,String token) {

        if (project == null || !Project.Status.VALID.equals(project.getStatus())) {
            return null;
        }
        boolean has = ServiceFactory.instance().checkUserHasProjectPermission(MemoryUtils.getUser(token).getId(),project.getId());
        AssertUtils.isTrue(has,"无访问权限");
        java.util.List<Module> modules = ServiceFactory.instance().getModules(project.getId());
        java.util.List<InterfaceFolder> folders = null;
        if (modules.size() > 0) {
            // 获取该项目下所有文件夹
            folders = ServiceFactory.instance().getFoldersByProjectId(project.getId());
            Map<String, java.util.List<InterfaceFolder>> folderMap = ResultUtils.listToMap(folders, new Handler<InterfaceFolder>() {
                @Override
                public String key(InterfaceFolder item) {
                    return item.getModuleId();
                }
            });
            for (Module module : modules) {
                java.util.List<InterfaceFolder> temp = folderMap.get(module.getId());
                if (temp != null) {
                    module.setFolders(temp);
                }
            }

            // 获取该项目下所有接口
            java.util.List<Interface> interfaces = ServiceFactory.instance().getInterfacesByProjectId(project.getId());
            Map<String, java.util.List<Interface>> interMap = ResultUtils.listToMap(interfaces, new Handler<Interface>() {
                @Override
                public String key(Interface item) {
                    return item.getFolderId();
                }
            });
            for (InterfaceFolder folder : folders) {
                java.util.List<Interface> temp = interMap.get(folder.getId());
                if (temp != null) {
                    folder.setChildren(temp);
                }
            }
        }
        return modules;
    }


}
