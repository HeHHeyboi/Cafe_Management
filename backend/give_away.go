package main

import (
	"database/sql"
	"fmt"
	"strconv"
	"time"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type GiveAway struct {
	ID     int64     `json:"id"`
	Name   string    `json:"name"`
	Amount int64     `json:"amount"`
	Remain int64     `json:"remain"`
	Desc   string    `json:"desc"`
	Date   time.Time `json:"date"`
}

func uploadIMG(cfg *Config, ctx *gin.Context, name string) (string, int, error) {
	file, err := ctx.FormFile("file")
	if err != nil {
		return "", 500, fmt.Errorf("File Error")
	}
	ctx.SaveUploadedFile(file, uploadDir+name)

	url := "/upload"

	return url, 200, nil
}

func AddNewGiveAway(cfg *Config, ctx *gin.Context) {
	type Param struct {
		Name   string `json:"name" form:"name" binding:"required"`
		Desc   string `json:"desc" form:"desc"`
		Amount int    `json:"amount" form:"amount" binding:"required"`
	}

	var param Param

	if err := ctx.ShouldBind(&param); err != nil {
		bindingErrorMsg(err.(validator.ValidationErrors), ctx)
		return
	}

	err := cfg.db.AddNewGiveAway(ctx.Request.Context(), database.AddNewGiveAwayParams{
		Name:   param.Name,
		Amount: int64(param.Amount),
		Remain: int64(param.Amount),
		Desc: sql.NullString{
			String: param.Desc,
			Valid:  param.Desc != "",
		},
	})

	if err != nil {
		errMsg := checkDataBaseError(err)
		ctx.JSON(500, gin.H{"error": errMsg})
		return
	}

	ctx.JSON(201, gin.H{"msg": "success"})
}

func GetAllGiveAways(cfg *Config, ctx *gin.Context) {
	query_id := ctx.DefaultQuery("id", "-1")
	name := ctx.DefaultQuery("name", "")
	id, err := strconv.Atoi(query_id)
	if err != nil {
		ctx.JSON(400, gin.H{"error": "invalid id"})
		return
	}

	if name != "" {
		data, err := cfg.db.GetGiveAwayByName(ctx.Request.Context(), name)
		date, err := time.Parse(time.DateOnly, data.Date.(string))
		if err != nil {
			msg := checkDataBaseError(err)
			ctx.JSON(500, gin.H{"error": msg})
		}
		giveAway := GiveAway{
			ID:     data.ID,
			Name:   data.Name,
			Amount: data.Amount,
			Remain: data.Remain,
			Desc:   data.Desc.String,
			Date:   date,
		}
		ctx.JSON(200, giveAway)
		return
	} else if id != -1 {
		data, err := cfg.db.GetGiveAwayByID(ctx.Request.Context(), int64(id))
		date, err := time.Parse(time.DateOnly, data.Date.(string))
		if err != nil {
			msg := checkDataBaseError(err)
			ctx.JSON(500, gin.H{"error": msg})
		}
		giveAway := GiveAway{
			ID:     data.ID,
			Name:   data.Name,
			Amount: data.Amount,
			Remain: data.Remain,
			Desc:   data.Desc.String,
			Date:   date,
		}
		ctx.JSON(200, giveAway)
		return
	}

	data, err := cfg.db.GetAllGiveAways(ctx.Request.Context())

	if err != nil {
		msg := checkDataBaseError(err)
		ctx.JSON(500, gin.H{"error": msg})
		return
	}

	var giveAways []GiveAway

	for _, v := range data {
		date, err := time.Parse(time.DateOnly, v.Date.(string))
		if err != nil {
			fmt.Println("Parse Time error: ", err)
		}
		g := GiveAway{
			ID:     v.ID,
			Name:   v.Name,
			Amount: v.Amount,
			Remain: v.Remain,
			Desc:   v.Desc.String,
			Date:   date,
		}

		giveAways = append(giveAways, g)
	}
	ctx.JSON(200, giveAways)
}
