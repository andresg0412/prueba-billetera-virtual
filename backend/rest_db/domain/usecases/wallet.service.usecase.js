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
            //crear token de 6 digitos
            const token = GenerateToken.generateToken();

            //id de sesion
            const sessionId = GenerateSessionId.generate();

            //guardar en tabla transaccion
            const transaction = await this.walletRepository.createTransaction({
                walletId: wallet.id,
                amount: cost_to_pay,
                status: 'PENDING',
                sessionId: sessionId,
                token: token.token
            });
            if (transaction === null) {
                return createResponse(400, false, 'Error al realizar transacción');
            }
            //si ok, enviar email
            const enviarEmail = await SendEmail.sendEmail({
                email: wallet.customerEmail,
                subject: 'Confirmación de compra',
                text: `Su token es: ${token.token}`
            });
            if (enviarEmail === null) {
                return createResponse(400, false, 'Error al enviar email');
            }
            //si ok, enviar respuesta con sesion id

            return createResponse(200, true, 'Transacción creada', transaction);
        } catch (error) {
            throw createResponse(500, false, 'Error al realizar transacción');
        }
    }

}

module.exports = WalletServiceUseCase;