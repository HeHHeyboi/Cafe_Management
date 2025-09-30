package com.CafeManagement.auth;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.Duration;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;


import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseCookie.ResponseCookieBuilder;

public class CookieAuth {
	public static final int NONCE_LENGTH_BYTES = 8;
	private static final int GCM_TAG_LENGTH_BYTES = 16;
	private static final int GCM_IV_LENGTH_BYTES = 12;

	public static ResponseCookie CreateCookie(String name, String value, String secret) throws Exception {
		String encrypt = encryptCookie(name, value, secret);
		Duration expire = Duration.ofDays(7);
		ResponseCookieBuilder builder = ResponseCookie.fromClientResponse("id", encrypt);
		builder.path("/");
		builder.secure(false);
		builder.sameSite("Lax");
		builder.domain("localhost");
		builder.maxAge(expire);
		return builder.build();
	}

	private static String encryptCookie(String name, String value, String secret) throws Exception {
		byte[] keybyte = secret.getBytes(StandardCharsets.UTF_8);
		SecretKeySpec secretSpec = new SecretKeySpec(keybyte, "AES");

		byte[] iv = new byte[GCM_IV_LENGTH_BYTES];
		SecureRandom random = new SecureRandom();
		random.nextBytes(iv);

		Cipher c = Cipher.getInstance("AES/GCM/NoPadding");
		GCMParameterSpec parameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH_BYTES * 8, iv);
		c.init(Cipher.ENCRYPT_MODE, secretSpec, parameterSpec);

		String text = name + ":" + value;
		byte[] ciphertext = c.doFinal(text.getBytes(StandardCharsets.UTF_8));

		byte[] encrypted = new byte[iv.length + ciphertext.length];
		System.arraycopy(iv, 0, encrypted, 0, iv.length);
		System.arraycopy(ciphertext, 0, encrypted, iv.length, ciphertext.length);

		return Base64.getEncoder().encodeToString(encrypted);

	}

	public static String ReadCookie(ResponseCookie cookie, String secret) throws Exception {
		byte[] value = Base64.getDecoder().decode(cookie.getValue());
		String decrypt = decryptCookie(cookie.getName(), value, secret);
		String[] arr = decrypt.split(":");
		return arr[1];
	}

	private static String decryptCookie(String name, byte[] encryptedBase64, String secret) throws Exception {
		// byte[] encrypted = Base64.getDecoder().decode(encryptedBase64);
		byte[] encrypted = encryptedBase64;

		// System.out.println(encrypted.length);
		byte[] iv = new byte[GCM_IV_LENGTH_BYTES];
		byte[] ciphertext = new byte[encrypted.length - iv.length];
		System.arraycopy(encrypted, 0, iv, 0, iv.length);
		System.arraycopy(encrypted, iv.length, ciphertext, 0, ciphertext.length);

		byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
		SecretKey key = new SecretKeySpec(keyBytes, "AES");

		Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
		GCMParameterSpec gcmSpec = new GCMParameterSpec(GCM_TAG_LENGTH_BYTES * 8, iv);
		cipher.init(Cipher.DECRYPT_MODE, key, gcmSpec);

		byte[] plainBytes = cipher.doFinal(ciphertext);
		return new String(plainBytes, StandardCharsets.UTF_8);
	}
}
