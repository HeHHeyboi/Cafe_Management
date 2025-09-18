package com.CafeManagement.service;

import com.CafeManagement.dto.UserRequest;
import com.CafeManagement.dto.UserResponse;
import com.CafeManagement.repo.UserRepo;
import com.CafeManagement.repo.UserRepo.CreateUserParams;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
