package cn.com.xiaoyaoji.api.handler;


import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.commons.dbutils.ResultSetHandler;

/**
 * @author zhoujingjie
 * @date 2016-06-14
 */
public class IntegerResultHandler implements ResultSetHandler<Integer> {
    @Override
    public Integer handle(ResultSet rs) throws SQLException {
        if(rs.next()) {
            return rs.getInt(1);
        }
        return 0;
    }
}
