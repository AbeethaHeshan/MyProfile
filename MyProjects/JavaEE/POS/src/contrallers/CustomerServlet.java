package contrallers;


import bo.custom.impl.CustomerBOImpl;
import dao.custom.impl.CustomerDAOImpl;
import dto.CustomerDTO;

import javax.annotation.Resource;
import javax.json.*;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/customer")
public class CustomerServlet extends HttpServlet {

    CustomerBOImpl customerBO = new CustomerBOImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        PrintWriter writer = resp.getWriter();
        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        try {
            for (CustomerDTO c: customerBO.getAllCustomer()) {

                 //add to json array
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("id",c.getCustomerID());
                objectBuilder.add("name",c.getName());
                objectBuilder.add("address",c.getAddress());
                objectBuilder.add("nic",c.getNic());
                objectBuilder.add("tel",c.getTel());
                arrayBuilder.add(objectBuilder.build());
            }

            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("data",arrayBuilder.build());
            objectBuilder.add("message","success");
            objectBuilder.add("status",200);

            writer.print(objectBuilder.build());

        } catch (SQLException | ClassNotFoundException | NamingException throwables) {
            throwables.printStackTrace();
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("data",throwables.getLocalizedMessage());
            objectBuilder.add("status","Not Success");
            objectBuilder.add("Status",500);
            objectBuilder.build();
        }


    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();
        String id = jsonObject.getString("id");
        String name = jsonObject.getString("name");
        String address = jsonObject.getString("address");
        String nic = jsonObject.getString("nic");
        String tel = jsonObject.getString("tel");
        System.out.println(id);
        try {
            if(customerBO.addCustomer(new CustomerDTO(id, name, address, nic, tel))){

                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("message","Success");
                objectBuilder.add("status",200);
                objectBuilder.build();

            }
        } catch (SQLException throwables) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("message","Unsuccess");
            objectBuilder.add("error",throwables.getLocalizedMessage());
            objectBuilder.add("status",500);
            PrintWriter writer = resp.getWriter();
            writer.print(objectBuilder.build());

            throwables.printStackTrace();
        } catch (NamingException e) {

            e.printStackTrace();
        }

    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        System.out.println("Do PUT");

        JsonReader reader = Json.createReader(req.getReader());

            JsonObject jsonObject = reader.readObject();
            String id = jsonObject.getString("id");
            String name = jsonObject.getString("name");
            String address = jsonObject.getString("address");
            String nic = jsonObject.getString("nic");
            String tel = jsonObject.getString("tel");

        System.out.println(id+" ID");

       try {
            customerBO.updateCustomer(new CustomerDTO(id,name,address,nic,tel));
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("message","Success");
            objectBuilder.add("status",200);

            PrintWriter writer = resp.getWriter();
            writer.print(objectBuilder.build());


        } catch (SQLException throwables) {
            throwables.printStackTrace();
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("message","UnSuccess");
            objectBuilder.add("Error",throwables.getLocalizedMessage());
            objectBuilder.add("status",500);

            PrintWriter writer = resp.getWriter();
            writer.print(objectBuilder.build());

        } catch (NamingException e) {
            e.printStackTrace();
        }

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");
        try {
            customerBO.deleteCustomer(id);
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("Message","Success");
            objectBuilder.add("Status",200);
            PrintWriter writer = resp.getWriter();
            writer.print(objectBuilder.build());

        } catch (SQLException throwables) {

            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("Message","UnSuccess");
            objectBuilder.add("Error",throwables.getLocalizedMessage());
            objectBuilder.add("Status",200);
            objectBuilder.build();
            PrintWriter writer = resp.getWriter();
            writer.print(objectBuilder.build());
            throwables.printStackTrace();

        } catch (NamingException e) {
            e.printStackTrace();
        }
        System.out.println(id);
    }
}
