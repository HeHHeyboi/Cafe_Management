package main

const (
	createUserTable = `CREATE TABLE IF NOT EXISTS users(
	user_id UUID PRIMARY KEY NOT NULL, 
	FName TEXT,
	LName TEXT,
	email TEXT NOT NULL,
	password TEXT NOT NULL
);`
	createGalleryTable = `CREATE TABLE IF NOT EXISTS gallery(
	Gname TEXT PRIMARY KEY NOT NULL,
	StartDate TEXT NOT NULL,
	EndDate TEXT NOT NULL,
	DESC TEXT,
	user_id UUID
);`
	enableForeignKey = `pragma foreign_keys=ON;`
)
