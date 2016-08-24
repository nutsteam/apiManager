package cn.com.xiaoyaoji.api.ex;

/**
 * @author: zhoujingjie
 * @Date: 16/5/4
 */
public class Result<T> {
    private int code;
    private T data;
    private String errorMsg;

    public static final int OK = 0;
    public static final int ERROR = -1;

    public Result() {
    }

    public Result(boolean result, T data) {
        if(result){
            this.code = OK;
            this.data = data;
        }else{
            this.code = ERROR;
            this.errorMsg = (String) data;
        }
    }
    public Result(int code,String errorMsg){
        this.code = code;
        this.errorMsg =errorMsg;
    }


    public int getCode() {
        return code;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }
}
