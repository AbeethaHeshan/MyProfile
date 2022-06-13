package dao.custom.impl;

import dao.custom.OrderDAO;
import entity.Order;

import javax.naming.NamingException;
import java.sql.SQLException;
import java.util.ArrayList;

public class OrderDAOImpl implements OrderDAO {
    @Override
    public boolean ifOrderExist(String id) {
        return false;
    }

    @Override
    public String generateNewID() {

        return null;
    }

    @Override
    public boolean add(Order order) throws SQLException, NamingException, ClassNotFoundException {
        return false;
    }

    @Override
    public boolean delete(String s) throws SQLException, NamingException {
        return false;
    }

    @Override
    public boolean update(Order order) throws SQLException, NamingException {
        return false;
    }

    @Override
    public Order search(String s) {
        return null;
    }

    @Override
    public ArrayList<Order> getAll() throws SQLException, ClassNotFoundException, NamingException {
        return null;
    }
}
