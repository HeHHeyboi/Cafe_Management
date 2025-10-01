package com.CafeManagement.model;

import java.util.ArrayList;
import java.util.List;

public class Menu {
	private int id;
	private String name;
	private String menu_type;
	private String img_url;

	private List<Type> types = new ArrayList<>();
	private List<Category> categories = new ArrayList<>();

	public static class Category {
		private String size;
		private Double price;

		public Category(String size, Double price) {
			this.size = size;
			this.price = price;
		}

		public double getPrice() {
			return price;
		}

		public String getSize() {
			return size;
		}

	}

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

	public Menu(int id, String name, String menu_type, String img_url) {
		this.id = id;
		this.name = name;
		this.menu_type = menu_type;
		this.img_url = img_url;
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

	public List<Type> getTypes() {
		return types;
	}

	public List<Category> getCategories() {
		return categories;
	}
}
