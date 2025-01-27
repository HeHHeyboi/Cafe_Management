GET http://localhost:8080/reset
[Options]
output: -
delay: 1s

POST http://localhost:8080/user
[Options]
output: -
delay: 1s
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
[Options]
output: -
delay: 1s
{
	"name": "gallery_Name",
	"start_date":"2025-01-25",
	"end_date":"2025-01-30",
	"description":"this is gallery",
	"user_id": "{{userID}}"
}
HTTP 200
[Asserts]
jsonpath "$.user_id" == "{{userID}}"

POST http://localhost:8080/user
[Options]
output: -
delay: 1s
{
	"first_name":"thana",
	"last_name":"that",
	"email":"thana@gmail.com",
	"password":"321"
}
HTTP 200
[Captures]
userID2: jsonpath "$.id"

POST http://localhost:8080/gallery
[Options]
output: -
delay: 1s
{
	"name": "thana_gallery",
	"start_date":"2025-02-01",
	"end_date":"2025-02-15",
	"description":"This is thana gallery",
	"user_id": "{{userID2}}"
}
HTTP 200
[Asserts]
jsonpath "$.user_id" == "{{userID2}}"

GET http://localhost:8080/gallery
[Options]
output: -
delay: 1s

GET http://localhost:8080/gallery?month=this
[Options]
output: -
delay: 1s
GET http://localhost:8080/gallery?month=feb
