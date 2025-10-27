package dto

import "time"

type BillResponse struct {
	CreatedAt     time.Time `json:"created_at"`
	Id            string    `json:"bill_id"`
	PaymentMethod string    `json:"payment_method"`
	Total         float64   `json:"total"`
}
