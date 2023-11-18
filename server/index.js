const express = require("express");
const cors = require("cors");
const multer = require('multer');

const mysql = require('mysql')
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.cert('./service-account.json'),
});


const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ storage: multer.memoryStorage() });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog_site',
});

db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
});

app.post('/create-post', upload.fields([{ name: 'img', maxCount: 1 }]), async (req, res) => {
    try {
        const { userId, title, content } = req.body;
        const img = req.files['img'][0].buffer;
        const sql = 'INSERT INTO blog_posts (user_id, img, title, content) VALUES (?, ?, ?, ?)';
        db.query(sql, [userId, img, title, content], (err, result) => {
            if (err) throw err;
            console.log('Blog post inserted');
            res.status(200).send('Blog post created successfully');
        });
    }catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/get-post/:user_id', async (req, res) =>{
    try {
        const user_id = req.params.user_id;
        const sql = "SELECT * FROM blog_posts WHERE user_id = ?";
        db.query(sql, [user_id], (err, result) =>{
            if (err) throw err;
            res.status(200).json(result);
        });
    } catch (error) {
        console.error("Error getting all posts", error);
        res.status(500).send("Internal server error");
    }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});