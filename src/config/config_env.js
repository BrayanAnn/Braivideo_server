require('dotenv').config();

module.exports = {
  secretKey: process.env.SECRET_KEY,
  port: process.env.PORT || 5000,
  
  db: {
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },

  aws:{
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  }
};