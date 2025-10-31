-- +goose Up
ALTER Table bill
rename pay_date to created_at;

-- +goose Down
ALTER Table bill
rename created_at to pay_date;
