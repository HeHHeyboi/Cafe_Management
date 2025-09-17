package com.CafeManagement.repo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TestRepo {
	@Autowired
	JdbcTemplate jdbc;

	public String GetForeignKey() {
		String q = "pragma foreign_keys;";
		int enable = jdbc.queryForObject(q, int.class);
		return String.format("foreign_keys: %b", enable == 1);
	}
}
