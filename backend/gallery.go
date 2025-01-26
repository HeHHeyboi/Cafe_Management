package main

import (
	"database/sql"
	"fmt"
	"net/http"
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

	var book Gallery
	book.Gname = data.Gname
	book.Startdate = data.Startdate
	book.Enddate = data.Enddate
	book.Desc = data.Desc.String
	book.UserID = uuid.MustParse(data.UserID.(string))
	ctx.JSON(http.StatusOK, gin.H{
		"name":        book.Gname,
		"start_date":  book.Startdate,
		"end_date":    book.Enddate,
		"description": book.Desc,
		"user_id":     book.UserID,
	})
}

func listBooking(cfg *Config, ctx *gin.Context) {

	data, err := cfg.db.ListGallery(ctx.Request.Context())
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
