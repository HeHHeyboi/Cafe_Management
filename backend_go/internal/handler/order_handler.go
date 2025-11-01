package handler

import (
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/service"
	"github.com/gin-gonic/gin"
)

type OrderHandler struct {
	service service.OrderService
}

func NewOrderHandler(service service.OrderService) OrderHandler {
	return OrderHandler{service}
}

func (o OrderHandler) CreateOrder(ctx *gin.Context) {
	var req dto.OrderRequest
	var err error

	id := ctx.Param("id")
	if id == "" {
		dto.BindingErrorMsg(dto.ParamError{
			Value:    "id",
			Location: "/order/:id",
			Method:   "POST",
		}, ctx)
		return
	}

	if err = ctx.ShouldBindJSON(&req); err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	err = o.service.CreateOrder(ctx.Request.Context(), id, req)
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	ctx.JSON(201, gin.H{"msg": "Created success"})
}

func (o OrderHandler) GetOrdersByBillID(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		dto.BindingErrorMsg(dto.ParamError{
			Value:    "id",
			Location: "/order/:id",
			Method:   "GET",
		}, ctx)
		return
	}

	response, err := o.service.GetOrdersByBillID(ctx.Request.Context(), id)
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	ctx.JSON(200, response)
}
