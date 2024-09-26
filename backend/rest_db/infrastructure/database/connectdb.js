const { Sequelize } = require('sequelize');
require('dotenv').config();

async function connectDB() {
    try {
        const sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: 'mysql'
            }
        );
        await sequelize.authenticate();
        return sequelize;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = connectDB;