# GET /user
- return Array of User
`
[
    {
        "id": "000-0000-000", 
        "first_name": "User's First Name",   
        "last_name": "User's Last Name",
        "email": "User's Email",
        "password": "Hash Password"
    }
]
`
# POST /user
- Create User
POST Data
`
{
    "first_name": "User's First Name",  
    "last_name": "User's Last Name",
    "email": "User's Email",
    "password": "Hash Password"
}
`
- return
`
{
    "id": "000-0000-000", 
    "first_name": "User's First Name",   
    "last_name": "User's Last Name",
    "email": "User's Email",
    "password": "Hash Password"
}
`
