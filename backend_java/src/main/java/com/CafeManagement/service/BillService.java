package com.CafeManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.CafeManagement.dto.BillResponse;
import com.CafeManagement.repo.BillRepo;

@Service
@Transactional
public class BillService {
	BillRepo repo;

	@Autowired
	public BillService(BillRepo repo) {
		this.repo = repo;
	}

	public BillResponse CreateBill() throws Exception {
		return new BillResponse(repo.CreateBill());
	}

	public void DeleteAllBills() throws Exception {
		repo.DeleteAllBill();
	}

	// // get all Bills
	// public List<BillResponse> GetAllBills() throws Exception {
	// List<Bill> bills = repo.GetAllBills();
	// List<BillResponse> responses = new ArrayList<>();
	// for (Bill bill : bills) {
	// responses.add(new BillResponse(bill));
	// }
	// return responses;
	// }

	// delete Bill
	// public void DeleteBillById(int billId) throws Exception {
	// repo.DeleteBillById(billId);
	// }

	// update Bill
	// public void UpdateBillById(int billId) throws Exception {
	// repo.UpdateBillById(req, billId);
	// }

	// get Bill by ID
	// public BillResponse GetBill(int id) throws Exception {
	// Bill bill = repo.GetBillById(id);
	// return new BillResponse(bill);
	// }
}
