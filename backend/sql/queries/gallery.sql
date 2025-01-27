-- name: ListGallery :many
select * from gallery
ORDER BY "StartDate";

-- name: ListGalleryByMonth :many
SELECT * FROM gallery
WHERE StartDate >= CASE 
	WHEN @this_month = 1 THEN date('now', 'start of month')
	WHEN @month IS NOT NULL THEN '9999-12-31' -- Fallback for invalid type
	ELSE '0000-00-00' -- Fallback for other cases
END
AND StartDate < CASE 
	WHEN @this_month = 1 THEN date('now', 'start of month', '+1 month')
	WHEN @month IS NOT NULL THEN '0000-00-00' -- Fallback for invalid type
	ELSE '9999-12-31' -- Fallback for other cases
END;

-- name: BookGallery :one
INSERT INTO gallery(Gname,StartDate,EndDate,Desc,user_id) VALUES (?,?,?,?,?)
RETURNING *;

-- name: DeleteGallery :exec
DELETE FROM gallery;
