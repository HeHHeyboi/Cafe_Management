package repository

import (
	"context"
	"database/sql"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/model"
	"github.com/google/uuid"
)

type UserRepo interface {
	CreateAdmin(ctx context.Context, user model.User) error
	CreateUser(ctx context.Context, user model.User) error
	DeleteAllUser(ctx context.Context) error
	GetAllUser(ctx context.Context) ([]model.User, error)
	GetUserByEmail(ctx context.Context, email string) (model.User, error)
	GetUserByID(ctx context.Context, userID any) (model.User, error)
}

type userRepository struct {
	db *database.Queries
}

func newUserRepo(q *database.Queries) UserRepo {
	return &userRepository{db: q}
}

func (ur userRepository) CreateAdmin(ctx context.Context, user model.User) error {
	param := database.CreateAdminParams{
		UserID:   user.UserID,
		Fname:    sql.NullString{String: user.Fname, Valid: user.Fname != ""},
		Lname:    sql.NullString{String: user.Lname, Valid: user.Lname != ""},
		Email:    user.Email,
		Password: user.Password,
	}
	err := ur.db.CreateAdmin(ctx, param)
	if err != nil {
		return err
	}
	return nil
}

func (ur userRepository) CreateUser(ctx context.Context, user model.User) error {
	param := database.CreateUserParams{
		UserID:   user.UserID,
		Fname:    sql.NullString{String: user.Fname, Valid: user.Fname != ""},
		Lname:    sql.NullString{String: user.Lname, Valid: user.Lname != ""},
		Email:    user.Email,
		Password: user.Password,
	}
	err := ur.db.CreateUser(ctx, param)
	if err != nil {
		return err
	}
	return nil
}
func (ur userRepository) DeleteAllUser(ctx context.Context) error {
	err := ur.db.DeleteAllUser(ctx)
	if err != nil {
		return err
	}
	return nil
}
func (ur userRepository) GetAllUser(ctx context.Context) ([]model.User, error) {
	datas, err := ur.db.GetAllUser(ctx)
	if err != nil {
		return []model.User{}, err
	}

	var userList []model.User
	for _, data := range datas {
		user := toUser(data)
		userList = append(userList, user)
	}

	return userList, nil
}
func (ur userRepository) GetUserByEmail(ctx context.Context, email string) (model.User, error) {
	data, err := ur.db.GetUserByEmail(ctx, email)
	if err != nil {
		return model.User{}, err
	}

	return toUser(data), nil
}
func (ur userRepository) GetUserByID(ctx context.Context, userID any) (model.User, error) {

	data, err := ur.db.GetUserByID(ctx, userID)
	if err != nil {
		return model.User{}, err
	}

	return toUser(data), nil
}

func toUser(data database.User) model.User {
	var user model.User
	user.UserID = uuid.MustParse(data.UserID.(string))
	user.Email = data.Email
	user.Fname = data.Fname.String
	user.Lname = data.Lname.String
	user.Password = data.Password
	user.Role = data.Role.String
	return user
}
