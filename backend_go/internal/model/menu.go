package model

type Menu struct {
	MenuID   int64
	Name     string
	MenuType string
	Price    float64
	ImgUrl   string
}

func (m Menu) ToMenuResponse() {

}
