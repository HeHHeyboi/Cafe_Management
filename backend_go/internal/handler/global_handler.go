package handler

import (
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/service"
	"github.com/gin-gonic/gin"
)

type GlobalHandler struct {
	UserService *service.UserService
	MenuService *service.MenuService
	BillSevice  *service.BillService
}

func (gh *GlobalHandler) Reset(ctx *gin.Context) {
	err := gh.UserService.DeleteAllUser(ctx.Request.Context())
	err = gh.MenuService.DeleteAllMenu(ctx.Request.Context())
	err = gh.BillSevice.DeleteAllBill(ctx.Request.Context())
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
	}

	ctx.JSON(200, gin.H{"msg": "reset success"})
}
