-- name: CreateBill :one
INSERT INTO bill(bill_id, pay_date, total, user_id, giveAway_id)
VALUES (lower(hex(randomblob(8))), ?, 0 ,? ,?)
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
