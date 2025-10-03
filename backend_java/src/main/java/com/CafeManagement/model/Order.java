package com.CafeManagement.model;

import java.util.UUID;

public class Order {
	UUID bill_id;
	int menu_id;
	int amount;
	double total_price;
	String size;
	String type;

	public Order() {

	}

	public Order(UUID bill_id, int menu_id, int amount, double total_price, String size, String type) {
		this.bill_id = bill_id;
		this.menu_id = menu_id;
		this.amount = amount;
		this.total_price = total_price;
		this.size = size;
		this.type = type;
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
