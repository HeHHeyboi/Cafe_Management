package com.CafeManagement.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;

public class MenuRequest {

	public class Category {
		@JsonProperty("size")
		String size;

		@JsonProperty("price")
		double price;
	}

	@NotBlank(message = "Must have Menu Name")
	@JsonProperty("name")
	String name;

	@NotBlank(message = "Must have price")
	@JsonProperty("price")
	double price;

	@NotBlank(message = "Must have Menu Type")
	@JsonProperty("menu_type")
	String menu_type;

}
