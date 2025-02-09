package main

import (
	"fmt"
	"strconv"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type Menu struct {
	MenuID int64   `json:"menu_id"`
	Name   string  `json:"name" form:"name" binding:"required"`
	Type   string  `json:"type" form:"type" binding:"required"`
	Price  float64 `json:"price" form:"price" binding:"required"`
}

func AddNewMenu(cfg *Config, ctx *gin.Context) {
	var newMenu Menu
	var err error

	if err = ctx.ShouldBind(&newMenu); err != nil {
		bindingErrorMsg(err.(validator.ValidationErrors), ctx)
		return
	}

	err = cfg.db.AddMenu(ctx.Request.Context(), database.AddMenuParams{
		Name:  newMenu.Name,
		Type:  newMenu.Type,
		Price: newMenu.Price,
	})
	if err != nil {
		ctx.JSON(401, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"msg": "Add menu Success"})
}

func GetAllMenu(cfg *Config, ctx *gin.Context) {
	data, err := cfg.db.GetAllMenus(ctx.Request.Context())
	if err != nil {
		ctx.JSON(401, gin.H{"error": err.Error()})
		return
	}
	menus := []Menu{}
	for _, m := range data {
		menu := Menu{
			m.MenuID,
			m.Name,
			m.Type,
			m.Price,
		}
		menus = append(menus, menu)
	}

	ctx.JSON(200, menus)
}

func GetMenu(c *Config) func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		_, id_exist := ctx.Params.Get("id")
		if id_exist {
			getMenuByID(c, ctx)
		} else {
			getMenuByName(c, ctx)
		}
	}
}

func getMenuByName(cfg *Config, ctx *gin.Context) {
	name := ctx.Param("name")

	data, err := cfg.db.GetMenuByName(ctx.Request.Context(), name)
	if err != nil {
		msg := checkDataBaseError(err)
		if err.Error() == noResult {
			msg += fmt.Sprintf("menu ที่มีชื่อ %s", name)
		}

		ctx.JSON(404, gin.H{"err": msg})
		return
	}

	ctx.JSON(200, gin.H{
		"menu_id": data.MenuID,
		"name":    data.Name,
		"type":    data.Type,
		"price":   data.Price,
	})

}
func getMenuByID(cfg *Config, ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(500, "Invalid id")
		return
	}

	data, err := cfg.db.GetMenuByID(ctx.Request.Context(), int64(id))
	if err != nil {
		msg := checkDataBaseError(err)
		if err.Error() == noResult {
			msg += fmt.Sprintf("menu ที่มี id %d", id)
		}

		ctx.JSON(404, gin.H{"err": msg})
		return
	}

	ctx.JSON(200, gin.H{
		"menu_id": data.MenuID,
		"name":    data.Name,
		"type":    data.Type,
		"price":   data.Price,
	})
}

func DeleteMenuByName(cfg *Config, ctx *gin.Context) {
	name := ctx.Param("name")

	err := cfg.db.DeleteMenuByName(ctx.Request.Context(), name)
	if err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
		ctx.Error(err)
		return
	}

	ctx.JSON(204, gin.H{"msg": "Delete Success"})
}

func DeleteMenuByID(cfg *Config, ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(400, "Invalid id")
		return
	}

	err = cfg.db.DeleteMenuByID(ctx.Request.Context(), int64(id))
	if err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
		ctx.Error(err)
		return
	}

	ctx.JSON(204, "Delete Success")
}

func UpdateMenu(c *Config) func(*gin.Context) {
	return func(ctx *gin.Context) {
		_, id_exist := ctx.Params.Get("id")
		if id_exist {
			updateMenuByID(c, ctx)
		} else {
			updateMenuByName(c, ctx)
		}
	}
}

func updateMenuByID(cfg *Config, ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(400, "Invalid id")
		return
	}

	var param Menu
	if err = ctx.ShouldBind(&param); err != nil {
		bindingErrorMsg(err.(validator.ValidationErrors), ctx)
		return
	}

	data, err := cfg.db.UpdateMenuByID(ctx.Request.Context(), database.UpdateMenuByIDParams{
		Name:   param.Name,
		Type:   param.Type,
		Price:  param.Price,
		MenuID: int64(id),
	})

	if err != nil {
		msg := checkDataBaseError(err)
		if err.Error() == noResult {
			msg += fmt.Sprintf("menu ที่มี id %d", id)
		}

		ctx.JSON(404, gin.H{"err": msg})
		return
	}

	ctx.JSON(200, gin.H{
		"menu_id": data.MenuID,
		"name":    data.Name,
		"type":    data.Type,
		"price":   data.Price,
	})
}

func updateMenuByName(cfg *Config, ctx *gin.Context) {
	name := ctx.Param("name")

	var param Menu
	if err := ctx.ShouldBind(&param); err != nil {
		bindingErrorMsg(err.(validator.ValidationErrors), ctx)
		return
	}

	data, err := cfg.db.UpdateMenuByName(ctx.Request.Context(), database.UpdateMenuByNameParams{
		SetName: param.Name,
		Type:    param.Type,
		Price:   param.Price,
		Name:    name,
	})

	if err != nil {
		msg := checkDataBaseError(err)
		if err.Error() == noResult {
			msg += fmt.Sprintf("menu ที่มีชื่อ %s", name)
		}

		ctx.JSON(404, gin.H{"err": msg})
		return
	}

	ctx.JSON(200, gin.H{
		"menu_id": data.MenuID,
		"name":    data.Name,
		"type":    data.Type,
		"price":   data.Price,
	})
}
