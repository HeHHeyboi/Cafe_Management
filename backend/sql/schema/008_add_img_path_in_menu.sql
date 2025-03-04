-- +goose Up
ALTER TABLE menu
ADD COLUMN img_url TEXT;

-- +goose Down
ALTER TABLE menu
DROP COLUMN img_url;
