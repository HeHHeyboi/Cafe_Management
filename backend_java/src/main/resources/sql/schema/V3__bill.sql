-- +goose Up
CREATE TABLE IF NOT EXISTS bill(
	bill_id TEXT NOT NULL PRIMARY KEY,
	total FLOAT NOT NULL,
	created_at TEXT NOT NULL
	-- user_id UUID,
	-- giveAway_id INTEGER,
	-- paid_status BOOLEAN NOT NULL DEFAULT FALSE,
	-- FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- ALTER TABLE bill
-- ADD COLUMN paid_status BOOLEAN NOT NULL DEFAULT FALSE; 
