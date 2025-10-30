package repository

import (
	"context"
	"database/sql"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/model"
)

type OrderRepo interface {
	CreateNewOrder(ctx context.Context, billID string, arg model.Order) error
	GetOrderFromBill(ctx context.Context, bill_id string) ([]model.Order, error)
	DeleteAllOrder(ctx context.Context) error
}

type orderRepo struct {
	db *database.Queries
}

func NewOrderRepo(db *database.Queries) OrderRepo {
	return orderRepo{db: db}
}

func (or orderRepo) CreateNewOrder(ctx context.Context, billID string, arg model.Order) error {
	err := or.db.CreateNewOrder(ctx, database.CreateNewOrderParams{
		BillID: billID,
		MenuID: arg.MenuId,
		Amount: arg.Amount,
		Type: sql.NullString{
			String: arg.Type,
			Valid:  arg.Type != "",
		},
		Size: sql.NullString{
			String: arg.Size,
			Valid:  arg.Size != "",
		},
	})
	if err != nil {
		return err
	}
	return nil
}

func (or orderRepo) GetOrderFromBill(ctx context.Context, bill_id string) ([]model.Order, error) {
	datas, err := or.db.GetOrderFromBill(ctx, bill_id)
	if err != nil {
		return nil, err
	}

	var orders []model.Order
	for _, data := range datas {
		order := model.Order{
			MenuName: data.MenuName,
			Size:     data.Size.String,
			Type:     data.Type.String,
			Id:       data.OrderID,
			MenuId:   data.MenuID,
			Amount:   data.Amount,
			Total:    float64(data.Total),
		}

		orders = append(orders, order)
	}

	return orders, nil
}

func (or orderRepo) DeleteAllOrder(ctx context.Context) error {
	return nil
}
