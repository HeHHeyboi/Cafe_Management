-- +goose Up
CREATE TABLE IF NOT EXISTS menu(
	menu_id INTEGER PRIMARY KEY,
	name TEXT NOT NULL UNIQUE,
	price REAL NOT NULL,
	type TEXT NOT NULL
);

-- +goose Down
drop table menu;
