package com.CafeManagement.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.CafeManagement.dto.UserRequest;
import com.CafeManagement.dto.UserResponse;
import com.CafeManagement.model.User;
import com.CafeManagement.repo.UserRepo;
import com.CafeManagement.repo.UserRepo.CreateUserParams;

@Service
@Transactional
public class UserService {
	UserRepo repo;

	@Autowired
	public UserService(UserRepo repo) {
		this.repo = repo;
	}

	public void CreateUser(UserRequest req) throws Exception {
		CreateUserParams params = repo.new CreateUserParams(req);
		UUID userId = UUID.randomUUID();
		params.setUserId(userId.toString());
		repo.CreateUser(params);
	}

	public void DeleteAllUser() throws Exception {
		repo.DeleteAllUser();
	}

	public List<UserResponse> GetAllUser() throws Exception {
		List<User> users = repo.GetAllUser();
		List<UserResponse> response = new ArrayList<>();
		for (var user : users) {
			response.add(new UserResponse(user));
		}
		return response;
	}

	public UserResponse GetUserByEmail(String email) throws Exception {
		return new UserResponse(repo.GetUserByEmail(email));
	}

	public UserResponse GetUserById(String id) throws Exception {
		return new UserResponse(repo.GetUserById(id));
	}
}
