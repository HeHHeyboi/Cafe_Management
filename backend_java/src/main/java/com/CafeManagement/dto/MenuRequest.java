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
		Double price;

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

	@NotBlank(message = "Must have Menu Name")
	@JsonProperty("name")
	String name;

	@NotBlank(message = "Must have Menu Type")
	@JsonProperty("menu_type")
	String menu_type;

	@JsonProperty("category")
	List<Category> category;

	@JsonProperty("types")
	List<Type> types;

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

	public List<Category> getCategory() {
		return category;
	}

	public void setCategory(List<Category> category) {
		this.category = category;
	}

	public List<Type> getTypes() {
		return types;
	}

	public void setTypes(List<Type> types) {
		this.types = types;
	}
}
