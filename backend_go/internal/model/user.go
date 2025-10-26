package model

import (
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"
	"github.com/google/uuid"
)

type User struct {
	UserID   uuid.UUID
	Fname    string
	Lname    string
	Email    string
	Password string
	Role     string
}

func (u *User) FromUserReq(userReq dto.UserRequest) {
	u.Fname = userReq.Fname
	u.Lname = userReq.Lname
	u.Email = userReq.Email
	u.Password = userReq.Password
}

func (u User) ToUserResponse() dto.UserResponse {
	return dto.UserResponse{
		UserID:   u.UserID,
		Fname:    u.Fname,
		Lname:    u.Lname,
		Email:    u.Email,
		Password: u.Password,
		Role:     u.Role,
	}
}
