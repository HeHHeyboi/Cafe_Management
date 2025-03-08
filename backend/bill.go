package main

import (
	"time"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type Bill struct {
	Bill_ID string  `json:"bill_id"`
	Total   float64 `json:"total"`
	PayDate string  `json:"pay_date"`
	Orders  []Order `json:"orders"`
}

type Order struct {
	Bill_ID    string  `json:"bill_id"`
	Menu_ID    int64   `json:"menu_id"`
	Amount     int64   `json:"amount"`
	TotalPrice float64 `json:"total_price"`
}

func CreateNewBill(cfg *Config, ctx *gin.Context) {
	type Param struct {
		Orders []struct {
			Menu_ID int64 `json:"menu_id"`
			Amount  int64 `json:"amount"`
		} `json:"orders"`
	}

	var param Param
	if err := ctx.ShouldBind(&param); err != nil {
		bindingErrorMsg(err.(validator.ValidationErrors), ctx)
		return
	}

	bill_data, err := cfg.db.CreateBill(ctx.Request.Context(), time.Now().Format(time.DateTime))
	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		ctx.Error(err)
		return
	}

	var orders []Order
	var total float64

	for _, v := range param.Orders {
		order_data, err := cfg.db.CreateNewOrder(ctx.Request.Context(), database.CreateNewOrderParams{
			BillID:       bill_data.BillID,
			MenuID:       v.Menu_ID,
			Amount:       v.Amount,
			CalAmount:    float64(v.Amount),
			TargetMenuID: v.Menu_ID,
		})
		if err != nil {
			ctx.JSON(500, gin.H{"error": err.Error()})
			ctx.Error(err)
			return
		}
		total += order_data.TotalPrice

		order := Order{
			Bill_ID:    order_data.BillID,
			Menu_ID:    order_data.MenuID,
			Amount:     order_data.Amount,
			TotalPrice: order_data.TotalPrice,
		}

		orders = append(orders, order)
	}

	bill_data, err = cfg.db.UpdateBillTotal(ctx.Request.Context(), database.UpdateBillTotalParams{
		Total:  total,
		BillID: bill_data.BillID,
	})
	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		ctx.Error(err)
		return
	}

	bill := Bill{
		Bill_ID: bill_data.BillID,
		Total:   bill_data.Total,
		PayDate: bill_data.PayDate,
		Orders:  orders,
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
		orders_data, _ := cfg.db.GetOrderFromBill(ctx.Request.Context(), data.BillID)
		var orders []Order
		var total float64
		for _, order_data := range orders_data {
			total += order_data.TotalPrice
			order := Order{
				Bill_ID:    order_data.BillID,
				Menu_ID:    order_data.MenuID,
				Amount:     order_data.Amount,
				TotalPrice: order_data.TotalPrice,
			}

			orders = append(orders, order)
		}

		bill := Bill{
			Bill_ID: data.BillID,
			Total:   total,
			PayDate: data.PayDate,
		}

		bills = append(bills, bill)
	}

	ctx.JSON(200, bills)
}
