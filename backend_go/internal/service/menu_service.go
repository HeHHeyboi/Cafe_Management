package service

import (
	"context"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/model"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/repository"
)

type MenuService struct {
	repo repository.MenuRepo
}

func (ms MenuService) GetAllMenu(ctx context.Context) ([]dto.MenuResponse, error) {
	menus, err := ms.repo.GetAllMenus(ctx)
	if err != nil {
		return nil, err
	}

	responses := []dto.MenuResponse{}
	for _, menu := range menus {
		res := dto.MenuResponse{
			MenuID:     menu.MenuID,
			Name:       menu.Name,
			MenuType:   menu.MenuType,
			ImgUrl:     menu.ImgUrl,
			Categories: menu.Categories,
			Types:      menu.Types,
		}
		responses = append(responses, res)
	}

	return responses, nil
}

func (ms MenuService) GetMenuByID(ctx context.Context, id int64) (dto.MenuResponse, error) {
	menu, err := ms.repo.GetMenuByID(ctx, id)
	if err != nil {
		return dto.MenuResponse{}, err
	}

	res := dto.MenuResponse{
		MenuID:     menu.MenuID,
		Name:       menu.Name,
		MenuType:   menu.MenuType,
		ImgUrl:     menu.ImgUrl,
		Categories: menu.Categories,
		Types:      menu.Types,
	}
	return res, nil
}

func (ms MenuService) AddMenu(ctx context.Context, req dto.MenuRequest, img_url string) error {
	menu := model.Menu{
		Categories: req.Categories,
		Types:      req.Types,
		Name:       req.Name,
		MenuType:   req.MenuType,
		ImgUrl:     img_url,
	}

	err := ms.repo.AddMenu(ctx, menu)
	if err != nil {
		return err
	}

	return nil
}

func (ms MenuService) UpdateMenuByID(ctx context.Context, id int64, req dto.MenuRequest, img_url string) error {
	menu := model.Menu{
		Categories: req.Categories,
		Types:      req.Types,
		Name:       req.Name,
		MenuType:   req.MenuType,
		ImgUrl:     img_url,
		MenuID:     id,
	}
	err := ms.repo.UpdateMenuByID(ctx, id, menu)
	if err != nil {
		return err
	}
	return nil
}

func (ms MenuService) DeleteAllMenu(ctx context.Context) error {
	err := ms.repo.DeleteAllMenu(ctx)
	if err != nil {
		return err
	}

	return nil
}

func (ms MenuService) DeleteMenuByID(ctx context.Context, id int64) error {
	err := ms.repo.DeleteMenuByID(ctx, id)
	if err != nil {
		return err
	}
	return nil
}
