package main

import (
	"fmt"
	"os"
)

const FILE = "cache.txt"

func WriteCached(cfg *Config) {
	data := fmt.Sprintf("%v", cfg.counter)
	err := os.WriteFile(FILE, []byte(data), 0777)
	if err != nil {
		panic(err)
	}
}

func ReadCached(cfg *Config) {
	data, err := os.ReadFile(FILE)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(data))
}
