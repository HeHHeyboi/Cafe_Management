package main

import (
	"database/sql"
	"embed"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/interval"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/pressly/goose/v3"

	// _ "github.com/mattn/go-sqlite3"
	_ "modernc.org/sqlite"
)

type Config struct {
	db      *database.Queries
	ticker  *time.Ticker
	secret  string
	counter int
}

//go:embed sql/schema/*.sql
var embedMigration embed.FS

const DURATION = 10 * time.Second

const uploadDir = "upload/"

func main() {
	godotenv.Load()
	dbName := "main.db"

	db, err := sql.Open("sqlite", dbName)
	defer db.Close()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	if len(os.Args) < 2 {
		gin.SetMode(gin.ReleaseMode)
	} else if os.Args[1] == "test" {
		gin.SetMode(gin.DebugMode)
	} else if os.Args[1] == "reset" {
		goose.SetBaseFS(embedMigration)
		if err := goose.SetDialect("sqlite"); err != nil {
			panic(err)
		}

		err = goose.Reset(db, "sql/schema")
		if err != nil {
			panic(err)
		}

		fmt.Println("Reset Success")
		err := os.RemoveAll(uploadDir)
		if err != nil {
			panic(err)
		}

		return
	}

	setUpDB(db)
	secret, ok := os.LookupEnv("SECRET")
	if !ok {
		fmt.Println("Doesn't have SECRET in enviroment variable")
	}

	_ = os.MkdirAll(uploadDir, 0777)

	dbQuery := database.New(db)
	ticker := interval.InitTimeTick(DURATION)
	cfg := Config{
		db:     dbQuery,
		secret: secret,
		ticker: ticker,
	}

	go resetCounter(&cfg, DURATION)
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:3001"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type", "Authorization", "X-Requested-With"},
		AllowCredentials: true,
	}))

	r.Static("/upload", uploadDir)
	r.GET("/checkAuth", func(ctx *gin.Context) {
		checkAuth(&cfg, ctx)
	})
	r.POST("/user", func(ctx *gin.Context) {
		createUser(&cfg, ctx)
	})
	r.GET("/user", func(ctx *gin.Context) {
		getUser(&cfg, ctx)
	})
	r.POST("/user/login", func(ctx *gin.Context) {
		loginUser(&cfg, ctx)
	})
	r.GET("/user/logout", func(ctx *gin.Context) {
		logoutUser(&cfg, ctx)
	})

	r.POST("/gallery", func(ctx *gin.Context) {
		BookGallery(&cfg, ctx)
	})
	r.GET("/gallery", func(ctx *gin.Context) {
		listBooking(&cfg, ctx)
	})

	r.GET("/menu", func(ctx *gin.Context) {
		GetAllMenu(&cfg, ctx)
	})
	r.POST("/menu", func(ctx *gin.Context) {
		AddNewMenu(&cfg, ctx)
	})

	r.GET("/menu/id/:id", GetMenu(&cfg))
	r.GET("/menu/name/:name", GetMenu(&cfg))

	r.DELETE("/menu/id/:id", func(ctx *gin.Context) {
		DeleteMenuByID(&cfg, ctx)
	})
	r.DELETE("/menu/name/:name", func(ctx *gin.Context) {
		DeleteMenuByName(&cfg, ctx)
	})

	r.PUT("/menu/id/:id", UpdateMenu(&cfg))
	r.PUT("/menu/name/:name", UpdateMenu(&cfg))

	r.GET("/giveAway", func(ctx *gin.Context) {
		GetAllGiveAways(&cfg, ctx)
	})
	r.POST("/giveAway", func(ctx *gin.Context) {
		AddNewGiveAway(&cfg, ctx)
	})
	r.PUT("/giveAway/id/:id", func(ctx *gin.Context) {
		UpdateGiveAway(&cfg, ctx)
	})
	r.PUT("/giveAway/name/:name", func(ctx *gin.Context) {
		UpdateGiveAway(&cfg, ctx)
	})

	r.GET("/bill", func(ctx *gin.Context) {
		CreateNewBill(&cfg, ctx)
	})

	r.GET("/reset", func(ctx *gin.Context) {
		err := cfg.db.DeleteAllUser(ctx.Request.Context())
		err = cfg.db.DeleteGallery(ctx.Request.Context())
		err = cfg.db.DeleteAllMenu(ctx.Request.Context())
		err = cfg.db.DeleteGiveAways(ctx.Request.Context())
		err = cfg.db.DeleteBill(ctx.Request.Context())

		if err != nil {
			ctx.Error(err)
			ctx.String(http.StatusInternalServerError, "Can't reset data")
			return
		}
		ctx.JSON(200, gin.H{
			"msg": "Reset Success",
		})
	})
	r.Run()
}

func resetCounter(cfg *Config, duration time.Duration) {
	for {
		<-cfg.ticker.C
		fmt.Println("Reset Counter")
		cfg.counter = 0
	}
}

func setUpDB(db *sql.DB) {
	_, err := db.Exec(enableForeignKey)
	if err != nil {
		fmt.Println("Enable Foreign Key error", err)
		os.Exit(1)
	}

	goose.SetBaseFS(embedMigration)
	if err := goose.SetDialect("sqlite"); err != nil {
		panic(err)
	}

	if err := goose.Up(db, "sql/schema"); err != nil {
		panic(err)
	}

	var fk_enable int
	row := db.QueryRow("pragma foreign_keys;")
	err = row.Scan(&fk_enable)
	if err != nil {
		panic(err)
	}
	fmt.Println("Foreign status : ", fk_enable == 1)

}
