package bo.custom;

import bo.SuperBO;
import dto.CustomerDTO;

import javax.naming.NamingException;
import java.sql.SQLException;
import java.util.ArrayList;

public interface CustomerBO extends SuperBO {
    ArrayList<CustomerDTO> getAllCustomer() throws SQLException, ClassNotFoundException, NamingException;

    boolean addCustomer(CustomerDTO customerDTO) throws SQLException, NamingException;

    boolean updateCustomer(CustomerDTO customerDTO) throws SQLException, NamingException;

    boolean ifCustomerExist(String id);

    boolean deleteCustomer(String id) throws SQLException, NamingException;

    String generateNewID();
}