GET http://localhost:8080/reset

POST http://localhost:8080/menu
[Options]
output: -
{
	"name": "Cola",
	"type": "Drink",
	"price": 15
}
HTTP 200

POST http://localhost:8080/menu
[Options]
output: -
{
	"name": "Cake",
	"type": "Dessert",
	"price": 83 
}
HTTP 200

GET http://localhost:8080/menu
HTTP 200
[Asserts]
jsonpath "$.[0].name" == "Cola"
jsonpath "$.[1].name" == "Cake"
