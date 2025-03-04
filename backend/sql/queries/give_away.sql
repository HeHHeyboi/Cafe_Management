-- name: AddNewGiveAway :one
INSERT INTO giveAway(name, amount, remain, desc, date,img_url)
VALUES (?, ?, ?, ?, date('now'),?)
RETURNING *;

-- name: GetAllGiveAways :many
SELECT id,name,amount,remain,desc,date(date) as date,img_url
FROM giveAway;

-- name: GetGiveAwayByName :one
SELECT id,name,amount,remain,desc,date(date) as date,img_url 
FROM giveAway
WHERE name = ?;

-- name: GetGiveAwayByID :one
SELECT id,name,amount,remain,desc,date(date) as date,img_url 
FROM giveAway
WHERE id = ?;

-- name: DeleteGiveAways :exec
DELETE FROM giveAway;
