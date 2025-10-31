-- +goose Up
ALTER TABLE bill
ADD COLUMN payment_method TEXT;

-- +goose Down
ALTER TABLE bill
DROP COLUMN payment_method;

