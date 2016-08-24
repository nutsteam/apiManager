package cn.com.xiaoyaoji.api.thirdly.exception;

/**
 * @author zhoujingjie
 * @date 2016-07-28
 */
public class ThirdlyException extends RuntimeException {
    public ThirdlyException() {
        super();
    }

    public ThirdlyException(String message) {
        super(message);
    }

    public ThirdlyException(String message, Throwable cause) {
        super(message, cause);
    }

    public ThirdlyException(Throwable cause) {
        super(cause);
    }

    protected ThirdlyException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
