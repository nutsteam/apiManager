package cn.com.xiaoyaoji.api.data;

import java.sql.Connection;
import java.sql.SQLException;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.ResultSetHandler;
import org.apache.log4j.Logger;

/**
 * @author zhoujingjie
 * @date 2016-05-30
 */
public class MyQueryRunner extends QueryRunner {

    private static Logger logger = Logger.getLogger(MyQueryRunner.class);

    @Override
    public int update(Connection conn, String sql, Object... params) throws SQLException {
        log(sql,params);
        return super.update(conn, sql, params);
    }


    @Override
    public <T> T query(Connection conn, String sql, ResultSetHandler<T> rsh, Object... params) throws SQLException {
        log(sql,params);
        return super.query(conn, sql, rsh, params);
    }

    @Override
    public <T> T insert(Connection conn, String sql, ResultSetHandler<T> rsh, Object... params) throws SQLException {
        log(sql,params);
        return super.insert(conn, sql, rsh, params);
    }

    private void log(String sql, Object... params){
        if(logger.isDebugEnabled()) {
            logger.debug("sql: " + sql);
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            if(params!=null && params.length>0){
                for(Object param:params){
                    sb.append(param);
                    sb.append(",");
                }
                sb = sb.delete(sb.length()-1,sb.length());
            }
            sb.append("]");
            logger.debug("params: "+sb);
        }
    }
}
