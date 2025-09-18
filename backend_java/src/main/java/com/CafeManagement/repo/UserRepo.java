package com.CafeManagement.repo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepo {
	@Autowired
	JdbcTemplate jdbc;

	public class CreateUserParams {
		String userId;
		String firstName;
		String lastName;
		String email;
		String password;

		public CreateUserParams(String userId, String fname,
		  String lname, String email, String password) {
			this.userId = userId;
			this.firstName = fname;
			this.lastName = lname;
			this.email = email;
			this.password = password;
		}
	}

	private final String createUser = """
	INSERT INTO users(user_id, FName, LName, email, password)
	VALUES(?, ?, ?, ?, ?)
	""";
	public void CreateUser(CreateUserParams param) throws Exception {
		jdbc.update(createUser, param.userId, param.firstName, param.lastName,
		  param.email, param.password);
	}
}
