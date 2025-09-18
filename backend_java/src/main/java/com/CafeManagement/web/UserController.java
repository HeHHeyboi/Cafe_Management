package com.CafeManagement.web;

import com.CafeManagement.dto.UserRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

	@PostMapping
	public ResponseEntity<String> CreateUser(@Valid @RequestBody UserRequest req) {
		return ResponseEntity.ok(""" 
			{ "msg":"Create user Succeed"}
			""");
	}
}
