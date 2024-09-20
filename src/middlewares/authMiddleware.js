const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config_env');

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

const verifyTokenAdmin = (req, res, next) => {
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
    console.log("UserId: ", req.userId)
    next();
  });
};



module.exports = {
  verifyToken,
  verifyTokenAdmin
};