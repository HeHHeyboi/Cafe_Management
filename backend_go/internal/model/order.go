package model

type Order struct {
	MenuName string
	Size     string
	Type     string
	Id       int64
	MenuId   int64
	Amount   int64
	Total    float64
}
