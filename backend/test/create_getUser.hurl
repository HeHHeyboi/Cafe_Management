GET http://localhost:8080/reset
[Options]
output: -

POST http://localhost:8080/user
{
	"first_name":"first",
	"last_name":"last",
	"email":"example@gmail.com",
	"password":"123"
}

POST http://localhost:8080/user
{
	"first_name":"thana",
	"last_name":"D",
	"email":"thana@gmail.com",
	"password":"321"
}

GET http://localhost:8080/user
