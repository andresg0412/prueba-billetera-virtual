const { createResponse } = require('../../../resources/utils/response.util');
const GenerateToken = require('../utils/GenerateToken');
const GenerateSessionId = require('../utils/GenerateSessionId');
const SendEmail = require('../utils/SendEmail');

class WalletServiceUseCase {
    constructor(walletRepository) {
        this.walletRepository = walletRepository;
    }
    async depositMoney({ document, phone, amount }) {
        try {
            const wallet = await this.walletRepository.findCustomerWallet({ document, phone });

            if (wallet === null) {
                return createResponse(400, false, 'Error en la petición');
            }
            const deposit = await this.walletRepository.depositMoney({ wallet, amount });
            if (deposit === null) {
                return createResponse(400, false, 'Error en el deposito');
            }
            return createResponse(200, true, 'Dinero depositado', wallet);
        } catch (error) {
            throw createResponse(500, false, 'Error al depositar dinero en billetera');
        }
    }

    async makePayment({ document, phone, cost_to_pay }) {
        try {
            const wallet = await this.walletRepository.findCustomerWallet({ document, phone });
            if (wallet === null) {
                return createResponse(400, false, 'Error en la petición');
            }
            if (wallet.balance < cost_to_pay) {
                return createResponse(400, false, 'Saldo insuficiente');
            }
            const token = GenerateToken.generateToken();

            const sessionId = GenerateSessionId.generate();

            const transaction = await this.walletRepository.createTransaction({
                walletId: wallet.id,
                amount: cost_to_pay,
                status: 'PENDING',
                sessionId: sessionId,
                token: token.token,
                tokenExpiresAt: token.expiresAt
            });
            if (transaction === null) {
                return createResponse(400, false, 'Error al realizar transacción');
            }

            const enviarEmail = await SendEmail.sendEmail({
                email: wallet.customerEmail,
                subject: 'Confirmación de compra',
                text: `Su token es: ${token.token}`
            });
            if (enviarEmail === null) {
                return createResponse(400, false, 'Error al enviar email');
            }
            return createResponse(200, true, 'Transacción creada', transaction);
        } catch (error) {
            throw createResponse(500, false, 'Error al realizar transacción');
        }
    }

    async confirmPayment({ document, phone, token, sessionId }) {
        try {
            const wallet = await this.walletRepository.findCustomerWallet({ document, phone });
            if (wallet === null) {
                return createResponse(400, false, 'Error en la petición');
            }

            const transaction = await this.walletRepository.getTransactionWithToken({ walletId: wallet.id, token: token });
            if (transaction === null) {
                return createResponse(400, false, 'Error en la petición');
            }

            if (transaction.dataValues.sessionId !== sessionId) {
                return createResponse(400, false, 'Error en la petición');
            }

            if (transaction.dataValues.status === 'CONFIRMED') {
                return createResponse(400, false, 'Error en la petición, la transacción ya fue confirmada');
            }

            if (new Date(transaction.dataValues.tokenExpiresAt).getTime() < Date.now()) {
                return createResponse(400, false, 'Error en la petición, el token ha expirado');
            }

            const transactionConfirmed = await this.walletRepository.transaccionConfirmed({ wallet, amount: transaction.amount });
            if (transactionConfirmed === null) {
                return createResponse(400, false, 'Error en la petición');
            }

            const updatedTransaction = await this.walletRepository.updateTransaction({ transactionId: transaction.id, status: 'CONFIRMED' });
            if (updatedTransaction === null) {
                return createResponse(400, false, 'Error en la petición');
            }

            const enviarEmail = await SendEmail.sendEmail({
                email: wallet.customerEmail,
                subject: 'Confirmación de transacción',
                text: 'Transacción confirmada'
            });
            if (enviarEmail === null) {
                return createResponse(400, false, 'Error al enviar email');
            }

            transaction.status = 'CONFIRMED';

            return createResponse(200, true, 'Transacción confirmada', transaction);
        } catch (error) {
            throw createResponse(500, false, 'Error al confirmar transacción');
        }
    }
}

module.exports = WalletServiceUseCase;