package model

import (
	"time"
)

type Bill struct {
	CreatedAt     time.Time
	Id            string
	PaymentMethod string
	Total         float64
}
