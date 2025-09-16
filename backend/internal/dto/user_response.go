package dto

import "github.com/google/uuid"

type UserResponse struct {
	UserID   uuid.UUID `json:"id"`
	Fname    string    `json:"first_name"`
	Lname    string    `json:"last_name"`
	Email    string    `json:"email"`
	Password string    `json:"password"`
}
