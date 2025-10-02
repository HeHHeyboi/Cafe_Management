# Java API Documentation

[/user Endpoint](#user-endpoint)
- [POST /user](#post-userregister)
- [POST /user/login](#post-userlogin)
- [GET /user/logout](#get-userlogout)


[/menu Endpoint](#menu-endpoint)
- [GET /menu](#get-menu)
- [POST /menu](#post-menu)
- [GET /menu/{id}](#get-menuid)
- [PUT /menu/{id}](#put-menuid)
- [DELETE /menu/{id}](#delete-menuid)

[/bill Endpoint](#bill-endpoint)
- [GET /bill](#get-bill)
- [GET /bill/new](#get-billnew)
- [GET /bill/{id}](#get-billid)
- [DELETE /bill/{id}](#delete-billid)

[/order Endpoint](#order-endpoint)
- [GET /order/{bill_id}](#get-orderbill_id)
- [POST /order/{bill_id}](#post-orderbill_id)
- [PUT /order/{bill_id}](#put-orderbill_id)
- [DELETE /order/{bill_id}](#delete-orderbill_id)


## [/user Endpoint](#user-endpoint)
API สำหรับจัดการผู้ใช้ในระบบ.
### [POST /user](#post-userregister)
- **คำอธิบาย**: ลงทะเบียนผู้ใช้ใหม่.
- **Request**:
  - **Headers**:
	- Content-Type: application/json
  - **Body**:
	```json
	{
		
	  "first_name": "johndoe",
	  "last_name": "doe",
	  "email": "johndoe@example.com",
	  "password": "securepassword"
	}
	```

	`first_name`: ชื่อผู้ใช้ (String, required)

	`last_name`: นามสกุลผู้ใช้ (String, required)

	`email`: อีเมลผู้ใช้ (String, required, unique)

	`password`: รหัสผ่านผู้ใช้ (String, required)

- **Response**:
  - **Status Code**: 201 Created
  - **Body**:
	```json
	{
	  "msg": "User registered successfully"
	}
	```
- **Error Responses**:
  - **Status Code**: 400 Bad Request
  - **Body**:
	```json
	{
	  "error": "Email already in use"
	}
	```
### [POST /user/login](#post-userlogin)
- **คำอธิบาย**: เข้าสู่ระบบผู้ใช้.
- **Request**:
  - **Headers**:
	- Content-Type: application/json
  - **Body**:
	```json
	{
	  "email": "johndoe@example.com",
	  "password": "securepassword"
	}
	```
	`email`: อีเมลผู้ใช้ (String, required)

	`password`: รหัสผ่านผู้ใช้ (String, required)
- **Response**:
  - **Status Code**: 200 OK
  - **Body**:
	```json
	{
	  "msg": "Login successful"
	}
	```
- **Error Responses**:
  - **Status Code**: 401 Unauthorized
  - **Body**:
	```json
	{
	  "error": "Invalid email or password"
	}
	```
### [GET /user/logout](#get-userlogout)
- **คำอธิบาย**: ออกจากระบบผู้ใช้.
- **Response**:
  - **Status Code**: 200 OK
  - **Body**:
	```json
	{
	  "msg": "Logout successful"
	}
	```
	
## [/menu Endpoint](#menu-endpoint)
API สำหรับจัดการเมนูอาหารและเครื่องดื่มในร้านกาแฟ.
### [GET /menu](#get-menu)
- **คำอธิบาย**: แสดงข้อมูลของเมนูทั้งหมด.
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Array ของเมนูในรูปแบบ JSON
	```json
	[
		{
			"name": "Cheese Cake",
			"menu_type": "dessert",
			"img_url": "http://example.com/uploads/cheese_cake.jpg",
			"category": [
				{ 
					"size": "s",
					"price": 100.00,
				},
				{ 
					"size": "m",
					"price": 120.00,
				},
			],
			"types":[
				{
					"type": "ร้อน",
					"addition_price": 10.00
				}
			]
		},
		{
			"name": "Espresso",
			"menu_type": "drink",
			"img_url": "http://example.com/uploads/espresso.jpg",
			"category": [
				{ 
					"size": "s",
					"price": 50.00,
				},
				{ 
					"size": "m",
					"price": 70.00,
				},
			],
			"types":[
				{
					"type": "ร้อน",
					"addition_price": 0.00
				},
				{
					"type": "เย็น",
					"addition_price": 10.00
				}
			]
		}
	]
	```
	`menu_id`: รหัสเมนู (Integer)

	`name`: ชื่อเมนู (String)

	`price`: ราคาของเมนู (Decimal)

	`menu_type`: ประเภทของเมนู (String) - "food", "drink", หรือ "dessert"

	`img_url`: URL ของรูปภาพเมนู (String)

	`size`: ขนาดของเมนู (String) - "s", "m", "l", "xl"

	`types`: ร้อน,เย็น (Array)
	 - `type`: ร้อน,เย็น (String)
	 - `addition_price`: ราคาที่ต้องเพิ่ม (Decimal)

### [POST /menu](#post-menu)
- **คำอธิบาย**: เพิ่มเมนูใหม่.
- **Request**:
  - **Headers**:
	- Content-Type: multipart/form-data
  - **Body**:
	```json
	data:{
		"name": "Cheese Cake",
		"menu_type": "dessert",
		"category": [
			{ 
				"size": "s",
				"price": 100.00,
			},
			{ 
				"size": "m",
				"price": 120.00,
			},
		],
		"types":[
			{
				"type": "ร้อน",
				"addition_price": 10.00
			}
		]
	}
	```
	และ img (ถ้ามีการอัปโหลดรูปภาพ):
	```form-data
	img: Files (Image, optional)
	```

	`name`: ชื่อเมนู (String, required)

	`menu_type`: ประเภทของเมนู (String, required) - "food", "drink", หรือ "dessert"

	`category`: ขนาดของเมนู (Array, required)
	 - `size`: ขนาดของเมนู (String, required) - "s", "m", "l", "xl"
	 - `price`: ราคาของเมนู (Decimal, required)

	`types`: ร้อน,เย็น (Array, required)
	 - `type`: ร้อน,เย็น (String, required)
	 - `addition_price`: ราคาที่ต้องเพิ่ม (Decimal, required)

	`img`: URL ของรูปภาพเมนู (String, optional)

- **Response**:
  - **Status Code**: 201 Created
  - **Body**:
	```json
	{
		"msg": "Menu item created successfully"
	}
	```

### [GET /menu/{id}](#get-menuid)
- **คำอธิบาย**: แสดงข้อมูลของเมนูตาม ID ของเมนู.
- **Parameters**:
  - `id`: รหัสเมนูที่ต้องการดึงข้อมูล (Integer, required)
- **Response**:
  - **Status Code**: 200 OK
  - **Body**:
	```json
	{
	  "menu_id": 1,
	  "name": "Cheese Cake",
	  "menu_type": "dessert",
	  "img_url": "http://example.com/uploads/cheese_cake.jpg",
		"category": [
			{ 
				"size": "s",
				"price": 100.00,
			},
			{ 
				"size": "m",
				"price": 120.00,
			},
		],
	  "types": [
		{
			"type": "ร้อน",
			"addition_price": 10.00
		}
	  ]
	}
	```
	`menu_id`: รหัสเมนู (Integer)

	`name`: ชื่อเมนู (String)

	`price`: ราคาของเมนู (Decimal)

	`menu_type`: ประเภทของเมนู (String) - "food", "drink", หรือ "dessert"

	`size`: ขนาดของเมนู (String) - "s", "m", "l", "xl"

	`types`: ร้อน,เย็น, ปั่น (Array)
	 - `type`: ร้อน,เย็น, ปั่น (String)
	 - `addition_price`: ราคาที่ต้องเพิ่ม (Decimal)

	`img_url`: URL ของรูปภาพเมนู (String)

- **Error Responses**:
  - **Status Code**: 404 Not Found
  - **Body**:
	```json
	{
	  "error": "Menu item not found"
	}
	```

### [PUT /menu/{id}](#put-menuid)
- **คำอธิบาย**: แก้ไขข้อมูลของเมนูตาม ID ของเมนู.
- **Parameters**:
  - `id`: รหัสเมนูที่ต้องการแก้ไข (Integer, required)
- **Request**:
  - **Headers**:
	- Content-Type: application/json
  - **Body**:
	```json
	{
	  "name": "Cheese Cake",
	  "menu_type": "dessert",
	  "category": [
		{ 
			"size": "s",
			"price": 100.00,
		},
		{ 
			"size": "m",
			"price": 120.00,
		}
	  ],
		"types":[
			{
				"type": "ร้อน",
				"addition_price": 10.00
			}
		]
	}
	```
	และ Form-Data (ถ้ามีการอัปโหลดรูปภาพ):
	```form-data
	img: Files (Image, optional)
	```
	`name`: ชื่อเมนู (String, optional)

	`price`: ราคาของเมนู (Decimal, optional)

	`menu_type`: ประเภทของเมนู (String, optional) - "food", "drink", หรือ "dessert"

	`size`: ขนาดของเมนู (String, optional) - "s", "m", "l", "xl"

	`category`: ขนาดของเมนู (Array, optional)
	 - `size`: ขนาดของเมนู (String, required) - "s", "m", "l", "xl"
	 - `price`: ราคาของเมนู (Decimal, required)
	 - `types`: ร้อน,เย็น (Array, required)
		- `type`: ร้อน,เย็น (String, required)
		- `addition_price`: ราคาที่ต้องเพิ่ม (Decimal, required)

	`img_url`: URL ของรูปภาพเมนู (String, optional)

- **Response**:
  - **Status Code**: 200 OK
  - **Body**:
	```json
	{
	  "msg": "Menu item updated successfully"
	}
	```
- **Error Responses**:
  - **Status Code**: 404 Not Found
  - **Body**:
	```json
	{
	  "error": "Menu item not found"
	}
	```
### [DELETE /menu/{id}](#delete-menuid)
- **คำอธิบาย**: ลบเมนูตาม ID ของเมนู.
- **Parameters**:
  - `id`: รหัสเมนูที่ต้องการลบ (Integer, required)
- **Response**:
  - **Status Code**: 200 OK
  - **Body**:
	```json
	{
	  "msg": "Menu item deleted successfully"
	}
	```
- **Error Responses**:
  - **Status Code**: 404 Not Found
  - **Body**:
	```json
	{
	  "error": "Menu item not found"
	}
	```

## [/bill Endpoint](#bill-endpoint)
API สำหรับจัดการบิลในร้านกาแฟ.
### [GET /bill](#get-bill)
- **คำอธิบาย**: แสดงข้อมูลของบิลทั้งหมด.
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Array ของบิลในรูปแบบ JSON
	```json
	[
	  {
	    "bill_id": "0t1Y8Ccg",
	    "total": 250.00,
	    "created_at": "2023-10-01T10:00:00Z"
	  },
	  {
	    "bill_id": "DaZdJTjL",
	    "total_amount": 150.00,
	    "created_at": "2023-10-01T11:00:00Z"
	  }
	]
	```
	`lill_id`: รหัสบิล (String)

	`total`: ยอดรวมของบิล (Decimal)

	`created_at`: วันที่และเวลาที่บิลถูกสร้าง (ISO 8601 String)

### [GET /bill/new](#get-billnew)
- **คำอธิบาย**: สร้างบิลใหม่และคืนค่า ID ของบิล.
- **Response**:
  - **Status Code**: 201 Created
  - **Body**:
	```json
	{
	  "bill_id": "0t1Y8Ccg",
	  "total": 0.00,
	  "created_at": "2023-10-01T10:00:00Z"
	}
	```
	`bill_id`: รหัสบิลที่ถูกสร้างขึ้นใหม่ (String)

	`total`: ยอดรวมของบิล (Decimal, เริ่มต้นที่ 0.00)

	`created_at`: วันที่และเวลาที่บิลถูกสร้าง (ISO 8601 String)

### [GET /bill/{id}](#get-billid)
- **คำอธิบาย**: แสดงข้อมูลของบิลตาม ID ของบิล.
- **Parameters**:
  - `id`: รหัสบิลที่ต้องการดึงข้อมูล (String, required)
- **Response**:
  - **Status Code**: 200 OK
  - **Body**:
	```json
	{
	  "bill_id": "0t1Y8Ccg",
	  "total": 250.00,
	  "created_at": "2023-10-01T10:00:00Z",
	}
	```
	`bill_id`: รหัสบิล (String)

	`total`: ยอดรวมของบิล (Decimal)

	`created_at`: วันที่และเวลาที่บิลถูกสร้าง (ISO 8601 String)

- **Error Responses**:
  - **Status Code**: 404 Not Found
  - **Body**:
	```json
	{
	  "error": "Bill not found"
	}
	```

### [PUT /bill/{id}](#put-billid)
- **คำอธิบาย**: แก้ไขข้อมูลของบิลตาม ID ของบิล.
- **Parameters**:
  - `id`: รหัสบิลที่ต้องการแก้ไข (String, required)
- **Request**:
  - **Headers**:
	- Content-Type: application/json
  - **Body**:
	```json
	{
	  "total": 300.00
	}
	```
	`total`: ยอดรวมของบิล (Decimal, required)
### [DELETE /bill/{id}](#delete-billid)
- **คำอธิบาย**: ลบบิลตาม ID ของบิล.
- **Parameters**:
  - `id`: รหัสบิลที่ต้องการลบ (String, required)
- **Response**:
  - **Status Code**: 200 OK
  - **Body**:
	```json
	{
	  "msg": "Bill deleted successfully"
	}
	```
- **Error Responses**:
  - **Status Code**: 404 Not Found
  - **Body**:
	```json
	{
	  "error": "Bill not found"
	}
	```

## [/order Endpoint](#order-endpoint)
API สำหรับจัดการคำสั่งซื้อในร้านกาแฟ.
### [GET /order/{bill_id}](#get-orderbill_id)
- **คำอธิบาย**: แสดงข้อมูลของคำสั่งซื้อทั้งหมดในบิลที่ระบุ.
- **Parameters**:
  - `bill_id`: รหัสบิลที่ต้องการดึงข้อมูลคำสั่งซื้อ (String, required)
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Array ของคำสั่งซื้อในรูปแบบ JSON
	```json
	[
	  {
	    "order_id": 1,
	    "menu_id": 2,
	    "amount": 2,
	    "total_price": 100.00
	  },
	  {
	    "order_id": 2,
	    "menu_id": 1,
	    "amount": 1,
	    "total_price": 100.00
	  }
	]
	```
	`order_id`: รหัสคำสั่งซื้อ (Integer)

	`menud_id`: รหัสเมนูที่ถูกสั่ง (Integer)

	`amount`: จำนวนที่ถูกสั่ง (Integer)

	`total_price`: ราคาทั้งหมดของคำสั่งซื้อนี้ (Decimal)

### [POST /order/{bill_id}](#post-orderbill_id)
- **คำอธิบาย**: เพิ่มคำสั่งซื้อใหม่ในบิลที่ระบุ.
- **Parameters**:
  - `bill_id`: รหัสบิลที่ต้องการเพิ่มคำสั่งซื้อ (String, required)
- **Request**:
  - **Headers**:
	- Content-Type: application/json
  - **Body**:
	```json
	{
	  "menu_id": 2,
	  "amount": 2
	}
	```
	`menu_id`: รหัสเมนูที่ต้องการสั่ง (Integer, required)
	
	`amount`: จำนวนที่ต้องการสั่ง (Integer, required)

- **Response**:
  - **Status Code**: 201 Created
  - **Body**:
	```json
	{
		"msg": "Order added successfully to Bill ID: 0t1Y8Ccg",
	}
	```

- **Error Responses**:
  - **Status Code**: 400 Bad Request
  - **Body**:
	```json
	{
	  "error": "Invalid menu ID or amount"
	}
	```
### [PUT /order/{bill_id}](#put-orderbill_id)
- **คำอธิบาย**: แก้ไขคำสั่งซื้อในบิลที่ระบุ.
- **Parameters**:
  - `bill_id`: รหัสบิลที่ต้องการแก้ไขคำสั่งซื้อ (String, required)
- **Request**:
  - **Headers**:
	- Content-Type: application/json
  - **Body**:
	```json
	{
	  "order_id": 1,
	  "menu_id": 2,
	  "amount": 3
	}
	```
	`order_id`: รหัสคำสั่งซื้อที่ต้องการแก้ไข (Integer, required)

	`menu_id`: รหัสเมนูที่ต้องการสั่ง (Integer, optional)

	`amount`: จำนวนที่ต้องการสั่ง (Integer, optional)

- **Response**:
  - **Status Code**: 200 OK
  - **Body**:
	```json
	{
	  "msg": "Order updated successfully"
	}
	```
- **Error Responses**:
  - **Status Code**: 400 Bad Request
  - **Body**:
	```json
	{
	  "error": "Invalid order ID, menu ID, or amount"
	}
	```
  - **Status Code**: 404 Not Found
  - **Body**:
	```json
	{	
	  "error": "Order not found"
	}
	```
### [DELETE /order/{bill_id}](#delete-orderbill_id)
- **คำอธิบาย**: ลบคำสั่งซื้อในบิลที่ระบุ.
- **Parameters**:
  - `bill_id`: รหัสบิลที่ต้องการลบคำสั่งซื้อ (String, required)
- **Request**:
  - **Headers**:
	- Content-Type: application/json
  - **Body**:
	```json
	{
	  "order_id": 1
	}
	```
	`order_id`: รหัสคำสั่งซื้อที่ต้องการลบ (Integer, required)
- **Response**:
  - **Status Code**: 200 OK
  - **Body**:
	```json
	{
	  "msg": "Order deleted successfully"
	}
	```
- **Error Responses**:
  - **Status Code**: 400 Bad Request
  - **Body**:
	```json
	{
	  "error": "Invalid order ID"
	}
	```
  - **Status Code**: 404 Not Found
  - **Body**:
	```json
	{
	  "error": "Order not found"
	}
	```
