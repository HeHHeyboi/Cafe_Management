package model

import "github.com/google/uuid"

type User struct {
	UserID   uuid.UUID
	Fname    string
	Lname    string
	Email    string
	Password string
	Role     string
}
