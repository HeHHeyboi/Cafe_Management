package dto

import "github.com/google/uuid"

type UserRequest struct {
	UserID   uuid.UUID `json:"id"`
	Fname    string    `json:"first_name" form:"first_name" binding:"required"`
	Lname    string    `json:"last_name" form:"last_name" binding:"required"`
	Email    string    `json:"email" form:"email" binding:"required"`
	Password string    `json:"password" form:"password" binding:"required"`
}
