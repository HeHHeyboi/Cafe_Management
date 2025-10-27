package dto

type MenuRequest struct {
	Categories []Category `json:"category"`
	Types      []Type     `json:"types"`
	Name       string     `json:"name" form:"name" binding:"required"`
	MenuType   string     `json:"menu_type" form:"menu_type" binding:"required"`
}

type Category struct {
	Size  string  `json:"size"`
	Price float64 `json:"price"`
}

type Type struct {
	Type          string  `json:"type"`
	AdditionPrice float64 `json:"addition_price"`
}
