package com.CafeManagement.dto;

import org.springframework.http.ResponseCookie;

public record LoginResult(boolean ok, String msg, ResponseCookie cookie) {
}
