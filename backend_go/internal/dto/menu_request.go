package dto

type MenuRequest struct {
	Name     string  `json:"name" form:"name" binding:"required"`
	MenuType string  `json:"menu_type" form:"menu_type" binding:"required"`
	Price    float64 `json:"price" form:"price" binding:"required"`
}
