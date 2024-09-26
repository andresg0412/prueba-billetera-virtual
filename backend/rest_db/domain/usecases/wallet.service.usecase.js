const { createResponse } = require('../../../resources/utils/response.util');
class WalletServiceUseCase {
    constructor(walletRepository) {
        this.walletRepository = walletRepository;
    }
    async depositMoney({ document, phone, amount }) {
        try {
            const wallet = await this.walletRepository.depositMoney({ document, phone, amount });

            if (wallet === null) {
                return createResponse(400, false, 'Error en la petición');
            }
            return createResponse(200, true, 'Dinero depositado', wallet);
        } catch (error) {
            throw createResponse(500, false, 'Error al depositar dinero en billetera');
        }
    }

}

module.exports = WalletServiceUseCase;