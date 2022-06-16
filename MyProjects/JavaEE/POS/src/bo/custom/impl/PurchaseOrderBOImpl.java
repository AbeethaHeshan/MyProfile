package bo.custom.impl;

import bo.custom.PurchaseOrderBO;
import dao.custom.OrderDAO;
import dao.custom.OrderDetailDAO;
import dao.custom.impl.OrderDAOImpl;
import dao.custom.impl.OrderDetailDAOImpl;

public class PurchaseOrderBOImpl  implements PurchaseOrderBO{

    OrderDAO orderDAO = new OrderDAOImpl();
    OrderDetailDAO orderDetailDAO = new OrderDetailDAOImpl();

    @Override
    public boolean ifOrderExist(String id) {

        return false;
    }

    @Override
    public String generateNewID() {
        return null;
    }

    @Override
    public void orderDetail() {

    }
}
