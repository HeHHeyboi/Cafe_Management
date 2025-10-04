package com.CafeManagement.dto;

import com.CafeManagement.model.Member;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "member_id", "name", "status", "role" })
public class MemberResponse {
	@JsonProperty("member_id")
	int id;

	@JsonProperty("name")
	String name;

	@JsonProperty("status")
	String status;

	@JsonProperty("role")
	String role;

	public MemberResponse() {

	}

	public MemberResponse(Member member) {
		this.id = member.getId();
		this.name = member.getName();
		this.status = member.getStatus();
		this.role = member.getRole();
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
