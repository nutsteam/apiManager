package cn.com.xiaoyaoji.api.ex;

/**
 * @author zhoujingjie
 * @date 2016/5/5
 */
public class SQLBuildResult {
    private String sql;
    private Object[] params;

    public SQLBuildResult() {
    }

    public SQLBuildResult(String sql, Object[] params) {
        this.sql = sql;
        this.params = params;
    }

    public String getSql() {
        return sql;
    }

    public void setSql(String sql) {
        this.sql = sql;
    }

    public Object[] getParams() {
        return params;
    }

    public void setParams(Object[] params) {
        this.params = params;
    }
}
