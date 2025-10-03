package com.CafeManagement.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.CafeManagement.model.Menu;
import com.CafeManagement.model.Order;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "order_id", "bill_id", "menu_id", "amount", "size", "type", "total_price", "img_url" })
public class OrderResponse {
	@JsonProperty("order_id")
	int order_id;

	@JsonProperty("bill_id")
	UUID bill_id;

	@JsonProperty("menu_id")
	int menu_id;

	@JsonProperty("amount")
	int amount;

	@JsonProperty("size")
	String size;

	@JsonProperty("type")
	String type;

	@JsonProperty("total_price")
	double total_price;

	public OrderResponse() {

	}

	public OrderResponse(Order order) {
		this.bill_id = order.getBill_id();
		this.menu_id = order.getMenu_id();
		this.amount = order.getAmount();
		this.size = order.getSize();
		this.total_price = order.getTotal_price();
		this.type = order.getType();
	}

	public int getOrder_id() {
		return order_id;
	}

	public void setOrder_id(int order_id) {
		this.order_id = order_id;
	}

	public UUID getBill_id() {
		return bill_id;
	}

	public void setBill_id(UUID bill_id) {
		this.bill_id = bill_id;
	}

	public int getMenu_id() {
		return menu_id;
	}

	public void setMenu_id(int menu_id) {
		this.menu_id = menu_id;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public double getTotal_price() {
		return total_price;
	}

	public void setTotal_price(double total_price) {
		this.total_price = total_price;
	}
}
