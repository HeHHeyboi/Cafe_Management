# API Documentation
[/reset Endpoint](#get-reset)

[/user Endpoint](#user)

- [GET /user: แสดง Account ทั้งหมด](#get-user)

- [POST /user: สร้าง Account](#post-user)

- [POST /user/login: user ล็อกอิน เข้า Account](#post-userlogin)

[/gallery Endpoint](#gallery)

- [POST /gallery : จอง Gallery](#post-gallery)

- [GET /gallery?month : แสดง Gallery ที่ได้จองทั้งหมด](#get-gallerymonth)

[/menu Endpoint](#menu)

## [GET /reset](#get-reset)
Reset ข้อมูลใน Data Base
```
http://localhost:8080/reset
```
# [/user](#user)

## [GET /user](#get-user)
จะได้ค่าออกมาเป็น Array ของ json ที่มีโครงสร้างดังนี้

`GET http://localhost:8080/user`

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

## [POST /user](#post-user)
- Content-Type: application/json
ในการสร้าง User account ต้องการ data ที่ส่งมาพร้อมกับ Request คือ
Data ที่ต้องส่งมาคือ
Example:

`POST http://localhost:8080/user`
```
{
    "first_name": "ธนทัต",  
    "last_name": "บุญยานันท์",
    "email": "example@gmail.com",
    "password": "123456"
}
```
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

## [POST /user/login](#post-userlogin)
Login เข้าบัญชีด้วย `email` & `password` จะทำการสร้าง cookie ในเครื่องของ client
Example:

`POST http://localhost:8080/user/login`
```
{
    "email": "example@gmail.com",
    "password": "123456"
}
```
จากนั้นจะสร้างคุกกี้และส่ง `HTTP 201` หมายความว่า Login สำเร็จ ถ้านอกเหนือจากนั้นอาจจะเป็น
- รหัสผิด
- ไม่ได้สร้าง Account

## [GET /user/logout](#post-userlogin)

`GET http://localhost:8080/user/logout`

ทำการลบคุกกี้ login ออก

# [/gallery](#gallery)

## [POST /gallery](#post-gallery)

`POST http://localhost:8080/gallery`

จองวันที่จัด Gallery
Data ที่ต้องส่งมาคือ
```
{
    "name": "gallery_Name",
    "start_date": "2025-01-25",
    "end_date": "2025-01-30",
    "description": "This is a gallery",
}
```
- `name`: ชื่อของแกลลอรี่
- `start_date`: วันที่จองแกลลอรี่
- `end_date`: วันที่สิ้นสุดแกลลอรี่
- `description`: คำอธิบาย
- `user_id(FK)`: ID ของ User

## [GET /gallery?month=](#get-gallerymonth)

`POST http://localhost:8080/gallery?month=..`

จะได้ค่าออกมาเป็น Array ของ json ที่มีโครงสร้างดังนี้
Query:
- `month`: this(แสดง Gallery ที่มี `start_date` ภายในเดือนนี้)

Example:
```
[
    {
        "name": "gallery_Name",
        "start_date": "2025-01-25",
        "end_date": "2025-01-30",
        "description": "This is a gallery",
        "user_id": "9f75a8e2-36a2-4e1c-9e76-ecfda7cfb4a6"
    }
]
```
- `name`: ชื่อของแกลลอรี่
- `start_date`: วันที่จองแกลลอรี่
- `end_date`: วันที่สิ้นสุดแกลลอรี่
- `description`: คำอธิบาย
- `user_id(FK)`: ID ของ User

# [/menu](#menu)

## [GET /menu](#get-menu)

`GET http://localhost:8080/menu`

List เมนู จะได้ออกมาเป็น
```
[
    {
        "menu_id": 1,
        "name":  "กาแฟ",
        "type": "เครื่องดื่ม",
        "price": 85.00
    },
    ...
]
```
- `menu_id` : id ของเมนู
- `name` : ชื่อของเมนู
- `type` : ประเภทของเมนู
- `price` : ราคาของเมนู

## [POST /menu](#post-menu)
ใช้ในการเพิ่มเมนูใหม่ลง Data Base
Example:

`POST http://localhost:8080/menu`
```
{
	"name":  "กาแฟ",
	"type": "เครื่องดื่ม",
	"price": 85.00
},
```
- `name` : ชื่อของเมนู
- `type` : ประเภทของเมนู
- `price` : ราคาของเมนู

## [PUT /menu](#put-menu)
แก้ไขข้อมูลเมนูมี 2 แบบ

`PUT http://localhost:8080/menu/id/{menu_id}`
`PUT http://localhost:8080/menu/name/{name}`

- `menu_id` : id ของเมนู
- `name` : ชื่อของเมนู
ข้อมูลที่ต้องส่งมาเพื่อที่จะแก้ไขข้อมูลคือ
```
{
	"name":  "กาแฟ",
	"type": "เครื่องดื่ม",
	"price": 85.00
},
```
ปล. ต้องส่งมาทุกอัน แม้บางอันจะไม่ได้แก้ไขก็ต้องส่งมา

## [DELETE /menu](#delete-menu)
ลบข้อมูลเมนูมี 2 แบบ

`DELETE http://localhost:8080/menu/id/{menu_id}`
`DELETE http://localhost:8080/menu/name/{name}`
