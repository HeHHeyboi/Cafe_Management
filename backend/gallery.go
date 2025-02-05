package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/auth"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Gallery struct {
	Gname     string    `json:"name"`
	Startdate string    `json:"start_date"`
	Enddate   string    `json:"end_date"`
	Desc      string    `json:"description"`
	UserID    uuid.UUID `json:"user_id"`
}

func BookGallery(cfg *Config, ctx *gin.Context) {
	type Param struct {
		Gname     string `json:"name"`
		Startdate string `json:"start_date"`
		Enddate   string `json:"end_date"`
		Desc      string `json:"description"`
	}
	var param Param
	var err error

	cookie, err := ctx.Request.Cookie("id")
	if err != nil {
		ctx.JSON(401, gin.H{"error": "Please login first"})
		return
	}

	id, err := auth.ReadCookie(cookie, cfg.secret)
	if err != nil {
		panic(err.Error())
	}

	if err = ctx.BindJSON(&param); err != nil {
		ctx.JSON(400, gin.H{"error": fmt.Sprintf("Binding Error: %v", err)})
		return
	}

	start_date, err := time.Parse(time.DateOnly, param.Startdate)
	end_date, err := time.Parse(time.DateOnly, param.Enddate)
	if err != nil {
		ctx.JSON(400, gin.H{"error": fmt.Sprintf("Parse Time Error: %v", err)})
		return
	}

	data, err := cfg.db.BookGallery(ctx.Request.Context(), database.BookGalleryParams{
		Gname:     param.Gname,
		Startdate: start_date.Format(time.DateOnly),
		Enddate:   end_date.Format(time.DateOnly),
		Desc: sql.NullString{
			String: param.Desc,
			Valid:  (param.Desc != ""),
		},
		UserID: id,
	})

	if err != nil {
		msg := "Booking Error: " + checkError(err)
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
	fmt.Println(month)

	var data []database.Gallery
	var err error

	if month == "this" {
		// fmt.Println("month = this")
		data, err = cfg.db.ListGalleryByMonth(ctx.Request.Context(), database.ListGalleryByMonthParams{
			ThisMonth: true,
			Month:     nil,
		})
	} else if month != "none" {
		// fmt.Println("month = ", month)
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
			Gname:     book.Gname,
			Startdate: book.Startdate,
			Enddate:   book.Enddate,
			Desc:      book.Desc.String,
			UserID:    uuid.MustParse(book.UserID.(string)),
		}
		galleries = append(galleries, gallery)
	}
	ctx.JSON(http.StatusOK, galleries)
}
