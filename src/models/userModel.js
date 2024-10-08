const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  first_name:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  last_name:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email:{
    type:DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  extras: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
});


module.exports = User;