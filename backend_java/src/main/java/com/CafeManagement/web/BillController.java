package com.CafeManagement.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CafeManagement.dto.BillResponse;
import com.CafeManagement.service.BillService;

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
			response = service.CreateBill();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("""
					{"error":"Internal Error, %s"}
					""".formatted(e.getMessage()));
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	/*
	 * NOTE: Get all Bills
	 * 
	 * @GetMapping
	 * public ResponseEntity<?> getAllBills() {
	 * List<BillResponse> responses = new ArrayList<>();
	 * try {
	 * responses = service.GetAllBills();
	 * } catch (Exception e) {
	 * e.printStackTrace();
	 * return ResponseEntity.internalServerError().body("""
	 * {"error":"%s"}
	 * """.formatted(e.getMessage()));
	 * }
	 * return ResponseEntity.ok(responses);
	 * }
	 */

	/*
	 * NOTE: Update Bill by Id
	 * 
	 * @PutMapping("/{id}")
	 * public ResponseEntity<String> updateBillById(
	 * 
	 * @Valid @RequestBody BillRequest req, @PathVariable int id) {
	 * try {
	 * service.UpdateBillById(req, id);
	 * } catch (BillNotFoundException notfound) {
	 * return ResponseEntity.status(HttpStatus.NOT_FOUND).body("""
	 * {"error":"%s"}
	 * """.formatted(notfound.getMessage()));
	 * } catch (Exception e) {
	 * e.printStackTrace();
	 * return ResponseEntity.internalServerError().body("""
	 * {"error":"%s"}
	 * """.formatted(e.getMessage()));
	 * }
	 * return ResponseEntity.ok("""
	 * {"msg":"Bill updated successfully"}
	 * """);
	 * }
	 */

	// NOTE: Delete bill by id
	// @DeleteMapping("/{id}")
	// public ResponseEntity<String> deleteBillById(@PathVariable int id) {
	// try {
	// service.DeleteBillById(id);
	// } catch (Exception e) {
	// e.printStackTrace();
	// return ResponseEntity.internalServerError().body("""
	// {"error":"%s"}
	// """.formatted(e.getMessage()));
	// }
	// return ResponseEntity.ok("""
	// {"msg":"Bill deleted successfully"}
	// """);
	// }

}
