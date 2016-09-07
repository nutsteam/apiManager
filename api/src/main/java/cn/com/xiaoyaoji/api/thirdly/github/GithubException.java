package cn.com.xiaoyaoji.api.thirdly.github;

import cn.com.xiaoyaoji.api.thirdly.exception.ThirdlyException;

/**
 * @author: zhoujingjie
 * @Date: 16/9/2
 */
public class GithubException extends ThirdlyException{
    public GithubException() {
    }

    public GithubException(String message) {
        super(message);
    }

    public GithubException(String message, Throwable cause) {
        super(message, cause);
    }

    public GithubException(Throwable cause) {
        super(cause);
    }

    public GithubException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
