package repository

import (
	"context"
	"database/sql"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"
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

func (m menuRepo) AddMenu(ctx context.Context, arg model.Menu) error {
	param := database.AddMenuParams{
		Name:     arg.Name,
		MenuType: arg.MenuType,
		ImgUrl: sql.NullString{
			String: arg.ImgUrl,
			Valid:  arg.ImgUrl != "",
		},
	}
	menu_id, err := m.db.AddMenu(ctx, param)
	if err != nil {
		return err
	}

	for _, c := range arg.Categories {
		param := database.CreateCategoryParams{
			MenuID: menu_id,
			Size: sql.NullString{
				String: c.Size,
				Valid:  c.Size != "",
			},
			Price: c.Price,
		}
		err = m.db.CreateCategory(ctx, param)
		if err != nil {
			return err
		}
	}

	for _, t := range arg.Types {
		param := database.CreateTypeParams{
			MenuID: menu_id,
			Type: sql.NullString{
				String: t.Type,
				Valid:  t.Type != "",
			},
			AdditionPrice: t.AdditionPrice,
		}

		err = m.db.CreateType(ctx, param)
		if err != nil {
			return err
		}
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

		category_data, err := m.db.GetCategoryByMenuID(ctx, menu.MenuID)
		if err != nil {
			return nil, err
		}
		for _, data := range category_data {
			c := dto.Category{
				Size:  data.Size.String,
				Price: data.Price,
			}
			menu.Categories = append(menu.Categories, c)
		}

		type_data, err := m.db.GetTypeByMenuID(ctx, menu.MenuID)
		if err != nil {
			return nil, err
		}
		for _, data := range type_data {
			t := dto.Type{
				Type:          data.Type.String,
				AdditionPrice: data.AdditionPrice,
			}
			menu.Types = append(menu.Types, t)
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
	category_data, err := m.db.GetCategoryByMenuID(ctx, menu.MenuID)
	if err != nil {
		return model.Menu{}, err
	}
	for _, data := range category_data {
		c := dto.Category{
			Size:  data.Size.String,
			Price: data.Price,
		}
		menu.Categories = append(menu.Categories, c)
	}

	type_data, err := m.db.GetTypeByMenuID(ctx, menu.MenuID)
	if err != nil {
		return model.Menu{}, err
	}
	for _, data := range type_data {
		t := dto.Type{
			Type:          data.Type.String,
			AdditionPrice: data.AdditionPrice,
		}
		menu.Types = append(menu.Types, t)
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

	menu_id, err := m.db.UpdateMenuByID(ctx, param)
	if err != nil {
		return err
	}

	err = m.db.DeleteCategoryByMenuID(ctx, menu_id)
	err = m.db.DeleteTypeByMenuID(ctx, menu_id)
	if err != nil {
		return err
	}

	for _, c := range arg.Categories {
		param := database.CreateCategoryParams{
			MenuID: menu_id,
			Size: sql.NullString{
				String: c.Size,
				Valid:  c.Size != "",
			},
			Price: c.Price,
		}
		err = m.db.CreateCategory(ctx, param)
		if err != nil {
			return err
		}
	}

	for _, t := range arg.Types {
		param := database.CreateTypeParams{
			MenuID: menu_id,
			Type: sql.NullString{
				String: t.Type,
				Valid:  t.Type != "",
			},
			AdditionPrice: t.AdditionPrice,
		}

		err = m.db.CreateType(ctx, param)
		if err != nil {
			return err
		}
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
