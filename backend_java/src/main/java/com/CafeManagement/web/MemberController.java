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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.CafeManagement.dto.MemberRequest;
import com.CafeManagement.dto.MemberResponse;
import com.CafeManagement.exception.MemberNotFoundException;
import com.CafeManagement.service.MemberService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/member")
public class MemberController {
	@Autowired
	MemberService service;

	@GetMapping
	public ResponseEntity<?> getAllMembers() {
		List<MemberResponse> responses = new ArrayList<>();
		try {
			responses = service.GetAllMembers();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"%s"}
					""".formatted(e.getMessage()));
		}
		return ResponseEntity.ok(responses);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getMemberByid(@PathVariable int id) {
		MemberResponse responses = null;
		try {
			responses = service.GetMemberById(id);
		} catch (MemberNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("""
					{"error": "%s"}
					""".formatted(e.getMessage()));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"%s"}
					""".formatted(e.getMessage()));
		}
		return ResponseEntity.ok(responses);
	}

	@PostMapping(consumes = "application/json")
	public ResponseEntity<String> createMember(@Valid @RequestBody MemberRequest req) {
		int id = 0;
		try {
			id = service.CreateMember(req);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"%s"}
					""".formatted(e.getMessage()));
		}
		return ResponseEntity.status(HttpStatus.CREATED).body("""
				{ "msg": "Member created successfully", "member_id": %d }
				""".formatted(id));
	}

	@PostMapping(consumes = "multipart/form-data")
	public ResponseEntity<String> createMember(@RequestParam("name") String name,
			@RequestParam("status") String status, @RequestParam("role") String role) {
		int id = 0;
		MemberRequest req = new MemberRequest(name, role, status);
		try {
			id = service.CreateMember(req);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"%s"}
					""".formatted(e.getMessage()));
		}
		return ResponseEntity.status(HttpStatus.CREATED).body("""
				{ "msg": "Member created successfully", "member_id": %d }
				""".formatted(id));
	}

	@PutMapping(path = "/{id}", consumes = "application/json")
	public ResponseEntity<String> updateMember(@Valid @RequestBody MemberRequest req, @PathVariable int id) {
		try {
			service.UpdateMemberById(req, id);
		} catch (MemberNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("""
					{"error": "%s"}
					""".formatted(e.getMessage()));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"%s"}
					""".formatted(e.getMessage()));
		}
		return ResponseEntity.ok("""
				{ "msg": "Member updated successfully" }
				""");
	}

	@PutMapping(path = "/{id}", consumes = "multipart/form-data")
	public ResponseEntity<String> updateMember(@RequestParam("name") String name,
			@RequestParam("status") String status,
			@RequestParam("role") String role, @PathVariable int id) {

		MemberRequest req = new MemberRequest(name, role, status);
		try {
			service.UpdateMemberById(req, id);
		} catch (MemberNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("""
					{"error": "%s"}
					""".formatted(e.getMessage()));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"%s"}
					""".formatted(e.getMessage()));
		}
		return ResponseEntity.ok("""
				{ "msg": "Member updated successfully" }
				""");
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteMemberById(@PathVariable int id) {
		try {
			service.DeleteMemberById(id);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"%s"}
					""".formatted(e.getMessage()));
		}
		return ResponseEntity.ok("""
				{ "msg": "Delete Member Success" }
				""");
	}
}
