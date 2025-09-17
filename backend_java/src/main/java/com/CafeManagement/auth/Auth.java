package com.CafeManagement.auth;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Auth {
	public static String HashPassword(String password) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);
		String hash = encoder.encode(password);
		return hash;
	}

	public static Boolean ComparePassword(String password, String hash) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);
		return encoder.matches(password, hash);
	}
}
