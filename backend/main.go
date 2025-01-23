package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	// _ "github.com/mattn/go-sqlite3"
	_ "modernc.org/sqlite"
)

type Config struct {
	db *database.Queries
}

func main() {
	godotenv.Load()
	// dbName := "main.db?_fk=ON"
	dbName := "main.db"

	db, err := sql.Open("sqlite", dbName)
	defer db.Close()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	if len(os.Args) < 2 {
		gin.SetMode(gin.ReleaseMode)
		setUpDB(db)
	} else if os.Args[1] == "test" {
		gin.SetMode(gin.DebugMode)
	}

	dbQuery := database.New(db)
	cfg := Config{
		db: dbQuery,
	}
	r := gin.New()
	r.Use(gin.Logger())

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
			ctx.String(http.StatusInternalServerError, err.Error())
			return
		}
		ctx.JSON(200, gin.H{
			"msg": "Reset Success",
		})
	})
	r.Run()
}

func setUpDB(db *sql.DB) {
	_, err := db.Exec(enableForeignKey)
	if err != nil {
		fmt.Println("Set up User table error ", err)
		os.Exit(1)
	}

	_, err = db.Exec(createUserTable)
	if err != nil {
		fmt.Println("Set up User table error ", err)
		os.Exit(1)
	}

	_, err = db.Exec(createGalleryTable)
	if err != nil {
		fmt.Println("Set up Gallery Table error ", err)
		os.Exit(1)
	}

}
