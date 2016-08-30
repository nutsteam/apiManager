package cn.com.xiaoyaoji.api.utils;

import java.io.IOException;
import java.util.List;

import cn.com.xiaoyaoji.api.ex.ImageData;
import org.apache.commons.fileupload.FileItem;

/**
 * @author zhoujingjie
 * @date 2016-05-13
 */
public class ImageUtils {


    /**
     * 上传图片
     * @param items
     * @param relatedid
     * @return
     * @throws IOException
     */
    public static int upload(List<FileItem> items,String relatedid,String userid) throws IOException {
        if(items.size() == 0)
            return 0;
        int rs = 0;
        for(FileItem item:items){
            ImageData imageData = FileUtils.upload(item);
            rs +=createImage(imageData,relatedid,userid);
        }
        return rs;
    }

    /**
     * 创建图片对象
     * @param imageData
     * @param relatedid
     * @return
     */
    private static int createImage(ImageData imageData,String relatedid,String userid){
       /* Image image = new Image();
        image.setId(StringUtils.id());
        image.setCreatetime(DateUtils.toStr(new Date()));
        image.setRelatedid(relatedid);
        image.setSize(imageData.getSize());
        image.setWidth(imageData.getWidth());
        image.setHeight(imageData.getHeight());
        image.setPath(image.getPath());
        image.setUserid(userid);
        return DataFactory.instance().insert(image);*/
        return 0;
    }
}
