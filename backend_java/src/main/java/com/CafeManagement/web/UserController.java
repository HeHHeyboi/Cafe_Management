package com.CafeManagement.web;

import com.CafeManagement.auth.*;
import com.CafeManagement.dto.UserRequest;
import com.CafeManagement.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
