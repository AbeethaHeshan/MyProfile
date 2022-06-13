package bo.custom.impl;

import bo.custom.ItemBO;
import dao.custom.impl.ItemDAOImpl;
import dto.CustomerDTO;
import dto.ItemDTO;
import entity.Item;

import javax.naming.NamingException;
import java.sql.SQLException;
import java.util.ArrayList;

public class ItemBOImpl implements ItemBO {

        ItemDAOImpl itemdao= new ItemDAOImpl();
    @Override
    public ArrayList<ItemDTO> getAllItem() throws SQLException, ClassNotFoundException, NamingException {

        ArrayList<Item> all = itemdao.getAll();
        ArrayList<ItemDTO> allItem = new ArrayList<>();

        for (Item items:all
             ) {
              allItem.add(new ItemDTO(items.getItemID(),items.getDescription(),items.getQuantity(),items.getPrice()));
        }
        return  allItem;
    }

    @Override
    public boolean addItem(ItemDTO itemDTO) throws SQLException, NamingException, ClassNotFoundException {

        return itemdao.add(new Item(itemDTO.getItemID(),itemDTO.getDescription(),itemDTO.getQuantity(),itemDTO.getPrice()));

    }

    @Override
    public boolean updateItem(ItemDTO itemDTO) throws SQLException, NamingException {

         return itemdao.update(new Item(itemDTO.getItemID(),itemDTO.getDescription(),itemDTO.getQuantity(),itemDTO.getPrice()));

    }

    @Override
    public boolean ifItemExist(String id) {
        return false;
    }

    @Override
    public boolean deleteItem(String id) throws SQLException, NamingException {
        return itemdao.delete(id);
    }

    @Override
    public String generateNewID() {
        return null;
    }
}
