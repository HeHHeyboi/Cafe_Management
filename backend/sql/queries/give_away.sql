-- name: AddNewGiveAway :exec
INSERT INTO giveAway(name, amount, remain, desc, date)
VALUES (?, ?, ?, ?, date('now'));

-- name: GetAllGiveAways :many
SELECT id,name,amount,remain,desc,date(date) as date
FROM giveAway;

-- name: DeleteGiveAways :exec
DELETE FROM giveAway;
