package cn.com.xiaoyaoji.api.handler;


import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.commons.dbutils.ResultSetHandler;

/**
 * @author zhoujingjie
 * @date 2016-06-14
 */
public class StringResultHandler implements ResultSetHandler<String> {
    @Override
    public String handle(ResultSet rs) throws SQLException {
        if(rs.next()) {
            return rs.getString(1);
        }
        return null;
    }
}
