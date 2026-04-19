const { DataTypes } = require('sequelize');
const Sequalize = require('../config/db');

const Product = Sequalize.define('product',{
    id :{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    productId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name:{
        type : DataTypes.STRING,
        unique : true,
        allowNull : false
    },
    description:{
        type : DataTypes.STRING
    },
    price:{
        type : DataTypes.INTEGER,
        allowNull : false
    },
    userId:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references:{
            model: 'Users',
            key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    }
});

module.exports = Product;


// id (PK)
// name (string)
// description (string)
// price (number)
// userId (FK → User)