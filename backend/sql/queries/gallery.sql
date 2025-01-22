-- name: ListGallery :many
select * from gallery;

-- name: BookGallery :one
INSERT INTO gallery(Gname,StartDate,EndDate,Desc,user_id) VALUES (?,?,?,?,?)
RETURNING *;

-- name: DeleteGallery :exec
DELETE FROM gallery;
