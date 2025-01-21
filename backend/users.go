package main

import (
	"database/sql"
	"fmt"
	"net/http"

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
		ctx.JSON(401, gin.H{"error": fmt.Sprintf("Binding Error")})
		return
	}
	user.UserID = uuid.New()
	err = cfg.db.CreateUser(ctx.Request.Context(), database.CreateUserParams{
		UserID:   user.UserID,
		Fname:    sql.NullString{String: user.Fname, Valid: user.Fname != ""},
		Lname:    sql.NullString{String: user.Lname, Valid: user.Lname != ""},
		Email:    user.Email,
		Password: user.Password,
	})
	if err != nil {
		ctx.JSON(401, gin.H{"error": err.Error()})
		return
	}
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
