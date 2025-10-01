-- +goose Up
CREATE TABLE IF NOT EXISTS menu(
	menu_id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	menu_type TEXT NOT NULL,
	img_url TEXT
);

CREATE TABLE IF NOT EXISTS type_table(
	menu_id INTEGER,
	type TEXT,
	addition_price REAL DEFAULT 0,
	FOREIGN KEY (menu_id) REFERENCES menu(menu_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "category"(
	menu_id INTEGER,
	size TEXT,
	price REAL DEFAULT 0 NOT NULL,
	PRIMARY KEY(menu_id, size),
	FOREIGN KEY (menu_id) REFERENCES menu(menu_id) ON DELETE CASCADE
);
