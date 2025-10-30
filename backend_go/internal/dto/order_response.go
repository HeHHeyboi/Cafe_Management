package dto

type OrderResponse struct {
	Id     int64   `json:"order_id"`
	BillId int64   `json:"bill_id"`
	MenuId int64   `json:"menu_id"`
	Amount int64   `json:"amount"`
	Total  float64 `json:"total"`
	Size   string  `json:"size"`
	Type   string  `json:"type"`
}
