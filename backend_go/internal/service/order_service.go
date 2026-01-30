package service

import (
	"context"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/model"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/repository"
)

type OrderService struct {
	repo repository.OrderRepo
}

func NewOrderService(repo repository.OrderRepo) OrderService {
	return OrderService{repo}
}

func (o OrderService) CreateOrder(ctx context.Context, billId string, req dto.OrderRequest) error {
	order := model.Order{
		Size:   req.Size,
		Type:   req.Type,
		MenuId: req.MenuID,
		Amount: req.Amount,
	}
	err := o.repo.CreateNewOrder(ctx, billId, order)
	if err != nil {
		return err
	}

	return nil
}

func (o OrderService) GetAllOrder(ctx context.Context) ([]dto.OrderResponse, error) {
	orders, err := o.repo.GetAllOrder(ctx)
	if err != nil {
		return nil, err
	}

	var response []dto.OrderResponse
	for _, order := range orders {
		res := dto.OrderResponse{
			Size:   order.Size,
			Type:   order.Type,
			Id:     order.Id,
			MenuId: order.MenuId,
			Amount: order.Amount,
			Total:  order.Total,
		}
		response = append(response, res)
	}

	return response, nil
}

func (o OrderService) GetOrdersByBillID(ctx context.Context, billID string) ([]dto.OrderResponse, error) {
	orders, err := o.repo.GetOrderFromBill(ctx, billID)
	if err != nil {
		return nil, err
	}

	var response []dto.OrderResponse
	for _, order := range orders {
		res := dto.OrderResponse{
			Size:   order.Size,
			Type:   order.Type,
			Id:     order.Id,
			MenuId: order.MenuId,
			Amount: order.Amount,
			Total:  order.Total,
		}
		response = append(response, res)
	}

	return response, nil
}

func (o OrderService) DeleteAllOrder(ctx context.Context) error {
	err := o.repo.DeleteAllOrder(ctx)
	if err != nil {
		return err
	}
	return nil
}
