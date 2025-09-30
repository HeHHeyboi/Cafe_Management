-- +goose Up
CREATE TABLE IF NOT EXISTS menu(
	menu_id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	price REAL NOT NULL,
	menu_type TEXT NOT NULL,
	img_url TEXT,
	size TEXT
);

CREATE TABLE IF NOT EXISTS type_table(
	menu_id INTEGER,
	type TEXT,
	addition_price REAL,
	FOREIGN KEY (menu_id) REFERENCES menu(menu_id) ON DELETE CASCADE
);
