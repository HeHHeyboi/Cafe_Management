package auth

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password *string) (string, error) {
	if password == nil {
		return "", NewHashError("Password is None")
	}
	if *password == "" {
		return "", NewHashError("Please Enter Password")
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(*password), bcrypt.DefaultCost)
	if err != nil {
		return "", NewHashError(fmt.Sprintf("Password hash Error: %v", err))
	}
	return string(hash), nil
}

func ComparePassword(password, hash *string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(*hash), []byte(*password))
	if err != nil {
		return false
	}
	return true
}
