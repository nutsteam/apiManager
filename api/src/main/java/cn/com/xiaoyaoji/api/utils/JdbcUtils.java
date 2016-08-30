package cn.com.xiaoyaoji.api.utils;

import java.sql.Connection;
import java.sql.SQLException;

import org.apache.commons.dbutils.DbUtils;

import com.alibaba.druid.pool.DruidDataSource;

/**
 * @author: zhoujingjie
 * @Date: 16/5/2
 */
public class JdbcUtils {
    private static DruidDataSource ds;
    static {
        ds = new DruidDataSource();
        ds.setDriverClassName(ConfigUtils.getJdbcDriverclass());
        ds.setUsername(ConfigUtils.getJdbcUsername());
        ds.setPassword(ConfigUtils.getJdbcPassword());
        ds.setUrl(ConfigUtils.getJdbcURL());
        ds.setInitialSize(Integer.parseInt(ConfigUtils.getJdbcInitSize()));
        ds.setMaxWait(Long.parseLong(ConfigUtils.getJdbcMaxWait()));
        ds.setMaxActive(100);
        ds.setMinIdle(Integer.parseInt(ConfigUtils.getJdbcMinIdle()));
        ds.setTimeBetweenEvictionRunsMillis(10000);
        ds.setValidationQuery("select 'x'");
        ds.setPoolPreparedStatements(true);
        try {
            ds.setFilters("stat");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnect() throws SQLException {
        Connection connection= ds.getConnection();
        connection.setAutoCommit(false);
        return connection;
    }

    public static void close(Connection connection){
        DbUtils.closeQuietly(connection);
    }
    public static void commit(Connection connection){
        try {
            connection.commit();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
