package main

import (
	"database/sql"
	"embed"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/google/uuid"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/auth"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/handler"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/repository"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/service"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/pressly/goose/v3"

	// _ "github.com/mattn/go-sqlite3"
	_ "modernc.org/sqlite"
)

type Config struct {
	db             *database.Queries
	secret         string
	admin_email    string
	admin_password string
}

//go:embed sql/schema/*.sql
var embedMigration embed.FS

var duration time.Duration = 24 * time.Hour

const uploadDir = "upload/"

func main() {
	err := godotenv.Load()
	if err != nil {
		panic("Dont' have .env file")
	}
	dbName := "main.db?_pragma=foreign_keys(1)"

	db, err := sql.Open("sqlite", dbName)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	defer db.Close()

	if len(os.Args) < 2 {
		gin.SetMode(gin.ReleaseMode)
	} else if os.Args[1] == "test" {
		duration = 10 * time.Second
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

	secret, ok := os.LookupEnv("SECRET")
	if !ok {
		fmt.Println("Doesn't have SECRET in enviroment variable")
	}
	admin_email, ok := os.LookupEnv("ADMIN_EMAIL")
	if !ok {
		fmt.Println("Doesn't Have ADMIN_EMAIL")
	}
	admin_password, ok := os.LookupEnv("ADMIN_PASSWORD")
	if !ok {
		fmt.Println("Doesn't have ADMIN_PASSWORD")
	}

	_ = os.MkdirAll(uploadDir, 0777)

	dbQuery := database.New(db)
	cfg := Config{
		db:             dbQuery,
		secret:         secret,
		admin_email:    admin_email,
		admin_password: admin_password,
	}
	setUpDB(db, &cfg)

	r := gin.New()
	r.Use(gin.Logger())
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:3001", "http://10.225.100.168"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type", "Authorization", "X-Requested-With"},
		AllowCredentials: true,
	}))
	repos := repository.CreateRepository(cfg.db)

	user_service := service.UserService{Repo: repos.User, Secret: cfg.secret}
	user_handler := handler.NewUserHanlder(user_service)

	menu_service := service.NewMenuService(repos.Menu)
	menu_hanlder := handler.NewMenuHandler(menu_service)

	bill_service := service.NewBillService(repos.Bill)
	bill_handler := handler.NewBillHandler(bill_service)

	order_service := service.NewOrderService(repos.Order)
	order_handler := handler.NewOrderHandler(order_service)

	global_handler := handler.GlobalHandler{
		UserService:  &user_service,
		MenuService:  &menu_service,
		BillSevice:   &bill_service,
		OrderService: &order_service,
	}

	r.Static("/upload", uploadDir)
	r.GET("/reset", global_handler.Reset)
	r.GET("/user", user_handler.GetUser)
	r.POST("/user", user_handler.CreateUser)
	r.GET("/user/:id", user_handler.GetUserByID)
	r.POST("/user/login", user_handler.Login)
	r.GET("/user/logout", user_handler.Logout)

	r.GET("/menu", menu_hanlder.GetAllMenu)
	r.GET("/menu/:id", menu_hanlder.GetMenuByID)
	r.POST("/menu", menu_hanlder.AddMenu)
	r.PUT("/menu/:id", menu_hanlder.UpdateMenyByID)
	r.DELETE("/menu/:id", menu_hanlder.DeleteMenuByID)

	r.POST("/bill/new", bill_handler.CreateBill)
	r.POST("/bill", bill_handler.CreateBill)
	r.GET("/bill", bill_handler.GetAllBills)
	r.GET("/bill/:id", bill_handler.GetBillById)
	r.PUT("/bill/:id", bill_handler.UpdateBillById)
	r.DELETE("/bill/:id", bill_handler.DeleteBillById)

	r.GET("/order", order_handler.GetAllOrder)
	r.POST("/order/:id", order_handler.CreateOrder)
	r.GET("/order/:id", order_handler.GetOrdersByBillID)

	r.Run()
}

func setUpDB(db *sql.DB, cfg *Config) {
	var err error

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

	admin_uuid := uuid.New()
	hash_password, _ := auth.HashPassword(&cfg.admin_password)

	_, err = db.Exec(`
		INSERT INTO users (user_id, FName, LName, email, password, role)
		VALUES (?, ?, ?, ?, ?, 'admin')
		ON CONFLICT(email) DO NOTHING;
	`, admin_uuid.String(), "admin", "admin", cfg.admin_email, hash_password)

	if err != nil {
		log.Fatalf("Add Admin error: %v", err)
	}
}
