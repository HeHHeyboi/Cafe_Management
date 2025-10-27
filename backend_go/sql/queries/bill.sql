-- name: CreateBill :one
INSERT INTO bill(bill_id, created_at, total)
VALUES (lower(hex(randomblob(8))), ?, 0)
RETURNING bill_id;

-- name: UpdateBill :exec
UPDATE bill
SET total = ?, payment_method = ?
WHERE bill_id = ?;

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
