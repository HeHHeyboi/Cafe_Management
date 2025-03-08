-- name: CreateBill :one
INSERT INTO bill(bill_id, pay_date)
VALUES (lower(hex(randomblob(8))), ?)
RETURNING *;

-- name: UpdateBillTotal :one
UPDATE bill
SET total = ?
WHERE bill_id = ?
RETURNING *;

-- name: ListBill :many
SELECT * FROM bill;

-- name: DeleteBill :exec
DELETE FROM bill;
