import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'school',
  password: 'Harekrishna@123',
  database: 'schooldata',
};

const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'schoolImages'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Endpoint for inserting data
app.post('/api/addSchool', upload.single('image'), (req, res) => {
  console.log(req.file); 
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? req.file.filename : null; // Use the uploaded file's filename

  const sql = 'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [name, address, city, state, contact, image, email_id];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error inserting data into MySQL:', error.message);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    } else {
      console.log('Data inserted:', results);
      res.status(200).json({ success: true });
    }
  });
});

// Endpoint for fetching data
app.get('/api/getSchools', (req, res) => {
  const sql = 'SELECT * FROM schools';

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching data from MySQL:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Fetched data:', results);
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
