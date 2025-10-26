package model

import "github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"

type Menu struct {
	Categories []dto.Category
	Types      []dto.Type
	Name       string
	MenuType   string
	ImgUrl     string
	MenuID     int64
}
