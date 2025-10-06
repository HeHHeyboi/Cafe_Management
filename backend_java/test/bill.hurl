GET http://localhost:8080/reset
HTTP 200

POST http://localhost:8080/bill/new
[Options]
output: -
{
	"payment_method":"promptpay",
	"total": 1
}
HTTP 201

POST http://localhost:8080/bill/new
[Options]
output: -
{
	"payment_method":"cash",
	"total": 1
}
HTTP 201
[Captures]
id: jsonpath "$.id"

GET http://localhost:8080/bill
[Options]
output: -
HTTP 200

PUT http://localhost:8080/bill/{{id}}
[Options]
output: -
{
	"total": 100.00
}
HTTP 200

GET http://localhost:8080/bill/{{id}}
[Options]
output: -
HTTP 200

DELETE http://localhost:8080/bill/{{id}}
[Options]
output: -
HTTP 200

GET http://localhost:8080/bill
[Options]
output: -
HTTP 200
