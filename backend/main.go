package main

import (
	"database/sql"
	"fmt"
	"os"
	"strconv"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "modernc.org/sqlite"
)

type Config struct {
	db   *database.Queries
	cost int64
}

func main() {
	godotenv.Load()
	r := gin.New()
	dbName := "main.db"
	if len(os.Args) > 1 && os.Args[1] == "test" {
		dbName = "test.db"
	}

	db, err := sql.Open("sqlite", dbName)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	dbQuery := database.New(db)
	cfg := Config{
		db: dbQuery,
	}
	r.POST("/user", func(ctx *gin.Context) {
		createUser(&cfg, ctx)
	})
	r.GET("/user", func(ctx *gin.Context) {
		getUser(&cfg, ctx)
	})
	r.GET("/reset", func(ctx *gin.Context) {
		cfg.db.DeleteAllUser(ctx.Request.Context())
		ctx.JSON(200, gin.H{
			"msg": "Reset Success",
		})
	})

	r.Run("localhost:8080")
}
