package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type Gallery struct {
	Name        string    `form:"name" json:"name" binding:"required"`
	Startdate   string    `form:"start_date" json:"start_date" binding:"required"`
	Enddate     string    `form:"end_date" json:"end_date" binding:"required"`
	Description string    `form:"description" json:"description" binding:"required"`
	UserID      uuid.UUID `json:"user_id"`
}

func BookGallery(cfg *Config, ctx *gin.Context) {
	var param Gallery

	// cookie, err := ctx.Request.Cookie("id")
	// if err != nil {
	// 	ctx.JSON(401, gin.H{"error": "Please login first"})
	// 	return
	// }
	//
	// user_id, err := auth.ReadCookie(cookie, cfg.secret)
	// if err != nil {
	// 	ctx.JSON(401, gin.H{"error": err.Error()})
	// }
	user_id, status, err := checkCookie(cfg, ctx)
	if err != nil {
		ctx.JSON(status, gin.H{"error": err.Error()})
		return
	}

	if err = ctx.ShouldBind(&param); err != nil {
		bindingErrorMsg(err.(validator.ValidationErrors), ctx)
		return
	}

	start_date, err := time.Parse(time.DateOnly, param.Startdate)
	end_date, err := time.Parse(time.DateOnly, param.Enddate)
	if err != nil {
		ctx.JSON(400, gin.H{"error": fmt.Sprintf("Parse Time Error: %v", err)})
		return
	}

	data, err := cfg.db.BookGallery(ctx.Request.Context(), database.BookGalleryParams{
		Gname:     param.Name,
		Startdate: start_date.Format(time.DateOnly),
		Enddate:   end_date.Format(time.DateOnly),
		Desc: sql.NullString{
			String: param.Description,
			Valid:  (param.Description != ""),
		},
		UserID: user_id,
	})

	if err != nil {
		msg := "Booking Error: " + checkDataBaseError(err)
		ctx.JSON(401, gin.H{"error": msg})
		ctx.Error(fmt.Errorf("%v", msg))
		return
	}

	book := Gallery{
		data.Gname,
		data.Startdate,
		data.Enddate,
		data.Desc.String,
		uuid.MustParse(data.UserID.(string)),
	}
	ctx.JSON(http.StatusOK, book)
}

func listBooking(cfg *Config, ctx *gin.Context) {
	month := ctx.DefaultQuery("month", "none")
	// fmt.Println(month)

	var data []database.Gallery
	var err error

	if month == "this" {
		data, err = cfg.db.ListGalleryByMonth(ctx.Request.Context(), database.ListGalleryByMonthParams{
			ThisMonth: true,
			Month:     nil,
		})
	} else if month != "none" {
		data, err = cfg.db.ListGalleryByMonth(ctx.Request.Context(), database.ListGalleryByMonthParams{
			ThisMonth: false,
			Month:     "TEXT",
		})
	} else {
		data, err = cfg.db.ListGallery(ctx.Request.Context())
	}

	if err != nil {
		ctx.JSON(500, gin.H{"error": "List Booking Error"})
		ctx.Error(err)
	}

	var galleries []Gallery
	for _, book := range data {
		gallery := Gallery{
			Name:        book.Gname,
			Startdate:   book.Startdate,
			Enddate:     book.Enddate,
			Description: book.Desc.String,
			UserID:      uuid.MustParse(book.UserID.(string)),
		}
		galleries = append(galleries, gallery)
	}
	ctx.JSON(http.StatusOK, galleries)
}
