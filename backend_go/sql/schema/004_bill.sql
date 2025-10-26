-- +goose Up
CREATE TABLE IF NOT EXISTS bill(
	bill_id TEXT NOT NULL PRIMARY KEY,
	total FLOAT NOT NULL,
	pay_date TEXT NOT NULL
);
-- +goose Down
DROP TABLE bill;
