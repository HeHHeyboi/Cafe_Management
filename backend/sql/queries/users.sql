-- name: CreateUser :exec
INSERT INTO users(user_id, FName, LName, email, password)
VALUES( ?, ?, ?, ?, ?);

-- name: GetUserByEmail :one
select password from users
WHERE email = ?;


-- name: GetAllUser :many
SELECT * from users;

-- name: DeleteAllUser :exec
DELETE from users;
