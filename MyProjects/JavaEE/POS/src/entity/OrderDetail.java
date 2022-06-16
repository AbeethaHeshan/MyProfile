package entity;

public class OrderDetail {
     private String orderId;
     private String itemId;
     private String description;
     private String qty;

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    double price;


    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getQty() {
        return qty;
    }

    public void setQty(String qty) {
        this.qty = qty;
    }


    public OrderDetail(String orderId, String itemId, String description, String qty, double price) {
        this.orderId = orderId;
        this.itemId = itemId;
        this.description = description;
        this.qty = qty;
        this.price = price;
    }

    public OrderDetail() {
    }
}
