const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');

const User = require('./user.model');
const Product = require('./product.model');

User.hasMany(Product,{
    foreignKey:'userId',
});

Product.belongsTo(User,{
    foreignKey:'userId',
});


module.exports = {
    sequelize,
    User,
    Product
};