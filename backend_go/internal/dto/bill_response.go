package dto

type BillResponse struct {
	CreatedAt     string  `json:"created_at"`
	Id            string  `json:"bill_id"`
	PaymentMethod string  `json:"payment_method"`
	Total         float64 `json:"total"`
}
