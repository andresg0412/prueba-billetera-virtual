const { DataTypes } = require('sequelize');
const sequelize = require('../../infrastructure/database/sequelize-config');
const Wallet = require('../models/wallet.model');

const Transaction = sequelize.define(
    'Transaction',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        walletId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Wallet,
                key: 'id',
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
    timestamps: false,
});

module.exports = Transaction;