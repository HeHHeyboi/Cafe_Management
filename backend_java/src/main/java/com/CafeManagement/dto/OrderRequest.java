package com.CafeManagement.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@JsonPropertyOrder({ "menu_id", "amount", "total_price", "size", "type" })
public class OrderRequest {

	@NotNull(message = "Menu id is required")
	@JsonProperty("menu_id")
	int menu_id;

	@Min(value = 1, message = "Amount must be at least 1")
	@JsonProperty("amount")
	int amount;

	@Min(value = 1, message = "Total price must be greater than 0")
	@JsonProperty("total_price")
	double total_price;

	@JsonProperty("size")
	String size;

	@JsonProperty("type")
	String type;

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

	public double getTotal_price() {
		return total_price;
	}

	public void setTotal_price(double total_price) {
		this.total_price = total_price;
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

}
