-- name: CreateBill :one
INSERT INTO bill(bill_id, total, status, pay_date)
VALUES (?, ?, ?, ?)
RETURNING *;

-- name: ListBill :many
SELECT * FROM bill;

-- name: DeleteBill :exec
DELETE FROM bill;
