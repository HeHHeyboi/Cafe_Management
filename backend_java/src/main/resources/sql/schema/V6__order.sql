-- +goose Up
CREATE TABLE IF NOT EXISTS "order"(
	bill_id TEXT NOT NULL,
	menu_id INTEGER,
	amount INTEGER NOT NULL,
	total_price FLOAT NOT NULL,
	size TEXT,
	type TEXT,
	PRIMARY KEY (bill_id,menu_id),
	FOREIGN KEY (bill_id) REFERENCES bill(bill_id) ON DELETE CASCADE,
	FOREIGN KEY (menu_id) REFERENCES menu(menu_id) ON DELETE SET NULL,
	FOREIGN KEY (menu_id,size) REFERENCES category(menu_id,size) ON DELETE SET NULL,
	FOREIGN KEY (menu_id,type) REFERENCES type_table(menu_id,type) ON DELETE SET NULL
);
