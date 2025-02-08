-- name: AddMenu :exec
INSERT INTO menu(name,price,type) 
VALUES(?,?,?);

-- name: GetAllMenus :many
SELECT * FROM menu;

-- name: GetAllType :many
SELECT type FROM menu;

-- name: GetMenu :one
SELECT * FROM menu
WHERE name = ?;

-- name: DeleteAllMenu :exec
DELETE FROM menu;

-- name: DeleteMenuByName :exec
DELETE FROM menu
WHERE name = ?;

-- name: DeleteMenuByID :exec
DELETE FROM menu
WHERE menu_id = ?;

-- name: UpdateMenuByName :one
UPDATE menu
SET name = @set_name, type = ?, price = ?
WHERE name = @name 
RETURNING *;

-- name: UpdateMenuByID :one
UPDATE menu
SET name = ?, type = ?, price = ?
WHERE menu_id = ?
RETURNING *;

