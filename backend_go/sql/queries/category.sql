-- name: CreateCategory :exec
INSERT INTO "category"(menu_id,size,price)
VALUES(?, ?, ?);

-- name: GetCategoryByMenuID :many
SELECT * FROM "category"
WHERE menu_id = ?;

-- name: DeleteAllCategory :exec
DELETE FROM "category";

-- name: DeleteCategoryByMenuID :exec
DELETE FROM "category"
where menu_id = id;
