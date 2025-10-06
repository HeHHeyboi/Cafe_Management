package com.CafeManagement.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.CafeManagement.dto.BillResponse;
import com.CafeManagement.dto.NewBillRequest;
import com.CafeManagement.dto.UpdateBillRequest;
import com.CafeManagement.model.Bill;
import com.CafeManagement.repo.BillRepo;

@Service
@Transactional
public class BillService {
	BillRepo repo;

	@Autowired
	public BillService(BillRepo repo) {
		this.repo = repo;
	}

	public BillResponse CreateBill(NewBillRequest req) throws Exception {
		return new BillResponse(repo.CreateBill(req));
	}

	public void DeleteAllBills() throws Exception {
		repo.DeleteAllBill();
	}

	// get all Bills
	public List<BillResponse> GetAllBills() throws Exception {
		List<Bill> bills = repo.GetAllBill();
		List<BillResponse> responses = new ArrayList<>();
		for (Bill bill : bills) {
			responses.add(new BillResponse(bill));
		}
		return responses;
	}

	// delete by id
	public void DeleteBillById(String billId) throws Exception {
		repo.DeleteBillById(billId);
	}

	// update Bill
	public void UpdateBillById(UpdateBillRequest req, String bill_id) throws Exception {
		repo.UpdateBillById(bill_id, req.getTotal());
	}

	// get Bill by ID
	public BillResponse GetBill(String bill_id) throws Exception {
		Bill bill = repo.GetBillById(bill_id);
		return new BillResponse(bill);
	}
}
