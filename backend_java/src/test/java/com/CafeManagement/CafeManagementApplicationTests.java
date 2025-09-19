package com.CafeManagement;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseCookie;

import com.CafeManagement.auth.CookieAuth;

@SpringBootTest
class CafeManagementApplicationTests {

	@Test
	void CookieTest() throws Exception {
		String secret = "prejm0iZPByLkutClVITyQiz3mpoMo4W";
		String id = "17f7b4c0-63ae-4dbc-ba8e-2561f13b2f25";
		ResponseCookie nCookie = ResponseCookie.fromClientResponse("id", "").build();
		try {
			nCookie = CookieAuth.CreateCookie("id", id, secret);
		} catch (Exception e) {
			e.printStackTrace();
		}
		String value = CookieAuth.ReadCookie(nCookie, secret);

		assertEquals(id, value);
	}

}
