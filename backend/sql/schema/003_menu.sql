-- +goose up
CREATE TABLE IF NOT EXISTS menu(
	menu_id TEXT PRIMARY KEY NOT NULL,
	name TEXT NOT NULL,
	price REAL NOT NULL,
	type TEXT NOT NULL
);

-- +goose down
drop table menu;
