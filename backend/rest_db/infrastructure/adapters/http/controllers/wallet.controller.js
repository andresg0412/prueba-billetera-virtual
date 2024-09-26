const ValidationsUtils = require('../../../../domain/utils/ValidationsUtils');
const { createResponse } = require('../../../../../resources/utils/response.util');
class WalletController {
    constructor(walletServiceUseCase) {
        this.walletServiceUseCase = walletServiceUseCase;
    }
    async depositMoney(req, res) {
        try {
            if (!req.body) {
                const errorResponse = createResponse(400, false, 'Error en la petición');
                return res.status(400).json(errorResponse);
            }

            const requiredFields = ['document', 'phone', 'amount'];
            const { document, phone, amount } = req.body;
            const validationResult = await ValidationsUtils.validateRequiredFields({ ...req.body }, requiredFields);

            if (validationResult !== null) {
                const errorResponse = createResponse(400, false, validationResult);
                return res.status(400).json(errorResponse);
            }
            const result = await this.walletServiceUseCase.depositMoney({ document, phone, amount });
            const response = createResponse(result.status, true, result.message, result.data);
            return res.status(result.status).json(response);
        } catch (error) {
            const errorResponse = createResponse(error.status || 500, false, error.message, null, error);
            return res.status(errorResponse.status).json(errorResponse);
        }
    }

}

module.exports = WalletController;