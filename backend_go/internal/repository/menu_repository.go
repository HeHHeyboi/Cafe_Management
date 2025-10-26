package repository

import (
	"context"
	"database/sql"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/model"
)

type MenuRepo interface {
	AddMenu(ctx context.Context, arg model.Menu) error
	GetAllMenus(ctx context.Context) ([]model.Menu, error)
	GetMenuByID(ctx context.Context, id int64) (model.Menu, error)
	DeleteAllMenu(ctx context.Context) error
	DeleteMenuByID(ctx context.Context, id int64) error
	UpdateMenuByID(ctx context.Context, id int64, arg model.Menu) error
}

type menuRepo struct {
	db *database.Queries
}

func NewMenuRepo(db *database.Queries) MenuRepo {
	return &menuRepo{db: db}
}

// TODO: AddMenu needed to add 'category' & 'type' to db
func (m menuRepo) AddMenu(ctx context.Context, arg model.Menu) error {
	param := database.AddMenuParams{
		Name:     arg.Name,
		MenuType: arg.MenuType,
		ImgUrl: sql.NullString{
			String: arg.ImgUrl,
			Valid:  arg.ImgUrl != "",
		},
	}

	_, err := m.db.AddMenu(ctx, param)
	if err != nil {
		return err
	}

	return nil
}

// TODO: GetAllMenus & GetMenuByID needed to add 'category' & 'types' to model.Menu
func (m menuRepo) GetAllMenus(ctx context.Context) ([]model.Menu, error) {
	datas, err := m.db.GetAllMenus(ctx)
	if err != nil {
		return nil, err
	}

	menus := []model.Menu{}
	for _, data := range datas {
		menu := model.Menu{
			MenuID:   data.MenuID,
			Name:     data.Name,
			MenuType: data.MenuType,
			ImgUrl:   data.ImgUrl.String,
		}

		menus = append(menus, menu)
	}

	return menus, nil
}

func (m menuRepo) GetMenuByID(ctx context.Context, id int64) (model.Menu, error) {
	data, err := m.db.GetMenuByID(ctx, id)
	if err != nil {
		return model.Menu{}, err
	}
	menu := model.Menu{
		MenuID:   data.MenuID,
		Name:     data.Name,
		MenuType: data.MenuType,
		ImgUrl:   data.ImgUrl.String,
	}

	return menu, nil
}

// TODO: UpdateMenuByID needed to update 'category' & 'type' table
func (m menuRepo) UpdateMenuByID(ctx context.Context, id int64, arg model.Menu) error {
	param := database.UpdateMenuByIDParams{
		Name:     "",
		MenuType: "",
		MenuID:   int64(id),
		ImgUrl: sql.NullString{
			String: arg.ImgUrl,
			Valid:  arg.ImgUrl != "",
		},
	}

	_, err := m.db.UpdateMenuByID(ctx, param)
	if err != nil {
		return err
	}

	return nil
}
func (m menuRepo) DeleteAllMenu(ctx context.Context) error {
	err := m.db.DeleteAllMenu(ctx)
	if err != nil {
		return err
	}

	return nil
}

func (m menuRepo) DeleteMenuByID(ctx context.Context, id int64) error {
	err := m.db.DeleteMenuByID(ctx, id)
	if err != nil {
		return err
	}

	return nil
}
