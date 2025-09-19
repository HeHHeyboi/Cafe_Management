package com.CafeManagement.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CafeManagement.service.UserService;

@RestController
public class GlobalController {
	UserService service;

	@Autowired
	public GlobalController(UserService service) {
		this.service = service;
	}

	@GetMapping("/reset")
	public ResponseEntity<String> deleteAllUser() {
		try {
			service.DeleteAllUser();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("""
					{"Error" : "Can't Create User"}""");
		}

		return ResponseEntity.ok("""
				{ "msg":"delete succeed" }
				""");

	}

}
