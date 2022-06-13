package bo.custom.impl;


import bo.custom.CustomerBO;
import dao.custom.impl.CustomerDAOImpl;
import dto.CustomerDTO;
import entity.Customer;

import javax.naming.NamingException;
import java.sql.SQLException;
import java.util.ArrayList;

public class CustomerBOImpl implements CustomerBO {
     CustomerDAOImpl customerDAO = new CustomerDAOImpl();
    @Override
    public ArrayList<CustomerDTO> getAllCustomer() throws SQLException, ClassNotFoundException, NamingException {
        ArrayList<Customer> all = customerDAO.getAll();
        ArrayList<CustomerDTO> dtos = new ArrayList<>();
        for (Customer customer: all) {
             dtos.add(new CustomerDTO(customer.getCustomerID(),customer.getName(),customer.getAddress(),customer.getNic(),customer.getTel()));
        }
        return  dtos;
    }

    @Override
    public boolean addCustomer(CustomerDTO customerDTO) throws SQLException, NamingException {

       return customerDAO.add(new Customer(customerDTO.getCustomerID(),customerDTO.getName(),customerDTO.getAddress(),customerDTO.getNic(),customerDTO.getTel()));

    }

    @Override
    public boolean updateCustomer(CustomerDTO customerDTO) throws SQLException, NamingException {
        return customerDAO.update(new Customer(customerDTO.getCustomerID(),customerDTO.getName(),customerDTO.getAddress(),customerDTO.getNic(),customerDTO.getTel()));

    }

    @Override
    public boolean ifCustomerExist(String id) {
        return false;
    }

    @Override
    public boolean deleteCustomer(String id) throws SQLException, NamingException {
        return customerDAO.delete(id);
    }

    @Override
    public String generateNewID() {
        return null;
    }
}
