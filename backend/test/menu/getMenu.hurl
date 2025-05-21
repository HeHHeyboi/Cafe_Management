GET http://localhost:8080/reset

POST http://localhost:8080/menu
[Options]
output: -
{
	"name": "Cola",
	"menu_type": "Drink",
	"price": 15
}
HTTP 201

POST http://localhost:8080/menu
[Options]
output: -
{
	"name": "Cake",
	"menu_type": "Dessert",
	"price": 83 
}
HTTP 201

GET http://localhost:8080/menu
[Options]
output: -
HTTP 200

GET http://localhost:8080/menu/name/Cake
[Options]
output: -
HTTP 200

GET http://localhost:8080/menu/id/1
[Options]
output: -
HTTP 200

GET http://localhost:8080/menu/name/something
[Options]
output: -

GET http://localhost:8080/menu/id/99
