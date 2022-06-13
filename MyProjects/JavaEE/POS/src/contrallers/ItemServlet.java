package contrallers;

import bo.custom.ItemBO;
import bo.custom.impl.ItemBOImpl;
import dao.custom.impl.ItemDAOImpl;
import dto.ItemDTO;

import javax.annotation.Resource;
import javax.json.*;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(urlPatterns = "/item")
public class ItemServlet extends HttpServlet {

     ItemBO itemBO = new ItemBOImpl();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();

        String id = jsonObject.getString("id");
        String description = jsonObject.getString("description");
        int quantity = Integer.parseInt(jsonObject.getString("quantity"));
        double price = Double.parseDouble(jsonObject.getString("price"));

        System.out.println(id);
        try {
            itemBO.addItem(new ItemDTO(id,description,quantity,price));
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("message","Success");
            objectBuilder.add("status",200);
            objectBuilder.build();

            PrintWriter writer = resp.getWriter();
            writer.print(objectBuilder.build());

        } catch (SQLException throwables) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("message","UnSuccess");
            objectBuilder.add("Error",throwables.getLocalizedMessage());
            objectBuilder.add("status",500);
            PrintWriter writer = resp.getWriter();
            writer.print(objectBuilder.build());

            throwables.printStackTrace();
        } catch (NamingException | ClassNotFoundException e) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("message","UnSuccess");
            objectBuilder.add("Error",e.getLocalizedMessage());
            objectBuilder.add("status",400);
            PrintWriter writer = resp.getWriter();
            writer.print(objectBuilder.build());
            e.printStackTrace();
        }

    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();
        String id = jsonObject.getString("id");
        String description = jsonObject.getString("description");
        String quantity = jsonObject.getString("quantity");
        String price = jsonObject.getString("price");

        System.out.println(id);

        try {
            itemBO.updateItem(new ItemDTO(id,description,Integer.parseInt(quantity),Double.parseDouble(price)));
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("message","Success");
            objectBuilder.add("status",200);
            objectBuilder.build();

            PrintWriter writer = resp.getWriter();
            writer.print(objectBuilder.build());


        } catch (SQLException throwables) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("message","UnSuccess");
            objectBuilder.add("Error",throwables.getLocalizedMessage());
            objectBuilder.add("status",500);
            PrintWriter writer = resp.getWriter();
            writer.print(objectBuilder.build());

            throwables.printStackTrace();
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

        try {
            for (ItemDTO items: itemBO.getAllItem()) {
              JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                    objectBuilder.add("id",items.getItemID());
                    objectBuilder.add("description",items.getDescription());
                    objectBuilder.add("quantity",items.getQuantity());
                    objectBuilder.add("price",items.getPrice());
                    arrayBuilder.add(objectBuilder.build());
            }

            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("data",arrayBuilder.build());
            objectBuilder.add("message","Success");
            objectBuilder.add("status",200);

            PrintWriter writer = resp.getWriter();
            writer.print(objectBuilder.build());
        } catch (SQLException throwables) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("message","UnSuccess");
                objectBuilder.add("Error",throwables.getLocalizedMessage());
                objectBuilder.add("status",500);
                throwables.printStackTrace();

        } catch (ClassNotFoundException e) {

            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("message","UnSuccess");
                objectBuilder.add("Error",e.getLocalizedMessage());
                objectBuilder.add("status",404);
                e.printStackTrace();

        } catch (NamingException e) {
            e.printStackTrace();
        }

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");

        try {
            itemBO.deleteItem(id);
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("message","Success");
            objectBuilder.add("status",200);
            objectBuilder.build();

            PrintWriter writer = resp.getWriter();
            writer.print(objectBuilder.build());


        } catch (SQLException throwables) {

            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("message","UnSuccess");
            objectBuilder.add("Error",throwables.getLocalizedMessage());
            objectBuilder.add("status",500);
            objectBuilder.build();

            PrintWriter writer = resp.getWriter();
            writer.print(objectBuilder.build());

            throwables.printStackTrace();
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }
}
