package com.CafeManagement.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "first_name", "last_name", "email", "password" })
public class UserResponse {
	@JsonProperty(value = "first_name")
	String firtName;
	@JsonProperty(value = "last_name")
	String lastName;
	@JsonProperty(value = "email")
	String email;
	@JsonProperty(value = "password")
	String password;

	public String getFirtName() {
		return firtName;
	}

	public void setFirtName(String firtName) {
		this.firtName = firtName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

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
