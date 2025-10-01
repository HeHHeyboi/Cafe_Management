GET http://localhost:8080/reset
HTTP 200

POST http://localhost:8080/menu
[Options]
output: -
[Multipart]
img: file,KKU.png; image/png
data: { "name": "Cheese Cake", "menu_type": "dessert", "category": [ { "size": "s", "price": 100.00 }, { "size": "m", "price": 120.00 } ], "types":[ { "type": "ร้อน", "addition_price": 10.00 } ] }

HTTP 201

GET http://localhost:8080/menu
[Options]
output: -
HTTP 200
[Captures]
id: jsonpath "$.[0].menu_id"

GET http://localhost:8080/menu/{{id}}
[Options]
output: -
HTTP 200

PUT http://localhost:8080/menu/{{id}}
[Options]
output: -
[Multipart]
img: file,random.jpg; image/jpeg
data: { "name": "Cake Cheese", "menu_type": "drink", "category": [ {"size":"s","price": 80.00},{ "size": "m", "price": 100.00 }, { "size": "l", "price": 120.00 } ], "types":[ { "type": "ร้อน", "addition_price": 10.00 },{"type":"none","addition_price":0.0} ] }

HTTP 200

GET http://localhost:8080/menu/{{id}}
[Options]
output: -
HTTP 200

DELETE http://localhost:8080/menu/{{id}}
[Options]
output: -
HTTP 200

GET http://localhost:8080/menu
HTTP 200
