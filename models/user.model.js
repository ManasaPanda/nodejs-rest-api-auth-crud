const { DataTypes } = require('sequelize');
const Sequalize = require('../config/db');

const User = Sequalize.define('Users',{
    id :{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    name:{
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
        length : 255
    }
});

module.exports = User;