-- name: CreateNewOrder :exec
INSERT INTO orders(bill_id, menu_id, amount, "type","size",menu_name)
SELECT ?,@menu_id,?,?,?,m.name FROM menu AS m
	WHERE menu.menu_id = @menu_id;

-- name: GetOrderFromBill :many
SELECT order_id, o.bill_id,o.menu_name, o.menu_id, amount, o."size", o."type",1.0 * o.amount * (c.price + t.addition_price) AS total 
FROM orders AS o, category AS c, "type" AS t
WHERE o.bill_id = ? and c.menu_id = o.menu_id and t.menu_id = o.menu_id and c."size" = o."size" and t."type" = o."type";

-- name: GetTotalByBillId :one
SELECT sum(o.amount * (c.price + t.addition_price)) AS total
FROM orders AS o, category AS c, "type" AS t
WHERE bill_id = ? and c.menu_id = o.menu_id and t.menu_id = o.menu_id and c."size" = o."size" and t."type" = o."type";

-- name: DeleteOrder :exec
DELETE FROM orders;
