-- CreateNewOrder :one
INSERT INTO "order"(bill_id, menu_id, amount, total_price)
SELECT ?,?,?,@calAmount * price FROM menu
	WHERE menu_id = ?;

-- GetOrderFromBill :many
SELECT * FROM "order" 
WHERE bill_id = ?;

-- name: DeleteOrder :exec
DELETE FROM "order";
