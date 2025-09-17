package com.CafeManagement.config;

import java.util.UUID;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.CafeManagement.auth.Auth;

import io.github.cdimascio.dotenv.Dotenv;

@Configuration
public class EnvConfig {
	private final Dotenv dotenv = Dotenv.load();
	private final UUID uuid = UUID.randomUUID();

	@Bean(name = "admin_email")
	public String AdminEmail() {
		return dotenv.get("ADMIN_EMAIL");
	}

	@Bean(name = "admin_password")
	public String AdminPassword() {
		String password = dotenv.get("ADMIN_PASSWORD");
		return Auth.HashPassword(password);
	}

	@Bean(name = "admin_id")
	public String AdminID() {
		return uuid.toString();
	}

}
