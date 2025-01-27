-- name: ListGallery :many
select * from gallery
ORDER BY "StartDate";

-- FIX: This Query next time, May be use WITH-CLAUSE to handle variable
-- name: ListGalleryByMonth :many
SELECT * FROM gallery
WHERE StartDate >= CASE 
	WHEN (CAST(@this_month AS INT )) THEN date('now','start of month') ELSE '0' 
END
AND StartDate < CASE 
	WHEN (CAST(@this_month AS INT) ) THEN date('now','start of month','+1 month') ELSE '99999' 
END;

-- name: BookGallery :one
INSERT INTO gallery(Gname,StartDate,EndDate,Desc,user_id) VALUES (?,?,?,?,?)
RETURNING *;

-- name: DeleteGallery :exec
DELETE FROM gallery;
