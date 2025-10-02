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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.CafeManagement.dto.MenuRequest;
import com.CafeManagement.dto.MenuResponse;
import com.CafeManagement.exception.MenuNotFoundException;
import com.CafeManagement.service.FileSystemStorageService;
import com.CafeManagement.service.MenuService;

import jakarta.validation.Valid;
import tools.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/menu")
public class MenuController {
	MenuService service;
	FileSystemStorageService fileService;

	@Autowired
	public MenuController(MenuService service, FileSystemStorageService fileSystemStorageService) {
		this.service = service;
		this.fileService = fileSystemStorageService;
	}

	@GetMapping
	public ResponseEntity<?> getAllMenus() {
		List<MenuResponse> responses = new ArrayList<MenuResponse>();
		try {
			responses = service.GetAllMenu();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"%s"}
					""".formatted(e.getMessage()));
		}

		return ResponseEntity.ok(responses);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getMenuById(@PathVariable int id) {
		MenuResponse response = new MenuResponse();
		try {
			response = service.GetMenu(id);

		} catch (MenuNotFoundException notfound) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("""
					{"error": "%s"}
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
	public ResponseEntity<String> updateMenuById(@RequestParam("img") MultipartFile file,
			@Valid @RequestParam("data") String data, @PathVariable int id) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			MenuRequest req = mapper.readValue(data, MenuRequest.class);
			String img_url = fileService.store(file);
			service.UpdateMenuById(req, id, img_url);
		} catch (MenuNotFoundException notfound) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("""
					{"error": "%s"}
					""".formatted(notfound.getMessage()));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"%s"}
					""".formatted(e.getMessage()));
		}

		return ResponseEntity.ok("""
				{ "msg": "Menu item updated successfully" }
				""");
	}

	@PostMapping(consumes = { "multipart/form-data" })
	public ResponseEntity<String> addMenu(@RequestParam("img") MultipartFile file,
			@Valid @RequestParam("data") String data) {

		ObjectMapper mapper = new ObjectMapper();
		MenuRequest req = mapper.readValue(data, MenuRequest.class);
		String img_url = fileService.store(file);

		try {
			service.CreateMenu(req, img_url);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{
					"error": "Can't Create Menu"
					}
					""");
		}

		return ResponseEntity.status(HttpStatus.CREATED).body("""
				{"msg":"Create Menu Success","img":"%s"}
				""".formatted(file.getName()));
		// return ResponseEntity.ok("""
		// {"msg":"Create Menu Success","img":"%s"}
		// """.formatted(file.getName()));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteMenuById(@PathVariable int id) {
		try {
			service.DeleteMenuById(id);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{ "error": "%s" }
					""".formatted(e.getMessage()));
		}

		return ResponseEntity.ok("""
				{ "msg": "Menu item deleted successfully" }
				""");
	}
}
