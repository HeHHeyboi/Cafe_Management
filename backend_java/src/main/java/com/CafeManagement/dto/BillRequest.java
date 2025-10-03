package com.CafeManagement.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@JsonPropertyOrder({ "total", "created_at" })
public class BillRequest {

    @NotNull(message = "Total is required")
    @Min(value = 0, message = "Total must be at least 0")
    @JsonProperty("total")
    private Double total;

    @JsonProperty("created_at")
    private LocalDateTime created_at;

    // getter
    public double getTotal(){
        return total;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    // setter
    public void setTotal(double total){
        this.total = total;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

}
