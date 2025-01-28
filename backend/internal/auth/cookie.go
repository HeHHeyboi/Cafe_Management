package auth

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

var ErrInvalidValue error = errors.New("Invalid Value")

/*
TODO: finish cookie.go
CreateCookie: not done ,not test
ReadCookie: not done, not test
ValidateCookie: not done, not test
encryptCookie: done, not test
decryptCookie: done, not test
*/
func CreateCookie(name, value, secret string) (http.Cookie, error) {
	encodeVal := base64.URLEncoding.EncodeToString([]byte(value))
	expireDate := time.Now().AddDate(0, 0, 7)
	encrypt, err := encryptCookie(name, encodeVal, secret)
	if err != nil {
		return http.Cookie{}, err
	}
	cookie := http.Cookie{
		Name:     name,
		Value:    encrypt,
		Path:     "/",
		Expires:  expireDate,
		SameSite: http.SameSiteStrictMode,
	}

	return cookie, nil
}

func ReadCookie(cookie *http.Cookie, secret string) (string, error) {
	decrypt, err := decryptCookie(cookie, secret)
	if err != nil {
		return "", err
	}

	value, err := base64.URLEncoding.DecodeString(decrypt)
	if err != nil {
		return "", err
	}
	return string(value), nil
}

func encryptCookie(name, value, secret string) (string, error) {
	block, err := aes.NewCipher([]byte(secret))
	if err != nil {
		return "", err
	}

	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonce := make([]byte, aesGCM.NonceSize())
	_, err = io.ReadFull(rand.Reader, nonce)
	if err != nil {
		return "", err
	}

	text := fmt.Sprintf("%s:%s", name, value)
	encrypt := aesGCM.Seal(nonce, nonce, []byte(text), nil)

	return string(encrypt), nil
}

func decryptCookie(cookie *http.Cookie, secret string) (string, error) {
	encryptVal := cookie.Value
	block, err := aes.NewCipher([]byte(secret))
	if err != nil {
		return "", err
	}

	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonceSize := aesGCM.NonceSize()
	if len(encryptVal) < nonceSize {
		return "", ErrInvalidValue
	}

	nonce := encryptVal[:nonceSize]
	ciphertext := encryptVal[nonceSize:]

	plaintext, err := aesGCM.Open(nil, []byte(nonce), []byte(ciphertext), nil)
	if err != nil {
		return "", ErrInvalidValue
	}

	expectedName, value, ok := strings.Cut(string(plaintext), ":")
	if !ok {
		return "", ErrInvalidValue
	}

	if expectedName != cookie.Name {
		return "", ErrInvalidValue
	}
	return value, nil
}
