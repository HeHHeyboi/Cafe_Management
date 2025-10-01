package com.CafeManagement.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.validation.constraints.NotBlank;

@JsonPropertyOrder({ "name", "menu_type", "category" })
public class MenuRequest {

	@NotBlank(message = "Must have Menu Name")
	@JsonProperty("name")
	String name;

	@NotBlank(message = "Must have Menu Type")
	@JsonProperty("menu_type")
	String menu_type;

	@JsonProperty("category")
	List<Category> category = new ArrayList<>();

	@JsonProperty("types")
	List<Type> types = new ArrayList<>();

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
