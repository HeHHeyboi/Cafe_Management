-- name: CreateUser :exec
INSERT INTO users(user_id, FName, LName, email, password)
VALUES( ?, ?, ?, ?, ?);

-- name: GetUser :one
select * from users
WHERE user_id = ?;

-- name: GetAllUser :many
SELECT * from users;

-- name: DeleteAllUser :exec
DELETE from users;
