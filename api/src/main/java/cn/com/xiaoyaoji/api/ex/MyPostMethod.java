package cn.com.xiaoyaoji.api.ex;

import org.apache.commons.httpclient.methods.PostMethod;

/**
 * @author: zhoujingjie
 * @Date: 16/8/31
 */
public class MyPostMethod extends PostMethod {
    /**
     * Returns the request's charset.  The charset is parsed from the request entity's
     * content type, unless the content type header has been set manually.
     *
     * @see RequestEntity#getContentType()
     * @since 3.0
     */
    @Override
    public String getRequestCharSet() {
        return "UTF-8";
    }

    /**
     * No-arg constructor.
     *
     * @since 1.0
     */
    public MyPostMethod() {
        super();
    }

    /**
     * Constructor specifying a URI.
     *
     * @param uri either an absolute or relative URI
     * @since 1.0
     */
    public MyPostMethod(String uri) {
        super(uri);
    }
}

