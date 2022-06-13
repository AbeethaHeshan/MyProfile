package dao;

import javax.naming.NamingException;
import java.sql.SQLException;
import java.util.ArrayList;

public interface CrudDAO<T,ID> {
      boolean add(T t) throws SQLException, NamingException, ClassNotFoundException;
      boolean delete(ID id) throws SQLException, NamingException;
      boolean update(T t) throws SQLException, NamingException;
      T search(ID id);
      ArrayList<T> getAll() throws SQLException, ClassNotFoundException, NamingException;
}
