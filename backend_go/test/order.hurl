GET http://localhost:8080/reset
HTTP 200

POST http://localhost:8080/bill
[Options]
output: -
{
	"payment_method":"cash"
}
HTTP 201
[Captures]
bill_id: jsonpath "$.id"

POST http://localhost:8080/menu
[Options]
output: -
[Multipart]
img: file,KKU.png; image/png
data: { "name": "Cheese Cake", "menu_type": "dessert", "category": [ { "size": "s", "price": 100.00 }, { "size": "m", "price": 120.00 } ], "types":[ { "type": "ร้อน", "addition_price": 10.00 } ] }
HTTP 201

POST http://localhost:8080/menu
[Options]
output: -
[Multipart]
img: file,random.jpg; image/jpeg
data: { "name": "Cake Cheese", "menu_type": "drink", "category": [ {"size":"s","price": 80.00},{ "size": "m", "price": 100.00 }, { "size": "l", "price": 120.00 } ], "types":[ { "type": "ร้อน", "addition_price": 10.00 },{"type":"none","addition_price":0.0} ] }
HTTP 201

GET http://localhost:8080/menu
[Options]
output: -
HTTP 200
[Captures]
id1: jsonpath "$.[0].menu_id"
id2: jsonpath "$.[1].menu_id"

POST http://localhost:8080/order/{{bill_id}}
[Options]
output: -
{
	"menu_id":{{id1}},
	"amount":3,
	"size":"m",
	"type":"ร้อน"
}
HTTP 201

POST http://localhost:8080/order/{{bill_id}}
[Options]
output: -
{
	"menu_id":{{id2}},
	"amount":1,
	"size":"s",
	"type":"none"
}
HTTP 201

GET http://localhost:8080/order/{{bill_id}}
[Options]
output: -
HTTP 200

GET http://localhost:8080/bill/{{bill_id}}
HTTP 200
