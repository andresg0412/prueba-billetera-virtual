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
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sessionId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tokenExpiresAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
    tableName: 'transactions',
    timestamps: true,
});

module.exports = Transaction;