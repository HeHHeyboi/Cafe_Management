package repository

import (
	"context"
	"database/sql"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/model"
)

type BillRepo interface {
	CreateBill(ctx context.Context, payment_method string) (string, error)
	UpdateBillByID(ctx context.Context, bill_id string, payment_method string) error
	GetBillByID(ctx context.Context, bill_id string) (model.Bill, error)
	ListBill(ctx context.Context) ([]model.Bill, error)
	DeleteAllBill(ctx context.Context) error
	DeleteBillByID(ctx context.Context, bill_id string) error
}

type billRepo struct {
	db *database.Queries
}

func NewBillRepo(db *database.Queries) BillRepo {
	return &billRepo{db: db}
}

func (b *billRepo) CreateBill(ctx context.Context, payment_method string) (string, error) {
	id, err := b.db.CreateBill(ctx, sql.NullString{String: payment_method, Valid: payment_method != ""})
	if err != nil {
		return "", err
	}
	return id, nil
}

func (b *billRepo) GetBillByID(ctx context.Context, bill_id string) (model.Bill, error) {
	data, err := b.db.GetBillByID(ctx, bill_id)
	total, err := b.db.GetTotalByBillId(ctx, bill_id)
	if err != nil {
		return model.Bill{}, err
	}

	bill := model.Bill{
		CreatedAt:     data.CreatedAt,
		Id:            data.BillID,
		PaymentMethod: data.PaymentMethod.String,
		Total:         total.Float64,
	}

	return bill, nil
}

func (b *billRepo) ListBill(ctx context.Context) ([]model.Bill, error) {
	datas, err := b.db.ListBill(ctx)
	if err != nil {
		return nil, err
	}
	var total sql.NullFloat64

	var bills []model.Bill
	for _, data := range datas {
		bill := model.Bill{
			CreatedAt:     data.CreatedAt,
			Id:            data.BillID,
			PaymentMethod: data.PaymentMethod.String,
		}
		total, err = b.db.GetTotalByBillId(ctx, bill.Id)
		if err != nil {
			return nil, err
		}

		bill.Total = total.Float64
		bills = append(bills, bill)
	}

	return bills, nil
}

func (b *billRepo) UpdateBillByID(ctx context.Context, bill_id string, payment_method string) error {
	err := b.db.UpdateBill(ctx, database.UpdateBillParams{
		PaymentMethod: sql.NullString{
			String: payment_method,
			Valid:  payment_method != "",
		},
		BillID: bill_id,
	})
	if err != nil {
		return err
	}

	return nil
}

func (b *billRepo) DeleteAllBill(ctx context.Context) error {
	err := b.db.DeleteBill(ctx)
	if err != nil {
		return err
	}
	return nil
}

func (b *billRepo) DeleteBillByID(ctx context.Context, bill_id string) error {
	err := b.db.DeleteBillByID(ctx, bill_id)
	if err != nil {
		return err
	}
	return nil
}
