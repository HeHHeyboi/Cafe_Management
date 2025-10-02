package com.CafeManagement.exception;

public class MenuNotFoundException extends RuntimeException {

	public static String GenMessage(int menu_id) {
		return "Can't find Menu with menu_id = " + menu_id;
	}

	public MenuNotFoundException(String message) {
		super(message);
	}

	public MenuNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}
}
