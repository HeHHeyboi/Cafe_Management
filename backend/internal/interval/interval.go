package interval

import (
	"time"
)

func InitTimeTick(duration time.Duration) *time.Ticker {
	now := time.Now().Local()
	y, m, d := now.Date()
	start_day := time.Date(y, m, d, 0, 0, 0, 0, time.Local)
	sub := now.Sub(start_day)
	var ticker *time.Ticker
	if sub < duration {
		ticker = time.NewTicker(sub)
	}
	ticker = time.NewTicker(duration)
	return ticker
}
