const express = require('express');
const mysql = require('mysql')
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.cert('./service-account.json'),
});

//Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

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

app.post('/create-post', async (req, res) => {
    try {
        // Verify Firebase token
        const decodedToken = await admin.auth().verifyIdToken(req.body.token);
    
        // Insert blog post into MySQL database
        const { name, img, title, content } = req.body;
        const userId = decodedToken.uid;
    
        const sql = 'INSERT INTO blog_posts (user_id, name, img, title, content) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [userId, name, img, title, content], (err, result) => {
            if (err) throw err;
            console.log('Blog post inserted:', result);
            res.send('Blog post created successfully');
        });
    }catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});