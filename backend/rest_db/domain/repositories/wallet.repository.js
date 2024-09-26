const Customer = require('../models/customer.model');
const Wallet = require('../models/wallet.model');
const { createResponse } = require('../../../resources/utils/response.util');

class WalletRepository {
    constructor(sequelize) {
        this.customer = Customer;
        this.wallet = Wallet;
        this.sequelize = sequelize;
    }

    async depositMoney({ document, phone, amount }) {
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
}
module.exports = WalletRepository;