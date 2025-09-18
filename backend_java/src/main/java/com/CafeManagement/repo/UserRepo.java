package com.CafeManagement.repo;

import com.CafeManagement.dto.UserRequest;
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

		public CreateUserParams(UserRequest req) {
			this.firstName = req.getFirtName();
			this.lastName = req.getLastName();
			this.email = req.getEmail();
			this.password = req.getPassword();
		}

		public void setUserId(String uuid) {
			this.userId = uuid;
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
