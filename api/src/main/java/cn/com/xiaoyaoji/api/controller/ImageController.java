package cn.com.xiaoyaoji.api.controller;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import cn.com.xiaoyaoji.api.ex.ImageData;
import cn.com.xiaoyaoji.api.ex._HashMap;
import cn.com.xiaoyaoji.api.utils.AssertUtils;
import cn.com.xiaoyaoji.api.utils.ConfigUtils;
import cn.com.xiaoyaoji.api.utils.FileUtils;
import cn.com.xiaoyaoji.api.view.ByteArrayView;
import cn.com.xiaoyaoji.api.view.StringView;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.io.IOUtils;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.log4j.Logger;
import org.mangoframework.core.annotation.Get;
import org.mangoframework.core.annotation.Post;
import org.mangoframework.core.annotation.RequestMapping;
import org.mangoframework.core.dispatcher.Parameter;

import com.alibaba.fastjson.JSON;

/**
 * @author: zhoujingjie
 * @Date: 16/6/1
 */
@RequestMapping("/image")
public class ImageController {
    private static Logger logger = Logger.getLogger(ImageController.class);

    @Post("baiduupload")
    public StringView upload(Parameter parameter) throws IOException {
        HttpServletResponse response = parameter.getResponse();
        response.setContentType("text/html;charset=utf-8");
        List<FileItem> images = parameter.getParamFile().get("upfile");
        AssertUtils.isTrue(images != null && images.size() > 0, "内容为空");
        List<String> responses = new ArrayList<>();
        long size = 0;
        for (FileItem item : images) {
            try {
                ImageData imageData = FileUtils.uploadImage(item);
                responses.add(imageData.getPath());
                size = imageData.getSize();
            } catch (IOException e) {
                logger.error(e.getMessage(), e);
                String jsonstr = JSON.toJSONString(new _HashMap<>().add("state", "ERROR").add("message", e.getMessage()));
                return new StringView(jsonstr);
            }
        }
        String res = responses.get(0);
        String str = JSON.toJSONString(new _HashMap<>().add("name", res).add("size", size).add("state", "SUCCESS").add("type", ".jpg").add("url",
                ConfigUtils.getFileAccessURL() + res));
        return new StringView(str);
    }

    @Get("proxy")
    public ByteArrayView proxy(Parameter parameter) throws IOException {
        String target = parameter.getParamString().get("target");
        if (org.apache.commons.lang3.StringUtils.isNoneBlank(target)) {
            URL url = new URL(target);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestProperty("User-Agent",
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");
            connection.setRequestProperty("Host", url.getHost());
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            parameter.getResponse().setContentType("image/jpeg");
            IOUtils.copy(connection.getInputStream(), baos);
            return new ByteArrayView(baos.toByteArray());
        }
        return null;
    }
}
