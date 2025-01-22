GET http://localhost:8080/reset

POST http://localhost:8080/user
[Options]
output: -
{
	"first_name":"first",
	"last_name":"last",
	"email":"example@gmail.com",
	"password":"123"
}
HTTP 200
[Captures]
userID: jsonpath "$.id"

POST http://localhost:8080/gallery
{
	"name": "gallery_Name",
	"start_date":"2025-01-25",
	"end_date":"2025-01-30",
	"description":"this is gallery",
	"user_id": "{{userID}}"
}
HTTP 200
[Asserts]
jsonpath "$.start_date" == "2025-01-25" 
jsonpath "$.end_date" == "2025-01-30" 
jsonpath "$.user_id" == "{{userID}}"

