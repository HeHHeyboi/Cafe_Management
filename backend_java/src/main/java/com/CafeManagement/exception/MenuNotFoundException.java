package com.CafeManagement.exception;

public class MenuNotFoundExeception extends RuntimeException {

	public static String GenMessage(int menu_id) {
		return "Can't find Menu with menu_id = " + menu_id;
	}

	public MenuNotFoundExeception(String message) {
		super(message);
	}

	public MenuNotFoundExeception(String message, Throwable cause) {
		super(message, cause);
	}
}
