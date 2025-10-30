-- +goose Up
ALTER TABLE "bill"
DROP COLUMN total;

-- +goose Down
ALTER TABLE "orders"
ADD COLUMN total REAL;
