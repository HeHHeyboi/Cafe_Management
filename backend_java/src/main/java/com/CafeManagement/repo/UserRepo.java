package com.CafeManagement.repo;

import java.util.List;

import com.CafeManagement.dto.UserRequest;
import com.CafeManagement.model.User;

public interface UserRepo {

	/*
	 * NOTE:
	 * สร้างึ้นมาเพื่อแปลงจาก UserRequest -> Parameter ของ
	 * CreateUser method
	 */
	public static class CreateUserParams {
		String userId;
		String firstName;
		String lastName;
		String email;
		String password;
		String role;

		public CreateUserParams(UserRequest req) {
			this.firstName = req.getFirtName();
			this.lastName = req.getLastName();
			this.email = req.getEmail();
			this.password = req.getPassword();
			this.role = req.getRole();
		}

		public void setUserId(String uuid) {
			this.userId = uuid;
		}
	}

	public void CreateUser(CreateUserParams param) throws Exception;

	public void DeleteAllUser() throws Exception;

	public List<User> GetAllUser() throws Exception;

	public User GetUserByEmail(String email) throws Exception;

	public User GetUserById(String id) throws Exception;

	public void DeleteUserById(String id);

}
