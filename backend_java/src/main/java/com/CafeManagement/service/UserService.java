package com.CafeManagement.service;

import com.CafeManagement.repo.UserRepo;
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
	public String CreateUser() {
		return "";
	}
}
