package com.CafeManagement.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Type {
	@JsonProperty("type")
	String type;

	@JsonProperty("addition_price")
	double addition_price;

	public Type(String type, double addition_price) {
		this.type = type;
		this.addition_price = addition_price;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public double getAddition_price() {
		return addition_price;
	}

	public void setAddition_price(double addition_price) {
		this.addition_price = addition_price;
	}

}
