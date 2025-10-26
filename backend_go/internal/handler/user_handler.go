package handler

import (
	"fmt"
	"net/http"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/auth"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/service"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type UserHandler struct {
	service service.UserService
}

func NewUserHanlder(service service.UserService) UserHandler {
	return UserHandler{service: service}
}

func (uh UserHandler) CreateUser(ctx *gin.Context) {
	var userReq dto.UserRequest
	var err error
	if err = ctx.ShouldBind(&userReq); err != nil {
		dto.BindingErrorMsg(err.(validator.ValidationErrors), ctx)
		return
	}
	userRes, err := uh.service.CreateUser(ctx.Request.Context(), userReq)
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}
	ctx.JSON(201, userRes)
}

func (uh UserHandler) GetUser(ctx *gin.Context) {
	response, err := uh.service.GetAllUser(ctx.Request.Context())
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	ctx.JSON(http.StatusOK, response)
}

func (uh UserHandler) GetUserByID(ctx *gin.Context) {
	userid := ctx.Param("id")
	response, err := uh.service.GetUserByID(ctx, userid)
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}
	ctx.JSON(200, response)
}

func (uh UserHandler) Login(ctx *gin.Context) {
	var req dto.LoginRequest
	if err := ctx.ShouldBind(&req); err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	cookie, err := uh.service.Login(ctx.Request.Context(), req)
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	http.SetCookie(ctx.Writer, cookie)
	ctx.String(200, "login success")
}

func (uh UserHandler) Logout(ctx *gin.Context) {
	_, status, err := uh.checkCookie(ctx)
	if err != nil {
		ctx.JSON(status, gin.H{"error": err.Error()})
		return
	}
	ctx.SetCookie("id", "", -1, "/", "localhost", false, false)
	ctx.String(status, "logout success")
}

func (uh UserHandler) checkCookie(ctx *gin.Context) (string, int, error) {
	cookie, err := ctx.Request.Cookie("id")
	if err != nil {
		return "0", 400, fmt.Errorf("User didn't login")
	}

	id, err := auth.ReadCookie(cookie, uh.service.Secret)
	if err != nil {
		return "0", 400, fmt.Errorf("Invalid Cookie")
	}

	data, err := uh.service.GetUserByID(ctx.Request.Context(), id)
	if err != nil {
		return "0", 400, fmt.Errorf("Please Login first")
	}
	return data.UserID.String(), 201, nil
}
