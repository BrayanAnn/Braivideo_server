const { Sequelize } = require('sequelize');
require('dotenv').config();
const { db } = require('./config_env');

const sequelize = new Sequelize(
  db.name,
  db.user,
  db.password,
  {
    dialect: "postgres",
    host: db.host,
    port: db.port,
  });

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = sequelize;