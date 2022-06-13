package entity;

public class Order {
    private String orderID;
    private String customerID;
    private String Date;

    public String getOrderID() {
        return orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    public String getCustomerID() {
        return customerID;
    }

    public void setCustomerID(String customerID) {
        this.customerID = customerID;
    }

    public String getDate() {
        return Date;
    }

    public void setDate(String date) {
        Date = date;
    }

    public Order(String orderID, String customerID, String date) {
        this.orderID = orderID;
        this.customerID = customerID;
        Date = date;
    }

    public Order() {
    }
}
