package cn.com.xiaoyaoji.api.ex;

/**
 * @author zhoujingjie
 * @date 2016-05-13
 */
public class ImageData {
    private String path;
    private int width;
    private int height;
    private long size;

    public ImageData() {
    }

    public ImageData(String path, int width, int height, int size) {
        this.path = path;
        this.width = width;
        this.height = height;
        this.size = size;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }
}
