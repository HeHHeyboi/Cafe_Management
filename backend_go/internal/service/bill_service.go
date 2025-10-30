package service

import (
	"context"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/model"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/repository"
)

type BillService struct {
	repo repository.BillRepo
}

func NewBillService(repo repository.BillRepo) BillService {
	return BillService{repo: repo}
}

func (bs BillService) CreateBill(ctx context.Context, req dto.BillRequest) (string, error) {
	bill := model.Bill{
		PaymentMethod: req.PaymentMethod,
	}
	id, err := bs.repo.CreateBill(ctx, bill)
	if err != nil {
		return "", nil
	}
	return id, err
}

func (bs BillService) GetAllBill(ctx context.Context) ([]dto.BillResponse, error) {
	bills, err := bs.repo.ListBill(ctx)
	if err != nil {
		return nil, err
	}

	var response []dto.BillResponse
	for _, bill := range bills {
		res := dto.BillResponse{
			CreatedAt:     bill.CreatedAt,
			Id:            bill.Id,
			PaymentMethod: bill.PaymentMethod,
			Total:         bill.Total,
		}

		response = append(response, res)
	}

	return response, nil
}

func (bs BillService) GetBillID(ctx context.Context, id string) (dto.BillResponse, error) {
	bill, err := bs.repo.GetBillByID(ctx, id)
	if err != nil {
		return dto.BillResponse{}, err
	}

	res := dto.BillResponse{
		CreatedAt:     bill.CreatedAt,
		Id:            bill.Id,
		PaymentMethod: bill.PaymentMethod,
		Total:         bill.Total,
	}
	return res, nil
}

func (bs BillService) UpdateBillByID(ctx context.Context, bill_id string, req dto.BillRequest) error {
	err := bs.repo.UpdateBillByID(ctx, bill_id, req.PaymentMethod)
	if err != nil {
		return err
	}
	return nil
}

func (bs BillService) DeleteAllBill(ctx context.Context) error {
	err := bs.repo.DeleteAllBill(ctx)
	if err != nil {
		return err
	}
	return nil
}

func (bs BillService) DeleteBillByID(ctx context.Context, bill_id string) error {
	err := bs.repo.DeleteBillByID(ctx, bill_id)
	if err != nil {
		return err
	}
	return nil
}
