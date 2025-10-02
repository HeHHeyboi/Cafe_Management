-- +goose Up
CREATE TABLE IF NOT EXISTS menu(
	menu_id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	menu_type TEXT NOT NULL,
	img_url TEXT
);


