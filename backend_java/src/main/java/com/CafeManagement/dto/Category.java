package com.CafeManagement.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Category {
	@JsonProperty("size")
	String size;

	@JsonProperty("price")
	Double price;

	public Category(String size, Double price) {
		this.size = size;
		this.price = price;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

}
