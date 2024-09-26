const Customer = require('../models/customer.model');
const Wallet = require('../models/wallet.model');
const Transaction = require('../models/transaction.model');
const { createResponse } = require('../../../resources/utils/response.util');

class WalletRepository {
    constructor(sequelize) {
        this.customer = Customer;
        this.wallet = Wallet;
        this.transaction = Transaction;
        this.sequelize = sequelize;
    }

    async findCustomerWallet({ document, phone }) {
        try {
            const customer = await this.customer.findOne({ where: { document, phone } });
            if (!customer) {
                return null;
            }
            const wallet = await this.wallet.findOne({ where: { customerId: customer.id } });
            if (!wallet) {
                return null;
            }
            wallet.customerEmail = customer.dataValues.email;
            return wallet;
        } catch (error) {
            throw createResponse(500, false, 'Error al obtener billetera');
        }
    }

    async depositMoney({ wallet, amount }) {
        try {
            const amountFloat = parseFloat(amount);
            if (isNaN(amountFloat)) {
                return null;
            }
            const newBalance = wallet.balance + amountFloat;
            const updadatedWallet = await this.wallet.update({ balance: newBalance }, { where: { id: wallet.id } });
            if (!updadatedWallet) {
                return null;
            }
            wallet.balance = newBalance;
            return wallet;
        } catch (error) {
            throw createResponse(500, false, 'Error al depositar en billetera');
        }
    }

    async makePayment({ document, phone, amount }) {
        try {
            const customer = await this.customer.findOne({ where: { document, phone } });
            if (!customer) {
                return null;
            }
            const wallet = await this.wallet.findOne({ where: { customerId: customer.id } });
            if (!wallet) {
                return null;
            }
            const amountFloat = parseFloat(amount);
            if (isNaN(amountFloat)) {
                return null;
            }
            const newBalance = wallet.balance - amountFloat;
            const updadatedWallet = await this.wallet.update({ balance: newBalance }, { where: { id: wallet.id } });
            if (!updadatedWallet) {
                return null;
            }
            wallet.balance = newBalance;
            return wallet;
        } catch (error) {
            throw createResponse(500, false, 'Error al pagar en billetera');
        }
    }

    async createTransaction({ walletId, amount, status, sessionId, token, tokenExpiresAt }) {
        try {
            const transaction = await this.transaction.create({
                walletId,
                amount,
                status,
                sessionId,
                token,
                tokenExpiresAt
            });
            if (!transaction) {
                return null;
            }
            return transaction;
        } catch (error) {
            throw createResponse(500, false, 'Error al crear transacción');
        }
    }

    async getTransactionWithToken({ walletId, token }) {
        try {
            const transactions = await this.transaction.findOne({ where: { walletId: walletId, token: token } });
            if (transactions === null) {
                return null;
            }
            return transactions;
        } catch (error) {
            throw createResponse(500, false, 'Error al obtener transacciones');
        }
    }

    async transaccionConfirmed({ wallet, amount }) {
        try {
            const newBalance = wallet.balance - amount;
            const updadatedWallet = await this.wallet.update({ balance: newBalance }, { where: { id: wallet.id } });
            if (updadatedWallet === null) {
                return null;
            }
            wallet.balance = newBalance;
            return wallet;
        } catch (error) {
            throw createResponse(500, false, 'Error al confirmar transacción');
        }
    }

    async updateTransaction({ transactionId, status }) {
        try {
            const transaction = await this.transaction.update({ status }, { where: { id: transactionId } });
            if (!transaction) {
                return null;
            }
            return transaction;
        } catch (error) {
            throw createResponse(500, false, 'Error al confirmar transacción');
        }
    }
}
module.exports = WalletRepository;