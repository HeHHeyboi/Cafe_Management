package interval

import (
	"time"
)

func InitTimeTick(duration time.Duration) *time.Timer {
	now := time.Now().Local()
	y, m, d := now.Date()
	start_day := time.Date(y, m, d, 0, 0, 0, 0, time.Local)
	sub := now.Sub(start_day)
	var timer *time.Timer
	if sub < duration {
		timer = time.NewTimer(sub)
	}
	timer = time.NewTimer(duration)
	return timer
}
