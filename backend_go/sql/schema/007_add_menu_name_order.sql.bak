-- +goose Up
ALTER TABLE "orders"
ADD COLUMN menu_name TEXT NOT NULL;

-- +goose Down
ALTER TABLE "orders"
DROP COLUMN menu_name;
