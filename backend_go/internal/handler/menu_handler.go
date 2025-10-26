package handler

import (
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/service"
	"github.com/gin-gonic/gin"
)

const uploadDir = "./upload/"
const url = "upload/"

type MenuHandler struct {
	service service.MenuService
}

func uploadFile(ctx *gin.Context) string {
	form, err := ctx.MultipartForm()
	if err != nil {
		panic(err.Error())
	}
	files := form.File["img"]
	filename := ""

	for _, file := range files {
		filename = file.Filename
		path := uploadDir + filename

		err = ctx.SaveUploadedFile(file, path)
		if err != nil {
			panic(err.Error())
		}
	}

	return url + filename
}
