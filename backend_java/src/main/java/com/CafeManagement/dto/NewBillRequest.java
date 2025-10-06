package com.CafeManagement.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NewBillRequest {
	@JsonProperty("payment_method")
	String payment_method;

	public String getPayment_method() {
		return payment_method;
	}

	public void setPayment_method(String payment) {
		this.payment_method = payment;
	}

}
