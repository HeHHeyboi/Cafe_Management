package dto

type MenuResponse struct {
	Categories []Category `json:"category"`
	Types      []Type     `json:"types"`
	MenuID     int64      `json:"menu_id"`
	Name       string     `json:"name"`
	MenuType   string     `json:"menu_type"`
	ImgUrl     string     `json:"img_url"`
}
