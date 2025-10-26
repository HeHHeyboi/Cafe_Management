package service

import (
	"context"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"
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
			MenuID:   menu.MenuID,
			Name:     menu.Name,
			MenuType: menu.MenuType,
			ImgUrl:   menu.ImgUrl,
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
		MenuID:   menu.MenuID,
		Name:     menu.Name,
		MenuType: menu.MenuType,
		ImgUrl:   menu.ImgUrl,
	}
	return res, nil
}

func (ms MenuService) AddMenu(ctx context.Context, req dto.MenuRequest) {
}
