CREATE TABLE IF NOT EXISTS type_table(
	menu_id INTEGER,
	type TEXT,
	addition_price REAL DEFAULT 0,
	PRIMARY KEY (menu_id,type),
	FOREIGN KEY (menu_id) REFERENCES menu(menu_id) ON DELETE CASCADE
);
