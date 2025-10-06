package com.CafeManagement.repo;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.CafeManagement.dto.NewBillRequest;
import com.CafeManagement.exception.TypeNotFoundException;
import com.CafeManagement.model.Bill;

@Repository
public class BillRepo {
	@Autowired
	JdbcTemplate jdbc;

	final String createBill = """
			INSERT INTO bill(bill_id, total, created_at,payment_method)
			VALUES (?,?,?,?)
			""";

	public Bill CreateBill(NewBillRequest arg) throws Exception {
		UUID id = UUID.randomUUID();
		LocalDateTime now = LocalDateTime.now();

		jdbc.update(createBill, id.toString(), 0.0, now.toString(), arg.getPayment_method());
		return new Bill(id, now, 0.0, arg.getPayment_method());
	}

	final String getBillById = """
			SELECT bill_id, total, created_at ,payment_method FROM bill
			WHERE bill_id = ?
			""";

	public Bill GetBillById(String bill_id) throws Exception {
		SqlRowSet row = jdbc.queryForRowSet(getBillById, bill_id);
		Bill bill = new Bill();
		if (row.next()) {
			bill.setBill_id(UUID.fromString(bill_id));
			bill.setTotal(row.getDouble("total"));
			LocalDateTime created_at = LocalDateTime.parse(row.getString("created_at"));
			bill.setCreated_at(created_at);
			bill.setPayment_method(row.getString("payment_method"));
		}
		return bill;
	}

	final String getAllBill = """
			SELECT bill_id, total, created_at ,payment_method FROM bill;
			""";

	public List<Bill> GetAllBill() throws Exception {
		List<Bill> bills = new ArrayList<>();
		SqlRowSet rows = jdbc.queryForRowSet(getAllBill);
		while (rows.next()) {
			UUID id = UUID.fromString(rows.getString("bill_id"));
			Double total = rows.getDouble("total");
			LocalDateTime created_at = LocalDateTime.parse(rows.getString("created_at"));
			String payment_method = rows.getString("payment_method");

			Bill bill = new Bill(id, created_at, total, payment_method);
			bills.add(bill);
		}

		return bills;
	}

	final String updateBillById = """
			UPDATE bill
			SET total = ?
			WHERE bill_id = ?;
			""";

	public void UpdateBillById(String id, double total) throws Exception {
		int apply = jdbc.update(updateBillById, total, id);
		if (apply == 0) {
			throw new TypeNotFoundException("Can't find bill with id " + id);
		}
	}

	final String deleteBillById = """
			DELETE FROM bill
			WHERE bill_id = ?;
			""";

	public void DeleteBillById(String id) {
		jdbc.update(deleteBillById, id);
	}

	final String deleteAllBill = """
			DELETE FROM bill
			""";

	public void DeleteAllBill() {
		jdbc.update(deleteAllBill);
	}
}
