package com.CafeManagement.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CafeManagement.dto.OrderRequest;
import com.CafeManagement.dto.OrderResponse;
import com.CafeManagement.exception.OrderNotFoundException;
import com.CafeManagement.service.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/order")
public class OrderController {
	private final OrderService service;

	@Autowired
	public OrderController(OrderService service) {
		this.service = service;
	}

	// Get All Orders
	@GetMapping
	public ResponseEntity<?> getAllOrders() {
		List<OrderResponse> responses = new ArrayList<>();
		try {
			responses = service.GetAllOrder();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"%s"}
					""".formatted(e.getMessage()));
		}
		return ResponseEntity.ok(responses);
	}

	// Get Order By ID
	@GetMapping("/{bill_id}")
	public ResponseEntity<?> getOrderByBillId(@PathVariable String bill_id) {
		List<OrderResponse> response = new ArrayList<>();
		try {
			response = service.GetOrderByBillId(bill_id);
		} catch (OrderNotFoundException notfound) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("""
					{"error":"%s"}
					""".formatted(notfound.getMessage()));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"%s"}
					""".formatted(e.getMessage()));
		}
		return ResponseEntity.ok(response);
	}

	// Create Order
	@PostMapping("/{bill_id}")
	public ResponseEntity<String> addOrder(@PathVariable String bill_id, @Valid @RequestBody OrderRequest req) {
		try {
			service.CreateOrder(req, bill_id);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"Can't Create Order"}
					""");
		}
		return ResponseEntity.status(HttpStatus.CREATED).body("""
				{"msg":"Create Order Success"}
				""");
	}

	// Update Order
	// @PutMapping("/{bill_id}/{order_id}")
	// public ResponseEntity<String> updateOrderById(
	// @Valid @RequestBody OrderRequest req, @PathVariable String bill_id,
	// @PathVariable int order_id) {
	// try {
	// service.UpdateOrderById(req, order_id, bill_id);
	// } catch (OrderNotFoundException notfound) {
	// return ResponseEntity.status(HttpStatus.NOT_FOUND).body("""
	// {"error":"%s"}
	// """.formatted(notfound.getMessage()));
	// } catch (Exception e) {
	// e.printStackTrace();
	// return ResponseEntity.internalServerError().body("""
	// {"error":"%s"}
	// """.formatted(e.getMessage()));
	// }
	// return ResponseEntity.ok("""
	// {"msg":"Order updated successfully"}
	// """);
	// }
	//
	// Delete Order
	// @DeleteMapping("/{order_id}")
	// public ResponseEntity<String> deleteOrderById(@PathVariable int order_id) {
	// try {
	// service.DeleteOrderById(order_id);
	// } catch (Exception e) {
	// e.printStackTrace();
	// return ResponseEntity.internalServerError().body("""
	// {"error":"%s"}
	// """.formatted(e.getMessage()));
	// }
	// return ResponseEntity.ok("""
	// {"msg":"Order deleted successfully"}
	// """);
	// }

}
