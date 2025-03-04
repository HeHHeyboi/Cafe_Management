-- +goose Up
CREATE TABLE IF NOT EXISTS image(
	menu_id INTEGER,
	giveAway_id INTEGER,
	gallery_name TEXT,
	img_url TEXT NOT NULL,
	FOREIGN KEY (menu_id) REFERENCES menu_id(menu_id),
	FOREIGN KEY (giveAway_id) REFERENCES giveAway(id),
	FOREIGN KEY (gallery_name) REFERENCES gallery(Gname)
);
-- +goose Down
DROP TABLE image;

