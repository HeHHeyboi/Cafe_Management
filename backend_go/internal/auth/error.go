package auth

type HashError struct {
	msg string
}

func (he HashError) Error() string {
	return he.msg
}

func NewHashError(msg string) *HashError {
	return &HashError{msg}
}
