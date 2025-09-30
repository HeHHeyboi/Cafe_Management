package com.CafeManagement.model;

import java.util.List;

public class Menu {
	private int id;
	private String name;
	private double price;
	private String menu_type;
	private String img_url;
	private String size;

	private List<Type> types;

	public static class Type {
		String type;
		double addition_price;

		public Type(String type, double addition_price) {
			this.type = type;
			this.addition_price = addition_price;
		}

		public String getType() {
			return type;
		}

		public double getAddition_price() {
			return addition_price;
		}
	}

	public Menu() {

	}

	public Menu(int id, String name, double price,
			String menu_type, String img_url,
			String size, List<Type> types) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.menu_type = menu_type;
		this.img_url = img_url;
		this.size = size;
		this.types = types;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getMenu_type() {
		return menu_type;
	}

	public void setMenu_type(String menu_type) {
		this.menu_type = menu_type;
	}

	public String getImg_url() {
		return img_url;
	}

	public void setImg_url(String img_url) {
		this.img_url = img_url;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public List<Type> getTypes() {
		return types;
	}
}
