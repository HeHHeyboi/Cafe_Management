package com.CafeManagement.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import javax.servlet.http.Cookie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.CafeManagement.auth.Auth;
import com.CafeManagement.auth.CookieAuth;
import com.CafeManagement.dto.LoginRequest;
import com.CafeManagement.dto.LoginResult;
import com.CafeManagement.dto.UserRequest;
import com.CafeManagement.dto.UserResponse;
import com.CafeManagement.model.User;
import com.CafeManagement.repo.UserRepo;
import com.CafeManagement.repo.UserRepo.CreateUserParams;

@Service
@Transactional
public class UserService {
	UserRepo repo;
	ApplicationContext context;

	@Autowired
	public UserService(UserRepo repo, ApplicationContext context) {
		this.repo = repo;
		this.context = context;
	}

	public void CreateUser(UserRequest req) throws Exception {
		CreateUserParams params = new UserRepo.CreateUserParams(req);
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

	private final String authCookieName = "id";

	public LoginResult UserLogin(LoginRequest req) throws Exception {
		User user = repo.GetUserByEmail(req.getEmail());
		if (user == null) {
			return new LoginResult(false, "Can't Find user", null);
		}

		if (!Auth.ComparePassword(req.getPassword(), user.getPassword())) {
			return new LoginResult(false, "Password is Incorrect", null);
		}

		ResponseCookie cookie = CookieAuth.CreateCookie(authCookieName, user.getUserId().toString(),
				(String) context.getBean("secret"));
		return new LoginResult(true, "Login Success", cookie);
	}
}
