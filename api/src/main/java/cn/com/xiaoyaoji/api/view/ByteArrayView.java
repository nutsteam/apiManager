package cn.com.xiaoyaoji.api.view;

import javax.servlet.http.HttpServletResponse;

import org.mangoframework.core.dispatcher.Parameter;
import org.mangoframework.core.view.ResultView;

import java.util.HashMap;
import java.util.Map;

/**
 * @author: zhoujingjie
 * @Date: 16/6/19
 */
public class ByteArrayView extends ResultView{
    public ByteArrayView(byte[] data) {
        super.setData(data);
    }
    private Map<String,String> headerMap = new HashMap<>();

    public ByteArrayView setHeader(String name,String value){
        headerMap.put(name,value);
        return this;
    }
    @Override
    public void doRepresent(Parameter parameter) throws Exception {
        Object data = getData();
        if(data instanceof byte[]){
            HttpServletResponse response = parameter.getResponse();
            for(Map.Entry<String,String> entry:headerMap.entrySet()) {
                response.setHeader(entry.getKey(),entry.getValue());
            }
            response.setHeader("Pragma", "No-cache");
            response.setHeader("Cache-Control", "No-cache");
            response.setContentLength(((byte[]) data).length);
            response.getOutputStream().write((byte[]) data);
        }
    }
}
