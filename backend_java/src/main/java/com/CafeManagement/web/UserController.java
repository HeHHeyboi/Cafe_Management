package com.CafeManagement.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseCookie.ResponseCookieBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CafeManagement.auth.Auth;
import com.CafeManagement.dto.LoginRequest;
import com.CafeManagement.dto.LoginResult;
import com.CafeManagement.dto.UserRequest;
import com.CafeManagement.dto.UserResponse;
import com.CafeManagement.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {
	UserService service;

	@Autowired
	public UserController(UserService service) {
		this.service = service;
	}

	@PostMapping
	public ResponseEntity<String> CreateUser(@Valid @RequestBody UserRequest req) {
		req.setPassword(Auth.HashPassword(req.getPassword()));
		try {
			service.CreateUser(req);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("""
					{"Error" : "Can't Create User"} """);
		}
		return ResponseEntity.ok("""
				{"msg" : "Create user Succeed"} """);
	}

	@GetMapping
	ResponseEntity<?> GetAllUser() {
		List<UserResponse> response = new ArrayList<UserResponse>();
		try {
			response = service.GetAllUser();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("""
					{"Error" : "%s"}""".formatted(e.toString()));
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping("/{id}")
	ResponseEntity<?> GetUserById(@PathVariable String id) {
		UserResponse response = new UserResponse();
		try {
			response = service.GetUserById(id);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("""
					{"Error" : "%s"}""".formatted(e.toString()));
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping("/login")
	ResponseEntity<?> UserLogin(@Valid @RequestBody LoginRequest req) {
		LoginResult result = null;
		try {
			result = service.UserLogin(req);
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body("""
					{"error": "%s"}
					""".formatted(e.getMessage()));
		}

		if (!result.ok()) {
			return ResponseEntity.badRequest().body("""
					{"Bad Requst": "%s"}
					""".formatted(result.msg()));
		}
		// http.addCookie(result.cookie());
		HttpHeaders header = new HttpHeaders();
		header.add(HttpHeaders.SET_COOKIE, result.cookie().toString());
		return ResponseEntity.ok().headers(header).body("""
				{"msg":"%s"}
				""".formatted(result.msg()));
	}

	@GetMapping("/logout")
	ResponseEntity<?> UserLogout() {
		ResponseCookieBuilder cookie = ResponseCookie.from("id", "");
		cookie.path("/");
		cookie.secure(false);
		cookie.sameSite("Lax");
		cookie.domain("localhost");
		cookie.maxAge(0);
		HttpHeaders header = new HttpHeaders();
		header.add(HttpHeaders.SET_COOKIE, cookie.build().toString());
		return ResponseEntity.ok().headers(header).body("""
				{"msg":"Logout Success"}
				""");
	}
}
