package com.CafeManagement.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CafeManagement.service.FileSystemStorageService;


@RestController
@RequestMapping("/order")
public class OrderController {
    OrderService service;
	FileSystemStorageService fileService;

}
