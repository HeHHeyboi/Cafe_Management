package service

import (
	"context"
	"fmt"
	"net/http"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/auth"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/model"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/repository"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type UserService struct {
	repo   repository.UserRepo
	secret string
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

	err = us.repo.CreateUser(ctx, user)
	if err != nil {
		return dto.UserResponse{}, err
	}

	return user.ToUserResponse(), nil
}

func (us UserService) GetAllUser(ctx context.Context) ([]dto.UserResponse, error) {
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

func (us UserService) GetUserByID(ctx *gin.Context) (dto.UserResponse, error) {
	userid := ctx.Param("id")

	data, err := us.repo.GetUserByID(ctx.Request.Context(), userid)
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

func (us UserService) Login(ctx *gin.Context, req dto.LoginRequest) error {
	data, err := us.repo.GetUserByEmail(ctx, req.Email)
	if err != nil {
		return dto.LoginError{Email: req.Email}
	}

	ok := auth.ComparePassword(&req.Password, &data.Password)
	if !ok {
		return dto.LoginError{Email: req.Email}
	}

	cookie, err := auth.CreateCookie("id", data.UserID.String(), us.secret)
	if err != nil {
		return fmt.Errorf("Create Cookie Error, %s", err.Error())
	}
	http.SetCookie(ctx.Writer, cookie)
	return nil
}

func (us UserService) Logout(ctx *gin.Context) (int, error) {
	_, status, err := us.checkCookie(ctx)
	if err != nil {
		return status, err
	}
	ctx.SetCookie("id", "", -1, "/", "localhost", false, false)
	return status, nil
}
func (us UserService) checkCookie(ctx *gin.Context) (string, int, error) {
	cookie, err := ctx.Request.Cookie("id")
	if err != nil {
		return "0", 400, fmt.Errorf("User didn't login")
	}

	id, err := auth.ReadCookie(cookie, us.secret)
	if err != nil {
		return "0", 400, fmt.Errorf("Invalid Cookie")
	}

	data, err := us.repo.GetUserByID(ctx.Request.Context(), id)
	if err != nil {
		return "0", 400, fmt.Errorf("Please Login first")
	}
	return data.UserID.String(), 201, nil
}
