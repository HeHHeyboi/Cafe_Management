package main

import (
	"database/sql"
	"fmt"
	_ "modernc.org/sqlite"
	"os"
)

func main() {
	dbName := "main.db"
	if len(os.Args) > 1 && os.Args[1] == "test" {
		dbName = "test.db"
	}

	db, err := sql.Open("sqlite", dbName)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	err = db.Ping()
	if err != nil {
		fmt.Print(err)
		os.Exit(1)
	}
	fmt.Println("success")
}
