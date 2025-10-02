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
    private final BillService service;

    @Autowired
    public BillController(illService service){
        this.service = service;
    }

    // Get all Bills
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

    //Get Bill By ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getBillById(@PathVariable int id) {
        BillResponse response;
        try {
            response = service.GetBill(id);
        } catch (BillNotFoundException notfound) {
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
    
    // Create Bill
    @PostMapping
    public ResponseEntity<String> addBill(@Valid @RequestBody BillRequest req) {
        try {
            service.CreateBill(req);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("""
                {"error":"Can't Create Bill"}
                """);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("""
            {"msg":"Create Bill Success"}
            """);
    }

    // Update Bill
    @PutMapping("/{id}")
    public ResponseEntity<String> updateBillById(
            @Valid @RequestBody BillRequest req, @PathVariable int id) {
        try {
            service.UpdateBillById(req, id);
        } catch (BillNotFoundException notfound) {
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

    // Delete Bill
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBillById(@PathVariable int id) {
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
