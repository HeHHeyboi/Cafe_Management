package com.CafeManagement.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@JsonPropertyOrder({ "bill_id", "menu_name", "amount", "total_price", "size", "type" })
public class OrderRequest {

    @NotNull(message = "Bill ID is required")
    @JsonProperty("bill_id")
    UUID bill_id;

    @NotNull(message = "Menu Name is required")
    @JsonProperty("menu_name")
    String menu_name;

    @Min(value = 1, message = "Amount must be at least 1")
    @JsonProperty("amount")
    int amount;

    @Min(value = 1, message = "Total price must be greater than 0")
    @JsonProperty("total_price")
    double total_price;

    @JsonProperty("size")
    String size;

    @NotBlank(message = "Must have Menu Type")
	@JsonProperty("menu_type")
	String menu_type;

    @JsonProperty("types")
	List<Type> types = new ArrayList<>();

    // getter
    public UUID getBill_id(){
        return bill_id;
    }

    public String getMenu_name() {
        return menu_name;
    }

    public int getAmount() {
        return amount;
    }

    public double getTotal_price(){
        return total_price;
    }

    public String getSize() {
        return size;
    }

    public String getMenu_type() {
		return menu_type;
	}

    // setter
    public void setBill_id(UUID bill_id) {
        this.bill_id = bill_id;
    }

    public void setMenu_name(String menu_name) {
        this.menu_name = menu_name;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public void setToal_price(double total_price){
        this.total_price = total_price;
    }

    public void setSize(String size) {
        this.size = size;
    }

   public void setMenu_type(String menu_type) {
		this.menu_type = menu_type;
	}

}
