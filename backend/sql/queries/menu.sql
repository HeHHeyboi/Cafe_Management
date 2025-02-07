-- name: AddMenu :exec
INSERT into menu(name,price,type) 
VALUES(?,?,?);

-- name: GetAllMenus :many
Select * from menu;

-- name: GetAllType :many
Select type from menu;

-- name: GetMenu :one
Select * from menu
WHERE name = ?;

-- name: DeleteAllMenu :exec
DELETE FROM menu;
