package handler

import (
	"errors"
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

func (uh *UserHandler) CreateUser(ctx *gin.Context) {
	var userReq dto.UserRequest
	var err error
	if err = ctx.ShouldBind(&userReq); err != nil {
		dto.BindingErrorMsg(err.(validator.ValidationErrors), ctx)
		return
	}
	userRes, err := uh.service.CreateUser(ctx.Request.Context(), userReq)
	if err != nil {
		if errors.Is(err, &auth.HashError{}) {
			errorResponse(401, "password Hash Error: %v", err, ctx)
		} else {
			msg := dto.CheckDataBaseError(err)
			ctx.JSON(401, gin.H{"error": msg})
			ctx.Error(err)
		}
		return
	}
	ctx.JSON(201, userRes)
}

func (uh *UserHandler) GetUser(ctx *gin.Context) {
	var userReq dto.UserRequest
	var err error
	if err = ctx.ShouldBind(&userReq); err != nil {
		dto.BindingErrorMsg(err.(validator.ValidationErrors), ctx)
		return
	}

	response, err := uh.service.GetAllUser(ctx.Request.Context())
	if err != nil {
		errorResponse(401, "%v", err, ctx)
		return
	}

	ctx.JSON(http.StatusOK, response)
}

func errorResponse(status int, fmtMsg string, err error, ctx *gin.Context) {
	ctx.JSON(status, gin.H{"error": fmt.Sprintf(fmtMsg, err)})
	ctx.Error(err)
}
