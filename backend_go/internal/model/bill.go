package model

import (
	"time"
)

type Bill struct {
	Id            string
	CreatedAt     time.Time
	PaymentMethod string
}
