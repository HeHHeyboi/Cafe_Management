package main

const (
	createUserTable = `CREATE TABLE IF NOT EXISTS users(
	user_id UUID PRIMARY KEY NOT NULL, 
	FName TEXT,
	LName TEXT,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL
);`
	createGalleryTable = `CREATE TABLE IF NOT EXISTS gallery(
	Gname TEXT PRIMARY KEY NOT NULL,
	StartDate TEXT NOT NULL,
	EndDate TEXT NOT NULL,
	DESC TEXT,
	user_id UUID,
	FOREIGN KEY(user_id) REFERENCES users(user_id)
);`
	enableForeignKey = `pragma foreign_keys=ON;`
)
