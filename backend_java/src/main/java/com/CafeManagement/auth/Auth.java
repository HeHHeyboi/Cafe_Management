package com.CafeManagement.auth;

import org.mindrot.jbcrypt.*;
public class Auth {
	public static String HashPassword(String password) {
		String hash = BCrypt.hashpw(password, BCrypt.gensalt(10));
		return hash;
	}

	public static Boolean ComparePassword(String password, String hash) {
		return BCrypt.checkpw(password, hash);
	}
}
