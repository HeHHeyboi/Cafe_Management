package com.CafeManagement.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class Bill {
	UUID bill_id;
	LocalDateTime created_at; // วันที่ + เวลา
	double total;
	String payment_method;

	public Bill() {

	}

	public Bill(UUID bill_id, LocalDateTime created_at, double total, String payment) {
		this.bill_id = bill_id;
		this.created_at = created_at;
		this.total = total;
		this.payment_method = payment;
	}

	// getter
	public UUID getBill_id() {
		return bill_id;
	}

	public LocalDateTime getCreated_at() {
		return created_at;
	}

	public Double getTotal() {
		return total;
	}

	// setter
	public void setBill_id(UUID bill_id) {
		this.bill_id = bill_id;
	}

	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public void setPayment_method(String payment) {
		this.payment_method = payment;
	}

	public String getPayment_method() {
		return payment_method;
	}
}
