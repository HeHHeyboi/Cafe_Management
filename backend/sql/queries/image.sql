-- name: AddNewIMG :one
INSERT INTO image(menu_id, giveAway_id, gallery_name,img_url)
VALUES (?,?,?,?)
RETURNING *;

-- name: GetMenuIMG :many
select img_url from image
WHERE menu_id = ?;

-- name: GetGiveAwayIMG :many
select img_url from image
WHERE giveAway_id = ?;

-- name: GetGalleryNameIMG :many
select img_url from image
WHERE gallery_name = ?;

-- name: DeleteIMG :exec
DELETE FROM image;
