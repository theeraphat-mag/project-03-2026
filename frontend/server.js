const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <form method="POST" action="/post">
            <input type="text" name="message" placeholder="พิมพ์ข้อความที่นี่">
            <button type="submit">ส่งข้อความ</button>
        </form>
    `);
});

app.post('/post', async (req, res) => {
    try {
        // BACKEND_URL จะดึงจาก K8s Service Name
        const backendUrl = process.env.BACKEND_URL || 'http://backend-service:5000';
        await axios.post(`${backendUrl}/add`, { content: req.body.message });
        res.send('บันทึกสำเร็จ! <a href="/">กลับหน้าหลัก</a>');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

app.listen(3000, () => console.log('Frontend run on port 3000'));
