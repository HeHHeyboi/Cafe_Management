package com.CafeManagement.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CafeManagement.dto.MenuRequest;
import com.CafeManagement.service.MenuService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/menu")
public class MenuController {
	MenuService service;

	@Autowired
	public MenuController(MenuService service) {
		this.service = service;
	}

	@PostMapping
	public ResponseEntity<String> addCustomer(@Valid @RequestBody MenuRequest req) {
		try {
			service.CreateMenu(req, null);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{
					"msg": "Can't Create Menu"
					}
					""");
		}

		return ResponseEntity.ok("Create Menu Success");
	}
}
