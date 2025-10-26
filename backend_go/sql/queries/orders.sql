-- name: CreateNewOrder :one
INSERT INTO "orders"(bill_id, menu_id, amount, menu_name)
SELECT ?,?,?,@calAmount * menu.price, menu.name FROM menu
	WHERE menu.menu_id = @target_menu_id
RETURNING *;

-- name: GetOrderFromBill :many
SELECT * FROM "orders" 
WHERE bill_id = ?;

-- name: DeleteOrder :exec
DELETE FROM "orders";
