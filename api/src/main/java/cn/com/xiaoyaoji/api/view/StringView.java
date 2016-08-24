package cn.com.xiaoyaoji.api.view;

import org.mangoframework.core.dispatcher.Parameter;
import org.mangoframework.core.view.ResultView;

/**
 * @author zhoujingjie
 * @date 2016-06-13
 */
public class StringView extends ResultView {

    public StringView(String data) {
        setData(data);
    }

    @Override
    public void doRepresent(Parameter parameter) throws Exception {
        Object data = getData();
        if(data instanceof String){
            parameter.getResponse().getWriter().write((String)data);
        }
    }
}
