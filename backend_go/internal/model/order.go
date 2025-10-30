package model

type Order struct {
	Id     int64
	BillId int64
	MenuId int64
	Amount int64
	Total  float64
	Size   string
	Type   string
}
