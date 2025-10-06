package com.CafeManagement.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CafeManagement.dto.BillResponse;
import com.CafeManagement.dto.NewBillRequest;
import com.CafeManagement.dto.UpdateBillRequest;
import com.CafeManagement.exception.TypeNotFoundException;
import com.CafeManagement.service.BillService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/bill")
public class BillController {
	BillService service;

	@Autowired
	public BillController(BillService service) {
		this.service = service;
	}

	@PostMapping("/new")
	public ResponseEntity<?> createBill(@RequestBody NewBillRequest req) {
		BillResponse response = new BillResponse();
		try {
			response = service.CreateBill(req);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"Internal Error, %s"}
					""".formatted(e.getMessage()));
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@GetMapping
	public ResponseEntity<?> getAllBills() {
		List<BillResponse> responses = new ArrayList<>();
		try {
			responses = service.GetAllBills();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"%s"}
					""".formatted(e.getMessage()));
		}
		return ResponseEntity.ok(responses);
	}

	// Get Bill By ID
	@GetMapping("/{id}")
	public ResponseEntity<?> getBillById(@PathVariable String id) {
		BillResponse response;
		try {
			response = service.GetBill(id);
		} catch (TypeNotFoundException notfound) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("""
					{"error":"%s"}
					""".formatted(notfound.getMessage()));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"%s"}
					""".formatted(e.getMessage()));
		}
		return ResponseEntity.ok(response);
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateBillById(@Valid @RequestBody UpdateBillRequest req, @PathVariable String id) {
		try {
			service.UpdateBillById(req, id);
		} catch (TypeNotFoundException notfound) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("""
					{"error":"%s"}
					""".formatted(notfound.getMessage()));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"%s"}
					""".formatted(e.getMessage()));
		}
		return ResponseEntity.ok("""
				{"msg":"Bill updated successfully"}
				""");
	}

	// NOTE: Delete bill by id
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteBillById(@PathVariable String id) {
		try {
			service.DeleteBillById(id);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"%s"}
					""".formatted(e.getMessage()));
		}
		return ResponseEntity.ok("""
				{"msg":"Bill deleted successfully"}
				""");
	}

}
