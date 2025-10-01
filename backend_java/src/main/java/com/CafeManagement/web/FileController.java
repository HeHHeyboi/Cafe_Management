package com.CafeManagement.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.CafeManagement.service.FileSystemStorageService;

@RestController
public class FileController {
	FileSystemStorageService storageService;

	@Autowired
	public FileController(FileSystemStorageService service) {
		this.storageService = service;
	}

	@GetMapping("/upload/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

		Resource file = storageService.loadAsResource(filename);
		if (file == null)
			return ResponseEntity.notFound().build();

		String contentType = "image/png";
		if (filename.toLowerCase().endsWith(".jpg") || filename.toLowerCase().endsWith(".jpeg")) {
			contentType = "image/jpeg";
		} // Add more checks...

		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(contentType))
				// Use Content-Disposition: inline to show it in the browser
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
				.body(file);
	}
}
