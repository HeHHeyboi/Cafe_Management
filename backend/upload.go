package main

import (
	"database/sql"
	"fmt"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/database"
	"github.com/gin-gonic/gin"
)

type uploadIMGArg struct {
	menu_id      int64
	giveAway_id  int64
	gallery_name string
}

const image_value = "images"

func uploadIMG(cfg *Config, ctx *gin.Context, arg uploadIMGArg) ([]string, error) {
	form, err := ctx.MultipartForm()
	if err != nil {
		return nil, err
	}

	files := form.File["images"]

	var url []string
	var datas []database.Image
	for _, file := range files {
		ctx.SaveUploadedFile(file, uploadDir+file.Filename)
		url = append(url, uploadDir+file.Filename)
		data, err := cfg.db.AddNewIMG(ctx.Request.Context(), database.AddNewIMGParams{
			MenuID: sql.NullInt64{
				Int64: arg.menu_id,
				Valid: arg.menu_id != 0,
			},
			GiveawayID: sql.NullInt64{
				Int64: arg.giveAway_id,
				Valid: arg.giveAway_id != 0,
			},
			GalleryName: sql.NullString{
				String: arg.gallery_name,
				Valid:  arg.gallery_name != "",
			},
			ImgUrl: uploadDir + file.Filename,
		})

		if err != nil {
			return nil, err
		}
		datas = append(datas, data)
	}
	fmt.Println(datas)

	return url, nil
}

func getImage(cfg *Config, ctx *gin.Context, arg uploadIMGArg) ([]string, error) {
	var url []string
	var err error
	menu_id := sql.NullInt64{
		Int64: arg.menu_id,
		Valid: (arg.menu_id != 0),
	}

	giveAway_id := sql.NullInt64{
		Int64: arg.giveAway_id,
		Valid: arg.giveAway_id != 0,
	}

	gallery_name := sql.NullString{
		String: arg.gallery_name,
		Valid:  arg.gallery_name != "",
	}

	if menu_id.Valid {
		url, err = cfg.db.GetMenuIMG(ctx.Request.Context(), menu_id)
	} else if giveAway_id.Valid {
		url, err = cfg.db.GetGiveAwayIMG(ctx.Request.Context(), giveAway_id)
	} else if gallery_name.Valid {
		url, err = cfg.db.GetGalleryNameIMG(ctx.Request.Context(), gallery_name)
	}

	if err != nil {
		return nil, err
	}

	return url, nil
}
