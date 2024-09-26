const sequelize = require('./rest_db/infrastructure/database/sequelize-config');
const Customer = require('./rest_db/domain/models/customer.model');
const Wallet = require('./rest_db/domain/models/wallet.model');
const Transaction = require('./rest_db/domain/models/transaction.model');

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