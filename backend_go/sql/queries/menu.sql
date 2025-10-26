-- name: AddMenu :one
INSERT INTO menu(name, menu_type,img_url) 
VALUES(?, ?, ?)
RETURNING menu_id;

-- name: GetAllMenus :many
SELECT * FROM menu;

-- name: GetMenuByID :one
SELECT * FROM menu
WHERE menu_id = ?;

-- name: DeleteAllMenu :exec
DELETE FROM menu;

-- name: DeleteMenuByID :exec
DELETE FROM menu
WHERE menu_id = ?;

-- name: UpdateMenuByID :one
UPDATE menu
SET name = ?, menu_type = ? , img_url = ?
WHERE menu_id = ?
RETURNING menu_id;

