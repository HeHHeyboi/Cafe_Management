package com.CafeManagement.repo;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.CafeManagement.model.Bill;

@Repository
public class BillRepo {
	@Autowired
	JdbcTemplate jdbc;

	final String createBill = """
			INSERT INTO bill(bill_id, total, created_at)
			VALUES (?,?,?)
			""";

	public Bill CreateBill() throws Exception {
		UUID id = UUID.randomUUID();
		LocalDateTime now = LocalDateTime.now();

		jdbc.update(createBill, id.toString(), 0.0, now.toString());
		return new Bill(id, now, 0.0);
	}

	final String deleteAllBill = """
			DELETE FROM bill
			""";

	public void DeleteAllBill() {
		jdbc.update(deleteAllBill);
	}
}
