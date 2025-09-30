package com.CafeManagement.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class Bill {
	UUID bill_id;
	LocalDateTime pay_date; // วันที่ + เวลา
	double total;

	public Bill() {

	}

	public Bill(UUID bill_id, LocalDateTime pay_date, double total) {
		this.bill_id = bill_id;
		this.pay_date = pay_date;
		this.total = total;
	}

	// getter
	public UUID getBill_id() {
		return bill_id;
	}

	public LocalDateTime getPay_date() {
		return pay_date;
	}

	public double getTotal() {
		return total;
	}

	// setter
	public void setBill_id(UUID bill_id) {
		this.bill_id = bill_id;
	}

	public void setPay_date(LocalDateTime pay_date) {
		this.pay_date = pay_date;
	}

	public void setTotal(double total) {
		this.total = total;
	}

}
