package bo.custom;

import bo.SuperBO;
import dto.CustomerDTO;
import dto.ItemDTO;

import javax.naming.NamingException;
import java.sql.SQLException;
import java.util.ArrayList;

public interface ItemBO extends SuperBO{
    ArrayList<ItemDTO> getAllItem() throws SQLException, ClassNotFoundException, NamingException;

    boolean addItem(ItemDTO itemDTO) throws SQLException, NamingException, ClassNotFoundException;

    boolean updateItem(ItemDTO itemDTO) throws SQLException, NamingException;

    boolean ifItemExist(String id);

    boolean deleteItem(String id) throws SQLException, NamingException;

    String generateNewID();
}
