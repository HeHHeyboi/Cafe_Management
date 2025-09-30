package com.CafeManagement.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CafeManagement.dto.MenuRequest;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/menu")
public class MenuController {

	@PostMapping
	public ResponseEntity<MenuRequest> addCustomer(@Valid @RequestBody MenuRequest req) {
		return ResponseEntity.ok(req);
	}
}
