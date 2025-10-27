package dto

import "fmt"

type LoginError struct {
	Email string
}

func (m LoginError) Error() string {
	return fmt.Sprintf("Password doesn't match or %s doesn't exist", m.Email)
}
