package cn.com.xiaoyaoji.api.data;

import java.sql.Connection;
import java.sql.SQLException;

import org.apache.commons.dbutils.QueryRunner;

/**
 * @author: zhoujingjie
 * @Date: 16/5/2
 */
public interface Handler<T> {

    T handle(Connection connection, QueryRunner qr) throws SQLException;
}
