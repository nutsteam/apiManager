package cn.com.xiaoyaoji.api.utils;


import cn.com.xiaoyaoji.api.annotations.Alias;
import cn.com.xiaoyaoji.api.annotations.Ignore;
import cn.com.xiaoyaoji.api.ex.SQLBuildResult;
import cn.com.xiaoyaoji.api.ex._HashMap;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * @author: zhoujingjie
 * @Date: 16/5/2
 */
public class SqlUtils {

    public static SQLBuildResult generateInsertSQL(Object bean) {
        Map<String,Object> map = getTableNameAndColumns(bean);
        String tableName = (String)map.get("tableName");
        String[] columns = (String[])map.get("columns");
        Object[] values = (Object[])map.get("values");
        StringBuilder sql = new StringBuilder("insert into ");
        sql.append(tableName);
        sql.append(" (");
        for (String column : columns) {
            sql.append(column);
            sql.append(",");
        }
        sql = sql.delete(sql.length() - 1, sql.length());
        sql.append(")");
        sql.append(" values (");
        for (String column : columns) {
            sql.append("?,");
        }
        sql = sql.delete(sql.length() - 1, sql.length());
        sql.append(")");
        return new SQLBuildResult(sql.toString(),values);
    }


    private static Map<String,Object> getTableNameAndColumns(Object bean){
        Class<?> clazz = bean.getClass();
        String tableName;
        Alias alias;
        if ((alias = clazz.getAnnotation(Alias.class)) != null) {
            tableName = alias.value();
        } else {
            tableName = clazz.getSimpleName();
        }
        List<String> names = new ArrayList<>();
        List<Object> values = new ArrayList<>();
        for (Field field : clazz.getDeclaredFields()) {
            if (field.getAnnotation(Ignore.class) != null) {
                continue;
            }
            if (!field.isAccessible()) {
                field.setAccessible(true);
            }
            Object value = null;
            try {
                value = field.get(bean);
            } catch (IllegalAccessException e) {
                //ignore
            }
            if(value!=null){
                names.add(field.getName());
                values.add(value);
            }
        }
        return new _HashMap<String,Object>().add("tableName",tableName)
                    .add("columns",names.toArray(new String[names.size()]))
                .add("values",values.toArray(new Object[values.size()]));
    }


    public static String getTableName(Object instance){
        Alias alias = instance.getClass().getAnnotation(Alias.class);
        if(alias!=null)
            return alias.value();
        return instance.getClass().getSimpleName();
    }

    public static String getTableName(Class clazz){
        Alias alias = (Alias) clazz.getAnnotation(Alias.class);
        if(alias!=null)
            return alias.value();
        return clazz.getSimpleName();
    }

    public static SQLBuildResult generateDeleteSQL(Object bean){
        Map<String,Object> map = getTableNameAndColumns(bean);
        String tableName= (String)map.get("tableName");
        String[] columns=(String[])map.get("columns");
        Object[] values =(Object[])map.get("values");
        StringBuilder sql = new StringBuilder("delete from ");
        sql.append(tableName);
        sql.append(" where ");
        for(String column:columns){
            sql.append(column+"=? and");
        }

        sql = sql.delete(sql.length() - 3, sql.length());
        return new SQLBuildResult(sql.toString(),values);
    }

    public static SQLBuildResult generateUpdateSQL(Object bean){
        Map<String,Object> map = getTableNameAndColumns(bean);
        String tableName= (String)map.get("tableName");
        String[] columns=(String[])map.get("columns");
        Object[] values =(Object[])map.get("values");
        StringBuilder sql = new StringBuilder("update ");
        sql.append(tableName);
        sql.append(" set ");
        int i = 0;
        Object value = null;
        for(String column:columns){
            if(column.equals("id")){
                value = values[i];
            }
            sql.append(column + "=?,");
            i++;
        }
        sql = sql.delete(sql.length() - 1, sql.length());
        sql.append(" where id=?");
        if(value!=null){
            values=Arrays.copyOf(values,values.length+1);
            values[values.length-1]=value;
        }
        return new SQLBuildResult(sql.toString(),values);
    }


}
