-- name: CreateBill :one
INSERT INTO bill(bill_id, pay_date, total)
VALUES (lower(hex(randomblob(8))), ?, 0)
RETURNING *;

-- name: UpdateBillTotal :one
UPDATE bill
SET total = ?
WHERE bill_id = ?
RETURNING *;

-- name: GetBillByID :one
SELECT * FROM bill
WHERE bill_id = ?;

-- name: ListBill :many
SELECT * FROM bill;

-- name: DeleteBill :exec
DELETE FROM bill;

-- name: DeleteBillByID :exec
DELETE FROM bill
WHERE bill_id = ?;
