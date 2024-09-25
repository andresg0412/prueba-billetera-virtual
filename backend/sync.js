const sequelize = require('./infrastructure/database/sequelize-config');
const Customer = require('./domain/models/customer.model');
const Wallet = require('./domain/models/wallet.model');
const Transaction = require('./domain/models/transaction.model');

Customer.hasOne(Wallet, {
    foreignKey: 'customerId',
    as: 'wallet',
});

Wallet.belongsTo(Customer, {
    foreignKey: 'customerId',
    as: 'customer',
});

Wallet.hasMany(Transaction, {
    foreignKey: 'walletId',
    as: 'transactions',
});

Transaction.belongsTo(Wallet, {
    foreignKey: 'walletId',
    as: 'wallet',
});

sequelize
    .sync({ force: true })
    .then(() => {
        console.log('Database synced successfully.');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    })