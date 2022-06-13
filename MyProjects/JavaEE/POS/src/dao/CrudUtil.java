package dao;

import javax.annotation.Resource;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.annotation.WebServlet;
import javax.sql.DataSource;
import java.sql.*;

public class CrudUtil {

   static Context ctx = null;
   static  Connection connection = null;

    private static PreparedStatement getPreparedStatement(String sql,Object... args) throws SQLException, NamingException {
        ctx =new InitialContext();
        DataSource ds = (DataSource)ctx.lookup("java:comp/env/jdbc/pool");
        System.out.println(args.length);
        // System.out.println(ds.getConnection()+ "Connection");
        connection = ds.getConnection();
         PreparedStatement preparedStatement = connection.prepareStatement(sql);
        for (int i = 0; i < args.length; i++) {
             preparedStatement.setObject(i+1,args[i]);
         }
        return preparedStatement;
     }

     public static boolean executeUpdate(String sql,Object... args) throws SQLException, NamingException {
          return getPreparedStatement(sql,args).executeUpdate() > 0;
     }

     public static ResultSet executeQuery(String sql, Object... args) throws SQLException, ClassNotFoundException, NamingException {
        return getPreparedStatement(sql, args).executeQuery();
    }

    public static void closeConnection() throws SQLException {
       connection.close();
    }
}
