package com.CafeManagement.exception;

public class BillNotFoundException extends RuntimeException {

    public static String GenMessage(int bill_id) {
        return "Can't find Bill with bill_id = " + bill_id;
    }

    public BillNotFoundException(String message) {
        super(message);
    }

    public BillNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}

