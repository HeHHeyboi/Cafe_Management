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
	Startdate time.Time `json:"start_date"`
	Enddate   time.Time `json:"end_date"`
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

	var book Gallery
	book.Gname = param.Gname
	book.Startdate, err = time.Parse(time.DateOnly, param.Startdate)
	book.Enddate, err = time.Parse(time.DateOnly, param.Enddate)
	if err != nil {
		ctx.JSON(400, gin.H{"error": fmt.Sprintf("Parse Time Error: %v", err)})
		return
	}
	book.Desc = param.Desc
	book.UserID = param.UserID

	data, err := cfg.db.BookGallery(ctx.Request.Context(), database.BookGalleryParams{
		Gname:     book.Gname,
		Startdate: book.Startdate.Format(time.DateOnly),
		Enddate:   book.Enddate.Format(time.DateOnly),
		Desc: sql.NullString{
			String: book.Desc,
			Valid:  (book.Desc != ""),
		},
		UserID: book.UserID,
	})

	if err != nil {
		ctx.JSON(400, gin.H{"error": fmt.Sprintf("Booking Error: %v", err)})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"name":        data.Gname,
		"start_date":  data.Startdate,
		"end_date":    data.Enddate,
		"description": data.Desc,
		"user_id":     data.UserID,
	})

}
