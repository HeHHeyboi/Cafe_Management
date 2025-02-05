GET http://localhost:8080/reset
[Options]
output: -
HTTP 200

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
email: jsonpath "$.email"
password: jsonpath "$.password"

POST http://localhost:8080/user/login
[Options]
output: -
{
	"email":"{{ email }}",
	"password":"123"
}
HTTP 201

POST http://localhost:8080/user/login
[Options]
output: -
{
	"email":"{{ email }}",
	"password":"321"
}
HTTP 401

POST http://localhost:8080/user/login
{
	"email":"thana@gmail.com",
	"password":"123"
}
HTTP 404
