-- +goose Up
CREATE TABLE IF NOT EXISTS "type"(
	menu_id INTEGER NOT NULL,
	type TEXT,
	addition_price REAL DEFAULT 0 NOT NULL,
	PRIMARY KEY (menu_id,type),
	FOREIGN KEY (menu_id) REFERENCES menu(menu_id) ON DELETE CASCADE
);

-- +goose Down
drop TABLE "type";
