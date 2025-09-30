package com.CafeManagement.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class Bill {
    UUID bill_id;
    LocalDateTime pay_date; // วันที่ + เวลา
    double total;
    UUID user_id;
    UUID giveAway_id;

    public Bill() {

    }

    public Bill(UUID bill_id, LocalDateTime pay_date, double total, UUID user_id, UUID giveAway_id) {
        this.bill_id = bill_id;
        this.pay_date = pay_date;
        this.total = total;
        this.user_id = user_id;
        this.giveAway_id = giveAway_id;
    }

    // getter
    public UUID getBill_id() {
        return bill_id;
    }

    public LocalDateTime getPay_date() {
        return pay_date;
    }

    public double getTotal() {
        return total;
    }

    public UUID getUser_id() {
        return user_id;
    }

    public UUID getGiveAway_id() {
        return giveAway_id;
    }

    // setter
    public void setBill_id(UUID bill_id) {
        this.bill_id = bill_id;
    }

    public void setPay_date(LocalDateTime pay_date;) {
        this.pay_date = pay_date;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public void setUser_id(UUID user_id) {
        this.user_id = user_id;
    }

    public void setGiveAway_id(UUID giveAway_id) {
        this.giveAway_id = giveAway_id;
    }

    

}
