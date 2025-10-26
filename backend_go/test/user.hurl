GET http://localhost:8080/reset
[Options]
output: -

POST http://localhost:8080/user/login
[Options]
output: -
{
	"email":"thana@gmail.com",
	"password":"1234"
}
HTTP 400

POST http://localhost:8080/user
[Options]
output: -
{
	"first_name": "thana",
	"last_name": "that",
	"email": "thana@gmail.com",
	"password": "1234"
}
HTTP 201
[Captures]
id: jsonpath "$.id"

GET http://localhost:8080/user
[Options]
output: -
HTTP 200

GET http://localhost:8080/user/{{id}}
[Options]
output: -
HTTP 200

POST http://localhost:8080/user/login
[Options]
output: -
{
	"email":"thana@gmail.com",
	"password":"1234"
}
HTTP 200

GET http://localhost:8080/user/logout
[Options]
output: -
HTTP 200
