package dto;

public class ItemDTO {
    private String itemID;
    private String description;
    private int quantity;
    private double price;

    public String getItemID() {
        return itemID;
    }

    public void setItemID(String itemID) {
        this.itemID = itemID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public ItemDTO(String itemID, String description, int quantity, double price) {
        this.itemID = itemID;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
    }

    public ItemDTO() {
    }
}
