const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Video = sequelize.define('Video', {
    url:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description:{
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.TEXT,
    },
    banner: {
        type: DataTypes.TEXT,
    }
})

module.exports = Video;