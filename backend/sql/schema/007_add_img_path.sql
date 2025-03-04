-- +goose Up
ALTER TABLE giveAway
ADD COLUMN img_url TEXT;

-- +goose Down
ALTER TABLE giveAway
DROP COLUMN img_url;
