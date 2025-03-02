const express = require('express');
const cors = require('cors');

const app = express();

// ตั้งค่า CORS ให้รองรับทุก HTTP method และให้ support credentials
app.use(cors({
    origin: 'http://localhost:3000', // frontend ที่อนุญาต
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // รองรับ method ที่ใช้
    allowedHeaders: ['Content-Type', 'Authorization'], // อนุญาต headers ที่จำเป็น
    credentials: true, // ให้รองรับ cookies
}));

app.use(express.json());

// Endpoint ตัวอย่าง
app.post('/giveAway', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Giveaway added successfully!' });
});

app.listen(8080, () => console.log("Server running on port 8080"));
