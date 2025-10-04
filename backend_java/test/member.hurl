GET http://localhost:8080/reset
HTTP 200

POST http://localhost:8080/member
[Options]
output: -
{
  "name": "John Doe",
  "status": "active",
  "role": "Owner"
}
HTTP 201
[Captures]
id1: jsonpath "$.member_id"

POST http://localhost:8080/member
[Options]
output: -
[Multipart]
name: John wick
status: active
role: Employee
HTTP 201
[Captures]
id2: jsonpath "$.member_id"

GET http://localhost:8080/member
[Options]
output: -
HTTP 200

GET http://localhost:8080/member/{{id1}}
[Options]
output: -
HTTP 200

GET http://localhost:8080/member/99
[Options]
output: -
HTTP 404

PUT http://localhost:8080/member/{{id1}}
[Options]
output: -
{
  "name": "Joe mama",
  "status": "inactive",
  "role": "Owner"
}
HTTP 200

PUT http://localhost:8080/member/{{id2}}
[Options]
output: -
[Multipart]
name: Wicked John
status: active
role: Employee
HTTP 200

PUT http://localhost:8080/member/99
[Options]
output: -
[Multipart]
name: Wicked John
status: active
role: Employee
HTTP 404

GET http://localhost:8080/member/{{id1}}
[Options]
output: -
HTTP 200

GET http://localhost:8080/member
[Options]
output: -
HTTP 200

DELETE http://localhost:8080/member/{{id1}}
HTTP 200

GET http://localhost:8080/member/{{id1}}
[Options]
output: -
HTTP 404

GET http://localhost:8080/member
HTTP 200
