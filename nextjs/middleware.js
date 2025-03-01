const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // อนุญาตเฉพาะ frontend
    credentials: true // ให้อนุญาต cookies และ headers อื่น ๆ
}));

app.use(express.json());

// ตัวอย่าง Endpoint
app.post('/user', (req, res) => {
    res.json({ message: "User created successfully!" });
});

app.listen(8080, () => console.log("Server running on port 8080"));