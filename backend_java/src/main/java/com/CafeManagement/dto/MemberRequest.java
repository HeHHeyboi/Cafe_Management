package com.CafeManagement.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;

public class MemberRequest {
	@NotBlank
	@JsonProperty("name")
	String name;

	@NotBlank
	@JsonProperty("status")
	String status;

	@NotBlank
	@JsonProperty("role")
	String role;

	public MemberRequest(String name, String role, String status) {
		this.name = name;
		this.role = role;
		this.status = status;
	}

	public String getName() {
		return name;
	}

	public String getStatus() {
		return status;
	}

	public String getRole() {
		return role;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setRole(String role) {
		this.role = role;
	}
}
