-- name: CreateUser :exec
INSERT INTO users(user_id, FName, LName, email, password)
VALUES( ?, ?, ?, ?, ?);

-- name: GetUserByEmail :one
select user_id,password from users
WHERE email = ?;

-- name: GetUserByID :one
select * from users
Where user_id = ?;

-- name: GetAllUser :many
SELECT * from users;

-- name: DeleteAllUser :exec
DELETE from users;
