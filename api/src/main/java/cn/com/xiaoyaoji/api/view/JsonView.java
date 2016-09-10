package cn.com.xiaoyaoji.api.view;

import cn.com.xiaoyaoji.api.ex.NotLoginException;
import cn.com.xiaoyaoji.api.ex.Result;
import org.mangoframework.core.dispatcher.Parameter;
import org.mangoframework.core.exception.InvalidArgumentException;

/**
 * @author zhoujingjie
 * @date 2016-05-24
 */
public class JsonView extends org.mangoframework.core.view.JsonView {
    @Override
    public void doRepresent(Parameter parameter) throws Exception {
        Object data = super.getData();
        if(!(data instanceof Result)){
            data = new Result<>(true,data);
            super.setData(data);
        }
        parameter.getResponse().setHeader("Access-Control-Allow-Origin", "*");
        parameter.getResponse().setHeader("Access-Control-Request-Method", "GET, POST, DELETE, PUT, OPTIONS");
        super.doRepresent(parameter);
    }

    @Override
    public void handleException(Parameter parameter, Throwable e) throws Exception {
        if(e instanceof NotLoginException){
            super.setData(new Result<>(-2,"会话已过期"));
        }else {
            String err= e.getMessage();
            if(!(e instanceof InvalidArgumentException)) {
                e.printStackTrace();
                err="系统错误";
            }
            super.setData(new Result<>(false, err));
        }
        doRepresent(parameter);
    }


}
