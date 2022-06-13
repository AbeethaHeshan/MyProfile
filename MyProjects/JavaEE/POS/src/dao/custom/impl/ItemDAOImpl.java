package dao.custom.impl;


import dao.CrudUtil;
import dao.custom.ItemDAO;
import entity.Item;

import javax.naming.NamingException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ItemDAOImpl implements ItemDAO {

    @Override
    public boolean ifItemExist(String id) {
        return false;
    }

    @Override
    public String generateNewID() {
        return null;
    }

    @Override
    public boolean add(Item item) throws SQLException, NamingException, ClassNotFoundException {

         return  CrudUtil.executeUpdate("INSERT INTO Item (ItemID, Description, Quantity, Price) VALUES (?,?,?,?)",item.getItemID(),item.getDescription(),item.getQuantity(),item.getPrice());

    }

    @Override
    public boolean delete(String s) throws SQLException, NamingException {
        CrudUtil.executeUpdate("DELETE FROM Item WHERE ItemID=?",s);
        CrudUtil.closeConnection();
        return true;

    }

    @Override
    public boolean update(Item item) throws SQLException, NamingException {
        CrudUtil.executeUpdate("UPDATE Item SET Description=?,Quantity=?,Price=? WHERE ItemID=?",item.getDescription(),item.getQuantity(),item.getPrice(),item.getItemID());
        CrudUtil.closeConnection();
        return true;
    }

    @Override
    public Item search(String s) {
        return null;
    }

    @Override
    public ArrayList<Item> getAll() throws SQLException, ClassNotFoundException, NamingException {
        ResultSet resultSet = CrudUtil.executeQuery("SELECT * FROM Item");
         ArrayList<Item> items = new ArrayList<>();
        while (resultSet.next()) {
               items.add(new Item(resultSet.getString(1),resultSet.getString(2),resultSet.getInt(3),resultSet.getDouble(4)));
        }
        CrudUtil.closeConnection();
        return items;
    }
}
