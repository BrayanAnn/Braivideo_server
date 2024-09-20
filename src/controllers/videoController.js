const Video = require("../models/videoModel");

const getVideo = async(req, res) => {
    res.status(200).send("Autorizado com sucesso");
}

const uploadVideo = async(req, res) => {
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
}

module.exports = {
    getVideo,
    uploadVideo
}