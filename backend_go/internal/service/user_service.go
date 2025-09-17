package service

import (
	"context"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/auth"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/model"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/repository"
	"github.com/google/uuid"
)

type UserService struct {
	repo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (us *UserService) CreateUser(ctx context.Context, userReq dto.UserRequest) (dto.UserResponse, error) {
	var err error
	var user model.User
	user.FromUserReq(userReq)
	user.UserID = uuid.New()
	user.Password, err = auth.HashPassword(&user.Password)
	if err != nil {
		return dto.UserResponse{}, err
	}

	err = us.repo.CreateUser(ctx, user)
	if err != nil {
		return dto.UserResponse{}, err
	}

	return user.ToUserResponse(), nil
}

func (us *UserService) GetAllUser(ctx context.Context) ([]dto.UserResponse, error) {
	users, err := us.repo.GetAllUser(ctx)
	if err != nil {
		return []dto.UserResponse{}, err
	}

	var response []dto.UserResponse
	for _, user := range users {
		response = append(response, user.ToUserResponse())
	}
	return response, nil
}
