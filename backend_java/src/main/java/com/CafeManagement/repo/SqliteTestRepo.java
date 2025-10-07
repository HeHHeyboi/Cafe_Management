package com.CafeManagement.repo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@Primary
public class SqliteTestRepo implements TestRepo {
	@Autowired
	JdbcTemplate jdbc;

	public String GetForeignKey() {
		String q = "pragma foreign_keys;";
		int enable = jdbc.queryForObject(q, int.class);
		return String.format("foreign_keys: %b", enable == 1);
	}
}
