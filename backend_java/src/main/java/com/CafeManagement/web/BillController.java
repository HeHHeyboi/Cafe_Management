package com.CafeManagement.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CafeManagement.service.BillService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/bill")
public class BillController {
	BillService service;

	@Autowired
	public BillController(BillService service) {
		this.service = service;
	}

	@GetMapping("/new")
	public ResponseEntity<?> createBill() {
		BillResponse response = new BillResponse();
		try {
			response = service.CreatedBill();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"Internal Error, %s"}
					""".formatted(e.getMessage()));
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
}
