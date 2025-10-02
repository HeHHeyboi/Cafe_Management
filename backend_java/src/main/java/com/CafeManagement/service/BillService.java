package com.CafeManagement.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.CafeManagement.model.Bill;
import com.CafeManagement.repo.BillRepo;


@Service
@Transactional
public class BillService {
    BillRepo repo;

    @Autowired
    public BillService(BillRepo repo){
        this.repo = repo;
    }

    // create Bill
    public void CreateBill(BillRequest req) throws Exception {
        repo.CreateBill(req);
    }

    // get all Bills
    public List<BillResponse> GetAllBills() throws Exception {
        List<Bill> bills = repo.GetAllBills();
        List<BillResponse> responses = new ArrayList<>();
        for (Bill bill : bills) {
            responses.add(new BillResponse(bill));
        }
        return responses;
    }

    // get Bill by ID
    public BillResponse GetBill(int id) throws Exception {
        Bill bill = repo.GetBillById(id);
        return new BillResponse(bill);
    }

    // update Bill
    public void UpdateBillById(BillRequest req, int billId) throws Exception {
        repo.UpdateBillById(req, billId);
    }

    // delete Bill
    public void DeleteBillById(int billId) throws Exception {
        repo.DeleteBillById(billId);
    }

    // delete all Bills
    public void DeleteAllBills() throws Exception {
        repo.DeleteAllBills();
    }

}
