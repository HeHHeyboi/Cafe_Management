package com.CafeManagement.dto;

import java.util.List;

import com.CafeManagement.model.Menu;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "menu_id", "name", "price", "menu_type", "size", "types", "" })
public class MenuResponse {
	@JsonProperty("menu_id")
	int id;
	@JsonProperty("name")
	String name;
	@JsonProperty("price")
	double price;
	@JsonProperty("size")
	String size;
	@JsonProperty("types")
	List<Type> types;
	@JsonProperty("img_url")
	String img_url;

	public MenuResponse(Menu menu) {
		this.id = menu.getId();
		this.name = menu.getName();
		this.price = menu.getPrice();
		this.size = menu.getSize();
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

	public double getPrice() {
		return price;
	}

	public String getSize() {
		return size;
	}

	public List<Type> getTypes() {
		return types;
	}

	public String getImg_url() {
		return img_url;
	}
}
