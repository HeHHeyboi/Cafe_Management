package com.CafeManagement.dto;

import com.CafeManagement.model.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "id", "first_name", "last_name", "email", "password" })
public class UserResponse {
	@JsonProperty(value = "id")
	String userId;
	@JsonProperty(value = "first_name")
	String firtName;
	@JsonProperty(value = "last_name")
	String lastName;
	@JsonProperty(value = "email")
	String email;

	// @JsonProperty(value = "password")
	// String password;
	public UserResponse() {

	}

	public UserResponse(User user) {
		this.userId = user.getUserId().toString();
		this.firtName = user.getFirstName();
		this.lastName = user.getLastName();
		this.email = user.getEmail();
	}

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

}
