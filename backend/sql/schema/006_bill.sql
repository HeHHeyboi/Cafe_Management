-- +goose Up
CREATE TABLE IF NOT EXISTS bill(
	bill_id TEXT PRIMARY KEY NOT NULL,
	total INTEGER NOT NULL,
	status BOOLEAN NOT NULL,
	pay_date TEXT NOT NULL,
	user_id UUID,
	giveAway_id INTEGER,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (giveAway_id) REFERENCES giveAway(id)
);
-- +goose Down
DROP TABLE bill;
