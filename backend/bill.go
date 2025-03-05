package main

import "github.com/gin-gonic/gin"

func CreateNewBill(cfg *Config, ctx *gin.Context) {
	cfg.counter += 1
	WriteCached(cfg)
	ReadCached(cfg)
}
