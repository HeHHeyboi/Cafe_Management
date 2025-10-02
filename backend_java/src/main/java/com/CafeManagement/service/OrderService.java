package com.CafeManagement.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.CafeManagement.dto.MenuRequest;
import com.CafeManagement.dto.MenuResponse;
import com.CafeManagement.model.Menu;
import com.CafeManagement.repo.OrderRepo;

@Service
@Transactional
public class OrderService {
    OrderRepo repo;

    @Autowired
    public OrderService(OrderRepo repo){
        this.repo = repo;
    }

    public void CreateOrder(OrderRequest req, String img_url) throws Exception {
		repo.CreateOrder(req, img_url);
	}

    public List<OrderResponse> GetAllOrder() throws Exception {
		List<Order> orders = repo.GetAllOrder();
		List<OrderResponse> responses = new ArrayList<OrderResponse>();
		for (Order order : orders) {
			responses.add(new OrderResponse(order));
		}

		return responses;
	}

    public OrderResponse GetOrder(int id) throws Exception {
		Order order = repo.GetOrderById(id);
		return new OrderResponse(order);
	}

	public void UpdateOrderById(OrderRequest req, int order_id, String img_url) throws Exception {
		repo.UpdateOrderById(req, order_id, img_url);
	}

	public void DeleteOrderById(int order_id) {
		repo.DeleteOrderrById(order_id);
	}

	public void DeleteAllOrder() throws Exception {
		repo.DeleteAllOrder();


}
