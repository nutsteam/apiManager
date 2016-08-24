package cn.com.xiaoyaoji.api.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author: zhoujingjie
 * @Date: 16/5/11
 */
public class DateUtils {

    private static DateFormat dateFormat;
    static {
        dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
    }

    public static Date toDate(String str){
        try {
            return dateFormat.parse(str);
        } catch (ParseException e) {
            try {
                return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(str);
            } catch (ParseException e1) {
                e1.printStackTrace();
            }
        }
        return null;
    }

    public static String toStr(Date date){
        return dateFormat.format(date);
    }
}
