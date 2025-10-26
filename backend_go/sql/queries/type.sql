-- name: CreateType :exec
INSERT INTO "type"(menu_id, type, addition_price)
VALUES (?, ?, ?);

-- name: GetTypeByMenuID :many
select * from "type"
where menu_id = ?;

-- name: DeleteAllType :exec
delete from "type";

-- name: DeleteTypeByMenuID :exec
delete from "type"
where menu_id = ?;
