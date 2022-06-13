package dao.custom;

import dao.CrudDAO;
import entity.Item;

public interface ItemDAO extends CrudDAO<Item,String> {
    boolean ifItemExist(String id);
    String generateNewID() ;
}
