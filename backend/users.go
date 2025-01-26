package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/auth"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type User struct {
	UserID   uuid.UUID `json:"id"`
	Fname    string    `json:"first_name"`
	Lname    string    `json:"last_name"`
	Email    string    `json:"email"`
	Password string    `json:"password"`
}

func createUser(cfg *Config, ctx *gin.Context) {

	var user User
	var err error

	if err = ctx.BindJSON(&user); err != nil {
		http.Error(ctx.Writer, "Binding Error", http.StatusBadRequest)
		return
	}

	user.UserID = uuid.New()
	user.Password, err = auth.HashPassword(&user.Password)
	if err != nil {
		ctx.JSON(401, gin.H{"error": fmt.Sprintf("HashPassword Error: %v", err)})
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
		msg := checkError(err)
		ctx.JSON(401, gin.H{"error": msg})
		ctx.Error(err)
		return
	}
	ctx.JSON(200, user)
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
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var param Param
	if err := ctx.ShouldBindJSON(&param); err != nil {
		ctx.JSON(401, gin.H{"error": fmt.Sprintf("Binding Error: %v", err)})
		return
	}

	hashPassword, err := cfg.db.GetUserByEmail(ctx.Request.Context(), param.Email)
	if err != nil {
		ctx.JSON(404, gin.H{"error": fmt.Sprintf("Can't Get User: %v", err)})
		return
	}

	ok := auth.ComparePassword(&param.Password, &hashPassword)
	if !ok {
		ctx.JSON(401, gin.H{"Authentication": fmt.Sprint("Incorrect Password")})
		return
	}

	ctx.Status(201)
}
