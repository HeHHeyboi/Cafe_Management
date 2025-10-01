package com.CafeManagement.web;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.json.JacksonJsonDecoder;
import org.springframework.http.codec.json.JacksonJsonEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.CafeManagement.dto.MenuRequest;
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

	@PostMapping(consumes = { "multipart/form-data" })
	public ResponseEntity<String> addCustomer(@RequestParam("img") MultipartFile file,
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
					"msg": "Can't Create Menu"
					}
					""");
		}

		return ResponseEntity.ok("""
				{"msg":"Create Menu Success","img":"%s"}
				""".formatted(file.getName()));
	}
}
