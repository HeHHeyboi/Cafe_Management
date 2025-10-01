package com.CafeManagement.dto;

import java.util.ArrayList;
import java.util.List;

import com.CafeManagement.model.Menu;
import com.CafeManagement.model.Menu.Category;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "menu_id", "name", "price", "menu_type", "size", "types", "" })
public class MenuResponse {
	@JsonProperty("menu_id")
	int id;
	@JsonProperty("name")
	String name;
	@JsonProperty("category")
	List<Category> categories = new ArrayList<>();
	@JsonProperty("types")
	List<Type> types = new ArrayList<>();
	@JsonProperty("img_url")
	String img_url;

	public MenuResponse() {
	}

	public MenuResponse(Menu menu) {
		this.id = menu.getId();
		this.name = menu.getName();
		for (Menu.Category c : menu.getCategories()) {
			this.categories.add(new Category(c.getSize(), c.getPrice()));
		}
		this.img_url = menu.getImg_url();
		for (Menu.Type t : menu.getTypes()) {
			types.add(new Type(t.getType(), t.getAddition_price()));
		}
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public List<Type> getTypes() {
		return types;
	}

	public String getImg_url() {
		return img_url;
	}
}
