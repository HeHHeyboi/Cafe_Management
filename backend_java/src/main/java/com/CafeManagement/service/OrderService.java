package com.CafeManagement.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.CafeManagement.dto.OrderRequest;
import com.CafeManagement.dto.OrderResponse;
import com.CafeManagement.model.Order;
import com.CafeManagement.repo.OrderRepo;

@Service
@Transactional
public class OrderService {
	OrderRepo repo;

	@Autowired
	public OrderService(OrderRepo repo) {
		this.repo = repo;
	}

	public void CreateOrder(OrderRequest req, String bill_id) throws Exception {
		repo.CreateOrder(req, bill_id);
	}

	public List<OrderResponse> GetAllOrder() throws Exception {
		List<Order> orders = repo.GetAllOrders();
		List<OrderResponse> responses = new ArrayList<OrderResponse>();
		for (Order order : orders) {
			responses.add(new OrderResponse(order));
		}

		return responses;
	}

	public List<OrderResponse> GetOrderByBillId(String id) throws Exception {
		List<Order> orders = repo.GetOrdersByBillId(id);
		List<OrderResponse> responses = new ArrayList<OrderResponse>();
		for (Order order : orders) {
			responses.add(new OrderResponse(order));
		}
		return responses;
	}

	// public void UpdateOrderById(OrderRequest req, int order_id, String bill_id)
	// throws Exception {
	// repo.UpdateOrderById(req, bill_id, order_id);
	// }

	public void DeleteAllOrder() throws Exception {
		repo.DeleteAllOrders();
	}

}
