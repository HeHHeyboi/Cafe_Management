package auth

import (
	"fmt"
	"testing"
)

func TestCreateCookie(t *testing.T) {
	secret := "prejm0iZPByLkutClVITyQiz3mpoMo4W"
	id := "00011"
	new_cookie, err := CreateCookie("id", id, secret)
	if err != nil {
		t.Fatalf(`Test Fail: Error in CreateCookie, %s`, err)
	}

	value, err := ReadCookie(&new_cookie, secret)
	if err != nil {
		t.Fatalf(`Test Fail: Error in ReadCookie, %s`, err)
	}

	if value != id {
		t.Fatalf(`Test Fail
Expect: %s
Get: %s`, id, value)
	}
	fmt.Printf(`Test Pass
Expect: %s
Get: %s
`, id, value)
}
