package handler

import (
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/service"
	"github.com/gin-gonic/gin"
)

type BillHandler struct {
	service service.BillService
}

func NewBillHandler(service service.BillService) BillHandler {
	return BillHandler{service: service}
}

func (bh BillHandler) CreateBill(ctx *gin.Context) {
	var req dto.BillRequest
	if err := ctx.ShouldBind(&req); err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}
	bill_id, err := bh.service.CreateBill(ctx.Request.Context(), req)
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	ctx.JSON(201, gin.H{"id": bill_id})
}

func (bh BillHandler) GetAllBills(ctx *gin.Context) {
	response, err := bh.service.GetAllBill(ctx.Request.Context())
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	ctx.JSON(200, response)
}

func (bh BillHandler) GetBillById(ctx *gin.Context) {
	id := ctx.Param("id")
	response, err := bh.service.GetBillID(ctx, id)
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	ctx.JSON(200, response)
}

func (bh BillHandler) UpdateBillById(ctx *gin.Context) {
	id := ctx.Param("id")
	var req dto.BillRequest
	if err := ctx.ShouldBind(&req); err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	err := bh.service.UpdateBillByID(ctx.Request.Context(), id, req)
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	ctx.JSON(200, gin.H{"msg": "update success"})
}

func (bh BillHandler) DeleteBillById(ctx *gin.Context) {
	id := ctx.Param("id")
	err := bh.service.DeleteBillByID(ctx.Request.Context(), id)
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	ctx.JSON(200, gin.H{"msg": "delete bill success"})
}
