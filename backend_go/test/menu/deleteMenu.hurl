GET http://localhost:8080/reset

POST http://localhost:8080/menu
[Options]
output: -
{
	"name": "Cola",
	"menu_type": "Drink",
	"price":25 
}
HTTP 201

POST http://localhost:8080/menu
[Options]
output: -
{
	"name": "Cake",
	"menu_type": "Dessert",
	"price": 105 
}
HTTP 201

POST http://localhost:8080/menu
[Options]
output: -
{
	"name": "Whip Cream",
	"menu_type": "Options",
	"price": 15 
}
HTTP 201

POST http://localhost:8080/menu
[Options]
output: -
{
	"name": "Coffee",
	"menu_type": "Drink",
	"price": 85 
}
HTTP 201

POST http://localhost:8080/menu
[Options]
output: -
{
	"name": "Cookie",
	"menu_type": "Snack",
	"price": 50 
}
HTTP 201

GET http://localhost:8080/menu
[Options]
output: -
HTTP 200

DELETE http://localhost:8080/menu/name/Cake
[Options]
output: -
HTTP 204

GET http://localhost:8080/menu
[Options]
output: -
HTTP 200

DELETE http://localhost:8080/menu/id/3
[Options]
output: -
HTTP 204

GET http://localhost:8080/menu
[Options]
output: -
HTTP 200

DELETE http://localhost:8080/menu/name/something
HTTP 400

DELETE http://localhost:8080/menu/id/99
HTTP 204
