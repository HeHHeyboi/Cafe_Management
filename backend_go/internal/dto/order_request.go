package dto

type OrderRequest struct {
	Type   string `json:"type"`
	Size   string `json:"size"`
	MenuID int64  `json:"menu_id"`
	Amount int64  `json:"amount"`
}
