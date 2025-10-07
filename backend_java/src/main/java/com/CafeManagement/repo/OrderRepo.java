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
			INSERT INTO orders(bill_id, menu_id, amount, size, type, total_price)
			VALUES (?,?,?,?,?,?)
			""";

	final String getMenuName = """
			select name from menu
			where menu_id = ?;
			""";

	public void CreateOrder(OrderRequest arg, String bill_id) throws Exception {
		jdbc.update(createOrder,
				UUID.fromString(bill_id),
				arg.getMenu_id(),
				arg.getAmount(),
				arg.getSize() != null ? arg.getSize().isBlank() ? null : arg.getSize() : null,
				arg.getType() != null ? arg.getType().isBlank() ? null : arg.getType() : null,
				arg.getTotal_price());
	}

	final String getOrdersByBillId = """
			SELECT bill_id, menu_id, amount, size, type, total_price
			FROM orders
			WHERE bill_id = ?
			""";

	public List<Order> GetOrdersByBillId(String bill_id) throws Exception {
		List<Order> orders = new ArrayList<>();
		SqlRowSet rows = jdbc.queryForRowSet(getOrdersByBillId, bill_id);
		SqlRowSet row = jdbc.queryForRowSet(getMenuName, bill_id);
		String name = "";
		if (row.next()) {
			name = row.getString("name");
		}
		while (rows.next()) {
			Order order = new Order();
			order.setBill_id(UUID.fromString(rows.getString("bill_id")));
			order.setMenu_id(rows.getInt("menu_id"));
			order.setAmount(rows.getInt("amount"));
			order.setSize(rows.getString("size"));
			order.setType(rows.getString("type"));
			order.setTotal_price(rows.getDouble("total_price"));
			order.setMenu_name(name);
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

	// final String updateOrderById = """
	// UPDATE orders
	// SET amount = ?, size = ?, type = ?, total_price = ?
	// WHERE order_id = ?, bill_id = ?;
	// """;
	//
	// public void UpdateOrderById(OrderRequest order, String bill_id, int order_id)
	// throws Exception {
	// int apply = jdbc.update(updateOrderById,
	// order.getAmount(),
	// order.getSize(),
	// order.getType(),
	// order.getTotal_price(),
	// order_id, bill_id);
	//
	// if (apply == 0) {
	// throw new RuntimeException("Can't find order with id " + bill_id);
	// }
	// }

	final String getAllOrders = """
			SELECT bill_id, menu_id, amount, size, type, total_price
			FROM orders
			""";

	public List<Order> GetAllOrders() throws Exception {
		List<Order> orders = new ArrayList<>();
		SqlRowSet rows = jdbc.queryForRowSet(getAllOrders);
		while (rows.next()) {
			Order order = new Order();
			order.setBill_id(UUID.fromString(rows.getString("bill_id")));
			order.setMenu_id(rows.getInt("menu_id"));
			order.setAmount(rows.getInt("amount"));
			order.setSize(rows.getString("size"));
			order.setType(rows.getString("type"));
			SqlRowSet row = jdbc.queryForRowSet(getMenuName, order.getBill_id());
			String name = "";
			if (row.next()) {
				name = row.getString("name");
			}
			order.setTotal_price(rows.getDouble("total_price"));
			order.setMenu_name(name);
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
