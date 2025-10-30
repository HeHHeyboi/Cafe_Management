package dto

type OrderResponse struct {
	Size   string  `json:"size"`
	Type   string  `json:"type"`
	Id     int64   `json:"order_id"`
	MenuId int64   `json:"menu_id"`
	Amount int64   `json:"amount"`
	Total  float64 `json:"total"`
}
