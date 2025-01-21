-- +goose Up
CREATE TABLE users(
	user_id UUID PRIMARY KEY NOT NULL, 
	FName TEXT,
	LName TEXT,
	email TEXT NOT NULL,
	password TEXT NOT NULL
);

-- +goose Down
DROP TABLE users;
