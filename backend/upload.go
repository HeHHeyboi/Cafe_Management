package main

import "github.com/gin-gonic/gin"

func uploadIMG(cfg *Config, ctx *gin.Context) (string, error) {
	file, err := ctx.FormFile("image")
	if err != nil {
		return "", err
	}
	ctx.SaveUploadedFile(file, uploadDir+file.Filename)

	url := "/upload/" + file.Filename

	return url, nil
}
