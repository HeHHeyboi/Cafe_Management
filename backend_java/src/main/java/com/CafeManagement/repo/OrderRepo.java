package com.CafeManagement.repo;

import java.util.List;
import java.util.UUID;

import com.CafeManagement.dto.OrderRequest;
import com.CafeManagement.model.Order;

public interface OrderRepo {

	public void CreateOrder(OrderRequest arg, String bill_id) throws Exception;

	public List<Order> GetOrdersByBillId(String bill_id) throws Exception;

	public void DeleteOrdersByBillId(UUID bill_id);

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

	public List<Order> GetAllOrders() throws Exception;

	public void DeleteAllOrders();
}
