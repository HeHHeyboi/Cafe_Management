-- +goose Up
CREATE TABLE IF NOT EXISTS bill(
	bill_id TEXT NOT NULL PRIMARY KEY,
	total FLOAT NOT NULL,
	pay_date TEXT NOT NULL,
	user_id UUID,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);
-- +goose Down
DROP TABLE bill;
