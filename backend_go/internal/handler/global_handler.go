package handler

import (
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/service"
	"github.com/gin-gonic/gin"
)

type GlobalHandler struct {
	UserService service.UserService
}

func (gh *GlobalHandler) Reset(ctx *gin.Context) {
	err := gh.UserService.DeleteAllUser(ctx)
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
	}

	ctx.JSON(200, gin.H{"msg": "reset success"})
}
