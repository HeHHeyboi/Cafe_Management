package com.CafeManagement.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.validation.constraints.NotBlank;

@JsonPropertyOrder({ "name", "menu_type", "category" })
public class MenuRequest {
	public static class Category {
		@JsonProperty("size")
		String size;

		@JsonProperty("price")
		double price;

		@JsonProperty("types")
		List<Type> types;

		public String getSize() {
			return size;
		}

		public void setSize(String size) {
			this.size = size;
		}

		public double getPrice() {
			return price;
		}

		public void setPrice(double price) {
			this.price = price;
		}

		public List<Type> getTypes() {
			return types;
		}

		public void setTypes(List<Type> types) {
			this.types = types;
		}

	}

	@NotBlank(message = "Must have Menu Name")
	@JsonProperty("name")
	String name;

	@NotBlank(message = "Must have Menu Type")
	@JsonProperty("menu_type")
	String menu_type;

	@JsonProperty("category")
	List<Category> category;
}
