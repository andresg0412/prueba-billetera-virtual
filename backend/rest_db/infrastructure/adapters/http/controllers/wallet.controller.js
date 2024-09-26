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

    async makePayment(req, res) {
        try {
            if (!req.body) {
                const errorResponse = createResponse(400, false, 'Error en la petición');
                return res.status(400).json(errorResponse);
            }
            const requiredFields = ['document', 'phone', 'cost_to_pay'];
            const { document, phone, cost_to_pay } = req.body;
            const validationResult = await ValidationsUtils.validateRequiredFields({ ...req.body }, requiredFields);

            if (validationResult !== null) {
                const errorResponse = createResponse(400, false, validationResult);
                return res.status(400).json(errorResponse);
            }
            const response = await this.walletServiceUseCase.makePayment({ document, phone, cost_to_pay });
            return res.status(response.status).json(response.data);
        } catch (error) {
            if (error.response) {
                return res.status(error.response.status).json(error.response.data);
            } else {
                const errorResponse = createResponse(500, false, 'Error en el pago');
                return res.status(500).json(errorResponse);
            }
        }
    }

    async confirmPayment(req, res) {
        try {
            if (!req.body) {
                const errorResponse = createResponse(400, false, 'Error en la petición');
                return res.status(400).json(errorResponse);
            }

            const requiredFields = ['token', 'sessionId', 'document', 'phone'];
            const { token, sessionId, document, phone } = req.body;

            const validationResult = await ValidationsUtils.validateRequiredFields({ ...req.body }, requiredFields);
            if (validationResult !== null) {
                const errorResponse = createResponse(400, false, validationResult);
                return res.status(400).json(errorResponse);
            }

            const response = await this.walletServiceUseCase.confirmPayment({ token, sessionId, document, phone });
            if (response.data === null) {
                const errorResponse = createResponse(response.status, false, response.message);
                return res.status(response.status).json(errorResponse);
            }
            return res.status(response.status).json(response);
        } catch (error) {
            if (error.response) {
                return res.status(error.response.status).json(error.response.data);
            } else {
                const errorResponse = createResponse(500, false, 'Error en el pago');
                return res.status(500).json(errorResponse);
            }
        }
    }
}

module.exports = WalletController;