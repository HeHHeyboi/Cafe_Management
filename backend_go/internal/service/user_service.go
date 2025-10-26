package service

import (
	"context"
	"fmt"
	"net/http"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/auth"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/model"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/repository"
	"github.com/google/uuid"
)

type UserService struct {
	Repo   repository.UserRepo
	Secret string
}

func (us UserService) CreateUser(ctx context.Context, userReq dto.UserRequest) (dto.UserResponse, error) {
	var err error
	var user model.User
	user.FromUserReq(userReq)
	user.UserID = uuid.New()
	user.Password, err = auth.HashPassword(&user.Password)
	if err != nil {
		return dto.UserResponse{}, err
	}

	err = us.Repo.CreateUser(ctx, user)
	if err != nil {
		return dto.UserResponse{}, err
	}

	return user.ToUserResponse(), nil
}

func (us UserService) GetAllUser(ctx context.Context) ([]dto.UserResponse, error) {
	users, err := us.Repo.GetAllUser(ctx)
	if err != nil {
		return []dto.UserResponse{}, err
	}

	var response []dto.UserResponse
	for _, user := range users {
		response = append(response, user.ToUserResponse())
	}
	return response, nil
}

func (us UserService) GetUserByID(ctx context.Context, userid string) (dto.UserResponse, error) {
	data, err := us.Repo.GetUserByID(ctx, userid)
	if err != nil {
		return dto.UserResponse{}, err
	}

	response := dto.UserResponse{
		UserID:   data.UserID,
		Fname:    data.Fname,
		Lname:    data.Lname,
		Email:    data.Email,
		Password: data.Password,
		Role:     data.Role,
	}
	return response, nil
}

func (us UserService) Login(ctx context.Context, req dto.LoginRequest) (*http.Cookie, error) {
	data, err := us.Repo.GetUserByEmail(ctx, req.Email)
	if err != nil {
		return nil, dto.LoginError{Email: req.Email}
	}

	ok := auth.ComparePassword(&req.Password, &data.Password)
	if !ok {
		return nil, dto.LoginError{Email: req.Email}
	}

	cookie, err := auth.CreateCookie("id", data.UserID.String(), us.Secret)
	if err != nil {
		return nil, fmt.Errorf("Create Cookie Error, %s", err.Error())
	}
	return cookie, nil
}

func (us UserService) DeleteAllUser(ctx context.Context) error {
	err := us.Repo.DeleteAllUser(ctx)
	if err != nil {
		return err
	}
	return nil
}
