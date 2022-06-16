package bo.custom;

import bo.SuperBO;

public interface PurchaseOrderBO extends SuperBO {
    boolean ifOrderExist(String id);
    String generateNewID();
    void orderDetail();


}
