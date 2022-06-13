package entity;

public class Customer {
     private String customerID;
     private String name;
     private String address;
     private String nic;
     private String tel;

    public String getCustomerID() {
        return customerID;
    }

    public void setCustomerID(String customerID) {
        this.customerID = customerID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }





    public Customer(String customerID, String name, String address, String nic, String tel) {
        this.customerID = customerID;
        this.name = name;
        this.address = address;
        this.nic = nic;
        this.tel = tel;
    }

    public Customer() {
    }
}
