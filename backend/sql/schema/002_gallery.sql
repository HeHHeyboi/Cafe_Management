
-- +goose Up
CREATE TABLE gallery(
	Gname TEXT PRIMARY KEY NOT NULL,
	StartDate TEXT NOT NULL,
	EndDate TEXT NOT NULL,
	DESC TEXT,
	user_id UUID
);

-- +goose Down
DROP TABLE gallery;
