-- +goose Up
CREATE TABLE IF NOT EXISTS giveAway(
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	amount INTEGER NOT NULL,
	remain INTEGER NOT NULL,
	desc TEXT,
	date DATE NOT NULL
);

-- +goose Down
drop table giveAway;
