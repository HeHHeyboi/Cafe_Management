package com.CafeManagement.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.CafeManagement.model.Menu;
import com.CafeManagement.model.Order;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "bill_id", "menu_name", "amount", "size", "type", "total_price", "img_url" })
public class OrderResponse {

    @JsonProperty("bill_id")
    UUID bill_id;

    @JsonProperty("menu_name")
    String menu_name;

    @JsonProperty("amount")
    int amount;

    @JsonProperty("size")
    String size;

    @JsonProperty("types")
	List<Type> types = new ArrayList<>();

    @JsonProperty("total_price")
    double total_price;

    @JsonProperty("img_url")
	String img_url;

    public OrderResponse() {

    }

    public OrderResponse(Order order, Menu menu) {
        this.bill_id = order.getBill_id();
        this.amount = order.getAmount();
        this.size = order.getSize();
        this.total_price = order.getTotal_price();

        if(menu != null){
            this.menu_name = menu.getName();
            this.img_url = menu.getImg_url();

            for (Menu.Type t : menu.getTypes()){
                this.types.add(new Type(t.getType(), t.getAddition_price()));
            }
        }
    }

    // getter
    public UUID getBill_id(){
        return bill_id;
    }

    public String getMenu_name(){
        return menu_name;
    }

    public int getAmount(){
        return amount;
    }

    public String getSize(){
        return size;
    }

    public List<Type> getTypes() {
		return types;
	}

    public double getTotal_price(){
        return total_price;
    }

    public String getImg_url(){
        return img_url;
    }

}
