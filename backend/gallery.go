package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"
	"time"

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
		Gname     string    `json:"name"`
		Startdate string    `json:"start_date"`
		Enddate   string    `json:"end_date"`
		Desc      string    `json:"description"`
		UserID    uuid.UUID `json:"user_id"`
	}
	var param Param
	var err error

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
		UserID: param.UserID,
	})

	if err != nil {
		msg := "Booking Error: " + checkError(err)
		ctx.JSON(401, gin.H{"error": msg})
		ctx.Error(err)
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

// TODO: Accept 'month' Query to filter book gallery that have been book in this month
func listBooking(cfg *Config, ctx *gin.Context) {
	query := ctx.DefaultQuery("this_month", "false")
	this_month, err := strconv.ParseBool(query)
	if err != nil {
		panic(err)
	}
	var data []database.Gallery

	if this_month {
		data, err = cfg.db.ListGalleryByMonth(ctx.Request.Context(), 1)
	} else {
		data, err = cfg.db.ListGallery(ctx.Request.Context())
	}
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "List Booking Error"})
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
