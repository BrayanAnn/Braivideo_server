const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send('Nenhum token fornecido.');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log('Falha ao autenticar token.', err)
      return res.status(500).send('Falha ao autenticar token.');
    }

    req.userId = decoded.id;
    next();
  });

};

module.exports = verifyToken;