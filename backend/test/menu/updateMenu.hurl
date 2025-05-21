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
[Captures]
id: jsonpath "$.[0].menu_id"
name: jsonpath "$.[1].name"

PUT http://localhost:8080/menu/id/{{id}}
{
	"name": "Cola",
	"menu_type": "Meal",
	"price": 55 
}

PUT http://localhost:8080/menu/name/{{name}}
{
	"name": "Red Velvet",
	"menu_type": "Dessert",
	"price": 100 
}

GET http://localhost:8080/menu
[Options]
output: -
HTTP 200

PUT http://localhost:8080/menu/name/something
[Options]
output: -
{
	"name": "Red Velvet",
	"menu_type": "Dessert",
	"price": 100 
}

PUT http://localhost:8080/menu/id/99
[Options]
output: -
{
	"name": "Cola",
	"menu_type": "Meal",
	"price": 55 
}

GET http://localhost:8080/menu
HTTP 200
