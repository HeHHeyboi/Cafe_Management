package com.CafeManagement.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

public class UserRequest {
	@NotBlank(message = "Require First name")
	@JsonProperty(value = "first_name")
	String firtName;
	@NotBlank(message = "Require Last name")
	@JsonProperty(value = "last_name")
	String lastName;
	@NotBlank(message = "Require Email")
	@JsonProperty(value = "email")
	String email;
	@NotBlank(message = "Require Password")
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
