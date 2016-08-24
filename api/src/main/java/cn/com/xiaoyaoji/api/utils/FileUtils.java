package cn.com.xiaoyaoji.api.utils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import cn.com.xiaoyaoji.api.ex.ImageData;
import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;
import com.qiniu.util.StringMap;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.io.IOUtils;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.log4j.Logger;
import org.mangoframework.core.exception.UnsupportedMethodException;

/**
 * 文件上传
 * @author: zhoujingjie
 * @Date: 16/5/2
 */
public class FileUtils {
    private static Logger logger = Logger.getLogger(FileUtils.class);

    public static ImageData upload(FileItem item) throws IOException {
        if(item.getSize()==0){
            throw new IOException("file is empty");
        }
        ImageData imageData = new ImageData();
        //BufferedImage img = ImageIO.read(item.getInputStream());
        //imageData.setWidth(img.getWidth());
        //imageData.setHeight(img.getHeight());
        imageData.setSize(item.getSize());
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        //ImageIO.write(img, getImageType(item.getContentType()), baos);
        IOUtils.copy(item.getInputStream(),baos);
        logger.debug("upload server" + ConfigUtils.getUploadServer());
        if (ConfigUtils.getUploadServer().equals("qiniu")) {
            imageData.setPath(qiniuUpload(baos.toByteArray(),item.getContentType()));
            return imageData;
        }
        String url = key(item.getContentType());
        Path path = Paths.get(ConfigUtils.getFileUploadDir(), url);
        Path parent = path.getParent();
        if (!Files.exists(parent)) {
            Files.createDirectories(parent);
        }
        Files.copy(new ByteArrayInputStream(baos.toByteArray()), path, StandardCopyOption.REPLACE_EXISTING);

        imageData.setPath(url);
        return imageData;
    }

    public static ImageData uploadImage(FileItem item) throws IOException {
        if (item.getContentType().startsWith("image")) {
            return upload(item);
        }
        throw new IOException("the file is not image");
    }

    private static String getImageType(String contentType) {
        if (contentType.equals("image/jpeg"))
            return ".jpg";
        if (contentType.equals("image/png"))
            return ".png";
        if (contentType.equals("image/bmp"))
            return ".bmp";
        if (contentType.equals("image/gif"))
            return ".gif";
        if(contentType.equals("image/x-icon")){
            return ".ico";
        }
        if(contentType.equals("image/vnd.adobe.photoshop")){
            return ".psd";
        }
        if(contentType.equals("image/svg+xml")){
            return ".svg";
        }
        if(contentType.equals("image/tiff")){
            return ".tiff";
        }
        if(contentType.equals("image/vnd.wap.wbmp")){
            return ".wbmp";
        }
        if(contentType.equals("image/webp")){
            return ".wbmp";
        }
        return ".jpg";
    }

    public static String key(String contentType) {
        return new SimpleDateFormat("yyyyMM/dd/").format(new Date()).concat(StringUtils.uuid()+getImageType(contentType));
    }

    private static String qiniuUpload(byte[] bytes,String contentType) throws IOException {
        Auth auth = Auth.create(ConfigUtils.getQiniuAccessKey(), ConfigUtils.getQiniuSecretKey());
        UploadManager uploadManager = new UploadManager();
        String key = key(contentType);
        try {
            String token = auth.uploadToken(ConfigUtils.getBucketURL(), key, 3600, new StringMap().put("insertOnly", 0));
            Response res = uploadManager.put(bytes, key, token);
            String result = res.bodyString();
            logger.debug("qiniuUpload:" + result);
            if (result.contains("\"key\"")) {
                return key;
            }
            throw new IOException(result);
        } catch (QiniuException e) {
            Response r = e.response;
            throw new IOException(r.bodyString());
        }
    }

    /**
     * 根据地址上传
     * @param url http url
     * @return
     * @throws IOException
     */
    public static String uploadByURL(String url) throws IOException {
        if (ConfigUtils.getUploadServer().equals("qiniu")) {
            InputStream in = new URL(url).openConnection().getInputStream();
            byte[] bytes = IOUtils.toByteArray(in);
            return qiniuUpload(bytes,"");
        }
        throw new UnsupportedOperationException("暂不支持");
    }

    public static Map<String, Object> getImageExif(String key) {
        if (ConfigUtils.getUploadServer().equals("qiniu")) {
            String url = ConfigUtils.getFileAccessURL() + key + "?exif";
            Map<String, Object> map = HttpUtils.getJSON(url);
            if (map.get("error") != null) {
                logger.error(map.get("error"));
            }
            return map;
        } else {
            throw new UnsupportedMethodException("exif unsupport");
        }
    }

    /**
     * 删除文件
     * @param path
     * @return
     * @throws IOException
     */
    public static void delete(String path) throws IOException {
        if (path == null)
            return;
        if (ConfigUtils.getUploadServer().equals("qiniu")) {
            Auth auth = Auth.create(ConfigUtils.getQiniuAccessKey(), ConfigUtils.getQiniuSecretKey());
            BucketManager bucketManager = new BucketManager(auth);
            try {
                bucketManager.delete(ConfigUtils.getBucketURL(), path);
            } catch (QiniuException e) {
                Response r = e.response;
                throw new IOException(r.bodyString());
            }
        } else {
            Path p = Paths.get(ConfigUtils.getFileUploadDir() + path);
            Files.delete(p);
        }
    }
}
