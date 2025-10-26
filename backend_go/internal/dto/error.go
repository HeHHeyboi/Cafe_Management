package dto

import (
	"fmt"
	"strings"

	"github.com/HeHHeyboi/Cafe_Management/backend/internal/auth"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

const (
	foreignKeyMissing = "constraint failed: FOREIGN KEY constraint failed (787)"
	usedEmail         = "constraint failed: UNIQUE constraint failed: users.email (2067)"
	noResult          = "sql: no rows in result set"
	requireTag        = "required"
)

func checkDataBaseError(err error) string {
	switch err.Error() {
	case foreignKeyMissing:
		return "Please Created User first with Email"
	case usedEmail:
		return "This email Already Used, Please login or Used other email"
	case noResult:
		return "ไม่มีข้อมูลของ"
	default:
		return err.Error()
	}
}

func BindingErrorMsg(err error, ctx *gin.Context) {
	var msg string
	switch err := err.(type) {
	case validator.ValidationErrors:
		var res []string
		for _, e := range err {
			switch e.Tag() {
			case requireTag:
				msg = fmt.Sprintf("ไม่มีข้อมูลหรือชื่อผิดที่ %s\n", strings.ToLower(e.Field()))
				res = append(res, msg)
			default:
				msg = e.Error() + "\n"
				res = append(res, msg)
			}
		}
		ctx.Error(fmt.Errorf("%v", res))
		ctx.JSON(400, gin.H{"error": res})
	case LoginError:
		msg = err.Error()
		ctx.Error(fmt.Errorf("%v", msg))
		ctx.JSON(400, gin.H{"error": msg})
	case auth.HashError:
		msg = err.Error()
		ctx.Error(fmt.Errorf("%v", msg))
		ctx.JSON(401, gin.H{"error": msg})
	default:
		msg = checkDataBaseError(err)
		ctx.Error(fmt.Errorf("%v", msg))
		ctx.JSON(500, gin.H{"error": msg})
	}
}
