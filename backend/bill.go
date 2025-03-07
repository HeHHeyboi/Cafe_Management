package main

import (
	"time"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type Bill struct {
	Bill_ID string  `json:"bill_id"`
	Total   float32 `json:"total"`
	PayDate string  `json:"pay_date"`
}

type Order struct {
	Bill_ID string `json:"bill_id"`
	Menu_ID string `json:"menu_id"`
	Amount  string `json:"amount"`
}

func CreateNewBill(cfg *Config, ctx *gin.Context) {
	type Param struct {
		Total float32 `json:"total"`
	}

	var param Param
	if err := ctx.ShouldBind(&param); err != nil {
		bindingErrorMsg(err.(validator.ValidationErrors), ctx)
		return
	}

	data, err := cfg.db.CreateBill(ctx.Request.Context(), database.CreateBillParams{
		Total:   int64(param.Total),
		PayDate: time.Now().Format(time.DateTime),
	})
	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	bill := Bill{
		Bill_ID: data.BillID,
		Total:   float32(data.Total),
		PayDate: data.PayDate,
	}

	ctx.JSON(201, bill)
}

func GetBill(cfg *Config, ctx *gin.Context) {
	datas, err := cfg.db.ListBill(ctx.Request.Context())
	if err != nil {
		msg := checkDataBaseError(err)
		if err.Error() == noResult {
			ctx.JSON(404, gin.H{"err": msg})
			return
		}
		ctx.JSON(500, gin.H{"err": msg})
		return
	}

	var bills []Bill

	for _, data := range datas {
		b := Bill{
			data.BillID, float32(data.Total), data.PayDate,
		}
		bills = append(bills, b)
	}

	ctx.JSON(200, bills)
}
