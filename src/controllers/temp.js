const express = require('express');
const formidable = require('formidable');
const AWS = require('aws-sdk');

// Configurações da AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1', // Substitua pela região do seu bucket
});

const s3 = new AWS.S3();
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post('/api/upload', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao fazer o upload do arquivo.' });
    }

    const file = files.file;
    const params = {
      Bucket: 'seu-bucket', // Substitua pelo nome do seu bucket
      Key: file.name,
      Body: file.path,
    };

    s3.upload(params, (s3Err, data) => {
      if (s3Err) {
        return res.status(500).json({ error: 'Erro ao enviar o arquivo para o S3.' });
      }
      res.json({ message: 'Vídeo enviado com sucesso!', url: data.Location });
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});