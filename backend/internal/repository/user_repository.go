package repository

import (
	"context"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/model"
	"github.com/google/uuid"
)

type UserRepository interface {
	CreateAdmin(ctx context.Context, arg database.CreateAdminParams) error
	CreateUser(ctx context.Context, arg database.CreateUserParams) error
	DeleteAllUser(ctx context.Context) error
	GetAllUser(ctx context.Context) ([]model.User, error)
	GetUserByEmail(ctx context.Context, email string) (model.User, error)
	GetUserByID(ctx context.Context, userID any) (model.User, error)
}

type userRepository struct {
	db *database.Queries
}

func NewUserRepository(q *database.Queries) UserRepository {
	return &userRepository{db: q}
}

func (ur userRepository) CreateAdmin(ctx context.Context, arg database.CreateAdminParams) error {
	err := ur.db.CreateAdmin(ctx, arg)
	if err != nil {
		return err
	}
	return nil
}

func (ur userRepository) CreateUser(ctx context.Context, arg database.CreateUserParams) error {
	err := ur.db.CreateUser(ctx, arg)
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
		var user model.User
		user.UserID = data.UserID.(uuid.UUID)
		user.Email = data.Email
		user.Fname = data.Fname.String
		user.Lname = data.Lname.String
		user.Password = data.Password
		user.Role = data.Role.String
		userList = append(userList, user)
	}

	return userList, nil
}
func (ur userRepository) GetUserByEmail(ctx context.Context, email string) (model.User, error) {
	data, err := ur.db.GetUserByEmail(ctx, email)
	if err != nil {
		return model.User{}, nil
	}
	var user model.User
	user.UserID = data.UserID.(uuid.UUID)
	user.Email = data.Email
	user.Fname = data.Fname.String
	user.Lname = data.Lname.String
	user.Password = data.Password
	user.Role = data.Role.String

	return user, nil
}
func (ur userRepository) GetUserByID(ctx context.Context, userID any) (model.User, error) {

	data, err := ur.db.GetUserByID(ctx, userID)
	if err != nil {
		return model.User{}, nil
	}
	var user model.User
	user.UserID = data.UserID.(uuid.UUID)
	user.Email = data.Email
	user.Fname = data.Fname.String
	user.Lname = data.Lname.String
	user.Password = data.Password
	user.Role = data.Role.String

	return user, nil
}
