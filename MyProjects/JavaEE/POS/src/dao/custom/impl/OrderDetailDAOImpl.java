package dao.custom.impl;

import dao.custom.OrderDetailDAO;
import entity.OrderDetail;

import javax.naming.NamingException;
import java.sql.SQLException;
import java.util.ArrayList;

public class OrderDetailDAOImpl implements OrderDetailDAO {


    @Override
    public boolean add(OrderDetail orderDetail) throws SQLException, NamingException, ClassNotFoundException {
        return false;
    }




    @Override
    public boolean delete(String s) throws SQLException, NamingException {
        return false;
    }



    @Override
    public boolean update(OrderDetail orderDetail) throws SQLException, NamingException {
        return false;
    }



    @Override
    public OrderDetail search(String s) {
        return null;
    }



    @Override
    public ArrayList<OrderDetail> getAll() throws SQLException, ClassNotFoundException, NamingException {
        return null;
    }



}
