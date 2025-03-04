package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/auth"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type User struct {
	UserID   uuid.UUID `json:"-"`
	Fname    string    `json:"first_name" form:"first_name" binding:"required"`
	Lname    string    `json:"last_name" form:"last_name" binding:"required"`
	Email    string    `json:"email" form:"email" binding:"required"`
	Password string    `json:"password" form:"password" binding:"required"`
}

func createUser(cfg *Config, ctx *gin.Context) {

	var user User
	var err error

	if err = ctx.ShouldBind(&user); err != nil {
		bindingErrorMsg(err.(validator.ValidationErrors), ctx)
		return
	}

	user.UserID = uuid.New()
	user.Password, err = auth.HashPassword(&user.Password)
	if err != nil {
		ctx.JSON(401, gin.H{"error": fmt.Sprintf("data Error: %v", err)})
		ctx.Error(err)
		return
	}

	err = cfg.db.CreateUser(ctx.Request.Context(), database.CreateUserParams{
		UserID:   user.UserID,
		Fname:    sql.NullString{String: user.Fname, Valid: user.Fname != ""},
		Lname:    sql.NullString{String: user.Lname, Valid: user.Lname != ""},
		Email:    user.Email,
		Password: user.Password,
	})
	if err != nil {
		msg := checkDataBaseError(err)
		ctx.JSON(401, gin.H{"error": msg})
		ctx.Error(err)
		return
	}
	ctx.JSON(201, user)
}

func getUser(cfg *Config, ctx *gin.Context) {
	data, err := cfg.db.GetAllUser(ctx.Request.Context())
	if err != nil {
		ctx.JSON(401, gin.H{"error": err.Error()})
		return
	}
	var users []User
	for _, v := range data {
		id, err := uuid.Parse(v.UserID.(string))
		if err != nil {
			ctx.IndentedJSON(401, gin.H{"error": err.Error()})
		}
		user := User{
			UserID:   id,
			Fname:    v.Fname.String,
			Lname:    v.Lname.String,
			Email:    v.Email,
			Password: v.Password,
		}
		users = append(users, user)
	}

	ctx.JSON(http.StatusOK, users)
}

func loginUser(cfg *Config, ctx *gin.Context) {
	type Param struct {
		Email    string `json:"email" form:"email" binding:"required"`
		Password string `json:"password" form:"password" binding:"required"`
	}

	var param Param
	if err := ctx.ShouldBind(&param); err != nil {
		bindingErrorMsg(err.(validator.ValidationErrors), ctx)
		return
	}

	data, err := cfg.db.GetUserByEmail(ctx.Request.Context(), param.Email)
	if err != nil {
		msg := checkDataBaseError(err)
		if err.Error() == noResult {
			msg += "Email, Please Create User"
		}
		ctx.JSON(404, gin.H{"error": msg})
		return
	}

	ok := auth.ComparePassword(&param.Password, &data.Password)
	if !ok {
		ctx.JSON(401, gin.H{"Authentication": fmt.Sprint("Incorrect Password")})
		return
	}

	cookie, err := auth.CreateCookie("id", data.UserID.(string), cfg.secret)
	if err != nil {
		// panic("Create Cookie error")
		ctx.Status(500)
		ctx.Error(err)
		return
	}

	fmt.Printf("cookie: %v\n", cookie)
	http.SetCookie(ctx.Writer, cookie)
	ctx.JSON(201, gin.H{"msg": "Login success"})
}

func logoutUser(cfg *Config, ctx *gin.Context) {
	_, status, err := checkCookie(cfg, ctx)
	if err != nil {
		ctx.JSON(status, gin.H{"error": err.Error()})
		return
	}
	fmt.Println("user logout")
	ctx.SetCookie("id", "", -1, "/", "localhost", false, false)
	ctx.JSON(200, gin.H{"msg": "logout success"})
}

func checkCookie(cfg *Config, ctx *gin.Context) (string, int, error) {
	cookie, err := ctx.Request.Cookie("id")
	if err != nil {
		return "0", 400, fmt.Errorf("User didn't login")
	}

	id, err := auth.ReadCookie(cookie, cfg.secret)
	if err != nil {
		return "0", 400, fmt.Errorf("Invalid Cookie")
	}

	data, err := cfg.db.GetUserByID(ctx.Request.Context(), id)
	if data.UserID == nil {
		return "0", 400, fmt.Errorf("Please Login first")
	}
	return data.UserID.(string), 200, nil
}
