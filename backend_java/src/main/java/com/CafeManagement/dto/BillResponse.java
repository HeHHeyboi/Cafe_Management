package com.CafeManagement.dto;

public class BillResponse {



import java.time.LocalDateTime;
import java.util.UUID;

import com.CafeManagement.model.Bill;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "id", "total", "created_at" })
public class BillResponse {
	@JsonProperty("id")
	UUID bill_id;
	@JsonProperty("total")
	double total;
	@JsonProperty("created_at")
	LocalDateTime created_at;

	public BillResponse() {

	}

	public BillResponse(Bill bill) {
		this.bill_id = bill.getBill_id();
		this.total = bill.getTotal();
		this.created_at = bill.getCreated_at();
	}

	public UUID getBill_id() {
		return bill_id;
	}

	public double getTotal() {
		return total;
	}

	public LocalDateTime getCreated_at() {
		return created_at;
	}

}
