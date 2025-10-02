package com.CafeManagement.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CafeManagement.repo.TestRepo;

@RestController
@RequestMapping("/test")
public class TestController {
	@Autowired
	TestRepo repo;

	@GetMapping
	public String TestDB() {
		return repo.GetForeignKey();
	}
}
