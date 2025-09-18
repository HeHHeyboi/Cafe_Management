package com.CafeManagement.model;

import java.util.UUID;

@Component
public class User {
	UUID userId;
	String firstName;
	String lastName;
	String email;
	String password;

	public User() {
	}

	public User(UUID userId, String fname, String lname, String email, String password) {
		this.userId = userId;
		this.firstName = fname;
		this.lastName = lname;
		this.email = email;
		this.password = password;
	}

	public UUID getUserId() {
		return userId;
	}

	public void setUserId(UUID userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
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
