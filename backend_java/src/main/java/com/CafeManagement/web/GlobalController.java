package com.CafeManagement.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CafeManagement.service.BillService;
import com.CafeManagement.service.MenuService;
import com.CafeManagement.service.OrderService;
import com.CafeManagement.service.UserService;

@RestController
public class GlobalController {
	@Autowired
	UserService userService;
	@Autowired
	MenuService menuService;
	@Autowired
	BillService billService;
	@Autowired
	OrderService orderService;

	@GetMapping("/reset")
	public ResponseEntity<String> deleteAllUser() {
		try {
			// userService.DeleteAllUser();
			menuService.DeleteAllMenu();
			billService.DeleteAllBills();
			orderService.DeleteAllOrder();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("""
					{"Error" : "Can't Create User"}""");
		}

		return ResponseEntity.ok("""
				{ "msg":"delete succeed" }
				""");

	}

}
