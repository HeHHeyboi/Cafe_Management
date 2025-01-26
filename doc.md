# API Documentation
[/reset Endpoint](#get-reset)

[/user Endpoint](#user)

- [GET /user: List all User](#get-user)

- [POST /user: Create User](#post-user)

- [POST /user/login: Login User](#post-userlogin)

## [GET /reset](#get-reset)
Reset ข้อมูลใน Data Base
```
http://localhost:8080/reset
```
## [/user](#user)

### [GET /user](#get-user)
จะได้ค่าออกมาเป็น Array ของ json ที่มีโครงสร้างดังนี้

Example:
```
[
    {
        "id": "000-0000-000", 
        "first_name": "ธนทัต",   
        "last_name": "บุญยานันท์",
        "email": "example@gmail.com",
        "password": "Hash Password"
    },
// 
]
```
- `id`: UUID ของ user
- `first_name`: ชื่อ
- `last_name`: นามสกุล
- `email`: อีเมลของ user
- `password`: จะได้ค่าเป็นรหัสผ่านที่ถูกเข้ารหัส

### [POST /user](#post-user)
- Content-Type: application/json

ในการสร้าง User account ต้องการ data ที่ส่งมาพร้อมกับ Request คือ

Example:
```
{
    "first_name": "ธนทัต",  
    "last_name": "บุญยานันท์",
    "email": "example@gmail.com",
    "password": "123456"
}
```
- `first_name`: ชื่อ
- `last_name`: นามสกุล
- `email`: อีเมลของ user
- `password`: จะได้ค่าเป็นรหัสผ่านที่ถูกเข้ารหัส
จากนั้นจะส่ง json กลับมา
```
{
    "id": "000-0000-000", 
    "first_name": "ธนทัต",   
    "last_name": "บุญยานันท์",
    "email": "example@gmail.com",
    "password": "Hash Password"
}
```
- `id`: UUID ของ user
- `first_name`: ชื่อ
- `last_name`: นามสกุล
- `email`: อีเมลของ user
- `password`: จะได้ค่าเป็นรหัสผ่านที่ถูกเข้ารหัส

### [POST /user/login](#post-userlogin)
Login เข้าบัญชีด้วย `email` & `password`

Example:
```
{
    "email": "example@gmail.com",
    "password": "123456"
}
```
จากนั้นจะส่ง `HTTP 201` หมายความว่า Login สำเร็จ ถ้านอกเหนือจากนั้นอาจจะเป็น
- รหัสผิด
- ไม่ได้สร้าง Account
