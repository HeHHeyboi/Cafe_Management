GET http://localhost:8080/reset
[Options]
output: -
HTTP 200

POST http://localhost:8080/bill
[Options]
output: -
{
	"total": 500
}
HTTP 201

POST http://localhost:8080/bill
[Options]
output: -
{
	"total": 300
}
HTTP 201

POST http://localhost:8080/bill
[Options]
output: -
{
	"total": 100
}
HTTP 201

GET http://localhost:8080/bill
