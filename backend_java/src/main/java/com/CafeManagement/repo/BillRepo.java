package com.CafeManagement.repo;

import java.util.List;

import com.CafeManagement.dto.NewBillRequest;
import com.CafeManagement.model.Bill;

public interface BillRepo {

	public Bill CreateBill(NewBillRequest arg) throws Exception;

	public Bill GetBillById(String bill_id) throws Exception;

	public List<Bill> GetAllBill() throws Exception;

	public void UpdateBillById(String id, double total) throws Exception;

	public void DeleteBillById(String id);

	public void DeleteAllBill();
}
