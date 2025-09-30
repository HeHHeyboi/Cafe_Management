package com.CafeManagement.model;

import java.util.UUID;

public class Order {
    UUID bill_id;
    UUID menu_id;
    double amount;
    double total_price;
    String menu_name;

    public Order(){

    }

    public Order(UUID bill_id,UUID menu_id,double amount,double total_price,String menu_name){
        this.bill_id = bill_id;
        this.menu_id = menu_id;
        this.amount = amount;
        this.total_price = total_price;
        this.menu_name = menu_name;
    }

    // getter
    public UUID getBill_id(){
        return bill_id;
    }

    public UUID getMenu_id(){
        return menu_id;
    }

    public double getAmount(){
        return amount;
    }

    public double getTotal_price(){
        return total_price;
    }

    public String getMenu_name(){
        return menu_name;
    }

    // setter
    public void setBill_id(UUID bill_id){
        this.bill_id = bill_id;
    }

    public void setMenu_id(UUID menu_id){
        this.menu_id = menu_id;
    }

    public void setAmount(double amount){
        this.amount = amount;
    }

    public void setTotal_price(double total_price){
        this.total_price = total_price;
    }

    public void setMenu_name(String menu_name){
        this.menu_name = menu_name;
    }
}
