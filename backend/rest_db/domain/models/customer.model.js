const { DataTypes } = require('sequelize');
const sequelize = require('../../infrastructure/database/sequelize-config');

const Customer = sequelize.define(
    'Customer',
    {
        document: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        balance: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
    },
    {
        tableName: 'customers',
        timestamps: true
    }
);

module.exports = Customer;