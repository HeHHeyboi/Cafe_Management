package com.CafeManagement.model;

public class Member {
	int id;
	String name;
	String status;
	String role;

	public Member() {

	}

	public Member(int id, String name, String status, String role) {
		this.id = id;
		this.name = name;
		this.status = status;
		this.role = role;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}
