package dao.custom.impl;

import dao.CrudUtil;
import dao.custom.CustomerDAO;
import entity.Customer;

import javax.naming.NamingException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class CustomerDAOImpl implements CustomerDAO {
    @Override
    public boolean ifCustomerExist(String id) {
        return false;
    }

    @Override
    public String generateNewID() {
        return null;
    }

    @Override
    public boolean add(Customer customer) throws SQLException, NamingException {
        System.out.println(customer.getAddress()+" Address");
        CrudUtil.executeUpdate("INSERT INTO `Customer` (CustomerID,Name,Address,Nic,Tel) VALUES(?,?,?,?,?)", customer.getCustomerID(), customer.getName(),customer.getAddress(),customer.getNic(),customer.getTel());
        CrudUtil.closeConnection();
        return true;
    }

    @Override
    public boolean delete(String s) throws SQLException, NamingException {
         CrudUtil.executeUpdate("DELETE FROM `Customer` WHERE CustomerID=?",s);
         CrudUtil.closeConnection();
         return true;
    }

    @Override
    public boolean update(Customer customer) throws SQLException, NamingException {
        CrudUtil.executeUpdate("UPDATE `Customer` SET Name=? , Address=? ,Nic=? ,Tel=? WHERE CustomerID=?",customer.getName(),customer.getAddress(),customer.getNic(),customer.getTel(),customer.getCustomerID());
        CrudUtil.closeConnection();
        return true;
    }

    @Override
    public Customer search(String s) {
        return null;
    }

    @Override
    public ArrayList<Customer> getAll() throws SQLException, ClassNotFoundException, NamingException {

        ArrayList<Customer>allCustomers = new ArrayList<>();
        ResultSet resultSet = CrudUtil.executeQuery("SELECT * FROM Customer");
        while (resultSet.next()){
            allCustomers.add(new Customer(resultSet.getString("CustomerID"),resultSet.getString("Name"),resultSet.getString("Address"),resultSet.getString("Nic"),resultSet.getString("Tel")));
            System.out.println(resultSet.getString("CustomerID"));
        }
        // close connection
        CrudUtil.closeConnection();
        return allCustomers;
    }
}
