package com.CafeManagement.repo;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.CafeManagement.dto.OrderRequest;
import com.CafeManagement.model.Order;

@Repository
public class OrderRepo {
    @Autowired
	JdbcTemplate jdbc;

    final String createOrder = """
            INSERT INTO orders(bill_id, menu_name, amount, size, type, total_price)
            VALUES (?,?,?,?,?,?)
            """;

    public void CreateOrder(OrderRequest order, String bill_id) throws Exception {
        jdbc.update(createOrder,
                UUID.fromString(bill_id),
                order.getMenu_name(),
                order.getAmount(),
                order.getSize(),
                //order.getType(),
                order.getTotal_price());
    }

    final String getOrdersByBillId = """
            SELECT bill_id, menu_name, amount, size, type, total_price
            FROM orders
            WHERE bill_id = ?
            """;

    public List<Order> GetOrdersByBillId(String bill_id) throws Exception {
        List<Order> orders = new ArrayList<>();
        SqlRowSet rows = jdbc.queryForRowSet(getOrdersByBillId, bill_id);
        while (rows.next()) {
            Order order = new Order();
            order.setBill_id(UUID.fromString(rows.getString("bill_id")));
            order.setMenu_name(rows.getString("menu_name"));
            order.setAmount(rows.getInt("amount"));
            order.setSize(rows.getString("size"));
            order.setType(rows.getString("type"));
            order.setTotal_price(rows.getDouble("total_price"));
            orders.add(order);
        }
        return orders;
    }

    final String deleteOrdersByBillId = """
            DELETE FROM orders
            WHERE bill_id = ?
            """;

    public void DeleteOrdersByBillId(UUID bill_id) {
        jdbc.update(deleteOrdersByBillId, bill_id);
    }

    final String deleteOrderById = """
            DELETE FROM orders
            WHERE order_id = ?
            """;

    final String updateOrderById = """
            UPDATE orders
            SET size = ?, type = ?, price = ?
            WHERE order_id = ?;
            """;

    public void UpdateOrderById(OrderRequest order, UUID bill_id) throws Exception {
        int apply = jdbc.update(updateOrderById,
                order.getAmount(),
                order.getSize(),
                //order.getType(),
                order.getTotal_price(),
                bill_id);

        if (apply == 0) {
            throw new RuntimeException("Can't find order with id " + bill_id);
        }
    }

    final String getAllOrders = """
            SELECT bill_id, menu_name, amount, size, type, total_price
            FROM orders
            """;

    public List<Order> GetAllOrders() throws Exception {
        List<Order> orders = new ArrayList<>();
        SqlRowSet rows = jdbc.queryForRowSet(getAllOrders);
        while (rows.next()) {
            Order order = new Order();
            order.setBill_id(UUID.fromString(rows.getString("bill_id")));
            order.setMenu_name(rows.getString("menu_name"));
            order.setAmount(rows.getInt("amount"));
            order.setSize(rows.getString("size"));
            order.setType(rows.getString("menu_type"));
            order.setTotal_price(rows.getDouble("total_price"));
            orders.add(order);
        }
        return orders;
    }

    final String deleteAllOrders = """
            DELETE FROM orders
            """;

    public void DeleteAllOrders() {
        jdbc.update(deleteAllOrders);
    }

}
