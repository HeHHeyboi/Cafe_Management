-- +goose Up
CREATE TABLE IF NOT EXISTS "order"(
	order_id INTEGER PRIMARY KEY,
	bill_id TEXT NOT NULL,
	menu_id INTEGER,
	amount INTEGER NOT NULL,
	total_price FLOAT NOT NULL,
	size TEXT,
	type TEXT,
	FOREIGN KEY (bill_id) REFERENCES bill(bill_id) ON DELETE CASCADE,
	FOREIGN KEY (menu_id) REFERENCES menu(menu_id) ON DELETE SET NULL,
);
