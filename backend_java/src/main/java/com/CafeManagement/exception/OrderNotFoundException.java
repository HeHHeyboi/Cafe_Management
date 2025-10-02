package com.CafeManagement.exception;

public class OrderNotFoundException extends RuntimeException {

    public static String GenMessage(int order_id) {
        return "Can't find Order with order_id = " + order_id;
    }

    public OrderNotFoundException(String message) {
        super(message);
    }

    public OrderNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

}
