package dto

type BillRequest struct {
	Total         float64 `json:"total"`
	PaymentMethod string  `json:"payment_method"`
}
