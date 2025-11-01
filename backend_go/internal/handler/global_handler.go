package handler

import (
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/service"
	"github.com/gin-gonic/gin"
)

type GlobalHandler struct {
	UserService  *service.UserService
	MenuService  *service.MenuService
	BillSevice   *service.BillService
	OrderService *service.OrderService
}

func (gh *GlobalHandler) Reset(ctx *gin.Context) {
	err := gh.BillSevice.DeleteAllBill(ctx.Request.Context())
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	err = gh.MenuService.DeleteAllMenu(ctx.Request.Context())
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	err = gh.OrderService.DeleteAllOrder(ctx.Request.Context())
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}
	err = gh.UserService.DeleteAllUser(ctx.Request.Context())
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	ctx.JSON(200, gin.H{"msg": "reset success"})
}
