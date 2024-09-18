require('dotenv').config();
const express = require('express');

const db = require('./config/db');
const cloud = require('./config/aws')

const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();

const { port } = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes')

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/video', videoRoutes)

db.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}).catch(err => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});

cloud.listBuckets((err, data) => {
  if (err) {
    console.error('Erro ao listar buckets:', err);
  } else {
    console.log('Buckets disponíveis:');
    data.Buckets.forEach(bucket => {
      console.log(bucket.Name);
    });
  }
});

cloud.listObjects((err, data) => {
  if (err) {
    console.error('Erro ao listar buckets:', err);
  } else {
    console.log('Buckets disponíveis:');
    data.forEach(bucket => {
      console.log(bucket);
    });
  }
})


// Function to upload video to S3
// const uploadVideo = (filePath) => {
//   try {
//     const fileContent = fs.readFileSync(filePath);
//     const params = {
//       Bucket: process.env.AWS_BUCKET,
//       Key: path.basename(filePath),
//       Body: fileContent,
//       ContentType: 'video/mp4'
//     };

//     s3.upload(params, (err, data) => {
//       if (err) {
//         console.error('Error uploading file:', err);
//         return;
//       }
//       console.log(`File uploaded successfully. ${data.Location}`);
//     });
//   } catch (error) {
//     console.error('Error reading file:', error);
//   }
// };

// Example usage of the upload function
//uploadVideo("C:/Users/Brayan/Downloads/video1.mp4");

// app.post('/register', async (req, res) => {
//   const { first_name, last_name, email, username, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const result = await pool.query(
//       'INSERT INTO users (first_name, last_name, email, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//       [first_name, last_name, email, username, hashedPassword]
//     );
//     res.json(result.rows[0]);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// Test database connection route
// app.get('/test-db', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * from users');
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error connecting to the database:', err);
//     res.status(500).send('Error connecting to the database');
//   }
// });

// app.get('/upload',(req, res) =>{

// })

// Start server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

