package main

import (
	"database/sql"
	"fmt"
	"os"

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
	r.POST("/user/login", func(ctx *gin.Context) {
		loginUser(&cfg, ctx)
	})

	r.POST("/gallery", func(ctx *gin.Context) {
		BookGallery(&cfg, ctx)
	})
	r.GET("/reset", func(ctx *gin.Context) {
		err := cfg.db.DeleteAllUser(ctx.Request.Context())
		err = cfg.db.DeleteGallery(ctx.Request.Context())

		if err != nil {
			ctx.JSON(401, gin.H{
				"error": err.Error(),
			})
			return
		}
		ctx.JSON(200, gin.H{
			"msg": "Reset Success",
		})
	})

	r.Run("localhost:8080")
}
