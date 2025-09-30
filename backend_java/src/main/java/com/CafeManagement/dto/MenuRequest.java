package com.CafeManagement.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;

public class MenuRequest {
	public class Category {
		@JsonProperty("size")
		String size;

		@JsonProperty("price")
		double price;

		@JsonProperty("types")
		Type types[];

		public void setSize(String size) {
			this.size = size;
		}

		public void setPrice(double price) {
			this.price = price;
		}

		public void setTypes(Type[] types) {
			this.types = types;
		}

		public String getSize() {
			return size;
		}

		public double getPrice() {
			return price;
		}

		public Type[] getTypes() {
			return types;
		}
	}

	public class Type {
		@JsonProperty("type")
		String type;

		@JsonProperty("addition_price")
		String addition_price;

		public void setType(String type) {
			this.type = type;
		}

		public void setAddition_price(String addition_price) {
			this.addition_price = addition_price;
		}

		public String getType() {
			return type;
		}

		public String getAddition_price() {
			return addition_price;
		}
	}

	@NotBlank(message = "Must have Menu Name")
	@JsonProperty("name")
	String name;

	@NotBlank(message = "Must have Menu Type")
	@JsonProperty("menu_type")
	String menu_type;

	@JsonProperty("category")
	Category category[];

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMenu_type() {
		return menu_type;
	}

	public void setMenu_type(String menu_type) {
		this.menu_type = menu_type;
	}

	public Category[] getCategory() {
		return category;
	}

	public void setCategory(Category[] category) {
		this.category = category;
	}
}
