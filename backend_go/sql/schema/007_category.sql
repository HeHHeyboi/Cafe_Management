-- +goose Up
CREATE TABLE IF NOT EXISTS "category"(
	menu_id INTEGER,
	size TEXT,
	price REAL DEFAULT 0 NOT NULL,
	PRIMARY KEY(menu_id, size),
	FOREIGN KEY (menu_id) REFERENCES menu(menu_id) ON DELETE CASCADE
);

-- +goose Down
drop table "category";
