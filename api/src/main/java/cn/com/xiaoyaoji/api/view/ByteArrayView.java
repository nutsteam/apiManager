package cn.com.xiaoyaoji.api.view;

import javax.servlet.http.HttpServletResponse;

import org.mangoframework.core.dispatcher.Parameter;
import org.mangoframework.core.view.ResultView;

/**
 * @author: zhoujingjie
 * @Date: 16/6/19
 */
public class ByteArrayView extends ResultView{
    public ByteArrayView(byte[] data) {
        super.setData(data);
    }

    @Override
    public void doRepresent(Parameter parameter) throws Exception {
        Object data = getData();
        if(data instanceof byte[]){
            HttpServletResponse response = parameter.getResponse();
            response.setContentLength(((byte[]) data).length);
            response.getOutputStream().write((byte[]) data);
        }
    }
}
