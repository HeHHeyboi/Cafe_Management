package handler

import (
	"encoding/json"
	"strconv"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/dto"
	"github.com/HeHHeyboi/Cafe_Management/backend/internal/service"
	"github.com/gin-gonic/gin"
)

const uploadDir = "./upload/"
const url = "upload/"

type MenuHandler struct {
	service service.MenuService
}

func NewMenuHandler(service service.MenuService) MenuHandler {
	return MenuHandler{service: service}
}

func (mh MenuHandler) AddMenu(ctx *gin.Context) {
	img_url := uploadFile(ctx)
	form, err := ctx.MultipartForm()
	if err != nil {
		panic(err.Error())
	}

	req_data := form.Value["data"]
	var req dto.MenuRequest
	for _, d := range req_data {
		err = json.Unmarshal([]byte(d), &req)
		if err != nil {
			dto.BindingErrorMsg(err, ctx)
			return
		}
	}

	err = mh.service.AddMenu(ctx.Request.Context(), req, img_url)
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	ctx.JSON(201, gin.H{"msg": "Create Menu success"})
}

func (mh MenuHandler) GetAllMenu(ctx *gin.Context) {
	response, err := mh.service.GetAllMenu(ctx.Request.Context())
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}
	ctx.JSON(200, response)
}

func (mh MenuHandler) GetMenuByID(ctx *gin.Context) {
	id, err := strconv.ParseInt(ctx.Param("id"), 0, strconv.IntSize)
	if err != nil {
		dto.BindingErrorMsg(dto.ParamError{
			Value:    "id",
			Location: "/menu/:id",
			Method:   "GET",
		}, ctx)
		return
	}
	response, err := mh.service.GetMenuByID(ctx.Request.Context(), id)
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}
	ctx.JSON(200, response)
}

func (mh MenuHandler) UpdateMenyByID(ctx *gin.Context) {
	id, err := strconv.ParseInt(ctx.Param("id"), 0, strconv.IntSize)
	img_url := uploadFile(ctx)
	if err != nil {
		dto.BindingErrorMsg(dto.ParamError{
			Value:    "id",
			Location: "/menu/:id",
			Method:   "PUT",
		}, ctx)
		return
	}
	form, err := ctx.MultipartForm()
	if err != nil {
		panic(err.Error())
	}

	req_data := form.Value["data"]
	var req dto.MenuRequest
	for _, d := range req_data {
		err = json.Unmarshal([]byte(d), &req)
		if err != nil {
			dto.BindingErrorMsg(err, ctx)
			return
		}
	}

	err = mh.service.UpdateMenuByID(ctx.Request.Context(), id, req, img_url)
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	ctx.JSON(200, gin.H{"msg": "update menu success"})
}

func (mh MenuHandler) DeleteMenuByID(ctx *gin.Context) {
	id, err := strconv.ParseInt(ctx.Param("id"), 0, 64)
	if err != nil {
		dto.BindingErrorMsg(dto.ParamError{
			Value:    "id",
			Location: "/menu/:id",
			Method:   "DELETE",
		}, ctx)
		return
	}
	err = mh.service.DeleteMenuByID(ctx.Request.Context(), id)
	if err != nil {
		dto.BindingErrorMsg(err, ctx)
		return
	}

	ctx.JSON(200, gin.H{"msg": "delete success"})
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
