package com.CafeManagement.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotEmpty;

public class LoginRequest {
	@NotEmpty
	@JsonProperty(value = "email")
	String email;
	@NotEmpty
	@JsonProperty(value = "password")
	String password;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
